import { useEffect } from "react";
import { ArrowRight, Building2, Eye, GraduationCap, MapPin, Network, Target } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import chairmanImage from "../assets/vmg/chairman-nguyen-quoc-khanh.png";
import chairmanSignature from "../assets/vmg/chairman-nguyen-quoc-khanh-signature.png";

const PILLARS = [
  {
    name: "Ngoại ngữ",
    number: "01",
    desc: "Tiếng Anh cho nhiều độ tuổi và tiếng Trung (HSK), từ xây nền tảng đến luyện thi chứng chỉ.",
    href: "/ngoai-ngu",
  },
  {
    name: "Du học",
    number: "02",
    desc: "VMP by VMG đồng hành với các lựa chọn du học hè, du học dài hạn và xuất khẩu lao động.",
    href: "/du-hoc",
  },
  {
    name: "Hướng nghiệp",
    number: "03",
    desc: "Không gian định hướng nghề nghiệp và các hoạt động trải nghiệm theo mùa; chương trình cụ thể đang được hoàn thiện.",
    href: "/huong-nghiep",
  },
];

const PARTNERS = [
  { name: "IDP", role: "IELTS Platinum Partner" },
  { name: "British Council", role: "Đối tác đào tạo IELTS" },
  { name: "Cambridge Assessment English", role: "Đối tác khảo thí ủy quyền, mã trung tâm VN055" },
];

export default function VeVmg() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    "Về VMG - Hệ sinh thái giáo dục và đào tạo Việt Mỹ",
    "Khám phá tổng quan hệ sinh thái VMG với ba trụ cột Ngoại ngữ, Du học và Hướng nghiệp, cùng tầm nhìn, sứ mệnh và hành trình phát triển."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="brand-atmosphere relative overflow-hidden py-16 md:py-24">
          <div className="brand-atmosphere-orb brand-atmosphere-orb-one" aria-hidden="true" />
          <div className="brand-atmosphere-orb brand-atmosphere-orb-two" aria-hidden="true" />
          <div className="container-vmg relative grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.2em] text-brand">Về VMG</span>
              <h1 className="mt-4 max-w-3xl text-4xl font-display font-extrabold leading-[1.08] tracking-tight md:text-6xl">
                Một hệ sinh thái giáo dục cho những hành trình dài lâu
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
                Hệ thống Giáo dục và Đào tạo Việt Mỹ VMG kết nối Ngoại ngữ, Du học và Hướng nghiệp trong một
                hành trình phát triển liền mạch, với các lựa chọn học trực tiếp và online.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#he-sinh-thai" className="button-lift inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand-dark">
                  Khám phá hệ sinh thái <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/he-thong-trung-tam" className="inline-flex items-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-bold text-neutral-800 hover:border-brand/30 hover:text-brand">
                  Xem hệ thống trung tâm
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-dark via-[#741722] to-[#3f1017] p-7 text-white shadow-2xl shadow-brand/20 md:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" aria-hidden="true" />
              <div className="relative">
                <Network className="h-9 w-9 text-gold-soft" strokeWidth={1.6} />
                <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-gold-soft">VMG - Dẫn Lối Tương Lai</p>
                <p className="mt-3 text-2xl font-display font-bold leading-snug md:text-3xl">
                  Ba trụ cột. Nhiều điểm chạm. Một hành trình phát triển.
                </p>
                <div className="mt-9 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <div className="text-3xl font-display font-extrabold text-gold-soft">23</div>
                    <div className="mt-1 text-xs text-white/65">năm hoạt động</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <div className="text-3xl font-display font-extrabold text-gold-soft">10</div>
                    <div className="mt-1 text-xs text-white/65">trung tâm</div>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-white/65">Hiện diện tại Đồng Nai và Bình Phước.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="he-sinh-thai" className="container-vmg scroll-mt-24 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Hệ sinh thái VMG</span>
            <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight md:text-5xl">Ba trụ cột, cùng hướng về tương lai người học</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <a key={pillar.name} href={pillar.href} className="group relative min-h-[310px] overflow-hidden rounded-[2rem] border border-black/5 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="text-6xl font-display font-extrabold text-brand/10">{pillar.number}</div>
                <h3 className="mt-8 text-2xl font-display font-extrabold">{pillar.name}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{pillar.desc}</p>
                <span className="absolute bottom-7 left-7 inline-flex items-center gap-2 text-sm font-bold text-brand">
                  Tìm hiểu thêm <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-[#271014] py-16 text-white md:py-24">
          <div className="container-vmg">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-gold-soft">Định hướng phát triển</span>
              <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight md:text-5xl">Tầm nhìn và sứ mệnh</h2>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Hai nội dung dưới đây đang chờ VMG cung cấp bản chính thức trước khi xuất bản.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7 md:p-9">
                <Eye className="h-7 w-7 text-gold-soft" />
                <h3 className="mt-6 text-2xl font-display font-bold">Tầm nhìn</h3>
                <p className="mt-4 text-sm leading-7 text-white/55">[CẦN NỘI DUNG THẬT: tuyên bố tầm nhìn chính thức của VMG]</p>
              </article>
              <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7 md:p-9">
                <Target className="h-7 w-7 text-gold-soft" />
                <h3 className="mt-6 text-2xl font-display font-bold">Sứ mệnh</h3>
                <p className="mt-4 text-sm leading-7 text-white/55">[CẦN NỘI DUNG THẬT: tuyên bố sứ mệnh chính thức của VMG]</p>
              </article>
            </div>
          </div>
        </section>

        <section className="brand-pattern py-16 md:py-24">
          <div className="container-vmg grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-12">
            <div className="relative min-h-[430px] overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#f0dfba] via-[#d2a95d] to-[#98651f] p-7 text-[#331c10] shadow-xl shadow-gold/15">
              <div className="absolute -bottom-12 -right-8 h-60 w-60 rounded-full border border-white/30" aria-hidden="true" />
              <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-white/20 blur-2xl" aria-hidden="true" />
              <div className="relative z-10">
                <span className="inline-flex rounded-full border border-[#331c10]/10 bg-white/45 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] backdrop-blur-sm">
                  Chủ tịch VMG
                </span>
                <div className="mt-4 font-display text-2xl font-extrabold">Ông Nguyễn Quốc Khánh</div>
              </div>
              <img
                src={chairmanImage}
                alt="Chủ tịch Nguyễn Quốc Khánh cùng đại diện các thế hệ học viên"
                className="absolute bottom-0 left-1/2 z-[1] w-[112%] max-w-none -translate-x-1/2 drop-shadow-2xl sm:w-[96%]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Thông điệp Chủ tịch</span>
              <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight md:text-5xl">Một lời dẫn cho hành trình phía trước</h2>
              <div className="mt-7 rounded-3xl border border-dashed border-brand/25 bg-white/70 p-6 text-sm leading-7 text-neutral-500">
                [CẦN NỘI DUNG THẬT: thông điệp chính thức của Chủ tịch Nguyễn Quốc Khánh. Không sử dụng nội dung mô phỏng hoặc trích dẫn chưa được duyệt.]
              </div>
              <img
                src={chairmanSignature}
                alt="Chữ ký Chủ tịch Nguyễn Quốc Khánh"
                className="mt-6 h-14 w-auto self-start object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="container-vmg py-16 md:py-24">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <GraduationCap className="h-6 w-6 text-brand" />
              <div className="mt-5 text-3xl font-display font-extrabold">23 năm</div>
              <p className="mt-2 text-sm text-neutral-600">Hành trình giáo dục và đào tạo từ giai đoạn 2002–2003.</p>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <MapPin className="h-6 w-6 text-brand" />
              <div className="mt-5 text-3xl font-display font-extrabold">10 trung tâm</div>
              <p className="mt-2 text-sm text-neutral-600">Hệ thống hiện diện tại Đồng Nai và Bình Phước.</p>
            </div>
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <Building2 className="h-6 w-6 text-brand" />
              <div className="mt-5 text-3xl font-display font-extrabold">200+ trường</div>
              <p className="mt-2 text-sm text-neutral-600">Hơn 42.000 học sinh trong hệ thống trường học đối tác.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-cream py-16 md:py-20">
          <div className="container-vmg">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Đối tác &amp; chứng nhận</span>
              <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight md:text-4xl">Kết nối trong đào tạo IELTS và khảo thí</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {PARTNERS.map((partner) => (
                <div key={partner.name} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                  <div className="font-display text-lg font-extrabold">{partner.name}</div>
                  <div className="mt-2 text-xs leading-5 text-neutral-500">{partner.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
