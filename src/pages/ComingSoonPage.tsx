import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";

type Props = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  note: string;
  links?: { label: string; href: string }[];
};

// Honest "sắp ra mắt" page for sitemap sections that CLAUDE.md explicitly flags as
// missing real data (teacher profiles, student stories, articles, job postings) -
// per CLAUDE.md §0/§9, these must not be filled with invented content.
export default function ComingSoonPage({ eyebrow, title, metaTitle, metaDescription, note, links }: Props) {
  useDocumentMeta(metaTitle, metaDescription);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-20 md:py-28 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">{eyebrow}</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl mx-auto">{title}</h1>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto">{note}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {(links ?? [
              { label: "Khám phá Ngoại ngữ", href: "/ngoai-ngu" },
              { label: "Tìm hiểu Du học", href: "/du-hoc" },
            ]).map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={index === 0
                  ? "inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                  : "inline-flex items-center rounded-full border border-brand/25 bg-white px-6 py-3 text-sm font-bold text-brand transition-colors hover:border-brand"}
              >
                {link.label} →
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
