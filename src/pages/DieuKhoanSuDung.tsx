import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { COMPANY } from "../data/company";

export default function DieuKhoanSuDung() {
  useDocumentMeta(
    "Điều khoản sử dụng | VMG",
    "Điều khoản sử dụng website Hệ thống giáo dục và đào tạo Việt Mỹ VMG."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Pháp lý</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Điều khoản sử dụng</h1>

          <p className="mt-4 text-xs text-neutral-500">Cập nhật ngày 16/09/2026</p>

          <div className="mt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">1. Phạm vi áp dụng</h2>
              <p className="mt-2">
                Điều khoản này áp dụng khi bạn truy cập và sử dụng website của Hệ thống giáo dục và đào tạo Việt Mỹ VMG.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">2. Thông tin chương trình & giá</h2>
              <p className="mt-2">
                Thông tin chương trình học, giá và khuyến mãi trên website có thể thay đổi mà không cần báo trước.
                Giá và cam kết đầu ra chính thức áp dụng theo hợp đồng/thỏa thuận trực tiếp tại thời điểm đăng ký.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">3. Quyền sở hữu trí tuệ</h2>
              <p className="mt-2">
                Toàn bộ nội dung, hình ảnh, logo trên website thuộc quyền sở hữu của VMG hoặc được cấp phép sử dụng
                hợp pháp. Không sao chép, phân phối lại khi chưa được sự đồng ý.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">4. Liên kết bên ngoài</h2>
              <p className="mt-2">Website có thể dẫn tới VMP, mạng xã hội, bản đồ hoặc website đối tác. Nội dung và chính sách tại các website đó do đơn vị tương ứng quản lý.</p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">5. Sử dụng website</h2>
              <p className="mt-2">Bạn đồng ý cung cấp thông tin chính xác khi gửi yêu cầu, không can thiệp vào hoạt động của website và không sử dụng nội dung cho mục đích trái pháp luật hoặc gây nhầm lẫn về VMG.</p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">6. Liên hệ</h2>
              <p className="mt-2">Liên hệ VMG qua <a className="text-brand underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> hoặc hotline <a className="text-brand underline" href={COMPANY.hotlineHref}>{COMPANY.hotline}</a>. Văn phòng đại diện: {COMPANY.office}.</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
