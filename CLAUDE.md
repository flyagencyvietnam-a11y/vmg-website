# CLAUDE.md - Context vận hành cho dự án Website VMG

> File này để Claude Code tự đọc và hiểu bối cảnh VMG trước khi code hoặc sinh nội dung.
> Đặt file này ở root của repo. Không xóa các mục "KHÔNG ĐƯỢC BỊA" - đây là phần quan trọng nhất file.

---

## 0. QUY TẮC QUAN TRỌNG NHẤT: KHÔNG ĐƯỢC BỊA DỮ KIỆN

Đây là quy tắc ưu tiên cao hơn mọi yêu cầu thẩm mỹ khác trong file này.

Khi cần nội dung cụ thể (số liệu, tên khách hàng, trích dẫn, ngày tháng, sự kiện, cam kết dịch vụ) mà **không có trong file này**, KHÔNG được tự sáng tác nội dung nghe hợp lý để lấp chỗ trống. Thay vào đó:

- Dùng placeholder rõ ràng, ví dụ: `[CẦN NỘI DUNG THẬT: tên học viên]`, `[CẦN XÁC NHẬN: ngày khai trương]`
- Hoặc để trống với ghi chú `{/* TODO: chưa có dữ liệu thật, xem mục X file CLAUDE.md */}`
- Không dùng tên người, trích dẫn, ngày tháng, số liệu cụ thể nghe như thật nếu không được liệt kê trong mục 5 (Số liệu đã xác nhận) bên dưới

Lý do: bản build trước đó đã có các lỗi sau vì tự bịa nội dung nghe hợp lý, cần tránh lặp lại:
- Viết trụ cột Ngoại ngữ gồm "Anh, Nhật, Hàn, Trung" (sai - xem mục 2)
- Gắn nhầm "IDP Platinum Partner" cho VMP thay vì đúng sản phẩm IELTS (xem mục 2)
- Dựng testimonial, ngày tháng sự kiện, số liệu nghe rất thật nhưng hoàn toàn không có thật

---

## 1. TỔNG QUAN VMG

**Viet My Group (VMG)** - Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ. 23 năm hoạt động (thành lập 2002-2003), 10 trung tâm tại Đồng Nai và Bình Phước.

**Tagline chính thức**: "VMG - Dẫn Lối Tương Lai"
**3 trụ cột**: Ngoại ngữ - Du học - Hướng nghiệp
**Chứng nhận/đối tác chính thức** (cả 3, không phải chỉ IDP):
- **IDP** - Platinum Partner, gắn với sản phẩm IELTS (KHÔNG phải VMP)
- **British Council** - đối tác đào tạo, đi cùng IDP trong USP "Học đâu thi đó" của IELTS Express Online
- **Cambridge Assessment English** - đối tác khảo thí ủy quyền, mã trung tâm VN055, tổ chức thi từ Starters đến PET/KET+

Khi viết nội dung "đối tác/chứng nhận", LUÔN liệt kê đủ cả 3 (IDP, British Council, Cambridge), không chỉ nhắc IDP.

**Cơ cấu vận hành các mảng** (quan trọng để biết ai sở hữu nội dung nào):
- **Trung tâm** (offline B2C): ESL các độ tuổi, Cambridge, IELTS/VSTEP offline, SAT, Tiếng Trung, B2G
- **OSIR**: TESOL 120H/140H, tổ chức thi Cambridge/IELTS, IELTS Mocktest
- **TMĐT** (do Nghiêm + Kiên phụ trách - đây là team chủ dự án website này): IELTS Fast Track 1.5 (FT15), IELTS Express Online, ESL FlexTrack, TESOL E-PATH, VSTEP E-PATH, Tiếng Anh giao tiếp online, EduNext
- **VMP** (Du học, do chị Hằng phụ trách marketing riêng): Du học hè, Du học dài hạn, Xuất khẩu lao động
- **B2G** (trường học đối tác): thuộc Khối Kinh doanh (GDKV2), KHÔNG thuộc Marketing/TMĐT

---

## 2. SỰ THẬT ĐÃ XÁC NHẬN (dùng đúng, đừng đổi)

| Chủ đề | Sự thật đúng |
|---|---|
| Ngôn ngữ trụ cột "Ngoại ngữ" | CHỈ tiếng Anh (mọi độ tuổi) + tiếng Trung (HSK). KHÔNG có Nhật/Hàn ở trụ cột này. |
| Nhật/Hàn | Chỉ tồn tại trong mảng Xuất khẩu lao động (XKLĐ) thuộc VMP/Du học, không liên quan trụ cột Ngoại ngữ. |
| Đối tác/chứng nhận | VMG là đối tác của CẢ BA: IDP (Platinum Partner), British Council, và Cambridge Assessment English (mã VN055). Cả ba đều gắn với sản phẩm IELTS/khảo thí, KHÔNG phải VMP. VMP là trụ cột Du học, không giữ các danh hiệu này. |
| "Cam kết đầu ra" | Có thật nhưng khác nhau theo từng sản phẩm cụ thể, không phải một câu cam kết chung: IELTS Express Online cam kết đầu ra từng cấp (học không đạt, học lại miễn phí); NextGen IELTS cam kết IELTS 5.5/6.5; ESL Kids cam kết theo cấp Cambridge. KHÔNG gắn "cam kết đầu ra" chung chung cho một card sản phẩm mơ hồ không rõ tên. |
| Hướng nghiệp | Trụ cột này CHƯA có chương trình B2C cụ thể được xác nhận ngoài các hoạt động trải nghiệm theo mùa. Viết trang này dạng "định hướng, sắp ra mắt", KHÔNG liệt kê chương trình cụ thể như đã có sẵn. |
| Số liệu học viên | Con số 42.000 gắn với học viên B2G trong hơn 200 trường đối tác, KHÔNG phải tổng học viên B2C toàn hệ thống 23 năm. Không dùng số này làm headline "học viên đã đồng hành" nếu ý muốn nói B2C. Nếu cần một con số tổng, đánh dấu `[CẦN XÁC NHẬN SỐ LIỆU]` thay vì đoán. |
| B2G | Route lead sang Khối Kinh doanh, trang này chỉ làm nhiệm vụ marketing/thu lead, không xây tính năng quản lý quan hệ B2G. |
| VMP | Nội dung khu vực Du học cần chị Hằng (phụ trách marketing VMP) xác nhận trước khi publish thật, vì đây là domain nội dung của team chị ấy. |
| Testimonial, tên khách hàng, ngày sự kiện cụ thể | KHÔNG CÓ dữ liệu thật nào được cung cấp trong file này. Mọi nội dung dạng này trong bản trước đều là dựng, cần thay bằng placeholder rõ ràng. |

---

## 3. SITEMAP ĐẦY ĐỦ

```
1. Trang chủ
   - Quiz cá nhân hóa (mặc định hiển thị) + nút "Xem toàn bộ chương trình" (ngang hàng, không phải link phụ)
   - Trust bar, 3 trụ cột, học online, testimonials (placeholder), tin tức, đối tác

2. Ngoại ngữ
   2.1 Theo độ tuổi: Mầm non (3-5) / Thiếu nhi (6-11) / Thiếu niên (12-16)
   2.2 Giao tiếp người lớn
   2.3 Luyện thi & chứng chỉ: IELTS / TOEIC / VSTEP / Cambridge
   2.4 VMG TESOL (offline)
   2.5 Đào tạo doanh nghiệp (B2B)

3. Du học - VMP by VMG
   3.1 Giới thiệu VMP
   3.2 Du học ngắn hạn (hè): Mỹ / Úc / Canada / Singapore / Philippines
   3.3 Du học dài hạn: Mỹ / Úc / Canada / Đài Loan
   3.4 Xuất khẩu lao động: Hàn Quốc / Nhật Bản / Đài Loan
   3.5 Sự kiện (VD: Triển Lãm Du Học Quốc Tế)
   [Cần chị Hằng duyệt nội dung trước khi publish thật]

4. Hướng nghiệp
   - Trang định hướng + "sắp ra mắt", KHÔNG liệt kê chương trình cụ thể

5. Học online (TMĐT) - trang catalog + trang chi tiết từng sản phẩm
   - FT15 (IELTS Speaking Fast Track 1.5)
   - IELTS Express Online
   - ESL FlexTrack
   - VSTEP E-PATH
   - TESOL E-PATH
   - EduNext
   Mỗi sản phẩm: mô tả, đối tượng, giá (nếu có, nếu chưa chốt ghi `[CẦN XÁC NHẬN GIÁ]`), cam kết đầu ra riêng (nếu sản phẩm đó có), CTA phù hợp

6. Hệ thống trung tâm
   - Danh sách + bản đồ 10 trung tâm (Đồng Nai trước, Bình Phước sau)

7. Trường học & Doanh nghiệp (B2G/B2B)
   - Giới thiệu chương trình + form đăng ký hợp tác
   - CHỈ thu lead, định tuyến sang Khối Kinh doanh

8. Về VMG
   - Lịch sử, đối tác/chứng nhận (IDP + British Council + Cambridge, tất cả gắn với IELTS/khảo thí, không phải VMP)

9. Đội ngũ giáo viên
   - Trang giới thiệu giáo viên (GVNN + GVVN), nhấn mạnh tỷ lệ GVNN theo từng sản phẩm (VD: FT15 100% GVNN, GT 50% GVNN) vì đây là USP đang dùng trong ads
   - [CẦN NỘI DUNG THẬT: hồ sơ/ảnh giáo viên cụ thể - hiện chưa có dữ liệu]

10. Hall of Fame - Vinh danh học viên
    - Đây là hoạt động đã nằm trong kế hoạch UGC của Marketing (không phải ý tưởng mới), mục đích vinh danh học viên đạt thành tích (điểm IELTS/Cambridge cao, câu chuyện tiến bộ...)
    - [CẦN NỘI DUNG THẬT: câu chuyện/thành tích học viên cụ thể - hiện chưa có dữ liệu, KHÔNG dựng câu chuyện giả]

11. Tin tức & sự kiện
12. Tuyển dụng
13. Liên hệ
14. Trang pháp lý (Chính sách bảo mật & xử lý dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP, Điều khoản sử dụng)
```

---

## 4. LUỒNG QUIZ CÁ NHÂN HÓA (đã implement đúng ở bản trước, giữ nguyên logic)

```
Câu hỏi mở đầu: "Bạn đang tìm chương trình học cho ai?"
├── Con của tôi → hỏi độ tuổi (3-5/6-11/12-16) → hỏi mục tiêu (giao tiếp/Cambridge-Quốc tế/nền tảng du học)
├── Bản thân tôi → hỏi mục tiêu (công việc/thi IELTS-TOEIC-VSTEP/chứng chỉ TESOL) → hỏi hình thức (trung tâm/online)
├── Tìm hiểu du học → hỏi giai đoạn (mới tìm hiểu/cần hồ sơ/tìm học bổng)
└── Trường học/doanh nghiệp → route thẳng vào form B2G/B2B, KHÔNG hỏi thêm
```

Bảng ánh xạ câu trả lời sang chương trình gợi ý (`quiz_mapping`) phải là dữ liệu tách riêng (JSON/config file hoặc sau này là bảng database), KHÔNG hardcode cứng trong logic hiển thị, vì tên sản phẩm và giá còn thay đổi.

---

## 5. BRAND TOKENS

```css
--color-brand: #be202f;       /* đỏ VMG - chủ đạo cho CTA, header, hero */
--color-brand-dark: #921824;
--color-gold: #8b672a;        /* vàng đồng - điểm nhấn phụ */
--color-gold-soft: #cba656;
--color-cream: #fbf7ef;       /* nền phụ, KHÔNG dùng đỏ làm nền toàn trang */
--color-lemon: #e9e24a;
--color-plum: #3d2a6d;

font-display: "Manrope"   /* tiêu đề */
font-sans: "Inter"        /* nội dung */
```

Không áp tỷ lệ màu 60% đỏ literal lên nền toàn trang, chỉ dùng đỏ/vàng làm điểm nhấn (CTA, header, hero, thẻ nổi bật), nền tổng thể ưu tiên trắng/cream để dễ đọc.

---

## 5B. DỮ LIỆU SẢN PHẨM THẬT - DÙNG ĐỂ LÀM TRANG CHI TIẾT

### 6 sản phẩm TMĐT (mục 5 sitemap) - dữ liệu đầy đủ nhất, ưu tiên làm trang chi tiết trước

| Sản phẩm | Mã | Giá niêm yết | Giá hiện tại | Thời lượng | Giáo viên | Cam kết đầu ra |
|---|---|---|---|---|---|---|
| IELTS Speaking Fast Track 1.5 | FT15 | 24.400.000đ | 14.300.000đ (online) / Early bird 8 suất đầu: 12.300.000đ | 12 tuần, 120h | 100% GVNN | Tăng 1.0-1.5 band Speaking, không đạt học lại miễn phí |
| IELTS Express Online | IE | 9.700.000 - 19.900.000đ (7 cấp IE1-IE7) | Tùy cấp độ, KM 10% | 3 tháng/cấp, 36h | GVNN + GVVN | Đầu ra từng cấp, không đạt học lại miễn phí. Đối tác IDP + British Council - "Học đâu thi đó" |
| VSTEP Mastery B1/B2 | VSTEP | 3.500.000đ | Không khuyến mãi | Chưa ghi rõ | Có GV kèm | Đủ kiến thức thi kỳ gần nhất |
| Tiếng Anh Giao Tiếp | GT | 6.700.000đ | `[CẦN XÁC NHẬN GIÁ HIỆN TẠI - KM 35% chỉ áp dụng đến hết T6, giá sau đó chưa chốt]` | 2 tháng, 36h, 5 cấp độ | 50% GVNN + 50% GVVN | Xóa rào cản sợ nói tiếng Anh. **Lưu ý: tên thương mại "GT" đang cần đổi, KHÔNG dùng tên nội bộ "E-Plus" khi hiển thị công khai** |
| TESOL E-PATH | TESOL | 9.900.000đ | 7.920.000đ (KM 20%) | 4-8 tuần, 120h, self-paced + livestream hàng tuần | Trainer VMG + INTESOL | Chứng chỉ TESOL 120h INTESOL, kiểm định ALAP UK |
| EduNext (tiếng Anh cho GV bộ môn) | EDU | 9.900.000đ | 7.920.000đ (KM 20%) | 2-3 tháng tự học | Online 100% | `[CẦN XÁC NHẬN - sản phẩm còn đang hoàn thiện, chưa có 5 học viên thật/testimonial]` |

### Sản phẩm offline tại trung tâm (mục 2 sitemap)

| Nhóm | Sản phẩm | Đối tượng | Ghi chú |
|---|---|---|---|
| ESL Mầm non | Kindy - E-Pioneer | 3-5 tuổi | Core Product |
| ESL Thiếu nhi | Kids - E-Contender/E-Genius | 6-11 tuổi | Cam kết đầu ra theo cấp Cambridge Starters/Movers/Flyers |
| ESL Thiếu niên | Teens - NextGen IELTS | 12-16 tuổi | Lộ trình dài đến lớp 11 thi IELTS, cam kết IELTS 5.5/6.5 |
| ESL Người lớn | Adults - ePlus | Người lớn | `[LƯU Ý: sản phẩm đang ở giai đoạn Decline, cần confirm với R&D trước khi đầu tư nội dung/ads cho sản phẩm này]` |
| Bán trú hè | Summer School | Cấp 1 | Chủ đề mới mỗi năm, có dã ngoại hàng tuần |
| Luyện thi | IELTS Express, IELTS Exam Focus, IELTS Speaking Booster 1.5 | Teens/Adults | 3 sản phẩm khác nhau, mức cam kết khác nhau - xem chi tiết mục "sự thật đã xác nhận" |
| Luyện thi THPT | A01-D01 (Toán/Lý/Anh/Văn) | Teens | Testing/Pilot, bám sát SGK |
| SAT | SAT 1050/1250/1400/1550+ | Teens | 4 cấp độ theo mục tiêu điểm |
| Tiếng Trung | Giao tiếp + luyện thi HSK | Adults/Teens | Testing/Pilot |
| TESOL offline | TESOL 120H, TESOL 140H | Giáo viên | KPI Owner: OSIR |
| VSTEP offline | VSTEP Express | - | Không cam kết đầu ra (khác VSTEP Mastery) |
| Khảo thí (OSIR) | Thi Cambridge, thi IELTS, IELTS Mocktest | - | Thu phí thi, không phải khóa học |

### Du học & XKLĐ (VMP) - cần chị Hằng duyệt nội dung trước khi publish

| Loại | Điểm đến |
|---|---|
| Du học hè | Mỹ, Úc, Canada, Singapore, Philippines |
| Du học dài hạn | Mỹ, Úc, Canada, Đài Loan, (Công giáo - coming soon) |
| Xuất khẩu lao động | Hàn Quốc, Nhật Bản, Đài Loan |

**Ghi chú quan trọng**: Nhật/Hàn CHỈ xuất hiện ở đây (Xuất khẩu lao động, thuộc VMP), không liên quan gì tới trụ cột Ngoại ngữ.

---

## 6. DATA MODEL (khi tích hợp backend/CMS)

- `products`: tên, mã sản phẩm, mô tả, đối tượng, giá niêm yết, giá khuyến mãi, hạn khuyến mãi, hình thức, cam kết đầu ra (riêng theo từng sản phẩm, có thể null), loại CTA
- `centers`: tên, địa chỉ, tỉnh, điện thoại, giờ hoạt động, tọa độ
- `news`: tiêu đề, ngày, danh mục, nội dung, ảnh, trạng thái
- `quiz_mapping`: tổ hợp câu trả lời → chương trình gợi ý, sửa được không cần code
- `leads`: họ tên, SĐT, nguồn, câu trả lời quiz (JSON), thời gian, trạng thái
- `b2g_inquiries`: tên trường/công ty, người liên hệ, SĐT, nhu cầu, thời gian
- `teachers`: tên, ảnh, môn/sản phẩm giảng dạy, bằng cấp/chứng chỉ, mô tả ngắn, trung tâm công tác (dữ liệu thật chưa có, xem mục 5B)
- `hall_of_fame`: tên học viên, thành tích (điểm số/câu chuyện), ảnh, sản phẩm/chương trình liên quan, ngày ghi nhận (dữ liệu thật chưa có, đây là một phần của kế hoạch UGC đã có sẵn của phòng Marketing, không phải nội dung tự dựng)

---

## 7. YÊU CẦU KỸ THUẬT

- Form thu thập thông tin cá nhân (quiz, liên hệ, B2G) phải có checkbox đồng ý + link Chính sách bảo mật (Nghị định 13/2023/NĐ-CP) - đã có ở bản trước, giữ nguyên
- SEO: trang phải crawl được, meta title/description riêng từng trang, geo-metadata đúng Đồng Nai/Việt Nam
- Responsive, ưu tiên mobile
- Dữ liệu lead cần có cơ chế export/webhook ra ngoài (không nhốt trong database nội bộ của công cụ build), vì công ty có kế hoạch CRM riêng

---

## 8. NGOÀI PHẠM VI (không làm ở bản hiện tại)

- Thanh toán trực tuyến thật
- Đa ngôn ngữ (song ngữ Anh)
- Trang riêng cho từng trung tâm
- Nội dung chi tiết cho trụ cột Hướng nghiệp (chờ xác nhận sản phẩm)

---

## 9. KHI THIẾU THÔNG TIN

Nếu cần viết nội dung không có trong file này (giá cụ thể, testimonial thật, số liệu thật, ngày sự kiện thật), hãy dừng lại, dùng placeholder theo mục 0, và liệt kê rõ trong phần trả lời rằng đây là chỗ cần Nghiêm (Trưởng phòng Marketing, TMĐT & CRM) cung cấp dữ liệu thật trước khi publish.
