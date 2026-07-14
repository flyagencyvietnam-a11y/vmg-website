import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { label: "Ngoại ngữ", href: "/ngoai-ngu" },
  { label: "Du học", href: "/du-hoc" },
  { label: "Hướng nghiệp", href: "/huong-nghiep" },
  { label: "Học online", href: "/hoc-online" },
  { label: "Trung tâm", href: "/he-thong-trung-tam" },
  { label: "Tin tức", href: "/tin-tuc" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="container-vmg flex items-center justify-between py-2">
        <a href="/" aria-label="Trang chủ VMG"><Logo className="h-12 md:h-14" /></a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => <a key={n.label} href={n.href} className="text-sm font-semibold text-neutral-700 transition-colors hover:text-brand">{n.label}</a>)}
        </nav>
        <a href="/lien-he" className="hidden items-center rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand/20 transition-colors hover:bg-brand-dark sm:inline-flex">Liên hệ tư vấn</a>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-800 lg:hidden" aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-black/5 bg-white px-5 py-4 shadow-xl lg:hidden">
          <nav className="container-vmg grid gap-1 px-0">
            {NAV.map((n) => <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-bold text-neutral-700 hover:bg-cream hover:text-brand">{n.label}</a>)}
            <a href="/lien-he" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-brand px-3 py-3 text-center text-sm font-bold text-white">Liên hệ tư vấn</a>
          </nav>
        </div>
      )}
    </header>
  );
}
