import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Logo } from "../components/Logo";

const NAV = [
  { to: "/admin/products", label: "Sản phẩm" },
  { to: "/admin/centers", label: "Trung tâm" },
  { to: "/admin/news", label: "Tin tức" },
  { to: "/admin/quiz-mapping", label: "Quiz mapping" },
  { to: "/admin/leads", label: "Leads" },
  { to: "/admin/b2g", label: "B2G / B2B" },
];

export default function AdminLayout() {
  const { session, loading, signOut } = useAuth();

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-sm text-neutral-500">Đang tải…</div>;
  }
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-cream">
      <aside className="w-64 bg-white border-r border-black/5 flex flex-col shrink-0">
        <div className="p-5 border-b border-black/5">
          <Logo className="h-10" />
        </div>
        <nav className="flex-1 p-3 grid gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? "bg-brand text-white" : "text-neutral-700 hover:bg-neutral-100"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-black/5">
          <button
            onClick={() => signOut()}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-500 hover:bg-neutral-100 text-left"
          >
            Đăng xuất
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
