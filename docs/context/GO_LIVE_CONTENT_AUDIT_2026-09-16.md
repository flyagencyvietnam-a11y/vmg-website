# Go-live content audit — 16/09/2026

## Nguồn chính thức đã rà soát

- VMG: https://vmgenglish.edu.vn/
- Giới thiệu VMG: https://vmgenglish.edu.vn/gioi-thieu.html
- Hệ thống trung tâm: https://vmgenglish.edu.vn/he-thong-trung-tam.html
- VMP by VMG: https://duhocvmp.com/
- Du học hè Mỹ 2026: https://duhocvmp.com/du-hoc-he-my-2026
- Du học hè Úc 2026: https://duhocvmp.com/du-hoc-he-uc-2026
- Du học hè Singapore 2026: https://duhocvmp.com/du-hoc-he-singapore-2026
- Du học hè Philippines 2026: https://duhocvmp.com/du-hoc-he-philippines-2026
- Du học dài hạn Úc: https://duhocvmp.com/du-hoc-uc
- Du học dài hạn Singapore: https://duhocvmp.com/du-hoc-singapore
- Du học dài hạn Philippines: https://duhocvmp.com/du-hoc-philippines
- Xuất khẩu lao động: https://duhocvmp.com/xuat-khau-lao-dong
- Chung kết Hùng biện tiếng Anh sinh viên Đồng Nai 2026: https://vmgenglish.edu.vn/chung-ket-cuoc-thi-hung-bien-tieng-anh-trong-sinh-vien-tinh-dong-nai-2026-n150.html
- VMG Summer School 2026: https://vmgenglish.edu.vn/vmg-summer-school-2026---cham-nghe-tuong-lai-n149.html

## Quyết định nội dung

- Trang Du học đóng vai trò landing page định hướng, CTA dẫn sang đúng chuyên trang VMP thay vì thu lead trùng lặp.
- Bổ sung các điểm đến và chương trình hè 2026 có trang nguồn công khai; phần mô tả marketing không thêm học phí, tỷ lệ visa hoặc cam kết học bổng khi chưa có nguồn.
- Giữ 10 trung tâm theo bộ dữ liệu đã đối chiếu; không dùng các con số 11/12 trung tâm xuất hiện không đồng nhất trên website cũ.
- Không dùng tuyên bố “100% giáo viên nước ngoài” cho toàn hệ thống. Tỷ lệ giáo viên chỉ hiển thị ở sản phẩm đã có dữ liệu xác nhận.
- Ẩn EduNext và Ngân hàng đề thi khỏi catalog công khai vì dữ liệu sản phẩm chưa đủ để bán.
- Hướng nghiệp hiển thị ở trạng thái đang hoàn thiện; bỏ các card chương trình chưa được xác nhận.
- Tin bài có ưu đãi đã hết hạn chỉ được trình bày như nội dung lưu trữ và ghi rõ ưu đãi không còn hiệu lực.

## Ảnh và hiệu năng

- Ảnh tin tức được lấy từ bài nguồn chính thức và lưu tại `public/legacy/`.
- Ảnh sản phẩm, hero và Hall of Fame đã có bản WebP dùng trên giao diện; PNG nguồn Hall of Fame được lưu tại `source-assets/hall-of-fame/` để không bị đóng gói vào bản deploy nhưng vẫn có thể đối chiếu/chỉnh sửa về sau.
- Script tái tạo ảnh tối ưu: `scripts/optimize-go-live-images.py`.

## Cơ chế an toàn khi go-live

- Quiz có mapping dự phòng cục bộ, tách khỏi logic hiển thị, để vẫn hoạt động khi CMS gián đoạn.
- Form lead và hợp tác hiển thị hotline/Zalo thay thế khi backend không nhận được dữ liệu.
- Có canonical, Open Graph, Twitter metadata, `robots.txt` và `sitemap.xml`.
