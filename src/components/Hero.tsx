import { ImageIcon } from "lucide-react";
import { HERO_JOURNEY_STAGES, type JourneyStage } from "../data/heroJourney";

function startQuiz(branch: JourneyStage["quizBranchTarget"]) {
  window.dispatchEvent(new CustomEvent("vmg:start-quiz", { detail: { branch } }));
  document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function JourneyBlock({ stage }: { stage: JourneyStage }) {
  return (
    <button
      type="button"
      onClick={() => startQuiz(stage.quizBranchTarget)}
      className="group relative isolate w-full md:flex-1 md:min-w-0 text-left
                 h-[130px] md:h-[var(--stage-h)]
                 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out
                 motion-safe:md:hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft"
      style={{ "--stage-h": `${stage.heightDesktop}px` } as React.CSSProperties}
    >
      {/* Glow behind the figure - subtle always-on on mobile (no hover there), blooms on hover on desktop */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[-30px] md:top-[-70px] z-0
                   w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold-soft/20 md:bg-gold-soft/0 md:group-hover:bg-gold-soft/50
                   blur-2xl motion-safe:transition-all motion-safe:duration-300"
      />

      {/* Representative figure - peeks above the block; pops up further + glows on hover (desktop).
          On mobile there's no real hover (tap navigates away immediately), so it sits in the
          "risen" position by default instead of waiting for an interaction that won't be seen. */}
      {stage.imageSrc && (
        <img
          src={stage.imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 z-[5]
                     w-16 h-24 md:w-20 md:h-28 object-cover object-top rounded-2xl
                     shadow-lg shadow-black/40
                     top-[-22px] md:top-[-38px] md:group-hover:top-[-88px] md:group-hover:scale-105
                     motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
        />
      )}

      {/* Shelf: the colored podium itself - opaque, so it hides the lower half of the figure behind it */}
      <div className="absolute inset-0 overflow-hidden rounded-t-lg z-10">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${stage.gradientFrom}, ${stage.gradientTo})` }}
        />
        {!stage.imageSrc && (
          <div className="absolute inset-0 grid place-items-center opacity-25">
            <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
          </div>
        )}
        {/* Overlay: darker by default, lighter on hover (desktop). Fixed low alpha on touch/mobile. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent
                     md:from-black/70 md:to-transparent md:group-hover:from-black/35
                     motion-safe:transition-colors motion-safe:duration-200"
        />
        <span className="absolute bottom-3 left-3 right-3 text-sm md:text-base font-display font-bold text-white md:group-hover:text-gold-soft motion-safe:transition-colors">
          {stage.label}
        </span>
      </div>
    </button>
  );
}

export function Hero() {
  const stages = [...HERO_JOURNEY_STAGES].sort((a, b) => a.order - b.order);

  return (
    <section id="top" className="w-full bg-[#0C0C0E]">
      <div className="container-vmg pt-10 pb-0 md:pt-14">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
          <span className="text-white">Dẫn Lối</span>{" "}
          <span className="text-brand">Tương Lai</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-white/60">
          <span className="md:hidden">Chạm để xem hành trình</span>
          <span className="hidden md:inline">Trỏ vào từng giai đoạn để xem hành trình</span>
        </p>
      </div>

      <div className="container-vmg mt-16 md:mt-28">
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-2">
          {stages.map((stage) => (
            <JourneyBlock key={stage.stageId} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
