import { Logo } from "./Logo";
import { COMPANY } from "../data/company";

export function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden bg-[#241115] text-white/80">
      <div className="footer-orbit" aria-hidden="true" />
      <div className="container-vmg relative py-12 grid md:grid-cols-4 gap-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm text-white/60 max-w-xs">
            Hệ thống giáo dục và đào tạo Việt Mỹ VMG. Ngoại ngữ - Du học - Hướng nghiệp. Đồng hành với tương lai của học viên.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Chương trình</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/ngoai-ngu" className="hover:text-white transition-colors">Ngoại ngữ</a></li>
            <li><a href="/khao-thi" className="hover:text-white transition-colors">Khảo thí</a></li>
            <li><a href="/du-hoc" className="hover:text-white transition-colors">Du học VMP</a></li>
            <li><a href="/huong-nghiep" className="hover:text-white transition-colors">Hướng nghiệp</a></li>
            <li><a href="/hoc-online" className="hover:text-white transition-colors">Học online</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">VMG</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/ve-vmg" className="hover:text-white transition-colors">Về VMG</a></li>
            <li><a href="/he-thong-trung-tam" className="hover:text-white transition-colors">Hệ thống trung tâm</a></li>
            <li><a href="/doi-ngu-giao-vien" className="hover:text-white transition-colors">Đội ngũ giáo viên</a></li>
            <li><a href="/hall-of-fame" className="hover:text-white transition-colors">Vinh danh học viên</a></li>
            <li><a href="/tuyen-dung" className="hover:text-white transition-colors">Tuyển dụng</a></li>
            <li><a href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Liên hệ</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href="tel:1900636838" className="hover:text-white transition-colors">Hotline: 1900 636 838</a></li>
            <li><a href="mailto:info@vmg.edu.vn" className="hover:text-white transition-colors">info@vmg.edu.vn</a></li>
            <li className="leading-6"><span className="block font-semibold text-white">Trụ sở chính</span>{COMPANY.headquarters}</li>
            <li className="leading-6"><span className="block font-semibold text-white">Văn phòng đại diện</span>{COMPANY.office}</li>
            <li><a href={COMPANY.zalo} target="_blank" rel="noreferrer" className="hover:text-white">Zalo VMG</a> · <a href={COMPANY.facebook} target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a></li>
            <li><a href="/lien-he" className="hover:text-white transition-colors underline">Liên hệ tư vấn →</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        <p>© 2026 Hệ thống giáo dục và đào tạo Việt Mỹ VMG. All rights reserved.</p>
        <p className="mt-3"><a href="/chinh-sach-bao-mat" className="underline">Chính sách bảo mật</a> · <a href="/dieu-khoan-su-dung" className="underline">Điều khoản sử dụng</a></p>
      </div>
    </footer>
  );
}
