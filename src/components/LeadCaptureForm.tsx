import { useState } from "react";
import { createLeadSubmitter } from "../lib/leadSubmission";
import { LeadFormFields, LeadFormError } from "./LeadFormFields";

type Props = {
  source: string;
  extra?: Record<string, unknown>;
  submitLabel?: string;
  title?: string;
};

export function LeadCaptureForm({ source, extra, submitLabel = "Nhận tư vấn miễn phí", title }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [submit] = useState(() => createLeadSubmitter());
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const form = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      await submit({
        kind: "lead",
        full_name: form.get("full_name") as string,
        phone: form.get("phone") as string,
        source,
        quiz_answers: extra ?? null,
        consent_given: form.get("consent") === "on",
        website: String(form.get("website") || ""),
      });
      setStatus("done");
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Chưa gửi được biểu mẫu.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-white border border-neutral-200 p-6 md:p-7 shadow-sm text-center">
        <p className="text-sm font-semibold text-brand">✓ Cảm ơn bạn! Tư vấn viên VMG sẽ liên hệ để hỗ trợ.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-neutral-200 p-6 md:p-7 shadow-sm">
      {title && <div className="text-sm font-semibold text-neutral-700 mb-3">{title}</div>}
      <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-3">
        <input name="full_name" required minLength={2} maxLength={120} autoComplete="name" aria-label="Họ và tên" placeholder="Họ và tên" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
        <input name="phone" type="tel" inputMode="tel" required maxLength={30} autoComplete="tel" aria-label="Số điện thoại" placeholder="Số điện thoại" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
        <LeadFormFields />
        {status === "error" && <LeadFormError message={error} />}
        <button disabled={status === "loading"} className="sm:col-span-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-bold w-fit disabled:opacity-60">
          {status === "loading" ? "Đang gửi…" : submitLabel}
        </button>
      </form>
    </div>
  );
}
