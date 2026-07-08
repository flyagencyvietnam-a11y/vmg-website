import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-vmg py-24 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-brand">Đang xây dựng</span>
        <h1 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">{title}</h1>
        <p className="mt-4 text-neutral-600 max-w-xl mx-auto">
          Trang này đang được hoàn thiện ở bước tiếp theo. Vui lòng quay lại sau.
        </p>
        <a href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-bold hover:bg-brand-dark transition-colors">
          ← Về trang chủ
        </a>
      </main>
      <Footer />
    </div>
  );
}
