import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white/80">
      <div className="container-vmg py-12 grid md:grid-cols-4 gap-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm text-white/60 max-w-xs">
            Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ – 23 năm đồng hành cùng học viên tại Đồng Nai và Bình Phước.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Chương trình</h4>
          <ul className="space-y-2 text-sm">
            <li>Ngoại ngữ</li>
            <li>Du học VMP</li>
            <li>Hướng nghiệp</li>
            <li>Học online</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">VMG</h4>
          <ul className="space-y-2 text-sm">
            <li>Về VMG</li>
            <li>Hệ thống trung tâm</li>
            <li>Tuyển dụng</li>
            <li>Tin tức</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Liên hệ</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>Hotline: 1900 xxxx</li>
            <li>Đồng Nai & Bình Phước, Việt Nam</li>
            <li>Zalo · Messenger</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 Viet My Group. All rights reserved.
      </div>
    </footer>
  );
}
