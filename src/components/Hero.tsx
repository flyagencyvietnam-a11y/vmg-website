import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import { HERO_JOURNEY_STAGES, type JourneyStage, type JourneyLinkTarget } from "../data/heroJourney";

function goToGroup(link: JourneyLinkTarget) {
  if (link.type === "program-filter") {
    window.dispatchEvent(new CustomEvent("vmg:set-program-filter", { detail: { filter: link.filter } }));
    document.getElementById("chuong-trinh")?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (link.type === "anchor") {
    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.href = link.href;
  }
}

function JourneyBlock({ stage, index }: { stage: JourneyStage; index: number }) {
  return (
    <button type="button" onClick={() => goToGroup(stage.link)} className="group relative isolate w-full overflow-hidden rounded-[1.6rem] text-left shadow-[0_18px_38px_-24px_rgba(43,19,21,.8)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_26px_40px_-20px_rgba(43,19,21,.5)] md:h-[var(--stage-h)]" style={{ "--stage-h": `${stage.heightDesktop + 95}px` } as React.CSSProperties}>
      <img src={stage.imageSrc ?? undefined} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <div className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-[10px] font-extrabold text-neutral-800 backdrop-blur">0{index + 1}</div>
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white">
        <div><span className="block text-[10px] font-bold uppercase tracking-[.18em] text-white/65">Lộ trình VMG</span><span className="mt-1 block font-display text-xl font-extrabold leading-none">{stage.label}</span></div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/35 bg-white/12 backdrop-blur transition group-hover:bg-white group-hover:text-brand"><ArrowDownRight className="h-4 w-4" /></span>
      </div>
    </button>
  );
}

export function Hero() {
  const stages = [...HERO_JOURNEY_STAGES].sort((a, b) => a.order - b.order);
  return (
    <section id="top" className="hero-surface relative isolate overflow-hidden">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="container-vmg relative py-12 md:py-16 lg:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div className="max-w-xl pb-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/75 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-brand shadow-sm"><Sparkles className="h-3.5 w-3.5" /> VMG - Dẫn Lối Tương Lai</div>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.97] tracking-[-.055em] text-plum sm:text-6xl lg:text-7xl">Học hôm nay.<br /><span className="text-brand">Mở lối ngày mai.</span></h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600 md:text-lg">Chọn hành trình phù hợp với độ tuổi, mục tiêu và bước tiến tiếp theo của bạn cùng VMG.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#quiz" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-dark">Tìm lộ trình phù hợp <ArrowRight className="h-4 w-4" /></a>
              <a href="#chuong-trinh" className="inline-flex items-center justify-center rounded-full border border-plum/15 bg-white/70 px-6 py-3.5 text-sm font-extrabold text-plum transition hover:border-brand hover:text-brand">Khám phá chương trình</a>
            </div>
          </div>
          <div className="grid grid-cols-2 items-end gap-3 sm:gap-4 lg:grid-cols-4">{stages.map((stage, index) => <JourneyBlock key={stage.stageId} stage={stage} index={index} />)}</div>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-brand/10 bg-brand/10 shadow-sm sm:grid-cols-3">
          <div className="bg-white/80 px-5 py-4 backdrop-blur"><span className="block text-2xl font-display font-extrabold text-plum">23 năm</span><span className="text-xs font-semibold text-neutral-500">Giáo dục & đào tạo</span></div>
          <div className="bg-white/80 px-5 py-4 backdrop-blur"><span className="block text-2xl font-display font-extrabold text-plum">10 trung tâm</span><span className="text-xs font-semibold text-neutral-500">Tại Đồng Nai & Bình Phước</span></div>
          <div className="bg-white/80 px-5 py-4 backdrop-blur"><span className="block text-2xl font-display font-extrabold text-plum">3 đối tác</span><span className="text-xs font-semibold text-neutral-500">IDP, British Council & Cambridge</span></div>
        </div>
      </div>
    </section>
  );
}
