import { timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { deliverPending } from "../server/leadDelivery.ts";
import { header, send } from "../server/http.ts";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "GET" && req.method !== "POST") return send(res,405,{error:"method_not_allowed"});
  const expected = process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : "";
  const actual = header(req,"authorization") || "";
  const supplied = Buffer.from(actual), secret = Buffer.from(expected);
  if (!expected || supplied.length !== secret.length || !timingSafeEqual(supplied,secret)) return send(res,401,{error:"unauthorized"});
  try { send(res,200,await deliverPending()); }
  catch { console.error('{"event":"lead_delivery_worker_failed"}'); send(res,503,{error:"delivery_unavailable"}); }
}
