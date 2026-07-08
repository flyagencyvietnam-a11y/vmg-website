import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";
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

        <Route path="/ngoai-ngu" element={<PlaceholderPage title="Ngoại ngữ" />} />
        <Route path="/du-hoc" element={<PlaceholderPage title="Du học - VMP by VMG" />} />
        <Route path="/huong-nghiep" element={<PlaceholderPage title="Hướng nghiệp" />} />
        <Route path="/hoc-online" element={<PlaceholderPage title="Học online" />} />
        <Route path="/he-thong-trung-tam" element={<PlaceholderPage title="Hệ thống trung tâm" />} />
        <Route path="/truong-hoc-doanh-nghiep" element={<PlaceholderPage title="Trường học & Doanh nghiệp" />} />
        <Route path="/ve-vmg" element={<PlaceholderPage title="Về VMG" />} />
        <Route path="/doi-ngu-giao-vien" element={<PlaceholderPage title="Đội ngũ giáo viên" />} />
        <Route path="/hall-of-fame" element={<PlaceholderPage title="Hall of Fame" />} />
        <Route path="/tin-tuc" element={<PlaceholderPage title="Tin tức & sự kiện" />} />
        <Route path="/tuyen-dung" element={<PlaceholderPage title="Tuyển dụng" />} />
        <Route path="/lien-he" element={<PlaceholderPage title="Liên hệ" />} />
        <Route path="/chinh-sach-bao-mat" element={<PlaceholderPage title="Chính sách bảo mật" />} />
        <Route path="/dieu-khoan-su-dung" element={<PlaceholderPage title="Điều khoản sử dụng" />} />

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
