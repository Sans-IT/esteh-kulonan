-- Jalankan SETELAH migrasi tabel better-auth (user, session, account,
-- verification) sudah dibuat. Lihat README-AUTH-SETUP.md untuk urutannya.
--
-- Jalankan file ini di Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user"(id) on delete cascade,
  user_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now(),
  -- 1 ulasan per akun:
  constraint reviews_user_id_unique unique (user_id)
);

create index if not exists reviews_created_at_idx on reviews (created_at desc);
