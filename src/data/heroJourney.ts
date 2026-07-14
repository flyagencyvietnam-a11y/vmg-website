export type JourneyLinkTarget =
  | { type: "program-filter"; filter: "kids" | "teens" }
  | { type: "anchor"; id: string }
  | { type: "page"; href: string };

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

import teenPerson from "../assets/hero-stage-placeholder.png";
import childPerson from "../assets/hero-child.png";
import studyAbroadPerson from "../assets/hero-study-abroad.png";
import careerPerson from "../assets/hero-career.png";

export const HERO_JOURNEY_STAGES: JourneyStage[] = [
  { stageId: "thieunhi", label: "Thiếu nhi", heightDesktop: 150, imageSrc: childPerson, link: { type: "program-filter", filter: "kids" }, order: 1, gradientFrom: "#f472b6", gradientTo: "#9d174d" },
  { stageId: "teen", label: "Teen", heightDesktop: 185, imageSrc: teenPerson, link: { type: "program-filter", filter: "teens" }, order: 2, gradientFrom: "#be202f", gradientTo: "#921824" },
  { stageId: "duhoc", label: "Du học", heightDesktop: 220, imageSrc: studyAbroadPerson, link: { type: "anchor", id: "du-hoc-nhom" }, order: 3, gradientFrom: "#2563a8", gradientTo: "#123a5e" },
  { stageId: "huongnghiep", label: "Hướng nghiệp", heightDesktop: 255, imageSrc: careerPerson, link: { type: "page", href: "/huong-nghiep" }, order: 4, gradientFrom: "#cba656", gradientTo: "#8b672a" },
];
