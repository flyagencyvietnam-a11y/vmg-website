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
      className="group relative w-full md:flex-1 md:min-w-0 overflow-hidden rounded-t-lg text-left
                 h-[130px] md:h-[var(--stage-h)]
                 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out
                 motion-safe:md:hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft"
      style={{ "--stage-h": `${stage.heightDesktop}px` } as React.CSSProperties}
    >
      {/* Placeholder background - real portrait photo goes here later via stage.imageSrc */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${stage.gradientFrom}, ${stage.gradientTo})` }}
      />
      <div className="absolute inset-0 grid place-items-center opacity-25">
        <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
      </div>

      {/* Overlay: darker by default, lighter on hover (desktop). Fixed low alpha on touch/mobile. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent
                   md:from-black/70 md:to-transparent md:group-hover:from-black/35
                   motion-safe:transition-colors motion-safe:duration-200"
      />

      <span className="relative z-10 absolute bottom-3 left-3 right-3 text-sm md:text-base font-display font-bold text-white group-hover:text-gold-soft motion-safe:transition-colors">
        {stage.label}
      </span>
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

      <div className="container-vmg mt-8">
        <div className="flex flex-col md:flex-row md:items-end gap-1.5 md:gap-2">
          {stages.map((stage) => (
            <JourneyBlock key={stage.stageId} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
