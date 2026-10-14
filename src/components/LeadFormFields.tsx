export function LeadFormFields() {
  return <>
    <label className="absolute -left-[10000px]" aria-hidden="true">Website
      <input name="website" tabIndex={-1} autoComplete="off" />
    </label>
    <label className="sm:col-span-2 flex items-start gap-2 text-xs text-neutral-500">
      <input type="checkbox" required className="mt-0.5" name="consent" />
      <span>Tôi đồng ý với <a href="/chinh-sach-bao-mat" className="underline text-brand">Chính sách bảo mật và xử lý dữ liệu cá nhân</a></span>
    </label>
  </>;
}

export function LeadFormError({ message }: { message: string }) {
  return <div role="alert" className="sm:col-span-2 text-xs text-brand font-semibold">
    {message} Bạn cũng có thể gọi <a className="underline" href="tel:1900636838">1900 636 838</a> hoặc nhắn <a className="underline" href="https://zalo.me/3856493312075808344" target="_blank" rel="noreferrer">Zalo VMG</a>.
  </div>;
}
