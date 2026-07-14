import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white/80">
      <div className="container-vmg py-12 grid md:grid-cols-4 gap-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm text-white/60 max-w-xs">
            Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ – 23 năm đồng hành cùng học viên trên toàn quốc.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Chương trình</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/ngoai-ngu" className="hover:text-white transition-colors">Ngoại ngữ</a></li>
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
            <li>Hotline: 1900 xxxx</li>
            <li>Trung tâm: Đồng Nai · Học online: toàn quốc</li>
            <li>Zalo · Messenger</li>
            <li><a href="/lien-he" className="hover:text-white transition-colors underline">Liên hệ tư vấn →</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 Viet My Group. All rights reserved.
      </div>
    </footer>
  );
}
