import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, FORMAT_LABEL, isPublished, type AgeGroupFilter } from "../data/products";

// The 6 flagship online-first products get their own homepage highlight
// (OnlineCoursesSection) - everything else shows in the general carousel.
const FLAGSHIP_ONLINE_CODES = ["FT15", "IE", "VSTEP", "GT", "TESOL", "EDU"];
const PUBLIC_PRODUCTS = PRODUCTS.filter(isPublished);

/* ---------------- Programs ---------------- */

type ProgramFilter = "all" | AgeGroupFilter;
const PROGRAMS = PUBLIC_PRODUCTS.filter((p) => !FLAGSHIP_ONLINE_CODES.includes(p.code));

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
    <section id="chuong-trinh" className="container-vmg py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand">Chương trình học</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Lộ trình học tập dành cho mọi học viên</h2>
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
            className="relative flex-none snap-start w-[72%] sm:w-[45%] md:w-[31%] lg:w-[23.5%] rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.overlay}`} />
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
    </section>
  );
}

/* ---------------- Online courses (TMĐT) ---------------- */

const FLAGSHIP_ONLINE_PRODUCTS = PUBLIC_PRODUCTS.filter((p) => FLAGSHIP_ONLINE_CODES.includes(p.code));

export function OnlineCoursesSection() {
  return (
    <section id="hoc-online" className="bg-cream/60 py-16 md:py-24">
      <div className="container-vmg">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Học online</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">
            Không đến được trung tâm? Học theo tiến độ riêng của bạn
          </h2>
          <p className="mt-3 text-neutral-600">
            Cùng chương trình, cùng cam kết đầu ra – nhưng học mọi lúc mọi nơi, chủ động thời gian.
          </p>
        </div>
        {/* Mobile: horizontal snap carousel; md+: full grid so all 6 TMĐT products stay visible at once */}
        <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 scroll-px-5 pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          {FLAGSHIP_ONLINE_PRODUCTS.map((c) => (
            <article
              key={c.code}
              className="relative flex-none snap-start w-[72%] sm:w-[45%] md:w-auto rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.overlay}`} />
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
  { name: "Du học hè", desc: "Mỹ, Úc, Canada, Singapore, Philippines – trải nghiệm ngắn hạn 2-4 tuần.", overlay: "from-sky-400/80 to-vmp-blue/85" },
  { name: "Du học dài hạn", desc: "Mỹ, Úc, Canada, Đài Loan – tư vấn ngành/trường, hồ sơ, visa, học bổng.", overlay: "from-vmp-blue/85 to-vmp-blue-dark/90" },
  { name: "Xuất khẩu lao động", desc: "Hàn Quốc, Nhật Bản, Đài Loan – tư vấn đơn hàng và thủ tục xuất cảnh.", overlay: "from-indigo-500/80 to-vmp-blue-dark/85" },
  { name: "Sự kiện du học", desc: "[CẦN CẬP NHẬT: lịch sự kiện/triển lãm du học sắp tới – chưa có dữ liệu thật]", overlay: "from-vmp-blue-dark/85 to-plum/85" },
];

export function DuHocSection() {
  return (
    <section id="du-hoc-nhom" className="container-vmg py-16 md:py-24 scroll-mt-24">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-brand">Du học - VMP by VMG</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Chuẩn bị hành trang du học</h2>
        <p className="mt-3 text-neutral-600">
          Nội dung chi tiết đang chờ đội VMP xác nhận trước khi công bố đầy đủ - dưới đây là các hướng chương trình chính.
        </p>
      </div>
      {/* Mobile: horizontal snap carousel; md+: grid (4 items -> 4 cols on lg) */}
      <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 scroll-px-5 pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
        {DU_HOC_ITEMS.map((it) => (
          <article key={it.name} className="relative flex-none snap-start w-[72%] sm:w-[45%] md:w-auto rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow">
            <div className={`absolute inset-0 bg-gradient-to-br ${it.overlay}`} />
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
  const items = [
    { title: "23 năm bền bỉ", desc: "Từ 2002 đến nay, đồng hành cùng nhiều thế hệ học viên trên toàn quốc.", dark: true },
    { title: "Đội ngũ tận tâm", desc: "Giáo viên bản ngữ và Việt Nam có chứng chỉ quốc tế, gắn bó lâu năm với VMG." },
    { title: "Đối tác IELTS uy tín", desc: "IDP Platinum Partner, British Council và Cambridge Assessment English (mã VN055) – đồng hành các chương trình IELTS & khảo thí quốc tế." },
    { title: "Ấm áp – gần gũi", desc: "Trung tâm được phụ huynh tin cậy nhờ sự chăm sóc như gia đình." },
  ];
  return (
    <section className="bg-cream/60 py-16 md:py-24">
      <div className="container-vmg">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Vì sao chọn VMG</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Giá trị tạo nên sự khác biệt</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <div key={i} className={`rounded-3xl p-6 min-h-[200px] ${it.dark ? "bg-plum text-white" : "bg-cream border border-black/5"}`}>
              <h3 className="font-display font-bold text-lg">{it.title}</h3>
              <p className={`mt-2 text-sm ${it.dark ? "text-white/80" : "text-neutral-600"}`}>{it.desc}</p>
            </div>
          ))}
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
    <section className="bg-plum py-16 md:py-24">
      <div className="container-vmg">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-soft">Câu chuyện học viên</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold text-white">
            Được tin tưởng bởi nhiều gia đình – và những thành tích nói lên tất cả
          </h2>
          <p className="mt-3 text-white/70 text-sm">
            Đây là khu vực sẽ hiển thị cảm nhận thật và thành tích thật của học viên VMG. Nội dung minh họa dưới đây là chỗ trống chờ dữ liệu.
          </p>
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
      <div className="rounded-[36px] bg-brand text-white px-6 md:px-10 py-10 md:py-12 grid grid-cols-2 md:grid-cols-5 gap-6">
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
  const partners = ["IDP – IELTS Platinum Partner", "Cambridge Assessment English", "British Council"];
  return (
    <section className="container-vmg py-10">
      <div className="text-center text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
        Đối tác &amp; chứng nhận
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((p) => (
          <div key={p} className="rounded-2xl border border-black/10 bg-white px-6 py-4 text-sm font-semibold text-neutral-700">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- News ---------------- */

export function NewsSection() {
  return (
    <section className="container-vmg py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Tin tức</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-extrabold">Cập nhật mới nhất từ VMG</h2>
        </div>
        <a href="/tin-tuc" className="text-sm font-semibold text-brand hover:underline">Xem tất cả →</a>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {[0, 1, 2].map((i) => (
          <article key={i} className="rounded-3xl overflow-hidden bg-white border border-dashed border-black/15 flex flex-col">
            <div className="aspect-[16/10] bg-neutral-100 grid place-items-center text-neutral-400 font-display font-semibold text-sm px-6 text-center">
              [Chờ ảnh &amp; bài viết thật]
            </div>
            <div className="p-5">
              <div className="text-xs text-neutral-400">[Chờ cập nhật]</div>
              <h3 className="mt-1 text-sm text-neutral-400 leading-snug">[Cần nội dung thật: tiêu đề bài viết – chưa có dữ liệu, xem CLAUDE.md mục 2]</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="container-vmg pb-16">
      <div className="rounded-[36px] bg-lemon px-6 md:px-12 py-10 md:py-14 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="max-w-lg">
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-neutral-900">Đăng ký nhận tin từ VMG</h3>
          <p className="mt-2 text-sm text-neutral-700/80">
            Nhận lộ trình học, học bổng du học và ưu đãi trung tâm mới nhất – 1 email / tháng.
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
