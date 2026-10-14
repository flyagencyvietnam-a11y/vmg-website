-- Apply to the existing VMG project after taking a backup. No CMS content is changed.
begin;
create table if not exists public.vmg_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.vmg_admins enable row level security;
revoke all on public.vmg_admins from anon, authenticated;
grant all on public.vmg_admins to service_role;
create or replace function public.vmg_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.vmg_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.vmg_is_admin() from public, anon;
grant execute on function public.vmg_is_admin() to authenticated, service_role;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null, phone text not null, source text not null,
  quiz_answers jsonb, consent_given boolean not null default false,
  status text not null default 'new', created_at timestamptz not null default now()
);
create table if not exists public.b2g_inquiries (
  id uuid primary key default gen_random_uuid(),
  organization text not null, contact_name text not null, phone text not null,
  need_notes text, consent_given boolean not null default false,
  status text not null default 'new', created_at timestamptz not null default now()
);
alter table public.leads add column if not exists request_id uuid;
alter table public.leads add column if not exists attribution jsonb not null default '{}';
alter table public.leads add column if not exists owner_team text;
alter table public.leads add column if not exists consent_version text;
alter table public.leads add column if not exists consent_at timestamptz;
alter table public.b2g_inquiries add column if not exists request_id uuid;
alter table public.b2g_inquiries add column if not exists source text;
alter table public.b2g_inquiries add column if not exists attribution jsonb not null default '{}';
alter table public.b2g_inquiries add column if not exists owner_team text;
alter table public.b2g_inquiries add column if not exists consent_version text;
alter table public.b2g_inquiries add column if not exists consent_at timestamptz;
create unique index if not exists leads_request_unique on public.leads(request_id);
create unique index if not exists inquiries_request_unique on public.b2g_inquiries(request_id);

create table public.vmg_lead_submissions (
  request_id uuid primary key, payload jsonb not null,
  created_at timestamptz not null default now()
);
create table public.vmg_lead_rate_events (
  ip_hash text not null, created_at timestamptz not null default now()
);
create index on public.vmg_lead_rate_events(ip_hash, created_at);
create table public.vmg_lead_deliveries (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.vmg_lead_submissions(request_id),
  channel text not null check(channel in ('crm','notification')),
  payload jsonb not null,
  state text not null default 'pending' check(state in ('pending','processing','delivered','failed')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  lease_token uuid, lease_until timestamptz,
  last_error text, delivered_at timestamptz,
  created_at timestamptz not null default now(),
  unique(request_id,channel)
);
create index on public.vmg_lead_deliveries(state, next_attempt_at);

-- Replace any older permissive lead policies. Anonymous direct writes would bypass rate limits.
do $$ declare item record; begin
  for item in select tablename, policyname from pg_policies
    where schemaname='public' and tablename in ('leads','b2g_inquiries')
  loop execute format('drop policy %I on public.%I',item.policyname,item.tablename); end loop;
end $$;
alter table public.leads enable row level security;
alter table public.b2g_inquiries enable row level security;
alter table public.vmg_lead_submissions enable row level security;
alter table public.vmg_lead_rate_events enable row level security;
alter table public.vmg_lead_deliveries enable row level security;
revoke all on public.leads, public.b2g_inquiries, public.vmg_lead_submissions,
  public.vmg_lead_rate_events, public.vmg_lead_deliveries from anon, authenticated;
grant select, update(status) on public.leads, public.b2g_inquiries to authenticated;
grant select on public.vmg_lead_deliveries to authenticated;
grant all on public.leads, public.b2g_inquiries, public.vmg_lead_submissions,
  public.vmg_lead_rate_events, public.vmg_lead_deliveries to service_role;
create policy leads_admin_read on public.leads for select to authenticated using ((select public.vmg_is_admin()));
create policy leads_admin_status on public.leads for update to authenticated using ((select public.vmg_is_admin())) with check ((select public.vmg_is_admin()));
create policy inquiries_admin_read on public.b2g_inquiries for select to authenticated using ((select public.vmg_is_admin()));
create policy inquiries_admin_status on public.b2g_inquiries for update to authenticated using ((select public.vmg_is_admin())) with check ((select public.vmg_is_admin()));
create policy deliveries_admin_read on public.vmg_lead_deliveries for select to authenticated using ((select public.vmg_is_admin()));

create function public.vmg_submit_lead(p_payload jsonb, p_ip_hash text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  rid uuid := (p_payload->>'request_id')::uuid;
  previous jsonb;
  team text;
  event jsonb;
begin
  if p_payload->>'kind' not in ('lead','partnership') or p_payload->>'kind' is null
    or p_payload->>'consent_given' is distinct from 'true'
    or length(trim(p_payload->>'full_name')) not between 2 and 120
    or p_payload->>'full_name' is null
    or p_payload->>'phone' is null or (p_payload->>'phone') !~ '^0[35789][0-9]{8}$'
    or p_payload->>'source' is null or length(p_payload->>'source') not between 1 and 160
    or rid is null or p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$'
    or octet_length(p_payload::text) > 12000 then raise exception 'invalid_submission'; end if;
  if p_payload->>'kind' = 'partnership' and
    (p_payload->>'organization' is null or length(trim(p_payload->>'organization')) not between 2 and 200
    or length(coalesce(p_payload->>'need_notes','')) > 2000) then raise exception 'invalid_submission'; end if;
  perform pg_advisory_xact_lock(hashtextextended(rid::text, 0));
  select payload into previous from public.vmg_lead_submissions where request_id = rid;
  if found then
    if previous <> p_payload then raise exception 'request_conflict'; end if;
    return jsonb_build_object('request_id', rid);
  end if;
  perform pg_advisory_xact_lock(hashtextextended(p_ip_hash, 1));
  if (select count(*) from public.vmg_lead_rate_events where ip_hash=p_ip_hash and created_at>now()-interval '10 minutes') >= 5
    then raise exception 'rate_limited'; end if;
  delete from public.vmg_lead_rate_events where created_at < now()-interval '1 day';
  insert into public.vmg_lead_rate_events(ip_hash) values(p_ip_hash);
  team := case
    when p_payload->>'kind'='partnership' then 'business'
    when p_payload->'quiz_answers'->>'audience'='abroad' then 'vmp'
    when p_payload->>'source' like 'khao_thi_%' then 'osir'
    when p_payload->'quiz_answers'->>'product_section'='tesol' and p_payload->'quiz_answers'->>'product_format'='offline' then 'osir'
    when p_payload->'quiz_answers'->>'product_format'='offline' then 'centers'
    when p_payload->'quiz_answers'->>'selfGoal'='tesol' and p_payload->'quiz_answers'->>'selfFormat'='center' then 'osir'
    when p_payload->'quiz_answers'->>'selfFormat'='center' or p_payload->'quiz_answers'->>'audience'='child' then 'centers'
    else 'tmdt' end;
  -- Source product codes are retained for finer assignment in CRM; no individual owner is guessed.
  insert into public.vmg_lead_submissions(request_id,payload) values(rid,p_payload);
  if p_payload->>'kind'='partnership' then
    insert into public.b2g_inquiries(request_id,organization,contact_name,phone,need_notes,source,consent_given,consent_at,consent_version,attribution,owner_team)
    values(rid,p_payload->>'organization',p_payload->>'full_name',p_payload->>'phone',p_payload->>'need_notes',p_payload->>'source',true,now(),'privacy-copy-2026-10-14',p_payload->'attribution',team);
  else
    insert into public.leads(request_id,full_name,phone,source,quiz_answers,consent_given,consent_at,consent_version,attribution,owner_team)
    values(rid,p_payload->>'full_name',p_payload->>'phone',p_payload->>'source',p_payload->'quiz_answers',true,now(),'privacy-copy-2026-10-14',p_payload->'attribution',team);
  end if;
  event := p_payload || jsonb_build_object('owner_team',team,'received_at',now(),'consent_version','privacy-copy-2026-10-14');
  insert into public.vmg_lead_deliveries(request_id,channel,payload) values(rid,'crm',event),(rid,'notification',event);
  return jsonb_build_object('request_id',rid);
end $$;

create function public.vmg_claim_deliveries(p_channels text[]) returns setof public.vmg_lead_deliveries
language plpgsql security definer set search_path = '' as $$
begin
  update public.vmg_lead_deliveries set state='failed',last_error='worker_lease_expired',lease_token=null,lease_until=null
    where state='processing' and lease_until<now() and attempts>=8;
  return query update public.vmg_lead_deliveries d set state='processing', attempts=attempts+1,
    lease_token=gen_random_uuid(), lease_until=now()+interval '2 minutes'
  where d.id in (
    select id from public.vmg_lead_deliveries
    where channel=any(p_channels) and attempts<8 and next_attempt_at<=now()
      and (state='pending' or (state='processing' and lease_until<now()))
    order by created_at limit 5 for update skip locked
  ) returning d.*;
end
$$;
create function public.vmg_finish_delivery(p_id uuid, p_lease uuid, p_success boolean, p_error text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  update public.vmg_lead_deliveries set
    state=case when p_success then 'delivered' when attempts>=8 then 'failed' else 'pending' end,
    delivered_at=case when p_success then now() else null end,
    next_attempt_at=now()+make_interval(secs=>least(3600,30*power(2,attempts)::integer)),
    last_error=case when p_success then null else left(p_error,120) end,
    lease_until=null,lease_token=null
  where id=p_id and lease_token=p_lease and state='processing';
  return found;
end $$;
create function public.vmg_retry_delivery(p_id uuid) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if not public.vmg_is_admin() then raise exception 'not_authorized'; end if;
  update public.vmg_lead_deliveries set state='pending', attempts=0, next_attempt_at=now(), last_error=null
    where id=p_id and state='failed';
  return found;
end $$;
revoke all on function public.vmg_submit_lead(jsonb,text), public.vmg_claim_deliveries(text[]),
  public.vmg_finish_delivery(uuid,uuid,boolean,text),public.vmg_retry_delivery(uuid) from public,anon,authenticated;
grant execute on function public.vmg_submit_lead(jsonb,text),public.vmg_claim_deliveries(text[]),
  public.vmg_finish_delivery(uuid,uuid,boolean,text) to service_role;
grant execute on function public.vmg_retry_delivery(uuid) to authenticated;
commit;
