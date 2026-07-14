import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";

type Props = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  note: string;
};

// Honest "sắp ra mắt" page for sitemap sections that CLAUDE.md explicitly flags as
// missing real data (teacher profiles, student stories, articles, job postings) -
// per CLAUDE.md §0/§9, these must not be filled with invented content.
export default function ComingSoonPage({ eyebrow, title, metaTitle, metaDescription, note }: Props) {
  useDocumentMeta(metaTitle, metaDescription);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-20 md:py-28 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">{eyebrow}</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl mx-auto">{title}</h1>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto">{note}</p>
          <a
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-bold hover:bg-brand-dark transition-colors"
          >
            ← Về trang chủ
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
