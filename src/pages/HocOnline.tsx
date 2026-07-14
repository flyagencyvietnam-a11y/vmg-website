import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { SmartFilter, type SectionValue } from "../components/SmartFilter";
import { PRODUCTS, NGOAI_NGU_GROUPS, isPublished } from "../data/products";
import { useDocumentMeta } from "../lib/useDocumentMeta";

const ONLINE_PRODUCTS = PRODUCTS.filter((p) => isPublished(p) && p.format !== "offline");

export default function HocOnline() {
  useDocumentMeta(
    "Học online | VMG",
    "Danh sách chương trình có hình thức học online tại VMG - từ luyện thi IELTS/VSTEP đến TESOL và tiếng Anh giao tiếp."
  );

  const [filter, setFilter] = useState<SectionValue>("all");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const visibleGroups = NGOAI_NGU_GROUPS.filter((g) => filter === "all" || g.section === filter);

  const groupItems = (section: string) =>
    ONLINE_PRODUCTS.filter((p) => p.section === section && (!onlineOnly || p.format === "online"));
  const hasAnyResults = visibleGroups.some((g) => groupItems(g.section).length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Học online</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
            Học online, cùng cam kết đầu ra như tại trung tâm
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            Học mọi lúc mọi nơi, chủ động thời gian - chọn chương trình phù hợp với mục tiêu của bạn. Chương trình
            gắn tag "Online" là học online-only; tag "Online & Offline" có thể chọn học tại trung tâm hoặc trực tuyến.
          </p>
        </section>

        <section className="container-vmg pb-16 md:pb-24">
          <SmartFilter active={filter} onSelect={setFilter} />

          <div className="flex flex-wrap items-center gap-2 mb-8 -mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mr-1">Hình thức</span>
            <button
              onClick={() => setOnlineOnly(false)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                !onlineOnly ? "bg-brand text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setOnlineOnly(true)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                onlineOnly ? "bg-brand text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Chỉ Online
            </button>
          </div>

          {visibleGroups.map((g) => {
            const items = groupItems(g.section);
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

          {!hasAnyResults && (
            <div className="rounded-2xl border border-dashed border-black/15 bg-cream/60 p-8 text-center text-sm text-neutral-500">
              Chưa có chương trình online nào khớp với lựa chọn này.{" "}
              {onlineOnly && 'Thử bỏ chọn "Chỉ Online", hoặc xem '}
              {!onlineOnly && "Xem "}
              bản offline tại{" "}
              <a href="/ngoai-ngu" className="text-brand underline font-semibold">/ngoai-ngu</a>.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
