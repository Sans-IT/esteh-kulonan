import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const REVIEW_MAX_LENGTH = 200;

export async function GET() {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Kamu harus login dulu" }, { status: 401 });
  }

  const body = await req.json();
  const rating = Math.min(5, Math.max(1, Number(body.rating) || 0));
  const comment = String(body.comment || "").trim().slice(0, REVIEW_MAX_LENGTH);

  if (!comment) {
    return NextResponse.json({ error: "Komentar tidak boleh kosong" }, { status: 400 });
  }

  // Cek dulu daripada mengandalkan error unique constraint, biar pesannya jelas.
  const existing = await prisma.review.findUnique({ where: { userId: session.user.id } });
  if (existing) {
    return NextResponse.json(
      { error: "Kamu sudah pernah memberi ulasan — edit ulasanmu di bawah" },
      { status: 409 }
    );
  }

  const review = await prisma.review.create({
    data: {
      userId: session.user.id,
      userName: session.user.name ?? "Pelanggan",
      rating,
      comment,
    },
  });
  return NextResponse.json({ review });
}
