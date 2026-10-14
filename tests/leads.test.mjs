import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { validateLead, normalizePhone } from '../src/lib/leadValidation.ts';
import { intake } from '../server/leadIntake.ts';
import { deliverPending } from '../server/leadDelivery.ts';
import { toCsv } from '../src/lib/csv.ts';

// Synthetic fixtures run only in disposable local PostgreSQL; never sent to VMG/CRM.
const payload = (extra = {}) => ({ kind:'lead', request_id:randomUUID(), full_name:'TEST ONLY', phone:'0900000000', source:'quiz', consent_given:true, quiz_answers:{audience:'self', selfGoal:'work', selfFormat:'online'}, attribution:{utm_campaign:'test'}, ...extra });
const db = new PGlite();
await db.exec(`
  create role anon; create role authenticated; create role service_role bypassrls;
  create schema auth; create table auth.users(id uuid primary key);
  create function auth.uid() returns uuid language sql as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
`);
await db.exec(await readFile(new URL('../supabase/migrations/202610140001_lead_intake.sql',import.meta.url),'utf8'));
const submit = async (data, hash='a'.repeat(64)) => (await db.query('select public.vmg_submit_lead($1::jsonb,$2) as receipt',[JSON.stringify(data),hash])).rows[0].receipt;
const env = { SUPABASE_URL:'https://backend.example.test', SUPABASE_SERVICE_ROLE_KEY:'test-secret', ALLOWED_ORIGINS:'https://web.example.test', LEAD_RATE_LIMIT_SECRET:'local-test-secret' };
async function rpcFetch(url, options) {
  assert.equal(options.headers.apikey,env.SUPABASE_SERVICE_ROLE_KEY);
  const name = new URL(url).pathname.split('/').pop();
  const args = JSON.parse(options.body);
  try {
    let result;
    if (name==='vmg_submit_lead') result=await submit(args.p_payload,args.p_ip_hash);
    else if (name==='vmg_claim_deliveries') result=(await db.query('select * from public.vmg_claim_deliveries($1::text[])',[args.p_channels])).rows;
    else if (name==='vmg_finish_delivery') result=(await db.query('select public.vmg_finish_delivery($1,$2,$3,$4) as result',[args.p_id,args.p_lease,args.p_success,args.p_error])).rows[0].result;
    else throw new Error('Unknown RPC');
    return Response.json(result);
  } catch (error) { return Response.json({message:error.message},{status:400}); }
}

test('normalizes Vietnamese mobile numbers, requires consent, rejects oversized fields', () => {
  assert.equal(normalizePhone('+84 900 000 000'),'0900000000');
  assert.equal(validateLead(payload({phone:'84 900 000 000'})).phone,'0900000000');
  for (const bad of [{phone:'123'}, {consent_given:false}, {full_name:'a'}, {organization:'',kind:'partnership'}, {quiz_answers:[]}, {request_id:'invalid'}, {need_notes:'x'.repeat(2001),kind:'partnership',organization:'TEST'}]) assert.throws(()=>validateLead(payload(bad)));
});
test('form API persists lead and both delivery events atomically; retry is idempotent', async () => {
  const data=payload();
  const first=await intake(data,'127.0.0.1','https://web.example.test',env,rpcFetch);
  assert.equal(first.status,200);
  assert.equal((await intake(data,'127.0.0.1','https://web.example.test',env,rpcFetch)).status,200);
  assert.equal((await db.query('select count(*)::int as n from public.leads where request_id=$1',[data.request_id])).rows[0].n,1);
  assert.equal((await db.query('select count(*)::int as n from public.vmg_lead_deliveries where request_id=$1',[data.request_id])).rows[0].n,2);
  const conflict=await intake({...data,full_name:'OTHER TEST'},'127.0.0.1','https://web.example.test',env,rpcFetch);
  assert.equal(conflict.status,409);
});
test('server refuses spam, missing consent, unknown origins and missing secrets', async () => {
  assert.equal((await intake(payload({website:'bot'}),'127.0.0.1','https://web.example.test',env,rpcFetch)).status,400);
  assert.equal((await intake(payload({consent_given:false}),'127.0.0.1','https://web.example.test',env,rpcFetch)).status,400);
  assert.equal((await intake(payload(),'127.0.0.1','https://evil.example.test',env,rpcFetch)).status,403);
  assert.equal((await intake(payload(),'127.0.0.1',undefined,env,rpcFetch)).status,403);
  assert.equal((await intake(payload(),'127.0.0.1','https://web.example.test',{...env,SUPABASE_SERVICE_ROLE_KEY:''},rpcFetch)).status,503);
  assert.equal((await intake(payload(),'127.0.0.1','https://web.example.test',{...env,VITE_SUPABASE_URL:'https://other-project.example.test'},rpcFetch)).status,503);
});
test('rate limit rejects sixth new submission, allows retry, failure leaves no partial lead', async () => {
  const hash='b'.repeat(64), first=payload();
  await submit(first,hash);
  for(let i=0;i<4;i++) await submit(payload(),hash);
  const rejected=payload();
  await assert.rejects(submit(rejected,hash),/rate_limited/);
  assert.equal((await submit(first,hash)).request_id,first.request_id);
  assert.equal((await db.query('select count(*)::int as n from public.vmg_lead_submissions where request_id=$1',[rejected.request_id])).rows[0].n,0);
});
test('routes partnerships to business, abroad to VMP, offline TESOL to OSIR and online TESOL to TMĐT', async () => {
  const cases=[
    [payload({kind:'partnership',organization:'TEST SCHOOL'}),'business','b2g_inquiries'],
    [payload({quiz_answers:{audience:'abroad'}}),'vmp','leads'],
    [payload({quiz_answers:{audience:'self',selfGoal:'tesol',selfFormat:'center'}}),'osir','leads'],
    [payload({quiz_answers:{audience:'self',selfGoal:'tesol',selfFormat:'online'}}),'tmdt','leads'],
    [payload({source:'khao_thi_ielts',quiz_answers:null}),'osir','leads'],
    [payload({quiz_answers:{product_section:'mamnon',product_format:'offline'}}),'centers','leads'],
  ];
  for (const [data,team,table] of cases) {
    await submit(data,randomUUID().replaceAll('-','').repeat(2));
    assert.equal((await db.query(`select owner_team from public.${table} where request_id=$1`,[data.request_id])).rows[0].owner_team,team);
  }
});
test('RLS: visitors cannot read/write leads or invoke intake; signed-in non-admin cannot access data', async () => {
  await db.exec('set role anon');
  await assert.rejects(db.query('select * from public.leads'),/permission denied/);
  await assert.rejects(db.query('select * from public.b2g_inquiries'),/permission denied/);
  await assert.rejects(submit(payload()),/permission denied/);
  await db.exec('reset role; set role authenticated');
  assert.equal((await db.query('select * from public.leads')).rows.length,0);
  assert.equal((await db.query('select * from public.vmg_lead_deliveries')).rows.length,0);
  await assert.rejects(db.query("insert into public.leads(full_name,phone,source) values('TEST','0900000000','test')"),/permission denied/);
  await assert.rejects(submit(payload()),/permission denied/);
  await db.exec('reset role');
});
test('admin can read/export and update status, cannot change contact details or add admins', async () => {
  const id=randomUUID();
  await db.query('insert into auth.users values($1)',[id]);
  await db.query('insert into public.vmg_admins values($1)',[id]);
  await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);
  await db.exec('set role authenticated');
  const rows=(await db.query('select * from public.leads')).rows;
  assert.ok(rows.length>0);
  await db.query("update public.leads set status='contacted' where id=$1",[rows[0].id]);
  await assert.rejects(db.query("update public.leads set phone='0900000001' where id=$1",[rows[0].id]),/permission denied/);
  await assert.rejects(db.query('insert into public.vmg_admins values($1)',[randomUUID()]),/permission denied/);
  await db.exec('reset role');
});
test('CRM failure is durably retryable, claims cannot overlap, successful delivery is acknowledged', async () => {
  await db.exec("update public.vmg_lead_deliveries set state='delivered'");
  const data=payload(); await submit(data,'c'.repeat(64));
  const deliveryEnv={...env,CRM_WEBHOOK_URL:'https://crm.example.test/intake'};
  let sentId;
  const failFetch=async (url,options) => {
    if (url.startsWith(env.SUPABASE_URL)) return rpcFetch(url,options);
    sentId=options.headers['Idempotency-Key'];
    return new Response('',{status:503});
  };
  assert.equal((await deliverPending(deliveryEnv,failFetch)).delivered,0);
  let row=(await db.query("select * from public.vmg_lead_deliveries where request_id=$1 and channel='crm'",[data.request_id])).rows[0];
  assert.equal(row.state,'pending'); assert.equal(row.last_error,'webhook_http_503');
  assert.equal((await deliverPending(deliveryEnv,failFetch)).processed,0);
  await db.exec("update public.vmg_lead_deliveries set next_attempt_at=now()-interval '1 second' where channel='crm' and state='pending'");
  const claimed=(await db.query("select * from public.vmg_claim_deliveries(array['crm'])")).rows;
  assert.equal(claimed.length,1);
  assert.equal((await db.query("select * from public.vmg_claim_deliveries(array['crm'])")).rows.length,0);
  assert.equal((await db.query('select public.vmg_finish_delivery($1,$2,true,null) as ok',[row.id,randomUUID()])).rows[0].ok,false);
  await db.exec("update public.vmg_lead_deliveries set lease_until=now()-interval '1 second' where state='processing'");
  const okFetch=async (url,options) => {
    if(url.startsWith(env.SUPABASE_URL)) return rpcFetch(url,options);
    assert.equal(options.headers['Idempotency-Key'],sentId);
    return new Response('',{status:200});
  };
  assert.equal((await deliverPending(deliveryEnv,okFetch)).delivered,1);
  row=(await db.query('select * from public.vmg_lead_deliveries where id=$1',[row.id])).rows[0];
  assert.equal(row.state,'delivered'); assert.ok(row.delivered_at);
  const notification=(await db.query("select state,attempts from public.vmg_lead_deliveries where request_id=$1 and channel='notification'",[data.request_id])).rows[0];
  assert.equal(notification.state,'pending'); assert.equal(notification.attempts,0);
});
test('CSV escapes quotes, preserves phone numbers and blocks formula injection', () => {
  const csv=toCsv([{name:'=HYPERLINK("test")',phone:'0900000000',notes:'one\ntwo'}],['name','phone','notes']);
  assert.ok(csv.includes('"\'=HYPERLINK(""test"")"'));
  assert.ok(csv.includes('"0900000000"'));
  assert.ok(csv.includes('"one\ntwo"'));
});
test('expired final lease becomes failed and an admin can explicitly requeue it', async () => {
  const data=payload(); await submit(data,'d'.repeat(64));
  const row=(await db.query("select id from public.vmg_lead_deliveries where request_id=$1 and channel='crm'",[data.request_id])).rows[0];
  await db.query("update public.vmg_lead_deliveries set state='processing',attempts=8,lease_until=now()-interval '1 second' where id=$1",[row.id]);
  await db.query("select * from public.vmg_claim_deliveries(array['crm'])");
  assert.equal((await db.query('select state from public.vmg_lead_deliveries where id=$1',[row.id])).rows[0].state,'failed');
  await db.exec('set role authenticated');
  assert.equal((await db.query('select public.vmg_retry_delivery($1) as ok',[row.id])).rows[0].ok,true);
  await db.exec('reset role');
  const state=(await db.query('select state,attempts from public.vmg_lead_deliveries where id=$1',[row.id])).rows[0];
  assert.equal(state.state,'pending'); assert.equal(state.attempts,0);
});
test.after(async()=>{ await db.close(); });
