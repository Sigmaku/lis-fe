import { useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface Column<T> {
  header: string
  cell: (row: T, index: number) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  getKey: (row: T) => string | number
  pageSize?: number
  emptyText?: string
}

export function DataTable<T>({
  columns,
  rows,
  getKey,
  pageSize = 10,
  emptyText = "Data tidak ditemukan",
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const current = Math.min(page, totalPages) // aman kalau data berkurang
  const start = (current - 1) * pageSize
  const visible = rows.slice(start, start + pageSize)

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-stone-200">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="bg-soft-peach/60 text-stone-700">
            <tr>
              {columns.map((c) => (
                <th key={c.header} className={`px-3 py-3 font-semibold ${c.className ?? ""}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-stone-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              visible.map((row, i) => (
                <tr key={getKey(row)} className="hover:bg-soft-peach/20">
                  {columns.map((c) => (
                    <td key={c.header} className={`px-3 py-3 text-stone-700 ${c.className ?? ""}`}>
                      {c.cell(row, start + i)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-500">
        <span>
          {rows.length === 0
            ? "0 data"
            : `Menampilkan ${start + 1}–${start + visible.length} dari ${rows.length} data`}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current <= 1}
            aria-label="Halaman sebelumnya"
            className="grid h-8 w-8 place-items-center rounded-md border border-stone-200 hover:bg-soft-peach/40 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-2">
            {current} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current >= totalPages}
            aria-label="Halaman berikutnya"
            className="grid h-8 w-8 place-items-center rounded-md border border-stone-200 hover:bg-soft-peach/40 disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
