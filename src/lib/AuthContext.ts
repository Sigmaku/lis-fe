// AuthContext.ts
import { createContext, useContext } from "react";
import type { Profil } from "./dataDummy";

export interface AuthContextValue {
  user: Profil | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<Profil>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}