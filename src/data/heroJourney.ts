// Hero "Ascending Journey Blocks" config - see docs/context/hero_ascending_journey_spec.md
// Order below intentionally overrides the spec's default order per business direction:
// Mầm non -> GenZ -> Du học -> Hướng nghiệp (career, tallest = final destination of the journey).
export type QuizBranchTarget = "child" | "self" | "abroad" | "career";

export type JourneyStage = {
  stageId: string;
  label: string;
  heightDesktop: number;
  imageSrc: string | null;
  quizBranchTarget: QuizBranchTarget;
  order: number;
  gradientFrom: string;
  gradientTo: string;
};

// imageSrc: temporary generic representative figure (not a real named student, per
// CLAUDE.md anti-fabrication rule) reused across all 4 stages until real per-stage
// photos are ready - see hero_ascending_journey_spec.md §5.
import placeholderPerson from "../assets/hero-stage-placeholder.png";

// Per-stage color identity (confirmed with Nghiêm 09/07/2026): pink=Mầm non,
// red/brand=GenZ, blue=Du học (matches VMP brand blue - see index.css note on
// --color-vmp-blue re: exact hex still pending), gold=Hướng nghiệp.
export const HERO_JOURNEY_STAGES: JourneyStage[] = [
  { stageId: "mamnon", label: "Mầm non", heightDesktop: 150, imageSrc: placeholderPerson, quizBranchTarget: "child", order: 1, gradientFrom: "#f472b6", gradientTo: "#9d174d" },
  { stageId: "genz", label: "GenZ", heightDesktop: 185, imageSrc: placeholderPerson, quizBranchTarget: "self", order: 2, gradientFrom: "#be202f", gradientTo: "#921824" },
  { stageId: "duhoc", label: "Du học", heightDesktop: 220, imageSrc: placeholderPerson, quizBranchTarget: "abroad", order: 3, gradientFrom: "#2563a8", gradientTo: "#123a5e" },
  { stageId: "huongnghiep", label: "Hướng nghiệp", heightDesktop: 255, imageSrc: placeholderPerson, quizBranchTarget: "career", order: 4, gradientFrom: "#cba656", gradientTo: "#8b672a" },
];
