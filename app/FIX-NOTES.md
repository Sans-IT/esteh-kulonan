# Fix Prisma (generate & db push gagal) + Update Fitur

## Akar masalah Prisma

`prisma/schema.prisma` sebelumnya:

```prisma
datasource db {
  provider  = "postgresql"
}
```

Tidak ada `url`/`directUrl` — jadi walaupun `.env` kamu sudah benar,
`prisma generate` dan `prisma db push` tidak tahu harus connect ke mana.
`prisma.config.ts` kamu sudah benar (pakai `dotenv/config` + `env()`),
tapi itu tidak selalu cukup untuk semua perintah CLI di Prisma 6.x —
cara yang pasti jalan di semua versi adalah taruh `url`/`directUrl`
langsung di schema. Sudah diperbaiki jadi:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

`DATABASE_URL` = pooler transaksi (port 6543, `?pgbouncer=true`) dipakai
runtime app. `DIRECT_URL` = pooler sesi (port 5432) dipakai khusus untuk
`prisma migrate`/`db push` karena pgbouncer transaction-mode tidak
mendukung perintah DDL. Format `.env` kamu untuk keduanya sudah benar.

## Urutan perintah (jalankan dari root project)

```bash
# 1. install semua dependency (termasuk framer-motion yang baru ditambahkan)
pnpm install

# 2. generate Prisma Client
npx prisma generate

# 3. push schema ke Supabase (bikin tabel user/session/account/verification/reviews)
npx prisma db push

# 4. jalankan dev server
pnpm dev
```

Kalau `db push` masih error setelah ini, kemungkinan besar penyebabnya:
- Password di `DATABASE_URL`/`DIRECT_URL` salah / project Supabase pause.
- IP kamu diblok — cek Supabase → Settings → Database → "Network
  Restrictions" (pastikan tidak membatasi ke IP tertentu saja).
- `.env` tidak di root project (harus sejajar dengan `package.json`,
  `prisma/`, bukan di dalam folder lain).

## Ringkasan fitur yang ditambahkan/diperbaiki di sesi ini
- Fix Prisma `url`/`directUrl` (di atas).
- Link **Order** ditambahkan ke navbar (`/order` sudah ada sebelumnya).
- Peta Google Maps (embed, tanpa API key) + tombol "Buka di Maps" di
  tiap kartu cabang (`/cabang`).
- Ulasan lazy-load 5 komentar per scroll (infinite scroll via
  `IntersectionObserver`). Aturan 1 ulasan/akun sudah ada sebelumnya di
  DB — tidak diubah.
- Marquee ulasan di beranda, tampil hanya kalau ada data.
- Animasi teks staggered (fade-in) di Hero saja, dan efek 3D
  tilt-on-scroll di gambar/video Hero + Menu Andalan (pakai
  `framer-motion`, package baru).
- Dark / Light / System theme (sebelumnya dikunci light-only) + tombol
  toggle di navbar (shadcn/lucide style).
- Field **Catatan (opsional)** di sheet keranjang, ikut ke pesan WA
  checkout. Tombol **Kosongkan** tidak diubah/dihapus.

## Package baru yang perlu di-install
Sudah otomatis ke-install lewat `pnpm install` di atas karena sudah
ditambahkan ke `package.json`:
- `framer-motion` — animasi fade-in & 3D scroll tilt.

Kalau mau nambah manual (misal `package.json` belum ke-update di editor
kamu):
```bash
pnpm add framer-motion
```
