export function Hero() {
  return (
    <section id="top" className="container-vmg pt-6 md:pt-8">
      <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] bg-brand text-white">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gold/25 blur-2xl" />
        <div className="absolute top-10 right-24 w-40 h-40 rounded-full border-4 border-gold/40" />
        <div className="absolute top-6 left-8 grid grid-cols-4 gap-2 opacity-40">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative grid lg:grid-cols-2 gap-8 items-center px-6 md:px-12 py-10 md:py-16">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[11px] md:text-xs font-semibold tracking-wide">
              Hệ Thống Giáo Dục &amp; Đào Tạo Việt Mỹ
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[1.05]">
              VMG – DẪN LỐI
              <br />
              <span className="text-gold-soft">TƯƠNG LAI</span>
            </h1>
            <p className="mt-5 max-w-lg text-white/85 text-base md:text-lg leading-relaxed">
              23 năm đồng hành cùng học viên tại Đồng Nai và Bình Phước chinh phục tri thức,
              tự tin bước ra thế giới bằng ngoại ngữ, du học và hướng nghiệp.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#quiz"
                className="inline-flex items-center gap-2 rounded-full bg-white text-brand px-6 py-3 text-sm font-bold hover:bg-white/90 transition-colors"
              >
                Tìm chương trình phù hợp →
              </a>
              <a
                href="#chuong-trinh"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Xem toàn bộ chương trình
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gold-soft/40 aspect-[4/5] max-w-[420px] mx-auto shadow-2xl grid place-items-center">
              <span className="text-white/60 text-sm font-medium px-6 text-center">
                [ Ảnh học viên VMG – placeholder ]
              </span>
            </div>
            <div className="hidden md:block absolute -bottom-4 -left-4 bg-white text-neutral-900 rounded-2xl px-4 py-3 shadow-lg">
              <div className="text-2xl font-display font-extrabold text-brand">23+ năm</div>
              <div className="text-xs text-neutral-500">Đồng hành cùng Đồng Nai &amp; Bình Phước</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
