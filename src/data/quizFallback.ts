export type QuizFallbackRecommendation = {
  name: string;
  desc: string;
  overlay: string;
  href: string;
};

type QuizFallbackResult = {
  primary: QuizFallbackRecommendation;
  crossSell: QuizFallbackRecommendation[];
};

const kindy: QuizFallbackRecommendation = { name: "Kindy – E-Pioneer", desc: "Tiếng Anh nền tảng cho trẻ 3–5 tuổi tại trung tâm VMG.", overlay: "from-brand/90 to-brand-dark", href: "/hoc-online/kindy-e-pioneer" };
const kids: QuizFallbackRecommendation = { name: "Kids – E-Contender/E-Genius", desc: "Lộ trình tiếng Anh và Cambridge cho học sinh 6–11 tuổi.", overlay: "from-plum to-[#271942]", href: "/hoc-online/kids-e-contender-genius" };
const teens: QuizFallbackRecommendation = { name: "NextGen IELTS", desc: "Lộ trình tiếng Anh học thuật và IELTS dành cho học sinh 12–16 tuổi.", overlay: "from-brand/90 to-plum", href: "/hoc-online/nextgen-ielts" };
const communication: QuizFallbackRecommendation = { name: "Tiếng Anh Giao Tiếp", desc: "Chương trình online giúp xây nền tảng phản xạ và tự tin giao tiếp.", overlay: "from-brand/90 to-brand-dark", href: "/hoc-online/tieng-anh-giao-tiep" };
const ielts: QuizFallbackRecommendation = { name: "IELTS Express Online", desc: "Lộ trình IELTS online theo cấp độ với giáo viên Việt Nam và nước ngoài.", overlay: "from-plum to-[#271942]", href: "/hoc-online/ielts-express" };
const tesolOnline: QuizFallbackRecommendation = { name: "TESOL E-PATH", desc: "Lộ trình TESOL 120 giờ kết hợp tự học và livestream hàng tuần.", overlay: "from-brand/90 to-plum", href: "/hoc-online/tesol-epath" };
const tesolCenter: QuizFallbackRecommendation = { name: "TESOL 120H/140H", desc: "Chương trình đào tạo giáo viên tại VMG.", overlay: "from-brand/90 to-brand-dark", href: "/hoc-online/tesol-120h-140h" };
const vmp: QuizFallbackRecommendation = { name: "VMP by VMG", desc: "Tư vấn lộ trình, hồ sơ và lựa chọn điểm đến du học phù hợp.", overlay: "from-plum to-[#271942]", href: "https://duhocvmp.com/" };

const entries: Record<string, QuizFallbackResult> = {};

for (const goal of ["communication", "cambridge", "study-abroad"]) {
  entries[`child|3-5|${goal}`] = { primary: kindy, crossSell: [kids] };
  entries[`child|6-11|${goal}`] = { primary: kids, crossSell: [kindy, teens] };
  entries[`child|12-16|${goal}`] = { primary: teens, crossSell: [ielts] };
}

entries["self|work|center"] = { primary: communication, crossSell: [] };
entries["self|work|online"] = { primary: communication, crossSell: [ielts] };
entries["self|exam|center"] = { primary: teens, crossSell: [ielts] };
entries["self|exam|online"] = { primary: ielts, crossSell: [communication] };
entries["self|tesol|center"] = { primary: tesolCenter, crossSell: [tesolOnline] };
entries["self|tesol|online"] = { primary: tesolOnline, crossSell: [tesolCenter] };
entries["abroad|explore"] = { primary: vmp, crossSell: [ielts] };
entries["abroad|application"] = { primary: vmp, crossSell: [ielts] };
entries["abroad|scholarship"] = { primary: vmp, crossSell: [ielts] };

export const QUIZ_FALLBACK_MAPPING = entries;
