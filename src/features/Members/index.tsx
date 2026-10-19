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
import { dataAnggota, type Anggota } from "../../lib/dataLibrary"
import { formatTanggal } from "../../lib/dataDummy"

const anggotaSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  noTelepon: z
    .string()
    .min(1, "No. telepon wajib diisi")
    .regex(/^[0-9+]{8,15}$/, "No. telepon tidak valid (8–15 digit)"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  status: z.enum(["Aktif", "Nonaktif"]),
})
type AnggotaForm = z.infer<typeof anggotaSchema>

const emptyForm: AnggotaForm = { nama: "", email: "", noTelepon: "", alamat: "", status: "Aktif" }

// ID anggota 10 digit acak, dijamin unik terhadap daftar yang ada
function generateIdAnggota(existing: string[]) {
  const make = () => String(Math.floor(1_000_000_000 + Math.random() * 9_000_000_000))
  let id = make()
  while (existing.includes(id)) id = make()
  return id
}

function AnggotaFormModal({
  editing,
  onClose,
  onSubmit,
}: {
  editing: Anggota | null
  onClose: () => void
  onSubmit: (v: AnggotaForm) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnggotaForm>({
    resolver: zodResolver(anggotaSchema),
    defaultValues: editing
      ? {
          nama: editing.nama,
          email: editing.email,
          noTelepon: editing.noTelepon,
          alamat: editing.alamat,
          status: editing.status,
        }
      : emptyForm,
  })

  return (
    <Modal open title={editing ? "Edit Anggota" : "Tambah Anggota"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <Field label="Nama lengkap" error={errors.nama?.message}>
          <input className={inputClass} {...register("nama")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" className={inputClass} {...register("email")} />
        </Field>
        <Field label="No. telepon" error={errors.noTelepon?.message}>
          <input className={inputClass} {...register("noTelepon")} />
        </Field>
        <Field label="Alamat" error={errors.alamat?.message}>
          <textarea rows={2} className={inputClass} {...register("alamat")} />
        </Field>
        <Field label="Status" error={errors.status?.message}>
          <select className={inputClass} {...register("status")}>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
          <PrimaryButton type="submit">Simpan</PrimaryButton>
        </div>
      </form>
    </Modal>
  )
}

export function MembersPage() {
  const [items, setItems] = useState<Anggota[]>(dataAnggota)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("Semua")
  // undefined = tertutup, null = tambah, Anggota = edit
  const [formTarget, setFormTarget] = useState<Anggota | null | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Anggota | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (a) =>
        (status === "Semua" || a.status === status) &&
        (!q ||
          a.nama.toLowerCase().includes(q) ||
          a.idAnggota.includes(q) ||
          a.email.toLowerCase().includes(q)),
    )
  }, [items, query, status])

  const handleSave = (v: AnggotaForm) => {
    if (formTarget) {
      setItems((prev) => prev.map((a) => (a.id === formTarget.id ? { ...a, ...v } : a)))
    } else {
      setItems((prev) => [
        {
          id: Math.max(0, ...prev.map((a) => a.id)) + 1,
          idAnggota: generateIdAnggota(prev.map((a) => a.idAnggota)),
          tanggalDaftar: new Date().toISOString().slice(0, 10),
          ...v,
        },
        ...prev,
      ])
    }
    setFormTarget(undefined)
  }

  const columns: Column<Anggota>[] = [
    { header: "No", cell: (_, i) => i + 1, className: "w-12" },
    { header: "ID Anggota", cell: (a) => a.idAnggota },
    {
      header: "Nama",
      cell: (a) => (
        <div>
          <div className="font-semibold text-stone-800">{a.nama}</div>
          <div className="text-xs text-stone-500">{a.email}</div>
        </div>
      ),
    },
    { header: "No. Telepon", cell: (a) => a.noTelepon },
    { header: "Alamat", cell: (a) => <span className="block max-w-44 truncate" title={a.alamat}>{a.alamat}</span> },
    { header: "Tgl Daftar", cell: (a) => formatTanggal(a.tanggalDaftar) },
    { header: "Status", cell: (a) => <StatusBadge status={a.status} /> },
    {
      header: "Aksi",
      cell: (a) => (
        <div className="flex gap-1">
          <IconButton label={`Edit ${a.nama}`} onClick={() => setFormTarget(a)}>
            <Pencil size={16} />
          </IconButton>
          <IconButton label={`Hapus ${a.nama}`} tone="danger" onClick={() => setDeleteTarget(a)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <PageCard
      title="Data Anggota"
      action={
        <PrimaryButton onClick={() => setFormTarget(null)}>
          <Plus size={16} /> Tambah Anggota
        </PrimaryButton>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder="Cari nama, ID, email..." />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter status"
          className={`${inputClass} !w-auto`}
        >
          <option>Semua</option>
          <option>Aktif</option>
          <option>Nonaktif</option>
        </select>
      </div>

      <DataTable columns={columns} rows={filtered} getKey={(a) => a.id} />

      {formTarget !== undefined && (
        <AnggotaFormModal
          key={formTarget?.id ?? "new"}
          editing={formTarget}
          onClose={() => setFormTarget(undefined)}
          onSubmit={handleSave}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Anggota"
        message={`Yakin ingin menghapus anggota "${deleteTarget?.nama}"?`}
        onConfirm={() => deleteTarget && setItems((p) => p.filter((a) => a.id !== deleteTarget.id))}
        onClose={() => setDeleteTarget(null)}
      />
    </PageCard>
  )
}
