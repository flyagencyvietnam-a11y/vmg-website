import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, isPublished } from "../data/products";
import { useDocumentMeta } from "../lib/useDocumentMeta";

const ONLINE_PRODUCTS = PRODUCTS.filter((p) => isPublished(p) && p.format !== "offline");

export default function HocOnline() {
  useDocumentMeta(
    "Học online | VMG",
    "Danh sách chương trình có hình thức học online tại VMG - từ luyện thi IELTS/VSTEP đến TESOL và tiếng Anh giao tiếp."
  );

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

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ONLINE_PRODUCTS.map((p) => (
              <ProductCard key={p.code} p={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
