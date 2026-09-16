import { ArrowUpRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { VMP, VMP_LONG_TERM_DESTINATIONS, VMP_SERVICE_STEPS, VMP_SUMMER_PROGRAMS } from "../data/vmp";
import vmpLogo from "../assets/vmp/vmp-logo.webp";
import summerUs from "../assets/products/summer-us.webp";
import summerAu from "../assets/products/summer-au.webp";
import summerSg from "../assets/products/summer-sg.webp";
import summerPh from "../assets/products/summer-ph.webp";
import longUs from "../assets/products/long-us.webp";
import longAu from "../assets/products/long-au.webp";
import longCa from "../assets/products/long-ca.webp";
import longTw from "../assets/products/long-tw.webp";
import studyAbroadEvent from "../assets/products/su-kien-du-hoc.webp";

const SUMMER_IMAGES: Record<string, string> = {
  Mỹ: summerUs,
  Úc: summerAu,
  Singapore: summerSg,
  Philippines: summerPh,
};

const LONG_TERM_IMAGES: Record<string, string> = {
  Mỹ: longUs,
  Úc: longAu,
  Singapore: longTw,
  Philippines: longCa,
  "Canada & điểm đến khác": studyAbroadEvent,
};

function DestinationCard({ name, description, href, image }: { name: string; description: string; href: string; image: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex min-h-[360px] overflow-hidden rounded-3xl bg-vmp-blue shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img src={image} alt={`Minh họa hành trình du học ${name} cùng VMP`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06134f] via-[#06134f]/35 to-transparent" />
      <div className="relative mt-auto p-6 text-white">
        <h3 className="text-2xl font-display font-extrabold">{name}</h3>
        <p className="mt-2 text-sm leading-6 text-white/85">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#ffbf58]">Xem trên website VMP <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </a>
  );
}

export default function DuHoc() {
  useDocumentMeta(
    "Du học cùng VMP by VMG | Lộ trình cá nhân hóa",
    "Khám phá du học hè, du học dài hạn, hỗ trợ hồ sơ và các điểm đến quốc tế cùng VMP by VMG Global Pathways."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#071a73] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,173,49,.28),transparent_32%)]" aria-hidden="true" />
          <div className="container-vmg relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div>
              <img src={vmpLogo} alt="VMP by VMG Global Pathways" className="h-14 w-auto rounded-xl bg-white p-2" />
              <p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[#ffbf58]">Mở cửa tương lai, kết nối toàn cầu</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-display font-extrabold leading-tight md:text-6xl">Một lộ trình du học bắt đầu từ chính bạn</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78">
                VMP đồng hành để người học làm rõ mục tiêu, lựa chọn điểm đến và chuẩn bị hồ sơ theo một lộ trình phù hợp với năng lực, thời gian và kế hoạch của gia đình.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={VMP.contact} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#f59b23] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#df8611]">
                  Nhận tư vấn từ VMP <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={VMP.assessment} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                  Làm bài test năng lực
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-[#ffbf58]">Đồng hành cùng VMP</p>
              <ul className="mt-5 space-y-4">
                {["Tư vấn lộ trình theo hồ sơ và mục tiêu cá nhân", "Cập nhật cơ hội học bổng phù hợp", "Hỗ trợ chuẩn bị hồ sơ trường và visa", "Chi phí được trao đổi rõ theo từng phương án", "Kết nối trực tiếp với hệ sinh thái nội dung của VMP"].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-white/85"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ffbf58]" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="container-vmg py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Chương trình hè 2026</p>
            <h2 className="mt-3 text-3xl font-display font-extrabold md:text-5xl">Học qua trải nghiệm, trưởng thành qua hành trình</h2>
            <p className="mt-4 leading-7 text-neutral-600">Các chương trình chi tiết, lịch trình và điều kiện được cập nhật trực tiếp trên website VMP.</p>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VMP_SUMMER_PROGRAMS.map((item) => <DestinationCard key={item.name} {...item} image={SUMMER_IMAGES[item.name]} />)}
          </div>
        </section>

        <section className="bg-cream py-16 md:py-24">
          <div className="container-vmg">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Du học dài hạn</p>
              <h2 className="mt-3 text-3xl font-display font-extrabold md:text-5xl">Chọn điểm đến từ một mục tiêu rõ ràng</h2>
              <p className="mt-4 leading-7 text-neutral-600">Thông tin ngành, trường, học bổng và kỳ nhập học thay đổi theo từng hồ sơ. VMG ưu tiên đưa bạn đến nguồn tư vấn cập nhật của VMP.</p>
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {VMP_LONG_TERM_DESTINATIONS.map((item) => <DestinationCard key={item.name} {...item} image={LONG_TERM_IMAGES[item.name]} />)}
            </div>
          </div>
        </section>

        <section className="container-vmg py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Lộ trình đồng hành</p>
              <h2 className="mt-3 text-3xl font-display font-extrabold md:text-4xl">Từ định hướng đến ngày sẵn sàng lên đường</h2>
              <p className="mt-4 leading-7 text-neutral-600">Mỗi hồ sơ có xuất phát điểm khác nhau. Các bước dưới đây giúp gia đình hình dung hành trình làm việc cùng đội ngũ tư vấn.</p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {VMP_SERVICE_STEPS.map(([title, description], index) => (
                <li key={title} className="rounded-3xl border border-black/8 bg-white p-6 shadow-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-white">{index + 1}</span>
                  <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container-vmg pb-16 md:pb-24">
          <div className="grid gap-6 rounded-[2rem] bg-[#071a73] p-7 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ffbf58]">Các hướng đi khác tại VMP</p>
              <h2 className="mt-3 text-2xl font-display font-extrabold md:text-4xl">Tìm hiểu xuất khẩu lao động và cẩm nang du học</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">Thông tin chương trình, điều kiện và bài viết cập nhật được quản lý trên website chuyên biệt của VMP.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href={VMP.workAbroad} target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#071a73]">Xuất khẩu lao động ↗</a>
              <a href={VMP.website} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white">Góc du học VMP ↗</a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-600">
            <a href={VMP.phoneHref} className="inline-flex items-center gap-2 font-bold text-brand"><Phone className="h-4 w-4" />{VMP.phone}</a>
            <a href={`mailto:${VMP.email}`} className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{VMP.email}</a>
            <span>Giờ tư vấn: {VMP.hours}</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
