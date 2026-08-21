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
  const descriptions: Record<JourneyStage["stageId"], string> = {
    thieunhi: "Xây nền tiếng Anh",
    teen: "Bứt phá chứng chỉ",
    duhoc: "Du học hè & dài hạn",
    huongnghiep: "TESOL & việc làm quốc tế",
  };

  return (
    <button type="button" onClick={() => goToGroup(stage.link)} className="group relative isolate w-full overflow-hidden rounded-[1.6rem] text-left shadow-[0_18px_38px_-24px_rgba(43,19,21,.8)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_26px_40px_-20px_rgba(43,19,21,.5)] md:h-[var(--stage-h)]" style={{ "--stage-h": `${stage.heightDesktop + 95}px` } as React.CSSProperties}>
      <img src={stage.imageSrc ?? undefined} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <div className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-[10px] font-extrabold text-neutral-800 backdrop-blur">0{index + 1}</div>
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
    <section id="top" className="hero-surface relative isolate overflow-hidden">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="container-vmg relative py-12 md:py-16 lg:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div className="max-w-xl pb-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/75 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-brand shadow-sm"><Sparkles className="h-3.5 w-3.5" /> VMG - Hệ thống giáo dục và đào tạo Việt Mỹ</div>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[.97] tracking-[-.055em] text-brand sm:text-6xl lg:text-7xl">Ngoại ngữ.<br /><span className="text-gold">Du học.<br />Hướng nghiệp.</span></h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600 md:text-lg">Đồng hành trọn vẹn từ học ngoại ngữ, luyện thi và khảo thí quốc tế đến du học, phát triển nghề nghiệp — linh hoạt tại trung tâm hoặc trực tuyến.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#quiz" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-dark">Tìm lộ trình phù hợp <ArrowRight className="h-4 w-4" /></a>
              <a href="#chuong-trinh" className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-white/70 px-6 py-3.5 text-sm font-extrabold text-gold transition hover:border-brand hover:text-brand">Khám phá chương trình</a>
            </div>
          </div>
          <div className="grid grid-cols-2 items-end gap-3 sm:gap-4 lg:grid-cols-4">{stages.map((stage, index) => <JourneyBlock key={stage.stageId} stage={stage} index={index} />)}</div>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-brand/10 bg-brand/10 shadow-sm sm:grid-cols-2 lg:grid-cols-[.8fr_.8fr_1.15fr_1fr]">
          <div className="flex min-h-52 flex-col justify-center bg-white/85 px-6 py-5 backdrop-blur">
            <span className="block text-2xl font-display font-extrabold text-brand">23 năm đồng hành giáo dục</span>
            <span className="mt-1 text-sm font-bold text-neutral-700">Vững nền tảng, mở tương lai</span>
            <p className="mt-1.5 text-xs leading-5 text-neutral-500">Hơn hai thập kỷ xây dựng hệ sinh thái Ngoại ngữ – Du học – Hướng nghiệp, đồng hành cùng nhiều thế hệ.</p>
          </div>
          <div className="flex min-h-52 flex-col justify-center bg-white/85 px-6 py-5 backdrop-blur">
            <span className="block text-2xl font-display font-extrabold text-gold">10+ trung tâm &amp; học online</span>
            <span className="mt-1 text-sm font-bold text-neutral-700">Linh hoạt mọi hành trình học</span>
            <p className="mt-1.5 text-xs leading-5 text-neutral-500">Học trực tiếp tại hệ thống trung tâm ở Đồng Nai hoặc online theo thời gian, nhu cầu và mục tiêu cá nhân.</p>
          </div>
          <div className="flex min-h-52 flex-col bg-white/85 px-5 py-5 backdrop-blur">
            <span className="block text-xl font-display font-extrabold leading-tight text-brand">Đối tác Kim cương IELTS</span>
            <p className="mt-1 text-xs leading-5 text-neutral-500">Đơn vị đầu tiên và duy nhất tại Đồng Nai là đối tác Kim cương của Hội đồng Anh và IDP Việt Nam.</p>
            <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
              <div className="min-w-0 border-r border-black/10 pr-3">
                <div className="flex h-12 items-center justify-center rounded-xl bg-white px-2"><img src="/partners/idp.png" alt="IDP Việt Nam" className="h-8 w-full object-contain" /></div>
                <p className="mt-2 text-center text-[10px] font-semibold leading-4 text-neutral-600">IDP Việt Nam</p>
              </div>
              <div className="min-w-0">
                <div className="flex h-12 items-center justify-center rounded-xl bg-white px-2"><img src="/partners/british-council.svg" alt="Hội đồng Anh" className="h-8 w-full object-contain" /></div>
                <p className="mt-2 text-center text-[10px] font-semibold leading-4 text-neutral-600">Hội đồng Anh</p>
              </div>
            </div>
          </div>
          <div className="flex min-h-52 flex-col bg-white/85 px-5 py-5 backdrop-blur">
            <span className="block text-xl font-display font-extrabold leading-tight text-gold">Cambridge VN055</span>
            <p className="mt-1 text-xs leading-5 text-neutral-500">Đối tác khảo thí ủy quyền, tổ chức các kỳ thi Cambridge English tại VMG.</p>
            <div className="mt-auto pt-4">
              <div className="flex h-12 items-center justify-center rounded-xl bg-white px-3"><img src="/partners/cambridge-english.jpg" alt="Cambridge English" className="h-8 w-full object-contain" /></div>
              <p className="mt-2 text-center text-[10px] font-semibold leading-4 text-neutral-600">Mã trung tâm VN055</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
