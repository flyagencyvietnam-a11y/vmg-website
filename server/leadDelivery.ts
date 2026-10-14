import { rpc } from "./supabaseAdmin.ts";
import { createHmac } from "node:crypto";

type Delivery = { id: string; request_id: string; channel: string; payload: Record<string, unknown>; lease_token: string; attempts: number };
export async function deliverPending(env = process.env, request = fetch) {
  const targets: Record<string, { url: string; token?: string }> = {};
  for (const [channel, prefix] of [["crm", "CRM"], ["notification", "LEAD_NOTIFICATION"]]) {
    const url = env[`${prefix}_WEBHOOK_URL`];
    if (!url) continue;
    if (new URL(url).protocol !== "https:") throw new Error("webhook_requires_https");
    targets[channel] = { url, token: env[`${prefix}_WEBHOOK_TOKEN`] };
  }
  if (!Object.keys(targets).length) return { processed: 0, delivered: 0, pending_configuration: true };
  const rows = await rpc<Delivery[]>("vmg_claim_deliveries", { p_channels: Object.keys(targets) }, env, request);
  let delivered = 0;
  for (const row of rows) {
    let success = false;
    let code = "webhook_unreachable";
    try {
      const body = JSON.stringify({ event: "vmg.lead.created", event_id: row.id, data: row.payload });
      const headers: Record<string, string> = { "Content-Type": "application/json", "Idempotency-Key": row.id };
      if (targets[row.channel].token) headers.Authorization = `Bearer ${targets[row.channel].token}`;
      if (env.LEAD_WEBHOOK_SIGNING_SECRET) headers["X-VMG-Signature"] = createHmac("sha256", env.LEAD_WEBHOOK_SIGNING_SECRET).update(body).digest("hex");
      const response = await request(targets[row.channel].url, { method: "POST", body, headers, signal: AbortSignal.timeout(3000), redirect: "error" });
      success = response.ok;
      code = `webhook_http_${response.status}`;
    } catch { /* Retry via durable outbox; no personal data in logs. */ }
    const finished = await rpc<boolean>("vmg_finish_delivery", { p_id: row.id, p_lease: row.lease_token, p_success: success, p_error: success ? null : code }, env, request);
    if (success && finished) delivered++;
    if (!success) console.error(JSON.stringify({ event: "lead_delivery_failed", event_id: row.id, channel: row.channel, code, attempt: row.attempts }));
  }
  return { processed: rows.length, delivered, pending_configuration: false };
}
