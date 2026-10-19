import { useState, useCallback, type ReactNode } from "react";
import { profil as dummyProfil, DUMMY_PASSWORD, type Profil } from "../../lib/dataDummy";
import { AuthContext } from "../../lib/AuthContext";
import { clearStoredUser, getStoredUser, setStoredUser } from "../../lib/authStorage";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profil | null>(() => getStoredUser());

  const login = useCallback(async (email: string, password: string) => {
    // simulasi network
    await new Promise((r) => setTimeout(r, 600));

    if (email !== dummyProfil.email || password !== DUMMY_PASSWORD) {
      throw new Error("Email atau password salah");
    }

    setStoredUser(dummyProfil);
    setUser(dummyProfil);
    return dummyProfil;
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
