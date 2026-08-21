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

function JourneyBlock({ stage }: { stage: JourneyStage }) {
  const descriptions: Record<JourneyStage["stageId"], string> = {
    thieunhi: "Xây nền tiếng Anh",
    teen: "Bứt phá chứng chỉ",
    duhoc: "Du học hè & dài hạn",
    huongnghiep: "TESOL & việc làm quốc tế",
  };

  return (
    <button type="button" onClick={() => goToGroup(stage.link)} className="journey-card group relative isolate h-[220px] w-full overflow-hidden rounded-[1.75rem] text-left shadow-[0_18px_38px_-24px_rgba(43,19,21,.8)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_26px_40px_-20px_rgba(43,19,21,.5)] sm:h-[260px] md:h-[var(--stage-h)]" style={{ "--stage-h": `${stage.heightDesktop + 95}px` } as React.CSSProperties}>
      <img src={stage.imageSrc ?? undefined} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c0d10]/90 via-transparent to-white/5" />
      <div className="absolute inset-x-4 top-4 flex items-center justify-end">
        <img src="/vmg-flower-gold.png" alt="" className="h-7 w-7 object-contain opacity-80 drop-shadow" aria-hidden="true" />
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white">
        <div><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-white/75">{descriptions[stage.stageId]}</span><span className="mt-1 block font-display text-xl font-extrabold leading-none">{stage.label}</span></div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/35 bg-white/12 backdrop-blur transition group-hover:bg-white group-hover:text-brand"><ArrowDownRight className="h-4 w-4" /></span>
      </div>
    </button>
  );
}

export function Hero() {
  const stages = [...HERO_JOURNEY_STAGES].sort((a, b) => a.order - b.order);
  return (
    <section id="top" className="hero-surface relative isolate overflow-hidden border-b border-brand/10">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="container-vmg relative py-10 md:py-14 lg:py-16">
        <div className="grid items-center gap-8 xl:grid-cols-[.82fr_1.18fr] xl:gap-12">
          <div className="max-w-xl pb-2 xl:py-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/75 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-brand shadow-sm"><Sparkles className="h-3.5 w-3.5" /> VMG - Hệ thống giáo dục và đào tạo Việt Mỹ</div>
            <h1 className="mt-5 font-display text-[3.25rem] font-extrabold leading-[.94] tracking-[-.06em] text-brand sm:text-6xl lg:text-7xl">Ngoại ngữ.<br /><span className="text-gold">Du học.<br />Hướng nghiệp.</span></h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600 md:text-lg">Đồng hành trọn vẹn từ học ngoại ngữ, luyện thi và khảo thí quốc tế đến du học, phát triển nghề nghiệp — linh hoạt tại trung tâm hoặc trực tuyến.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#quiz" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-dark">Tìm lộ trình phù hợp <ArrowRight className="h-4 w-4" /></a>
              <a href="#chuong-trinh" className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-white/70 px-6 py-3.5 text-sm font-extrabold text-gold transition hover:border-brand hover:text-brand">Khám phá chương trình</a>
            </div>
          </div>
          <div className="grid grid-cols-2 items-end gap-3 sm:gap-4 lg:grid-cols-4">{stages.map((stage) => <JourneyBlock key={stage.stageId} stage={stage} />)}</div>
        </div>
        <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-brand/10 bg-white/75 shadow-[0_24px_60px_-45px_rgba(80,19,26,.55)] backdrop-blur md:grid-cols-[.75fr_.75fr_1.5fr]">
          <div className="border-b border-brand/10 p-5 md:border-b-0 md:border-r md:p-6">
            <span className="block text-3xl font-display font-extrabold text-brand">23 năm</span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[.13em] text-neutral-500">Đồng hành giáo dục</span>
          </div>
          <div className="border-b border-brand/10 p-5 md:border-b-0 md:border-r md:p-6">
            <span className="block text-3xl font-display font-extrabold text-gold">10</span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[.13em] text-neutral-500">Trung tâm &amp; học online</span>
          </div>
          <div className="p-5 md:p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-brand">Đối tác IELTS &amp; khảo thí</p>
            <div className="mt-3 grid grid-cols-3 items-center gap-3">
              <img src="/partners/idp.png" alt="IDP Việt Nam - Platinum Partner" className="h-8 w-full object-contain" />
              <img src="/partners/british-council.svg" alt="British Council" className="h-8 w-full object-contain" />
              <img src="/partners/cambridge-english.jpg" alt="Cambridge Assessment English - VN055" className="h-8 w-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
