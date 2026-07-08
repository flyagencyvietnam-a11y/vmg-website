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
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="container-vmg flex items-center justify-between py-2.5">
        <a href="/">
          <Logo />
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-semibold text-neutral-700 hover:text-brand transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="/lien-he"
          className="inline-flex items-center rounded-full bg-brand text-white px-5 py-2.5 text-sm font-bold hover:bg-brand-dark transition-colors"
        >
          Liên hệ tư vấn
        </a>
      </div>
    </header>
  );
}
