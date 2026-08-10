# Cara Pasang ke Project Next.js Kamu

Struktur ini untuk **ditambahkan** ke project hasil
`pnpm dlx shadcn@latest init --preset b3sRPrwWpE --base radix --template next --pointer`
milikmu — bukan menimpa semuanya.

## 1. Copy folder
Salin isi berikut ke root project (timpa jika nama sama):
- `app/page.tsx`, `app/tentang/`, `app/menu/`, `app/order/`, `app/cabang/`, `app/franchise/`
- `app/brand-theme.css` → file baru, hanya token warna, **font tidak diubah**
- `components/gunungan-icon.tsx`, `components/drive-media.tsx`
- `components/sections/*`
- `lib/data.ts`, `lib/media.ts`

## 2. Komponen shadcn yang dipakai
```bash
npx shadcn@latest add button card badge
```

## 3. Pasang warna (tanpa ganti font)
Di `app/layout.tsx`, tambahkan satu baris import setelah `"./globals.css"`:
```ts
import "./brand-theme.css";
```
Font tetap ikut default dari preset shadcn kamu — file ini cuma menambah
variabel warna (`--color-primary`, `--color-secondary`, dst).

## 4. Struktur halaman (sesuai isi Google Drive)
- `/` — Beranda: hero, cerita singkat, kenapa memilih kami, menu andalan
- `/tentang` — Tentang kami, makna logo gunungan, Jumat Berkah
- `/menu` — Best seller + daftar harga lengkap
- `/order` — Cara pesan + tombol WA per menu andalan
- `/cabang` — 10 titik jualan + link WA per cabang
- `/franchise` — Paket A & B

Nomor WA diatur satu tempat: `lib/data.ts` → `WA_NUMBER` (`081299960009`).

## 5. Gambar & video via Google Drive
Semua foto/video ditarik langsung dari **link Google Drive**, bukan file
lokal. Alurnya:
1. Upload foto/video ke folder Drive kamu yang sesuai (mis. folder
   "Best seller teh kulonan", "foto tim es teh kulonan").
2. Klik kanan file → Bagikan → set ke "Siapa saja yang memiliki link".
3. Copy **ID file** dari URL-nya, contoh:
   `https://drive.google.com/file/d/1AbCdeFG.../view` → ID = `1AbCdeFG...`
4. Tempel ID itu ke `lib/media.ts`, di key yang sesuai (semua key sudah
   diberi komentar posisinya di halaman mana).

Selama ID masih kosong, halaman menampilkan slot placeholder bergaris
putus-putus di posisi tersebut — jadi kamu bisa lihat persis di mana foto
itu akan muncul sebelum kontennya siap.

> Catatan: dua folder Drive-mu ("Best seller teh kulonan" dan "foto tim es
> teh kulonan") saat ini masih kosong — belum ada file di dalamnya.

## 6. Jalankan
```bash
pnpm dev
```
