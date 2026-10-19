import { useMemo, useRef, useState } from "react"
import { Check, Download, Trash2, Upload, X } from "lucide-react"
import { DataTable, type Column } from "../../components/DataTable"
import {
  ConfirmDialog,
  IconButton,
  PageCard,
  PrimaryButton,
  SearchInput,
  StatusBadge,
  inputClass,
} from "../../components/ui"
import {
  buktiSetoran as initialBukti,
  dataLaporan,
  formatRupiah,
  formatTanggal,
  tabLaporan,
  uploadLaporan as initialUpload,
  type BuktiSetoran,
  type Laporan,
  type UploadLaporan,
} from "../../lib/dataDummy"

type Tab = (typeof tabLaporan)[number]

// 1_800_000 byte -> "1,8mb" (format sama dengan dummy data)
function formatUkuran(bytes: number) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1).replace(".", ",").replace(",0", "")}mb`
  return `${Math.max(1, Math.round(bytes / 1000))}kb`
}

const today = () => new Date().toISOString().slice(0, 10)

/* ------------------------------------------------------------------ */
/* Tab 1: Data Laporan                                                 */
/* ------------------------------------------------------------------ */
function csvCell(v: string | number) {
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function exportCsv(rows: Laporan[]) {
  const header = ["No", "ID Anggota", "Nama", "Tgl Pinjam", "Tgl Kembali", "Total Pinjam", "Denda", "Status"]
  const lines = rows.map((r, i) => [
    i + 1,
    r.idAnggota,
    r.namaAnggota,
    formatTanggal(r.tanggalPinjam),
    formatTanggal(r.tanggalKembali),
    r.totalPinjam,
    r.denda,
    r.status,
  ])
  const csv = [header, ...lines].map((l) => l.map(csvCell).join(",")).join("\n")
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }))
  const a = document.createElement("a")
  a.href = url
  a.download = `laporan-${today()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-soft-peach bg-soft-peach/20 px-5 py-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-stone-800">{value}</div>
    </div>
  )
}

function DataLaporanTab() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("Semua")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return dataLaporan.filter(
      (l) =>
        (status === "Semua" || l.status === status) &&
        (!q || l.namaAnggota.toLowerCase().includes(q) || l.idAnggota.includes(q)),
    )
  }, [query, status])

  const stats = useMemo(
    () => ({
      transaksi: filtered.length,
      belumKembali: filtered.filter((l) => l.status === "Belum Kembali").length,
      terlambat: filtered.filter((l) => l.status === "Terlambat").length,
      denda: filtered.reduce((s, l) => s + l.denda, 0),
    }),
    [filtered],
  )

  const columns: Column<Laporan>[] = [
    { header: "No", cell: (_, i) => i + 1, className: "w-12" },
    { header: "ID Anggota", cell: (l) => l.idAnggota },
    { header: "Nama Anggota", cell: (l) => <span className="font-semibold text-stone-800">{l.namaAnggota}</span> },
    { header: "Tgl Pinjam", cell: (l) => formatTanggal(l.tanggalPinjam) },
    { header: "Tgl Kembali", cell: (l) => formatTanggal(l.tanggalKembali) },
    { header: "Total Pinjam", cell: (l) => l.totalPinjam },
    { header: "Denda", cell: (l) => formatRupiah(l.denda) },
    { header: "Status", cell: (l) => <StatusBadge status={l.status} /> },
  ]

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard label="Total Transaksi" value={stats.transaksi} />
        <SummaryCard label="Belum Kembali" value={stats.belumKembali} />
        <SummaryCard label="Terlambat" value={stats.terlambat} />
        <SummaryCard label="Total Denda" value={stats.denda > 0 ? formatRupiah(stats.denda) : "Rp. 0"} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Cari nama atau ID anggota..." />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter status"
          className={`${inputClass} !w-auto`}
        >
          <option>Semua</option>
          <option>Belum Kembali</option>
          <option>Sudah Kembali</option>
          <option>Terlambat</option>
        </select>
        <PrimaryButton
          className="ml-auto"
          onClick={() => exportCsv(filtered)}
          disabled={filtered.length === 0}
        >
          <Download size={16} /> Export CSV
        </PrimaryButton>
      </div>

      <DataTable columns={columns} rows={filtered} getKey={(l) => l.id} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Tab 2 & 3: daftar file (bukti setoran / upload laporan)             */
/* ------------------------------------------------------------------ */
type FileRow = BuktiSetoran | UploadLaporan

function FileListTab<T extends FileRow>({
  initial,
  accept,
  uploadLabel,
  maxBytes,
  acceptStatus,
  rejectStatus,
  initialStatus,
}: {
  initial: T[]
  accept: string
  uploadLabel: string
  maxBytes: number
  /** status saat baris disetujui; kalau rejectStatus ada -> tombol tolak juga muncul */
  acceptStatus: T["status"]
  rejectStatus?: T["status"]
  initialStatus: T["status"]
}) {
  const [items, setItems] = useState<T[]>(initial)
  const [query, setQuery] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((i) => !q || i.namaFile.toLowerCase().includes(q))
  }, [items, query])

  const handleFile = (file: File | undefined) => {
    if (!file) return
    if (file.size > maxBytes) {
      setError(`Ukuran file maksimal ${formatUkuran(maxBytes)}`)
      return
    }
    setError(null)
    setItems((prev) => [
      {
        id: Math.max(0, ...prev.map((p) => p.id)) + 1,
        namaFile: file.name,
        ukuranFile: formatUkuran(file.size),
        tanggalUpload: today(),
        status: initialStatus,
      } as T,
      ...prev,
    ])
  }

  const setStatus = (id: number, status: T["status"]) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))

  const columns: Column<T>[] = [
    { header: "No", cell: (_, i) => i + 1, className: "w-12" },
    { header: "Nama File", cell: (r) => <span className="font-semibold text-stone-800">{r.namaFile}</span> },
    { header: "Ukuran", cell: (r) => r.ukuranFile },
    { header: "Tgl Upload", cell: (r) => formatTanggal(r.tanggalUpload) },
    { header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
    {
      header: "Aksi",
      cell: (r) => (
        <div className="flex gap-1">
          {r.status === initialStatus && (
            <>
              <IconButton label={rejectStatus ? "Terima" : "Tandai selesai"} tone="success" onClick={() => setStatus(r.id, acceptStatus)}>
                <Check size={16} />
              </IconButton>
              {rejectStatus && (
                <IconButton label="Tolak" tone="danger" onClick={() => setStatus(r.id, rejectStatus)}>
                  <X size={16} />
                </IconButton>
              )}
            </>
          )}
          <IconButton label={`Hapus ${r.namaFile}`} tone="danger" onClick={() => setDeleteTarget(r)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Cari nama file..." />
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0])
            e.target.value = "" // boleh upload file yang sama lagi
          }}
        />
        <PrimaryButton className="ml-auto" onClick={() => inputRef.current?.click()}>
          <Upload size={16} /> {uploadLabel}
        </PrimaryButton>
      </div>
      {error && (
        <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <DataTable columns={columns} rows={filtered} getKey={(r) => r.id} />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus File"
        message={`Yakin ingin menghapus "${deleteTarget?.namaFile}"?`}
        onConfirm={() => deleteTarget && setItems((p) => p.filter((i) => i.id !== deleteTarget.id))}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
export function ReportPage() {
  const [tab, setTab] = useState<Tab>("Data Laporan")

  return (
    <PageCard title="Laporan">
      <div role="tablist" className="mb-6 flex gap-2 border-b border-stone-200">
        {tabLaporan.map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${
              tab === t
                ? "border-coral-glow text-coral-glow"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Data Laporan" && <DataLaporanTab />}
      {tab === "Bukti Setoran" && (
        <FileListTab<BuktiSetoran>
          initial={initialBukti}
          accept="image/*,.pdf"
          uploadLabel="Upload Bukti"
          maxBytes={5_000_000}
          initialStatus="Pending"
          acceptStatus="Done"
        />
      )}
      {tab === "Upload Laporan" && (
        <FileListTab<UploadLaporan>
          initial={initialUpload}
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          uploadLabel="Upload Laporan"
          maxBytes={10_000_000}
          initialStatus="Pending"
          acceptStatus="Accepted"
          rejectStatus="Rejected"
        />
      )}
    </PageCard>
  )
}
