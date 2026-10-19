import { useState } from "react";
import { BookOpenText, Library, ShieldCheck, Users } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "../../lib/AuthContext";
import { LoginForm } from "./LoginForm";
import type { LoginFormValues } from "../../lib/schema";

const highlights = [
  { icon: Library, text: "Kelola koleksi buku dengan rapi" },
  { icon: Users, text: "Data anggota dalam satu tempat" },
  { icon: ShieldCheck, text: "Laporan & denda tercatat jelas" },
];

/* Ilustrasi tumpukan buku (dibuat sendiri, murni SVG) */
function BookStack() {
  return (
    <svg viewBox="0 0 320 220" className="w-full max-w-sm" aria-hidden>
      <ellipse cx="160" cy="200" rx="130" ry="12" fill="#000" opacity=".08" />
      {/* buku bawah */}
      <rect x="40" y="150" width="240" height="42" rx="6" fill="#FA855A" />
      <rect x="40" y="150" width="240" height="8" rx="4" fill="#fff" opacity=".25" />
      <rect x="64" y="164" width="90" height="5" rx="2.5" fill="#fff" opacity=".7" />
      {/* buku tengah */}
      <rect x="70" y="104" width="200" height="40" rx="6" fill="#fff" />
      <rect x="70" y="104" width="200" height="8" rx="4" fill="#FFDE96" />
      <rect x="92" y="122" width="70" height="5" rx="2.5" fill="#FA855A" opacity=".7" />
      {/* buku atas (miring) */}
      <g transform="rotate(-7 160 84)">
        <rect x="95" y="62" width="170" height="36" rx="6" fill="#FFDE96" stroke="#fff" strokeWidth="3" />
        <rect x="116" y="76" width="60" height="5" rx="2.5" fill="#FA855A" />
      </g>
      {/* buku terbuka di atas */}
      <path d="M160 48 Q132 34 100 40 V4 Q132 -2 160 14 Z" fill="#fff" opacity=".95" />
      <path d="M160 48 Q188 34 220 40 V4 Q188 -2 160 14 Z" fill="#fff" opacity=".8" />
    </svg>
  );
}

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
    <div className="grid min-h-screen bg-stone-50 font-rubik lg:grid-cols-[1.1fr_1fr]">
      {/* ---------- Panel brand ---------- */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-soft-peach p-14 lg:flex">
        {/* dekorasi lingkaran */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/30" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-coral-glow/20" />
        <div className="pointer-events-none absolute right-16 top-1/2 h-28 w-28 rounded-full border-2 border-white/50" />

        <div className="relative flex items-center gap-4 text-white">
          <BookOpenText size={32} />
          <span className="text-2xl text-white/70">|</span>
          <span className="text-2xl font-semibold">Library Information System</span>
        </div>

        <div className="relative flex flex-col items-center gap-10 py-10">
          <BookStack />
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold leading-tight text-stone-800">
              Perpustakaan, <span className="text-coral-glow">lebih tertata.</span>
            </h2>
            <p className="mt-3 text-stone-700/80">
              Satu tempat untuk mengelola buku, anggota, dan laporan peminjaman.
            </p>
          </div>
        </div>

        <ul className="relative flex flex-col gap-3">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm font-medium text-stone-700">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/60 text-coral-glow">
                <Icon size={18} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </aside>

      {/* ---------- Form ---------- */}
      <main className="flex flex-col items-center justify-center px-6 py-12">
        {/* header ringkas untuk layar kecil */}
        <div className="mb-8 flex items-center gap-3 text-stone-800 lg:hidden">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft-peach text-white">
            <BookOpenText size={24} />
          </span>
          <span className="text-lg font-semibold">Library Information System</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <span className="mb-3 inline-block h-1 w-12 rounded-full bg-coral-glow" />
            <h1 className="text-3xl font-bold text-stone-800">Selamat datang</h1>
            <p className="mt-1 text-stone-500">Masuk untuk mengelola perpustakaan.</p>
          </div>

          <div className="rounded-2xl border border-soft-peach/70 bg-white p-8 shadow-xl shadow-soft-peach/40">
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              errorMessage={error}
              submitLabel="Masuk"
            />
          </div>

          <p className="mt-6 rounded-lg bg-soft-peach/30 px-4 py-3 text-center text-xs text-stone-600">
            <span className="font-semibold">Akun demo:</span> dwi.annisa@perpustakaan.id / password123
          </p>
        </div>
      </main>
    </div>
  );
}
