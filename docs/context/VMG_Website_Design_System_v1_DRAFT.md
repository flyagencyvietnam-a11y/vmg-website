# VMG Website Design System (DRAFT v1)
> Nguồn: Hệ thống hóa từ prototype Stitch (HTML/Tailwind) do Nghiêm cung cấp, 08/07/2026
> Trạng thái: **DRAFT - có mâu thuẫn chưa giải quyết với Brand Guideline chính thức, xem mục 0**

---

## 0. CẢNH BÁO - CẦN CHỐT TRƯỚC KHI DÙNG

Prototype Stitch KHÔNG dùng đúng mã màu và font trong `VMG_Brand_Identity_Context.md`. Ba việc cần chốt trước khi design system này được coi là "chính thức":

1. **Màu**: dùng bảng màu Stitch (Material Design 3 tự sinh) hay đổi lại đúng `#be202f` / `#8b672a` theo guideline gốc?
2. **Font**: dùng Be Vietnam Pro (như Stitch) hay bộ VMG Font (Brown) hay Manrope/Inter? Ba nguồn đang mâu thuẫn nhau.
3. **Tỷ lệ màu 60/30/5/5**: guideline bắt buộc, Stitch không tuân thủ (thêm màu tertiary hồng không có trong guideline). Cần quyết định có giữ tertiary hay bỏ.

Toàn bộ token bên dưới lấy nguyên từ code Stitch, chưa được hiệu chỉnh theo guideline. Coi đây là "nguyên liệu thô đã hệ thống hóa", không phải "đã duyệt".

---

## 1. MÀU SẮC (nguyên trạng từ Stitch)

### Core roles
| Token | Hex | Vai trò |
|---|---|---|
| primary | `#af101a` | Màu chủ đạo (nút CTA, headline nhấn, header active) |
| primary-container | `#d32f2f` | Biến thể primary cho card/nền |
| surface-tint | `#ba1a20` | Overlay tint |
| on-primary | `#ffffff` | Chữ trên nền primary |

### Secondary (vàng - KHÔNG khớp VMG Gold #8b672a)
| Token | Hex |
|---|---|
| secondary | `#795900` |
| secondary-container | `#fec330` |
| secondary-fixed | `#ffdfa0` |
| secondary-fixed-dim | `#f8bd2a` |

### Tertiary (hồng/magenta - KHÔNG có trong guideline VMG)
| Token | Hex |
|---|---|
| tertiary | `#a22456` |
| tertiary-container | `#c23e6e` |
| tertiary-fixed | `#ffd9e1` |
| tertiary-fixed-dim | `#ffb1c5` |

### Surface / neutral
| Token | Hex |
|---|---|
| surface (nền chính, cream) | `#fbf9f4` |
| surface-container-lowest | `#ffffff` |
| surface-container-low | `#f5f3ee` |
| surface-container | `#f0eee9` |
| surface-container-high | `#eae8e3` |
| surface-container-highest | `#e4e2dd` |
| on-surface (chữ chính) | `#1b1c19` |
| on-surface-variant (chữ phụ) | `#5b403d` |
| outline | `#8f6f6c` |
| outline-variant | `#e4beba` |

### System
| Token | Hex |
|---|---|
| error | `#ba1a1a` |
| on-error | `#ffffff` |
| error-container | `#ffdad6` |

---

## 2. TYPOGRAPHY (nguyên trạng từ Stitch)

**Font family:** Be Vietnam Pro (áp cho toàn bộ - cần đối chiếu mục 0)

| Token | Size / Line-height | Weight | Dùng cho |
|---|---|---|---|
| display-xl | 64px / 72px, tracking -0.02em | 800 | Hero H1 |
| headline-lg | 40px / 48px, tracking -0.01em | 700 | H2 section |
| headline-lg-mobile | 32px / 40px | 700 | H2 section (mobile) |
| headline-md | 24px / 32px | 700 | H3 card title |
| body-lg | 18px / 28px | 400 | Hero subtext, lead paragraph |
| body-md | 16px / 24px | 400 | Body text chuẩn |
| label-bold | 14px / 20px | 700 | Nav link, button label |
| label-sm | 12px / 16px | 500 | Caption, tag, date |

**Quy tắc case:** Code dùng UPPER CASE khá rộng rãi (H1, nhiều button, label). Guideline gốc yêu cầu upper case "tiết chế, chỉ vùng text nhỏ" → cần rà lại nếu muốn đúng tinh thần guideline.

---

## 3. SPACING & LAYOUT

| Token | Giá trị | Dùng cho |
|---|---|---|
| base | 8px | Đơn vị gốc |
| gutter | 24px | Khoảng cách giữa cột/grid item |
| container-padding | 24px | Padding trái/phải container |
| section-gap-mobile | 64px | Khoảng cách giữa section (mobile) |
| section-gap-desktop | 120px | Khoảng cách giữa section (desktop) |

**Container max-width:** `1280px`, căn giữa (`mx-auto`)

**Grid pattern:**
- Feature bento: 4 cột desktop / 1 cột mobile
- Program cards: 4 cột desktop / 1 cột mobile
- News cards: 3 cột desktop / 1 cột mobile
- Footer: 4 cột desktop / 1 cột mobile

---

## 4. BORDER RADIUS

| Token | Giá trị | Dùng cho |
|---|---|---|
| default | 4px | Yếu tố nhỏ |
| lg | 16px | - |
| xl | 24px | Card chuẩn (`rounded-2xl` = 32px thực tế trong code, xem lưu ý) |
| 2xl | 32px | Card lớn, hero shape |
| full | 9999px | Button pill, avatar tròn |

**Lưu ý:** Code thực tế dùng `rounded-2xl` (32px) cho hầu hết card, `rounded-3xl` cho newsletter block, và bo góc rất lớn tùy chỉnh (`rounded-[60px]` mobile / `rounded-[120px]` desktop) riêng cho khối hình hero - đây là "asymmetric-mask" custom, không phải token chuẩn.

---

## 5. COMPONENT PATTERNS

### 5.1 Header (Top App Bar)
- Sticky, `z-50`, nền `surface`
- Logo text bên trái, nav giữa, CTA button bên phải
- Active nav link: màu primary + border-bottom 2px
- Scroll behavior: giảm padding (py-4 → py-2) và thêm shadow khi scroll > 50px

### 5.2 Buttons
| Loại | Style |
|---|---|
| Primary CTA | Nền primary, chữ trắng, pill (rounded-full), padding 24px/10-16px |
| Outline CTA (hero) | Nền trắng, border 2px primary, chữ primary, hover đảo màu (nền primary/chữ trắng) |
| Icon circle | Vòng tròn 40-48px, border 1px, icon giữa, hover đổi nền |

Tất cả button đều là pill shape (rounded-full) - không có button vuông/bo nhẹ trong toàn bộ prototype.

### 5.3 Card - Bento Feature (4 khối trang chủ)
- Nền màu đặc (primary / secondary-fixed / white / secondary-container) luân phiên - mỗi card 1 màu khác nhau
- Icon lớn (Material Symbols) ở trên, tiêu đề, mô tả, nút mũi tên tròn góc dưới phải
- Hover: `scale-[1.02]`

### 5.4 Card - Program (Chương trình học)
- Ảnh full-width phía dưới, text (tên chương trình + độ tuổi) phía trên nền màu đặc
- Hover: ảnh scale 110%, transition 700ms
- Badge mũi tên tròn nổi trên ảnh (bottom-right)

### 5.5 Card - News
- Ảnh trên (h-64, rounded-2xl), tag badge nổi góc trên trái
- Ngày tháng, tiêu đề, icon mũi tên tròn dưới
- Hover: ảnh scale 105%, tiêu đề đổi màu primary

### 5.6 Stats block
- Nền primary đặc, số liệu lớn (48px, font-black), label uppercase nhỏ bên dưới
- Chia cột bằng border-right (trừ cột cuối)

### 5.7 Newsletter/CTA block
- Nền màu đặc (secondary-fixed-dim), bo góc 3xl, layout 2 cột (text trái, form phải)
- Icon trang trí lớn, mờ, đặt góc dưới trái (overflow ra ngoài khối)

### 5.8 Footer
- Nền primary đặc, chữ trắng
- 4 cột: brand + social icons | liên kết | chi nhánh (có icon location) | liên hệ (có icon phone/mail)
- Bottom bar riêng: copyright + policy links, border-top mờ

---

## 6. MOTIF & DECORATIVE PATTERNS

| Motif | Mô tả | Dùng ở đâu |
|---|---|---|
| Floating asset | Icon lớn, opacity thấp, animation `float` (translateY + rotate, 6s loop) | Hero, section background, newsletter |
| Asymmetric mask | `clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)` - cắt góc dưới trái hình hero | Hero image only |
| Layered shape | Khối màu primary mờ, xoay nhẹ (-3deg), lệch vị trí phía sau khối chính - tạo độ sâu | Hero background |
| Oversized icon overlay | Icon Material Symbols phóng to (100-300px), opacity 10-20%, đặt góc section | Program section, stats section |
| Icon style | Material Symbols Outlined, biến thể `FILL 1` cho icon nhấn (trạng thái active/nổi bật) | Xuyên suốt |

**Nhận xét khách quan:** Toàn bộ motif (floating icon xoay, blob shape bất đối xứng, bento grid nhiều màu) là ngôn ngữ thiết kế "playful SaaS/Material 3" - hiện đại, năng động, nhưng chưa rõ có khớp với định vị "gần 20 năm uy tín, ấm áp sang trọng" mà guideline VMG Gold theo đuổi hay không. Đây là lựa chọn chiến lược cần bạn cân nhắc, không phải hệ quả tất yếu của brand hiện có - đặc biệt vì guideline gốc dùng tông màu navy sang trọng cho không gian vật lý (quầy lễ tân), khá khác tinh thần "vui tươi nhiều màu" của bản Stitch này.

---

## 7. NỘI DUNG PLACEHOLDER CẦN THAY (đã đối chiếu fact)

| Vị trí trong code | Nội dung hiện tại | Vấn đề |
|---|---|---|
| Stats section | "20+ NĂM KINH NGHIỆM" | VMG gần 23 năm |
| Stats section | "3 CHI NHÁNH TOÀN QUỐC" | VMG có 10 trung tâm, chỉ tại Đồng Nai & Bình Phước |
| Stats section | "50.000+ HỌC VIÊN ĐÃ ĐỒNG HÀNH" | Số liệu dạng dễ conflate B2G/B2C, cần verify trước khi publish |
| Footer | Địa chỉ Quận 1, Quận 7 (TP.HCM), Cầu Giấy (Hà Nội) | Sai hoàn toàn - VMG không có cơ sở tại HCM/Hà Nội |
| Footer | Hotline "1900 1234", email "info@vmg.edu.vn" | Placeholder giả, domain thật vmgenglish.edu.vn |
| Toàn trang | Logo hiển thị dạng chữ "VMG" text, chưa dùng file logo thật | Vi phạm nguyên tắc "dùng logo từ file gốc, không tự vẽ lại" |

---

## 8. VIỆC CẦN LÀM TIẾP

1. Chốt màu chính thức (mục 0.1) - nếu đổi về `#be202f`/`#8b672a`, toàn bộ token màu ở mục 1 cần map lại và kiểm tra tương phản (contrast) với các nền hiện có
2. Chốt font chính thức (mục 0.2)
3. Quyết định giữ/bỏ nhóm màu tertiary (hồng) - ảnh hưởng tỷ lệ 60/30/5/5
4. Thay toàn bộ nội dung placeholder ở mục 7 bằng dữ liệu đã verify trong CLAUDE.md / context hiện có
5. Sau khi chốt 1-3, dựng lại 2-3 trang mẫu (trang chủ, 1 trang chương trình, quiz UI) làm chuẩn component thật, rồi mới nhân rộng
