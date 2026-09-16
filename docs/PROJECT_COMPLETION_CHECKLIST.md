# Checklist hoàn thiện website VMG

Ngày rà soát ban đầu: 15/09/2026  
Ngày cập nhật triển khai: 16/09/2026  
Phạm vi: toàn bộ route public, dữ liệu tĩnh, form, Supabase, khu vực `/admin`, SEO, hiệu năng, kiểm thử và triển khai.

## Cách dùng checklist

- `[x]`: đã có trong code và đã kiểm tra ở mức hiện tại.
- `[ ]`: còn phải làm.
- `P0`: chặn phát hành hoặc có rủi ro sai dữ liệu/pháp lý/mất lead.
- `P1`: cần hoàn thành trước khi website được xem là bản production đầy đủ.
- `P2`: cải tiến sau khi luồng chính đã ổn định.
- Mọi nội dung chưa có nguồn thật phải giữ trạng thái chờ duyệt, không tự điền bằng nội dung suy đoán.

## 1. Kết luận nhanh

Website hiện đã có bộ nội dung public khá đầy đủ, dữ liệu giới thiệu công ty, 10 trung tâm, thông điệp Chủ tịch, đội ngũ giáo viên từ website cũ, Hall of Fame và 5 bài tin đã đối chiếu. Build production chạy thành công.

Các mục nội dung/frontend sau đây đã được xử lý trong vòng hoàn thiện 16/09/2026:

- [x] Sửa kiến trúc Hướng nghiệp; TESOL về Ngoại ngữ/Học online, XKLĐ về VMP.
- [x] Viết lại trang Du học từ nguồn VMP và chuyển CTA sang chuyên trang chính thức của VMP.
- [x] Bỏ newsletter giả lập và SLA phản hồi chưa được xác nhận.
- [x] Tạo fallback quiz/form, sitemap, robots, canonical, Open Graph và Twitter metadata.
- [x] Chuyển ảnh lớn đang sử dụng sang WebP và lazy-load các route; bundle đầu vào còn khoảng 442 KB minified.
- [x] Bổ sung hai bài tin 2026 và ảnh bài viết từ website VMG cũ.

Các hạng mục hạ tầng/quy trình ngoài nội dung vẫn phải hoàn tất trước khi mở traffic chính thức:

- [ ] **P0 – Pháp chế duyệt:** Chính sách bảo mật và Điều khoản sử dụng cần được kiểm tra với quy trình thực tế của VMG.
- [ ] **P0 – Khôi phục backend:** hostname Supabase trong cấu hình hiện không phân giải được; chưa thể kiểm thử đọc/ghi thật.
- [ ] **P0 – Đồng bộ CMS với website public:** sản phẩm trong admin chưa điều khiển catalog/trang chi tiết; trang tin public chưa đọc thống nhất từ CMS; một phần dữ liệu vẫn hardcode.
- [ ] **P0 – Bảo đảm không mất lead:** kiểm thử form thật, RLS, chống spam, thông báo nội bộ, webhook/export CRM, log lỗi và cơ chế retry.
- [ ] **P1 – Crawlability nâng cao:** cân nhắc prerender/SSR nếu crawler mục tiêu không thực thi JavaScript; metadata client và metadata mặc định đã có.

## 2. Checklist nội dung và hình ảnh theo toàn bộ website

### 2.1 Thành phần dùng chung

- [x] Logo VMG, tagline công khai và màu thương hiệu chính đã có.
- [x] Header, footer, hotline, email, Zalo, Facebook, địa chỉ văn phòng và trụ sở đã có nguồn.
- [x] Footer có liên kết Chính sách bảo mật và Điều khoản sử dụng.
- [ ] **P1 – Nội dung:** rà lại tên pháp nhân, địa chỉ “trụ sở chính” và “văn phòng đại diện” với hồ sơ pháp lý hiện hành trước khi dùng toàn site.
- [ ] **P1 – Nội dung:** chốt quy ước viết tên thương hiệu: “Hệ thống Giáo dục và Đào tạo Việt Mỹ – VMG”, “Viet My Group” và “VMP by VMG”.
- [ ] **P1 – Hình ảnh:** tạo ảnh chia sẻ mặc định 1200×630 cho Open Graph; bổ sung favicon 16/32/180/192/512 và manifest icon.
- [ ] **P1 – Hình ảnh:** lập biên bản quyền sử dụng/nguồn cho toàn bộ ảnh cũ, ảnh VMP, ảnh Hall of Fame và ảnh sinh bằng AI.
- [ ] **P1 – UI:** bổ sung trạng thái menu đang chọn, breadcrumb cho trang sâu và nút bỏ qua điều hướng cho bàn phím.
- [ ] **P2 – Nội dung:** thống nhất cách viết GVNN/GVVN và thêm giải thích ở lần xuất hiện đầu tiên nếu cần.

### 2.2 Trang chủ `/`

- [x] Hero, quiz cá nhân hóa, danh mục chương trình, học online, Du học, giá trị VMG, Hall of Fame, đối tác, tin tức và newsletter đã có giao diện.
- [x] Đối tác được trình bày đủ IDP, British Council và Cambridge VN055.
- [x] Tin tức có 3 bài dự phòng đã xác minh khi CMS không trả dữ liệu.
- [ ] **P0 – Nội dung:** bỏ/chuyển trạng thái placeholder lịch sự kiện Du học; không hiển thị như một card chương trình đang hoạt động khi chưa có lịch thật.
- [ ] **P0 – Nội dung:** rà lại mọi gợi ý quiz sau khi sửa cấu trúc Hướng nghiệp/TESOL/XKLĐ; tránh route sang nhóm sai.
- [ ] **P0 – Form:** nối newsletter vào bảng/subscriber service thật, thêm consent, chống đăng ký trùng, email xác nhận nếu áp dụng và trạng thái lỗi thật.
- [ ] **P0 – Form:** bỏ câu “liên hệ trong vòng 24h” hoặc chốt SLA bằng văn bản.
- [ ] **P1 – Hình ảnh:** duyệt chính thức các ảnh hero và ảnh card sản phẩm đang là hình minh họa; thay bằng ảnh VMG thật nếu có.
- [ ] **P1 – Hình ảnh:** bổ sung link từ khối Hall of Fame trên trang chủ sang `/hall-of-fame`.
- [ ] **P1 – Nội dung:** xác định quy tắc chọn tin nổi bật, thứ tự, ngày hết hạn ưu đãi và cách ẩn tin cũ.
- [ ] **P2 – UX:** lưu/khôi phục lựa chọn quiz trong phiên và có phương án gợi ý tĩnh khi CMS mất kết nối.

### 2.3 Ngoại ngữ `/ngoai-ngu` và các trang chi tiết

- [x] Có các nhóm theo độ tuổi, luyện thi/chứng chỉ, tiếng Trung và đào tạo doanh nghiệp.
- [x] Có dữ liệu chi tiết cho 21 slug chương trình; 3 sản phẩm được giữ `published: false` theo trạng thái sản phẩm.
- [x] Giá không hiển thị công khai theo chính sách hiện tại.
- [ ] **P0 – Nội dung:** sửa câu “TESOL và Xuất khẩu lao động thuộc trụ cột Hướng nghiệp”; chuyển TESOL offline về đúng mục Ngoại ngữ và XKLĐ về Du học/VMP.
- [ ] **P0 – Nội dung:** chốt tuổi tuyển sinh cụ thể của Kindy – E-Pioneer.
- [ ] **P0 – Nội dung:** chốt thời lượng cấp SAT 1550+.
- [ ] **P0 – Nội dung:** chốt số năm kinh nghiệm đào tạo IELTS nếu vẫn muốn dùng claim này; không lấy mốc 23 năm của VMG để thay thế.
- [ ] **P0 – Nội dung:** chốt điều kiện cam kết theo lớp của VSTEP và thời lượng VSTEP Mastery.
- [ ] **P0 – Nội dung:** chốt thời lượng từng lớp TOEIC.
- [ ] **P0 – Nội dung:** chốt danh sách môn/phạm vi của Ngân hàng đề thi.
- [ ] **P0 – Nội dung:** chốt SLA phản hồi đề xuất đào tạo doanh nghiệp.
- [ ] **P0 – Nội dung:** chốt tên thương mại và giá hiện hành của Tiếng Anh Giao Tiếp; giá vẫn chỉ lưu nội bộ nếu chính sách không công khai.
- [ ] **P0 – Nội dung:** chốt trạng thái hoàn thiện, đầu ra và bằng chứng người học của EduNext; không dùng testimonial giả.
- [ ] **P1 – Nội dung:** rà từng `entryRequirement`, sĩ số, số buổi, điều kiện học lại và câu chữ “cam kết” với R&D/OSIR trước khi bật publish.
- [ ] **P1 – Nội dung:** xác nhận Adults – ePlus tiếp tục ẩn hay dừng hẳn; xác nhận điều kiện mở lại Tiếng Trung Giao Tiếp và HSK.
- [ ] **P1 – Hình ảnh:** mỗi sản phẩm cần bộ tối thiểu gồm ảnh hero ngang, 2–4 ảnh lớp học thật, logo/đối tác liên quan nếu có và ảnh thumbnail 16:10.
- [ ] **P1 – Hình ảnh:** hiện nhiều mã chỉ có ảnh minh họa sinh tạo, chưa có ảnh lớp thật: SAT, THPT, Ngân hàng đề, TOEIC, VSTEP Express/E-PATH/Mastery, B2B, ESL FlexTrack, Giao tiếp và EduNext.
- [ ] **P1 – Hình ảnh:** không tái sử dụng một ảnh thành tích IELTS như ảnh trải nghiệm cho nhiều sản phẩm nếu không có ngữ cảnh nguồn phù hợp.
- [ ] **P2 – UX:** thêm so sánh lộ trình/cấp độ cho IELTS, VSTEP, SAT và Cambridge thay vì chỉ hiển thị nhiều card rời.

### 2.4 Khảo thí `/khao-thi`

- [x] Đã tách dịch vụ thi IELTS và Cambridge khỏi catalog khóa học.
- [x] Thể hiện IDP + British Council và Cambridge VN055 đúng nhóm.
- [ ] **P0 – Nội dung:** OSIR xác nhận quy trình đăng ký, đơn vị tổ chức, hồ sơ, lệ phí, địa điểm, lịch thi và thời gian trả kết quả hiện hành.
- [ ] **P1 – Nội dung:** bổ sung lịch thi có ngày cập nhật và cơ chế tự hết hạn; nếu không có dữ liệu thì CTA chỉ nên là “nhận lịch thi”.
- [ ] **P1 – Nội dung:** làm rõ phạm vi IELTS Mocktest, cách trả kết quả và điều kiện tham gia.
- [ ] **P1 – Hình ảnh:** bổ sung ảnh phòng thi/cơ sở khảo thí thật đã được phép sử dụng; ảnh chứng nhận/biển hiệu VN055 nếu có.
- [ ] **P1 – Hình ảnh:** lưu bản logo/chứng nhận đối tác đúng quy chuẩn thương hiệu, không chỉ dùng chữ.

### 2.5 Du học – VMP `/du-hoc`

- [x] Có khung Du học hè, Du học dài hạn, các quốc gia và form đăng ký.
- [x] Có logo và hai ảnh từ website VMP đã ghi nguồn.
- [ ] **P0 – Duyệt nội dung:** chị Hằng duyệt toàn bộ trang trước khi publish.
- [ ] **P0 – Nội dung:** xác minh hoặc bỏ claim “2–4 tuần” đang lặp ở các chương trình hè.
- [ ] **P0 – Nội dung:** bổ sung nội dung thật cho giới thiệu VMP, phạm vi tư vấn, quy trình hồ sơ, visa, học bổng, chi phí/dịch vụ và điều kiện từng điểm đến.
- [ ] **P0 – Nội dung:** chuyển XKLĐ Hàn Quốc, Nhật Bản, Đài Loan từ Hướng nghiệp sang khu vực VMP; chỉ mở tuyển sinh khi có nội dung được duyệt.
- [ ] **P0 – Nội dung:** cập nhật lịch sự kiện thật hoặc ẩn hoàn toàn khối sự kiện.
- [ ] **P1 – Hình ảnh:** thay/duyệt bộ ảnh quốc gia đang là hình minh họa; không để ảnh tạo cảm giác là trường đối tác thật nếu chưa có tên/quan hệ xác nhận.
- [ ] **P1 – Hình ảnh:** cần ảnh đội tư vấn VMP, hoạt động tư vấn hồ sơ, đoàn du học hè, đối tác/trường học và sự kiện thật.
- [ ] **P1 – Form:** bổ sung điểm đến, loại chương trình, giai đoạn hồ sơ, năm dự kiến và cơ chế định tuyến lead sang đúng đội VMP.

### 2.6 Hướng nghiệp `/huong-nghiep`

- [ ] **P0 – Viết lại toàn trang:** chuyển thành trang định hướng + “sắp ra mắt”, không liệt kê chương trình B2C như đang mở bán.
- [ ] **P0 – Gỡ TESOL và XKLĐ khỏi trang:** TESOL đi về Ngoại ngữ/Học online; XKLĐ đi về VMP/Du học.
- [ ] **P0 – Route:** bỏ hoặc redirect hợp lý `/huong-nghiep/:slug` sau khi sửa phân loại.
- [ ] **P1 – Nội dung:** chỉ bổ sung hoạt động trải nghiệm theo mùa khi có tên, thời gian, đơn vị phụ trách và trạng thái tuyển sinh thật.
- [ ] **P1 – Hình ảnh:** dùng ảnh hoạt động hướng nghiệp thật khi có; trước đó ưu tiên khối coming-soon tối giản thay vì card quốc gia giả lập.

### 2.7 Học online `/hoc-online`

- [x] Có catalog và bộ lọc hình thức.
- [ ] **P0 – Nội dung:** TESOL E-PATH phải xuất hiện đúng trong catalog học online; hiện catalog loại toàn bộ section `tesol`.
- [ ] **P0 – Nội dung:** sửa headline “cùng cam kết đầu ra như tại trung tâm” vì không phải mọi sản phẩm đều có cùng cam kết.
- [ ] **P1 – Nội dung:** kiểm tra lại bộ 6 sản phẩm TMĐT ưu tiên và trạng thái thương mại: FT15, IELTS Express Online, ESL FlexTrack, VSTEP E-PATH/Mastery theo naming được duyệt, TESOL E-PATH, EduNext; làm rõ Giao tiếp online nếu thay thế mục nào.
- [ ] **P1 – UX:** thêm bộ lọc mục tiêu, đối tượng, hình thức và so sánh sản phẩm; tránh filter có nhóm nhưng không có kết quả.

### 2.8 Hệ thống trung tâm `/he-thong-trung-tam`

- [x] Có danh sách 10 trung tâm, địa chỉ, link chỉ đường, fanpage và bản đồ tìm theo địa chỉ.
- [x] Có ảnh phù hợp cho 6/10 trung tâm.
- [ ] **P0 – Dữ liệu:** đối chiếu lại snapshot 10 trung tâm với CMS khi backend hoạt động; không để dữ liệu CMS cũ ghi đè snapshot mới.
- [ ] **P1 – Dữ liệu:** bổ sung số điện thoại riêng, giờ hoạt động và tọa độ đã xác minh cho từng trung tâm.
- [ ] **P1 – Hình ảnh:** bổ sung ảnh đúng cơ sở cho Phạm Văn Thuận, Nhơn Trạch, Xuân Lộc và Trảng Bom.
- [ ] **P1 – Hình ảnh:** mỗi cơ sở nên có ảnh mặt tiền nhận diện, lớp học/cơ sở vật chất và chú thích nguồn/ngày chụp.
- [ ] **P1 – UX:** tìm theo vị trí/khoảng cách, nút gọi từng cơ sở, trạng thái đang mở và fallback khi Google Maps bị chặn.
- [ ] **P1 – SEO:** tạo dữ liệu LocalBusiness/Organization cho từng địa điểm dù chưa làm trang trung tâm riêng.

### 2.9 Trường học & Doanh nghiệp `/truong-hoc-doanh-nghiep`

- [x] Có landing page và form thu lead; nội dung public không dùng thuật ngữ nội bộ “B2G”.
- [ ] **P0 – Nội dung:** Khối Kinh doanh xác nhận danh mục dịch vụ, quy trình khảo sát, đầu mối tiếp nhận và SLA phản hồi.
- [ ] **P0 – Backend:** định tuyến lead sang đúng nhóm, gửi thông báo và ghi nguồn/UTM.
- [ ] **P1 – Nội dung:** diễn giải đúng số liệu 42.000 học viên trong hơn 200 trường đối tác nếu sử dụng; tuyệt đối không biến thành tổng học viên B2C.
- [ ] **P1 – Hình ảnh:** cần ảnh hoạt động tại trường, lớp doanh nghiệp, workshop và logo đối tác chỉ khi có quyền công bố.
- [ ] **P1 – Form:** bổ sung email công việc, tỉnh/thành, quy mô, loại nhu cầu và thời điểm triển khai.

### 2.10 Về VMG `/ve-vmg`

- [x] Có thông tin doanh nghiệp, hệ sinh thái, sứ mệnh, nguyên tắc chất lượng, lời nhắn/chân dung Chủ tịch và lịch sử phát triển.
- [x] Có đủ ba đối tác/chứng nhận đúng phạm vi.
- [ ] **P0 – Nội dung:** lãnh đạo duyệt bản biên tập “sứ mệnh”, “trách nhiệm & chất lượng” và toàn bộ timeline; đây không phải tuyên bố “tầm nhìn” nguyên văn.
- [ ] **P0 – Nội dung:** xác minh mốc thành lập dùng thống nhất là 2002 hay 2003 và cách diễn đạt “23 năm” theo năm công bố.
- [ ] **P1 – Hình ảnh:** bổ sung ảnh lịch sử theo mốc, ảnh trụ sở/văn phòng, ảnh hệ thống và chữ ký Chủ tịch nếu có nguồn chính thức.
- [ ] **P1 – Hình ảnh:** ảnh Chủ tịch hiện khoảng 1,33 MB; cần tối ưu và có bản crop responsive.
- [ ] **P1 – Nội dung:** chốt có/không một tuyên bố tầm nhìn chính thức; không tự tạo nếu chưa có.

### 2.11 Đội ngũ giáo viên `/doi-ngu-giao-vien`

- [x] Có 20 hồ sơ giáo viên nước ngoài từ website cũ và hai USP tỷ lệ giáo viên theo sản phẩm.
- [ ] **P0 – Dữ liệu:** HR/R&D xác nhận những hồ sơ nào còn hiện hành, cách viết tên, quốc tịch và bằng cấp trước khi publish.
- [ ] **P1 – Nội dung:** bổ sung hồ sơ giáo viên Việt Nam, môn/sản phẩm giảng dạy, chứng chỉ, mô tả chuyên môn và trung tâm công tác bằng dữ liệu thật.
- [ ] **P1 – Hình ảnh:** bổ sung chân dung thật, đồng nhất tỷ lệ/crop/nền và văn bản đồng ý công bố hình ảnh; hiện giao diện chỉ dùng chữ viết tắt.
- [ ] **P1 – Hình ảnh:** thay ảnh tập thể duy nhất bằng thư viện ảnh giảng dạy thật có ngữ cảnh.
- [ ] **P2 – CMS:** quản lý trạng thái hiện hành, thứ tự, nhóm chuyên môn và ngày rà soát hồ sơ.

### 2.12 Hall of Fame `/hall-of-fame`

- [x] Có 16 ảnh vinh danh IELTS, một câu chuyện học viên, một bài Cambridge và ba chia sẻ phụ huynh có nguồn.
- [ ] **P0 – Dữ liệu:** đối chiếu tên, điểm, chương trình, ngày ghi nhận và quyền dùng ảnh cho từng trong 16 hồ sơ; không chỉ dựa vào chữ nằm trong ảnh.
- [ ] **P1 – Nội dung:** chuyển mỗi thành tích thành dữ liệu có cấu trúc để tìm kiếm/lọc và hỗ trợ SEO/accessibility.
- [ ] **P1 – Nội dung:** bổ sung thành tích Cambridge và câu chuyện tiến bộ thật khi Marketing cung cấp.
- [ ] **P1 – Hình ảnh:** nén 16 PNG (tổng khoảng 34 MB), tạo WebP/AVIF, thumbnail và ảnh mở lớn theo nhu cầu.
- [ ] **P1 – Hình ảnh:** bổ sung poster/thumbnail video Thanh Như thay vì chỉ dùng liên kết chữ.
- [ ] **P2 – CMS:** thêm quy trình duyệt UGC, ngày hết hạn quyền sử dụng và cờ ẩn danh nếu cần.

### 2.13 Tin tức `/tin-tuc` và `/tin-tuc/:slug`

- [x] Có 3 bài đã chuyển và route chi tiết.
- [ ] **P0 – CMS:** trang danh sách/chi tiết phải đọc bài published từ CMS; hiện chỉ hiển thị `LEGACY_NEWS`, trong khi trang chủ có thể đọc CMS nên người dùng có thể bấm tin CMS rồi bị đưa về trang danh sách.
- [ ] **P1 – Nội dung:** kiểm kê và chuyển phần tin cũ cần giữ, kèm category, tác giả/đơn vị, ngày đăng, ngày sự kiện, slug, excerpt và nguồn.
- [ ] **P1 – Nội dung:** thiết lập chuẩn biên tập, lịch xuất bản, trạng thái nháp/duyệt/xuất bản/lưu trữ và xử lý tin ưu đãi hết hạn.
- [ ] **P1 – Hình ảnh:** thêm gallery/caption/credit; tạo ảnh thumbnail và ảnh social riêng cho mỗi bài.
- [ ] **P1 – SEO:** Article schema, canonical, breadcrumb, related posts và redirect URL bài cũ.
- [ ] **P2 – UX:** tìm kiếm, lọc danh mục, phân trang và trang sự kiện sắp tới/đã diễn ra.

### 2.14 Tuyển dụng `/tuyen-dung`

- [x] Có nội dung môi trường làm việc và CTA về cổng tuyển dụng cũ.
- [ ] **P0 – Nội dung:** xác nhận cổng tuyển dụng cũ còn được duy trì và có vị trí thật trước khi phát hành CTA.
- [ ] **P1 – Nội dung:** bổ sung quy trình tuyển dụng, quyền lợi ở mức đã được HR duyệt, FAQ và đầu mối liên hệ.
- [ ] **P1 – Hình ảnh:** thay/bổ sung ảnh employer branding thật; ảnh LHU Career Fair hiện là ảnh sự kiện kết nối sinh viên, chưa đại diện đầy đủ môi trường làm việc.
- [ ] **P2 – CMS:** quản lý vị trí, địa điểm, loại hình, hạn nộp, trạng thái và form ứng tuyển hoặc liên kết ATS.

### 2.15 Liên hệ `/lien-he`

- [x] Có thông tin công ty, hotline, email, Zalo, Messenger, Facebook, trung tâm và form.
- [ ] **P0 – Backend:** kiểm thử ghi lead thật, thông báo cho người phụ trách và trạng thái lỗi khi dịch vụ không hoạt động.
- [ ] **P1 – Form:** thêm loại nhu cầu, trung tâm quan tâm, khung giờ liên hệ; validation số điện thoại Việt Nam và chống gửi lặp.
- [ ] **P1 – Nội dung:** xác nhận giờ tiếp nhận hotline và SLA trước khi công bố.
- [ ] **P1 – Hình ảnh:** có thể bổ sung ảnh văn phòng/điểm tiếp nhận thật; không bắt buộc nếu bản đồ và thông tin đã rõ.

### 2.16 Chính sách, điều khoản và trang lỗi

- [ ] **P0 – Pháp lý:** pháp chế duyệt `/chinh-sach-bao-mat` theo Nghị định 13/2023/NĐ-CP và quy trình thực tế của VMG.
- [ ] **P0 – Pháp lý:** chốt thời hạn lưu lead, căn cứ xử lý, bên nhận dữ liệu, chuyển dữ liệu, cookie/analytics, quyền chủ thể dữ liệu và kênh yêu cầu.
- [ ] **P0 – Pháp lý:** pháp chế duyệt `/dieu-khoan-su-dung`, sở hữu trí tuệ, giới hạn trách nhiệm và luật áp dụng.
- [ ] **P1 – SEO/HTTP:** route không tồn tại cần trả HTTP 404 thật; SPA hiện chỉ render trang lỗi trên response 200.
- [ ] **P1 – UX:** trang 404 cần gợi ý tìm chương trình, trung tâm, tin tức và liên hệ.

## 3. Checklist frontend còn lại

- [ ] **P0 – Routing:** sửa route Hướng nghiệp/TESOL/XKLĐ và kiểm tra lại toàn bộ CTA, quiz mapping, canonical và redirect.
- [ ] **P0 – Trạng thái lỗi:** bổ sung Error Boundary và giao diện lỗi cho dữ liệu CMS, ảnh, bản đồ và form.
- [ ] **P1 – SPA navigation:** chuyển liên kết nội bộ sang `Link/NavLink` phù hợp để tránh tải lại toàn trang và hỗ trợ active state.
- [ ] **P1 – Code splitting:** lazy-load các route public/admin và tách vendor; bundle JS hiện khoảng 738 KB minified, 201 KB gzip.
- [ ] **P1 – Image pipeline:** chuyển PNG lớn sang WebP/AVIF, tạo nhiều kích thước, `srcset/sizes`, width/height để giảm CLS và chỉ preload ảnh LCP.
- [ ] **P1 – Fonts:** bỏ import Google Fonts trùng; `index.html` đang tải Fraunces không dùng trong khi CSS dùng Manrope + Inter.
- [ ] **P1 – Form UX:** autocomplete/inputMode, validation rõ ràng, focus lỗi, khóa gửi trùng, thông báo thành công có mã tham chiếu và không làm mất dữ liệu khi lỗi.
- [ ] **P1 – Accessibility:** kiểm tra bàn phím, focus visible, heading order, contrast, reduced motion, marquee Hall of Fame, label form, iframe title và screen reader.
- [ ] **P1 – Responsive:** QA 320/375/768/1024/1440 px cho mọi route, không chỉ các trang mới.
- [ ] **P1 – Browser:** kiểm tra Chrome, Edge, Safari iOS và Android Chrome.
- [ ] **P2 – Search:** tìm chương trình, tin tức và trung tâm bằng một ô tìm kiếm chung nếu có nhu cầu vận hành.
- [ ] **P2 – Design system:** gom button/card/form/section patterns thành component, loại class lặp và ghi tài liệu token.

## 4. Checklist backend và cơ sở dữ liệu

- [ ] **P0 – Kết nối:** sửa DNS/URL Supabase, tách cấu hình local/staging/production và xác minh publishable key đúng project.
- [ ] **P0 – Schema as code:** tạo migrations có version cho `products`, `centers`, `news`, `quiz_mapping`, `quiz_mapping_cross_sell`, `leads`, `b2g_inquiries` và storage bucket.
- [ ] **P0 – RLS:** public chỉ được insert các trường cho phép vào form; không được select lead. Chỉ admin đúng role được đọc/sửa/xóa CMS và lead.
- [ ] **P0 – Validation server-side:** chuẩn hóa phone/email, giới hạn độ dài, enum/status, required fields, slug unique và chống payload thừa.
- [ ] **P0 – Chống spam:** CAPTCHA/honeypot, rate limit theo IP/thiết bị, cooldown và theo dõi tỷ lệ spam.
- [ ] **P0 – Lead delivery:** webhook/API sang CRM, retry có hàng đợi, idempotency, log trạng thái giao và cảnh báo khi thất bại.
- [ ] **P0 – Consent evidence:** lưu thời điểm, phiên bản chính sách, nguồn trang, IP/user-agent theo tư vấn pháp lý và payload quiz.
- [ ] **P1 – Tracking fields:** UTM, referrer, landing page, campaign, product/center quan tâm và owner được phân công.
- [ ] **P1 – Newsletter:** bảng subscriber, unique email, consent, unsubscribe, suppression list và chính sách gửi email.
- [ ] **P1 – CMS entities:** thêm `teachers`, `hall_of_fame`, `jobs`, `pages/site_settings`, `media`, `redirects`, `legal_documents` và `audit_logs`.
- [ ] **P1 – Data integrity:** foreign keys, indexes theo slug/status/date, soft delete, created_by/updated_by và timezone nhất quán.
- [ ] **P1 – Backup:** lịch backup, chính sách retention, kiểm thử restore và export định kỳ không phụ thuộc riêng Supabase UI.
- [ ] **P1 – Monitoring:** log lỗi frontend/backend, health check, cảnh báo form fail, webhook fail, storage lỗi và quota.
- [ ] **P2 – Search/index:** full-text search cho sản phẩm/tin và geo query cho trung tâm nếu triển khai tìm gần nhất.

## 5. Checklist CMS/Admin

- [x] Có đăng nhập Supabase, khung admin, CRUD cơ bản sản phẩm/trung tâm/tin, quiz mapping và bảng lead có export CSV.
- [ ] **P0 – Nguồn dữ liệu duy nhất:** public site phải dùng cùng dữ liệu CMS; hiện sản phẩm và nhiều nội dung public vẫn đọc file TypeScript tĩnh.
- [ ] **P0 – Quyền:** vai trò tối thiểu Admin, Editor, Marketing/Lead Viewer; không chỉ kiểm tra “có session”.
- [ ] **P0 – Lỗi thao tác:** mọi create/update/delete/upload phải hiển thị lỗi, không đóng form khi lưu thất bại và có retry.
- [ ] **P0 – Xóa an toàn:** chuyển từ delete cứng sang archive/soft delete, có xác nhận tên bản ghi và khôi phục.
- [ ] **P1 – Workflow:** Draft → Review → Approved → Published → Archived; lưu người duyệt/ngày duyệt và schedule publish/unpublish.
- [ ] **P1 – Preview:** xem trước đúng route public trước khi publish, kể cả mobile.
- [ ] **P1 – SEO fields:** meta title, description, OG image, canonical, noindex, slug và redirect khi đổi slug.
- [ ] **P1 – Media library:** upload có kiểm tra MIME/dung lượng/kích thước, tự nén/crop, alt/caption/credit, phát hiện file trùng và xóa file mồ côi.
- [ ] **P1 – Product editor:** quản lý đầy đủ đối tượng, format, thời lượng, giáo viên, điều kiện đầu vào, cam kết, FAQ, lộ trình, gallery, CTA và quan hệ đối tác.
- [ ] **P1 – Center editor:** địa chỉ, tỉnh/khu vực, phone, giờ, tọa độ, map URL, fanpage, gallery, trạng thái hoạt động và thứ tự.
- [ ] **P1 – News editor:** rich text an toàn, gallery, category, excerpt, author, event date khác publish date, related content và expiry.
- [ ] **P1 – Lead operations:** bộ lọc, tìm kiếm, phân trang, owner, ghi chú, lịch sử trạng thái, chống export dữ liệu quá quyền và mask số điện thoại theo vai trò.
- [ ] **P1 – Import:** script seed/import snapshot đã xác minh cho company, centers, products, legacy news; chạy lặp không tạo bản ghi trùng.
- [ ] **P1 – Audit:** lịch sử thay đổi, người sửa, diff và rollback phiên bản.
- [ ] **P2 – Dashboard:** số lead theo nguồn/trạng thái, tỷ lệ lỗi form và nội dung sắp hết hạn; tránh đưa dữ liệu nhạy cảm không cần thiết lên dashboard.

## 6. Checklist SEO, đo lường và redirect

- [ ] **P0 – Crawlability:** chọn prerender/SSG/SSR cho route public; meta hiện được đổi bằng JavaScript phía client nên bot/social crawler có thể chỉ thấy metadata mặc định.
- [ ] **P1 – Sitemap/robots:** sinh `sitemap.xml`, `robots.txt`; noindex `/admin`, trang preview và route lỗi.
- [ ] **P1 – Canonical:** canonical riêng cho mọi trang, sản phẩm và bài viết.
- [ ] **P1 – Social:** `og:title`, `og:description`, `og:image`, `og:url`, Twitter Card và kiểm tra preview Facebook/Zalo.
- [ ] **P1 – Structured data:** Organization, EducationalOrganization, LocalBusiness cho trung tâm, Course/Product phù hợp, Article, BreadcrumbList và FAQ chỉ cho nội dung public thật.
- [ ] **P1 – Geo:** metadata đúng phạm vi Đồng Nai/Việt Nam và dữ liệu tọa độ đã xác minh; không dùng tuyên bố địa giới cũ không còn phù hợp.
- [ ] **P1 – Redirect:** lập map URL website cũ → URL mới; dùng 301 tại hosting, không chỉ redirect bằng React.
- [ ] **P1 – Search Console:** xác minh domain, gửi sitemap, theo dõi coverage/404/Core Web Vitals.
- [ ] **P1 – Analytics:** chốt GA4/GTM/Meta Pixel hay hệ khác; thiết kế event cho CTA, form start/success/fail, quiz, gọi điện, Zalo, map và product view.
- [ ] **P1 – Consent:** chỉ bật cookie/marketing tracking sau khi pháp lý chốt consent/cookie notice và cơ chế từ chối.

## 7. Checklist hiệu năng

- [ ] **P0 – Ngân sách ảnh:** đặt giới hạn ảnh hero khoảng 150–300 KB, thumbnail 50–120 KB và ảnh gallery lớn theo nhu cầu; không đưa PNG 2 MB lên card.
- [ ] **P1 – Chuyển đổi:** xử lý toàn bộ ảnh sản phẩm lớn sang WebP/AVIF và xóa bản trùng không dùng sau khi đối chiếu import.
- [ ] **P1 – Hall of Fame:** thumbnail riêng, lazy load, không tải cả ảnh gốc khi chỉ xem lưới/marquee.
- [ ] **P1 – Bundle:** route splitting, tách admin khỏi public, đánh giá tree-shaking icon và Supabase client.
- [ ] **P1 – Cache/CDN:** cache immutable cho asset hash, cache ảnh public, nén Brotli/Gzip và CDN image nếu có.
- [ ] **P1 – Core Web Vitals:** đo LCP/CLS/INP trên mobile thật; đặt performance budget trong CI.
- [ ] **P2 – Fonts:** self-host hoặc tối ưu preconnect/preload theo quyết định pháp lý/hiệu năng.

## 8. Checklist bảo mật và pháp lý kỹ thuật

- [ ] **P0 – Supabase:** rà RLS/policies, bucket policy, key rotation nếu từng lộ secret và tách anon key khỏi service-role key.
- [ ] **P0 – Admin:** MFA cho admin, policy mật khẩu, giới hạn đăng nhập, session timeout và quy trình thu hồi tài khoản.
- [ ] **P0 – Dữ liệu cá nhân:** data minimization, phân quyền export, log tải CSV, mã hóa phù hợp, xử lý yêu cầu truy cập/xóa và quy trình sự cố.
- [ ] **P1 – Headers:** CSP, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options và frame-ancestors.
- [ ] **P1 – CMS content:** sanitize rich text/URL, kiểm tra file upload và ngăn open redirect/JavaScript URL.
- [ ] **P1 – Dependency:** chạy audit định kỳ, Dependabot/Renovate và kế hoạch cập nhật có kiểm thử.
- [ ] **P1 – Secrets:** chỉ dùng env tại hosting; không commit `.env`; có checklist rotation và phân quyền project.

## 9. Checklist kiểm thử và nghiệm thu

- [x] `npm run build` thành công ngày 15/09/2026.
- [x] `npm run lint` chạy thành công, còn 1 warning Fast Refresh tại `src/admin/AuthContext.tsx`.
- [ ] **P0 – E2E form:** test thành công/thất bại/retry cho quiz, lead chung, VMP, hợp tác và newsletter trên staging; xác minh bản ghi và thông báo đến đúng đội.
- [ ] **P0 – E2E CMS:** login, quyền, CRUD, upload, preview, publish, archive, export và audit log.
- [ ] **P1 – Unit/integration:** quiz answer key, mapping, lọc catalog, publish gate, slug, fallback CMS và format ngày.
- [ ] **P1 – Link check:** toàn bộ link nội bộ, nguồn cũ, fanpage, map, YouTube, VMP, tuyển dụng và redirect.
- [ ] **P1 – Content QA:** rà lỗi chính tả, Unicode, claim, đối tác, số liệu, giá, ngày, tên người, địa chỉ và CTA theo ma trận nguồn.
- [ ] **P1 – Visual regression:** ảnh chụp desktop/mobile các route chính và trạng thái dữ liệu rỗng/lỗi/loading.
- [ ] **P1 – Accessibility:** axe + kiểm tra thủ công bàn phím/screen reader; mục tiêu WCAG 2.1 AA.
- [ ] **P1 – Performance:** Lighthouse mobile trên staging và thiết bị thật; đặt ngưỡng nghiệm thu.
- [ ] **P1 – 404/redirect:** kiểm tra HTTP status, URL cũ, trailing slash, chữ hoa/thường và slug Unicode.
- [ ] **P2 – Load:** tải đồng thời form/webhook/CMS ở mức chiến dịch dự kiến.

## 10. Checklist tài liệu, CI/CD và vận hành

- [ ] **P0 – README:** thay README mẫu Vite bằng hướng dẫn setup, env, chạy local, build, lint, seed, deploy và khắc phục lỗi thường gặp.
- [ ] **P0 – Database docs:** ERD, migrations, RLS matrix, data dictionary và quy trình backup/restore.
- [ ] **P1 – Environments:** local, staging, production riêng; dữ liệu test không lẫn lead thật.
- [ ] **P1 – CI:** build + lint + test + link/content check + performance budget cho mỗi pull request.
- [ ] **P1 – Deploy:** preview deployment, duyệt nội dung, production deploy, rollback và smoke test sau deploy.
- [ ] **P1 – Domain:** DNS, SSL, www/non-www, redirect domain cũ, email sending domain SPF/DKIM/DMARC nếu gửi mail.
- [ ] **P1 – Monitoring:** uptime, frontend errors, API/Supabase, webhook/CRM và alert có người chịu trách nhiệm.
- [ ] **P1 – Ownership:** phân công rõ Nghiêm/TMĐT, chị Hằng/VMP, OSIR, Khối Kinh doanh, R&D, HR, Pháp chế và kỹ thuật cho từng nhóm dữ liệu.
- [ ] **P1 – Runbook:** quy trình đăng tin, cập nhật trung tâm, mở/đóng sản phẩm, xử lý lead lỗi, gỡ nội dung sai và sự cố dữ liệu cá nhân.

## 11. Thứ tự triển khai đề xuất

### Giai đoạn 1 – Gỡ blocker nội dung và pháp lý

- [ ] Sửa cấu trúc Hướng nghiệp/TESOL/XKLĐ.
- [ ] Chị Hằng duyệt hoặc tạm ẩn nội dung VMP chưa xác nhận.
- [ ] Nghiêm/R&D/OSIR chốt danh sách dữ liệu sản phẩm còn thiếu.
- [ ] Pháp chế duyệt chính sách, điều khoản và consent copy.
- [ ] HR xác nhận hồ sơ giáo viên; vận hành xác nhận dữ liệu 10 trung tâm.

### Giai đoạn 2 – Làm backend/CMS thành nguồn vận hành thật

- [ ] Khôi phục Supabase; tạo migrations, RLS, roles và seed.
- [ ] Đồng bộ public catalog, news, centers, quiz với CMS.
- [ ] Hoàn thiện form → lead → thông báo → webhook CRM → retry/log.
- [ ] Thêm workflow duyệt, preview, media library, audit và soft delete.

### Giai đoạn 3 – Hình ảnh, SEO và hiệu năng

- [ ] Thu thập ảnh thật còn thiếu và duyệt quyền sử dụng.
- [ ] Nén/chuyển định dạng toàn bộ asset; code split route.
- [ ] Prerender/SSR, sitemap, robots, canonical, OG, schema và redirect cũ.
- [ ] Analytics + consent sau khi pháp lý duyệt.

### Giai đoạn 4 – QA và phát hành

- [ ] Test E2E public/admin, security, accessibility, cross-browser và mobile.
- [ ] Chạy content sign-off theo owner.
- [ ] Deploy staging → UAT → production; smoke test lead/CRM/SEO.
- [ ] Bật monitoring, backup và runbook vận hành.

## 12. Dữ liệu cần người phụ trách cung cấp/duyệt

### Nghiêm – Marketing/TMĐT/CRM

- [ ] Tuổi Kindy; thời lượng TOEIC, VSTEP Mastery, SAT 1550+; phạm vi Ngân hàng đề.
- [ ] Tên/giá hiện hành Giao tiếp; trạng thái EduNext; số năm claim IELTS nếu dùng.
- [ ] SLA liên hệ và SLA đề xuất B2B/B2G; mapping owner/webhook CRM.
- [ ] Quy tắc xuất bản giá, ưu đãi, testimonial và Hall of Fame.

### Chị Hằng – VMP

- [ ] Toàn bộ copy, ảnh, quốc gia, chương trình, quy trình, event, form và XKLĐ.

### OSIR/R&D

- [ ] Quy trình thi, lịch/lệ phí/hồ sơ; chi tiết IELTS Mocktest và Cambridge VN055.
- [ ] Điều kiện đầu vào, đầu ra, học lại và dữ liệu lớp cho từng sản phẩm liên quan.

### HR

- [ ] Hồ sơ giáo viên hiện hành, giáo viên Việt Nam, ảnh và quyền công bố.
- [ ] Nội dung tuyển dụng, vị trí đang mở và ảnh employer branding.

### Vận hành trung tâm

- [ ] Phone, giờ, tọa độ, ảnh và trạng thái hoạt động của 10 trung tâm.

### Pháp chế/DPO hoặc đầu mối dữ liệu

- [ ] Pháp nhân, MST, địa chỉ đăng ký, thời hạn lưu, quyền dữ liệu, cookie/tracking, điều khoản và version consent.

## 13. Tiêu chí tối thiểu để được phép go-live

- [ ] Không còn placeholder hoặc claim chưa xác nhận trên route public.
- [ ] Hướng nghiệp, TESOL, XKLĐ và VMP đúng kiến trúc nội dung đã chốt.
- [ ] Pháp lý và consent được duyệt.
- [ ] Tất cả form ghi nhận thật, chống spam, không mất lead và định tuyến đúng.
- [ ] CMS là nguồn dữ liệu thật hoặc các khu vực chưa tích hợp được khóa rõ để tránh admin “sửa nhưng web không đổi”.
- [ ] RLS/role/admin/export dữ liệu được kiểm tra.
- [ ] Ảnh có quyền sử dụng, đúng ngữ cảnh và đạt ngân sách dung lượng.
- [ ] Có sitemap, robots, canonical, OG, redirect URL cũ và crawlable HTML.
- [ ] E2E, accessibility, mobile, browser, Lighthouse và smoke test production đạt ngưỡng đã thống nhất.
- [ ] Có backup, monitoring, rollback và người chịu trách nhiệm vận hành.
