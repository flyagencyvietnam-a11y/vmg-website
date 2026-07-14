import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";

export default function ChinhSachBaoMat() {
  useDocumentMeta(
    "Chính sách bảo mật | VMG",
    "Chính sách bảo mật và xử lý dữ liệu cá nhân của VMG theo Nghị định 13/2023/NĐ-CP."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container-vmg py-14 md:py-20 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">Pháp lý</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Chính sách bảo mật và xử lý dữ liệu cá nhân</h1>

          <div className="mt-6 rounded-2xl border border-dashed border-brand/30 bg-cream/60 p-4 text-xs text-neutral-500">
            [CẦN RÀ SOÁT PHÁP LÝ: bản dự thảo dưới đây theo cấu trúc Nghị định 13/2023/NĐ-CP, cần bộ phận pháp chế
            VMG xác nhận trước khi công bố chính thức - chưa điền tên/địa chỉ pháp nhân, đầu mối liên hệ cụ thể.]
          </div>

          <div className="mt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">1. Bên kiểm soát dữ liệu</h2>
              <p className="mt-2">
                [CẦN XÁC NHẬN: tên pháp nhân, mã số thuế, địa chỉ trụ sở Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ (VMG)].
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">2. Dữ liệu cá nhân thu thập</h2>
              <p className="mt-2">
                Họ tên, số điện thoại, và các thông tin bạn cung cấp qua biểu mẫu tư vấn (quiz, đăng ký khóa học,
                liên hệ, hợp tác trường học/doanh nghiệp) trên website này.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">3. Mục đích xử lý</h2>
              <p className="mt-2">
                Liên hệ tư vấn chương trình học phù hợp, chăm sóc khách hàng, và cải thiện chất lượng dịch vụ của VMG.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">4. Thời gian lưu trữ</h2>
              <p className="mt-2">[CẦN XÁC NHẬN: thời gian lưu trữ dữ liệu cụ thể theo quy định nội bộ VMG].</p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">5. Quyền của chủ thể dữ liệu</h2>
              <p className="mt-2">
                Theo Nghị định 13/2023/NĐ-CP, bạn có quyền được biết, đồng ý, truy cập, rút lại sự đồng ý, xóa, hạn
                chế xử lý, và khiếu nại về dữ liệu cá nhân của mình. Liên hệ theo thông tin tại mục 6 để thực hiện
                các quyền này.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">6. Liên hệ</h2>
              <p className="mt-2">[CẦN XÁC NHẬN: email/hotline đầu mối xử lý yêu cầu về dữ liệu cá nhân].</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
