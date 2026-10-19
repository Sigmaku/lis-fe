// Dummy data modul Data Buku & Data Anggota.

export type StatusAnggota = "Aktif" | "Nonaktif";

export interface Buku {
  id: number;
  kode: string;
  judul: string;
  pengarang: string;
  penerbit: string;
  tahun: number;
  kategori: string;
  stok: number;
}

export interface Anggota {
  id: number;
  idAnggota: string;
  nama: string;
  email: string;
  noTelepon: string;
  alamat: string;
  tanggalDaftar: string; // ISO
  status: StatusAnggota;
}

export const kategoriBuku = [
  "Fiksi",
  "Sastra",
  "Sains",
  "Teknologi",
  "Sejarah",
  "Agama",
  "Anak-anak",
  "Ekonomi",
] as const;

export const dataBuku: Buku[] = [
  { id: 1, kode: "BK-001", judul: "Laskar Pelangi", pengarang: "Andrea Hirata", penerbit: "Bentang Pustaka", tahun: 2005, kategori: "Fiksi", stok: 5 },
  { id: 2, kode: "BK-002", judul: "Bumi Manusia", pengarang: "Pramoedya Ananta Toer", penerbit: "Hasta Mitra", tahun: 1980, kategori: "Sastra", stok: 3 },
  { id: 3, kode: "BK-003", judul: "Negeri 5 Menara", pengarang: "Ahmad Fuadi", penerbit: "Gramedia", tahun: 2009, kategori: "Fiksi", stok: 4 },
  { id: 4, kode: "BK-004", judul: "Sapiens", pengarang: "Yuval Noah Harari", penerbit: "KPG", tahun: 2017, kategori: "Sejarah", stok: 2 },
  { id: 5, kode: "BK-005", judul: "Clean Code", pengarang: "Robert C. Martin", penerbit: "Prentice Hall", tahun: 2008, kategori: "Teknologi", stok: 2 },
  { id: 6, kode: "BK-006", judul: "Atomic Habits", pengarang: "James Clear", penerbit: "Gramedia", tahun: 2019, kategori: "Ekonomi", stok: 6 },
  { id: 7, kode: "BK-007", judul: "Cosmos", pengarang: "Carl Sagan", penerbit: "Random House", tahun: 1980, kategori: "Sains", stok: 1 },
  { id: 8, kode: "BK-008", judul: "Pulang", pengarang: "Tere Liye", penerbit: "Republika", tahun: 2015, kategori: "Fiksi", stok: 0 },
  { id: 9, kode: "BK-009", judul: "Kisah Para Nabi", pengarang: "Ibnu Katsir", penerbit: "Pustaka Azzam", tahun: 2012, kategori: "Agama", stok: 4 },
  { id: 10, kode: "BK-010", judul: "Si Kancil dan Buaya", pengarang: "Tim Kreatif", penerbit: "Erlangga", tahun: 2018, kategori: "Anak-anak", stok: 8 },
  { id: 11, kode: "BK-011", judul: "Rich Dad Poor Dad", pengarang: "Robert Kiyosaki", penerbit: "Gramedia", tahun: 2011, kategori: "Ekonomi", stok: 3 },
  { id: 12, kode: "BK-012", judul: "Pemrograman Web dengan React", pengarang: "Budi Raharjo", penerbit: "Informatika", tahun: 2022, kategori: "Teknologi", stok: 5 },
  { id: 13, kode: "BK-013", judul: "A Brief History of Time", pengarang: "Stephen Hawking", penerbit: "Bantam", tahun: 1988, kategori: "Sains", stok: 2 },
  { id: 14, kode: "BK-014", judul: "Perahu Kertas", pengarang: "Dee Lestari", penerbit: "Bentang Pustaka", tahun: 2009, kategori: "Fiksi", stok: 0 },
  { id: 15, kode: "BK-015", judul: "Sejarah Indonesia Modern", pengarang: "M.C. Ricklefs", penerbit: "Serambi", tahun: 2008, kategori: "Sejarah", stok: 2 },
];

export const dataAnggota: Anggota[] = [
  { id: 1, idAnggota: "7665963761", nama: "Ahmad Abdullah", email: "ahmad.abdullah@mail.com", noTelepon: "081234500001", alamat: "Jl. Merdeka No. 12, Bandung", tanggalDaftar: "2024-01-15", status: "Aktif" },
  { id: 2, idAnggota: "3746317213", nama: "Nur Aisyah", email: "nur.aisyah@mail.com", noTelepon: "081234500002", alamat: "Jl. Melati No. 5, Jakarta", tanggalDaftar: "2024-02-03", status: "Aktif" },
  { id: 3, idAnggota: "4163119785", nama: "Rahman Mansur", email: "rahman.mansur@mail.com", noTelepon: "081234500003", alamat: "Jl. Kenanga No. 8, Surabaya", tanggalDaftar: "2024-02-20", status: "Aktif" },
  { id: 4, idAnggota: "8293453178", nama: "Maya Anggraini", email: "maya.anggraini@mail.com", noTelepon: "081234500004", alamat: "Jl. Mawar No. 21, Yogyakarta", tanggalDaftar: "2024-03-11", status: "Aktif" },
  { id: 5, idAnggota: "4466589567", nama: "Dimas Saputra", email: "dimas.saputra@mail.com", noTelepon: "081234500005", alamat: "Jl. Anggrek No. 3, Semarang", tanggalDaftar: "2024-04-02", status: "Nonaktif" },
  { id: 6, idAnggota: "9703905715", nama: "Lestari Handayani", email: "lestari.h@mail.com", noTelepon: "081234500006", alamat: "Jl. Dahlia No. 17, Malang", tanggalDaftar: "2024-04-18", status: "Aktif" },
  { id: 7, idAnggota: "9697354961", nama: "Siti Nurhaliza", email: "siti.nurhaliza@mail.com", noTelepon: "081234500007", alamat: "Jl. Cempaka No. 9, Medan", tanggalDaftar: "2024-05-07", status: "Aktif" },
  { id: 8, idAnggota: "1958682846", nama: "Surya Firdaus", email: "surya.firdaus@mail.com", noTelepon: "081234500008", alamat: "Jl. Flamboyan No. 14, Makassar", tanggalDaftar: "2024-05-29", status: "Aktif" },
  { id: 9, idAnggota: "8429141456", nama: "Hendra Gunawan", email: "hendra.g@mail.com", noTelepon: "081234500009", alamat: "Jl. Sudirman No. 40, Palembang", tanggalDaftar: "2024-06-13", status: "Nonaktif" },
  { id: 10, idAnggota: "1939042955", nama: "Agus Prasetyo", email: "agus.prasetyo@mail.com", noTelepon: "081234500010", alamat: "Jl. Diponegoro No. 2, Solo", tanggalDaftar: "2024-07-01", status: "Aktif" },
  { id: 11, idAnggota: "1127978094", nama: "Ruslan Ismail", email: "ruslan.ismail@mail.com", noTelepon: "081234500011", alamat: "Jl. Gatot Subroto No. 33, Denpasar", tanggalDaftar: "2024-07-22", status: "Aktif" },
  { id: 12, idAnggota: "4460967357", nama: "Eko Susanto", email: "eko.susanto@mail.com", noTelepon: "081234500012", alamat: "Jl. Pahlawan No. 6, Bogor", tanggalDaftar: "2024-08-09", status: "Aktif" },
  { id: 13, idAnggota: "8934927891", nama: "Putra Idris", email: "putra.idris@mail.com", noTelepon: "081234500013", alamat: "Jl. Veteran No. 19, Depok", tanggalDaftar: "2024-08-30", status: "Aktif" },
  { id: 14, idAnggota: "6756332150", nama: "Putri Melati", email: "putri.melati@mail.com", noTelepon: "081234500014", alamat: "Jl. Pemuda No. 27, Bekasi", tanggalDaftar: "2024-09-14", status: "Nonaktif" },
  { id: 15, idAnggota: "6241752544", nama: "Citra Kirana", email: "citra.kirana@mail.com", noTelepon: "081234500015", alamat: "Jl. Asia Afrika No. 1, Bandung", tanggalDaftar: "2024-10-05", status: "Aktif" },
];
