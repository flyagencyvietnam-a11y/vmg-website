import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, isPublished } from "../data/products";
import { useDocumentMeta } from "../lib/useDocumentMeta";

const TESOL_PRODUCTS = PRODUCTS.filter((product) => isPublished(product) && product.section === "tesol");

const WORK_ABROAD_DESTINATIONS = [
  { name: "Hàn Quốc", overlay: "from-indigo-500/80 to-plum/85" },
  { name: "Nhật Bản", overlay: "from-brand/80 to-plum/85" },
  { name: "Đài Loan", overlay: "from-gold/80 to-brand-dark/85" },
];

export default function HuongNghiep() {
  useDocumentMeta(
    "Hướng nghiệp - TESOL & Xuất khẩu lao động | VMG",
    "Khám phá các chương trình Hướng nghiệp tại VMG gồm TESOL và định hướng Xuất khẩu lao động tại Hàn Quốc, Nhật Bản, Đài Loan."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Hướng nghiệp</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-3xl">
            Phát triển năng lực nghề nghiệp, mở rộng cơ hội tương lai
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            Trụ cột Hướng nghiệp tập trung vào các chương trình TESOL dành cho người theo đuổi nghề giảng dạy tiếng Anh và định hướng Xuất khẩu lao động.
          </p>
        </section>

        <section className="container-vmg pb-14 md:pb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Nghề giảng dạy tiếng Anh</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-display font-extrabold">Các chương trình TESOL</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">Lựa chọn lộ trình học trực tiếp, kết hợp hoặc online phù hợp với kinh nghiệm và mục tiêu nghề nghiệp.</p>
          <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESOL_PRODUCTS.map((product) => <ProductCard key={product.code} p={product} basePath="/huong-nghiep" />)}
          </div>
        </section>

        <section className="bg-cream/60 py-14 md:py-20">
          <div className="container-vmg">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Cơ hội làm việc quốc tế</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-extrabold">Xuất khẩu lao động</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">Tìm hiểu định hướng làm việc tại Hàn Quốc, Nhật Bản và Đài Loan. Nội dung chi tiết của từng chương trình sẽ được cập nhật sau khi có thông tin được xác nhận.</p>
            <div className="mt-7 grid sm:grid-cols-3 gap-5">
              {WORK_ABROAD_DESTINATIONS.map((destination) => (
                <article key={destination.name} className="relative min-h-64 overflow-hidden rounded-3xl shadow-md">
                  <div className={`absolute inset-0 bg-gradient-to-br ${destination.overlay}`} />
                  <div className="relative flex h-full flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-display font-extrabold">{destination.name}</h3>
                    <p className="mt-2 text-sm text-white/80">[CẦN NỘI DUNG THẬT: thông tin chương trình và điều kiện tham gia]</p>
                  </div>
                </article>
              ))}
            </div>
            <a href="/lien-he" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark">Đăng ký nhận tư vấn →</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
