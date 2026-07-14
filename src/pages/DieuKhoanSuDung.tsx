import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function DieuKhoanSuDung() {
  useDocumentMeta(
    "Điều khoản sử dụng | VMG",
    "Điều khoản sử dụng website Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ (VMG)."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Pháp lý</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Điều khoản sử dụng</h1>

          <div className="mt-6 rounded-2xl border border-dashed border-brand/30 bg-cream/60 p-4 text-xs text-neutral-500">
            [CẦN RÀ SOÁT PHÁP LÝ: bản dự thảo, cần bộ phận pháp chế VMG xác nhận trước khi công bố chính thức.]
          </div>

          <div className="mt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">1. Phạm vi áp dụng</h2>
              <p className="mt-2">
                Điều khoản này áp dụng khi bạn truy cập và sử dụng website của Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ (VMG).
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
              <h2 className="font-display font-bold text-lg text-neutral-900">4. Liên hệ</h2>
              <p className="mt-2">[CẦN XÁC NHẬN: email/hotline đầu mối tiếp nhận thắc mắc về điều khoản sử dụng].</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
