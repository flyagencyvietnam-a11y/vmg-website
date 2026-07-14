import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import { useDocumentMeta } from "../lib/useDocumentMeta";

function DestinationCard({ name, desc, overlay }: { name: string; desc: string; overlay: string }) {
  return (
    <article className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow">
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} />
      <div className="relative h-full flex flex-col justify-end p-5 text-white">
        <h3 className="text-lg font-display font-extrabold">{name}</h3>
        <p className="mt-1 text-sm text-white/90">{desc}</p>
      </div>
    </article>
  );
}

export default function DuHoc() {
  useDocumentMeta(
    "Du học - VMP by VMG | VMG",
    "Du học hè, du học dài hạn và xuất khẩu lao động cùng VMP by VMG - Mỹ, Úc, Canada, Singapore, Philippines, Đài Loan, Hàn Quốc, Nhật Bản."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Du học - VMP by VMG</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-extrabold max-w-2xl">
            Chuẩn bị hành trang du học cùng VMP
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            VMP là mảng Du học của VMG. Nội dung chi tiết của trang này đang chờ đội VMP xác nhận trước khi công bố
            đầy đủ - dưới đây là các hướng chương trình chính.
          </p>
        </section>

        <section className="container-vmg pb-10">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">Du học hè (ngắn hạn)</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DestinationCard name="Mỹ" desc="Trải nghiệm ngắn hạn 2-4 tuần." overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Úc" desc="Trải nghiệm ngắn hạn 2-4 tuần." overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Canada" desc="Trải nghiệm ngắn hạn 2-4 tuần." overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Singapore" desc="Trải nghiệm ngắn hạn 2-4 tuần." overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Philippines" desc="Trải nghiệm ngắn hạn 2-4 tuần." overlay="from-sky-400/80 to-vmp-blue/85" />
          </div>
        </section>

        <section className="container-vmg pb-10">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">Du học dài hạn</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DestinationCard name="Mỹ" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
            <DestinationCard name="Úc" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
            <DestinationCard name="Canada" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
            <DestinationCard name="Đài Loan" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
          </div>
        </section>

        <section className="container-vmg pb-10">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">Xuất khẩu lao động</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DestinationCard name="Hàn Quốc" desc="Tư vấn đơn hàng và thủ tục xuất cảnh." overlay="from-indigo-500/80 to-vmp-blue-dark/85" />
            <DestinationCard name="Nhật Bản" desc="Tư vấn đơn hàng và thủ tục xuất cảnh." overlay="from-indigo-500/80 to-vmp-blue-dark/85" />
            <DestinationCard name="Đài Loan" desc="Tư vấn đơn hàng và thủ tục xuất cảnh." overlay="from-indigo-500/80 to-vmp-blue-dark/85" />
          </div>
        </section>

        <section className="container-vmg pb-10">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">Sự kiện du học</h2>
          <div className="mt-6 rounded-3xl border border-dashed border-black/15 bg-cream/60 p-8 text-center text-sm text-neutral-500">
            [CẦN CẬP NHẬT: lịch sự kiện/triển lãm du học sắp tới – chưa có dữ liệu thật]
          </div>
        </section>

        <section className="container-vmg pb-16 md:pb-24 max-w-xl">
          <LeadCaptureForm source="du-hoc-detail" title="Đăng ký tư vấn du học VMP" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
