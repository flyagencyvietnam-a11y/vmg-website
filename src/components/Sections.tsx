import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Eye, Image, Network, Quote, Target } from "lucide-react";
import { PRODUCTS, FORMAT_LABEL, isLearningProduct, type AgeGroupFilter } from "../data/products";
import { getProductVisual } from "../data/productVisuals";
import duHocHeImage from "../assets/products/du-hoc-he.png";
import duHocDaiHanImage from "../assets/products/du-hoc-dai-han.png";
import suKienDuHocImage from "../assets/products/su-kien-du-hoc.png";
import chairmanImage from "../assets/vmg/chairman-nguyen-quoc-khanh.png";
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

  function scrollByDir(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section id="chuong-trinh" className="brand-pattern relative overflow-hidden py-16 md:py-24">
      <div className="container-vmg relative">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Chương trình học</span>
        <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold tracking-tight">Mỗi bước tiến đều có một lộ trình riêng</h2>
        <p className="mt-3 text-sm leading-6 text-neutral-600">Khám phá các chương trình theo độ tuổi, mục tiêu và hình thức học phù hợp.</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
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
      <div className="mt-6 hidden md:flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          aria-label="Cuộn về trước"
          className="rounded-full border border-black/10 bg-white p-2.5 text-neutral-600 hover:bg-brand hover:text-white hover:border-brand transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          aria-label="Cuộn tới sau"
          className="rounded-full border border-black/10 bg-white p-2.5 text-neutral-600 hover:bg-brand hover:text-white hover:border-brand transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div
        ref={scrollerRef}
        className="mt-4 md:mt-3 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 scroll-px-5 pb-2"
      >
        {visible.map((p) => (
          <article
            key={p.name}
            className="editorial-card relative flex-none snap-start w-[72%] sm:w-[45%] md:w-[31%] lg:w-[23.5%] rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow"
          >
            <img src={getProductVisual(p.code).src} alt={getProductVisual(p.code).alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.04]" loading="lazy" />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{ backgroundImage: `linear-gradient(to bottom, transparent 42%, color-mix(in srgb, ${getProductVisual(p.code).tint} 45%, transparent) 62%, ${getProductVisual(p.code).tint} 82%, color-mix(in srgb, ${getProductVisual(p.code).tint} 82%, black) 100%)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
            <div className="relative h-full flex flex-col justify-end p-5 text-white">
              <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2.5 py-1 rounded-full mb-3">
                {FORMAT_LABEL[p.format]}
              </span>
              <h3 className="text-xl font-display font-extrabold">{p.name}</h3>
              <p className="mt-1 text-sm text-white/90">{p.desc}</p>
              <a href="/ngoai-ngu" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline w-fit">
                Tìm hiểu thêm →
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <a href="/ngoai-ngu" className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-brand text-brand px-6 py-3 text-sm font-bold hover:bg-brand hover:text-white transition-colors">
          Xem tất cả chương trình →
        </a>
      </div>
      </div>
    </section>
  );
}

/* ---------------- Online courses (TMĐT) ---------------- */

const FLAGSHIP_ONLINE_PRODUCTS = PUBLIC_PRODUCTS.filter((p) => p.section !== "tesol" && FLAGSHIP_ONLINE_CODES.includes(p.code));

export function OnlineCoursesSection() {
  return (
    <section id="hoc-online" className="brand-atmosphere relative isolate overflow-hidden py-16 md:py-24">
      <div className="brand-atmosphere-orb brand-atmosphere-orb-one" aria-hidden="true" />
      <div className="brand-atmosphere-orb brand-atmosphere-orb-two" aria-hidden="true" />
      <div className="container-vmg">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Học online</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Linh hoạt thời gian. Vững vàng mục tiêu.
          </h2>
          <p className="mt-3 text-neutral-600">
            Từ luyện thi đến phát triển nghề nghiệp, chọn cách học phù hợp với nhịp sống của bạn. Cam kết đầu ra được áp dụng theo điều kiện của từng chương trình.
          </p>
        </div>
        {/* Mobile: horizontal snap carousel; md+: full grid so all 6 TMĐT products stay visible at once */}
        <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 scroll-px-5 pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          {FLAGSHIP_ONLINE_PRODUCTS.map((c) => (
            <article
              key={c.code}
              className="editorial-card relative flex-none snap-start w-[72%] sm:w-[45%] md:w-auto rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow"
            >
              <img src={getProductVisual(c.code).src} alt={getProductVisual(c.code).alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.04]" loading="lazy" />
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundImage: `linear-gradient(to bottom, transparent 42%, color-mix(in srgb, ${getProductVisual(c.code).tint} 45%, transparent) 62%, ${getProductVisual(c.code).tint} 82%, color-mix(in srgb, ${getProductVisual(c.code).tint} 82%, black) 100%)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
              <div className="relative h-full flex flex-col justify-end p-5 text-white">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                    {c.tag}
                  </span>
                  <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">
                    {FORMAT_LABEL[c.format]}
                  </span>
                </div>
                <h3 className="text-xl font-display font-extrabold">{c.name}</h3>
                <p className="mt-1 text-sm text-white/90">{c.desc}</p>
                <a href={`/hoc-online/${c.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline w-fit">
                  Xem chi tiết →
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href="/hoc-online" className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-brand text-brand px-6 py-3 text-sm font-bold hover:bg-brand hover:text-white transition-colors">
            Xem chi tiết từng khóa học →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Du học (VMP) teaser ---------------- */
// Content pending chị Hằng's approval per CLAUDE.md - short catalog descriptions only,
// no specific claims beyond what's confirmed in CLAUDE.md §5B.

const DU_HOC_ITEMS = [
  { name: "Du học hè", desc: "Mỹ, Úc, Canada, Singapore và Philippines.", image: duHocHeImage, alt: "Học sinh quốc tế tại khuôn viên đại học mùa hè", overlay: "from-sky-400/80 to-vmp-blue/85" },
  { name: "Du học dài hạn", desc: "Mỹ, Úc, Canada và Đài Loan.", image: duHocDaiHanImage, alt: "Du học sinh bắt đầu hành trình tại khuôn viên đại học quốc tế", overlay: "from-vmp-blue/85 to-vmp-blue-dark/90" },
  { name: "Sự kiện du học", desc: "[CẦN CẬP NHẬT: lịch sự kiện/triển lãm du học sắp tới – chưa có dữ liệu thật]", image: suKienDuHocImage, alt: "Gia đình tìm hiểu trường đại học tại triển lãm giáo dục quốc tế", overlay: "from-vmp-blue-dark/85 to-plum/85" },
];

export function DuHocSection() {
  return (
    <section id="du-hoc-nhom" className="container-vmg py-16 md:py-24 scroll-mt-24">
      <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[.18em] text-brand">Du học - VMP by VMG</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold tracking-tight">Sẵn sàng cho những chân trời rộng mở</h2>
        <p className="mt-3 text-neutral-600">
          Khám phá các hướng đồng hành chính của VMP. Nội dung chi tiết đang chờ đội VMP xác nhận trước khi công bố đầy đủ.
        </p>
      </div>
      <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 scroll-px-5 pb-2 md:grid md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
        {DU_HOC_ITEMS.map((it) => (
          <article key={it.name} className="editorial-card relative flex-none snap-start w-[72%] sm:w-[45%] md:w-auto rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow">
            <img src={it.image} alt={it.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className={`absolute inset-0 bg-gradient-to-br ${it.overlay} opacity-15 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5" />
            <div className="relative h-full flex flex-col justify-end p-5 text-white">
              <h3 className="text-xl font-display font-extrabold">{it.name}</h3>
              <p className="mt-1 text-sm text-white/90">{it.desc}</p>
              <a href="/du-hoc" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline w-fit">
                Tìm hiểu thêm →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Values ---------------- */

export function ValuesSection() {
  return (
    <section className="brand-pattern overflow-hidden py-16 md:py-24">
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

/* ---------------- Stats ---------------- */

export function StatsBar() {
  const stats = [
    { value: "23+", label: "Năm kinh nghiệm" },
    { value: "10", label: "Trung tâm" },
    { value: "42.000+", label: "Học sinh trường đối tác" },
    { value: "IDP & BC", label: "Đối tác IELTS chính thức" },
    { value: "Cambridge", label: "Authorized" },
  ];
  return (
    <section className="container-vmg py-8">
      <div className="stats-surface relative overflow-hidden rounded-[36px] bg-brand text-white px-6 md:px-10 py-10 md:py-12 grid grid-cols-2 md:grid-cols-5 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl md:text-4xl font-display font-extrabold">{s.value}</div>
            <div className="mt-1 text-xs md:text-sm text-white/80 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
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
    <section className="container-vmg py-10">
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
