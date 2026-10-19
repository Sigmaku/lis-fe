import { useEffect, type ReactNode } from "react"
import { Search, X } from "lucide-react"

/* ---------- Kartu halaman ---------- */
export function PageCard({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-rubik text-2xl font-bold text-stone-800">{title}</h1>
        {action}
      </div>
      {children}
    </section>
  )
}

/* ---------- Search ---------- */
export function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-coral-glow focus:ring-2 focus:ring-coral-glow/20"
      />
    </div>
  )
}

/* ---------- Tombol ---------- */
export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center gap-2 rounded-lg bg-coral-glow px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  )
}

export function IconButton({
  label,
  tone = "default",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  tone?: "default" | "danger" | "success"
}) {
  const tones = {
    default: "text-stone-500 hover:bg-stone-100",
    danger: "text-red-500 hover:bg-red-50",
    success: "text-emerald-600 hover:bg-emerald-50",
  }
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...props}
      className={`grid h-8 w-8 place-items-center rounded-md transition ${tones[tone]}`}
    >
      {children}
    </button>
  )
}

/* ---------- Badge status ---------- */
const badgeTones: Record<string, string> = {
  // laporan
  "Terlambat": "bg-red-100 text-red-700",
  "Sudah Kembali": "bg-emerald-100 text-emerald-700",
  "Belum Kembali": "bg-amber-100 text-amber-700",
  // bukti / upload
  Pending: "bg-amber-100 text-amber-700",
  Done: "bg-emerald-100 text-emerald-700",
  Accepted: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
  // anggota / buku
  Aktif: "bg-emerald-100 text-emerald-700",
  Nonaktif: "bg-stone-200 text-stone-600",
  Tersedia: "bg-emerald-100 text-emerald-700",
  Habis: "bg-red-100 text-red-700",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${badgeTones[status] ?? "bg-stone-100 text-stone-600"}`}
    >
      {status}
    </span>
  )
}

/* ---------- Modal ---------- */
export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-800">{title}</h2>
          <IconButton label="Tutup" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  )
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Hapus",
  onConfirm,
  onClose,
}: {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onClose: () => void
}) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p className="text-sm text-stone-600">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
        <PrimaryButton
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmLabel}
        </PrimaryButton>
      </div>
    </Modal>
  )
}

/* ---------- Field form ---------- */
export function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-stone-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
}

export const inputClass =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-coral-glow focus:ring-2 focus:ring-coral-glow/20"
