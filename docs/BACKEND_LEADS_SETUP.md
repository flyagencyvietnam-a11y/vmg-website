# Khôi phục backend và vận hành lead — 14/10/2026

## Trạng thái thực tế

- Người dùng đã bấm Resume project. DNS, Auth health, API `centers` và `quiz_mapping` đã trả thành công.
- Build Tin tức đã được khôi phục, danh mục khớp 138 bài có nguồn. Script verify đối chiếu nguyên văn nội dung và các đường dẫn/HTML an toàn. Những ảnh nguồn không còn truy cập được được ghi trong `docs/context/LEGACY_NEWS_IMPORT.json`, không thay bằng ảnh dựng.
- Đã có API `/api/leads`, SQL transaction/RLS và hàng đợi CRM/thông báo. **Chưa áp dụng migration vào project thật, chưa ghi lead thật** vì máy chưa có service role key/quyền SQL.
- Chưa có CRM/receiver thông báo được chỉ định. Worker giữ các event chưa cấu hình ở trạng thái pending, không gửi tới địa chỉ suy đoán.
- Không xử lý phần duyệt nội dung/pháp lý trong lượt này.

## 1. Cấu hình project hiện tại

Giữ project đã Resume và dữ liệu CMS cũ. Không cần tạo project mới nếu project này đã hoạt động.

Tạo `.env.local` (đã được gitignore) với URL và publishable key hiện hành, cùng các giá trị server-only trong `.env.example`:

Trong lượt này `.env.local` đã được chuẩn bị với URL project đang dùng, danh sách origin local/domain hiện tại và hai secret ngẫu nhiên. Public key vẫn kế thừa `.env`; service role key và webhook còn trống. Không thay các secret đã tạo bằng chuỗi ví dụ.

- `SUPABASE_URL`: URL của cùng project với `VITE_SUPABASE_URL`.
- `SUPABASE_SERVICE_ROLE_KEY`: khóa backend từ Supabase Project Settings → API keys. Không đặt tên biến có tiền tố `VITE_`, không dán khóa vào chat hoặc commit.
- `LEAD_RATE_LIMIT_SECRET`, `CRON_SECRET`: hai chuỗi ngẫu nhiên riêng, tối thiểu 32 byte. Có thể tạo bằng `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` ở máy quản trị.
- `ALLOWED_ORIGINS`: các origin thật được phép gửi form, phân cách dấu phẩy. Local: `http://localhost:5173,http://127.0.0.1:5173`; production: domain thực tế có `https://`. Không dùng wildcard.
- `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_TOKEN`: receiver CRM đã được chọn (HTTPS).
- `LEAD_NOTIFICATION_WEBHOOK_URL`, `LEAD_NOTIFICATION_WEBHOOK_TOKEN`: receiver thông báo nội bộ đã được chọn (HTTPS). Đây là webhook JSON, không phải địa chỉ email hoặc URL Incoming Webhook Slack tương thích tự động.
- `LEAD_WEBHOOK_SIGNING_SECRET`: tùy chọn; receiver kiểm tra HMAC SHA-256 của raw request body trong `X-VMG-Signature`.

Khởi động lại `npm run dev` khi thay env. Vite chỉ nạp các biến `VITE_` vào browser; khóa backend chỉ được dùng trong Node API. Trên Vercel, nhập biến ở Project Settings → Environment Variables và triển khai lại.

## 2. Áp dụng migration và quyền quản trị

1. Sao lưu database/schema của project đang dùng.
2. Chạy `supabase/migrations/202610140001_lead_intake.sql` qua SQL Editor hoặc quy trình migration của project. Migration bổ sung cột vào `leads`/`b2g_inquiries`, không sửa nội dung CMS. Kiểm tra tên/cột hiện hữu trước khi áp dụng nếu schema khác các trường đang dùng trong frontend.
3. Migration thay các policy cũ trên hai bảng lead và thu hồi public insert. Vì vậy **triển khai API + cấu hình server trước, sau đó áp dụng migration và triển khai frontend mới trong cùng đợt**; tránh để frontend cũ gửi thẳng database sau khi thu hồi quyền.
4. Thêm UUID tài khoản quản trị đã có trong Authentication → Users vào `public.vmg_admins`, từ SQL Editor. Không cấp quyền cho mọi user đã đăng nhập. Ví dụ dùng tham số UUID thật trong `insert into public.vmg_admins(user_id) values ('<UUID thật>') on conflict do nothing;`.
5. Chạy `npm run backend:check`. Script không in khóa, không đọc nội dung cá nhân và không tạo lead.
6. Kiểm thử trên staging: gửi một yêu cầu thử được đánh dấu TEST, kiểm tra database và `/admin/leads` hoặc `/admin/b2g`, thử xuất CSV, sau đó kiểm tra `/admin/lead-delivery`. Không gửi tới CRM production bằng dữ liệu thử nếu receiver chưa được phép nhận.

## 3. Luồng nhận và chuyển lead

Quiz, trang sản phẩm, khảo thí, liên hệ và hợp tác dùng chung `/api/leads`. API kiểm tra origin, body size, honeypot, tên, số di động Việt Nam và consent. Website này nhận số di động Việt Nam; chưa hỗ trợ số bàn/quốc tế ngoài +84.

Transaction SQL lưu lead, dấu thời gian/phiên bản consent, nguồn/UTM, nhóm tiếp nhận và hai event chuyển dữ liệu cùng lúc. API chỉ trả thành công sau commit. Rate limit là 5 yêu cầu mới/IP trong 10 phút; IP chỉ được lưu dưới dạng HMAC, dọn sau một ngày khi có request tiếp theo. Đây là giới hạn cơ bản, không thay thế WAF/CAPTCHA nếu traffic cần bảo vệ mạnh hơn.

Retry trong cùng form sau timeout dùng cùng `request_id`, không tạo bản ghi trùng. Nếu người dùng đổi thông tin hoặc tải lại trang, đó là yêu cầu mới. Không lưu số điện thoại/tên vào localStorage. Nếu database không nhận được dữ liệu, form giữ nội dung đang nhập và cho thử lại/hotline/Zalo; không thông báo thành công giả và không tự gửi dữ liệu sau khi người dùng rời trang.

Nhóm tiếp nhận: hợp tác → `business`; quiz du học → `vmp`; khảo thí/TESOL offline → `osir`; trẻ em/học tại trung tâm/sản phẩm offline → `centers`; online và liên hệ chung → `tmdt`. Mã sản phẩm và câu trả lời được giữ cho CRM định tuyến chi tiết. Không tự gán cá nhân/địa chỉ email.

## 4. Worker, retry và theo dõi

- `/api/lead-delivery` chỉ nhận `Authorization: Bearer <CRON_SECRET>`.
- Mỗi lượt claim tối đa 5 event, khóa lease 2 phút, mỗi HTTP timeout 3 giây. Các worker không claim trùng event đang xử lý.
- Event gửi là `{ event: 'vmg.lead.created', event_id, data }`; receiver **phải deduplicate theo `Idempotency-Key`/`event_id`**. Giao nhận là at-least-once: nếu receiver nhận nhưng ACK/lưu kết quả bị mất, event có thể gửi lại.
- Hai kênh CRM và notification độc lập, backoff 60 giây đến 1 giờ, tối đa 8 lần thử. Event thất bại được giữ để admin bấm Gửi lại, không xóa lead.
- Chưa cấu hình receiver thì giữ pending và không tăng attempts. Admin thấy mã yêu cầu/kênh/lỗi/số lần thử ở `/admin/lead-delivery`.
- Sau khi deploy, đặt URL worker và cron secret trong Supabase Vault, bật `pg_cron`/`pg_net`, chạy `supabase/ops/schedule-lead-delivery.sql` để chạy mỗi phút. Script chưa được áp dụng tự động trong lượt này. Có thể dùng scheduler của hạ tầng hiện tại thay thế.
- Theo dõi Vercel function logs (các mã `lead_intake_failed`, `lead_delivery_failed`, `lead_delivery_worker_failed`) và bảng delivery. Logs không ghi thông tin liên hệ/khóa/response body của receiver. Chọn người trực và hệ thống cảnh báo sau khi có receiver thật.

## 5. Kiểm chứng đã có

`npm test` chạy API/RPC với PostgreSQL cục bộ PGlite và dữ liệu TEST trong bộ nhớ: validation, consent, rate limit, rollback/idempotency, routing, RLS, giới hạn admin, retry/lease và CSV injection. Không gửi fixture tới Supabase/CRM.

`npm run build`, `npm run lint`, `npm run news:verify` kiểm tra frontend và nội dung import. Các kiểm thử cục bộ **không thay thế** live smoke test/migration trên Supabase thật.

Nguồn kỹ thuật: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Vercel Node Functions](https://vercel.com/docs/functions/runtimes/node-js), [PGlite](https://pglite.dev/docs/).
