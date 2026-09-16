import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { COMPANY } from "../data/company";

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

          <p className="mt-4 text-xs text-neutral-500">Cập nhật ngày 16/09/2026</p>

          <div className="mt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">1. Bên kiểm soát dữ liệu</h2>
              <p className="mt-2">
                {COMPANY.legalName}. Địa chỉ liên hệ: {COMPANY.office}.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">2. Dữ liệu cá nhân thu thập</h2>
              <p className="mt-2">
                Họ tên, số điện thoại, lựa chọn chương trình và các thông tin bạn chủ động cung cấp qua biểu mẫu tư vấn,
                quiz, liên hệ hoặc đăng ký hợp tác trên website này.
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
              <p className="mt-2">Dữ liệu được lưu trong thời gian cần thiết để xử lý yêu cầu tư vấn, chăm sóc người học và thực hiện nghĩa vụ có liên quan. VMG định kỳ rà soát để xóa hoặc ẩn danh dữ liệu không còn cần thiết, trừ trường hợp pháp luật yêu cầu lưu lâu hơn.</p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">5. Chia sẻ và bảo vệ dữ liệu</h2>
              <p className="mt-2">Dữ liệu chỉ được truy cập bởi bộ phận VMG phụ trách nhu cầu của bạn và nhà cung cấp hạ tầng cần thiết để vận hành website. VMG không bán dữ liệu cá nhân và áp dụng biện pháp phù hợp để hạn chế truy cập, mất mát hoặc sử dụng trái phép.</p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">6. Quyền của chủ thể dữ liệu</h2>
              <p className="mt-2">
                Theo Nghị định 13/2023/NĐ-CP, bạn có quyền được biết, đồng ý, truy cập, rút lại sự đồng ý, xóa, hạn
                chế xử lý và khiếu nại về dữ liệu cá nhân của mình. Liên hệ theo thông tin tại mục 7 để thực hiện
                các quyền này.
              </p>
            </section>
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900">7. Liên hệ</h2>
              <p className="mt-2">Gửi yêu cầu về dữ liệu cá nhân đến <a className="text-brand underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> hoặc liên hệ <a className="text-brand underline" href={COMPANY.hotlineHref}>{COMPANY.hotline}</a>.</p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
