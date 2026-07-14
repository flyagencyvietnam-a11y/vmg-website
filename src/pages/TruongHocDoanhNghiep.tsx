import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { B2BLeadForm } from "../components/B2BLeadForm";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function TruongHocDoanhNghiep() {
  useDocumentMeta(
    "Trường học & Doanh nghiệp | VMG",
    "Chương trình hợp tác đào tạo tiếng Anh cho trường học và doanh nghiệp cùng VMG - để lại thông tin để được tư vấn."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Trường học & Doanh nghiệp</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
            Hợp tác đào tạo tiếng Anh cho trường học và doanh nghiệp
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            VMG có chương trình riêng cho trường học và doanh nghiệp: đào tạo tiếng Anh in-house, hoạt động ngoại
            khóa. Để lại thông tin bên dưới, đội hợp tác VMG sẽ liên hệ tư vấn chi tiết.
          </p>
        </section>

        <section className="container-vmg pb-16 md:pb-24 max-w-xl">
          <div className="rounded-3xl bg-white border border-neutral-200 p-6 md:p-7 shadow-sm">
            <B2BLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
