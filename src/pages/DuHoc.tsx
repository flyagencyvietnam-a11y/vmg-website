import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import summerUs from "../assets/products/summer-us.png";
import summerAu from "../assets/products/summer-au.png";
import summerCa from "../assets/products/summer-ca.png";
import summerSg from "../assets/products/summer-sg.png";
import summerPh from "../assets/products/summer-ph.png";
import longUs from "../assets/products/long-us.png";
import longAu from "../assets/products/long-au.png";
import longCa from "../assets/products/long-ca.png";
import longTw from "../assets/products/long-tw.png";
import studyAbroadEvent from "../assets/products/su-kien-du-hoc.png";

function DestinationCard({ name, desc, image, alt, overlay }: { name: string; desc: string; image: string; alt: string; overlay: string }) {
  return (
    <article className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay} opacity-15 mix-blend-multiply`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/5" />
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
    "Du học hè và du học dài hạn cùng VMP by VMG - Mỹ, Úc, Canada, Singapore, Philippines và Đài Loan."
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
            <DestinationCard name="Mỹ" desc="Trải nghiệm ngắn hạn 2-4 tuần." image={summerUs} alt="Học sinh Việt Nam tại khuôn viên đại học Mỹ vào mùa hè" overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Úc" desc="Trải nghiệm ngắn hạn 2-4 tuần." image={summerAu} alt="Nhóm học sinh khám phá khuôn viên đại học tại Úc" overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Canada" desc="Trải nghiệm ngắn hạn 2-4 tuần." image={summerCa} alt="Hoạt động khoa học mùa hè tại khuôn viên đại học Canada" overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Singapore" desc="Trải nghiệm ngắn hạn 2-4 tuần." image={summerSg} alt="Học sinh tham gia hoạt động công nghệ tại đại học Singapore" overlay="from-sky-400/80 to-vmp-blue/85" />
            <DestinationCard name="Philippines" desc="Trải nghiệm ngắn hạn 2-4 tuần." image={summerPh} alt="Lớp giao tiếp mùa hè tại khuôn viên đại học Philippines" overlay="from-sky-400/80 to-vmp-blue/85" />
          </div>
        </section>

        <section className="container-vmg pb-10">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">Du học dài hạn</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <DestinationCard name="Mỹ" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." image={longUs} alt="Du học sinh Việt Nam tại khuôn viên đại học Mỹ vào mùa thu" overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
            <DestinationCard name="Úc" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." image={longAu} alt="Sinh viên quốc tế học tập tại khuôn viên đại học Úc" overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
            <DestinationCard name="Canada" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." image={longCa} alt="Du học sinh tại khu nghiên cứu của đại học Canada" overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
            <DestinationCard name="Đài Loan" desc="Tư vấn ngành/trường, hồ sơ, visa, học bổng." image={longTw} alt="Sinh viên học tập tại khuôn viên đại học Đài Loan" overlay="from-vmp-blue/85 to-vmp-blue-dark/90" />
          </div>
        </section>

        <section className="container-vmg pb-10">
          <h2 className="text-xl md:text-2xl font-display font-extrabold">Sự kiện du học</h2>
          <div className="relative mt-6 min-h-[320px] overflow-hidden rounded-3xl">
            <img src={studyAbroadEvent} alt="Không gian triển lãm giáo dục quốc tế" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative grid min-h-[320px] place-items-center p-8 text-center text-sm text-white/90">
              [CẦN CẬP NHẬT: lịch sự kiện/triển lãm du học sắp tới – chưa có dữ liệu thật]
            </div>
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
