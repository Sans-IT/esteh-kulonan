import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { REVIEW_MAX_LENGTH } from "@/app/api/reviews/route";

function isRecordNotFound(err: unknown) {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025";
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Kamu harus login dulu" }, { status: 401 });
  }

  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Ulasan tidak ditemukan" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Kamu cuma bisa mengubah ulasanmu sendiri" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const rating = Math.min(5, Math.max(1, Number(body.rating) || existing.rating));
  const comment = String(body.comment ?? existing.comment).trim().slice(0, REVIEW_MAX_LENGTH);

  if (!comment) {
    return NextResponse.json({ error: "Komentar tidak boleh kosong" }, { status: 400 });
  }

  const review = await prisma.review
    .update({
      where: { id },
      data: { rating, comment },
    })
    .catch((err) => {
      // Race: ulasan sudah kehapus di request lain di antara pengecekan
      // `existing` di atas dan `update` ini. Perlakukan sebagai "sudah
      // tidak ada" (404) alih-alih 500 crash.
      if (isRecordNotFound(err)) return null;
      throw err;
    });

  if (!review) {
    return NextResponse.json({ error: "Ulasan tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ review });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Kamu harus login dulu" }, { status: 401 });
  }

  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Ulasan tidak ditemukan" }, { status: 404 });
  }
  if (existing.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Kamu cuma bisa menghapus ulasanmu sendiri" },
      { status: 403 }
    );
  }

  // Idempotent: kalau ulasan sudah kehapus duluan (mis. double-click atau
  // request ganda dari client), anggap saja berhasil (200) alih-alih
  // crash 500 karena Prisma tidak menemukan baris yang mau dihapus.
  await prisma.review.delete({ where: { id } }).catch((err) => {
    if (isRecordNotFound(err)) return null;
    throw err;
  });
  return NextResponse.json({ ok: true });
}
