import { useState, useCallback, type ReactNode } from "react";
import { profil as dummyProfil, DUMMY_PASSWORD, type Profil } from "../../lib/dataDummy";
import { AuthContext } from "../../lib/AuthContext";

const STORAGE_KEY = "auth.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profil | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Profil) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // simulasi network
    await new Promise((r) => setTimeout(r, 600));

    if (email !== dummyProfil.email || password !== DUMMY_PASSWORD) {
      throw new Error("Email atau password salah");
    }

    setUser(dummyProfil);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyProfil));
    return dummyProfil;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}