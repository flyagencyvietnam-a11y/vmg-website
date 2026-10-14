import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";
export type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  adminLoading: boolean;
  accessError: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};
export const AuthContext = createContext<AuthContextValue | null>(null);
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
