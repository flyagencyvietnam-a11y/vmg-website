import { existsSync } from 'node:fs';
import { lookup } from 'node:dns/promises';
for (const file of ['.env.local', '.env']) if (existsSync(file)) process.loadEnvFile(file);
const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) { console.error('FAIL: Supabase public config missing.'); process.exit(1); }
try {
  await lookup(new URL(url).hostname);
  console.log('PASS: Supabase DNS.');
  const auth = await fetch(`${url}/auth/v1/health`, { headers: { apikey: key }, signal: AbortSignal.timeout(10000) });
  if (!auth.ok) throw new Error(`Auth HTTP ${auth.status}`);
  console.log('PASS: Supabase Auth health.');
  for (const table of ['centers', 'quiz_mapping']) {
    const res = await fetch(`${url}/rest/v1/${table}?select=id&limit=0`, { headers: { apikey: key }, signal: AbortSignal.timeout(8000) });
    console.log(`${res.ok ? 'PASS' : 'FAIL'}: ${table} endpoint (HTTP ${res.status}).`);
    if (!res.ok) process.exitCode = 1;
  }
  const admin = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!admin) { console.log('PENDING: service role key / lead migration / live write smoke test.'); process.exitCode = 1; }
  else {
    const res = await fetch(`${url}/rest/v1/vmg_lead_deliveries?select=id&limit=0`, { headers: { apikey: admin, Authorization: `Bearer ${admin}` }, signal: AbortSignal.timeout(8000) });
    console.log(`${res.ok ? 'PASS' : 'FAIL'}: lead migration (HTTP ${res.status}).`);
    if (!res.ok) process.exitCode = 1;
  }
} catch (error) { console.error(`FAIL: ${error instanceof Error ? error.message.replace(/https?:\/\/\S+/g, '[endpoint]') : 'backend unavailable'}`); process.exitCode = 1; }
