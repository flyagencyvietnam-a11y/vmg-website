import { validateLead } from "./leadValidation";

export type SubmissionInput = {
  kind: "lead" | "partnership";
  full_name: string;
  phone: string;
  source: string;
  consent_given: boolean;
  organization?: string;
  need_notes?: string;
  quiz_answers?: Record<string, unknown> | null;
  website?: string;
};

function attribution() {
  const params = new URLSearchParams(window.location.search);
  const values: Record<string, string> = { page: window.location.pathname, referrer: document.referrer ? new URL(document.referrer).origin : "" };
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = params.get(key);
    if (value) values[key] = value.slice(0, 500);
  }
  // Keep campaign tags across navigation, without storing contact details.
  try {
    const previous = JSON.parse(sessionStorage.getItem("vmg-attribution") || "{}") as Record<string, string>;
    const campaign = Object.fromEntries(Object.entries(values).filter(([key]) => key.startsWith("utm_")));
    sessionStorage.setItem("vmg-attribution", JSON.stringify({ ...previous, ...campaign }));
    return { ...previous, ...values };
  } catch { return values; }
}

export function createLeadSubmitter() {
  let previous: { fingerprint: string; body: ReturnType<typeof validateLead> & { website?: string } } | null = null;
  return async (input: SubmissionInput) => {
    const fingerprint = JSON.stringify(input);
    if (previous?.fingerprint !== fingerprint) {
      const body = validateLead({ ...input, request_id: crypto.randomUUID(), attribution: attribution() });
      previous = { fingerprint, body: { ...body, website: input.website || "" } };
    }
    // Retain the same ID after a timeout: a retry cannot create another lead.
    const body = previous!.body;
    let response: Response;
    try {
      response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(12000) });
    } catch { throw new Error("Chưa xác nhận được biểu mẫu. Bạn có thể thử gửi lại."); }
    const receipt = await response.json().catch(() => null);
    if (!response.ok || receipt?.ok !== true || receipt.request_id !== body.request_id) {
      if (response.status === 429) throw new Error("Bạn đã gửi nhiều yêu cầu. Vui lòng đợi 10 phút rồi thử lại.");
      if (response.status === 400 && receipt?.message) throw new Error(receipt.message);
      throw new Error("Chưa gửi được biểu mẫu. Vui lòng thử lại hoặc liên hệ trực tiếp.");
    }
  };
}
