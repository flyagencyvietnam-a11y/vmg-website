import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    }).catch(() => { setSession(null); setLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;
    setIsAdmin(false);
    setAccessError(null);
    if (!session) { setAdminLoading(false); return; }
    setAdminLoading(true);
    Promise.resolve(supabase.rpc("vmg_is_admin")).then(({ data, error }) => {
      if (!active) return;
      setIsAdmin(data === true && !error);
      setAccessError(error ? "Chưa kiểm tra được quyền quản trị. Vui lòng kiểm tra kết nối và migration backend." : data !== true ? "Tài khoản chưa được cấp quyền quản trị VMG." : null);
      setAdminLoading(false);
    }).catch(() => {
      if (active) { setAccessError("Chưa kết nối được backend để kiểm tra quyền quản trị."); setAdminLoading(false); }
    });
    return () => { active = false; };
  }, [session]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? "Đăng nhập chưa thành công. Vui lòng kiểm tra tài khoản và kết nối." : null };
    } catch { return { error: "Chưa kết nối được Supabase. Vui lòng thử lại." }; }
  };

  const signOut = async () => {
    await supabase.auth.signOut({ scope: "local" });
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, isAdmin, adminLoading, accessError, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
