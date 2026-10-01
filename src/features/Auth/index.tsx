import { useState } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "../../lib/AuthContext";
import { LoginForm } from "./LoginForm";
import type { LoginFormValues } from "../../lib/schema";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" }) as { redirect?: string };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      setError(null);
      await login(values.email, values.password);
      navigate({ to: search.redirect ?? "/" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Perpustakaan</h1>
          <p className="text-sm text-slate-500">Masuk untuk melanjutkan</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            errorMessage={error}
            submitLabel="Masuk"
          />
          <p className="mt-4 text-center text-xs text-slate-400">
            Demo: dwi.annisa@perpustakaan.id / password123
          </p>
        </div>
      </div>
    </div>
  );
}