import { Logo } from "./Logo";

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
            <li><a href="/tuyen-dung" className="hover:text-white transition-colors">Tuyển dụng</a></li>
            <li><a href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Liên hệ</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href="tel:1900636838" className="hover:text-white transition-colors">Hotline: 1900 636 838</a></li>
            <li><a href="mailto:info@vmg.edu.vn" className="hover:text-white transition-colors">info@vmg.edu.vn</a></li>
            <li>Đồng Nai &amp; Bình Phước</li>
            <li><a href="/lien-he" className="hover:text-white transition-colors underline">Liên hệ tư vấn →</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 Hệ thống giáo dục và đào tạo Việt Mỹ VMG. All rights reserved.
      </div>
    </footer>
  );
}
