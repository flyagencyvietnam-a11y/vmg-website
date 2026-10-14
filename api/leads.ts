import { intake } from "../server/leadIntake.ts";
import { header, readJson, send } from "../server/http.ts";
import type { ApiRequest } from "../server/http.ts";
import type { ServerResponse } from "node:http";

export default async function handler(req: ApiRequest, res: ServerResponse) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(res, 405, { error: "method_not_allowed" }); }
  let body: unknown;
  try { body = await readJson(req); }
  catch { return send(res, 400, { error: "invalid_body" }); }
  // Only trust the platform's overwritten proxy header in a Vercel deployment.
  const ip = process.env.VERCEL ? header(req, "x-vercel-forwarded-for")?.split(",")[0]?.trim() || "" : req.socket.remoteAddress || "";
  const result = await intake(body, ip, header(req, "origin"));
  if (result.status === 429) res.setHeader("Retry-After", "600");
  send(res, result.status, result.body);
}
