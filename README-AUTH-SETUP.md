# Setup Login Google & Database Ulasan (Supabase + Prisma + better-auth)

Fitur Ulasan butuh database (Prisma → Supabase Postgres) dan login Google
— dua hal ini perlu kamu setup akun cloud-nya sendiri, nggak bisa
diaktifin dari sisi kode doang. Ikuti urutan ini:

## 1. Buat project Supabase
1. Daftar/login di [supabase.com](https://supabase.com) → New Project
2. Buka **Project Settings → Database → Connection string**, Supabase
   kasih 2 jenis koneksi — kita butuh dua-duanya:
   - **Transaction pooler** (port 6543) → tempel ke `DATABASE_URL`
   - **Direct connection** (port 5432) → tempel ke `DIRECT_URL`
3. Rename `.env.example` jadi `.env`, isi kedua URL itu

## 2. Buat kredensial Google OAuth
1. Buka [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. **Create Credentials → OAuth client ID** → tipe **Web application**
3. Di **Authorized redirect URIs**, tambahkan:
   - `http://localhost:3000/api/auth/callback/google` (lokal)
   - `https://domain-kamu.com/api/auth/callback/google` (production, nanti)
4. Copy **Client ID** & **Client Secret** → isi ke `GOOGLE_CLIENT_ID`
   dan `GOOGLE_CLIENT_SECRET` di `.env`

## 3. Isi sisa `.env`
```bash
BETTER_AUTH_SECRET=$(openssl rand -base64 32)   # atau string acak manual
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 4. Install & migrate database (Prisma)
```bash
pnpm install
pnpm db:migrate
```
Perintah `db:migrate` (alias `prisma migrate dev`) otomatis membuat semua
tabel yang dibutuhkan — punya better-auth (`user`, `session`, `account`,
`verification`) **dan** tabel `reviews` — langsung dari `prisma/schema.prisma`
ke Supabase. Nggak perlu jalanin SQL manual lagi.

## 5. Jalankan
```bash
pnpm dev
```
Buka `/ulasan` → **Login dengan Google** → form ulasan muncul.

## Aturan yang sudah ditegakkan di server
- **1 ulasan per akun** — kolom `userId` di tabel `reviews` diberi
  constraint `@unique`, dicek juga di API sebelum insert
- **Edit** ulasan sendiri → `PATCH /api/reviews/[id]`, ditolak kalau
  bukan pemiliknya (dicek `session.user.id`)
- **Hapus** ulasan sendiri → `DELETE /api/reviews/[id]`, sama, dicek pemilik
- **Limit 200 karakter** per komentar, ditegakkan di client (maxLength +
  counter) dan di server (dipotong otomatis kalau kepanjangan)
- Label **"diedit"** muncul otomatis kalau `updatedAt !== createdAt`

## Production (mis. Vercel)
- Set semua env var yang sama di dashboard hosting (ganti `BETTER_AUTH_URL`
  & `NEXT_PUBLIC_APP_URL` ke domain production)
- Tambahkan redirect URI production ke Google Cloud Console (langkah 2.3)
- Jalankan `pnpm db:migrate` sekali lagi kalau schema berubah setelah deploy

## Troubleshooting: error `Unknown argument 'issuer'` saat login Google

Kalau muncul error seperti ini pas callback Google:

```
Error [PrismaClientValidationError]: ... Unknown argument `issuer`.
Did you mean `user`?
```

Penyebabnya: `better-auth` versi 1.7.0 ke atas mengubah struktur tabel
`account` secara **breaking** (kolom `accountId` → `providerAccountId`,
dan kolom baru `issuer` jadi wajib) untuk keamanan akun OAuth. Karena
`package.json` sebelumnya pakai `"better-auth": "^1.2.0"`, `pnpm install`
otomatis narik versi terbaru (1.7.x) yang strukturnya sudah tidak cocok
dengan `prisma/schema.prisma` yang masih format lama.

Sudah diperbaiki di project ini dengan mengunci versi ke **1.6.30**
(versi stabil terakhir sebelum breaking change tsb), jadi kamu tidak perlu
migrasi ulang skema `account`. Langkah supaya perbaikannya kepakai:

1. Hapus dependency lama:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   ```
2. Install ulang (akan otomatis pakai versi 1.6.30 yang sudah dikunci di
   `package.json`):
   ```bash
   pnpm install
   ```
3. Generate ulang Prisma client (schema tidak berubah, cukup regenerate):
   ```bash
   npx prisma generate
   ```
4. Jalankan lagi:
   ```bash
   pnpm dev
   ```
5. Coba login Google lagi dari `/login` — seharusnya sudah lancar.

> Kalau suatu saat memang mau upgrade ke better-auth 1.7+, itu perlu
> migrasi skema manual (rename kolom `accountId`→`providerAccountId`,
> isi `issuer` untuk akun yang sudah ada) sesuai upgrade guide resmi
> mereka — jangan cuma `prisma db push`, karena data akun lama bisa
> "yatim" (tidak ke-link ke user manapun) kalau `issuer`-nya kosong.
