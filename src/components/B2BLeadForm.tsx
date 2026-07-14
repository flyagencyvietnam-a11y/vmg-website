import { useState } from "react";
import { supabase } from "../lib/supabase";

export function B2BLeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("loading");
    const { error } = await supabase.from("b2g_inquiries").insert({
      organization: form.get("organization") as string,
      contact_name: form.get("contact_name") as string,
      phone: form.get("phone") as string,
      need_notes: form.get("need_notes") as string,
      consent_given: form.get("consent") === "on",
    });
    setStatus(error ? "error" : "done");
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-dashed border-brand/30 bg-white p-6 text-center">
        <p className="text-sm font-semibold text-brand">✓ Cảm ơn quý đối tác! Đội hợp tác VMG sẽ liên hệ trong 24h làm việc.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="organization" required placeholder="Tên trường / công ty" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="contact_name" required placeholder="Người liên hệ" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
        <input name="phone" required placeholder="Số điện thoại" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
      </div>
      <textarea name="need_notes" placeholder="Nhu cầu cụ thể" rows={3} className="rounded-xl border border-neutral-200 px-4 py-3 text-sm" />
      <label className="flex items-start gap-2 text-xs text-neutral-500">
        <input type="checkbox" required className="mt-0.5" name="consent" />
        Tôi đồng ý với <a href="/chinh-sach-bao-mat" className="underline text-brand">Chính sách bảo mật và xử lý dữ liệu cá nhân</a>
      </label>
      {status === "error" && <div className="text-xs text-brand font-semibold">Không gửi được, vui lòng thử lại.</div>}
      <button disabled={status === "loading"} className="rounded-full bg-brand text-white px-6 py-3 text-sm font-bold w-fit disabled:opacity-60">
        {status === "loading" ? "Đang gửi…" : "Gửi yêu cầu hợp tác"}
      </button>
    </form>
  );
}
