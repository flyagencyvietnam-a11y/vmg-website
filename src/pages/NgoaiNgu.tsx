import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, isPublished, type NgoaiNguSection } from "../data/products";
import { useDocumentMeta } from "../lib/useDocumentMeta";

function ProgramGroup({ title, note, sections }: { title: string; note?: string; sections: NgoaiNguSection[] }) {
  const items = PRODUCTS.filter((p) => isPublished(p) && sections.includes(p.section));
  if (items.length === 0) return null;
  return (
    <div className="py-10 border-b border-black/5 last:border-0">
      <h2 className="text-xl md:text-2xl font-display font-extrabold">{title}</h2>
      {note && <p className="mt-1 text-sm text-neutral-500">{note}</p>}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((p) => (
          <ProductCard key={p.code} p={p} />
        ))}
      </div>
    </div>
  );
}

export default function NgoaiNgu() {
  useDocumentMeta(
    "Ngoại ngữ - Tiếng Anh & Tiếng Trung mọi độ tuổi | VMG",
    "Chương trình Ngoại ngữ VMG: tiếng Anh từ mầm non đến người lớn, luyện thi IELTS/TOEIC/VSTEP/Cambridge, tiếng Trung HSK, TESOL và đào tạo doanh nghiệp."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Ngoại ngữ</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
            Tiếng Anh mọi độ tuổi, Tiếng Trung, luyện thi & chứng chỉ
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            Trụ cột Ngoại ngữ của VMG gồm tiếng Anh (mọi độ tuổi) và tiếng Trung (HSK) - không bao gồm Nhật/Hàn (thuộc mảng Xuất khẩu lao động, xem trang Du học).
            Phần lớn chương trình có cả hình thức Online và Offline - xem tag trên từng thẻ chương trình.
          </p>
        </section>

        <section className="container-vmg pb-16 md:pb-24">
          <ProgramGroup title="Theo độ tuổi" sections={["mamnon", "thieunhi", "thieunien"]} />
          <ProgramGroup title="Giao tiếp người lớn" sections={["adult"]} />
          <ProgramGroup
            title="Luyện thi & chứng chỉ"
            note="IELTS, TOEIC, VSTEP, Cambridge"
            sections={["luyenthi"]}
          />
          <ProgramGroup title="Tiếng Trung" sections={["tieng-trung"]} />
          <ProgramGroup title="VMG TESOL" sections={["tesol"]} />
          <ProgramGroup
            title="Đào tạo doanh nghiệp"
            note="Chương trình tiếng Anh cho doanh nghiệp - để lại thông tin tại trang Trường học & Doanh nghiệp để được tư vấn."
            sections={["b2b"]}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
