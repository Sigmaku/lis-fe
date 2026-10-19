# LIS Frontend (Library Information System)

Frontend aplikasi **Library Information System** (Sistem Informasi Perpustakaan).

Proyek ini dibuat agar rekan kerja bisa langsung lanjut development tanpa harus tebak-tebakan struktur dan status fitur.

---

## Tech Stack

| Library | Versi | Keterangan |
|---------|-------|------------|
| React | 19 | UI library |
| TypeScript | ~6 | Type safety |
| Vite | 8 | Build tool + dev server |
| TanStack Router | 1.x | File-based routing |
| TanStack React Query | 5.x | Server state (sudah di-setup, belum dipakai) |
| Tailwind CSS | 4 | Styling (via `@tailwindcss/vite`) |
| React Hook Form + Zod | - | Form & validation |
| Axios | - | HTTP client (sudah terinstall, belum dipakai) |
| Lucide React | - | Icons |
| pnpm | - | Package manager |

---

## Cara Menjalankan

### Prasyarat
- Node.js 20+
- pnpm (`npm i -g pnpm`)

### Install & Run

```bash
pnpm install
pnpm dev
```

Aplikasi akan jalan di `http://localhost:5173` (atau port yang ditampilkan Vite).

### Script lain

```bash
pnpm build      # production build
pnpm preview    # preview hasil build
pnpm lint       # eslint
```

---

## Login (Dummy Auth)

Saat ini **belum ada backend**. Auth masih pakai dummy + `localStorage`.

| Field | Value |
|-------|-------|
| Email | `dwi.annisa@perpustakaan.id` |
| Password | `password123` |

Setelah login berhasil, data user disimpan di `localStorage` dengan key `auth.user`.

Logout = hapus key tersebut (saat ini belum ada tombol logout di UI).

---

## Struktur Folder

```
src/
├── assets/                 # gambar & svg
├── components/             # shared components (HeaderBar, dll)
├── features/
│   ├── Auth/               # Login page + AuthProvider + LoginForm
│   ├── Book/               # (kosong) → halaman Data Buku
│   ├── Members/            # (kosong) → halaman Data Anggota
│   ├── Report/             # (kosong) → halaman Laporan
│   └── Sidebar/            # Sidebar + ProfileView + MenuButton
├── lib/
│   ├── AuthContext.ts      # context & hook useAuth
│   ├── dataDummy.ts        # dummy data (profil, laporan, denda, dll)
│   ├── schema.ts           # zod schema (login)
│   └── sidebarData.ts      # menu sidebar
├── routes/                 # TanStack Router (file-based)
│   ├── __root.tsx          # root + AuthProvider
│   ├── login.tsx
│   └── _app/
│       ├── route.tsx       # layout protected (Header + Sidebar)
│       └── (app)/
│           ├── index.tsx   # Data Buku (/)
│           ├── member.tsx  # Data Anggota (/member)
│           └── report.tsx  # Laporan (/report)
├── main.tsx
└── index.css               # Tailwind + custom theme
```

### Routing yang tersedia

| Path | Status | Keterangan |
|------|--------|------------|
| `/login` | ✅ Selesai | Form login + validasi Zod |
| `/` | ✅ Selesai (dummy data) | Data Buku: cari, filter kategori, tambah/edit/hapus |
| `/member` | ✅ Selesai (dummy data) | Data Anggota: cari, filter status, tambah/edit/hapus |
| `/report` | ✅ Selesai (dummy data) | Laporan: 3 tab, ringkasan, export CSV, upload file |

Route `_app` dilindungi: kalau belum login → redirect ke `/login`.

---

## Status Fitur Saat Ini

### Sudah ada
- [x] Setup project (Vite + React + TS + Tailwind v4 + TanStack Router)
- [x] Auth dummy (login + persist localStorage)
- [x] Login page (UI + form validation)
- [x] Layout utama (HeaderBar + Sidebar)
- [x] Dummy data laporan, bukti setoran, upload laporan (`src/lib/dataDummy.ts`)
- [x] Theme warna custom (`soft-peach`, `coral-glow`) + font Rubik

### Belum dikerjakan / masih kosong
- [x] Halaman Data Buku, Data Anggota, Laporan (data masih state lokal, reset saat refresh)
- [x] Tombol Logout, ProfileView ambil dari `useAuth().user`
- [x] Protected route lewat helper `lib/authStorage.ts`
- [ ] Integrasi API / backend (Axios sudah terinstall)
- [ ] React Query belum dipakai sama sekali
- [ ] Tidak ada `.env` / config base URL API

---

## Catatan Penting buat yang Lanjut

1. **Dummy data ada di** `src/lib/dataDummy.ts`  
   Termasuk: profil user, data laporan, bukti setoran, upload laporan, helper `formatRupiah` & `formatTanggal`.

2. **Sidebar menu** didefinisikan di `src/lib/sidebarData.ts`.  
   Ada juga `menuSidebar` di `dataDummy.ts` yang isinya beda (path lama). Saat ini yang dipakai adalah `sidebarData.ts`.

3. **Custom color** (Tailwind v4):
   ```css
   --color-soft-peach: #FFDE96;
   --color-coral-glow: #FA855A;
   ```
   Pakai class: `bg-soft-peach`, `text-soft-peach`, dll.

4. **Auth flow**:
   - `AuthProvider` wrap seluruh app di `__root.tsx`
   - Login → simpan ke `localStorage` + state
   - Protected layout di `_app/route.tsx` cek `localStorage` (bisa diperbaiki pakai `useAuth`)

5. **Kalau mau mulai pakai API**:
   - Buat `src/lib/api.ts` atau `src/services/`
   - Pakai Axios + React Query
   - Tambahkan `.env` (contoh: `VITE_API_BASE_URL=...`)

---

## Rekomendasi Next Steps

1. Fix ProfileView di Sidebar supaya pakai data dari `useAuth().user`
2. Tambah tombol Logout
3. Implementasi halaman Laporan dulu (dummy data sudah lengkap)
4. Setelah backend ready → ganti dummy auth & data dengan API call
5. Buat komponen tabel/reusable yang konsisten

---

## Kontribusi

- Pakai **pnpm** (jangan npm/yarn supaya lockfile konsisten)
- Ikuti struktur `features/` untuk fitur baru
- Route baru → taruh di `src/routes/` (file-based, auto generate `routeTree.gen.ts`)
- Jangan commit `node_modules` / `dist`

Kalau ada pertanyaan tentang struktur atau mau lanjut fitur mana dulu, langsung chat aja.
