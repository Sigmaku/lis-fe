// Dummy data Library Information System - modul Laporan
// Tanggal pakai format ISO (YYYY-MM-DD), format ke mm/dd/yyyy di UI kalau perlu.
// Asumsi: batas pinjam 7 hari, denda Rp1.000/hari keterlambatan.

export type StatusLaporan = "Terlambat" | "Sudah Kembali" | "Belum Kembali";
export type StatusBukti = "Pending" | "Done";
export type StatusUpload = "Pending" | "Accepted" | "Rejected";

export type RoleUser = "Administrator" | "Petugas" | "Anggota";

export interface Profil {
  id: number;
  nama: string;
  role: RoleUser;
  email: string;
  noTelepon: string;
  avatar: string;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: string;
}

export interface Laporan {
  id: number;
  idAnggota: string;
  namaAnggota: string;
  tanggalPinjam: string;
  tanggalKembali: string | null;
  totalPinjam: number;
  denda: number;
  status: StatusLaporan;
}

export interface BuktiSetoran {
  id: number;
  namaFile: string;
  ukuranFile: string;
  tanggalUpload: string;
  status: StatusBukti;
}

export interface UploadLaporan {
  id: number;
  namaFile: string;
  ukuranFile: string;
  tanggalUpload: string;
  status: StatusUpload;
}

export const profil: Profil = {
  id: 1,
  nama: "Dwi Annisa",
  role: "Administrator",
  email: "dwi.annisa@perpustakaan.id",
  noTelepon: "081234567890",
  avatar: "https://i.pravatar.cc/150?img=47", // ganti ke path asset lokal kalau perlu
};

export const DUMMY_PASSWORD = "password123";

export const menuSidebar: MenuItem[] = [
  { label: "Data Buku", path: "/data-buku", icon: "book" },
  { label: "Data Anggota", path: "/data-anggota", icon: "users" },
  { label: "Transaksi", path: "/transaksi", icon: "download" },
  { label: "Laporan", path: "/laporan", icon: "file-text" },
];

export const tabLaporan = ["Data Laporan", "Bukti Setoran", "Upload Laporan"] as const;

export const dataLaporan: Laporan[] = [
  { id: 1, idAnggota: "7665963761", namaAnggota: "Ahmad Abdullah", tanggalPinjam: "2026-09-25", tanggalKembali: null, totalPinjam: 1, denda: 0, status: "Belum Kembali" },
  { id: 2, idAnggota: "3746317213", namaAnggota: "Nur Aisyah", tanggalPinjam: "2026-09-23", tanggalKembali: null, totalPinjam: 2, denda: 0, status: "Belum Kembali" },
  { id: 3, idAnggota: "4163119785", namaAnggota: "Rahman Mansur", tanggalPinjam: "2026-09-20", tanggalKembali: "2026-09-24", totalPinjam: 1, denda: 0, status: "Sudah Kembali" },
  { id: 4, idAnggota: "8293453178", namaAnggota: "Maya Anggraini", tanggalPinjam: "2026-09-20", tanggalKembali: null, totalPinjam: 3, denda: 0, status: "Belum Kembali" },
  { id: 5, idAnggota: "4466589567", namaAnggota: "Dimas Saputra", tanggalPinjam: "2026-09-19", tanggalKembali: "2026-09-21", totalPinjam: 3, denda: 0, status: "Sudah Kembali" },
  { id: 6, idAnggota: "9703905715", namaAnggota: "Lestari Handayani", tanggalPinjam: "2026-09-19", tanggalKembali: null, totalPinjam: 1, denda: 0, status: "Belum Kembali" },
  { id: 7, idAnggota: "9697354961", namaAnggota: "Siti Nurhaliza", tanggalPinjam: "2026-09-16", tanggalKembali: "2026-09-20", totalPinjam: 3, denda: 0, status: "Sudah Kembali" },
  { id: 8, idAnggota: "1958682846", namaAnggota: "Surya Firdaus", tanggalPinjam: "2026-09-14", tanggalKembali: "2026-09-26", totalPinjam: 2, denda: 5000, status: "Terlambat" },
  { id: 9, idAnggota: "8429141456", namaAnggota: "Hendra Gunawan", tanggalPinjam: "2026-09-14", tanggalKembali: null, totalPinjam: 1, denda: 0, status: "Belum Kembali" },
  { id: 10, idAnggota: "1939042955", namaAnggota: "Agus Prasetyo", tanggalPinjam: "2026-09-12", tanggalKembali: null, totalPinjam: 3, denda: 0, status: "Belum Kembali" },
  { id: 11, idAnggota: "1127978094", namaAnggota: "Ruslan Ismail", tanggalPinjam: "2026-09-08", tanggalKembali: null, totalPinjam: 1, denda: 0, status: "Belum Kembali" },
  { id: 12, idAnggota: "4460967357", namaAnggota: "Eko Susanto", tanggalPinjam: "2026-09-04", tanggalKembali: null, totalPinjam: 1, denda: 0, status: "Belum Kembali" },
  { id: 13, idAnggota: "8934927891", namaAnggota: "Putra Idris", tanggalPinjam: "2026-09-03", tanggalKembali: "2026-09-19", totalPinjam: 1, denda: 9000, status: "Terlambat" },
  { id: 14, idAnggota: "6756332150", namaAnggota: "Putri Melati", tanggalPinjam: "2026-09-01", tanggalKembali: "2026-09-15", totalPinjam: 2, denda: 7000, status: "Terlambat" },
  { id: 15, idAnggota: "6241752544", namaAnggota: "Citra Kirana", tanggalPinjam: "2026-09-01", tanggalKembali: null, totalPinjam: 1, denda: 0, status: "Belum Kembali" },
  { id: 16, idAnggota: "7887950851", namaAnggota: "Indah Permata", tanggalPinjam: "2026-08-31", tanggalKembali: "2026-09-05", totalPinjam: 2, denda: 0, status: "Sudah Kembali" },
  { id: 17, idAnggota: "3479708607", namaAnggota: "Ismail Sulaiman", tanggalPinjam: "2026-08-30", tanggalKembali: "2026-09-03", totalPinjam: 1, denda: 0, status: "Sudah Kembali" },
  { id: 18, idAnggota: "4026113008", namaAnggota: "Bayu Firmansyah", tanggalPinjam: "2026-08-26", tanggalKembali: null, totalPinjam: 3, denda: 0, status: "Belum Kembali" },
  { id: 19, idAnggota: "3303082117", namaAnggota: "Dewi Lestari", tanggalPinjam: "2026-08-25", tanggalKembali: null, totalPinjam: 3, denda: 0, status: "Belum Kembali" },
  { id: 20, idAnggota: "2812140441", namaAnggota: "Fitri Rahmawati", tanggalPinjam: "2026-08-25", tanggalKembali: "2026-09-04", totalPinjam: 1, denda: 3000, status: "Terlambat" },
  { id: 21, idAnggota: "9963334018", namaAnggota: "Tiara Salsabila", tanggalPinjam: "2026-08-24", tanggalKembali: "2026-08-30", totalPinjam: 2, denda: 0, status: "Sudah Kembali" },
  { id: 22, idAnggota: "7825844140", namaAnggota: "Rizky Ramadhan", tanggalPinjam: "2026-08-22", tanggalKembali: "2026-08-28", totalPinjam: 1, denda: 0, status: "Sudah Kembali" },
  { id: 23, idAnggota: "5693307665", namaAnggota: "Wira Cahya", tanggalPinjam: "2026-08-21", tanggalKembali: "2026-08-28", totalPinjam: 2, denda: 0, status: "Sudah Kembali" },
  { id: 24, idAnggota: "2181241943", namaAnggota: "Budi Santoso", tanggalPinjam: "2026-08-21", tanggalKembali: "2026-08-24", totalPinjam: 1, denda: 0, status: "Sudah Kembali" },
  { id: 25, idAnggota: "1667779376", namaAnggota: "Andi Wijaya", tanggalPinjam: "2026-08-21", tanggalKembali: null, totalPinjam: 3, denda: 0, status: "Belum Kembali" },
  { id: 26, idAnggota: "2625792787", namaAnggota: "Buana Ahmad", tanggalPinjam: "2026-08-20", tanggalKembali: "2026-08-23", totalPinjam: 1, denda: 0, status: "Sudah Kembali" },
  { id: 27, idAnggota: "8995970241", namaAnggota: "Fajar Nugroho", tanggalPinjam: "2026-08-17", tanggalKembali: "2026-08-22", totalPinjam: 3, denda: 0, status: "Sudah Kembali" },
  { id: 28, idAnggota: "7635473142", namaAnggota: "Rina Wulandari", tanggalPinjam: "2026-08-15", tanggalKembali: "2026-08-22", totalPinjam: 2, denda: 0, status: "Sudah Kembali" },
  { id: 29, idAnggota: "2445662585", namaAnggota: "Yoga Pratama", tanggalPinjam: "2026-08-05", tanggalKembali: "2026-08-16", totalPinjam: 2, denda: 4000, status: "Terlambat" },
  { id: 30, idAnggota: "5710360983", namaAnggota: "Mohamad Zakaria", tanggalPinjam: "2026-08-03", tanggalKembali: "2026-08-18", totalPinjam: 1, denda: 8000, status: "Terlambat" },
];

export const buktiSetoran: BuktiSetoran[] = [
  { id: 1, namaFile: "Bukti Setoran Denda 2021/2022.jpg", ukuranFile: "1,8mb", tanggalUpload: "2026-07-30", status: "Done" },
  { id: 2, namaFile: "Bukti Setoran Denda 2018/2019.jpg", ukuranFile: "1,8mb", tanggalUpload: "2026-07-09", status: "Done" },
  { id: 3, namaFile: "Bukti Setoran Denda 2020/2021.png", ukuranFile: "1,5mb", tanggalUpload: "2026-06-09", status: "Done" },
  { id: 4, namaFile: "Bukti Setoran Denda 2022/2023.png", ukuranFile: "1,2mb", tanggalUpload: "2026-04-21", status: "Pending" },
  { id: 5, namaFile: "Bukti Setoran Denda 2018/2019.pdf", ukuranFile: "1,3mb", tanggalUpload: "2026-01-25", status: "Pending" },
  { id: 6, namaFile: "Bukti Setoran Denda 2024/2025.jpg", ukuranFile: "2mb", tanggalUpload: "2026-01-20", status: "Done" },
  { id: 7, namaFile: "Bukti Setoran Denda 2019/2020.jpg", ukuranFile: "2,4mb", tanggalUpload: "2025-12-29", status: "Done" },
  { id: 8, namaFile: "Bukti Setoran Denda 2025/2026.png", ukuranFile: "1,2mb", tanggalUpload: "2025-12-27", status: "Pending" },
  { id: 9, namaFile: "Bukti Setoran Denda 2019/2020.png", ukuranFile: "1,5mb", tanggalUpload: "2025-12-23", status: "Done" },
  { id: 10, namaFile: "Bukti Setoran Denda 2023/2024.pdf", ukuranFile: "1,1mb", tanggalUpload: "2025-12-09", status: "Pending" },
  { id: 11, namaFile: "Bukti Setoran Denda 2020/2021.pdf", ukuranFile: "780kb", tanggalUpload: "2025-11-23", status: "Done" },
  { id: 12, namaFile: "Bukti Setoran Denda 2021/2022.pdf", ukuranFile: "1,1mb", tanggalUpload: "2025-10-07", status: "Done" },
];

export const uploadLaporan: UploadLaporan[] = [
  { id: 1, namaFile: "Laporan Denda Tahun 2021.docx", ukuranFile: "167kb", tanggalUpload: "2026-09-25", status: "Pending" },
  { id: 2, namaFile: "Laporan Denda Tahun 2023.pdf", ukuranFile: "1,1mb", tanggalUpload: "2026-08-27", status: "Pending" },
  { id: 3, namaFile: "Laporan Denda Tahun 2024.xls", ukuranFile: "450kb", tanggalUpload: "2026-07-29", status: "Accepted" },
  { id: 4, namaFile: "Laporan Denda Tahun 2020.xls", ukuranFile: "450kb", tanggalUpload: "2026-06-03", status: "Pending" },
  { id: 5, namaFile: "Laporan Denda Tahun 2026.pdf", ukuranFile: "1,1mb", tanggalUpload: "2026-03-08", status: "Rejected" },
  { id: 6, namaFile: "Laporan Denda Tahun 2018.docx", ukuranFile: "167kb", tanggalUpload: "2026-01-08", status: "Accepted" },
  { id: 7, namaFile: "Laporan Denda Tahun 2022.pdf", ukuranFile: "1,2mb", tanggalUpload: "2025-12-01", status: "Accepted" },
  { id: 8, namaFile: "Laporan Denda Tahun 2017.pdf", ukuranFile: "840kb", tanggalUpload: "2025-10-21", status: "Accepted" },
  { id: 9, namaFile: "Laporan Denda Tahun 2019.pdf", ukuranFile: "1,1mb", tanggalUpload: "2025-07-15", status: "Pending" },
  { id: 10, namaFile: "Laporan Denda Tahun 2025.docx", ukuranFile: "312kb", tanggalUpload: "2025-06-25", status: "Rejected" },
];

export const totalDenda = dataLaporan.reduce((sum, l) => sum + l.denda, 0);

// Helper format
export const formatRupiah = (n: number) => (n > 0 ? `Rp. ${n.toLocaleString("id-ID")}` : "-");
export const formatTanggal = (iso: string | null) => {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
};