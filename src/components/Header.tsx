import { Logo } from "./Logo";

const NAV = [
  { label: "Ngoại ngữ", href: "#" },
  { label: "Du học", href: "#" },
  { label: "Hướng nghiệp", href: "#" },
  { label: "Học online", href: "#" },
  { label: "Trung tâm", href: "#" },
  { label: "Tin tức", href: "#" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="container-vmg flex items-center justify-between py-2.5">
        <a href="#top">
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
          href="#lien-he"
          className="inline-flex items-center rounded-full bg-brand text-white px-5 py-2.5 text-sm font-bold hover:bg-brand-dark transition-colors"
        >
          Liên hệ tư vấn
        </a>
      </div>
    </header>
  );
}
