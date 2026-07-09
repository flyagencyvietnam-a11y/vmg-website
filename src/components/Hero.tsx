import { Award, GraduationCap, MapPin } from "lucide-react";
import { Button } from "./ui/Button";
import flowerMotif from "../assets/vmg-flower-motif.png";

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

        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-8 items-center px-6 md:px-12 py-10 md:py-16">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[11px] md:text-xs font-semibold tracking-wide">
              Hệ Thống Giáo Dục &amp; Đào Tạo Việt Mỹ
            </span>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
              VMG <span className="text-gold-soft">Dẫn Lối</span> Tương Lai
            </h1>

            <p className="mt-5 max-w-lg text-white/85 text-base md:text-lg leading-relaxed">
              23 năm đồng hành cùng học viên tại Đồng Nai và Bình Phước chinh phục tri thức,
              tự tin bước ra thế giới bằng ngoại ngữ, du học và hướng nghiệp.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: Award, label: "IDP & British Council" },
                { icon: GraduationCap, label: "23+ năm kinh nghiệm" },
                { icon: MapPin, label: "10 trung tâm" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/90">
                  <Icon className="w-3.5 h-3.5 text-gold-soft" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button as="a" href="#quiz" variant="outline">
                Tìm chương trình phù hợp →
              </Button>
              <Button as="a" href="#chuong-trinh" variant="ghost">
                Xem toàn bộ chương trình
              </Button>
            </div>
          </div>

          <div className="relative h-[380px] md:h-[440px]">
            {/* Layered background panel (design motif: rotated layered shape) */}
            <div className="absolute inset-4 rounded-[36px] bg-gradient-to-br from-plum/70 to-gold/40 rotate-[-4deg]" />

            {/* Main visual panel */}
            <div className="absolute inset-0 rounded-[36px] overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-plum shadow-2xl">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)",
                  backgroundSize: "22px 22px",
                }}
              />
              {/* Ghost ornamental motif - real gold flower icon from the VMG logo */}
              <img
                src={flowerMotif}
                alt=""
                aria-hidden="true"
                className="absolute -right-8 -bottom-8 w-56 h-56 opacity-25 animate-spin-slow"
              />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
                <div className="font-display text-6xl md:text-7xl font-extrabold text-white/95">42.000+</div>
                <p className="mt-2 text-sm text-white/70 max-w-[220px]">
                  Học sinh trường đối tác đã đồng hành cùng VMG
                </p>
              </div>
            </div>

            {/* Floating info cards */}
            <div
              className="hidden sm:flex absolute -left-3 top-6 md:-left-6 md:top-10 items-center gap-3 bg-white text-neutral-900 rounded-2xl pl-3 pr-4 py-3 shadow-xl animate-float"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-9 h-9 rounded-full bg-brand/10 grid place-items-center shrink-0">
                <Award className="w-4.5 h-4.5 text-brand" />
              </div>
              <div>
                <div className="text-sm font-display font-extrabold leading-none">IDP & British Council</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Đối tác IELTS chính thức</div>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -right-2 md:right-4 flex items-center gap-3 bg-white text-neutral-900 rounded-2xl pl-3 pr-4 py-3 shadow-xl animate-float-soft"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="w-9 h-9 rounded-full bg-gold/10 grid place-items-center shrink-0">
                <GraduationCap className="w-4.5 h-4.5 text-gold" />
              </div>
              <div>
                <div className="text-sm font-display font-extrabold leading-none">23+ năm</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Đồng Nai &amp; Bình Phước</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
