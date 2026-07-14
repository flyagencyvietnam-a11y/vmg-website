// Unified "Ngoại ngữ" pillar product catalog - single source of truth for:
// - the homepage carousels (ProgramsSection filters by ageGroup, OnlineCoursesSection
//   highlights a few flagship items)
// - /ngoai-ngu (full catalog, grouped by `section`)
// - /hoc-online (filtered to format !== "offline")
//
// format tag: confirmed per-product across two copywrite briefs
// (VMG_Hero_Pages_SanPham_NgoaiNgu_20260713.md, then _ConLai_20260713.md) - each
// brief's per-product research supersedes the earlier broad-brush guess. Notably
// several ESL/offline-first products (E-Pioneer, E-Contender/Genius, Bán trú hè,
// A01-D01, Khảo thí) are OFFLINE-ONLY per the second brief, not hybrid.
//
// Market positioning (confirmed 13/07/2026): VMG targets the national market, not
// a single province - Đồng Nai and Bình Phước merged into one province 01/07/2025.
// Do not localize copy/SEO keywords to a city/province name (see CLAUDE.md §1).
//
// Price display policy (confirmed 13/07/2026, CLAUDE.md §5C): the public site
// shows NO prices for now, for any product. Price fields stay in this file for
// internal reference; the detail page renders a "liên hệ để nhận báo giá" CTA
// instead of the priceList/priceCurrent/hourlyRate values.
export type ProductFormat = "online" | "offline" | "hybrid";
export type AgeGroupFilter = "kids" | "teens" | "adult" | "b2b";
export type NgoaiNguSection =
  | "mamnon" // 2.1 Mầm non (3-5)
  | "thieunhi" // 2.1 Thiếu nhi (6-11)
  | "thieunien" // 2.1 Thiếu niên (12-16)
  | "adult" // 2.2 Giao tiếp người lớn
  | "luyenthi" // 2.3 Luyện thi & chứng chỉ: IELTS/TOEIC/VSTEP/Cambridge
  | "tieng-trung" // Tiếng Trung (HSK) - part of the pillar per CLAUDE.md §2, no numbered sitemap slot of its own
  | "tesol" // 2.4 VMG TESOL (offline 120H/140H + online TESOL E-PATH)
  | "b2b"; // 2.5 Đào tạo doanh nghiệp (B2B)

// Full "hero page" copywrite - only present for products with a finished copy
// brief. Pages without `hero` fall back to the plain info-table layout.
export type HeroFaq = { q: string; a: string };
export type HeroNextStep = { label: string; note: string };

export type HeroCopy = {
  metaTitle: string;
  metaDescription: string;
  keywordsPrimary?: string;
  keywordsSecondary?: string;
  h1: string;
  subheadline: string;
  ctaPrimary?: string;
  ctaFinal: string;
  painIntro?: string;
  painPoints?: string[];
  painParagraph?: string;
  solutionIntro?: string;
  solutionPoints?: string[];
  solutionParagraph?: string;
  solutionCaveat?: string;
  nextSteps?: HeroNextStep[];
  faq: HeroFaq[];
  testimonialPending?: boolean;
};

export type Product = {
  code: string;
  slug: string;
  name: string;
  desc: string;
  overlay: string;
  ageGroup: AgeGroupFilter;
  section: NgoaiNguSection;
  format: ProductFormat;
  // Defaults to true. Set false for products under an explicit hold/gate that
  // must not run ads or accept public enrollment yet (e.g. Tiếng Trung/HSK
  // pilot pending teacher confirmation) - hidden from every public catalog view.
  published?: boolean;
  tag?: string;
  audience?: string;
  duration?: string;
  teachers?: string;
  classSize?: string;
  entryRequirement?: string;
  priceList?: string;
  priceCurrent?: string;
  hourlyRate?: string;
  commitment?: string;
  hero?: HeroCopy;
};

export const PRODUCTS: Product[] = [
  {
    code: "KINDY", slug: "kindy-e-pioneer", name: "Kindy – E-Pioneer",
    desc: "Xây nền tảng tiếng Anh tự nhiên, không áp lực cho trẻ ngay từ giai đoạn đầu đời.",
    overlay: "from-accent-pink-soft/80 to-brand/70", ageGroup: "kids", section: "mamnon", format: "offline",
    audience: "Trẻ mầm non - phụ huynh là người quyết định đăng ký. Phù hợp gia đình muốn con tiếp cận tiếng Anh sớm trong môi trường tự nhiên, không nặng tính học thuật.",
    hero: {
      metaTitle: "E-Pioneer – Tiếng Anh Mầm Non, Xây Nền Ngôn Ngữ Từ Những Năm Đầu Đời | VMG",
      metaDescription: "Chương trình tiếng Anh mầm non E-Pioneer tại VMG — xây dựng nền tảng ngôn ngữ tự nhiên, không áp lực cho trẻ ngay từ giai đoạn đầu đời.",
      keywordsPrimary: "tiếng anh mầm non",
      keywordsSecondary: "tiếng anh cho bé, học tiếng anh sớm cho trẻ mầm non",
      h1: "E-Pioneer — Xây Nền Tảng Tiếng Anh Từ Những Năm Đầu Đời",
      subheadline: "\"Cửa sổ vàng\" để trẻ tiếp thu ngôn ngữ tự nhiên — E-Pioneer giúp con yêu thích tiếng Anh trước khi kịp sợ nó.",
      painParagraph: "Giai đoạn mầm non là \"cửa sổ vàng\" để trẻ tiếp thu ngôn ngữ một cách tự nhiên — nhưng môi trường học không phù hợp có thể khiến trẻ sợ tiếng Anh trước khi kịp yêu thích nó.",
      solutionParagraph: "E-Pioneer được xây dựng nội dung học riêng cho giai đoạn đầu đời, giúp trẻ tiếp cận tiếng Anh tự nhiên qua các hoạt động phù hợp lứa tuổi, không tạo áp lực học thuật sớm.",
      faq: [
        { q: "Độ tuổi nào phù hợp để bắt đầu?", a: "[CẦN XÁC NHẬN: độ tuổi tuyển sinh cụ thể]" },
        { q: "Con chưa nói sõi tiếng Việt có học được không?", a: "Chương trình thiết kế phù hợp với giai đoạn phát triển ngôn ngữ đầu đời, đội ngũ tư vấn sẽ đánh giá cụ thể theo từng trường hợp." },
      ],
      ctaFinal: "Đăng ký tham quan lớp học thử cho con.",
      testimonialPending: true,
    },
  },
  {
    code: "KIDS", slug: "kids-e-contender-genius", name: "Kids – E-Contender/E-Genius",
    desc: "Tiếng Anh tiểu học – cam kết đầu ra theo cấp Cambridge Starters/Movers/Flyers.",
    overlay: "from-accent-pink/80 to-brand/75", ageGroup: "kids", section: "thieunhi", format: "offline",
    audience: "Học sinh tiểu học - phụ huynh là người quyết định đăng ký, muốn con đạt chứng chỉ tiếng Anh quốc tế Cambridge theo lộ trình rõ ràng.",
    commitment: "Cam kết đầu ra theo cấp Cambridge Starters/Movers/Flyers, cùng 12 khiên sau lộ trình.",
    hero: {
      metaTitle: "E-Contender & E-Genius – Tiếng Anh Tiểu Học, Cam Kết Đầu Ra Cambridge | VMG",
      metaDescription: "Chương trình tiếng Anh tiểu học tại VMG, đầu ra chuẩn Cambridge Starters/Movers/Flyers, cam kết 12 khiên sau lộ trình.",
      keywordsPrimary: "học tiếng anh tiểu học cambridge",
      keywordsSecondary: "luyện thi cambridge starters movers flyers, tiếng anh tiểu học",
      h1: "E-Contender & E-Genius — Vững Tiếng Anh Tiểu Học, Chuẩn Đầu Ra Cambridge",
      subheadline: "Xây dựng năng lực tiếng Anh tiểu học theo chuẩn quốc tế Cambridge, đầu ra rõ ràng theo từng cấp độ.",
      solutionParagraph: "Chương trình xây dựng năng lực tiếng Anh tiểu học theo chuẩn quốc tế Cambridge, với đầu ra rõ ràng theo từng cấp độ Starters/Movers/Flyers và cam kết 12 khiên sau lộ trình.",
      nextSteps: [{ label: "Khảo thí (OSIR)", note: "Sau khi hoàn thành, đăng ký thi Cambridge chính thức tại VMG" }],
      faq: [],
      ctaFinal: "Đăng ký kiểm tra trình độ tiếng Anh miễn phí cho con.",
      testimonialPending: true,
    },
  },
  {
    code: "SUMR", slug: "summer-school", name: "Summer School – Bán trú hè",
    desc: "Một mùa hè vừa vui vừa bổ ích — chủ đề mới mỗi năm, có dã ngoại hàng tuần.",
    overlay: "from-lemon/80 to-gold/80", ageGroup: "kids", section: "thieunhi", format: "offline",
    audience: "Học sinh Cấp 1. Phù hợp phụ huynh cần chỗ gửi con nghỉ hè vừa an toàn vừa có giá trị giáo dục và trải nghiệm.",
    hero: {
      metaTitle: "Bán Trú Hè VMG – Một Mùa Hè Trải Nghiệm Và Bổ Ích Cho Con | VMG",
      metaDescription: "Chương trình bán trú hè tại VMG dành cho học sinh Cấp 1, mỗi năm một chủ đề mới, có dã ngoại outdoor hàng tuần.",
      keywordsPrimary: "bán trú hè cho học sinh tiểu học",
      keywordsSecondary: "khóa hè cấp 1, trại hè tiếng anh",
      h1: "Bán Trú Hè — Một Mùa Hè Vừa Vui Vừa Bổ Ích",
      subheadline: "Mỗi năm một chủ đề mới, có hoạt động dã ngoại outdoor hàng tuần — vừa học vừa chơi, an toàn và giàu trải nghiệm.",
      painParagraph: "Ai cũng muốn con có một mùa hè ý nghĩa, nhưng không phải gia đình nào cũng có thời gian tổ chức hoạt động ngoại khóa, dã ngoại, trải nghiệm mới cho con mỗi tuần.",
      solutionParagraph: "Bán trú hè VMG dành cho học sinh Cấp 1, mỗi năm xây dựng một chủ đề mới, có hoạt động dã ngoại outdoor hàng tuần — vừa học vừa chơi, an toàn và giàu trải nghiệm.",
      faq: [],
      ctaFinal: "Đăng ký giữ chỗ sớm cho mùa hè tới.",
      testimonialPending: true,
    },
  },
  {
    code: "NGEN", slug: "nextgen-ielts", name: "Teens – NextGen IELTS",
    desc: "Định hướng IELTS sớm cho học sinh THCS, lộ trình dài đến lớp 11.",
    overlay: "from-amber-400/80 to-orange-500/80", ageGroup: "teens", section: "thieunien", format: "hybrid",
    audience: "Học sinh THCS. Phụ huynh muốn con có nền IELTS vững chắc trước khi bước vào cấp 3, tránh dồn áp lực ôn thi vào những năm cuối.",
    commitment: "Cam kết đầu ra theo hai mốc: band 5.5 hoặc 6.5 tùy lộ trình.",
    hero: {
      metaTitle: "NextGen IELTS – Định Hướng IELTS Sớm Cho Học Sinh THCS | VMG",
      metaDescription: "NextGen IELTS tại VMG: lộ trình dài hạn từ THCS đến lớp 11, cam kết đầu ra IELTS 5.5 và 6.5.",
      keywordsPrimary: "luyện ielts sớm cho học sinh thcs",
      keywordsSecondary: "ielts thcs, định hướng ielts sớm cho con",
      h1: "NextGen IELTS — Định Hướng Sớm, Vững Chắc Đến Lớp 11",
      subheadline: "Lộ trình dài hạn dành cho học sinh THCS, phát triển liên tục đến lớp 11 để thi IELTS thật.",
      solutionParagraph: "Lộ trình dài hạn dành cho học sinh THCS, phát triển liên tục đến lớp 11 để thi IELTS thật, với cam kết đầu ra theo hai mốc: band 5.5 và band 6.5.",
      faq: [],
      ctaFinal: "Đăng ký lộ trình định hướng IELTS sớm cho con ngay từ THCS.",
      testimonialPending: true,
    },
  },
  {
    code: "SAT", slug: "sat", name: "SAT",
    desc: "4 cấp độ theo mục tiêu điểm – chuẩn bị hồ sơ apply Mỹ và học bổng quốc tế.",
    overlay: "from-rose-400/80 to-brand-dark/85", ageGroup: "teens", section: "thieunien", format: "hybrid",
    audience: "Học sinh THPT có định hướng du học, cần điểm SAT phục vụ xét tuyển học bổng hoặc trường quốc tế.",
    hero: {
      metaTitle: "Luyện Thi SAT – 4 Cấp Độ Từ Nền Tảng Đến Elite, Theo Đúng Mục Tiêu Điểm Số | VMG",
      metaDescription: "Chương trình luyện thi SAT tại VMG với 4 cấp độ: 1050, 1250, 1400, 1550+ — chọn đúng lộ trình theo mục tiêu điểm số và trường bạn nhắm đến.",
      keywordsPrimary: "luyện thi sat theo mục tiêu điểm số",
      keywordsSecondary: "sat 1400, luyện sat học bổng quốc tế",
      h1: "Luyện Thi SAT — Lộ Trình Rõ Ràng Theo Đúng Mục Tiêu Điểm Số Của Bạn",
      subheadline: "4 cấp độ theo đúng mục tiêu điểm số — từ nền tảng đến Elite.",
      painParagraph: "Không phải ai luyện SAT cũng cần cùng một lộ trình — học sinh mới bắt đầu và học sinh nhắm học bổng toàn phần cần cách tiếp cận hoàn toàn khác nhau. Học sai cấp độ vừa lãng phí thời gian, vừa dễ nản.",
      solutionIntro: "4 cấp độ theo đúng mục tiêu:",
      solutionPoints: [
        "SAT 1050 — Nền tảng: học sinh mới bắt đầu hoặc dưới trung bình.",
        "SAT 1250 — Tăng tốc: đã có nền, hướng trường quốc tế khá.",
        "SAT 1400 — Nâng cao: hướng top đầu và học bổng quốc tế.",
        "SAT 1550+ — Elite: chinh phục điểm top, mentoring sát sao.",
      ],
      nextSteps: [{ label: "Tư vấn du học VMP", note: "Sau khi có điểm SAT mục tiêu, xây dựng hồ sơ ứng tuyển (nội dung Du học cần chị Hằng phê duyệt riêng)" }],
      faq: [],
      ctaFinal: "Đăng ký kiểm tra trình độ để xác định đúng cấp độ SAT phù hợp với bạn.",
      testimonialPending: true,
    },
  },
  {
    code: "THPT", slug: "luyen-thi-thpt", name: "Luyện thi THPT (A01-D01)",
    desc: "Toán, Lý, Anh, Văn bám sát SGK — bắt đầu từ hè, chia 2 học kỳ theo lịch từng trường.",
    overlay: "from-teal-400/80 to-emerald-600/85", ageGroup: "teens", section: "thieunien", format: "offline",
    audience: "Học sinh THPT cần bám sát chương trình học ở trường, muốn có lộ trình ôn luyện đồng bộ với tiến độ học kỳ thay vì học lệch pha.",
    duration: "Bắt đầu từ hè, chia 2 học kỳ theo lịch từng trường",
    commitment: "Tiến bộ về điểm số qua từng học kỳ, bám sát sách giáo khoa hiện hành.",
    hero: {
      metaTitle: "Luyện Thi THPT Quốc Gia – Toán, Lý, Tiếng Anh, Văn – Bám Sát SGK | VMG",
      metaDescription: "Luyện thi THPT Quốc gia tại VMG cho 4 môn Toán/Lý/Tiếng Anh/Văn — bám sát sách giáo khoa, cam kết tiến bộ điểm số từng học kỳ.",
      keywordsPrimary: "luyện thi thpt quốc gia",
      h1: "Luyện Thi THPT Quốc Gia — Bám Sát Sách Giáo Khoa, Cam Kết Tiến Bộ Từng Học Kỳ",
      subheadline: "4 môn Toán, Lý, Tiếng Anh, Văn — bắt đầu từ hè, chia 2 học kỳ theo đúng tiến độ trường bạn.",
      solutionParagraph: "Chương trình bắt đầu từ hè, chia thành 2 học kỳ bám sát tiến độ của từng trường, nội dung ôn luyện đi theo đúng sách giáo khoa hiện hành — giúp học sinh không bị \"lệch pha\" với chương trình học chính khóa, đồng thời cam kết tiến bộ rõ rệt về điểm số qua từng học kỳ.",
      faq: [],
      ctaFinal: "Đăng ký lộ trình ôn luyện THPT Quốc gia bám sát trường của con.",
      testimonialPending: true,
    },
  },
  {
    code: "DETHI", slug: "ngan-hang-de-thi", name: "Ngân Hàng Đề Thi",
    tag: "Luyện đề tự học",
    desc: "Ngân hàng đề thi dạng số (MOOC/Automation) - luyện đề tự học thêm ngoài giờ học chính khóa hoặc lớp offline.",
    overlay: "from-teal-500/80 to-slate-700/85", ageGroup: "teens", section: "luyenthi", format: "online",
    audience: "Học sinh cần luyện đề tự học thêm ngoài giờ học chính khóa hoặc lớp offline.",
  },
  {
    code: "EPLUS", slug: "adults-eplus", name: "Adults – ePlus",
    desc: "Tiếng Anh giao tiếp cấp tốc cho người đi làm, mỗi buổi một chủ đề thực tế.",
    overlay: "from-accent-pink/80 to-accent-pink/90", ageGroup: "adult", section: "adult", format: "hybrid",
  },
  {
    code: "FOCUS", slug: "ielts-exam-focus", name: "IELTS Exam Focus",
    tag: "Ôn luyện cấp tốc trước ngày thi",
    desc: "12 buổi ôn luyện cấp tốc, hệ thống hóa kiến thức trước ngày thi thật — không cam kết band điểm.",
    overlay: "from-brand-dark/80 to-plum/85", ageGroup: "teens", section: "luyenthi", format: "hybrid",
    audience: "Học sinh, sinh viên, người đi làm đã có nền tảng IELTS, sắp thi thật và cần ôn luyện tập trung trong thời gian ngắn.",
    duration: "12 buổi (khoảng 1 tháng)",
    commitment: "Không áp dụng cam kết band điểm — khóa ôn luyện ngắn hạn giúp hệ thống hóa kiến thức, khác với IELTS Express Online (lộ trình dài hạn, cam kết đầu ra theo từng cấp độ).",
    hero: {
      metaTitle: "IELTS Exam Focus – Ôn Luyện Cấp Tốc 12 Buổi Trước Ngày Thi | VMG",
      metaDescription: "Khóa IELTS Exam Focus tại VMG: 12 buổi ôn luyện cấp tốc, hệ thống hóa kiến thức trước ngày thi thật. Dành cho người đã có nền IELTS.",
      keywordsPrimary: "ôn luyện ielts cấp tốc trước ngày thi",
      keywordsSecondary: "luyện đề ielts, hệ thống hóa kiến thức ielts, ôn ielts ngắn hạn",
      h1: "IELTS Exam Focus — Hệ Thống Hóa Kiến Thức, Sẵn Sàng Bước Vào Phòng Thi",
      subheadline: "12 buổi ôn luyện có trọng tâm, bám sát format đề thi thật — dành cho người đã có nền nhưng chưa hệ thống hóa.",
      ctaPrimary: "Đăng ký lớp ôn luyện gần nhất",
      painParagraph: "Bạn đã học IELTS một thời gian, có nền tảng nhưng kiến thức còn rời rạc, chưa biết sắp xếp lại để bước vào phòng thi với tâm thế tốt nhất? Đây là khóa học dành riêng cho tình huống đó.",
      solutionParagraph: "Chương trình 12 buổi (khoảng 1 tháng), tập trung ôn luyện có trọng tâm, bám sát format đề thi thật, giúp học viên hệ thống hóa lại toàn bộ kiến thức đã học trước khi bước vào kỳ thi.",
      solutionCaveat: "Đây là khóa ôn luyện ngắn hạn, không đi kèm cam kết đầu ra band điểm cụ thể — khác với IELTS Express Online (khóa có lộ trình dài hạn và cam kết đầu ra theo từng cấp độ). VMG không hứa hẹn band điểm cho khóa học này để đảm bảo đúng bản chất sản phẩm.",
      nextSteps: [{ label: "IELTS Express Online", note: "Lộ trình dài hạn hơn, có cam kết đầu ra theo band điểm cụ thể" }],
      faq: [
        { q: "Tôi chưa học IELTS bao giờ, có học được khóa này không?", a: "Khóa này dành cho người đã có nền tảng. Nếu bạn mới bắt đầu, nên tham khảo IELTS Express Online để có lộ trình từ đầu." },
        { q: "Khóa học có cam kết band điểm không?", a: "Không. Đây là khóa ôn luyện ngắn hạn giúp hệ thống hóa kiến thức, không cam kết đầu ra band điểm." },
      ],
      ctaFinal: "Còn chưa đầy 1 tháng đến kỳ thi? Đăng ký ôn luyện tập trung ngay.",
      testimonialPending: true,
    },
  },
  {
    code: "BOOST", slug: "ielts-speaking-booster", name: "IELTS Speaking Booster 1.5",
    tag: "100% GVNN, tần suất 5 buổi/tuần",
    desc: "100% GVNN, tần suất 5 buổi/tuần — cam kết tăng 1.0 band Speaking cho học viên đã có nền 5.5+.",
    overlay: "from-accent-pink/80 to-brand-dark/85", ageGroup: "teens", section: "luyenthi", format: "hybrid",
    audience: "Học viên đã có band Speaking 5.5+, cần bứt phá nhanh trong thời gian ngắn, có thể sắp xếp học với tần suất cao (5 buổi/tuần).",
    duration: "5 buổi/tuần",
    teachers: "100% giáo viên nước ngoài (GVNN)",
    entryRequirement: "Band Speaking từ 5.5 trở lên",
    commitment: "Tăng 1.0 band Speaking sau khi hoàn thành đầy đủ khóa học.",
    hero: {
      metaTitle: "IELTS Speaking Booster 1.5 – 100% GVNN, Cam Kết Tăng 1.0 Band | VMG",
      metaDescription: "Khóa IELTS Speaking Booster 1.5: 100% giáo viên nước ngoài, 5 buổi/tuần, cam kết tăng 1.0 band Speaking. Yêu cầu đầu vào band 5.5.",
      keywordsPrimary: "khóa luyện speaking ielts cam kết tăng band",
      keywordsSecondary: "giáo viên nước ngoài dạy speaking, tăng band speaking nhanh",
      h1: "IELTS Speaking Booster 1.5 — 100% GVNN, Cam Kết Tăng 1.0 Band",
      subheadline: "Tần suất 5 buổi/tuần — thiết kế cho học viên cần bứt phá nhanh kỹ năng nói trong thời gian ngắn.",
      ctaPrimary: "Kiểm tra band Speaking đầu vào miễn phí",
      painParagraph: "Bạn đã có band Speaking từ 5.5 nhưng cần tăng nhanh trong thời gian ngắn, và muốn được kèm bởi giáo viên nước ngoài với tần suất học dày để không bị gián đoạn quán tính luyện tập?",
      solutionParagraph: "Khóa học chuyên sâu, chỉ tập trung vào kỹ năng Speaking, với 100% giáo viên nước ngoài đứng lớp và tần suất 5 buổi/tuần — duy trì được cường độ luyện tập liên tục thay vì rải rác 1-2 buổi/tuần như các khóa thông thường.",
      faq: [
        { q: "Band Speaking của tôi hiện tại là 5.0, có học được không?", a: "Điều kiện đầu vào của khóa là band 5.5. Nếu bạn đang ở mức 5.0, đội ngũ tư vấn sẽ đề xuất lộ trình chuẩn bị trước khi tham gia." },
        { q: "5 buổi/tuần có nặng quá không?", a: "Tần suất cao là yếu tố cốt lõi giúp duy trì quán tính luyện tập và đạt cam kết tăng 1.0 band trong thời gian ngắn — đây là điểm khác biệt chính của khóa học." },
      ],
      ctaFinal: "Kiểm tra band Speaking đầu vào miễn phí — xác nhận bạn đã sẵn sàng cho Booster 1.5 chưa.",
      testimonialPending: true,
    },
  },
  {
    code: "TOEIC", slug: "toeic", name: "TOEIC",
    desc: "[CẦN XÁC NHẬN NỘI DUNG: chương trình luyện thi TOEIC chưa có dữ liệu chi tiết]",
    overlay: "from-neutral-400/80 to-neutral-600/85", ageGroup: "adult", section: "luyenthi", format: "hybrid",
  },
  {
    code: "VSTPX", slug: "vstep-express", name: "VSTEP Express",
    desc: "Luyện thi VSTEP, không cam kết đầu ra (khác VSTEP Mastery, có cam kết đầu ra).",
    overlay: "from-slate-500/80 to-slate-700/85", ageGroup: "adult", section: "luyenthi", format: "hybrid",
  },
  {
    code: "CAMB", slug: "khao-thi-osir", name: "Khảo thí (OSIR)",
    tag: "Thi thật, thi thử tại trung tâm",
    desc: "Hội đồng thi Cambridge, IELTS và IELTS Mocktest — thi thật, thi thử, tất cả ngay tại trung tâm.",
    overlay: "from-gold-soft/85 to-gold/85", ageGroup: "kids", section: "luyenthi", format: "offline",
    audience: "Học viên đã học tại VMG hoặc nơi khác, cần địa điểm thi uy tín; học viên muốn kiểm tra thực lực bằng IELTS Mocktest trước khi thi thật.",
    hero: {
      metaTitle: "Hội Đồng Thi Cambridge & IELTS Tại VMG – Đăng Ký Thi Ngay Tại Trung Tâm | VMG",
      metaDescription: "VMG là hội đồng thi Cambridge và IELTS chuẩn quốc tế — đăng ký thi, tư vấn lịch thi, và thi thử IELTS Mocktest ngay tại trung tâm.",
      keywordsPrimary: "đăng ký thi ielts cambridge",
      keywordsSecondary: "thi thử ielts mocktest, hội đồng thi cambridge VN055",
      h1: "Khảo Thí VMG — Thi Thật, Thi Thử, Tất Cả Ngay Tại Trung Tâm",
      subheadline: "Ba dịch vụ khảo thí: Thi Cambridge, Thi IELTS, và IELTS Mocktest.",
      solutionIntro: "Ba dịch vụ khảo thí:",
      solutionPoints: [
        "Thi Cambridge — Tổ chức thi Cambridge từ Starters đến PET/KET+ theo chuẩn VN055, không cần di chuyển xa để dự thi.",
        "Thi IELTS — Hội đồng thi IELTS chuẩn quốc tế, có tư vấn lịch thi và hỗ trợ đăng ký.",
        "IELTS Mocktest — Thi thử theo chuẩn quốc tế, chấm chữa chi tiết, có feedback và tư vấn lộ trình học tiếp theo.",
      ],
      faq: [],
      ctaFinal: "Đăng ký lịch thi hoặc thi thử ngay tại VMG.",
    },
  },
  {
    code: "TTGT", slug: "tieng-trung-giao-tiep", name: "Tiếng Trung Giao Tiếp",
    desc: "Tiếng Trung giao tiếp cấp tốc, hướng đến giao tiếp công việc thực tế. [HOLD - đang pilot, chưa mở tuyển sinh]",
    overlay: "from-gold/80 to-brand-dark/85", ageGroup: "adult", section: "tieng-trung", format: "hybrid",
    published: false, // gate: chưa xác nhận GV + chưa đủ 2 tuần pilot feedback tích cực - KHÔNG chạy ads/tuyển sinh đại trà, xem CLAUDE.md §5B
  },
  {
    code: "HSK", slug: "luyen-thi-hsk", name: "Luyện thi HSK",
    desc: "Luyện đủ 4 kỹ năng thi HSK, cam kết đầu ra theo cấp độ đến HSK4. [HOLD - đang pilot, chưa mở tuyển sinh]",
    overlay: "from-gold/80 to-brand-dark/85", ageGroup: "adult", section: "tieng-trung", format: "hybrid",
    published: false, // cùng gate với Tiếng Trung Giao Tiếp
  },
  {
    code: "VTES", slug: "tesol-120h-140h", name: "TESOL 120H/140H",
    tag: "Chứng chỉ giảng dạy cho giáo viên",
    desc: "Chứng chỉ giảng dạy tiếng Anh cho giáo viên - hai lựa chọn 120H (lý thuyết) hoặc 140H (kèm thực hành giảng dạy thật).",
    overlay: "from-violet-500/80 to-plum/85", ageGroup: "adult", section: "tesol", format: "hybrid",
    audience: "Giáo viên tiếng Anh cần chứng chỉ TESOL chính thức, đặc biệt phù hợp nếu muốn có phần thực hành giảng dạy thật (chọn 140H) thay vì chỉ lý thuyết (120H).",
    hero: {
      metaTitle: "TESOL 120H & 140H – Chứng Chỉ Giảng Dạy Tiếng Anh Cho Giáo Viên | VMG",
      metaDescription: "TESOL 120H/140H tại VMG — chứng chỉ giảng dạy tiếng Anh cho giáo viên, có lựa chọn thực hành giảng dạy thật (140H).",
      keywordsPrimary: "khóa tesol cho giáo viên có kinh nghiệm",
      h1: "TESOL 120H & 140H — Chứng Chỉ Giảng Dạy Tiếng Anh, Đúng Với Trình Độ Của Bạn",
      subheadline: "Hai lựa chọn theo nhu cầu: 120H hệ thống hóa lý thuyết, hoặc 140H có thực hành giảng dạy thật.",
      solutionIntro: "Hai lựa chọn theo nhu cầu:",
      solutionPoints: [
        "TESOL 120H — Dành cho giáo viên đã có kinh nghiệm giảng dạy, cần hệ thống hóa lại + có chứng chỉ. Không có phần thực hành giảng dạy (teaching practice).",
        "TESOL 140H — Nâng cao hơn, kết hợp lý thuyết và thực hành giảng dạy thật, có feedback trực tiếp từ trainer.",
      ],
      nextSteps: [{ label: "TESOL E-PATH", note: "Nếu cần lộ trình 100% online, tự định tốc độ, chi phí tối ưu hơn" }],
      faq: [],
      ctaFinal: "Đăng ký nhận tư vấn khóa TESOL 120H/140H phù hợp với bạn.",
      testimonialPending: true,
    },
  },
  {
    code: "B2B", slug: "dao-tao-doanh-nghiep", name: "Đào tạo doanh nghiệp (B2B)",
    desc: "Tiếng Anh doanh nghiệp theo yêu cầu. [CẦN XÁC NHẬN: nội dung chương trình chi tiết]",
    overlay: "from-neutral-700/85 to-neutral-900/90", ageGroup: "b2b", section: "b2b", format: "hybrid",
  },
  {
    code: "FLEX", slug: "esl-flextrack", name: "ESL FlexTrack",
    tag: "Công sở & Ngành nghề",
    desc: "Tiếng Anh đúng với công việc bạn đang làm - Công sở (MOOC tự học) hoặc theo Ngành nghề (1-1 online).",
    overlay: "from-cyan-600/80 to-slate-800/85", ageGroup: "adult", section: "adult", format: "online",
    audience: "Người đi làm cần tiếng Anh ứng dụng ngay cho công việc cụ thể, không cần lộ trình chứng chỉ dài hạn như IELTS/TOEIC.",
    hero: {
      metaTitle: "ESL FlexTrack – Tiếng Anh Công Sở & Tiếng Anh Theo Ngành Nghề Online | VMG",
      metaDescription: "ESL FlexTrack tại VMG: tiếng Anh công sở dạng MOOC tự học, hoặc tiếng Anh theo ngành nghề học 1-1 online, xây dựng riêng theo nhu cầu.",
      keywordsPrimary: "tiếng anh công sở online tự học",
      h1: "ESL FlexTrack — Tiếng Anh Đúng Với Công Việc Bạn Đang Làm",
      subheadline: "Hai hướng học: Tiếng Anh Công Sở (MOOC tự học) hoặc Tiếng Anh Theo Ngành Nghề (1-1 online).",
      solutionIntro: "Hai hướng học:",
      solutionPoints: [
        "Tiếng Anh Công Sở — Chương trình MOOC \"Corporate English for Survival\": ngữ pháp, viết email, giao tiếp tại nơi làm việc. Có bài tập tương tác, quiz cuối khóa và chứng nhận hoàn thành.",
        "Tiếng Anh Theo Ngành Nghề — Học 1-1 online, xây dựng riêng theo từng cá nhân, đi sâu vào các niche nhỏ như Logistics (Warehouse, Procurement...) và các nhu cầu hẹp hơn theo yêu cầu học viên.",
      ],
      faq: [],
      ctaFinal: "Đăng ký nhận tư vấn lộ trình ESL FlexTrack phù hợp với công việc của bạn.",
      testimonialPending: true,
    },
  },
  {
    code: "FT15", slug: "ielts-speaking-fast-track", name: "IELTS Speaking Fast Track 1.5",
    tag: "Học nhanh, thấy kết quả rõ",
    desc: "Khóa học tăng tốc kỹ năng Speaking, thiết kế cho học viên cần cải thiện điểm nói trong thời gian ngắn.",
    overlay: "from-accent-pink/80 to-brand/85", ageGroup: "teens", section: "luyenthi", format: "hybrid",
    audience: "Học sinh THPT, sinh viên, người đi làm 18-28 tuổi, đã có band Speaking 4.5-5.5, cần bứt phá nhanh trước kỳ thi IELTS thật.",
    duration: "12 tuần – 5 buổi/tuần – 2 giờ/buổi – 120 giờ tổng",
    teachers: "100% giáo viên nước ngoài (GVNN)",
    classSize: "8-10 học viên/lớp (tối thiểu 4 để mở lớp)",
    priceList: "24.400.000đ (offline)",
    priceCurrent: "14.300.000đ (online) — Early bird 8 suất đầu mỗi lớp mở: 12.300.000đ (tiết kiệm 2.000.000đ)",
    hourlyRate: "~119.200đ/giờ",
    commitment: "Tăng 1.0-1.5 band Speaking khi tham gia đầy đủ và hoàn thành bài tập — không đạt, học lại hoàn toàn miễn phí.",
    hero: {
      metaTitle: "IELTS Speaking Fast Track 1.5 – Tăng 1.0-1.5 Band Trong 12 Tuần | VMG",
      metaDescription: "Khóa IELTS Speaking Fast Track 1.5 tại VMG: 100% GVNN, cam kết tăng 1.0-1.5 band Speaking, học lại miễn phí nếu không đạt.",
      keywordsPrimary: "luyện speaking ielts online cam kết đầu ra",
      keywordsSecondary: "tăng band IELTS Speaking nhanh, học IELTS Speaking 100% giáo viên nước ngoài, khóa IELTS Speaking 12 tuần",
      h1: "IELTS Speaking Fast Track 1.5 — Bứt Phá Band Speaking Trong 12 Tuần, Cam Kết Bằng Văn Bản",
      subheadline: "Không tăng 1.0 band? Học lại hoàn toàn miễn phí. 100% giáo viên nước ngoài đồng hành suốt 120 giờ thực chiến.",
      ctaPrimary: "Giữ suất Early Bird — Chỉ 8 suất/lớp",
      painIntro: "Nếu một trong bốn điều dưới đây đúng với bạn, vấn đề không nằm ở năng lực — mà nằm ở phương pháp luyện tập.",
      painPoints: [
        "Học IELTS Speaking nhiều năm mà band vẫn không tăng?",
        "Nói ngập ngừng, mất ý giữa chừng mỗi khi áp lực?",
        "Không biết mình đang bị trừ điểm ở tiêu chí nào trong 4 tiêu chí chấm Speaking?",
        "Đã tốn tiền học nhiều nơi, nhưng chưa nơi nào cam kết đầu ra rõ ràng?",
      ],
      solutionIntro: "Framework độc quyền 4 bước: Fluency → Structure → Performance → Band Score",
      solutionPoints: [
        "100% GVNN đứng lớp — không xen giáo viên Philippines như nhiều trung tâm khác.",
        "70% thời lượng là thực hành — speaking drills, role-play, mock test thật, không học chay lý thuyết.",
        "Feedback thật theo đúng 4 tiêu chí IELTS (Fluency & Coherence, Lexical Resource, Grammatical Range, Pronunciation) sau mỗi buổi học.",
        "Cam kết thép: Không tăng 1.0 band → học lại miễn phí.",
      ],
      nextSteps: [
        { label: "IELTS Express Online", note: "Nâng cao — nếu cần hoàn thiện đủ 4 kỹ năng" },
        { label: "Du học cùng VMP", note: "Xa hơn — sau khi đạt band 6.5+" },
      ],
      faq: [
        { q: "Band Speaking hiện tại của tôi dưới 4.5 thì có học được không?", a: "Khóa học được thiết kế cho học viên đã có nền Speaking từ 4.5 trở lên. Nếu bạn ở dưới mức này, đội ngũ tư vấn sẽ đề xuất lộ trình phù hợp hơn trước khi tham gia FT15." },
        { q: "Nếu học xong mà không tăng 1.0 band thì sao?", a: "Học lại hoàn toàn miễn phí, với điều kiện đã tham gia đầy đủ buổi học và hoàn thành bài tập theo yêu cầu." },
        { q: "Học online có đảm bảo chất lượng như offline không?", a: "Cùng một giáo viên, cùng một khung chương trình 120 giờ, cùng cam kết đầu ra — chỉ khác hình thức lớp học." },
      ],
      ctaFinal: "Chỉ 8 suất Early Bird mỗi lớp khai giảng — đăng ký tư vấn miễn phí ngay hôm nay.",
      testimonialPending: true,
    },
  },
  {
    code: "IE", slug: "ielts-express", name: "IELTS Express Online",
    tag: "Lộ trình đầy đủ 0 → IELTS",
    desc: "Lộ trình IELTS đầy đủ 7 cấp độ (IE1–IE7), đối tác chính thức IDP và British Council. Học đâu thi đó.",
    overlay: "from-brand/85 to-brand/95", ageGroup: "teens", section: "luyenthi", format: "hybrid",
    audience: "Học sinh THPT, sinh viên cần IELTS để tốt nghiệp hoặc xin học bổng (band 5.0-6.0); người đi làm 22-35 tuổi chuẩn bị du học hoặc định cư (band 6.5).",
    duration: "7 cấp độ (IE1–IE7) — mỗi cấp 3 tháng, 2 buổi/tuần, 90 phút/buổi, 36 giờ/khóa",
    teachers: "GVNN + GVVN",
    priceCurrent: "9.700.000 – 19.900.000đ/khóa 3 tháng tùy cấp độ (khóa band 6.5 cao nhất: 19.900.000đ)",
    hourlyRate: "~305.000đ/giờ (trung bình)",
    commitment: "Cam kết đầu ra từng cấp theo lộ trình — học không đạt, học lại không tính phí. Đối tác IDP + British Council – \"học đâu thi đó\".",
    hero: {
      metaTitle: "IELTS Express Online – Lộ Trình 7 Cấp Độ, Đối Tác IDP & British Council | VMG",
      metaDescription: "IELTS Express Online tại VMG: 7 cấp độ từ band 4.0 đến 6.5+, cam kết đầu ra từng cấp, đối tác IDP Platinum & British Council. Học đâu thi đó.",
      keywordsPrimary: "khóa học ielts online có lộ trình cam kết đầu ra",
      keywordsSecondary: "đối tác IDP British Council, khóa IELTS 6.5 chuẩn bị du học",
      h1: "IELTS Express Online — 7 Cấp Độ, Một Lộ Trình Rõ Ràng Đến Band Mục Tiêu",
      subheadline: "Đối tác IDP Platinum & British Council chính thức — học đâu thi đó, không lo đề lạ, không bỡ ngỡ phòng thi.",
      ctaPrimary: "Kiểm tra trình độ miễn phí — Xác định bạn đang ở cấp độ nào",
      painPoints: [
        "Thi IELTS 2-3 lần chưa đạt 6.0, không hiểu vì sao?",
        "Không biết nên bắt đầu học từ band nào cho phù hợp?",
        "Học nhiều nơi nhưng không có lộ trình rõ ràng cho mục tiêu cụ thể?",
        "Lo đề thi ở nơi luyện khác đề thi thật?",
      ],
      solutionPoints: [
        "IDP Platinum Partner + British Council — \"Học đâu thi đó\", không lo đề lạ.",
        "7 cấp độ IE1 → IE7, từ band 4.0 đến 6.5+ — biết chính xác mình đang ở đâu và cần bao lâu.",
        "Hệ sinh thái EdTech tích hợp — theo dõi tiến độ real-time, kho học liệu không giới hạn.",
        "[CẦN XÁC NHẬN: số năm đào tạo IELTS cụ thể của mảng này — khác với mốc 23 năm thành lập VMG, cần chốt lại con số đúng trước khi đăng]",
        "Cam kết đầu ra từng cấp — học không đạt, học lại không tính phí.",
      ],
      nextSteps: [
        { label: "IELTS Speaking Fast Track 1.5", note: "Bổ trợ nhanh Speaking" },
        { label: "Du học cùng VMP", note: "Xa hơn — sau khi đạt band 6.0+" },
      ],
      faq: [
        { q: "Tôi chưa biết trình độ hiện tại của mình thì bắt đầu từ cấp nào?", a: "Đội ngũ tư vấn sẽ kiểm tra trình độ đầu vào miễn phí để xếp đúng cấp độ IE1-IE7 phù hợp." },
        { q: "\"Học đâu thi đó\" nghĩa là gì?", a: "VMG là đối tác chính thức của IDP và British Council, nên format luyện tập bám sát format đề thi thật của hai đơn vị này." },
        { q: "Nếu học xong một cấp mà chưa đạt band mục tiêu thì sao?", a: "Học lại cấp đó miễn phí, không tính thêm học phí." },
      ],
      ctaFinal: "Kiểm tra trình độ miễn phí ngay hôm nay — biết chính xác bạn cần bao lâu để đạt band mục tiêu.",
      testimonialPending: true,
    },
  },
  {
    code: "VSTEP", slug: "vstep", name: "VSTEP Mastery",
    tag: "Vững nền, chắc điểm",
    desc: "Vững nền, chắc điểm — có giáo viên kèm trực tiếp, không phải tự học online. Học không đạt, học lại không tính phí.",
    overlay: "from-slate-600/85 to-slate-800/90", ageGroup: "adult", section: "luyenthi", format: "hybrid",
    audience: "Sinh viên cần bằng VSTEP để tốt nghiệp hoặc xét học bổng; người đi làm cần B1/B2 để thi công chức, bảo vệ luận văn thạc sĩ; giáo viên cần chứng chỉ theo yêu cầu Bộ GD&ĐT.",
    duration: "2-3 tháng – 2 buổi/tuần – 90 phút/buổi – 51 giờ tổng",
    teachers: "GVVN + GVNN, có giáo viên kèm trực tiếp",
    classSize: "10-15 học viên/lớp (tối thiểu 8 để mở lớp)",
    priceList: "3.500.000đ",
    priceCurrent: "3.500.000đ/học viên/khóa (không áp dụng KM thêm)",
    hourlyRate: "~68.600đ/giờ",
    commitment: "Đạt chứng chỉ VSTEP Bậc 3 (B1) hoặc Bậc 4 (B2). Đủ kiến thức cho kỳ thi VSTEP gần nhất — học không đạt, học lại không tính phí.",
    hero: {
      metaTitle: "VSTEP B1/B2 Online – Có Giáo Viên Kèm, Học Lại Miễn Phí | VMG",
      metaDescription: "Luyện thi VSTEP B1/B2 tại VMG: có giáo viên kèm trực tiếp, học không đạt được học lại miễn phí. Phù hợp deadline tốt nghiệp, thi công chức.",
      keywordsPrimary: "luyện thi vstep online có giáo viên",
      keywordsSecondary: "vstep b1 b2, chứng chỉ vstep gấp",
      h1: "VSTEP B1/B2 — Vững Nền, Chắc Điểm",
      subheadline: "Có giáo viên kèm trực tiếp — không phải tự học online. Học không đạt, học lại không tính phí.",
      ctaPrimary: "Đăng ký lớp VSTEP gần nhất",
      painPoints: [
        "Thi VSTEP nhiều lần chưa đạt, không hiểu vì sao?",
        "Học \"luyện đề\" ở nơi khác nhưng không xây nền, thi vẫn trượt?",
        "Cần bằng gấp cho deadline cứng: bảo vệ luận văn, thi công chức, ra trường?",
        "Không có thời gian học offline giờ cứng, cần linh hoạt?",
      ],
      solutionPoints: [
        "Triết lý \"Vững nền — Chắc điểm\" — không học vẹt, xây nền từ gốc.",
        "Mức giá cạnh tranh có giáo viên kèm trực tiếp.",
        "GV kèm trực tiếp — khác hoàn toàn với các nền tảng tự học online.",
        "LMS hỗ trợ ôn tập ngoài giờ không giới hạn.",
        "Lộ trình 2-3 tháng — vừa deadline tốt nghiệp, thi công chức, bảo vệ luận văn.",
      ],
      nextSteps: [
        { label: "IELTS Express Online", note: "Nâng cao — sau khi có nền B2 vững, nâng lên chứng chỉ quốc tế" },
        { label: "TESOL E-PATH", note: "Song song — nếu học viên là giáo viên" },
      ],
      faq: [
        { q: "Tôi cần VSTEP gấp cho kỳ thi tháng tới, học kịp không?", a: "Lộ trình 2-3 tháng được thiết kế để bám sát các kỳ thi VSTEP gần nhất. Liên hệ tư vấn để được xếp lớp phù hợp với deadline của bạn." },
        { q: "Nếu thi không đạt thì sao?", a: "Học lại hoàn toàn miễn phí." },
        { q: "Có sự khác biệt gì giữa VSTEP Mastery và VSTEP Express?", a: "VSTEP Mastery (khóa này) là lộ trình có cam kết đầu ra, xây nền từ đầu. VSTEP Express là khóa ngắn hạn làm quen format đề thi, không cam kết đầu ra — phù hợp người đã có nền." },
      ],
      ctaFinal: "Đăng ký ngay để kịp kỳ thi VSTEP gần nhất — có giáo viên kèm.",
      testimonialPending: true,
    },
  },
  {
    code: "GT", slug: "tieng-anh-giao-tiep", name: "Tiếng Anh Giao Tiếp",
    tag: "[TÊN SẢN PHẨM MỚI — chờ R&D duyệt]",
    desc: "Tự tin nói tiếng Anh trong 2 tháng — 50% giáo viên nước ngoài đồng hành xóa rào cản tâm lý. Tên thương mại chính thức đang chờ R&D duyệt.",
    overlay: "from-accent-pink/80 to-brand/85", ageGroup: "adult", section: "adult", format: "hybrid",
    audience: "Nhân viên công ty/nhà máy có đối tác nước ngoài; người biết ngữ pháp nhưng ngại nói, chưa từng dùng tiếng Anh thực tế; người muốn thăng tiến hoặc chuyển sang công ty nước ngoài.",
    duration: "2 tháng/khóa – 3 buổi/tuần – 90 phút/buổi – 36 giờ/khóa – 5 cấp độ (Pre-A1 đến B1+)",
    teachers: "50% GVNN + 50% GVVN",
    classSize: "8-15 học viên/lớp (tối thiểu 8 để mở lớp)",
    priceList: "6.700.000đ",
    priceCurrent: "[CẦN XÁC NHẬN GIÁ THÁNG 7 — giá KM 35% (4.355.000đ) đã hết hạn từ cuối T6/2026, chưa có giá chính thức mới để công bố]",
    commitment: "Tự tin giao tiếp tiếng Anh hàng ngày và trong môi trường công việc.",
    hero: {
      metaTitle: "[TÊN SẢN PHẨM MỚI] – Tiếng Anh Giao Tiếp Cấp Tốc, 50% Giáo Viên Nước Ngoài | VMG",
      metaDescription: "[Cần viết lại sau khi có tên thương mại + giá chính thức tháng 7]",
      keywordsPrimary: "học tiếng anh giao tiếp cho người đi làm",
      keywordsSecondary: "tiếng anh công sở giá rẻ, học tiếng anh online người đi làm",
      h1: "[TÊN SẢN PHẨM MỚI] — Tự Tin Nói Tiếng Anh Trong 2 Tháng",
      subheadline: "Biết ngữ pháp nhưng không nói được? 50% giáo viên nước ngoài đồng hành xóa rào cản tâm lý.",
      painPoints: [
        "Biết tiếng Anh nhưng mở miệng ra là tắc, ngại nói?",
        "Học tiếng Anh cả chục năm, vẫn không nói được câu hoàn chỉnh?",
        "Cần tiếng Anh để thăng tiến, đổi việc nhưng chưa biết bắt đầu từ đâu?",
        "Trung tâm quốc tế gần nhà nhưng học phí quá cao?",
      ],
      solutionPoints: [
        "22 năm kinh nghiệm — đối tác đào tạo tiếng Anh cho doanh nghiệp.",
        "50% GVNN — tỷ lệ giáo viên nước ngoài hiếm có ở phân khúc giá này.",
        "Học online linh hoạt — phù hợp người đi làm bận rộn, không cần đến trung tâm.",
        "Liên kết học lên IELTS/VSTEP sau khi tốt nghiệp.",
      ],
      nextSteps: [
        { label: "IELTS Express Online", note: "Nâng cao — khi đạt B1, muốn có chứng chỉ quốc tế" },
        { label: "VSTEP Mastery", note: "Song song — cần chứng chỉ nhanh cho công chức/thạc sĩ" },
      ],
      faq: [],
      ctaFinal: "[Cần giá chính thức trước khi hoàn thiện CTA]",
      testimonialPending: true,
    },
  },
  {
    code: "TESOL", slug: "tesol-epath", name: "TESOL E-PATH",
    tag: "Chứng chỉ giảng dạy quốc tế",
    desc: "Chứng chỉ TESOL trực tuyến, self-paced kết hợp livestream hàng tuần.",
    overlay: "from-plum/85 to-brand-dark/85", ageGroup: "adult", section: "tesol", format: "online",
    audience: "Người đã có nền tiếng Anh B1+ (IELTS 6.0+), muốn có chứng chỉ giảng dạy tiếng Anh quốc tế được công nhận, cần lịch học linh hoạt.",
    duration: "4-8 tuần (tự định tốc độ) – 1 buổi live/tuần – 2 giờ/buổi – 120 giờ tổng",
    teachers: "Trainer VMG + INTESOL",
    classSize: "15-20 học viên/buổi live",
    entryRequirement: "Tiếng Anh CEFR B1+ (tương đương IELTS 6.0+)",
    priceList: "9.900.000đ",
    priceCurrent: "7.920.000đ (KM 20%) — thêm -15% cho CBNV/đối tác giới thiệu",
    hourlyRate: "~66.000đ/giờ",
    commitment: "Chứng chỉ TESOL 120h INTESOL, kiểm định ALAP UK — giá trị vĩnh viễn.",
    hero: {
      metaTitle: "TESOL E-PATH Online – Chứng Chỉ TESOL 120h INTESOL, Kiểm Định ALAP UK | VMG",
      metaDescription: "TESOL E-PATH: chứng chỉ TESOL 120h quốc tế INTESOL, kiểm định ALAP UK, giá trị vĩnh viễn. Học 100% online, tự định tốc độ.",
      keywordsPrimary: "chứng chỉ tesol online quốc tế",
      keywordsSecondary: "khóa tesol 120h, tesol epath vmg, chứng chỉ giảng dạy tiếng anh online",
      h1: "TESOL E-PATH — Chứng Chỉ Giảng Dạy Tiếng Anh Quốc Tế, Học 100% Online",
      subheadline: "Chứng chỉ TESOL 120h INTESOL, kiểm định ALAP UK — giá trị vĩnh viễn, tự định tốc độ học theo lịch của bạn.",
      ctaPrimary: "Đăng ký nhận tư vấn lộ trình TESOL",
      painPoints: [
        "Muốn có chứng chỉ giảng dạy tiếng Anh quốc tế nhưng không có thời gian học offline giờ cố định?",
        "Cần chứng chỉ TESOL để nâng chuẩn nghề nghiệp nhưng lo chi phí quá cao?",
        "Muốn học TESOL nhưng chưa chắc trình độ tiếng Anh của mình có đủ không?",
      ],
      solutionPoints: [
        "100% Online, self-paced — LMS tự định tốc độ + livestream hàng tuần với trainer.",
        "Chứng chỉ TESOL 120h INTESOL — kiểm định ALAP UK, giá trị vĩnh viễn.",
        "Trainer VMG + INTESOL đồng hành trực tiếp qua các buổi livestream.",
        "Chi phí tối ưu nhất trong danh mục.",
      ],
      faq: [
        { q: "Chứng chỉ TESOL 120h INTESOL có được công nhận quốc tế không?", a: "Có, chứng chỉ được kiểm định bởi ALAP UK và có giá trị vĩnh viễn, không cần gia hạn." },
        { q: "Trình độ tiếng Anh của tôi có đủ để học TESOL E-PATH không?", a: "Điều kiện đầu vào là CEFR B1+ (tương đương IELTS 6.0+). Nếu chưa đạt mức này, đội ngũ tư vấn sẽ đề xuất lộ trình chuẩn bị trước." },
        { q: "Tôi có thể vừa đi làm vừa học được không?", a: "Có, chương trình 100% online, tự định tốc độ, chỉ cố định 1 buổi livestream/tuần." },
      ],
      ctaFinal: "Đăng ký nhận tư vấn lộ trình TESOL E-PATH — chứng chỉ quốc tế, học theo lịch của bạn.",
      testimonialPending: true,
    },
  },
  {
    code: "EDU", slug: "edunext", name: "EduNext",
    tag: "Dành cho giáo viên bộ môn",
    desc: "Tiếng Anh chuyên biệt cho giáo viên bộ môn (không phải giáo viên tiếng Anh).",
    overlay: "from-emerald-500/80 to-teal-700/85", ageGroup: "adult", section: "adult", format: "hybrid",
    audience: "Giáo viên bộ môn cần tiếng Anh chuyên môn để giảng dạy song ngữ/quốc tế.",
    duration: "2–3 tháng tự học (bản online)",
    teachers: "Online 100% (bản online)",
    priceList: "9.900.000đ",
    priceCurrent: "7.920.000đ (KM 20%)",
    commitment: "[CẦN XÁC NHẬN: sản phẩm còn đang hoàn thiện, chưa có 5 học viên thật/testimonial]",
  },
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function isPublished(p: Product): boolean {
  return p.published !== false;
}

export const FORMAT_LABEL: Record<ProductFormat, string> = {
  online: "Online",
  offline: "Offline",
  hybrid: "Online & Offline",
};

// One entry per NgoaiNguSection value - shared by /ngoai-ngu and /hoc-online so
// both pages group and filter identically. Order matches the sitemap (2.1-2.5).
export const NGOAI_NGU_GROUPS: { title: string; note?: string; section: NgoaiNguSection }[] = [
  { title: "Mầm non (3-5 tuổi)", section: "mamnon" },
  { title: "Thiếu nhi (6-11 tuổi)", section: "thieunhi" },
  { title: "Thiếu niên (12-16 tuổi)", section: "thieunien" },
  { title: "Giao tiếp người lớn", section: "adult" },
  { title: "Luyện thi & chứng chỉ", note: "IELTS, TOEIC, VSTEP, Cambridge", section: "luyenthi" },
  { title: "Tiếng Trung", section: "tieng-trung" },
  { title: "VMG TESOL", section: "tesol" },
  {
    title: "Đào tạo doanh nghiệp",
    note: "Chương trình tiếng Anh cho doanh nghiệp - để lại thông tin tại trang Trường học & Doanh nghiệp để được tư vấn.",
    section: "b2b",
  },
];
