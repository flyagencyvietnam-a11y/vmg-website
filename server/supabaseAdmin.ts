export class BackendError extends Error {
  code: string;
  status: number;
  constructor(code: string, status = 503) { super(code); this.code = code; this.status = status; }
}

export function backendConfig(env: NodeJS.ProcessEnv) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new BackendError("backend_not_configured");
  if (env.SUPABASE_URL && env.VITE_SUPABASE_URL && env.SUPABASE_URL.replace(/\/$/, "") !== env.VITE_SUPABASE_URL.replace(/\/$/, "")) throw new BackendError("backend_project_mismatch");
  try { if (new URL(url).protocol !== "https:") throw new Error(); }
  catch { throw new BackendError("backend_not_configured"); }
  return { url: url.replace(/\/$/, ""), key };
}

export async function rpc<T>(name: string, payload: unknown, env = process.env, request = fetch): Promise<T> {
  const { url, key } = backendConfig(env);
  let response: Response;
  try {
    response = await request(`${url}/rest/v1/rpc/${name}`, {
      method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(8000),
    });
  } catch { throw new BackendError("backend_unreachable"); }
  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as { message?: string };
    if (error.message === "rate_limited") throw new BackendError("rate_limited", 429);
    if (error.message === "request_conflict") throw new BackendError("request_conflict", 409);
    // Never log backend responses, tokens or personal information.
    throw new BackendError("backend_write_failed");
  }
  return response.json() as Promise<T>;
}
