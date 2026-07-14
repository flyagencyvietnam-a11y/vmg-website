import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";

const PILLARS = [
  { name: "Ngoại ngữ", desc: "Tiếng Anh mọi độ tuổi và tiếng Trung (HSK), từ mầm non đến luyện thi IELTS/TOEIC/VSTEP/Cambridge.", href: "/ngoai-ngu" },
  { name: "Du học", desc: "VMP by VMG - du học hè, du học dài hạn và xuất khẩu lao động.", href: "/du-hoc" },
  { name: "Hướng nghiệp", desc: "Trụ cột đang được xây dựng, hoạt động trải nghiệm theo mùa.", href: "/huong-nghiep" },
];

const PARTNERS = [
  { name: "IDP", role: "IELTS Platinum Partner" },
  { name: "British Council", role: "Đối tác đào tạo IELTS" },
  { name: "Cambridge Assessment English", role: "Đối tác khảo thí ủy quyền, mã trung tâm VN055" },
];

export default function VeVmg() {
  useDocumentMeta(
    "Về VMG - Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ",
    "23 năm hoạt động, hệ thống trung tâm tại Đồng Nai cùng các chương trình học online phục vụ học viên toàn quốc. VMG là đối tác IELTS Platinum của IDP, British Council và Cambridge Assessment English."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Về VMG</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
            VMG - Dẫn Lối Tương Lai
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            Viet My Group (VMG) - Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ, hoạt động từ 2002-2003 đến nay (23 năm),
            với hệ thống trung tâm tại Đồng Nai và các chương trình học online phục vụ học viên trên toàn quốc.
          </p>
        </section>

        <section className="container-vmg pb-14">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">3 trụ cột</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-5">
            {PILLARS.map((p) => (
              <a key={p.name} href={p.href} className="rounded-3xl border border-black/5 bg-cream p-6 hover:shadow-md transition-shadow">
                <h3 className="font-display font-bold text-lg">{p.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{p.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="container-vmg pb-16 md:pb-24">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">Đối tác & chứng nhận IELTS</h2>
          <p className="mt-2 text-sm text-neutral-500 max-w-2xl">
            VMG là đối tác chính thức của cả ba tổ chức sau cho các chương trình IELTS và khảo thí quốc tế.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-5">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm">
                <div className="font-display font-extrabold text-lg">{p.name}</div>
                <div className="mt-1 text-xs text-neutral-500">{p.role}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
