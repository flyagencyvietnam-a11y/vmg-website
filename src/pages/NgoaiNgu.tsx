import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { SmartFilter, type SectionValue } from "../components/SmartFilter";
import { PRODUCTS, NGOAI_NGU_GROUPS, isPublished } from "../data/products";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function NgoaiNgu() {
  useDocumentMeta(
    "Ngoại ngữ - Tiếng Anh & Tiếng Trung mọi độ tuổi | VMG",
    "Chương trình Ngoại ngữ VMG: tiếng Anh từ mầm non đến người lớn, luyện thi IELTS/TOEIC/VSTEP/Cambridge, tiếng Trung HSK, TESOL và đào tạo doanh nghiệp."
  );

  const [filter, setFilter] = useState<SectionValue>("all");
  const visibleGroups = NGOAI_NGU_GROUPS.filter((g) => filter === "all" || g.section === filter);

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
          <SmartFilter active={filter} onSelect={setFilter} />

          {visibleGroups.map((g) => {
            const items = PRODUCTS.filter((p) => isPublished(p) && p.section === g.section);
            if (items.length === 0) return null;
            return (
              <div key={g.section} className="py-10 border-b border-black/5 last:border-0">
                <h2 className="text-xl md:text-2xl font-display font-extrabold">{g.title}</h2>
                {g.note && <p className="mt-1 text-sm text-neutral-500">{g.note}</p>}
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p) => (
                    <ProductCard key={p.code} p={p} />
                  ))}
                </div>
              </div>
            );
          })}

          {visibleGroups.every((g) => PRODUCTS.filter((p) => isPublished(p) && p.section === g.section).length === 0) && (
            <div className="rounded-2xl border border-dashed border-black/15 bg-cream/60 p-8 text-center text-sm text-neutral-500">
              Chưa có chương trình nào khớp với lựa chọn này.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
