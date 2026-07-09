# VMG Hero Section - "Dẫn Lối Tương Lai" (Ascending Journey Blocks)

> File spec này mô tả concept, layout, hành vi tương tác và dữ liệu cho hero section trang chủ vmgenglish.edu.vn. Dùng file này làm brief chính khi implement bằng Claude Code. Không tạo lại luồng chọn đối tượng song song - 4 khối trong hero này CHÍNH LÀ điểm vào của quiz branching đã định nghĩa trong CLAUDE.md (nhánh child/self/study abroad/B2G). Nếu tên nhánh trong CLAUDE.md khác với 4 nhãn dưới đây, ưu tiên map lại theo CLAUDE.md, không tạo nhánh mới.

---

## 1. Ý tưởng cốt lõi

Hero visualize hành trình trưởng thành của một học viên VMG qua 4 giai đoạn, thể hiện bằng 4 khối (block) xếp cạnh nhau, **chiều cao tăng dần từ trái sang phải**. Chiều cao tăng dần mang ý nghĩa **thời gian/hành trình** (càng về sau càng đi xa hơn trên con đường), KHÔNG mang ý nghĩa "quan trọng hơn" - cần giữ đúng tinh thần này khi viết copy đi kèm để tránh hiểu nhầm.

4 giai đoạn (thứ tự cố định, trái sang phải):

| Thứ tự | Stage ID | Nhãn hiển thị | Đối tượng | Map vào quiz branch |
|---|---|---|---|---|
| 1 | `mamnon` | Mầm non | Gia đình có con nhỏ (#Ta1/#Ta4) | branch = "child" |
| 2 | `genz` | GenZ | Học sinh/Sinh viên (#Ta3) | branch = "self" (segment trẻ) |
| 3 | `dilam` | Đi làm | Người đi làm (#Ta2) | branch = "self" (segment người lớn) |
| 4 | `duhoc` | Du học | Có nhu cầu du học/XKLĐ | branch = "study_abroad" |

> Lưu ý: nếu B2G cần xuất hiện trong hero, cân nhắc thêm entry point riêng (không phải 1 trong 4 khối này, vì B2G không phải hành trình cá nhân theo tuổi) - xem mục 7 (Vấn đề mở).

---

## 2. Layout - Desktop

- Container: full-width, nền tối `#0C0C0E`, không dùng ảnh nền tĩnh - phần nền là màu phẳng (flat), không cần dựng path/particle phức tạp (đã bỏ concept đó).
- Headline góc trên trái: "DẪN LỐI" (trắng) + "TƯƠNG LAI" (đỏ VMG `#BE202F`), font Manrope/Inter bold theo brand token.
- Subheadline nhỏ dưới headline: "Trỏ vào từng giai đoạn để xem hành trình" (đổi thành "Chạm để xem hành trình" ở bản mobile).
- 4 khối xếp `display: flex; align-items: flex-end; gap: 6-8px` bên dưới hoặc bên phải headline (tùy bố cục cuối, có thể để headline riêng phía trên, 4 khối chiếm full-width bên dưới).
- Chiều rộng 4 khối bằng nhau (`flex: 1 1 0`), chiều cao tăng dần theo cấp bậc, ví dụ tỷ lệ tham khảo: 150px / 185px / 220px / 255px (tỷ lệ chính xác do dev/designer tinh chỉnh theo viewport, miễn giữ đúng thứ tự tăng dần).
- Mỗi khối bo góc trên (`border-radius: 8px 8px 0 0`), không bo góc dưới (khối "đứng" trên baseline chung).

## 3. Layout - Mobile (< 768px)

- Đổi hướng xếp: `flex-direction: column`, 4 khối xếp dọc, full-width mỗi khối.
- **Bỏ hiệu ứng chiều cao tăng dần** ở mobile - dùng chiều cao bằng nhau cho cả 4 khối (ví dụ 120-140px). Lý do: xếp dọc + cao thấp lẫn lộn sẽ không còn đọc được ẩn dụ "hành trình", chỉ gây rối bố cục.
- Giữ nguyên thứ tự trên → dưới đúng theo bảng ở mục 1 (mầm non trên cùng, du học dưới cùng) để không mất mạch truyện.
- Label luôn hiển thị sẵn (không ẩn chờ tap), vì mobile không có hover - tránh yêu cầu người dùng tap 2 lần (1 lần xem, 1 lần chọn).

---

## 4. Component structure (gợi ý cho Claude Code)

```
<HeroJourney>
  <HeroHeadline />
  <JourneyBlockList>
    <JourneyBlock stageId="mamnon" ... />
    <JourneyBlock stageId="genz" ... />
    <JourneyBlock stageId="dilam" ... />
    <JourneyBlock stageId="duhoc" ... />
  </JourneyBlockList>
</HeroJourney>
```

### Props của `JourneyBlock`
| Prop | Kiểu | Ghi chú |
|---|---|---|
| `stageId` | string | Khớp bảng mục 1 |
| `label` | string | Nhãn hiển thị tiếng Việt |
| `heightDesktop` | number (px) | Chiều cao riêng theo thứ tự tăng dần, chỉ áp dụng desktop |
| `imageSrc` | string | Đường dẫn ảnh, xem mục 5 về placeholder |
| `quizBranchTarget` | string | Branch id để điều hướng khi click, đối chiếu CLAUDE.md |
| `order` | number | 1-4, dùng cho responsive re-order nếu cần |

### Data mẫu (đặt trong file config riêng, không hardcode trong component)
```json
[
  { "stageId": "mamnon", "label": "Mầm non", "heightDesktop": 150, "imageSrc": "/assets/hero/stage-mamnon.jpg", "quizBranchTarget": "child" },
  { "stageId": "genz", "label": "GenZ", "heightDesktop": 185, "imageSrc": "/assets/hero/stage-genz.jpg", "quizBranchTarget": "self_young" },
  { "stageId": "dilam", "label": "Đi làm", "heightDesktop": 220, "imageSrc": "/assets/hero/stage-dilam.jpg", "quizBranchTarget": "self_adult" },
  { "stageId": "duhoc", "label": "Du học", "heightDesktop": 255, "imageSrc": "/assets/hero/stage-duhoc.jpg", "quizBranchTarget": "study_abroad" }
]
```

---

## 5. Ảnh - trạng thái placeholder (QUAN TRỌNG - đọc trước khi code)

**Ảnh thật CHƯA được tạo tại thời điểm viết spec này.** Claude Code cần dựng UI với placeholder trước, không chờ ảnh:

- Placeholder: nền gradient màu tối theo brand (`linear-gradient(180deg, #3a2418, #1c1210)` cho khối đầu, đậm dần/ấm dần về khối cuối theo hướng `#8B672A`), icon trung tính ở giữa (ví dụ icon "photo" hoặc "user") để đánh dấu chỗ chờ ảnh, không dùng ảnh stock tạm.
- Khi ảnh thật sẵn sàng, chỉ cần thay `imageSrc` trong config, component không cần sửa logic.
- Ảnh thật sẽ là ảnh chân dung dọc (portrait), khuôn mặt nằm ở 2/3 trên khung hình, chừa khoảng trống 1/3 dưới cho overlay + label. Dùng `object-fit: cover; object-position: top center` để giữ mặt trong khung dù chiều cao khối khác nhau giữa các block.
- Ảnh không gắn tên/testimonial cụ thể - đây là nhân vật đại diện chung chung theo anti-fabrication ruleset đã chốt, không phải học viên thật có tên.

---

## 6. Animation & tương tác

| Trạng thái | Hành vi |
|---|---|
| Load | Không cần animation phức tạp - fade-in nhẹ toàn khối (~300ms), tránh hiệu ứng vẽ đường/particle đã bỏ ở concept trước |
| Hover (desktop) | `transform: translateY(-6px)`, transition 0.25s ease. Overlay tối (`linear-gradient(0deg, rgba(0,0,0,0.75), transparent 55%)`) giảm alpha xuống ~0.35 để lộ ảnh rõ hơn. Label tăng độ đậm/sáng |
| Tap (mobile) | Không có hover thật - overlay giữ mức alpha thấp cố định sẵn (không chờ tương tác), label luôn hiện |
| Click/Tap chọn | Điều hướng vào `quizBranchTarget` tương ứng, dùng đúng cơ chế quiz đã có, không tạo modal/luồng riêng |
| `prefers-reduced-motion` | Bỏ `translateY` transition, giữ nguyên overlay tĩnh ở mức đã hover (0.35) để nội dung vẫn đọc được rõ mà không cần animation |

Touch target tối thiểu: dù khối hẹp trên mobile, đảm bảo vùng chạm mỗi khối ≥ 44px chiều cao thực tế.

---

## 7. Vấn đề mở - cần quyết định trước hoặc trong lúc build

- B2G có cần xuất hiện trong hero này không, hay để riêng ở 1 CTA/section khác (vì B2G đi qua GDKV, không phải hành trình cá nhân theo tuổi như 4 khối trên).
- Tỷ lệ chiều cao chính xác (150/185/220/255px chỉ là gợi ý) cần chỉnh theo kích thước màn hình thực tế khi có màn hình test.
- Copy chính xác cho headline/subheadline cần confirm với chị Hằng nếu có nhắc đến Du học (VMP) theo quy tắc approval đã có.
- Xác nhận lại tên các quiz branch thật trong CLAUDE.md hiện tại (`child` / `self` / `study_abroad` / `b2g` hay tên khác) để map đúng, tránh Claude Code tự đặt tên branch mới trùng lặp logic cũ.

---

*File này thay thế các bản concept "path of light" (con đường ánh sáng + waypoint) và "merged scene photo" đã thảo luận trước đó - không dùng song song để tránh nhầm lẫn khi build.*
