import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import HocOnline from "./pages/HocOnline";
import HocOnlineDetail from "./pages/HocOnlineDetail";
import NgoaiNgu from "./pages/NgoaiNgu";
import DuHoc from "./pages/DuHoc";
import HuongNghiep from "./pages/HuongNghiep";
import VeVmg from "./pages/VeVmg";
import HeThongTrungTam from "./pages/HeThongTrungTam";
import TruongHocDoanhNghiep from "./pages/TruongHocDoanhNghiep";
import LienHe from "./pages/LienHe";
import ChinhSachBaoMat from "./pages/ChinhSachBaoMat";
import DieuKhoanSuDung from "./pages/DieuKhoanSuDung";
import PlaceholderPage from "./pages/PlaceholderPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import { AuthProvider } from "./admin/AuthContext";
import LoginPage from "./admin/LoginPage";
import AdminLayout from "./admin/AdminLayout";
import ProductsPage from "./admin/pages/ProductsPage";
import CentersPage from "./admin/pages/CentersPage";
import NewsPage from "./admin/pages/NewsPage";
import QuizMappingPage from "./admin/pages/QuizMappingPage";
import LeadsPage from "./admin/pages/LeadsPage";
import B2GPage from "./admin/pages/B2GPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/ngoai-ngu" element={<NgoaiNgu />} />
        <Route path="/du-hoc" element={<DuHoc />} />
        <Route path="/huong-nghiep" element={<HuongNghiep />} />
        <Route path="/hoc-online" element={<HocOnline />} />
        <Route path="/hoc-online/:slug" element={<HocOnlineDetail />} />
        <Route path="/he-thong-trung-tam" element={<HeThongTrungTam />} />
        <Route path="/truong-hoc-doanh-nghiep" element={<TruongHocDoanhNghiep />} />
        <Route path="/ve-vmg" element={<VeVmg />} />
        <Route
          path="/doi-ngu-giao-vien"
          element={
            <ComingSoonPage
              eyebrow="Đội ngũ giáo viên"
              title="Gặp gỡ đội ngũ giáo viên VMG"
              metaTitle="Đội ngũ giáo viên | VMG"
              metaDescription="Đội ngũ giáo viên nước ngoài và Việt Nam của VMG - trang hồ sơ giáo viên đang được cập nhật."
              note="Trang giới thiệu hồ sơ và ảnh giáo viên (GVNN + GVVN) đang được hoàn thiện. Quay lại sau để xem tỷ lệ GVNN theo từng chương trình."
            />
          }
        />
        <Route
          path="/hall-of-fame"
          element={
            <ComingSoonPage
              eyebrow="Hall of Fame"
              title="Vinh danh học viên VMG"
              metaTitle="Hall of Fame | VMG"
              metaDescription="Vinh danh học viên VMG đạt thành tích nổi bật - trang đang được cập nhật câu chuyện và thành tích thật."
              note="Đây là nơi vinh danh học viên đạt thành tích nổi bật (điểm IELTS/Cambridge cao, câu chuyện tiến bộ...). Nội dung đang được đội Marketing tổng hợp từ câu chuyện thật."
            />
          }
        />
        <Route
          path="/tin-tuc"
          element={
            <ComingSoonPage
              eyebrow="Tin tức & sự kiện"
              title="Tin tức & sự kiện VMG"
              metaTitle="Tin tức & sự kiện | VMG"
              metaDescription="Cập nhật tin tức và sự kiện mới nhất từ VMG - trang đang được xây dựng."
              note="Trang tin tức đang được xây dựng. Quay lại sau để xem cập nhật mới nhất từ VMG."
            />
          }
        />
        <Route
          path="/tuyen-dung"
          element={
            <ComingSoonPage
              eyebrow="Tuyển dụng"
              title="Cơ hội nghề nghiệp tại VMG"
              metaTitle="Tuyển dụng | VMG"
              metaDescription="Cơ hội nghề nghiệp tại Hệ Thống Giáo Dục và Đào Tạo Việt Mỹ (VMG) - trang tin tuyển dụng đang được cập nhật."
              note="Trang tin tuyển dụng đang được cập nhật. Quay lại sau để xem các vị trí đang mở tại VMG."
            />
          }
        />
        <Route path="/lien-he" element={<LienHe />} />
        <Route path="/chinh-sach-bao-mat" element={<ChinhSachBaoMat />} />
        <Route path="/dieu-khoan-su-dung" element={<DieuKhoanSuDung />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="centers" element={<CentersPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="quiz-mapping" element={<QuizMappingPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="b2g" element={<B2GPage />} />
        </Route>

        <Route path="*" element={<PlaceholderPage title="Không tìm thấy trang" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
