# Rà soát và chuyển nội dung website VMG

Ngày đối chiếu: 12/09/2026. Người dùng yêu cầu tự lấy nội dung và ảnh từ website cũ để bổ sung web mới. Các nguồn dưới đây bổ sung cho AGENTS.md; không thay thế các ràng buộc sản phẩm, thương hiệu hay chính sách không bịa dữ kiện.

## Nội dung đã chuyển

| Nguồn chính thức | Nội dung | Nơi sử dụng |
| --- | --- | --- |
| https://vmgenglish.edu.vn/gioi-thieu.html | Thông điệp Nguyễn Quốc Khánh, chức danh, chân dung; nguyên tắc trách nhiệm/chất lượng; lịch sử 2003–2025; 20 hồ sơ giảng viên | `src/data/company.ts`, Trang chủ, Về VMG, Đội ngũ giáo viên |
| https://vmgenglish.edu.vn/he-thong-trung-tam.html | Danh sách CN Đồng Nai 1–10, địa chỉ, khu vực, fanpage | `src/data/centers.ts`, Hệ thống trung tâm |
| Menu website cũ trên trang giới thiệu | 10 liên kết Google Maps riêng từng chi nhánh | Nút Chỉ đường |
| https://vmgenglish.edu.vn/lien-he.html và footer hiện tại | Trụ sở Vincom Center, văn phòng E99 Võ Thị Sáu, 1900 636 838, 090 697 88 98, info@vmg.edu.vn, Facebook, Zalo, Messenger | Liên hệ, footer, CTA liên hệ |
| https://vmgenglish.edu.vn/chinh-sach-bao-mat-n42.html | Tên Công ty TNHH Một thành viên Giáo dục Việt Mỹ, email tiếp nhận yêu cầu dữ liệu và hotline | Bổ sung thông tin đơn vị/liên hệ trong bản dự thảo pháp lý |
| https://vmgenglish.edu.vn/trai-nghiem-hoc-vien.html | Ba chia sẻ phụ huynh, đúng người/địa phương; video Thanh Như IELTS 7.0 (YouTube AvdrGKyxBzM) | Hall of Fame |
| https://vmgenglish.edu.vn/tuyen-dung.html | Môi trường chuyên nghiệp, công nghệ, sáng tạo, trao quyền, đào tạo/phát triển | Tuyển dụng; CTA sang https://vmgenglish.edu.vn/tim-kiem-cong-viec.html |
| Các URL bài viết lưu trong `src/data/legacyNews.ts` | LHU Career Fair, lễ Cambridge Long Thành/Nhơn Trạch, khai trương Phước Tân | 3 bản biên tập tóm tắt, trang danh sách và chi tiết tin, dự phòng tin Trang chủ |

Thông điệp Chủ tịch được giữ nội dung nguyên bản, chỉ chuẩn hóa khoảng trắng/dấu tổ hợp Unicode. Sứ mệnh và nguyên tắc chất lượng là phần biên tập từ lời nhắn và phần “Sự khác biệt”, không gắn nhãn là nguyên văn tuyên bố tầm nhìn. Không tìm thấy tuyên bố riêng có tiêu đề “Tầm nhìn”; thay khối trống bằng “Trách nhiệm & chất lượng”. Không dùng chữ ký cũ vì chưa có nguồn đối chiếu chữ ký trong trang này.

Tên, quốc tịch và bằng cấp của 20 giảng viên theo trang giới thiệu. Không suy ra môn/lớp/trung tâm đang phụ trách. Không cộng số năm kinh nghiệm từ hồ sơ cũ. Ảnh giảng viên nguồn có tên `logo-social...`; ảnh Jack tải kiểm tra thực tế là logo VMG, nên giao diện dùng chữ viết tắt thay chân dung. Không dựng ảnh người. Chưa có hồ sơ giáo viên Việt Nam đủ dữ liệu trong các trang đã rà.

16 ảnh IELTS ở `public/hall-of-fame/` và carousel Trang chủ là thay đổi có sẵn của người dùng trước lượt này. Giữ nguyên; dùng thêm cho trang Hall of Fame, không suy diễn tên/điểm số từ tên file. Chia sẻ phụ huynh được gắn với toàn hệ thống, không gán thành testimonial riêng cho sản phẩm online.

## Ảnh tải mới

Ảnh được lưu cục bộ, không hotlink. Script `scripts/download-legacy-assets.ps1` lưu đầy đủ URL gốc; `scripts/optimize-legacy-assets.ps1` thu nhỏ JPEG tối đa 1200px, chất lượng 82.

| File trong `public/legacy/` | Ngữ cảnh nguồn |
| --- | --- |
| `chairman.png` | Chân dung Chủ tịch, `/upload_images/images/A%CC%89nh%20se%CC%82%CC%81p%20-%20WEB.png` |
| `long-khanh.jpg` | Ảnh Long Khánh liên kết từ trang giới thiệu, `images/central/2023/10/12/resized/dsc00656_1697107536.jpg` |
| `phuoc-tan.jpg` | Khai trương Phước Tân, bài n144, `/upload_images/images/FSB_7167.jpg` |
| `lhu-career-fair.jpg` | Ngày hội LHU, bài n153, `/upload_images/images/vmg-lien-ket-dai-hoc-lac-hong.jpg` |
| `cambridge-2026.jpg` | Lễ Cambridge Long Thành/Nhơn Trạch, bài n152, `/upload_images/images/694703248_1408146314681986_6428906090039994365_n.jpg` |
| `team-bien-hoa.jpg` | Ảnh tập thể tại Biên Hòa, trang `he-thong-trung-tam-bien-hoa-ht1-20.html`, `/images/central/2022/11/22/original/DSC02518.png`; đã xem ảnh, không gán danh tính cá nhân |

Ảnh 4 trung tâm và lớp IELTS có sẵn tiếp tục sử dụng theo `src/assets/vmg/PHOTO_SOURCES.md`. Không lấy ảnh của một chi nhánh làm ảnh đại diện chi nhánh khác. Chi nhánh thiếu ảnh phù hợp có thẻ thông tin không ảnh.

## Khác biệt nguồn và quyết định biên tập

- Website cũ có chỗ ghi hơn 11 hoặc hơn 12 cơ sở; danh sách trung tâm và footer đang có đúng 10 chi nhánh. Dùng danh sách cụ thể 10 mục, phù hợp AGENTS.md.
- Danh sách hiện tại sử dụng tên CN Đồng Nai 1–10 và Phường Bình Phước. Nhãn khu vực là nơi tìm kiếm quen thuộc, không tuyên bố Bình Phước còn là tỉnh riêng.
- Lịch sử mở trung tâm là lịch sử, không đồng nghĩa từng cơ sở lịch sử còn hoạt động hiện nay.
- Dữ liệu tọa độ trong JavaScript website cũ có dấu hiệu không khớp địa chỉ Phước Tân/Nhơn Trạch. Không chuyển tọa độ chưa đối chiếu. Bản đồ nhúng tìm theo địa chỉ đã công bố; nút Chỉ đường dùng liên kết chính thức của từng chi nhánh.
- Chính sách bảo mật cũ có email `info@dotb.vn`, đề cập GDPR và tài khoản/thanh toán. Không chép nguyên bộ chính sách sang website thu lead. Mục XI/XII ghi email VMG `info@vmg.edu.vn`, nên dùng email này.
- Con số lưu trữ 24 tháng chỉ dành cho **tài khoản không hoạt động** ở chính sách cũ, không phải thời gian lưu lead. Giữ thời hạn lưu lead là thông tin cần VMG xác nhận.
- Tên pháp nhân theo chính sách cũ; địa chỉ văn phòng và trụ sở theo trang liên hệ hiện tại, không khẳng định đó là địa chỉ đăng ký kinh doanh. Chưa tìm thấy MST trên các trang đã rà/tìm kiếm.
- Bài FUTURE:ON n154 có ưu đãi hết hạn 31/08/2026 và khác biệt độ tuổi/danh hiệu đối tác so với dữ liệu dự án. Không đưa chương trình khuyến mãi này lên trang mới hoặc thay dữ liệu sản phẩm đã xác nhận.
- Tin đã chuyển có ngày **đăng bài** rõ ràng. Ngày sự kiện được tách trong nội dung khi nguồn cung cấp: LHU 15/05/2026, Phước Tân 08/10/2025. Bài Cambridge chỉ có ngày đăng 18/05/2026, không suy ra ngày tổ chức.
- Không chuyển quảng cáo “100% GV bản ngữ” thành cam kết toàn hệ thống. Trang giáo viên dùng đúng FT15 100% GVNN và Giao tiếp online 50% GVNN + 50% GVVN theo dữ liệu dự án.

## CMS và dữ liệu chưa có

- Giữ truy vấn CMS trung tâm; khi CMS lỗi, rỗng hoặc trả bản ghi không đủ tên/địa chỉ, dùng snapshot 10 trung tâm. Khi có danh sách hợp lệ, CMS vẫn là nguồn cập nhật vận hành; ảnh/fanpage khớp theo tên hoặc địa chỉ, không ghép ảnh nếu địa chỉ khác.
- Kiểm tra chỉ đọc REST `centers` ngày 12/09/2026 không thành công vì hostname Supabase trong `.env` không phân giải được. Không sửa cấu hình, không ghi DB. Cần khôi phục backend và đối chiếu/nhập snapshot vào CMS trước khi sử dụng dữ liệu CMS cũ thay thế snapshot.
- Trang chủ giữ truy vấn tin CMS và dùng 3 tin đã xác minh làm dự phòng. Các bài chuyển có route chi tiết riêng; không nhập DB hoặc đổi admin.
- Giá, SLA phản hồi, thời lượng VSTEP Mastery/TOEIC, phạm vi Ngân hàng đề và cam kết EduNext chưa tìm thấy nguồn đủ rõ để thay placeholder. Không lấy thông tin của sản phẩm khác để lấp trống.
- Nội dung VMP và chương trình hướng nghiệp chưa xác nhận vẫn giữ trạng thái hiện có; đợt chuyển này không mở tuyển sinh mới.
- Nghiêm cần chốt dữ liệu nội bộ còn thiếu: thời hạn lưu lead/MST và pháp nhân áp dụng hiện tại, hồ sơ/ảnh giáo viên Việt Nam, dữ liệu sản phẩm nêu trên. Việc thiếu các mục này không ngăn chuyển các nội dung công khai đã xác minh.

## Kiểm tra

Build TypeScript/Vite và lint; kiểm tra giao diện desktop/mobile, bộ lọc Bình Phước (1 chi nhánh), bản đồ, đường dẫn tin và nội dung liên hệ. Không gửi form thật hoặc ghi dữ liệu lead để kiểm thử.
