import { useState } from "react";

/* ---------------- Feature strip ---------------- */

export function FeatureStrip() {
  const items = [
    { title: "Ngoại ngữ", desc: "Anh, Nhật, Hàn, Trung – từ mầm non đến người đi làm.", bg: "bg-brand text-white" },
    { title: "Du học VMP", desc: "Đối tác IDP Platinum, xử lý hồ sơ – học bổng trọn gói.", bg: "bg-cream text-neutral-800" },
    { title: "Hướng nghiệp", desc: "Tư vấn ngành nghề, TESOL, kỹ năng mềm cho học sinh.", bg: "bg-lemon text-neutral-800" },
    { title: "10 trung tâm", desc: "Có mặt tại Đồng Nai và Bình Phước – tiện lợi, gần nhà.", bg: "bg-white border border-black/10 text-neutral-800" },
  ];
  return (
    <section className="container-vmg pt-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <div key={i} className={`${it.bg} rounded-3xl p-6 flex flex-col justify-between min-h-[170px] hover:-translate-y-1 transition-transform`}>
            <h3 className="text-lg font-display font-bold">{it.title}</h3>
            <p className={`mt-1 text-sm ${it.bg.includes("brand") ? "text-white/85" : "text-neutral-600"}`}>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Programs ---------------- */

type Program = { name: string; desc: string; overlay: string; ageGroup: "kids" | "teens" | "adult" | "all" };

const PROGRAMS: Program[] = [
  { name: "VMG Kids", desc: "Mầm non & Thiếu nhi – tiếng Anh qua trò chơi, âm nhạc, phản xạ sớm.", overlay: "from-pink-400/80 to-brand/70", ageGroup: "kids" },
  { name: "VMG Teens", desc: "Thiếu niên 12–16: giao tiếp học thuật, IELTS Junior, Cambridge B1/B2.", overlay: "from-amber-400/80 to-orange-500/80", ageGroup: "teens" },
  { name: "IELTS Programs", desc: "Luyện thi IELTS từ 0 đến 7.5+ – cam kết đầu ra bằng văn bản.", overlay: "from-brand/85 to-brand/95", ageGroup: "adult" },
  { name: "English for Adults", desc: "Giao tiếp công việc, luyện thi TOEIC/VSTEP cho người lớn.", overlay: "from-rose-500/80 to-pink-600/80", ageGroup: "adult" },
];

const FILTERS = [
  { key: "all", label: "Tất cả" },
  { key: "kids", label: "Trẻ em" },
  { key: "teens", label: "Thiếu niên" },
  { key: "adult", label: "Người lớn" },
] as const;

export function ProgramsSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const visible = PROGRAMS.filter((p) => filter === "all" || p.ageGroup === filter);

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
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visible.map((p) => (
          <article key={p.name} className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-shadow">
            <div className={`absolute inset-0 bg-gradient-to-br ${p.overlay}`} />
            <div className="relative h-full flex flex-col justify-end p-5 text-white">
              <h3 className="text-xl font-display font-extrabold">{p.name}</h3>
              <p className="mt-1 text-sm text-white/90">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-brand text-brand px-6 py-3 text-sm font-bold hover:bg-brand hover:text-white transition-colors">
          Xem tất cả chương trình →
        </a>
      </div>
    </section>
  );
}

/* ---------------- Values ---------------- */

export function ValuesSection() {
  const items = [
    { title: "23 năm bền bỉ", desc: "Từ 2002 đến nay, đồng hành cùng nhiều thế hệ học viên tại Đồng Nai và Bình Phước.", dark: true },
    { title: "Đội ngũ tận tâm", desc: "Giáo viên bản ngữ và Việt Nam có chứng chỉ quốc tế, gắn bó lâu năm với VMG." },
    { title: "Đối tác IDP Platinum", desc: "VMP by VMG – một trong số ít trung tâm đạt cấp độ đối tác cao nhất của IDP." },
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

/* ---------------- Testimonials ---------------- */

export function Testimonials() {
  const items = [
    { name: "Chị Ngọc Anh", role: "Phụ huynh học viên VMG Kids", quote: "Con mình từ nhút nhát đã tự tin nói chuyện với người nước ngoài chỉ sau 1 năm học tại VMG." },
    { name: "Minh Khôi", role: "Học viên IELTS VMG – 7.5", quote: "Giáo viên tận tâm, lộ trình rõ ràng giúp mình đạt 7.5 IELTS sau 6 tháng ôn luyện." },
    { name: "Anh Quốc Bảo", role: "Học viên English for Adults", quote: "Lớp học linh hoạt giờ giấc, rất phù hợp với người đi làm như mình." },
  ];
  return (
    <section className="container-vmg py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand">Cảm nhận học viên</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Được tin tưởng bởi hàng ngàn gia đình</h2>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {items.map((t, i) => (
          <div key={i} className="rounded-3xl bg-white border border-black/5 p-6 shadow-sm">
            <p className="text-sm text-neutral-700 leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand/10 grid place-items-center text-brand font-display font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold">{t.name}</div>
                <div className="text-xs text-neutral-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */

export function StatsBar() {
  const stats = [
    { value: "23+", label: "Năm kinh nghiệm" },
    { value: "10", label: "Trung tâm" },
    { value: "42.000+", label: "Học viên đã đồng hành" },
    { value: "IDP", label: "Platinum Partner" },
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
  const news = [
    { date: "12/03/2026", title: "VMG khai trương trung tâm thứ 10 tại Bình Phước", tag: "Sự kiện" },
    { date: "28/02/2026", title: "VMP by VMG đạt danh hiệu IDP Platinum Partner năm 2026", tag: "Thành tựu" },
    { date: "05/02/2026", title: "Học viên IELTS VMG đạt 8.0 – hành trình từ 3.5 đến mục tiêu du học", tag: "Câu chuyện" },
  ];
  const gradients = ["from-brand/80 to-orange-500/70", "from-amber-400/80 to-brand/70", "from-pink-500/80 to-brand/80"];
  return (
    <section className="container-vmg py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Tin tức</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-extrabold">Cập nhật mới nhất từ VMG</h2>
        </div>
        <a href="#" className="text-sm font-semibold text-brand hover:underline">Xem tất cả →</a>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {news.map((n, i) => (
          <article key={i} className="rounded-3xl overflow-hidden bg-white border border-black/5 hover:shadow-lg transition-shadow">
            <div className={`aspect-[16/10] bg-gradient-to-br ${gradients[i]} grid place-items-center text-white font-display font-extrabold text-xl px-6 text-center`}>
              VMG · {n.tag}
            </div>
            <div className="p-5">
              <div className="text-xs text-neutral-500">{n.date}</div>
              <h3 className="mt-1 font-semibold leading-snug">{n.title}</h3>
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
