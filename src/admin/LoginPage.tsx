import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Logo } from "../components/Logo";

export default function LoginPage() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    if (error) setError(error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-black/5 shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <Logo className="h-12" />
        </div>
        <h1 className="text-xl font-display font-extrabold text-center">Đăng nhập quản trị</h1>
        <p className="mt-1 text-sm text-neutral-500 text-center">Dành cho đội Marketing VMG</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" autoComplete="username"
            className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand"
          />
          <input
            required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu" autoComplete="current-password"
            className="rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-brand"
          />
          {error && <div className="text-xs text-brand font-semibold">{error}</div>}
          <button
            type="submit" disabled={loading}
            className="mt-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-bold hover:bg-brand-dark disabled:opacity-60 transition-colors"
          >
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
