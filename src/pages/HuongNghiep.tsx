import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function HuongNghiep() {
  useDocumentMeta(
    "Hướng nghiệp - Sắp ra mắt | VMG",
    "Trụ cột Hướng nghiệp của VMG đang được xây dựng - theo dõi để cập nhật chương trình mới nhất."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-20 md:py-28 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Hướng nghiệp</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl mx-auto">
            Trụ cột thứ ba của VMG - đang định hướng, sắp ra mắt
          </h1>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto">
            Bên cạnh Ngoại ngữ và Du học, VMG đang xây dựng trụ cột Hướng nghiệp với các hoạt động trải nghiệm theo
            mùa. Chương trình cụ thể sẽ được công bố khi sẵn sàng - quay lại trang này sau để cập nhật.
          </p>
          <a
            href="/lien-he"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-bold hover:bg-brand-dark transition-colors"
          >
            Để lại thông tin nhận cập nhật →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
