// Verified against VMG's public website on 2026-09-12. See docs/context/LEGACY_CONTENT_AUDIT.md.
export const COMPANY = {
  source: "https://vmgenglish.edu.vn/gioi-thieu.html",
  legalSource: "https://vmgenglish.edu.vn/chinh-sach-bao-mat-n42.html",
  legalName: "Công ty TNHH Một thành viên Giáo dục Việt Mỹ",
  headquarters: "Phòng L17-11, Tầng 17, Tòa nhà Vincom Center, 72 Lê Thánh Tôn, P. Sài Gòn, TP.HCM, Việt Nam",
  office: "E99 Võ Thị Sáu, KP 7, Phường Trấn Biên, Đồng Nai",
  hotline: "1900 636 838",
  hotlineHref: "tel:1900636838",
  mobile: "090 697 88 98",
  mobileHref: "tel:0906978898",
  email: "info@vmg.edu.vn",
  facebook: "https://www.facebook.com/AnhNguVietMy",
  zalo: "https://zalo.me/3856493312075808344",
  messenger: "https://m.me/352792877912",
  chairmanImage: "/legacy/chairman.png",
  chairmanName: "Nguyễn Quốc Khánh",
  chairmanRole: "Chủ tịch kiêm Tổng Giám đốc",
  chairmanMessage: [
    "Mỗi con người sinh ra đều có một vai trò và sứ mệnh nhất định, đều mong muốn tạo nên giá trị làm cho cuộc sống tốt đẹp hơn.",
    "Đối với Tập đoàn Giáo dục Việt Mỹ VMG và những gì liên quan đến tổ chức này, vai trò và sứ mệnh của chúng tôi là tạo ra giá trị bằng những sản phẩm Giáo dục tốt nhất, những dịch vụ chăm sóc tận tâm nhất và xây dựng một môi trường làm việc đầy tính nhân văn. Tất cả là để tạo nên một giá trị mà chúng tôi gọi đó là giá trị đầu tư giáo dục",
  ],
  responsibility: "Trách nhiệm và chất lượng trong từng lời nói, việc làm và sản phẩm giáo dục. VMG liên tục cập nhật chương trình, giáo trình, phương pháp giảng dạy và cơ sở vật chất.",
  mission: "Tạo ra giá trị thông qua sản phẩm giáo dục, dịch vụ chăm sóc tận tâm và môi trường làm việc nhân văn — đó là giá trị đầu tư giáo dục mà VMG theo đuổi.",
};

export const COMPANY_HISTORY = [
  { year: "2003", text: "Thành lập Trung tâm Anh ngữ Việt Mỹ – Nguyễn Văn Linh." },
  { year: "2004", text: "Thành lập Trung tâm Anh ngữ Việt Mỹ – Nguyễn Ái Quốc." },
  { year: "2009", text: "Thành lập Trung tâm Anh ngữ Việt Mỹ – Phạm Văn Thuận; triển khai và tổ chức thi TOEIC quốc tế." },
  { year: "2010", text: "Thành lập Tập đoàn Giáo dục Việt Mỹ." },
  { year: "2012–2013", text: "Mở các trung tâm Tôn Đức Thắng và Võ Thị Sáu." },
  { year: "2014", text: "Xây dựng hội trường thi chứng chỉ quốc tế; hợp tác với IIG Việt Nam về TOEIC và Hội đồng Anh về đăng ký, tổ chức thi IELTS." },
  { year: "2015", text: "Thành lập Trung tâm Anh ngữ Việt Mỹ – Đồng Khởi." },
  { year: "2017–2019", text: "Mở các trung tâm Trần Văn Xã, Bùi Trọng Nghĩa, Lê Duẩn và Nguyễn Trãi." },
  { year: "2020–2021", text: "Mở các trung tâm Hùng Vương, Trần Phú, Trảng Bom; giới thiệu hệ thống học tập trực tuyến EMS – LMS." },
  { year: "2022–2023", text: "Cập nhật nhận diện thương hiệu, phát triển giáo dục doanh nghiệp và kỷ niệm 20 năm thành lập hệ thống." },
  { year: "2024", text: "Thành lập các trung tâm Đại Phước và Trương Định." },
  { year: "2025", text: "Mở rộng hệ thống Ngoại ngữ – Du học – Hướng nghiệp tại Bình Phước và Phước Tân." },
];

// These are published profiles, not a claim about current class assignment or tenure.
export const TEACHERS = [
  ["Jack Laudig Sawyer", "Mỹ"], ["Charles Kenneth Letness", "Mỹ"],
  ["Jonathan Andrew Stone", "Anh"], ["David Paul Rotherham", "Anh"],
  ["David Michael Summers", "Anh"], ["Seth Tetteh Kwabla", "Mỹ"],
  ["Joy Cao Bogart", "Mỹ"], ["Rachel Nichole Garcia", "Mỹ"],
  ["Stefan Jacobs", "Nam Phi"], ["Daimen Lee De Wet", "Nam Phi"],
  ["Zane Vermuleun Charlse", "Nam Phi"], ["Shara Lee Nortje", "Nam Phi"],
  ["Devon Watts", "Nam Phi"], ["Clariza Tayla Niebuhr", "Nam Phi"],
  ["Luka Pavelin", "Serbia"], ["George Herselman", "Nam Phi"],
  ["Kiehara Van Loggerenberg", "Nam Phi"], ["Bryan ROOYEN", "Nam Phi"],
  ["Kelli Paterson", "Nam Phi"], ["Chesney Fraser Paterson", "Nam Phi"],
].map(([name, nationality]) => ({ name, nationality, qualification: "Cử nhân Đại học" }));

export const PARENT_STORIES = [
  { name: "Ông Võ Hoàng Minh", location: "Long Khánh, Đồng Nai", quote: "Tôi rất tự hào về con khi học tại VMG English, mặc dù bé còn nhỏ nhưng sau một thời gian ngắn thì thấy bé thích nói tiếng Anh ở các từ cơ bản hơn" },
  { name: "Ông Nguyễn Hữu Huy", location: "Long Thành, Đồng Nai", quote: "Cảm ơn VMG English rất nhiều, nhờ sự hỗ trợ của các cô mà bé nhà nay tự tin hơn rất nhiều khi giao tiếp tiếng Anh, điểm số trên trường của con cũng được cải thiện hơn trước." },
  { name: "Ông Lê Thái bảo", location: "Biên Hòa, Đồng Nai", quote: "Bé nhà tiến bộ khá nhanh, chịu khó giao tiếp và chập chững nói những từ nhỏ bằng tiếng Anh nghe rất đáng yêu và dễ thương luôn" },
  { name: "Bà Quỳnh Như", location: "Trảng Bom, Đồng Nai", quote: "Cảm nhận tốt khi thấy bé có sự tiến bộ, bé vui đi học như đi chơi, không cảm giác bị gò bó hay ép buộc." },
];
