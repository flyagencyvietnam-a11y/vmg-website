import { createHmac } from "node:crypto";
import { validateLead, LeadValidationError } from "../src/lib/leadValidation.ts";
import { BackendError, rpc } from "./supabaseAdmin.ts";

export async function intake(body: unknown, ip: string, origin: string | undefined, env = process.env, request = fetch) {
  const result = (status: number, value: Record<string, unknown>) => ({ status, body: value });
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(value => value.trim()).filter(Boolean);
  if (!allowed.length) return result(503, { error: "backend_not_configured" });
  if (!origin || !allowed.includes(origin)) return result(403, { error: "origin_not_allowed" });
  if (typeof body === "object" && body !== null && "website" in body && (body as { website: unknown }).website) return result(400, { error: "invalid_submission" });
  try {
    const payload = validateLead(body);
    if (!env.LEAD_RATE_LIMIT_SECRET || !ip) throw new BackendError("backend_not_configured");
    const ip_hash = createHmac("sha256", env.LEAD_RATE_LIMIT_SECRET).update(ip).digest("hex");
    const receipt = await rpc<{ request_id: string }>("vmg_submit_lead", { p_payload: payload, p_ip_hash: ip_hash }, env, request);
    if (receipt.request_id !== payload.request_id) throw new BackendError("invalid_receipt");
    return result(200, { ok: true, request_id: receipt.request_id });
  } catch (error) {
    if (error instanceof LeadValidationError) return result(400, { error: "invalid_submission", message: error.message });
    const failure = error instanceof BackendError ? error : new BackendError("backend_write_failed");
    console.error(JSON.stringify({ event: "lead_intake_failed", code: failure.code }));
    return result(failure.status, { error: failure.code });
  }
}
