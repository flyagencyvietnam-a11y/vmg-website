export type LeadKind = "lead" | "partnership";
export type LeadPayload = {
  kind: LeadKind;
  request_id: string;
  full_name: string;
  phone: string;
  source: string;
  consent_given: true;
  organization?: string;
  need_notes?: string;
  quiz_answers: Record<string, unknown> | null;
  attribution: Record<string, string>;
};

export class LeadValidationError extends Error {}

export function normalizePhone(value: string) {
  return value.replace(/[\s().-]/g, "").replace(/^\+84/, "0").replace(/^84(?=\d{9}$)/, "0");
}

export function validateLead(input: unknown): LeadPayload {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new LeadValidationError("Thông tin gửi chưa hợp lệ.");
  const data = input as Record<string, unknown>;
  const text = (key: string, max: number, min = 0) => {
    const value = typeof data[key] === "string" ? data[key].trim() : "";
    const hasControl = [...value].some(char => { const code = char.charCodeAt(0); return code < 32 && ![9, 10, 13].includes(code); });
    if (value.length < min || value.length > max || hasControl) throw new LeadValidationError("Vui lòng kiểm tra độ dài và nội dung thông tin.");
    return value;
  };
  if (data.kind !== "lead" && data.kind !== "partnership") throw new LeadValidationError("Biểu mẫu chưa hợp lệ.");
  const request_id = text("request_id", 36, 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(request_id)) throw new LeadValidationError("Mã yêu cầu chưa hợp lệ. Vui lòng tải lại trang.");
  const phone = normalizePhone(text("phone", 30, 1));
  if (!/^0[35789]\d{8}$/.test(phone)) throw new LeadValidationError("Vui lòng nhập số di động Việt Nam hợp lệ.");
  if (data.consent_given !== true) throw new LeadValidationError("Vui lòng đồng ý với Chính sách bảo mật trước khi gửi.");
  const quiz = data.quiz_answers ?? null;
  if (quiz !== null && (typeof quiz !== "object" || Array.isArray(quiz) || JSON.stringify(quiz).length > 4000)) throw new LeadValidationError("Thông tin nhu cầu quá dài hoặc chưa hợp lệ.");
  const attribution: Record<string, string> = {};
  if (data.attribution && typeof data.attribution === "object") {
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "page", "referrer"]) {
      const value = (data.attribution as Record<string, unknown>)[key];
      if (typeof value === "string") attribution[key] = value.slice(0, 500);
    }
  }
  const source = text("source", 160, 1);
  if (!/^[a-zA-Z0-9_:/.-]+$/.test(source)) throw new LeadValidationError("Nguồn yêu cầu chưa hợp lệ.");
  return {
    kind: data.kind, request_id, full_name: text("full_name", 120, 2), phone, source,
    consent_given: true, quiz_answers: quiz as Record<string, unknown> | null, attribution,
    ...(data.kind === "partnership" ? { organization: text("organization", 200, 2), need_notes: text("need_notes", 2000) } : {}),
  };
}
