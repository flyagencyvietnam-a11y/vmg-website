import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./admin/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const HocOnline = lazy(() => import("./pages/HocOnline"));
const HocOnlineDetail = lazy(() => import("./pages/HocOnlineDetail"));
const NgoaiNgu = lazy(() => import("./pages/NgoaiNgu"));
const KhaoThi = lazy(() => import("./pages/KhaoThi"));
const DuHoc = lazy(() => import("./pages/DuHoc"));
const HuongNghiep = lazy(() => import("./pages/HuongNghiep"));
const VeVmg = lazy(() => import("./pages/VeVmg"));
const HeThongTrungTam = lazy(() => import("./pages/HeThongTrungTam"));
const TruongHocDoanhNghiep = lazy(() => import("./pages/TruongHocDoanhNghiep"));
const LienHe = lazy(() => import("./pages/LienHe"));
const ChinhSachBaoMat = lazy(() => import("./pages/ChinhSachBaoMat"));
const DieuKhoanSuDung = lazy(() => import("./pages/DieuKhoanSuDung"));
const PlaceholderPage = lazy(() => import("./pages/PlaceholderPage"));
const DoiNguGiaoVien = lazy(() => import("./pages/DoiNguGiaoVien"));
const HallOfFamePage = lazy(() => import("./pages/HallOfFamePage"));
const TinTuc = lazy(() => import("./pages/TinTuc"));
const TuyenDung = lazy(() => import("./pages/TuyenDung"));
const LoginPage = lazy(() => import("./admin/LoginPage"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const ProductsPage = lazy(() => import("./admin/pages/ProductsPage"));
const CentersPage = lazy(() => import("./admin/pages/CentersPage"));
const NewsPage = lazy(() => import("./admin/pages/NewsPage"));
const QuizMappingPage = lazy(() => import("./admin/pages/QuizMappingPage"));
const LeadsPage = lazy(() => import("./admin/pages/LeadsPage"));
const B2GPage = lazy(() => import("./admin/pages/B2GPage"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm font-semibold text-neutral-500">Đang tải…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/ngoai-ngu" element={<NgoaiNgu />} />
        <Route path="/khao-thi" element={<KhaoThi />} />
        <Route path="/hoc-online/khao-thi-osir" element={<Navigate to="/khao-thi" replace />} />
        <Route path="/du-hoc" element={<DuHoc />} />
        <Route path="/huong-nghiep" element={<HuongNghiep />} />
        <Route path="/huong-nghiep/:slug" element={<Navigate to="/huong-nghiep" replace />} />
        <Route path="/hoc-online" element={<HocOnline />} />
        <Route path="/hoc-online/:slug" element={<HocOnlineDetail />} />
        <Route path="/he-thong-trung-tam" element={<HeThongTrungTam />} />
        <Route path="/truong-hoc-doanh-nghiep" element={<TruongHocDoanhNghiep />} />
        <Route path="/ve-vmg" element={<VeVmg />} />
        <Route path="/doi-ngu-giao-vien" element={<DoiNguGiaoVien />} />
        <Route path="/hall-of-fame" element={<HallOfFamePage />} />
        <Route path="/tin-tuc" element={<TinTuc />} />
        <Route path="/tin-tuc/:slug" element={<TinTuc />} />
        <Route path="/tuyen-dung" element={<TuyenDung />} />
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
      </Suspense>
    </AuthProvider>
  );
}

export default App;
