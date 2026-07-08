# Design System - quyết định đã chốt (08/07/2026)

Nguồn gốc: `VMG_Website_Design_System_v1_DRAFT.md` (hệ thống hóa từ prototype Stitch) có
mâu thuẫn với brand guideline chính thức trong `CLAUDE.md`. Các quyết định dưới đây
là bản đã chốt, áp dụng vào code - không dùng lại giá trị màu/font thô từ file draft.

## Đã chốt

- **Màu**: giữ nguyên theo CLAUDE.md — `#be202f` (brand đỏ), `#8b672a` (gold),
  cream/lemon/plum. KHÔNG dùng bảng màu Material 3 tự sinh của Stitch
  (`#af101a`, `#795900`, `#fec330`...).
- **Font**: giữ Manrope (tiêu đề) + Inter (nội dung), KHÔNG đổi sang Be Vietnam Pro.
- **Màu tertiary hồng**: giữ lại, chính thức hóa thành token
  `--color-accent-pink` (`#ec4899`) và `--color-accent-pink-soft` (`#f472b6`)
  trong `src/index.css`, thay cho việc dùng rời rạc `pink-400/500/600` mặc định
  của Tailwind.
- **Button**: mọi CTA button là pill (`rounded-full`), không có button vuông/bo nhẹ.
  Dùng chung component `src/components/ui/Button.tsx` (variants: primary/outline/ghost/dark).
- **Nội dung placeholder từ Stitch** (địa chỉ Quận 1/Cầu Giấy, hotline "1900 1234",
  "20+ năm", "3 chi nhánh toàn quốc"...) — KHÔNG sử dụng, đây là dữ liệu giả từ
  prototype, đã bị liệt kê là sai trong chính file draft (mục 7). Số liệu thật
  đã áp dụng đúng theo CLAUDE.md (23+ năm, 10 trung tâm Đồng Nai & Bình Phước).

## Đã áp dụng vào code

- `src/index.css`: thêm token `--color-accent-pink`, `--color-accent-pink-soft`
- `src/components/ui/Button.tsx`, `Badge.tsx`, `Input.tsx`: primitive dùng chung
- Admin CMS (`ResourceTable.tsx`, `QuizMappingPage.tsx`): đổi các nút đang
  `rounded-xl` sang dùng `Button` (pill) cho đúng quy tắc
- `Sections.tsx`: thay `pink-400`/`rose-500`/`pink-600` bằng token `accent-pink`

## Chưa áp dụng / có thể làm sau nếu cần

- Spacing/section-gap scale (64px mobile / 120px desktop) trong file draft mục 3 —
  hiện site đang dùng `py-16 md:py-24` (~96px desktop), chưa đổi vì rủi ro xáo trộn
  layout nhiều section cùng lúc. Có thể chuẩn hóa sau nếu cần khớp chính xác.
- Motif trang trí (floating icon xoay, layered shape mờ) — đã có một phần (chấm bi,
  vòng tròn vàng ở Hero) nhưng chưa hệ thống hóa thành component tái sử dụng.
