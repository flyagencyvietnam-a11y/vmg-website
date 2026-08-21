import centerBienHoa from "../assets/vmg/centers/bien-hoa-vo-thi-sau.jpg";
import centerBinhPhuoc from "../assets/vmg/centers/binh-phuoc.jpg";
import centerLongThanh from "../assets/vmg/centers/long-thanh.jpg";
import centerNguyenKhuyen from "../assets/vmg/centers/nguyen-khuyen.jpg";
import cambridgeLearners from "../assets/vmg/students/cambridge-learners.jpg";
import ieltsAchievement from "../assets/vmg/students/ielts-achievement.jpg";
import ieltsLearning from "../assets/vmg/students/ielts-learning.jpg";
import studentGraduation from "../assets/vmg/students/student-graduation.jpg";
import summerActivity from "../assets/vmg/students/summer-activity.jpg";
import youngLearners from "../assets/vmg/students/young-learners.jpg";
import tesol from "../assets/vmg/course-support/tesol.jpg";

export type VmgPhoto = {
  src: string;
  alt: string;
  caption: string;
  position?: string;
};

export const CENTER_PHOTOS: VmgPhoto[] = [
  {
    src: centerBienHoa,
    alt: "Mặt tiền trung tâm VMG tại Võ Thị Sáu, Biên Hòa",
    caption: "VMG Biên Hòa - Võ Thị Sáu",
  },
  {
    src: centerNguyenKhuyen,
    alt: "Mặt tiền trung tâm VMG Nguyễn Khuyến",
    caption: "VMG Nguyễn Khuyến",
  },
  {
    src: centerLongThanh,
    alt: "Mặt tiền trung tâm VMG Long Thành",
    caption: "VMG Long Thành",
  },
  {
    src: centerBinhPhuoc,
    alt: "Không gian khai trương trung tâm VMG Bình Phước",
    caption: "VMG Bình Phước",
  },
];

export const STUDENT_MOMENTS: VmgPhoto[] = [
  {
    src: cambridgeLearners,
    alt: "Hai học viên nhỏ tuổi tại không gian học tập VMG",
    caption: "Không gian học tập dành cho học viên nhỏ tuổi",
    position: "center 35%",
  },
  {
    src: ieltsAchievement,
    alt: "Học viên nhận kết quả IELTS tại VMG",
    caption: "Khoảnh khắc ghi nhận hành trình học tập",
    position: "center 38%",
  },
  {
    src: studentGraduation,
    alt: "Hai học viên trong trang phục tốt nghiệp tại VMG",
    caption: "Dấu mốc hoàn thành một chặng học tập",
    position: "center 30%",
  },
  {
    src: youngLearners,
    alt: "Hai học viên nhỏ tuổi tại lớp học VMG",
    caption: "Học tập và trưởng thành cùng bạn bè",
    position: "center 32%",
  },
];

const PRODUCT_PHOTOS: Record<string, VmgPhoto[]> = {
  KINDY: [STUDENT_MOMENTS[3]],
  KIDS: [STUDENT_MOMENTS[0]],
  SUMR: [
    {
      src: summerActivity,
      alt: "Học viên VMG tham gia hoạt động mùa hè",
      caption: "Khoảnh khắc hoạt động hè tại VMG",
    },
  ],
  NGEN: [
    {
      src: ieltsLearning,
      alt: "Học viên tuổi teen trong không gian học IELTS tại VMG",
      caption: "Không gian học tập tại VMG",
    },
  ],
  FOCUS: [
    {
      src: ieltsLearning,
      alt: "Học viên trong không gian học IELTS tại VMG",
      caption: "Không gian học IELTS tại VMG",
    },
  ],
  BOOST: [STUDENT_MOMENTS[1]],
  CAMB: [STUDENT_MOMENTS[0]],
  FT15: [STUDENT_MOMENTS[1]],
  IE: [
    {
      src: ieltsLearning,
      alt: "Học viên sử dụng máy tính trong không gian học IELTS tại VMG",
      caption: "Một góc trải nghiệm học IELTS tại VMG",
    },
  ],
  VTES: [
    {
      src: tesol,
      alt: "Đội ngũ đào tạo TESOL tại VMG",
      caption: "Hình ảnh giới thiệu chương trình TESOL của VMG",
      position: "center 28%",
    },
  ],
  TESOL: [
    {
      src: tesol,
      alt: "Đội ngũ đào tạo TESOL tại VMG",
      caption: "Hình ảnh giới thiệu chương trình TESOL của VMG",
      position: "center 28%",
    },
  ],
};

export function getProductSupplementalPhotos(code: string): VmgPhoto[] {
  return PRODUCT_PHOTOS[code] ?? [];
}
