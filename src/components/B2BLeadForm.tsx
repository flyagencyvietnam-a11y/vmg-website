import { useState } from "react";
import { createLeadSubmitter } from "../lib/leadSubmission";
import { LeadFormFields, LeadFormError } from "./LeadFormFields";

export function B2BLeadForm({ source = "truong-hoc-doanh-nghiep" }: { source?: string }) {
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
        kind: "partnership", source,
        organization: form.get("organization") as string,
        full_name: form.get("contact_name") as string,
        phone: form.get("phone") as string,
        need_notes: form.get("need_notes") as string,
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
      <div className="rounded-2xl border border-dashed border-brand/30 bg-white p-6 text-center">
        <p className="text-sm font-semibold text-brand">✓ Cảm ơn quý đối tác! Đội ngũ VMG sẽ liên hệ để trao đổi nhu cầu.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="organization" required minLength={2} maxLength={200} autoComplete="organization" aria-label="Tên trường hoặc công ty" placeholder="Tên trường / công ty" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="contact_name" required minLength={2} maxLength={120} autoComplete="name" aria-label="Người liên hệ" placeholder="Người liên hệ" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
        <input name="phone" type="tel" inputMode="tel" required maxLength={30} autoComplete="tel" aria-label="Số điện thoại" placeholder="Số điện thoại" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
      </div>
      <textarea name="need_notes" maxLength={2000} aria-label="Nhu cầu cụ thể" placeholder="Nhu cầu cụ thể" rows={3} className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
      <LeadFormFields />
      {status === "error" && <LeadFormError message={error} />}
      <button disabled={status === "loading"} className="rounded-full bg-brand text-white px-6 py-3 text-sm font-bold w-fit disabled:opacity-60">
        {status === "loading" ? "Đang gửi…" : "Gửi yêu cầu hợp tác"}
      </button>
    </form>
  );
}
