-- Run only after deploying the API and storing these TWO secrets in Supabase Vault:
-- vmg_delivery_url: https://<actual website>/api/lead-delivery
-- vmg_cron_secret: same CRON_SECRET as the website server
-- Enable pg_cron and pg_net in Database > Extensions first.
-- This file schedules the worker only; it does not contain or create credentials.
do $$ begin
  if not exists(select 1 from vault.decrypted_secrets where name='vmg_delivery_url')
    or not exists(select 1 from vault.decrypted_secrets where name='vmg_cron_secret')
  then raise exception 'Configure VMG delivery secrets in Vault first'; end if;
end $$;
select cron.schedule('vmg-lead-delivery','* * * * *', $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name='vmg_delivery_url'),
    headers := jsonb_build_object('Content-Type','application/json','Authorization',
      'Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='vmg_cron_secret')),
    body := '{}'::jsonb, timeout_milliseconds := 55000
  );
$$);
