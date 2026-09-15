# Es Teh Kulonan — Panduan Project

## Jalankan
```bash
pnpm install
pnpm dev
```

## Struktur halaman
- `/` — Beranda
- `/tentang` — Tentang kami, makna logo, Jumat Berkah
- `/menu` — Semua menu (gambar + harga + best seller badge), search, tambah ke keranjang
- `/ulasan` — Ulasan pelanggan (perlu login Google, 1 ulasan/akun)
- `/cabang` — 10 titik jualan + WA
- `/franchise` — Paket A (Ekonomis) & Paket B (Jos)

## Keranjang / Order
Keranjang sekarang berupa **sidebar** (klik ikon keranjang di navbar,
di halaman manapun) — bukan halaman terpisah lagi. Checkout mengirim
ringkasan pesanan + total ke WhatsApp (`lib/data.ts` → `WA_NUMBER`).

## Gambar & video (Google Drive)
Semua foto/video diambil dari link Google Drive, diatur di `lib/media.ts`:
- `driveVideos` / `drivePhotos` — video hero, tim, franchise, dll
- `driveMenuImages` — foto tiap item menu (key = id/slug item), auto-generate
  dari `lib/data.ts` supaya semua item selalu punya slot foto

Cara isi: upload file ke Drive → share "siapa saja yang punya link" →
copy ID dari URL file → tempel ke value yang sesuai. Selama kosong,
tampil placeholder bergaris putus-putus.

**Semua foto menu (23 item), video hero/kenapa-memilih-kami/menu-andalan/
tim/Jumat-Berkah, foto tim & gerai di bagian "Tentang", serta logo resmi
di navbar/footer/"Makna Logo" sudah diisi** sesuai link Drive yang dikirim
via chat. Yang masih placeholder tinggal foto paket franchise A & B
(`drivePhotos.franchisePaketA` / `franchisePaketB`) — kirim link Drive-nya
kapan saja, nanti diisikan.

⚠️ Cek ulang khusus **"Teh Melon"**: link yang dikirim untuk item ini
sama persis dengan link "Teh Leci" (kemungkinan ke-double-kirim saat
chat), jadi sementara foto Teh Melon masih memakai foto Teh Leci. Kirim
foto Teh Melon yang benar kalau ada, nanti langsung diganti.

## Ulasan (Login Google + Database)
Fitur ini pakai **Supabase (Postgres) + better-auth (Google OAuth) +
react-query**, 1 ulasan per akun (ditegakkan di level database).

**Ini butuh setup akun cloud dari kamu** (bikin project Supabase +
kredensial Google OAuth) — nggak bisa aku aktifkan dari sisi kode saja.
Langkah lengkapnya ada di **`README-AUTH-SETUP.md`**. Sebelum itu
di-setup, halaman `/ulasan` akan gagal fetch data (butuh `DATABASE_URL`).

## Font & Warna
- Font judul: **DM Serif Display** (file kamu, dipasang via `next/font/local`,
  class `font-heading`) — font body tetap default preset shadcn kamu
- Tema warna: **kuning/keemasan**, token ada di `app/globals.css` (shadcn)
  dan `app/brand-theme.css` (custom section)
- **Dark / Light / System** — sekarang aktif penuh, tombol toggle ada di
  navbar (ikon matahari/bulan/monitor). Sebelumnya dikunci light-only,
  sekarang punya palet gelap sendiri di `.dark` (globals.css +
  brand-theme.css).

## Fitur tambahan (update terbaru)
- **Order** (`/order`) — sekarang muncul di navbar, isinya keranjang +
  catatan pesanan, sama seperti sebelumnya cuma sekarang mudah diakses
  langsung dari menu (bukan cuma lewat ikon keranjang).
- **Cabang** (`/cabang`) — tiap kartu cabang sekarang ada peta Google Maps
  (embed langsung dari alamat, tanpa perlu API key) + tombol "Buka di
  Maps" untuk rute, selain tombol chat WA yang sudah ada.
- **Ulasan** (`/ulasan`) — daftar ulasan sekarang lazy-load 5 dulu, nambah
  5 lagi otomatis saat discroll ke bawah (infinite scroll), supaya tidak
  berat kalau ulasan sudah banyak. Aturan 1 ulasan/akun tetap sama
  (ditegakkan lewat `userId` unique + cek di API `/api/reviews`).
- **Beranda** — kalau sudah ada ulasan, tampil marquee (teks berjalan)
  cuplikan ulasan pelanggan di bawah bagian "Apa Kata Pelanggan"; kalau
  belum ada ulasan sama sekali, marquee tidak ditampilkan.
- **Animasi** — dipakai secukupnya, tidak di semua elemen:
  - Hero: teks (badge → judul → paragraf → tombol) muncul fade-in
    bertahap (staggered) sekali saat halaman pertama dibuka.
  - Gambar/video di Hero dan Menu Andalan punya efek tilt 3D ringan
    mengikuti posisi scroll (pakai `framer-motion`).
- **Keranjang** — ada field **Catatan (opsional)** di sheet keranjang
  (mis. "tidak terlalu manis"), ikut terkirim ke pesan WhatsApp saat
  checkout. Tombol **Kosongkan** tetap ada seperti sebelumnya.
