# Convex Setup

Backend sudah disiapkan untuk:

- `users`: register, login, update profile
- `meals`: tambah, edit, hapus, ambil data meal per hari
- `summaries`: hitung total nutrisi harian

Langkah aktivasi backend live:

1. Jalankan `npx convex dev`
2. Login ke Convex saat diminta
3. Salin URL deployment
4. Tambahkan env `EXPO_PUBLIC_CONVEX_URL=<url>`
5. Hubungkan hook frontend ke query/mutation Convex jika ingin mengganti penyimpanan lokal

Saat ini frontend tetap bisa dipakai karena memakai store lokal persisten sebagai MVP offline-friendly.
