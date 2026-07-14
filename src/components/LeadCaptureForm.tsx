import { useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  source: string;
  extra?: Record<string, unknown>;
  submitLabel?: string;
  title?: string;
};

export function LeadCaptureForm({ source, extra, submitLabel = "Nhận tư vấn miễn phí", title }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("loading");
    const { error } = await supabase.from("leads").insert({
      full_name: form.get("full_name") as string,
      phone: form.get("phone") as string,
      source,
      quiz_answers: extra ?? null,
      consent_given: form.get("consent") === "on",
    });
    setStatus(error ? "error" : "done");
  };

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-white border border-neutral-200 p-6 md:p-7 shadow-sm text-center">
        <p className="text-sm font-semibold text-brand">✓ Cảm ơn bạn! Tư vấn viên VMG sẽ liên hệ trong vòng 24h.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-neutral-200 p-6 md:p-7 shadow-sm">
      {title && <div className="text-sm font-semibold text-neutral-700 mb-3">{title}</div>}
      <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-3">
        <input name="full_name" required placeholder="Họ và tên" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
        <input name="phone" required placeholder="Số điện thoại" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
        <label className="sm:col-span-2 flex items-start gap-2 text-xs text-neutral-500">
          <input type="checkbox" required className="mt-0.5" name="consent" />
          Tôi đồng ý với <a href="/chinh-sach-bao-mat" className="underline text-brand">Chính sách bảo mật và xử lý dữ liệu cá nhân</a>
        </label>
        {status === "error" && <div className="sm:col-span-2 text-xs text-brand font-semibold">Không gửi được, vui lòng thử lại.</div>}
        <button disabled={status === "loading"} className="sm:col-span-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-bold w-fit disabled:opacity-60">
          {status === "loading" ? "Đang gửi…" : submitLabel}
        </button>
      </form>
    </div>
  );
}
