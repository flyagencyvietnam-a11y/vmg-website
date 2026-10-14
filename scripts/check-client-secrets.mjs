import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
for (const file of ['.env.local', '.env']) if (existsSync(file)) process.loadEnvFile(file);
const secrets=['SUPABASE_SERVICE_ROLE_KEY','LEAD_RATE_LIMIT_SECRET','CRON_SECRET','CRM_WEBHOOK_TOKEN','LEAD_NOTIFICATION_WEBHOOK_TOKEN','LEAD_WEBHOOK_SIGNING_SECRET'];
async function inspect(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    const path=`${dir}/${entry.name}`;
    if(entry.isDirectory()) await inspect(path);
    else if(/\.(js|html|json|map)$/.test(entry.name)) {
      const text=await readFile(path,'utf8');
      for(const name of secrets) {
        const value=process.env[name];
        if(value && value.length>=8 && text.includes(value)) throw new Error(`Server secret ${name} found in client output`);
      }
    }
  }
}
await inspect('dist');
console.log('PASS: configured server secrets are absent from client output.');
