import { ArrowUpRight, ArrowRight } from "lucide-react";
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
    huongnghiep: "Định hướng tương lai",
  };

  return (
    <button type="button" onClick={() => goToGroup(stage.link)} className="journey-card group" style={{ "--stage-h": `${stage.heightDesktop + 110}px` } as React.CSSProperties}>
      <img src={stage.imageSrc ?? undefined} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c0d10]/90 via-transparent to-white/5" />
      <div className="journey-caption">
        <span className="journey-description">{descriptions[stage.stageId]}</span>
        <span className="journey-title">{stage.label}<ArrowUpRight aria-hidden="true" /></span>
      </div>
    </button>
  );
}

export function Hero() {
  const stages = [...HERO_JOURNEY_STAGES].sort((a, b) => a.order - b.order);
  return (
    <section id="top" className="hero-surface relative isolate overflow-hidden">
      <div className="container-vmg">
        <div className="hero-composition">
          <div className="hero-copy">
            <div className="home-eyebrow">Hệ thống Giáo dục và Đào tạo Việt Mỹ</div>
            <h1>Ngoại ngữ.<br /><span>Du học.</span><br />Hướng nghiệp.</h1>
            <p>Mỗi giai đoạn, một bước tiến. VMG đồng hành cùng bạn từ học ngoại ngữ đến du học và định hướng tương lai.</p>
            <div className="hero-actions">
              <a href="#quiz" className="home-button">Tìm lộ trình phù hợp <ArrowRight aria-hidden="true" /></a>
              <a href="#chuong-trinh" className="home-button home-button-outline">Xem toàn bộ chương trình</a>
            </div>
          </div>
          <div className="journey-composition"><div className="journey-grid">{stages.map((stage) => <JourneyBlock key={stage.stageId} stage={stage} />)}</div><p className="journey-footnote"><span>VMG — Dẫn Lối Tương Lai</span><span aria-hidden="true">01 — 04</span></p></div>
        </div>
        <div className="hero-proof">
          <div className="hero-stat">
            <span>23<span className="stat-unit"> năm</span></span>
            <p>Đồng hành giáo dục</p>
          </div>
          <div className="hero-stat">
            <span>10</span>
            <p>Trung tâm trong hệ thống</p>
          </div>
          <div className="hero-partners">
            <p>Đối tác IELTS &amp; khảo thí</p>
            <div className="hero-partner-logos">
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
