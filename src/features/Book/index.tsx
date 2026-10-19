import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { DataTable, type Column } from "../../components/DataTable"
import {
  ConfirmDialog,
  Field,
  IconButton,
  Modal,
  PageCard,
  PrimaryButton,
  SearchInput,
  SecondaryButton,
  StatusBadge,
  inputClass,
} from "../../components/ui"
import { dataBuku, kategoriBuku, type Buku } from "../../lib/dataLibrary"

const bukuSchema = z.object({
  kode: z.string().min(1, "Kode wajib diisi"),
  judul: z.string().min(1, "Judul wajib diisi"),
  pengarang: z.string().min(1, "Pengarang wajib diisi"),
  penerbit: z.string().min(1, "Penerbit wajib diisi"),
  tahun: z
    .number({ error: "Tahun wajib berupa angka" })
    .int("Tahun harus bilangan bulat")
    .min(1000, "Tahun tidak valid")
    .max(new Date().getFullYear(), "Tahun tidak boleh di masa depan"),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
  stok: z
    .number({ error: "Stok wajib berupa angka" })
    .int("Stok harus bilangan bulat")
    .min(0, "Stok tidak boleh negatif"),
})
type BukuForm = z.infer<typeof bukuSchema>

const emptyForm: BukuForm = {
  kode: "",
  judul: "",
  pengarang: "",
  penerbit: "",
  tahun: new Date().getFullYear(),
  kategori: kategoriBuku[0],
  stok: 1,
}

function BukuFormModal({
  open,
  editing,
  onClose,
  onSubmit,
}: {
  open: boolean
  editing: Buku | null
  onClose: () => void
  onSubmit: (v: BukuForm) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BukuForm>({
    resolver: zodResolver(bukuSchema),
    defaultValues: editing ? { ...editing } : emptyForm,
  })

  return (
    <Modal open={open} title={editing ? "Edit Buku" : "Tambah Buku"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Kode" error={errors.kode?.message}>
            <input className={inputClass} {...register("kode")} />
          </Field>
          <Field label="Kategori" error={errors.kategori?.message}>
            <select className={inputClass} {...register("kategori")}>
              {kategoriBuku.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Judul" error={errors.judul?.message}>
          <input className={inputClass} {...register("judul")} />
        </Field>
        <Field label="Pengarang" error={errors.pengarang?.message}>
          <input className={inputClass} {...register("pengarang")} />
        </Field>
        <Field label="Penerbit" error={errors.penerbit?.message}>
          <input className={inputClass} {...register("penerbit")} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tahun terbit" error={errors.tahun?.message}>
            <input type="number" className={inputClass} {...register("tahun", { valueAsNumber: true })} />
          </Field>
          <Field label="Stok" error={errors.stok?.message}>
            <input type="number" className={inputClass} {...register("stok", { valueAsNumber: true })} />
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
          <PrimaryButton type="submit">Simpan</PrimaryButton>
        </div>
      </form>
    </Modal>
  )
}

export function BookPage() {
  const [items, setItems] = useState<Buku[]>(dataBuku)
  const [query, setQuery] = useState("")
  const [kategori, setKategori] = useState("Semua")
  // modal: undefined = tertutup, null = tambah, Buku = edit
  const [formTarget, setFormTarget] = useState<Buku | null | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Buku | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (b) =>
        (kategori === "Semua" || b.kategori === kategori) &&
        (!q ||
          b.judul.toLowerCase().includes(q) ||
          b.pengarang.toLowerCase().includes(q) ||
          b.kode.toLowerCase().includes(q)),
    )
  }, [items, query, kategori])

  const handleSave = (v: BukuForm) => {
    if (formTarget) {
      setItems((prev) => prev.map((b) => (b.id === formTarget.id ? { ...b, ...v } : b)))
    } else {
      setItems((prev) => [{ id: Math.max(0, ...prev.map((b) => b.id)) + 1, ...v }, ...prev])
    }
    setFormTarget(undefined)
  }

  const columns: Column<Buku>[] = [
    { header: "No", cell: (_, i) => i + 1, className: "w-12" },
    { header: "Kode", cell: (b) => b.kode },
    { header: "Judul", cell: (b) => <span className="font-semibold text-stone-800">{b.judul}</span> },
    { header: "Pengarang", cell: (b) => b.pengarang },
    { header: "Tahun", cell: (b) => b.tahun },
    { header: "Kategori", cell: (b) => b.kategori },
    { header: "Stok", cell: (b) => b.stok },
    { header: "Status", cell: (b) => <StatusBadge status={b.stok > 0 ? "Tersedia" : "Habis"} /> },
    {
      header: "Aksi",
      cell: (b) => (
        <div className="flex gap-1">
          <IconButton label={`Edit ${b.judul}`} onClick={() => setFormTarget(b)}>
            <Pencil size={16} />
          </IconButton>
          <IconButton label={`Hapus ${b.judul}`} tone="danger" onClick={() => setDeleteTarget(b)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <PageCard
      title="Data Buku"
      action={
        <PrimaryButton onClick={() => setFormTarget(null)}>
          <Plus size={16} /> Tambah Buku
        </PrimaryButton>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Cari judul, pengarang, kode..." />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          aria-label="Filter kategori"
          className={`${inputClass} !w-auto`}
        >
          <option>Semua</option>
          {kategoriBuku.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} rows={filtered} getKey={(b) => b.id} />

      {formTarget !== undefined && (
        // key -> form di-reset tiap kali buka / ganti target
        <BukuFormModal
          key={formTarget?.id ?? "new"}
          open
          editing={formTarget}
          onClose={() => setFormTarget(undefined)}
          onSubmit={handleSave}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Buku"
        message={`Yakin ingin menghapus "${deleteTarget?.judul}"?`}
        onConfirm={() => deleteTarget && setItems((p) => p.filter((b) => b.id !== deleteTarget.id))}
        onClose={() => setDeleteTarget(null)}
      />
    </PageCard>
  )
}
