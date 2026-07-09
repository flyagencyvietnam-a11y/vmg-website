import { ImageIcon } from "lucide-react";
import { HERO_JOURNEY_STAGES, type JourneyStage, type JourneyLinkTarget } from "../data/heroJourney";

function goToGroup(link: JourneyLinkTarget) {
  if (link.type === "program-filter") {
    window.dispatchEvent(new CustomEvent("vmg:set-program-filter", { detail: { filter: link.filter } }));
    document.getElementById("chuong-trinh")?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function JourneyBlock({ stage }: { stage: JourneyStage }) {
  return (
    <button
      type="button"
      onClick={() => goToGroup(stage.link)}
      className="group relative isolate w-full md:flex-1 md:min-w-0 text-left
                 h-[130px] md:h-[var(--stage-h)]
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft"
      style={{ "--stage-h": `${stage.heightDesktop}px` } as React.CSSProperties}
    >
      {/* Podium - the stage's color identity, always visible as a frame behind/around the photo card */}
      <div
        className="absolute inset-0 rounded-t-lg z-0"
        style={{ background: `linear-gradient(180deg, ${stage.gradientFrom}, ${stage.gradientTo})` }}
      />

      {/* Glow - subtle always-on on mobile (no hover there), blooms behind the card on hover on desktop */}
      <div
        className="absolute inset-x-2 top-2 bottom-2 rounded-t-lg z-[1]
                   opacity-30 md:opacity-0 md:group-hover:opacity-70
                   blur-xl motion-safe:transition-opacity motion-safe:duration-300"
        style={{ background: stage.gradientFrom }}
      />

      {/* Photo card - the figure sits fixed and fully visible inside the block at rest.
          On hover (desktop) the whole card scales up and lifts slightly, "bursting" toward
          the viewer, instead of being hidden and revealed from behind the podium. */}
      <div
        className="absolute inset-[3px] md:inset-1 overflow-hidden rounded-t-md z-10
                   origin-bottom motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out
                   md:group-hover:scale-[1.06] md:group-hover:-translate-y-1.5"
      >
        {stage.imageSrc ? (
          <img
            src={stage.imageSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center opacity-25">
            <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
          </div>
        )}

        {/* Overlay: darker by default, lighter on hover (desktop). Fixed low alpha on touch/mobile. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                     md:from-black/75 md:to-transparent md:group-hover:from-black/45
                     motion-safe:transition-colors motion-safe:duration-200"
        />
        <span className="absolute bottom-3 left-3 right-3 text-sm md:text-base font-display font-bold text-white motion-safe:transition-colors">
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
          <span className="md:hidden">Chạm vào giai đoạn của bạn để xem chương trình</span>
          <span className="hidden md:inline">Chọn giai đoạn của bạn để xem ngay chương trình phù hợp</span>
        </p>
      </div>

      <div className="container-vmg mt-8 md:mt-12">
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-2">
          {stages.map((stage) => (
            <JourneyBlock key={stage.stageId} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
