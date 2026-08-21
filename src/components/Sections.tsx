import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Eye, Image, Network, Quote, Target } from "lucide-react";
import { PRODUCTS, FORMAT_LABEL, isLearningProduct, type AgeGroupFilter } from "../data/products";
import { getProductVisual } from "../data/productVisuals";
import suKienDuHocImage from "../assets/products/su-kien-du-hoc.png";
import vmpLogo from "../assets/vmp/vmp-logo.webp";
import vmpShortTermImage from "../assets/vmp/short-term-study.webp";
import vmpGlobalStudyImage from "../assets/vmp/global-study-pathways.webp";
import chairmanImage from "../assets/vmg/chairman-nguyen-quoc-khanh.png";
import ft15Object from "../assets/product-objects/ft15-3d.webp";
import ieltsExpressObject from "../assets/product-objects/ielts-express-3d.webp";
import vstepObject from "../assets/product-objects/vstep-3d.webp";
import giaoTiepObject from "../assets/product-objects/giao-tiep-3d.webp";
import tesolObject from "../assets/product-objects/tesol-3d.webp";
import edunextObject from "../assets/product-objects/edunext-3d.webp";
import { STUDENT_MOMENTS } from "../data/vmgPhotoLibrary";
import { supabase } from "../lib/supabase";

// The 6 flagship online-first products get their own homepage highlight
// (OnlineCoursesSection) - everything else shows in the general carousel.
const FLAGSHIP_ONLINE_CODES = ["FT15", "IE", "VSTEP", "GT", "TESOL", "EDU"];
const PUBLIC_PRODUCTS = PRODUCTS.filter(isLearningProduct);

/* ---------------- Programs ---------------- */

type ProgramFilter = "all" | AgeGroupFilter;
const PROGRAMS = PUBLIC_PRODUCTS.filter((p) => p.section !== "tesol" && !FLAGSHIP_ONLINE_CODES.includes(p.code));

const FILTERS = [
  { key: "all", label: "Tất cả" },
  { key: "kids", label: "Thiếu nhi" },
  { key: "teens", label: "Teen" },
  { key: "adult", label: "Người lớn" },
  { key: "b2b", label: "Doanh nghiệp" },
] as const;

export function ProgramsSection() {
  const [filter, setFilter] = useState<ProgramFilter>("all");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const visible = PROGRAMS.filter((p) => filter === "all" || p.ageGroup === filter);

  // Hero journey blocks (Thiếu nhi / Teen) land here pre-filtered instead of forcing the quiz.
  useEffect(() => {
    function handleSetFilter(e: Event) {
      const detail = (e as CustomEvent<{ filter: ProgramFilter }>).detail;
      if (detail?.filter) setFilter(detail.filter);
    }
    window.addEventListener("vmg:set-program-filter", handleSetFilter);
    return () => window.removeEventListener("vmg:set-program-filter", handleSetFilter);
  }, []);

  // Switching filter rewinds the carousel so the new group starts from its first card.
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [filter]);

  return (
    <section id="chuong-trinh" className="programs-surface relative overflow-hidden py-16 md:py-28">
      <div className="container-vmg relative">
      <div className="grid items-end gap-6 md:grid-cols-[1.25fr_.75fr]">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Chương trình học</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold tracking-tight">Bắt đầu đúng,<br className="hidden md:block" /> tiến xa hơn.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-neutral-600 md:pb-1">Mỗi độ tuổi, mục tiêu và nhịp học cần một điểm bắt đầu khác nhau. Chọn nhóm phù hợp để khám phá.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === f.key ? "bg-brand text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div
        ref={scrollerRef}
        className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {visible.slice(0, 6).map((p, index) => (
          <a
            key={p.name}
            href="/ngoai-ngu"
            aria-label={`Tìm hiểu chương trình ${p.name}`}
            className="editorial-card group relative block h-[390px] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-md transition duration-500 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 md:h-[420px]"
          >
            {index === 0 ? (
              <>
                <img src={getProductVisual(p.code).src} alt={getProductVisual(p.code).alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#160c0d]/95 via-[#160c0d]/72 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-6 text-white md:p-7">
                  <div className="flex items-center justify-start">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-800 shadow-sm">{FORMAT_LABEL[p.format]}</span>
                  </div>
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-display font-extrabold md:text-3xl">{p.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/90">{p.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white group-hover:underline">Tìm hiểu thêm →</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col">
                <div className="relative h-[54%] shrink-0 overflow-hidden">
                  <img src={getProductVisual(p.code).src} alt={getProductVisual(p.code).alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <div className="flex min-h-0 flex-1 flex-col p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand">{FORMAT_LABEL[p.format]}</span>
                  <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-neutral-950">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-600">{p.desc}</p>
                  <span className="mt-auto pt-3 text-xs font-bold text-brand">Tìm hiểu thêm →</span>
                </div>
              </div>
            )}
          </a>
        ))}
      </div>
      <div className="mt-8 flex justify-end border-t border-brand/10 pt-6">
        <a href="/ngoai-ngu" className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-brand text-brand px-6 py-3 text-sm font-bold hover:bg-brand hover:text-white transition-colors">
          Xem tất cả chương trình →
        </a>
      </div>
      </div>
    </section>
  );
}

/* ---------------- Online courses (TMĐT) ---------------- */

const FLAGSHIP_ONLINE_PRODUCTS = PUBLIC_PRODUCTS.filter((p) => FLAGSHIP_ONLINE_CODES.includes(p.code));

const ONLINE_OBJECTS: Record<string, { image: string; surface: string; accent: string }> = {
  FT15: { image: ft15Object, surface: "from-[#fff0ee] to-[#f8d8d8]", accent: "text-brand" },
  IE: { image: ieltsExpressObject, surface: "from-[#fff8de] to-[#f3df9d]", accent: "text-gold" },
  VSTEP: { image: vstepObject, surface: "from-[#f1edff] to-[#dcd1ff]", accent: "text-plum" },
  GT: { image: giaoTiepObject, surface: "from-[#fff0f8] to-[#ffd3e8]", accent: "text-accent-pink" },
  TESOL: { image: tesolObject, surface: "from-[#edf3ff] to-[#cdddf7]", accent: "text-vmp-blue" },
  EDU: { image: edunextObject, surface: "from-[#eef7ff] to-[#cfe6f7]", accent: "text-vmp-blue" },
};

export function OnlineCoursesSection() {
  return (
    <section id="hoc-online" className="online-universe relative isolate overflow-hidden py-16 md:py-28">
      <div className="brand-atmosphere-orb brand-atmosphere-orb-one" aria-hidden="true" />
      <div className="brand-atmosphere-orb brand-atmosphere-orb-two" aria-hidden="true" />
      <div className="container-vmg">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Học online</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold tracking-tight">Mỗi mục tiêu,<br />một công cụ để tiến xa.</h2>
          </div>
          <div className="rounded-[1.75rem] border border-white/70 bg-white/55 p-5 shadow-sm backdrop-blur md:p-6">
            <p className="text-sm leading-6 text-neutral-600">Từ luyện thi đến phát triển nghề nghiệp, chọn cách học phù hợp với nhịp sống của bạn. Cam kết đầu ra được áp dụng theo điều kiện của từng chương trình.</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-brand"><span className="h-2 w-2 rounded-full bg-brand" /> Online-first · Có giáo viên đồng hành</div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FLAGSHIP_ONLINE_PRODUCTS.map((c) => {
            const object = ONLINE_OBJECTS[c.code] ?? ONLINE_OBJECTS.EDU;
            return (
            <a
              key={c.code}
              href={`/hoc-online/${c.slug}`}
              className={`product-object-card group relative isolate flex h-[420px] overflow-hidden rounded-[2rem] bg-gradient-to-br ${object.surface} p-6 shadow-[0_24px_55px_-38px_rgba(40,25,30,.55)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_65px_-36px_rgba(40,25,30,.65)]`}
            >
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/65 bg-white/20" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-black/8 bg-white/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-700 backdrop-blur">{c.tag}</span>
                    <span className="rounded-full border border-black/8 bg-white/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-700 backdrop-blur">{FORMAT_LABEL[c.format]}</span>
                  </div>
                  <span className={`font-display text-sm font-extrabold ${object.accent}`}>{c.code}</span>
                </div>
                <div className="mt-2 flex min-h-0 flex-1 items-center justify-center">
                  <img src={object.image} alt="" aria-hidden="true" className="product-object h-48 drop-shadow-2xl transition duration-700 group-hover:-translate-y-2 group-hover:rotate-2 group-hover:scale-105 md:h-52" loading="lazy" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-extrabold leading-tight text-neutral-950 md:text-2xl">{c.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-700">{c.desc}</p>
                  <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold ${object.accent}`}>Khám phá <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
              </div>
            </a>
          )})}
        </div>
        <div className="mt-8 flex justify-end border-t border-brand/10 pt-6">
          <a href="/hoc-online" className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-brand text-brand px-6 py-3 text-sm font-bold hover:bg-brand hover:text-white transition-colors">
            Xem chi tiết từng khóa học →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Du học (VMP) teaser ---------------- */
// Content pending chị Hằng's approval per AGENTS.md - short catalog descriptions only,
// no specific claims beyond what's confirmed in AGENTS.md §5B.

const DU_HOC_ITEMS = [
  { name: "Du học hè", desc: "Mỹ, Úc, Canada, Singapore và Philippines.", image: vmpShortTermImage, alt: "Hình ảnh chương trình trải nghiệm du học ngắn hạn của VMP" },
  { name: "Du học dài hạn", desc: "Mỹ, Úc, Canada và Đài Loan.", image: vmpGlobalStudyImage, alt: "Không gian tư vấn và bản đồ thế giới thể hiện hành trình du học toàn diện của VMP" },
  { name: "Sự kiện du học", desc: "[CẦN CẬP NHẬT: lịch sự kiện/triển lãm du học sắp tới – chưa có dữ liệu thật]", image: suKienDuHocImage, alt: "Gia đình tìm hiểu trường đại học tại triển lãm giáo dục quốc tế" },
];

export function DuHocSection() {
  return (
    <section id="du-hoc-nhom" className="study-abroad-surface relative overflow-hidden py-16 md:py-28 scroll-mt-24">
      <div className="container-vmg relative z-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1.08fr_.92fr]">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/10">
              <img src={vmpLogo} alt="VMP - VMG Global Pathways" className="h-10 w-auto md:h-12" />
            </div>
            <span className="mt-7 block text-xs font-bold uppercase tracking-[.2em] text-[#ffad31]">Du học - VMP by VMG</span>
            <h2 className="mt-3 text-3xl font-display font-extrabold tracking-tight text-white md:text-5xl">Sẵn sàng cho những chân trời rộng mở</h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-sm leading-6 text-white/75 md:text-base md:leading-7">
              Khám phá các hướng đồng hành chính của VMP. Nội dung chi tiết đang chờ đội VMP xác nhận trước khi công bố đầy đủ.
            </p>
            <a href="https://duhocvmp.com/" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#ffad31] transition hover:text-white">
              Khám phá website VMP <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {DU_HOC_ITEMS.map((it) => (
            <a href="/du-hoc" aria-label={`Tìm hiểu ${it.name}`} key={it.name} className="vmp-program-card group flex min-h-[410px] flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-[0_26px_60px_-35px_rgba(0,0,0,.75)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-34px_rgba(0,0,0,.85)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffad31]/50">
              <div className="relative h-[230px] shrink-0 overflow-hidden bg-[#dcecf8]">
                <img src={it.image} alt={it.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-[#071a73]/88 px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-white shadow-sm backdrop-blur">VMP by VMG</span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-extrabold leading-tight text-[#071a73]">{it.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">{it.desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-extrabold text-[#e98612]">Tìm hiểu thêm <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Values ---------------- */

export function ValuesSection() {
  return (
    <section className="values-surface overflow-hidden py-16 md:py-24">
      <div className="container-vmg grid items-stretch gap-8 lg:grid-cols-[1.04fr_.96fr] lg:gap-12">
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Về VMG</span>
          <h2 className="mt-3 max-w-2xl text-3xl font-display font-extrabold tracking-tight md:text-5xl">
            Một hệ sinh thái cho những hành trình học tập dài lâu
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
            Hệ thống Giáo dục và Đào tạo Việt Mỹ VMG kết nối ba trụ cột Ngoại ngữ, Du học và Hướng nghiệp,
            mở rộng lựa chọn học tập trực tiếp và online cho nhiều giai đoạn phát triển.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {["Ngoại ngữ", "Du học", "Hướng nghiệp"].map((pillar) => (
              <span key={pillar} className="rounded-full border border-brand/15 bg-white px-4 py-2 text-sm font-bold text-brand shadow-sm">
                {pillar}
              </span>
            ))}
          </div>
          <a href="/ve-vmg" className="button-lift mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark">
            Khám phá VMG <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative min-h-[440px] overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#761722] via-brand-dark to-[#3f1017] p-6 text-white shadow-2xl shadow-brand/15 md:p-8">
          <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-gold-soft/20" aria-hidden="true" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3 text-gold-soft">
              <Network className="h-6 w-6" strokeWidth={1.8} />
              <span className="text-xs font-bold uppercase tracking-[.18em]">VMG - Dẫn Lối Tương Lai</span>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                <Eye className="h-5 w-5 text-gold-soft" />
                <h3 className="mt-4 font-display text-lg font-bold">Tầm nhìn</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">Nội dung chính thức đang chờ VMG xác nhận.</p>
              </div>
              <div className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                <Target className="h-5 w-5 text-gold-soft" />
                <h3 className="mt-4 font-display text-lg font-bold">Sứ mệnh</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">Nội dung chính thức đang chờ VMG xác nhận.</p>
              </div>
            </div>
            <div className="mt-4 flex flex-1 flex-col justify-between rounded-3xl bg-white p-6 text-neutral-900">
              <Quote className="h-7 w-7 text-brand/30" />
              <p className="mt-4 text-sm leading-6 text-neutral-500">
                [CẦN NỘI DUNG THẬT: thông điệp của Chủ tịch Nguyễn Quốc Khánh]
              </p>
              <div className="mt-5 flex items-center gap-4 border-t border-black/5 pt-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-cream to-[#ead7ae]">
                  <img
                    src={chairmanImage}
                    alt="Chủ tịch Nguyễn Quốc Khánh cùng đại diện các thế hệ học viên"
                    className="absolute bottom-0 left-1/2 w-[160%] max-w-none -translate-x-1/2"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="font-display font-bold">Ông Nguyễn Quốc Khánh</div>
                  <div className="text-xs text-neutral-500">Chủ tịch VMG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials / Student stories ---------------- */

export function Testimonials() {
  const smallSlots = [
    "[Cần nội dung thật: cảm nhận phụ huynh – chưa có dữ liệu]",
    "[Cần nội dung thật: thành tích IELTS/Cambridge cụ thể – chưa có dữ liệu]",
    "[Cần nội dung thật: cảm nhận học viên đi làm – chưa có dữ liệu]",
    "[Cần nội dung thật: câu chuyện tiến bộ học viên – chưa có dữ liệu]",
  ];
  return (
    <section className="testimonial-stage relative overflow-hidden bg-[#2b1116] py-16 md:py-24">
      <div className="container-vmg">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-soft">Câu chuyện học viên</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold text-white">
            Những câu chuyện thật sẽ sớm được kể tại đây
          </h2>
          <p className="mt-3 text-white/70 text-sm">
            VMG đang tổng hợp thành tích, hình ảnh và chia sẻ được phép công bố từ học viên, phụ huynh.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STUDENT_MOMENTS.map((photo) => (
            <figure key={photo.src} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  style={{ objectPosition: photo.position ?? "center" }}
                  loading="lazy"
                />
              </div>
              <figcaption className="px-4 py-3 text-[11px] leading-5 text-white/65">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 lg:row-span-2 rounded-3xl bg-white/5 border border-dashed border-white/25 p-8 flex flex-col items-center justify-center text-center min-h-[260px]">
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              [Cần nội dung thật: câu chuyện học viên nổi bật (ảnh + tên + thành tích + trích dẫn) – chưa có dữ liệu, xem CLAUDE.md mục 2]
            </p>
          </div>
          {smallSlots.map((text, i) => (
            <div key={i} className="rounded-3xl bg-white/5 border border-dashed border-white/25 p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
              <p className="text-xs text-white/50 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partners ---------------- */

export function Partners() {
  const partners = [
    { name: "IDP - IELTS Platinum Partner", src: "/partners/idp.png" },
    { name: "British Council", src: "/partners/british-council.svg" },
    { name: "Cambridge Assessment English - VN055", src: "/partners/cambridge-english.jpg" },
  ];
  return (
    <section className="partners-band py-12 md:py-16">
      <div className="container-vmg">
      <div className="text-center text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
        Đối tác &amp; chứng nhận
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {partners.map((p) => (
          <div key={p.name} className="partner-card flex min-h-28 flex-col items-center justify-center rounded-3xl border border-black/5 bg-white px-6 py-5 text-center shadow-sm">
            <img src={p.src} alt={p.name} className="h-10 w-full object-contain" loading="lazy" />
            <span className="mt-3 text-xs font-semibold text-neutral-600">{p.name}</span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

/* ---------------- News ---------------- */

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image_url: string | null;
  created_at: string;
};

const NEWS_CATEGORY_LABELS: Record<string, string> = {
  "chuong-trinh-va-uu-dai": "Chương trình và ưu đãi",
  "su-kien": "Sự kiện",
  "hop-tac": "Hợp tác",
  "cong-dong": "Cộng Đồng",
};

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    async function loadLatestNews() {
      const { data } = await supabase
        .from("news")
        .select("id,title,slug,category,image_url,created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(10);

      if (active) {
        setNews((data as NewsItem[] | null) ?? []);
        setLoading(false);
      }
    }

    loadLatestNews();
    return () => { active = false; };
  }, []);

  const scroll = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: direction * Math.min(scrollerRef.current.clientWidth * 0.85, 420),
      behavior: "smooth",
    });
  };

  if (!loading && news.length === 0) return null;

  return (
    <section className="brand-pattern bg-cream/60 py-12 md:py-16" aria-labelledby="home-news-title">
      <div className="container-vmg">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Tin tức VMG</span>
          <h2 id="home-news-title" className="mt-2 text-3xl md:text-4xl font-display font-extrabold tracking-tight">Đang diễn ra tại VMG</h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label="Xem tin trước" className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:border-brand hover:text-brand">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Xem tin tiếp theo" className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:border-brand hover:text-brand">
            <ChevronRight className="h-5 w-5" />
          </button>
          <a href="/tin-tuc" className="ml-2 inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline">
            Xem tất cả <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div ref={scrollerRef} className="scrollbar-hide mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {news.map((item) => (
          <a key={item.id} href="/tin-tuc" className="editorial-card group w-[82vw] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand via-brand-dark to-plum">
              {item.image_url ? (
                <img src={item.image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="grid h-full place-items-center text-white/70"><Image className="h-8 w-8" aria-hidden="true" /></div>
              )}
            </div>
            <div className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-brand">{NEWS_CATEGORY_LABELS[item.category] ?? item.category}</p>
              <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] text-lg font-display font-extrabold leading-snug text-neutral-900">{item.title}</h3>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <time dateTime={item.created_at}>{new Intl.DateTimeFormat("vi-VN").format(new Date(item.created_at))}</time>
                <ArrowUpRight className="h-5 w-5 text-brand transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </a>
        ))}
        {!loading && news.length === 0 && (
          <div className="w-full rounded-[1.5rem] border border-dashed border-black/15 bg-white px-6 py-12 text-center text-sm text-neutral-500">
            Chưa có tin tức được xuất bản.
          </div>
        )}
        {loading && <div className="h-80 w-[82vw] max-w-[360px] shrink-0 animate-pulse rounded-[1.5rem] bg-black/5" aria-label="Đang tải tin tức" />}
      </div>
      <a href="/tin-tuc" className="mt-5 inline-flex sm:hidden items-center gap-1 text-sm font-bold text-brand hover:underline">
        Xem tất cả <ArrowUpRight className="h-4 w-4" />
      </a>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="container-vmg pb-16">
      <div className="newsletter-surface relative overflow-hidden rounded-[36px] px-6 md:px-12 py-10 md:py-14 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="max-w-lg">
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-neutral-900">Đăng ký nhận tin từ VMG</h3>
          <p className="mt-2 text-sm text-neutral-700/80">
            Nhận các cập nhật về chương trình học, sự kiện và hoạt động mới từ VMG.
          </p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex w-full md:w-auto items-center gap-2 bg-white rounded-full p-1.5 shadow-md min-w-[300px]">
          <input required type="email" placeholder="Email của bạn" className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none" />
          <button className="rounded-full bg-brand text-white px-5 py-2.5 text-sm font-bold hover:bg-brand-dark transition-colors">
            {done ? "✓ Đã đăng ký" : "Đăng ký"}
          </button>
        </form>
      </div>
    </section>
  );
}
