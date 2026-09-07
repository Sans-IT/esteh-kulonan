"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const REVIEW_MAX_LENGTH = 200;

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("/api/reviews");
  if (!res.ok) throw new Error("Gagal mengambil ulasan");
  const data = await res.json();
  return data.reviews as Review[];
}

export function useReviewsQuery() {
  return useQuery({ queryKey: ["reviews"], queryFn: fetchReviews });
}

export function useAddReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { rating: number; comment: string }) => {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim ulasan");
      return data.review as Review;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useUpdateReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: string; rating: number; comment: string }) => {
      const res = await fetch(`/api/reviews/${input.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: input.rating, comment: input.comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengubah ulasan");
      return data.review as Review;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useDeleteReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menghapus ulasan");
      }
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
