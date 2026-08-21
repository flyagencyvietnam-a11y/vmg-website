import kindy from "../assets/products/kindy-v2.png";
import kids from "../assets/products/kids-v2.png";
import summerSchool from "../assets/products/summer-school-v2.png";
import nextgenIelts from "../assets/products/nextgen-ielts-v2.png";
import sat from "../assets/products/sat-v2.png";
import thpt from "../assets/products/thpt-v2.png";
import nganHangDe from "../assets/products/ngan-hang-de-v2.png";
import eplus from "../assets/products/eplus-v2.png";
import ieltsFocus from "../assets/products/ielts-focus-v2.png";
import ieltsBooster from "../assets/products/ielts-booster-v2.png";
import toeic from "../assets/products/toeic-v2.png";
import vstepExpress from "../assets/products/vstep-express-v2.png";
import cambridgeTesting from "../assets/products/cambridge-testing-v2.png";
import tiengTrung from "../assets/products/tieng-trung-v2.png";
import hsk from "../assets/products/hsk-v2.png";
import tesolOffline from "../assets/products/tesol-offline-v2.png";
import b2b from "../assets/products/b2b-v2.png";
import flextrack from "../assets/products/flextrack-v2.png";
import ft15 from "../assets/products/ft15-v2.png";
import ieltsExpress from "../assets/products/ielts-express-v2.png";
import vstepMastery from "../assets/products/vstep-mastery-v2.png";
import giaoTiep from "../assets/products/giao-tiep-v2.png";
import tesolEpath from "../assets/products/tesol-epath-v2.png";
import edunext from "../assets/products/edunext-v2.png";

export type ProductVisual = { src: string; alt: string; position?: string; tint: string };

// Newly generated course scenes, deliberately independent from hero assets.
const VISUALS: Record<string, Omit<ProductVisual, "tint">> = {
  KINDY: { src: kindy, alt: "Lớp tiếng Anh mầm non VMG học với thẻ hình ảnh" },
  KIDS: { src: kids, alt: "Lớp tiếng Anh thiếu nhi VMG thực hành giao tiếp" },
  SUMR: { src: summerSchool, alt: "Học viên VMG tham gia hoạt động trải nghiệm mùa hè" },
  NGEN: { src: nextgenIelts, alt: "Học viên tuổi teen VMG thực hành IELTS" },
  SAT: { src: sat, alt: "Học viên VMG luyện tư duy toán cho kỳ thi SAT" },
  THPT: { src: thpt, alt: "Lớp luyện thi THPT tại VMG" },
  DETHI: { src: nganHangDe, alt: "Học viên luyện đề trực tuyến với giáo viên VMG hỗ trợ" },
  EPLUS: { src: eplus, alt: "Lớp tiếng Anh giao tiếp dành cho người đi làm" },
  FOCUS: { src: ieltsFocus, alt: "Lớp ôn luyện IELTS Exam Focus" },
  BOOST: { src: ieltsBooster, alt: "Học viên thực hành IELTS Speaking với giáo viên" },
  TOEIC: { src: toeic, alt: "Lớp luyện thi TOEIC cho người đi làm" },
  VSTPX: { src: vstepExpress, alt: "Lớp làm quen định dạng bài thi VSTEP" },
  VSTEP_EP: { src: vstepExpress, alt: "Học viên tự ôn VSTEP linh hoạt trên nền tảng trực tuyến" },
  CAMB: { src: cambridgeTesting, alt: "Học viên tham gia phần thi nói Cambridge tại VMG" },
  TTGT: { src: tiengTrung, alt: "Lớp thực hành tiếng Trung giao tiếp" },
  HSK: { src: hsk, alt: "Lớp luyện thi HSK tập trung kỹ năng nghe" },
  VTES: { src: tesolOffline, alt: "Buổi thực hành giảng dạy trong khóa TESOL offline" },
  B2B: { src: b2b, alt: "Buổi đào tạo tiếng Anh tại doanh nghiệp" },
  FLEX: { src: flextrack, alt: "Học viên tham gia lớp tiếng Anh trực tuyến linh hoạt" },
  FT15: { src: ft15, alt: "Buổi luyện IELTS Speaking chuyên sâu một kèm một" },
  IE: { src: ieltsExpress, alt: "Học viên theo học IELTS Express Online" },
  VSTEP: { src: vstepMastery, alt: "Học viên VSTEP Mastery nhận hỗ trợ trực tuyến" },
  GT: { src: giaoTiep, alt: "Học viên thực hành tiếng Anh giao tiếp trong công việc" },
  TESOL: { src: tesolEpath, alt: "Giáo viên theo học TESOL E-PATH trực tuyến" },
  EDU: { src: edunext, alt: "Giáo viên bộ môn học tiếng Anh chuyên ngành với EduNext" },
};

export function getProductVisual(code: string): ProductVisual {
  const visual = VISUALS[code] ?? { src: flextrack, alt: "Không gian học tập tại VMG" };
  return { ...visual, tint: getProductTint(code) };
}

function getProductTint(code: string): string {
  if (["KINDY", "KIDS", "EPLUS", "GT"].includes(code)) return "rgba(236, 72, 153, .28)";
  if (["NGEN", "SAT", "THPT", "FOCUS", "BOOST", "TOEIC", "VSTPX", "VSTEP_EP", "CAMB", "FT15", "IE", "VSTEP"].includes(code)) return "rgba(190, 32, 47, .30)";
  if (["DETHI", "FLEX", "TTGT", "HSK", "TESOL", "EDU"].includes(code)) return "rgba(37, 99, 168, .28)";
  return "rgba(203, 166, 86, .30)";
}
