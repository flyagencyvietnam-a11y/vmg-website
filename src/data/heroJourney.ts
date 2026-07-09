// Hero "Ascending Journey Blocks" config - see docs/context/hero_ascending_journey_spec.md
// Order intentionally overrides the spec's default order per business direction:
// Thiếu nhi -> Teen -> Du học -> Hướng nghiệp (career, tallest = final destination of the journey).
//
// Each block now links directly to the matching product group instead of forcing users
// through the quiz (confirmed with Nghiêm 09/07/2026: lead capture should live on every
// product surface, not just the quiz; personalized quiz is an opt-in extra, not the
// default path). Two link types:
// - "program-filter": scrolls to #chuong-trinh and pre-sets ProgramsSection's age filter
// - "anchor": scrolls straight to a specific section/card id on the homepage
export type JourneyLinkTarget =
  | { type: "program-filter"; filter: "kids" | "teens" }
  | { type: "anchor"; id: string };

export type JourneyStage = {
  stageId: string;
  label: string;
  heightDesktop: number;
  imageSrc: string | null;
  link: JourneyLinkTarget;
  order: number;
  gradientFrom: string;
  gradientTo: string;
};

// imageSrc: temporary generic representative figure (not a real named student, per
// CLAUDE.md anti-fabrication rule) reused across all 4 stages until real per-stage
// photos are ready - see hero_ascending_journey_spec.md §5.
import placeholderPerson from "../assets/hero-stage-placeholder.png";

// Per-stage color identity (confirmed with Nghiêm 09/07/2026): pink=Thiếu nhi,
// red/brand=Teen, blue=Du học (matches VMP brand blue - see index.css note on
// --color-vmp-blue re: exact hex still pending), gold=Hướng nghiệp.
export const HERO_JOURNEY_STAGES: JourneyStage[] = [
  { stageId: "thieunhi", label: "Thiếu nhi", heightDesktop: 150, imageSrc: placeholderPerson, link: { type: "program-filter", filter: "kids" }, order: 1, gradientFrom: "#f472b6", gradientTo: "#9d174d" },
  { stageId: "teen", label: "Teen", heightDesktop: 185, imageSrc: placeholderPerson, link: { type: "program-filter", filter: "teens" }, order: 2, gradientFrom: "#be202f", gradientTo: "#921824" },
  { stageId: "duhoc", label: "Du học", heightDesktop: 220, imageSrc: placeholderPerson, link: { type: "anchor", id: "du-hoc-nhom" }, order: 3, gradientFrom: "#2563a8", gradientTo: "#123a5e" },
  { stageId: "huongnghiep", label: "Hướng nghiệp", heightDesktop: 255, imageSrc: placeholderPerson, link: { type: "anchor", id: "card-tesol-epath" }, order: 4, gradientFrom: "#cba656", gradientTo: "#8b672a" },
];
