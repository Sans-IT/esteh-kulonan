"use client";

import { useEffect, useState } from "react";

export type Review = {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO date
};

const STORAGE_KEY = "esteh-kulonan-reviews";

function readStorage(): Review[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

/**
 * Ulasan disimpan di localStorage browser masing-masing pengunjung —
 * tanpa backend/database, jadi belum tersinkron lintas perangkat.
 * Untuk ulasan yang tampil sama ke semua pengunjung, perlu database
 * (mis. Prisma + Postgres) seperti di project referensi.
 */
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setReviews(readStorage());
    setHydrated(true);
  }, []);

  function addReview(input: { name: string; rating: number; comment: string }) {
    const newReview: Review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: input.name.trim() || "Anonim",
      rating: Math.min(5, Math.max(1, input.rating)),
      comment: input.comment.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [newReview, ...reviews];
    setReviews(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage penuh/diblokir, abaikan
    }
  }

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return { reviews, addReview, average, hydrated };
}
