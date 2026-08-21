export type JourneyStep = {
  title: string;
  description: string;
};

export type PageFaq = {
  q: string;
  a: string;
};

export type ProductPageContent = {
  metaTitle: string;
  metaDescription: string;
  hook: string;
  subheadline: string;
  ctaPrimary: string;
  introTitle: string;
  intro: string;
  suitableFor: string[];
  outcomes: string[];
  journeyTitle?: string;
  journey: JourneyStep[];
  highlights: string[];
  startSteps: JourneyStep[];
  faq: PageFaq[];
  ctaFinal: string;
  notice?: string;
};

// Conversion copy for every public learning-product page. Factual claims are
// limited to AGENTS.md/CLAUDE.md and information published by VMG. Missing
// prices, schedules, teacher profiles and testimonials are intentionally not
// filled with plausible-sounding data.
export const PRODUCT_PAGE_CONTENT: Record<string, ProductPageContent> = {
  "kindy-e-pioneer": {
    metaTitle: "Tiếng Anh Mầm Non E-Pioneer Cho Trẻ 3–5 Tuổi | VMG",
    metaDescription: "E-Pioneer giúp trẻ 3–5 tuổi làm quen tiếng Anh tự nhiên qua hoạt động phù hợp lứa tuổi. Đăng ký tư vấn và trải nghiệm chương trình tại VMG.",
    hook: "Đừng để bài học tiếng Anh đầu tiên của con bắt đầu bằng áp lực.",
    subheadline: "E-Pioneer tạo một khởi đầu nhẹ nhàng để trẻ 3–5 tuổi nghe, phản xạ và yêu thích tiếng Anh theo đúng nhịp phát triển của mình.",
    ctaPrimary: "Đăng ký tư vấn cho con",
    introTitle: "Một nền tảng tốt bắt đầu từ cảm giác muốn học",
    intro: "Ở tuổi mầm non, điều quan trọng không phải là học thật nhiều, mà là giúp trẻ thấy tiếng Anh gần gũi. E-Pioneer đưa ngôn ngữ vào hoạt động, tương tác và tình huống phù hợp lứa tuổi để con hình thành phản xạ mà không bị thúc ép học thuật sớm.",
    suitableFor: [
      "Trẻ 3–5 tuổi bắt đầu làm quen với tiếng Anh.",
      "Trẻ còn rụt rè, cần môi trường khuyến khích tương tác từng bước.",
      "Phụ huynh muốn con xây nền nghe – nói và thói quen học tích cực.",
    ],
    outcomes: [
      "Nghe và phản hồi với hình ảnh, đồ vật hoặc chỉ dẫn tiếng Anh tương ứng.",
      "Nhận biết, phát âm và sử dụng từ vựng theo các chủ đề gần gũi với trẻ.",
      "Hình thành phản xạ nghe – nói và sự sẵn sàng cho lộ trình tiếng Anh thiếu nhi.",
    ],
    journey: [
      { title: "Đánh giá làm quen", description: "Giáo viên quan sát phản xạ, khả năng bắt chước âm thanh và mức độ tham gia thay vì dùng bài thi học thuật." },
      { title: "E-Pioneer nền tảng", description: "Đi qua hệ thống 12 cấp độ với chủ đề từ bản thân, gia đình và đồ vật đến thế giới xung quanh." },
      { title: "Nghe – nói qua hoạt động", description: "Luyện hiểu chỉ dẫn, trả lời câu hỏi cơ bản, gọi tên và miêu tả trong trò chơi có hướng dẫn." },
      { title: "Đánh giá & chuyển tiếp", description: "Giáo viên đánh giá tiến bộ qua quan sát để tư vấn cấp tiếp theo phù hợp." },
    ],
    highlights: [
      "12 cấp độ E-Pioneer, phát triển tuần tự thay vì học theo chủ đề rời rạc.",
      "70% giáo viên Việt Nam + 30% giáo viên nước ngoài theo Product Brief R&D.",
      "Đánh giá qua phản xạ tự nhiên, thái độ tham gia và khả năng bắt chước âm thanh; không ép trẻ vào chuẩn CEFR quá sớm.",
    ],
    startSteps: [
      { title: "Để lại thông tin", description: "Cho VMG biết tuổi và trải nghiệm tiếng Anh hiện tại của con." },
      { title: "Nhận tư vấn", description: "Tư vấn viên trao đổi lớp và lịch học phù hợp tại trung tâm." },
      { title: "Bắt đầu trải nghiệm", description: "Phụ huynh đưa con làm quen môi trường trước khi chọn lộ trình." },
    ],
    faq: [
      { q: "Con chưa từng học tiếng Anh có theo được không?", a: "Có. Chương trình hướng đến trẻ bắt đầu làm quen. VMG sẽ tư vấn lớp dựa trên độ tuổi và khả năng tương tác hiện tại của con." },
      { q: "Chương trình có nặng học thuật không?", a: "E-Pioneer ưu tiên hoạt động phù hợp lứa tuổi và trải nghiệm ngôn ngữ tự nhiên, không tạo áp lực học thuật sớm." },
      { q: "Lịch học và học phí thế nào?", a: "Lịch và chính sách hiện hành phụ thuộc lớp tại từng trung tâm. Để lại thông tin để VMG tư vấn chính xác." },
    ],
    ctaFinal: "Cho con một khởi đầu tiếng Anh nhẹ nhàng — đăng ký nhận tư vấn E-Pioneer.",
  },

  "kids-e-contender-genius": {
    metaTitle: "Tiếng Anh Thiếu Nhi Chuẩn Cambridge | E-Contender & E-Genius VMG",
    metaDescription: "Lộ trình tiếng Anh thiếu nhi 6–11 tuổi theo chuẩn Cambridge Starters, Movers, Flyers. Kiểm tra trình độ và nhận tư vấn tại VMG.",
    hook: "Con không chỉ cần học thêm từ vựng — con cần biết mình đang tiến đến đâu.",
    subheadline: "E-Contender & E-Genius xây năng lực tiếng Anh 6–11 tuổi theo lộ trình Cambridge Starters, Movers và Flyers với đầu ra theo từng cấp độ.",
    ctaPrimary: "Kiểm tra trình độ cho con",
    introTitle: "Lộ trình có đích đến rõ ràng cho từng giai đoạn tiểu học",
    intro: "E-Contender xây nền cho giai đoạn đầu tiểu học; E-Genius tiếp nối theo ba chặng Starters, Movers và Flyers. Trẻ phát triển bốn kỹ năng, tư duy STEAM/critical thinking và luyện nói qua bài tập trong sách, hoạt động trực tuyến và LMS.",
    suitableFor: [
      "Học sinh 6–11 tuổi cần một lộ trình tiếng Anh dài hạn.",
      "Trẻ muốn hướng đến Starters, Movers hoặc Flyers.",
      "Phụ huynh cần mục tiêu đầu ra rõ ràng theo từng cấp độ.",
    ],
    outcomes: [
      "Phát triển đồng đều nghe, nói, đọc và viết theo cấp độ phù hợp.",
      "Làm quen dạng bài và yêu cầu của Cambridge theo lộ trình.",
      "Tăng sự tự tin khi sử dụng tiếng Anh trong học tập và giao tiếp.",
    ],
    journey: [
      { title: "Kiểm tra đầu vào", description: "Xác định E-Contender hay E-Genius và cấp độ phù hợp, tránh học lại hoặc học quá sức." },
      { title: "E-Contender", description: "Bốn cấp độ xây nền nghe, nói, phonics, đọc và viết để sẵn sàng tiếp cận Cambridge Starters." },
      { title: "E-Genius", description: "Ba chặng Starters, Movers và Flyers; mỗi chặng gồm bốn cấp độ phát triển bốn kỹ năng." },
      { title: "Đánh giá & chuyển cấp", description: "Đối chiếu đầu ra, tư vấn thi Cambridge và chặng học tiếp theo." },
    ],
    highlights: [
      "36 giờ/cấp độ; 50% giáo viên Việt Nam + 50% giáo viên nước ngoài.",
      "VMG là đối tác khảo thí ủy quyền Cambridge Assessment English, mã VN055.",
      "Lộ trình E-Contender → E-Genius Starters/Movers/Flyers với đầu ra theo từng cấp Cambridge.",
    ],
    startSteps: [
      { title: "Đăng ký kiểm tra", description: "Cung cấp độ tuổi và lịch sử học tiếng Anh của con." },
      { title: "Nhận kết quả tư vấn", description: "VMG đề xuất cấp độ và mục tiêu Cambridge phù hợp." },
      { title: "Chọn lớp", description: "Phụ huynh nhận lịch học, học phí và chính sách đầu ra hiện hành trước khi đăng ký." },
    ],
    faq: [
      { q: "Con nên bắt đầu từ Starters, Movers hay Flyers?", a: "Cần dựa trên kết quả kiểm tra đầu vào, không chỉ dựa vào tuổi. VMG sẽ đề xuất cấp phù hợp sau đánh giá." },
      { q: "Con có thể thi Cambridge tại VMG không?", a: "Có. VMG là đối tác khảo thí ủy quyền Cambridge Assessment English, mã trung tâm VN055." },
      { q: "Cam kết đầu ra áp dụng thế nào?", a: "Cam kết gắn với từng cấp độ và điều kiện học tập cụ thể. Tư vấn viên sẽ cung cấp chính sách bằng văn bản của lớp trước khi đăng ký." },
    ],
    ctaFinal: "Biết đúng trình độ để chọn đúng lộ trình — đăng ký kiểm tra cho con.",
  },

  "summer-school": {
    metaTitle: "Summer School VMG – Bán Trú Hè Cho Học Sinh Tiểu Học",
    metaDescription: "Bán trú hè VMG cho học sinh tiểu học: học tiếng Anh qua trải nghiệm, chủ đề mới mỗi năm và dã ngoại hằng tuần. Đăng ký nhận lịch chương trình.",
    hook: "Một mùa hè đáng nhớ không nên chỉ trôi qua trước màn hình.",
    subheadline: "Mỗi tuần một nghề nghiệp, mỗi chặng một sản phẩm trải nghiệm — con học tiếng Anh bằng cách nhập vai, làm dự án và khám phá thế giới thật.",
    ctaPrimary: "Nhận lịch Summer School",
    introTitle: "Ba mẹ yên tâm đi làm, con có mùa hè thật sự có giá trị",
    intro: "Summer School được làm mới chủ đề theo từng năm. Với concept “One Week – One Job”, tiếng Anh được đưa vào bối cảnh nghề nghiệp, hoạt động dự án và trải nghiệm ngoài lớp để trẻ học bằng cách thực sự làm.",
    suitableFor: [
      "Học sinh tiểu học cần môi trường bán trú trong kỳ nghỉ hè.",
      "Trẻ thích khám phá, vận động và học qua trải nghiệm.",
      "Phụ huynh muốn con duy trì tiếng Anh và kỹ năng trong mùa hè.",
    ],
    outcomes: [
      "Duy trì phản xạ tiếng Anh qua bối cảnh thực tế.",
      "Tăng sự tự tin, khả năng hợp tác và chủ động tham gia hoạt động.",
      "Có một nhịp sinh hoạt hè cân bằng giữa học tập và trải nghiệm.",
    ],
    journeyTitle: "Một tuần học được tổ chức như thế nào?",
    journey: [
      { title: "Explore – Khám phá nghề", description: "Làm quen từ vựng, công cụ, tình huống và vai trò nghề nghiệp của tuần." },
      { title: "Innovate – Làm dự án", description: "Nhập vai, làm việc nhóm, giải quyết vấn đề và tạo sản phẩm học tập bằng tiếng Anh." },
      { title: "Connect – Kết nối thực tế", description: "Tham gia outdoor activity hoặc field trip theo kế hoạch của tuần." },
      { title: "Reflect – Nhìn lại", description: "Chia sẻ điều đã học, sản phẩm đã làm và kỹ năng con vừa phát triển." },
    ],
    highlights: [
      "“One Week – One Job”: học tiếng Anh qua một bối cảnh nghề nghiệp mới mỗi tuần.",
      "100% giáo viên nước ngoài phụ trách nội dung tiếng Anh chính; nhóm 10–15 học sinh.",
      "Lộ trình bán trú 4–8 tuần, kết hợp tiếng Anh, dự án, kỹ năng xã hội và dã ngoại hằng tuần.",
    ],
    startSteps: [
      { title: "Đăng ký nhận thông tin", description: "Cho VMG biết tuổi của con và trung tâm thuận tiện." },
      { title: "Nhận lịch chi tiết", description: "VMG gửi chủ đề, thời khóa biểu, chính sách chăm sóc và học phí mùa hiện hành." },
      { title: "Giữ chỗ", description: "Phụ huynh xác nhận tuần học phù hợp sau khi đã xem đầy đủ thông tin." },
    ],
    faq: [
      { q: "Summer School dành cho độ tuổi nào?", a: "Chương trình dành cho học sinh tiểu học. VMG sẽ tư vấn nhóm phù hợp theo tuổi của con." },
      { q: "Chủ đề có giống nhau mỗi năm không?", a: "Không. Chủ đề được làm mới theo từng năm; lịch và nội dung mùa hiện hành sẽ được gửi khi phụ huynh đăng ký tư vấn." },
      { q: "Dã ngoại được tổ chức khi nào?", a: "Chương trình có hoạt động dã ngoại hằng tuần. Địa điểm và lịch cụ thể cần đối chiếu kế hoạch của mùa hiện hành trước khi đăng ký." },
    ],
    ctaFinal: "Mùa hè của con cần một kế hoạch tốt — nhận lịch Summer School hiện hành từ VMG.",
  },

  "nextgen-ielts": {
    metaTitle: "NextGen IELTS Cho Học Sinh THCS – Lộ Trình Đến 5.5/6.5 | VMG",
    metaDescription: "NextGen IELTS dành cho học sinh 12–16 tuổi, xây nền từ THCS và hướng đến IELTS 5.5 hoặc 6.5 theo lộ trình. Đăng ký kiểm tra đầu vào.",
    hook: "Đừng đợi đến lớp 11 mới bắt đầu chạy đua với IELTS.",
    subheadline: "NextGen IELTS giúp học sinh THCS xây nền từng bước, hướng đến mốc IELTS 5.5 hoặc 6.5 mà không phải dồn toàn bộ áp lực vào năm cuối.",
    ctaPrimary: "Xây lộ trình IELTS cho con",
    introTitle: "Bắt đầu sớm để đi chắc, không phải học vội",
    intro: "Lộ trình dài hạn kết nối tiếng Anh thiếu niên với năng lực học thuật và kỹ năng làm bài IELTS. Học sinh làm bài kiểm tra đủ bốn kỹ năng, được xếp vào chặng phù hợp và theo dõi tiến độ qua hệ thống EMS/LMS.",
    suitableFor: [
      "Học sinh 12–16 tuổi có định hướng IELTS từ sớm.",
      "Học sinh cần xây nền trước khi bước vào giai đoạn luyện đề.",
      "Phụ huynh muốn phân bổ mục tiêu IELTS hợp lý đến lớp 11.",
    ],
    outcomes: [
      "Củng cố nền tảng ngôn ngữ và kỹ năng học thuật theo từng chặng.",
      "Làm quen dần với yêu cầu của bốn kỹ năng IELTS.",
      "Hướng đến đầu ra IELTS 5.5 hoặc 6.5 theo lộ trình đăng ký.",
    ],
    journey: [
      { title: "Placement Test 4 kỹ năng", description: "Xác định năng lực Nghe, Nói, Đọc, Viết và mốc mục tiêu phù hợp." },
      { title: "IELTS Onset", description: "Xây nền Pre-A2 đến A2 trước khi chuyển sang tiếng Anh học thuật." },
      { title: "IELTS Premier", description: "Củng cố nền Pre-B1 và khả năng xử lý nhiệm vụ dài hơn." },
      { title: "IELTS Milestone", description: "Phát triển tuần tự từ B1/B2 lên các chặng cao hơn theo mục tiêu và năng lực." },
      { title: "Coaching & chuẩn bị thi", description: "Luyện tập có trọng tâm, theo dõi tiến độ và chuẩn bị tâm lý/format cho kỳ thi." },
    ],
    highlights: [
      "Lộ trình dài hạn Onset → Premier → Milestone, từ THCS đến lớp 11.",
      "75% giáo viên Việt Nam + 25% giáo viên nước ngoài; kiểm tra đầu vào đủ bốn kỹ năng.",
      "EMS/LMS giúp học sinh luyện tập và phụ huynh theo dõi tiến độ; đầu ra 5.5 hoặc 6.5 theo lộ trình đăng ký.",
    ],
    startSteps: [
      { title: "Kiểm tra đầu vào", description: "Đánh giá nền tảng thay vì xếp lớp chỉ theo tuổi." },
      { title: "Chọn mốc mục tiêu", description: "Trao đổi kế hoạch học tập, du học hoặc xét tuyển của gia đình." },
      { title: "Nhận lộ trình", description: "VMG đề xuất chặng học, hình thức và chính sách đầu ra phù hợp." },
    ],
    faq: [
      { q: "Con học THCS có quá sớm để học IELTS không?", a: "NextGen IELTS được xây theo lộ trình dài hạn: ưu tiên nền tảng trước, sau đó mới tăng dần yêu cầu học thuật và luyện thi." },
      { q: "Con nên đặt mục tiêu 5.5 hay 6.5?", a: "Mốc phù hợp phụ thuộc đầu vào, thời gian và mục đích sử dụng chứng chỉ. VMG sẽ tư vấn sau bài kiểm tra." },
      { q: "Cam kết đầu ra có điều kiện gì?", a: "Cam kết áp dụng theo lộ trình cụ thể. Gia đình cần xem đầy đủ điều kiện học tập và đánh giá trong chính sách bằng văn bản trước khi đăng ký." },
    ],
    ctaFinal: "Bắt đầu sớm hôm nay để con không phải học vội ngày mai — đăng ký kiểm tra đầu vào.",
  },

  "sat": {
    metaTitle: "Luyện Thi SAT Theo Mục Tiêu 1050–1550+ | VMG",
    metaDescription: "Luyện SAT theo 4 mục tiêu 1050, 1250, 1400 và 1550+. Kiểm tra đầu vào để chọn đúng lộ trình cho kế hoạch xét tuyển, du học và học bổng.",
    hook: "SAT không có một lộ trình chung cho mọi mục tiêu điểm.",
    subheadline: "Chọn đúng cấp độ từ đầu — 1050, 1250, 1400 hoặc 1550+ — để tập trung vào khoảng cách thật sự giữa năng lực hiện tại và hồ sơ bạn muốn xây dựng.",
    ctaPrimary: "Kiểm tra đầu vào SAT",
    introTitle: "Học theo khoảng cách điểm, không học theo cảm tính",
    intro: "Người mới bắt đầu và người nhắm điểm top cần chiến lược khác nhau. Chương trình SAT Digital tại VMG chia lộ trình theo mục tiêu, kết hợp Math, Reading & Writing, quản lý thời gian và phân tích lỗi sau mỗi bài làm.",
    suitableFor: [
      "Học sinh THPT chuẩn bị hồ sơ xét tuyển hoặc du học.",
      "Học sinh cần xác định mục tiêu SAT phù hợp với kế hoạch trường/học bổng.",
      "Người đã học SAT nhưng chưa có lộ trình tăng điểm rõ ràng.",
    ],
    outcomes: [
      "Xác định đúng cấp độ học dựa trên đầu vào và mục tiêu.",
      "Củng cố năng lực theo yêu cầu của chặng điểm đã chọn.",
      "Có kế hoạch học và luyện tập rõ ràng trước kỳ thi.",
    ],
    journey: [
      { title: "SAT 1050 – Nền tảng", description: "Dành cho học viên mới bắt đầu hoặc cần củng cố kiến thức nền." },
      { title: "SAT 1250 – Tăng tốc", description: "Dành cho học viên đã có nền và muốn tiến đến mức điểm cạnh tranh hơn." },
      { title: "SAT 1400 – Nâng cao", description: "Hướng đến hồ sơ trường top và cơ hội học bổng quốc tế." },
      { title: "SAT 1550+ – Elite", description: "Chặng mục tiêu cao, cần mentoring sát theo khoảng trống năng lực." },
    ],
    highlights: [
      "Bốn cấp theo mục tiêu: 1050, 1250, 1400 và 1550+; xếp cấp sau bài kiểm tra SAT đầu vào.",
      "Khuyến nghị tiếng Anh B1+ và nền tảng Toán lớp 9; có lựa chọn online/offline tùy lớp.",
      "Tập trung ba yếu tố tốc độ – độ chính xác – chiến lược, với mock test và phân tích lỗi xuyên suốt.",
    ],
    startSteps: [
      { title: "Kiểm tra đầu vào", description: "Xác định điểm xuất phát và phần kiến thức cần ưu tiên." },
      { title: "Đối chiếu mục tiêu", description: "Làm rõ trường, thời gian thi và mức điểm mong muốn." },
      { title: "Chọn lộ trình", description: "Nhận đề xuất cấp độ, lịch học và học phí hiện hành." },
    ],
    faq: [
      { q: "Tôi chưa từng học SAT thì bắt đầu ở đâu?", a: "Hãy làm kiểm tra đầu vào. SAT 1050 là chặng nền tảng, nhưng lớp phù hợp vẫn cần dựa trên kết quả thực tế." },
      { q: "VMG có cam kết đạt đúng điểm mục tiêu không?", a: "Hồ sơ xác nhận hiện chưa có cam kết điểm SAT cụ thể. Chương trình phân cấp theo mục tiêu; kết quả còn phụ thuộc đầu vào và mức độ hoàn thành kế hoạch học." },
      { q: "Nên thi SAT khi nào?", a: "Thời điểm phụ thuộc kế hoạch nộp hồ sơ và năng lực hiện tại. Tư vấn viên sẽ giúp bạn xây mốc học – thi phù hợp." },
    ],
    ctaFinal: "Một bài kiểm tra đầu vào tốt có thể giúp bạn tránh chọn sai cả lộ trình — đăng ký ngay.",
  },

  "luyen-thi-thpt": {
    metaTitle: "Luyện Thi THPT Toán, Lý, Anh, Văn Bám Sát Chương Trình | VMG",
    metaDescription: "Luyện thi THPT các môn Toán, Lý, Tiếng Anh, Ngữ văn; bắt đầu từ hè và bám sát tiến độ học kỳ tại trường. Nhận tư vấn lộ trình.",
    hook: "Ôn thi hiệu quả không phải học thật nhiều — mà là học đúng nhịp với trường.",
    subheadline: "Lộ trình Toán, Lý, Tiếng Anh và Ngữ văn bắt đầu từ hè, chia theo hai học kỳ để học sinh củng cố kiến thức đúng thời điểm.",
    ctaPrimary: "Nhận tư vấn môn học",
    introTitle: "Không học lệch pha, không đợi mất gốc mới bù",
    intro: "Chương trình bám sát sách giáo khoa và tiến độ từng trường. Học sinh có thời gian củng cố kiến thức trong hè, theo kịp hai học kỳ và chuẩn bị dần cho mục tiêu thi.",
    suitableFor: [
      "Học sinh THPT cần củng cố Toán, Lý, Tiếng Anh hoặc Ngữ văn.",
      "Học sinh muốn ôn theo tiến độ học chính khóa.",
      "Gia đình cần một lộ trình xuyên suốt từ hè qua hai học kỳ.",
    ],
    outcomes: [
      "Củng cố phần kiến thức nền cần thiết trước năm học.",
      "Theo sát nội dung trọng tâm của từng học kỳ.",
      "Hình thành nhịp ôn tập ổn định thay vì dồn vào sát kỳ thi.",
    ],
    journey: [
      { title: "Chặng hè", description: "Rà soát nền tảng và chuẩn bị kiến thức cho năm học mới." },
      { title: "Học kỳ I", description: "Bám sát tiến độ tại trường, củng cố phần còn yếu." },
      { title: "Học kỳ II", description: "Tiếp tục hệ thống kiến thức và tăng cường luyện tập." },
      { title: "Ôn mục tiêu", description: "Tổng hợp phần trọng tâm theo kế hoạch thi của học sinh." },
    ],
    highlights: [
      "Bốn môn: Toán, Lý, Tiếng Anh và Ngữ văn.",
      "Bám sát sách giáo khoa hiện hành.",
      "Lộ trình bắt đầu từ hè và chia theo hai học kỳ.",
    ],
    startSteps: [
      { title: "Chọn môn cần hỗ trợ", description: "Cho VMG biết lớp, trường và vấn đề học sinh đang gặp." },
      { title: "Trao đổi mục tiêu", description: "Xác định nhu cầu củng cố, cải thiện điểm hay ôn thi." },
      { title: "Nhận lịch phù hợp", description: "VMG tư vấn lớp theo tiến độ và lịch học hiện hành." },
    ],
    faq: [
      { q: "Có thể chỉ đăng ký một môn không?", a: "Có thể trao đổi nhu cầu theo từng môn. Lớp mở và lịch cụ thể phụ thuộc kế hoạch tuyển sinh hiện hành." },
      { q: "Chương trình có bám sát trường của con không?", a: "Định hướng chương trình là bám sát sách giáo khoa và tiến độ từng trường; phụ huynh nên cung cấp trường/lớp khi đăng ký tư vấn." },
      { q: "Có cam kết điểm số cụ thể không?", a: "Hồ sơ hiện chỉ xác nhận định hướng tiến bộ theo học kỳ, không có một mức điểm chung cho mọi học sinh." },
    ],
    ctaFinal: "Cho VMG biết môn con đang vướng — nhận lộ trình phù hợp với năm học hiện tại.",
  },

  "ngan-hang-de-thi": {
    metaTitle: "Ngân Hàng Đề Thi Online – Luyện Đề Chủ Động | VMG",
    metaDescription: "Ngân hàng đề thi dạng số hỗ trợ học sinh luyện đề ngoài giờ học chính khóa hoặc lớp offline. Đăng ký nhận thông tin sản phẩm từ VMG.",
    hook: "Biết bài nhưng thiếu luyện tập vẫn dễ mất điểm khi vào phòng thi.",
    subheadline: "Ngân hàng đề thi dạng số giúp học sinh chủ động luyện thêm ngoài giờ học chính khóa hoặc lớp offline.",
    ctaPrimary: "Nhận thông tin truy cập",
    introTitle: "Biến thời gian tự học thành những lượt luyện có mục tiêu",
    intro: "Sản phẩm được thiết kế như một công cụ bổ trợ, không thay thế lớp học chính. Học sinh có thể chủ động chọn thời gian luyện đề và dùng kết quả để nhận biết phần kiến thức cần ôn lại.",
    suitableFor: [
      "Học sinh cần luyện thêm ngoài giờ học trên lớp.",
      "Người muốn duy trì nhịp làm đề trước kỳ kiểm tra.",
      "Học viên đang học offline và cần thêm tài nguyên luyện tập số.",
    ],
    outcomes: [
      "Tăng số lần thực hành với đề trong thời gian tự học.",
      "Nhận biết phần kiến thức còn yếu sau mỗi lượt luyện.",
      "Chủ động sắp xếp việc ôn tập theo lịch cá nhân.",
    ],
    journey: [
      { title: "Chọn mục tiêu", description: "Xác định môn hoặc nội dung cần ưu tiên luyện tập." },
      { title: "Làm đề", description: "Thực hành trên hệ thống theo thời gian tự học." },
      { title: "Xem lại", description: "Đối chiếu kết quả để nhận biết phần cần củng cố." },
      { title: "Luyện tiếp", description: "Quay lại kiến thức yếu và tiếp tục luyện theo kế hoạch." },
    ],
    highlights: [
      "Hình thức học số, chủ động thời gian.",
      "Phù hợp làm công cụ bổ trợ cho lớp chính khóa hoặc lớp offline.",
      "Sản phẩm đang ở giai đoạn giới thiệu; phạm vi đề cần xác nhận khi tư vấn.",
    ],
    startSteps: [
      { title: "Để lại nhu cầu", description: "Cho VMG biết môn, khối lớp và mục tiêu luyện đề." },
      { title: "Xác nhận phạm vi", description: "VMG kiểm tra nội dung hiện có phù hợp với nhu cầu hay không." },
      { title: "Nhận hướng dẫn", description: "Nhận thông tin truy cập và cách sử dụng khi sản phẩm phù hợp." },
    ],
    faq: [
      { q: "Ngân hàng đề có những môn nào?", a: "[CẦN XÁC NHẬN NỘI DUNG THẬT: danh sách môn và phạm vi đề hiện có]. Vui lòng để lại nhu cầu để VMG kiểm tra trước khi đăng ký." },
      { q: "Sản phẩm có thay thế khóa học với giáo viên không?", a: "Không. Đây là công cụ luyện đề tự học bổ trợ ngoài giờ." },
    ],
    ctaFinal: "Cho VMG biết môn và khối lớp bạn cần — nhận thông tin đúng phạm vi đề hiện có.",
  },

  "ielts-exam-focus": {
    metaTitle: "IELTS Exam Focus – Ôn Thi IELTS Cấp Tốc 12 Buổi | VMG",
    metaDescription: "IELTS Exam Focus gồm 12 buổi ôn luyện có trọng tâm cho người đã có nền và sắp thi thật. Không cam kết band điểm. Đăng ký tư vấn lớp gần nhất.",
    hook: "Càng gần ngày thi, học thêm lan man càng dễ mất phương hướng.",
    subheadline: "12 buổi hệ thống hóa kiến thức và luyện tập có trọng tâm cho người đã có nền IELTS, cần sẵn sàng trước kỳ thi thật.",
    ctaPrimary: "Tư vấn lớp ôn gần nhất",
    introTitle: "Một chặng nước rút đúng trọng tâm",
    intro: "IELTS Exam Focus không phải khóa xây nền từ đầu. Trong 12 buổi, mỗi buổi 3 giờ, học viên rà soát format bốn kỹ năng, luyện chiến thuật và tiếp tục củng cố qua mô hình Before Class – After Class cùng hệ thống LMS.",
    suitableFor: [
      "Người đã học IELTS và chuẩn bị thi thật.",
      "Học viên có kiến thức nhưng còn rời rạc, thiếu hệ thống.",
      "Người cần một chặng ôn ngắn hạn thay vì học lại từ đầu.",
    ],
    outcomes: [
      "Hệ thống lại phần kiến thức và dạng bài trọng tâm.",
      "Củng cố chiến thuật làm bài trước kỳ thi.",
      "Nhận biết điểm yếu cần ưu tiên trong thời gian còn lại.",
    ],
    journey: [
      { title: "Placement Test 4 kỹ năng", description: "Xác nhận học viên đã có nền và xác định nhóm dạng bài còn yếu." },
      { title: "Before Class", description: "Chuẩn bị nội dung trước buổi học để thời gian trên lớp tập trung vào phần cần hướng dẫn." },
      { title: "Practice in Class", description: "Luyện format, quản lý thời gian, phân tích bẫy và cách xử lý đề trong điều kiện có áp lực." },
      { title: "After Class trên LMS", description: "Làm homework bám sát buổi học để duy trì phản xạ và chốt kế hoạch ôn trước ngày thi." },
    ],
    highlights: [
      "12 buổi × 3 giờ, hai hướng Exam Focus 1 và Exam Focus 2 theo năng lực đầu vào.",
      "Before Class – After Class kết hợp LMS để tăng thời lượng luyện đề ngoài lớp.",
      "Phù hợp người đã có nền; không cam kết band điểm vì đây là khóa ôn ngắn hạn.",
    ],
    startSteps: [
      { title: "Gửi ngày thi", description: "Cho VMG biết lịch thi dự kiến và điểm gần nhất nếu có." },
      { title: "Xác nhận độ phù hợp", description: "VMG kiểm tra bạn nên học Exam Focus hay cần lộ trình dài hơn." },
      { title: "Nhận lịch lớp", description: "Chọn hình thức và lịch học còn phù hợp trước ngày thi." },
    ],
    faq: [
      { q: "Người mới bắt đầu có học được không?", a: "Không phù hợp. Đây là khóa ôn nước rút cho người đã có nền; người mới nên chọn IELTS Express." },
      { q: "Khóa học có cam kết tăng band không?", a: "Không. Chương trình chỉ cam kết đúng phạm vi ôn luyện ngắn hạn, không hứa một mức band cụ thể." },
      { q: "Tôi sắp thi, còn kịp học không?", a: "Hãy gửi ngày thi để VMG đối chiếu lịch lớp. Không nên đăng ký nếu thời gian còn lại không đủ để hoàn thành chặng học." },
    ],
    ctaFinal: "Gửi ngày thi dự kiến — VMG sẽ giúp bạn xác định Exam Focus có phải lựa chọn đúng lúc này.",
  },

  "ielts-speaking-booster": {
    metaTitle: "IELTS Speaking Booster 1.5 – Tăng 1.0 Band Speaking | VMG",
    metaDescription: "IELTS Speaking Booster dành cho học viên Speaking 5.5+, học 5 buổi/tuần với 100% giáo viên nước ngoài, cam kết tăng 1.0 band.",
    hook: "Speaking 5.5 không tự tăng chỉ bằng cách học thêm từ vựng.",
    subheadline: "Luyện nói tần suất cao 5 buổi/tuần với 100% giáo viên nước ngoài, dành cho học viên đã có Speaking 5.5+ và cần bứt phá 1.0 band.",
    ctaPrimary: "Kiểm tra đầu vào Speaking",
    introTitle: "Tăng chất lượng phản xạ bằng tần suất luyện đủ dày",
    intro: "Booster 1.5 tập trung riêng vào Speaking. Học viên luyện với giáo viên nước ngoài ở tần suất cao để nhận biết lỗi, điều chỉnh cách trả lời và duy trì phản xạ trước ngày thi.",
    suitableFor: [
      "Học viên có Speaking từ 5.5 trở lên.",
      "Người cần tập trung riêng vào kỹ năng Nói.",
      "Người có thể theo lịch học 5 buổi/tuần.",
    ],
    outcomes: [
      "Tăng khả năng phản xạ và phát triển câu trả lời.",
      "Nhận phản hồi trực tiếp trong quá trình luyện nói.",
      "Hướng đến tăng 1.0 band Speaking theo điều kiện cam kết của khóa.",
    ],
    journey: [
      { title: "Kiểm tra điều kiện", description: "Xác nhận đầu vào Speaking 5.5+ và khả năng theo đủ tần suất." },
      { title: "Nhận diện điểm nghẽn", description: "Xác định vấn đề về phản xạ, diễn đạt và cách phát triển ý." },
      { title: "Luyện nói cường độ cao", description: "Thực hành 5 buổi/tuần với giáo viên nước ngoài." },
      { title: "Đánh giá tiến bộ", description: "Đối chiếu năng lực sau khóa với mục tiêu cam kết." },
    ],
    highlights: [
      "100% giáo viên nước ngoài.",
      "Tần suất 5 buổi/tuần.",
      "Cam kết tăng 1.0 band Speaking cho học viên đáp ứng điều kiện đầu vào và học tập.",
    ],
    startSteps: [
      { title: "Đăng ký test Speaking", description: "Xác nhận bạn đã đạt mức đầu vào 5.5+." },
      { title: "Kiểm tra lịch học", description: "Đảm bảo bạn có thể tham gia đủ 5 buổi/tuần." },
      { title: "Nhận chính sách", description: "Đọc điều kiện cam kết bằng văn bản trước khi đăng ký." },
    ],
    faq: [
      { q: "Speaking dưới 5.5 có học được không?", a: "Không phù hợp với điều kiện đầu vào hiện tại. VMG sẽ đề xuất lộ trình xây nền trước." },
      { q: "Khóa này có luyện đủ 4 kỹ năng không?", a: "Không. Booster 1.5 chỉ tập trung vào IELTS Speaking." },
      { q: "Cam kết tăng 1.0 band áp dụng thế nào?", a: "Cam kết gắn với đầu vào và điều kiện tham gia/hoàn thành khóa. Bạn sẽ được cung cấp chính sách cụ thể trước khi đăng ký." },
    ],
    ctaFinal: "Test Speaking trước — chỉ đăng ký khi Booster 1.5 thật sự phù hợp với bạn.",
  },

  "toeic": {
    metaTitle: "Luyện Thi TOEIC Theo Mục Tiêu | VMG",
    metaDescription: "Khóa luyện thi TOEIC cho người cần chứng chỉ phục vụ học tập và công việc. Đăng ký kiểm tra đầu vào và nhận lộ trình phù hợp tại VMG.",
    hook: "Đừng bắt đầu bằng một lớp TOEIC bất kỳ khi bạn chưa biết điểm xuất phát.",
    subheadline: "Kiểm tra đầu vào, làm rõ mục tiêu chứng chỉ và nhận lộ trình TOEIC phù hợp với thời gian của bạn.",
    ctaPrimary: "Đăng ký kiểm tra TOEIC",
    introTitle: "Từ mục tiêu chứng chỉ đến kế hoạch học có thể thực hiện",
    intro: "TOEIC thường gắn với một mốc nộp hồ sơ, tốt nghiệp hoặc công việc. VMG bắt đầu từ nhu cầu thực tế và nền tảng hiện tại để tránh học quá thấp, quá cao hoặc sai trọng tâm.",
    suitableFor: [
      "Sinh viên cần TOEIC cho chuẩn đầu ra.",
      "Người đi làm cần chứng chỉ cho hồ sơ hoặc công việc.",
      "Người muốn đánh giá lại nền tảng trước khi luyện thi.",
    ],
    outcomes: [
      "Xác định rõ khoảng cách giữa đầu vào và mục tiêu.",
      "Củng cố nền tảng và kỹ năng làm bài theo lộ trình được tư vấn.",
      "Có kế hoạch ôn tập phù hợp với mốc thời gian sử dụng chứng chỉ.",
    ],
    journey: [
      { title: "Kiểm tra đầu vào", description: "Đánh giá năng lực hiện tại trước khi chọn lớp." },
      { title: "Củng cố nền", description: "Ôn phần kiến thức cần thiết cho mục tiêu." },
      { title: "Làm quen dạng bài", description: "Học cách tiếp cận và quản lý thời gian làm bài." },
      { title: "Luyện theo mục tiêu", description: "Tập trung phần còn yếu trước kỳ thi dự kiến." },
    ],
    highlights: [
      "Lộ trình bắt đầu từ đầu vào và mục đích sử dụng chứng chỉ.",
      "Có lựa chọn online và offline tùy lớp hiện hành.",
      "Không công bố một cam kết điểm chung khi chưa có dữ liệu xác nhận theo khóa.",
    ],
    startSteps: [
      { title: "Gửi mục tiêu", description: "Cho VMG biết mốc điểm và hạn cần chứng chỉ." },
      { title: "Kiểm tra đầu vào", description: "Đánh giá khả năng hiện tại và khoảng cách cần cải thiện." },
      { title: "Nhận đề xuất", description: "VMG tư vấn lớp, lịch và học phí hiện hành." },
    ],
    faq: [
      { q: "Khóa học kéo dài bao lâu?", a: "[CẦN XÁC NHẬN NỘI DUNG THẬT: thời lượng từng lớp TOEIC]. Thời gian phù hợp còn phụ thuộc đầu vào và mục tiêu của bạn." },
      { q: "Có cam kết điểm TOEIC không?", a: "Hiện chưa có dữ liệu xác nhận một chính sách cam kết chung cho trang này. Tư vấn viên chỉ cung cấp cam kết nếu có văn bản áp dụng cho lớp cụ thể." },
    ],
    ctaFinal: "Gửi mốc điểm và deadline của bạn — nhận lộ trình TOEIC phù hợp thay vì học theo cảm tính.",
  },

  "vstep-express": {
    metaTitle: "VSTEP Express – Ôn Format VSTEP Ngắn Hạn | VMG",
    metaDescription: "VSTEP Express dành cho người đã có nền, cần làm quen format và ôn thi ngắn hạn. Khóa không cam kết đầu ra. Nhận tư vấn lớp phù hợp.",
    hook: "Nếu đã có nền, bạn không cần học lại từ đầu — bạn cần làm quen đúng format.",
    subheadline: "VSTEP Express là chặng ôn ngắn hạn giúp người đã có nền hệ thống dạng bài và chuẩn bị cho kỳ thi, không cam kết đầu ra.",
    ctaPrimary: "Kiểm tra độ phù hợp",
    introTitle: "Khóa ôn format, không phải lộ trình xây nền",
    intro: "Điểm khác biệt cần hiểu rõ: VSTEP Express phù hợp khi bạn đã có năng lực nền và muốn làm quen kỳ thi. Trong 22,5 giờ, chương trình đi thẳng vào tốc độ, độ chính xác và cách xử lý dạng bài; nếu đang mất gốc, VSTEP Mastery phù hợp hơn.",
    suitableFor: [
      "Người đã có nền tiếng Anh và sắp thi VSTEP.",
      "Người cần làm quen cấu trúc, dạng bài và nhịp làm bài.",
      "Học viên không cần một lộ trình xây nền dài hạn.",
    ],
    outcomes: [
      "Hiểu yêu cầu và nhóm dạng bài của kỳ thi.",
      "Củng cố cách phân bổ thời gian và chiến thuật làm bài.",
      "Nhận biết phần cần tự ôn thêm trước kỳ thi.",
    ],
    journey: [
      { title: "Xác nhận nền tảng", description: "Kiểm tra bạn phù hợp Express hay cần Mastery." },
      { title: "Làm quen format B1/B2", description: "Hệ thống yêu cầu và dạng nhiệm vụ theo mục tiêu Exam Focus B1 hoặc B2." },
      { title: "Luyện tốc độ & độ chính xác", description: "Thực hành chiến thuật xử lý câu hỏi và quản lý thời gian trong 22,5 giờ học." },
      { title: "Luyện thêm trên LMS", description: "Tiếp tục làm đề ngoài giờ, xem chấm điểm và phân tích đáp án để ưu tiên phần còn yếu." },
    ],
    highlights: [
      "22,5 giờ, hai hướng Exam Focus B1 và Exam Focus B2.",
      "Placement test đủ bốn kỹ năng trước khi xếp lớp; LMS hỗ trợ luyện thêm ngoài giờ.",
      "Khóa luyện format, tốc độ và kỹ năng giải đề — không áp dụng cam kết đầu ra.",
    ],
    startSteps: [
      { title: "Gửi ngày thi", description: "Cho VMG biết kỳ thi dự kiến và mục tiêu B1/B2." },
      { title: "Đánh giá nhanh", description: "Xác nhận nền tảng của bạn có phù hợp khóa Express." },
      { title: "Nhận lịch lớp", description: "Chọn hình thức và lịch còn phù hợp trước kỳ thi." },
    ],
    faq: [
      { q: "Mất gốc có học VSTEP Express được không?", a: "Không nên. VSTEP Express không xây nền từ đầu; hãy tham khảo VSTEP Mastery." },
      { q: "Khóa có cam kết đạt B1/B2 không?", a: "Không. Đây là khóa làm quen format và ôn ngắn hạn." },
    ],
    ctaFinal: "Cho VMG biết nền tảng và ngày thi — chọn đúng Express hoặc Mastery ngay từ đầu.",
  },

  "vstep-epath": {
    metaTitle: "VSTEP E-PATH Online – Tự Học Linh Hoạt B1/B2 | VMG",
    metaDescription: "VSTEP E-PATH là lộ trình self-paced cho người từ 17 tuổi đã có nền tiếng Anh, cần ôn mục tiêu B1/B2 linh hoạt và chủ động thời gian.",
    hook: "Cần chứng chỉ VSTEP nhưng lịch học cố định luôn xung đột với công việc của bạn?",
    subheadline: "VSTEP E-PATH đưa lộ trình ôn Bậc 3–4 lên hình thức self-paced để người đã có nền có thể chủ động học theo lịch cá nhân.",
    ctaPrimary: "Kiểm tra VSTEP E-PATH có phù hợp",
    introTitle: "Một lựa chọn tự học cho người đã có nền",
    intro: "VSTEP E-PATH không phải khóa phục hồi kiến thức từ đầu. Sản phẩm dành cho người hiểu nền tảng tiếng Anh của mình, cần ôn bốn kỹ năng nhưng khó tham gia lớp có lịch cố định.",
    suitableFor: [
      "Người từ 17 tuổi cần mục tiêu VSTEP Bậc 3 hoặc Bậc 4.",
      "Học viên đã có nền tiếng Anh và có khả năng tự quản lý tiến độ.",
      "Người đi học hoặc đi làm cần một lộ trình online linh hoạt.",
    ],
    outcomes: [
      "Ôn nghe, nói, đọc và viết theo định hướng VSTEP B1/B2.",
      "Chủ động sắp xếp thời gian luyện tập theo lịch cá nhân.",
      "Nhận biết phần kiến thức cần bổ sung trước kỳ thi dự kiến.",
    ],
    journey: [
      { title: "Xác nhận nền tảng", description: "Đối chiếu năng lực hiện tại để tránh chọn tự học khi vẫn cần giáo viên xây nền." },
      { title: "Chọn mục tiêu", description: "Làm rõ nhu cầu Bậc 3 (B1) hoặc Bậc 4 (B2) và mốc thời gian sử dụng chứng chỉ." },
      { title: "Tự học 4 kỹ năng", description: "Đi qua nội dung nghe, nói, đọc, viết và cách tiếp cận dạng bài theo tiến độ cá nhân." },
      { title: "Rà soát trước kỳ thi", description: "Đối chiếu mức độ sẵn sàng và quyết định cần luyện thêm hay chuyển sang lớp có giáo viên." },
    ],
    highlights: [
      "Hình thức MOOC/self-paced, phù hợp người khó tham gia lịch lớp cố định.",
      "Hướng đến nội dung VSTEP Bậc 3–4 (B1–B2).",
      "Không public học phí và không tự diễn giải mục tiêu nội dung thành cam kết thi đậu.",
    ],
    startSteps: [
      { title: "Gửi mục tiêu", description: "Cho VMG biết bậc cần đạt, deadline và lịch học có thể sắp xếp." },
      { title: "Xác nhận độ phù hợp", description: "VMG đối chiếu E-PATH với Mastery hoặc Express dựa trên nền tảng của bạn." },
      { title: "Nhận thông tin truy cập", description: "Xem phạm vi nội dung, cách hỗ trợ và chính sách hiện hành trước khi đăng ký." },
    ],
    faq: [
      { q: "Mất gốc có nên chọn VSTEP E-PATH không?", a: "Không nên. E-PATH là hình thức tự học cho người đã có nền; VSTEP Mastery phù hợp hơn nếu cần xây lại kiến thức với giáo viên." },
      { q: "E-PATH khác Express thế nào?", a: "E-PATH là self-paced; Express là lớp ôn format ngắn hạn có lịch học. Cả hai đều phù hợp hơn với người đã có nền." },
      { q: "Khóa có cam kết thi đậu B1/B2 không?", a: "Handbook xác nhận phạm vi mục tiêu B1/B2 nhưng chưa cung cấp chính sách cam kết thi đậu. Website không công bố một cam kết chưa có văn bản áp dụng." },
    ],
    ctaFinal: "Gửi nền tảng và deadline — VMG giúp bạn chọn E-PATH, Express hay Mastery đúng ngay từ đầu.",
  },

  "tesol-120h-140h": {
    metaTitle: "VMG TESOL 120H & 140H – Lý Thuyết Và Thực Hành Giảng Dạy",
    metaDescription: "TESOL Essential 120H và TESOL Mastery 140H tại VMG. Chọn lộ trình hệ thống hóa kiến thức hoặc tăng cường thực hành có phản hồi.",
    hook: "Một chứng chỉ tốt nên giúp bạn dạy tốt hơn, không chỉ thêm một dòng vào CV.",
    subheadline: "Chọn TESOL Essential 120H để hệ thống nền tảng hoặc TESOL Mastery 140H để đi sâu vào thực hành giảng dạy và phản hồi từ trainer.",
    ctaPrimary: "Tư vấn chọn 120H hay 140H",
    introTitle: "Hai lộ trình cho hai nhu cầu nghề nghiệp khác nhau",
    intro: "VMG TESOL kết hợp kiến thức giảng dạy với hoạt động có hướng dẫn. Bản 120H phù hợp người cần hệ thống nền tảng; bản 140H bổ sung chặng thực hành sâu hơn để chuyển kiến thức thành năng lực đứng lớp.",
    suitableFor: [
      "Giáo viên tiếng Anh muốn hệ thống hóa phương pháp và có chứng chỉ.",
      "Người có nền tiếng Anh muốn chuẩn bị cho công việc giảng dạy.",
      "Giáo viên cần thêm thực hành và phản hồi để nâng năng lực đứng lớp.",
    ],
    outcomes: [
      "Thiết kế lesson plan, phân bổ timing và tổ chức hoạt động cho bốn kỹ năng.",
      "Quản trị lớp học, xử lý tình huống sư phạm và xây sự tự tin khi đứng lớp.",
      "Với lộ trình 140H: hoàn thành 20 giờ quan sát, lập kế hoạch, teaching demo và nhận phản hồi.",
    ],
    journeyTitle: "Chọn lộ trình nào?",
    journey: [
      { title: "TESOL Essential 120H", description: "Hệ thống nền tảng; bản offline có 8 buổi trực tiếp, bài tập, bài thu hoạch và một buổi demo nhận phản hồi." },
      { title: "TESOL Mastery 140H", description: "Đi sâu hơn với 10 buổi tập trung và 20 giờ thực hành gồm quan sát lớp, lập kế hoạch, dạy demo và nhận feedback." },
      { title: "Chọn hình thức", description: "Đối chiếu nhu cầu online/offline và lịch lớp đang mở." },
      { title: "Hoàn thiện năng lực", description: "Hoàn thành học phần, bài tập và phần thực hành theo lộ trình đã chọn." },
    ],
    highlights: [
      "Yêu cầu nền tảng tiếng Anh từ CEFR B1+; nhóm 8–10 học viên theo Product Brief.",
      "Hai lộ trình INTESOL Vietnam: Essential 120H và Mastery 140H; có lựa chọn online/offline theo lớp.",
      "Lộ trình 140H có 20 giờ teaching practice và hệ thống phản hồi từ trainer.",
    ],
    startSteps: [
      { title: "Chia sẻ kinh nghiệm", description: "Cho VMG biết nền tiếng Anh và kinh nghiệm đứng lớp hiện tại." },
      { title: "Chọn lộ trình", description: "Tư vấn viên đối chiếu nhu cầu với Essential 120H hoặc Mastery 140H." },
      { title: "Nhận lịch & yêu cầu", description: "Xem lịch lớp, hình thức, học phí và tiêu chí hoàn thành trước khi đăng ký." },
    ],
    faq: [
      { q: "Khác nhau chính giữa 120H và 140H là gì?", a: "120H tập trung hệ thống nền tảng; 140H bổ sung chặng thực hành sâu hơn, gồm quan sát, lập kế hoạch, demo và phản hồi." },
      { q: "Có thể học online không?", a: "Có lựa chọn online và offline tùy lộ trình/lớp đang mở. VMG sẽ xác nhận lịch hiện hành khi tư vấn." },
      { q: "Chứng chỉ do đơn vị nào cấp?", a: "Theo Sales Handbook R&D, học viên hoàn thành nhận chứng nhận TESOL 120H hoặc 140H từ INTESOL Vietnam. Tư vấn viên sẽ cung cấp mẫu chứng nhận và điều kiện cấp trước khi đăng ký." },
    ],
    ctaFinal: "Chưa chắc chọn 120H hay 140H? Gửi kinh nghiệm hiện tại để VMG tư vấn đúng lộ trình.",
  },

  "dao-tao-doanh-nghiep": {
    metaTitle: "Đào Tạo Tiếng Anh Doanh Nghiệp Theo Nhu Cầu | VMG",
    metaDescription: "Giải pháp đào tạo tiếng Anh cho doanh nghiệp theo mục tiêu sử dụng thực tế. Đăng ký để VMG khảo sát nhu cầu và đề xuất lộ trình.",
    hook: "Doanh nghiệp không cần thêm một khóa tiếng Anh chung chung.",
    subheadline: "VMG bắt đầu từ tình huống nhân sự cần sử dụng tiếng Anh để xây giải pháp đào tạo phù hợp với mục tiêu công việc.",
    ctaPrimary: "Đăng ký khảo sát nhu cầu",
    introTitle: "Đào tạo phải gắn với công việc nhân sự đang làm",
    intro: "Nhu cầu giao tiếp, email, họp hay phối hợp với đối tác không giống nhau giữa các phòng ban. Quy trình tư vấn tập trung làm rõ đối tượng, bối cảnh sử dụng và kết quả doanh nghiệp cần theo dõi.",
    suitableFor: [
      "Doanh nghiệp cần nâng năng lực tiếng Anh cho một nhóm nhân sự.",
      "Đơn vị muốn đào tạo theo bối cảnh công việc thay vì giáo trình đại trà.",
      "Phòng nhân sự cần một đầu mối khảo sát và đề xuất chương trình.",
    ],
    outcomes: [
      "Làm rõ nhu cầu sử dụng tiếng Anh của nhóm học.",
      "Nhận đề xuất nội dung, hình thức và cách triển khai phù hợp.",
      "Có đầu mối trao đổi để theo dõi và điều chỉnh chương trình.",
    ],
    journeyTitle: "Quy trình xây chương trình doanh nghiệp",
    journey: [
      { title: "Khảo sát nhu cầu", description: "Thu thập bối cảnh, quy mô, vị trí công việc và mục tiêu đào tạo." },
      { title: "Đánh giá đầu vào", description: "Xác định chênh lệch năng lực trong nhóm học khi cần." },
      { title: "Đề xuất giải pháp", description: "Thống nhất nội dung, hình thức, lịch và tiêu chí theo dõi." },
      { title: "Triển khai & rà soát", description: "Tổ chức đào tạo và trao đổi điều chỉnh theo dữ liệu thực tế." },
    ],
    highlights: [
      "Thiết kế theo nhu cầu sử dụng thực tế của doanh nghiệp.",
      "Có thể trao đổi hình thức online, offline hoặc kết hợp.",
      "Form chỉ thu lead và chuyển đến Khối Kinh doanh phụ trách.",
    ],
    startSteps: [
      { title: "Gửi nhu cầu", description: "Cung cấp tên đơn vị, người liên hệ và mục tiêu sơ bộ." },
      { title: "Trao đổi khảo sát", description: "Đầu mối VMG liên hệ để làm rõ nhóm học và bối cảnh sử dụng." },
      { title: "Nhận đề xuất", description: "Doanh nghiệp xem phương án và thống nhất bước tiếp theo." },
    ],
    faq: [
      { q: "VMG có đào tạo theo ngành nghề không?", a: "Có thể khảo sát nội dung theo bối cảnh công việc. Phạm vi cuối cùng cần được thống nhất sau khi làm rõ nhu cầu và nguồn lực." },
      { q: "Có đào tạo tại doanh nghiệp không?", a: "Hình thức triển khai cần xác nhận theo địa điểm, quy mô và lịch của hai bên." },
      { q: "Bao lâu có đề xuất?", a: "[CẦN XÁC NHẬN NỘI DUNG THẬT: SLA phản hồi/đề xuất của Khối Kinh doanh]." },
    ],
    ctaFinal: "Cho VMG biết bài toán nhân sự của doanh nghiệp — bắt đầu từ một buổi khảo sát nhu cầu.",
  },

  "esl-flextrack": {
    metaTitle: "ESL FlexTrack – Tiếng Anh Công Sở Và Theo Ngành Nghề | VMG",
    metaDescription: "ESL FlexTrack gồm tiếng Anh công sở tự học và tiếng Anh ngành nghề 1-1 online, thiết kế theo nhu cầu công việc. Đăng ký tư vấn hướng phù hợp.",
    hook: "Tiếng Anh chỉ tạo ra giá trị khi bạn dùng được ngay trong công việc.",
    subheadline: "Chọn lộ trình công sở tự học hoặc chương trình 1-1 theo ngành nghề để tập trung đúng email, giao tiếp và tình huống bạn gặp mỗi ngày.",
    ctaPrimary: "Chọn hướng FlexTrack",
    introTitle: "Hai hướng học cho hai mức độ cá nhân hóa",
    intro: "FlexTrack không phải một tên khác của khóa giao tiếp phổ thông. Sản phẩm gồm hướng Tiếng Anh Công Sở dạng MOOC và hướng Tiếng Anh Theo Ngành Nghề học 1-1 online, tập trung vốn từ và tình huống trong Logistics, hàng không, sales, customer service hoặc nhu cầu du lịch.",
    suitableFor: [
      "Người đi làm cần tiếng Anh cho email và giao tiếp công sở.",
      "Nhân sự cần từ vựng, tình huống theo ngành hoặc vị trí cụ thể.",
      "Người muốn học online linh hoạt hoặc học 1-1 cá nhân hóa.",
    ],
    outcomes: [
      "Tiếng Anh Công Sở: củng cố grammar, email, họp, thuyết trình và giao tiếp tại nơi làm việc.",
      "Theo Ngành Nghề: tăng vốn từ, đọc hiểu tài liệu vận hành và xử lý tình huống sát vai trò công việc.",
      "Tăng phản xạ nghe – nói và sự tự tin khi phối hợp với đồng nghiệp, khách hàng hoặc đối tác.",
    ],
    journeyTitle: "Chọn nhánh học phù hợp",
    journey: [
      { title: "Tiếng Anh Công Sở", description: "MOOC tự học với bài tương tác, quiz cuối khóa và chứng nhận hoàn thành." },
      { title: "Tiếng Anh Theo Ngành Nghề", description: "Học 1-1 online, xây nội dung theo cá nhân và ngữ cảnh nghề nghiệp." },
      { title: "Xác định tình huống", description: "Liệt kê nhiệm vụ tiếng Anh bạn cần xử lý trong công việc." },
      { title: "Học & ứng dụng", description: "Tập trung nội dung có khả năng dùng ngay trong bối cảnh đã chọn." },
    ],
    highlights: [
      "Hai mô hình tách biệt: MOOC công sở và 1-1 theo ngành nghề.",
      "Học online, phù hợp lịch người đi làm.",
      "Sản phẩm đang trong giai đoạn pilot; phạm vi ngành nghề cần xác nhận trước khi đăng ký.",
    ],
    startSteps: [
      { title: "Chọn nhu cầu", description: "Công sở nền tảng hay tiếng Anh theo ngành nghề chuyên biệt." },
      { title: "Mô tả công việc", description: "Gửi vị trí, ngành và tình huống thường gặp nếu chọn 1-1." },
      { title: "Nhận đề xuất", description: "VMG xác nhận phạm vi có thể triển khai, hình thức và học phí." },
    ],
    faq: [
      { q: "FlexTrack có phải khóa Tiếng Anh Giao Tiếp không?", a: "Không. Đây là sản phẩm riêng, tập trung tiếng Anh công sở tự học hoặc nội dung 1-1 theo ngành nghề." },
      { q: "Hiện có những ngành nghề nào?", a: "Handbook xác nhận các hướng như Logistics, hàng không, sales, customer service và tiếng Anh cho du lịch. Phạm vi cuối cùng vẫn cần xác nhận theo nhu cầu cụ thể." },
      { q: "Có lớp nhóm không?", a: "Hướng ngành nghề hiện được xác nhận là 1-1 online; hướng công sở là MOOC tự học." },
    ],
    ctaFinal: "Gửi vị trí công việc và tình huống bạn cần dùng tiếng Anh — nhận tư vấn đúng nhánh FlexTrack.",
  },

  "ielts-speaking-fast-track": {
    metaTitle: "IELTS Speaking Fast Track 1.5 – Tăng 1.0–1.5 Band | VMG",
    metaDescription: "FT15: khóa IELTS Speaking 12 tuần, 120 giờ, 100% giáo viên nước ngoài; cam kết tăng 1.0–1.5 band và học lại miễn phí nếu chưa đạt điều kiện.",
    hook: "Muốn Speaking tăng band, bạn cần nói đủ nhiều — và được sửa đủ sâu.",
    subheadline: "12 tuần, 120 giờ với 100% giáo viên nước ngoài, tập trung bứt phá 1.0–1.5 band Speaking theo chính sách cam kết của khóa.",
    ctaPrimary: "Kiểm tra Speaking đầu vào",
    introTitle: "Một lộ trình tăng tốc chỉ tập trung vào kỹ năng Nói",
    intro: "FT15 dành cho học viên Speaking khoảng 4.5–5.5 và sẵn sàng theo cường độ cao. Mô hình “Speaking Gym” dành khoảng 70% thời lượng cho drills, role-play và mô phỏng thi để biến kiến thức thành phản xạ dưới áp lực thời gian.",
    suitableFor: [
      "Học viên có IELTS Speaking khoảng 4.5–5.5, muốn tập trung tăng band kỹ năng Nói.",
      "Người có thể cam kết lịch học và khối lượng luyện tập trong 12 tuần.",
      "Học viên muốn luyện hoàn toàn với giáo viên nước ngoài.",
    ],
    outcomes: [
      "Cải thiện phản xạ, cách phát triển ý và độ tự nhiên khi nói.",
      "Nhận phản hồi xuyên suốt quá trình luyện tập.",
      "Hướng đến tăng 1.0–1.5 band Speaking; chưa đạt được học lại miễn phí theo điều kiện khóa.",
    ],
    journey: [
      { title: "Kiểm tra đầu vào", description: "Xác định band hiện tại và khoảng cách đến mục tiêu." },
      { title: "Fluency", description: "Giảm ngập ngừng, xây phản xạ và duy trì tốc độ nói ổn định." },
      { title: "Structure & Language", description: "Triển khai ý cho Part 1–3, mở rộng từ vựng và cấu trúc nhưng vẫn giữ độ chính xác." },
      { title: "Performance & Band Score", description: "Mock test định kỳ, feedback theo tiêu chí IELTS và đối chiếu kết quả với điều kiện cam kết." },
    ],
    highlights: [
      "12 tuần, khoảng 5 buổi/tuần, 120 giờ; nhóm 8–10 học viên.",
      "100% giáo viên nước ngoài; khoảng 70% thời lượng dành cho speaking drills, role-play và mock test.",
      "Cam kết tăng 1.0–1.5 band; học lại miễn phí nếu chưa đạt theo điều kiện áp dụng.",
    ],
    startSteps: [
      { title: "Test Speaking", description: "Xác định mức hiện tại trước khi tư vấn FT15." },
      { title: "Đối chiếu lịch", description: "Đảm bảo bạn có thể hoàn thành cường độ học của 12 tuần." },
      { title: "Đọc cam kết", description: "Nhận đầy đủ điều kiện đầu vào, tham gia và học lại bằng văn bản." },
    ],
    faq: [
      { q: "Đầu vào nào phù hợp với FT15?", a: "Sales Handbook xác nhận FT15 được thiết kế cho học viên Speaking khoảng 4.5–5.5. Bạn vẫn cần test đầu vào trước khi xếp lớp." },
      { q: "FT15 có luyện cả 4 kỹ năng không?", a: "Không. Khóa tập trung vào IELTS Speaking." },
      { q: "Không đạt mục tiêu thì sao?", a: "Học viên được học lại miễn phí nếu đáp ứng đầy đủ điều kiện của chính sách cam kết. Vui lòng đọc văn bản áp dụng trước khi đăng ký." },
      { q: "Học phí hiện tại là bao nhiêu?", a: "Website tạm thời không công khai giá. VMG sẽ cung cấp báo giá và ưu đãi hiện hành sau khi xác nhận khóa phù hợp." },
    ],
    ctaFinal: "Bắt đầu bằng bài kiểm tra Speaking — biết rõ khoảng cách trước khi cam kết 12 tuần tăng tốc.",
  },

  "ielts-express": {
    metaTitle: "IELTS Express Online – Lộ Trình 7 Cấp Độ, Cam Kết Đầu Ra | VMG",
    metaDescription: "IELTS Express Online gồm 7 cấp độ IE1–IE7, mỗi cấp 3 tháng/36 giờ, GVNN + GVVN và cam kết đầu ra từng cấp. Kiểm tra trình độ miễn phí.",
    hook: "Bạn không thiếu tài liệu IELTS — bạn thiếu một lộ trình biết rõ mình đang ở đâu.",
    subheadline: "7 cấp độ IE1–IE7, mỗi cấp có mục tiêu rõ ràng và chính sách học lại không tính phí nếu chưa đạt đầu ra theo điều kiện.",
    ctaPrimary: "Kiểm tra trình độ miễn phí",
    introTitle: "Một lộ trình liền mạch thay cho những khóa học chắp vá",
    intro: "IELTS Express Online bắt đầu bằng placement test đủ bốn kỹ năng, sau đó xếp học viên vào đúng cấp IE. Nội dung kết hợp kỹ năng học thuật, chiến thuật bài thi và luyện tập trên hệ thống; VMG đồng hành cùng IDP, British Council và Cambridge Assessment English trong hệ sinh thái IELTS/khảo thí.",
    suitableFor: [
      "Người chưa biết nên bắt đầu IELTS ở cấp độ nào.",
      "Học sinh, sinh viên cần IELTS cho học tập hoặc hồ sơ.",
      "Người đi làm cần lộ trình online rõ ràng đến band mục tiêu.",
    ],
    outcomes: [
      "Listening: note-taking, dự đoán nội dung và bóc tách thông tin trong ngữ cảnh học thuật.",
      "Speaking, Reading & Writing: phát triển lập luận, skimming/scanning và diễn đạt học thuật theo tiêu chí IELTS.",
      "Theo dõi từng chặng 3 tháng/36 giờ; học lại cấp chưa đạt mà không tính phí theo điều kiện cam kết.",
    ],
    journey: [
      { title: "Placement Test 4 kỹ năng", description: "Đánh giá Nghe, Nói, Đọc, Viết để xác định cấp IE phù hợp." },
      { title: "Học theo mục tiêu cấp", description: "Phát triển kiến thức và bốn kỹ năng trong chặng 3 tháng/36 giờ." },
      { title: "Đánh giá đầu ra", description: "Đối chiếu năng lực với mục tiêu của cấp đang học." },
      { title: "Học tiếp hoặc củng cố", description: "Chuyển cấp khi đạt; học lại không tính phí nếu chưa đạt theo điều kiện." },
    ],
    highlights: [
      "7 cấp độ IE1–IE7; mỗi cấp 3 tháng, 36 giờ; kết hợp giáo viên nước ngoài và Việt Nam.",
      "Hệ thống học tập hỗ trợ luyện thêm và theo dõi tiến độ ngoài giờ học trực tiếp.",
      "Đối tác IDP, British Council và Cambridge Assessment English (VN055) trong hệ sinh thái IELTS/khảo thí của VMG.",
    ],
    startSteps: [
      { title: "Đăng ký test", description: "Làm rõ trình độ hiện tại và band mục tiêu." },
      { title: "Nhận lộ trình", description: "VMG đề xuất cấp bắt đầu và số chặng dự kiến dựa trên kết quả." },
      { title: "Xem chính sách", description: "Đọc học phí, lịch lớp và điều kiện cam kết trước khi đăng ký." },
    ],
    faq: [
      { q: "Tôi chưa biết trình độ thì chọn cấp nào?", a: "Bạn không cần tự chọn. Hãy kiểm tra đầu vào để VMG xếp cấp IE1–IE7 phù hợp." },
      { q: "“Học đâu thi đó” có nghĩa là đề học giống đề thi thật không?", a: "Không có nghĩa là học trước câu hỏi thi. Thông điệp nhấn mạnh trải nghiệm đào tạo và đăng ký/tiếp cận kỳ thi trong hệ sinh thái đối tác IDP và British Council, với format bám sát yêu cầu chính thức." },
      { q: "Chưa đạt đầu ra thì sao?", a: "Học lại cấp đó không tính phí nếu bạn đáp ứng điều kiện học tập trong chính sách cam kết." },
    ],
    ctaFinal: "Test đầu vào trước — biết đúng cấp học và lộ trình cần đi đến band mục tiêu.",
  },

  "vstep": {
    metaTitle: "VSTEP Mastery B1/B2 – Có Giáo Viên Kèm | VMG",
    metaDescription: "VSTEP Mastery B1/B2 dành cho người cần xây nền và ôn kỳ thi gần nhất, có giáo viên kèm. Đăng ký đánh giá để chọn lộ trình phù hợp.",
    hook: "Thi VSTEP không đạt nhiều lần thường không phải vì thiếu đề — mà vì nền tảng còn hổng.",
    subheadline: "VSTEP Mastery giúp bạn xây lại nền, học cùng giáo viên và chuẩn bị kiến thức cho kỳ thi B1/B2 gần nhất.",
    ctaPrimary: "Đánh giá lộ trình VSTEP",
    introTitle: "Vững nền trước, luyện thi sau",
    intro: "Khác với VSTEP Express chỉ ôn format ngắn hạn, Mastery phù hợp người cần một lộ trình có giáo viên đồng hành để củng cố nền tảng và chuẩn bị cho mục tiêu B1 hoặc B2.",
    suitableFor: [
      "Sinh viên cần VSTEP cho yêu cầu tốt nghiệp.",
      "Người đi làm cần B1/B2 cho hồ sơ học tập hoặc nghề nghiệp.",
      "Người chưa đủ nền để chỉ luyện format ngắn hạn.",
    ],
    outcomes: [
      "Củng cố kiến thức nền phục vụ bốn kỹ năng.",
      "Nắm yêu cầu và phương pháp làm bài theo mục tiêu B1/B2.",
      "Có giáo viên kèm trong quá trình chuẩn bị cho kỳ thi gần nhất.",
    ],
    journey: [
      { title: "Đánh giá đầu vào", description: "Xác định nền tảng và mục tiêu B1 hoặc B2." },
      { title: "Bù lỗ hổng", description: "Củng cố kiến thức và kỹ năng còn yếu." },
      { title: "Làm quen kỳ thi", description: "Hệ thống dạng bài và cách tiếp cận theo mục tiêu." },
      { title: "Ôn kỳ gần nhất", description: "Tập trung phần cần thiết trước mốc thi dự kiến." },
    ],
    highlights: [
      "Có giáo viên kèm, không phải khóa tự học hoàn toàn.",
      "Mục tiêu VSTEP B1 hoặc B2 theo nhu cầu.",
      "Thời lượng chính thức cần xác nhận theo lớp; không dùng con số chưa được phê duyệt.",
    ],
    startSteps: [
      { title: "Gửi mục tiêu", description: "Cho VMG biết B1/B2 và kỳ thi bạn dự kiến." },
      { title: "Đánh giá nền tảng", description: "Xác định Mastery có phù hợp hay nên chọn Express." },
      { title: "Nhận lộ trình", description: "VMG cung cấp lịch, thời lượng, học phí và chính sách áp dụng." },
    ],
    faq: [
      { q: "Mastery khác Express thế nào?", a: "Mastery hướng đến xây nền và có giáo viên kèm; Express ngắn hạn, dành cho người đã có nền và không cam kết đầu ra." },
      { q: "Khóa học kéo dài bao lâu?", a: "[CẦN XÁC NHẬN NỘI DUNG THẬT: thời lượng VSTEP Mastery]. VMG sẽ cung cấp thời lượng đúng của lớp hiện hành khi tư vấn." },
      { q: "Có cam kết thi đậu không?", a: "Hồ sơ đã xác nhận mục tiêu chuẩn bị đủ kiến thức cho kỳ gần nhất, nhưng điều kiện cam kết cụ thể cần được cung cấp bằng văn bản theo lớp; trang không tự hứa “đậu” cho mọi trường hợp." },
    ],
    ctaFinal: "Gửi mục tiêu B1/B2 và deadline — nhận tư vấn Mastery hay Express phù hợp hơn.",
  },

  "tieng-anh-giao-tiep": {
    metaTitle: "Tiếng Anh Giao Tiếp Cho Người Đi Làm | VMG",
    metaDescription: "Khóa tiếng Anh giao tiếp 2 tháng, 36 giờ, 5 cấp độ với 50% GVNN và 50% GVVN. Đăng ký kiểm tra để chọn cấp phù hợp.",
    hook: "Biết nhiều ngữ pháp nhưng không nói được vẫn là một rào cản thật trong công việc.",
    subheadline: "Luyện phản xạ trong 2 tháng với 50% giáo viên nước ngoài và 50% giáo viên Việt Nam, theo 5 cấp độ từ nền tảng đến giao tiếp công việc.",
    ctaPrimary: "Kiểm tra cấp độ giao tiếp",
    introTitle: "Đưa tiếng Anh ra khỏi sách và vào cuộc hội thoại",
    intro: "Chương trình tập trung giúp người học vượt qua tâm lý sợ nói, tăng phản xạ và sử dụng tiếng Anh trong tình huống hằng ngày lẫn công việc. Tên thương mại chính thức đang chờ xác nhận; trang dùng tên mô tả “Tiếng Anh Giao Tiếp”.",
    suitableFor: [
      "Người biết ngữ pháp nhưng phản xạ nói còn chậm.",
      "Người đi làm cần giao tiếp với đồng nghiệp, khách hàng hoặc đối tác.",
      "Người muốn học theo cấp độ thay vì tham gia lớp đại trà.",
    ],
    outcomes: [
      "Giảm tâm lý ngại nói và tăng mức độ chủ động trong hội thoại.",
      "Luyện nghe – phản hồi qua chủ đề gần với đời sống và công việc.",
      "Hoàn thành mục tiêu của cấp học trong lộ trình 5 cấp độ.",
    ],
    journey: [
      { title: "Kiểm tra cấp độ", description: "Xác định điểm bắt đầu trong 5 cấp độ của chương trình." },
      { title: "Xây phản xạ", description: "Luyện nghe, phát âm và mẫu diễn đạt cần thiết." },
      { title: "Thực hành tình huống", description: "Dùng tiếng Anh trong ngữ cảnh hằng ngày và công việc." },
      { title: "Đánh giá & học tiếp", description: "Nhìn lại khả năng giao tiếp và chọn cấp tiếp theo khi phù hợp." },
    ],
    highlights: [
      "2 tháng, tổng thời lượng 36 giờ.",
      "5 cấp độ.",
      "50% giáo viên nước ngoài và 50% giáo viên Việt Nam.",
    ],
    startSteps: [
      { title: "Đăng ký kiểm tra", description: "Cho VMG biết tình huống bạn cần dùng tiếng Anh." },
      { title: "Xếp cấp", description: "Chọn cấp độ dựa trên năng lực thay vì chỉ theo mục tiêu cảm tính." },
      { title: "Nhận lịch & báo giá", description: "Xem lớp, hình thức, học phí và chính sách hiện hành." },
    ],
    faq: [
      { q: "Khóa học có phù hợp người mất gốc không?", a: "Chương trình có 5 cấp độ, nhưng cần kiểm tra để xác định cấp bắt đầu phù hợp." },
      { q: "Có học với giáo viên nước ngoài không?", a: "Có. Tỷ lệ được xác nhận là 50% giáo viên nước ngoài và 50% giáo viên Việt Nam." },
      { q: "Tên khóa học là gì?", a: "Tên thương mại mới đang chờ xác nhận. Website tạm dùng tên mô tả “Tiếng Anh Giao Tiếp” và không dùng tên nội bộ E-Plus." },
    ],
    ctaFinal: "Đừng chọn lớp theo cảm giác — kiểm tra cấp độ và nhận lộ trình giao tiếp phù hợp.",
  },

  "tesol-epath": {
    metaTitle: "TESOL E-PATH Online – Chứng Chỉ TESOL 120H INTESOL | VMG",
    metaDescription: "TESOL E-PATH 120 giờ, học self-paced kết hợp livestream hằng tuần với trainer VMG + INTESOL; chứng chỉ kiểm định ALAP UK.",
    hook: "Lịch bận không nên là lý do khiến bạn dừng mục tiêu trở thành giáo viên tiếng Anh.",
    subheadline: "Hoàn thành TESOL 120 giờ trong 4–8 tuần theo nhịp cá nhân, kết hợp tự học và livestream hằng tuần cùng trainer.",
    ctaPrimary: "Kiểm tra điều kiện đầu vào",
    introTitle: "Linh hoạt tự học, vẫn có trainer đồng hành",
    intro: "TESOL E-PATH kết hợp tám module self-paced trên LMS với livestream hằng tuần. Nội dung đi từ Language Awareness, Teaching Methodology và Lesson Planning đến Practical Application; trainer có thể điều chỉnh trọng tâm buổi live theo pain point thực tế của lớp.",
    suitableFor: [
      "Người muốn theo hướng giảng dạy tiếng Anh nhưng cần lịch linh hoạt.",
      "Giáo viên cần hệ thống hóa kiến thức và bổ sung chứng chỉ TESOL.",
      "Người đáp ứng yêu cầu tiếng Anh đầu vào của chương trình.",
    ],
    outcomes: [
      "Hoàn thành lộ trình TESOL 120 giờ.",
      "Học kiến thức giảng dạy qua hình thức self-paced có livestream hỗ trợ.",
      "Hướng đến chứng chỉ TESOL 120H INTESOL, kiểm định ALAP UK.",
    ],
    journey: [
      { title: "Placement & khảo sát nhu cầu", description: "Khuyến nghị B1+; làm rõ kinh nghiệm, khó khăn đứng lớp và chủ đề muốn đào sâu." },
      { title: "Module 1–4", description: "Language Awareness, nền tảng phương pháp và cách chuyển kiến thức thành hoạt động dạy học." },
      { title: "Module 5–8", description: "Lesson Planning, Classroom Management và Practical Application qua assignment." },
      { title: "Live Sessions & đánh giá", description: "Thảo luận có hướng dẫn, feedback cá nhân và hoàn thành tiêu chí nhận chứng chỉ." },
    ],
    highlights: [
      "Tám module, 120 giờ, lộ trình 4–8 tuần; khuyến nghị đầu vào CEFR B1+.",
      "Self-paced kết hợp livestream hằng tuần; nhóm live dự kiến 15–20 học viên.",
      "Trainer VMG + INTESOL; chứng chỉ TESOL 120H INTESOL kiểm định ALAP UK.",
    ],
    startSteps: [
      { title: "Gửi nền tảng", description: "Cho VMG biết trình độ tiếng Anh và kinh nghiệm giảng dạy." },
      { title: "Xác nhận điều kiện", description: "Tư vấn viên kiểm tra mức độ phù hợp và yêu cầu đầu vào." },
      { title: "Nhận lịch & học phí", description: "Xem đợt học, buổi live, học phí và tiêu chí hoàn thành." },
    ],
    faq: [
      { q: "Học hoàn toàn một mình phải không?", a: "Không. Phần chính là self-paced, kết hợp livestream hằng tuần với trainer." },
      { q: "Chứng chỉ nào được cấp?", a: "Theo dữ liệu đã xác nhận: chứng chỉ TESOL 120H INTESOL, kiểm định ALAP UK." },
      { q: "Tôi chưa biết trình độ có đủ không?", a: "Hãy đăng ký kiểm tra điều kiện đầu vào. VMG không khuyến nghị đăng ký trước khi xác nhận phù hợp." },
    ],
    ctaFinal: "Kiểm tra điều kiện trước — nhận lộ trình TESOL E-PATH phù hợp với lịch của bạn.",
  },

  "edunext": {
    metaTitle: "EduNext Solutions – Phát Triển Năng Lực Tiếng Anh Cho Giáo Viên | VMG",
    metaDescription: "EduNext Solutions là giải pháp cho trường học cần bồi dưỡng tiếng Anh, Classroom English và năng lực giảng dạy bằng tiếng Anh cho đội ngũ giáo viên.",
    hook: "Muốn mở rộng giáo dục song ngữ, nhà trường cần bắt đầu từ năng lực thật của đội ngũ giáo viên.",
    subheadline: "EduNext Solutions giúp cơ sở giáo dục xây lộ trình bồi dưỡng tiếng Anh và năng lực giảng dạy bằng tiếng Anh theo đầu vào của từng nhóm giáo viên.",
    ctaPrimary: "Đăng ký khảo sát nhu cầu EduNext",
    introTitle: "Giải pháp phát triển đội ngũ, không phải khóa bán lẻ đại trà",
    intro: "EduNext được thiết kế cho trường học và cơ sở giáo dục. Giải pháp phân tách nhu cầu của giáo viên bộ môn và giáo viên tiếng Anh, kết hợp năng lực ngôn ngữ, Classroom English, tài liệu chuyên môn và kỹ năng tổ chức tiết học bằng tiếng Anh.",
    suitableFor: [
      "Trường học cần khảo sát và chuẩn hóa năng lực tiếng Anh của đội ngũ giáo viên.",
      "Cơ sở giáo dục chuẩn bị triển khai lớp học song ngữ, tích hợp hoặc STEM bằng tiếng Anh.",
      "Đơn vị cần mô hình bồi dưỡng linh hoạt để phù hợp lịch giảng dạy của giáo viên.",
    ],
    outcomes: [
      "Giáo viên bộ môn: xây phản xạ từ nền tảng, Classroom English và khả năng tiếp cận tài liệu chuyên ngành.",
      "Giáo viên tiếng Anh: phát triển thuyết giảng, thảo luận học thuật và năng lực dẫn dắt lớp học.",
      "Nhà trường có lộ trình bồi dưỡng theo nhóm đầu vào; chuẩn đầu ra chính thức sẽ được chốt trong đề xuất triển khai.",
    ],
    journeyTitle: "Quy trình xây giải pháp EduNext",
    journey: [
      { title: "Khảo sát tổ chức", description: "Làm rõ quy mô đội ngũ, môn giảng dạy, định hướng song ngữ và hạn chế về thời gian." },
      { title: "Phân nhóm đầu vào", description: "Tách lộ trình Foundation/A1–A2 cho giáo viên bộ môn và B1–B2 trở lên cho nhóm cần nâng cao." },
      { title: "Thiết kế chương trình", description: "Kết hợp nghe, nói, phát âm, Classroom English, đọc tài liệu STEM và viết giáo án/báo cáo." },
      { title: "Triển khai & đánh giá", description: "Thống nhất hình thức học, tiêu chí theo dõi và chứng nhận áp dụng trong đề xuất chính thức." },
    ],
    highlights: [
      "Thiết kế riêng cho đội ngũ giáo viên tại trường học, không bán lẻ như khóa cá nhân.",
      "Phân luồng theo vai trò và đầu vào thay vì áp một giáo trình cho toàn bộ giáo viên.",
      "Sản phẩm đang hoàn thiện: chưa public testimonial, giá hay một cam kết đầu ra chung cho mọi đơn vị.",
    ],
    startSteps: [
      { title: "Gửi thông tin đơn vị", description: "Cho VMG biết loại hình trường, số lượng giáo viên và mục tiêu sơ bộ." },
      { title: "Trao đổi nhu cầu", description: "Khối Kinh doanh làm rõ nhóm giáo viên, đầu vào và bối cảnh triển khai." },
      { title: "Nhận đề xuất", description: "Nhà trường xem phạm vi nội dung, hình thức, tiêu chí đánh giá và chính sách riêng trước khi quyết định." },
    ],
    faq: [
      { q: "Giáo viên cá nhân có thể đăng ký EduNext không?", a: "Handbook xác định EduNext là giải pháp bán theo hợp đồng với trường/cơ sở giáo dục, không phải khóa bán lẻ qua tư vấn viên trung tâm." },
      { q: "EduNext có dùng một đầu vào cho mọi giáo viên không?", a: "Không. Giáo viên bộ môn có thể bắt đầu từ Foundation/A1–A2; nhóm giáo viên tiếng Anh cần lộ trình nâng cao từ B1–B2 tùy mục tiêu." },
      { q: "Chuẩn đầu ra và chứng nhận là gì?", a: "Sản phẩm còn đang hoàn thiện. Chuẩn đầu ra, chứng nhận áp dụng và tiêu chí đánh giá phải được xác nhận trong đề xuất dành riêng cho từng đơn vị." },
    ],
    ctaFinal: "Cho VMG biết bài toán phát triển đội ngũ của nhà trường — bắt đầu bằng bước khảo sát nhu cầu EduNext.",
    notice: "EduNext là giải pháp dành cho trường học/cơ sở giáo dục và đang trong giai đoạn hoàn thiện. Website không hiển thị giá, testimonial hoặc cam kết đầu ra chưa được phê duyệt.",
  },
};

export function getProductPageContent(slug: string): ProductPageContent | undefined {
  return PRODUCT_PAGE_CONTENT[slug];
}
