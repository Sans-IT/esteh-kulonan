"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/star-rating";
import {
  REVIEW_MAX_LENGTH,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  type Review,
} from "@/lib/reviews-query";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export function ReviewCard({ review, isOwn }: { review: Review; isOwn: boolean }) {
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const updateReview = useUpdateReviewMutation();
  const deleteReview = useDeleteReviewMutation();

  const edited = review.updatedAt !== review.createdAt;

  function handleSave() {
    if (!comment.trim()) return;
    updateReview.mutate(
      { id: review.id, rating, comment: comment.trim() },
      { onSuccess: () => setEditing(false) }
    );
  }

  function handleCancel() {
    setRating(review.rating);
    setComment(review.comment);
    setEditing(false);
  }

  function handleDelete() {
    if (deleteReview.isPending) return;
    if (!window.confirm("Hapus ulasan ini?")) return;
    deleteReview.mutate(review.id);
  }

  if (editing) {
    return (
      <Card className="flex flex-col gap-3 border-[var(--color-primary)]/40 p-4">
        <StarRating value={rating} onChange={setRating} size={16} />
        <div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, REVIEW_MAX_LENGTH))}
            rows={3}
            className="border-[var(--color-border)] text-sm"
            maxLength={REVIEW_MAX_LENGTH}
          />
          <p className="mt-1 text-right text-[10px] text-[var(--color-foreground)]/40">
            {comment.length}/{REVIEW_MAX_LENGTH}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={updateReview.isPending}
            className="flex-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
          >
            <Check className="h-3.5 w-3.5" /> Simpan
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
            <X className="h-3.5 w-3.5" /> Batal
          </Button>
        </div>
        {updateReview.isError && (
          <p className="text-xs font-medium text-destructive">
            {(updateReview.error as Error).message}
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-3 border-[var(--color-border)] p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[var(--color-foreground)]">
            {review.userName}
          </p>
          <StarRating value={review.rating} readOnly size={14} />
        </div>
        {isOwn && (
          <div className="flex flex-shrink-0 gap-1">
            <button
              onClick={() => setEditing(true)}
              disabled={deleteReview.isPending}
              aria-label="Edit ulasan"
              className="rounded-full p-1.5 text-[var(--color-foreground)]/40 hover:bg-[var(--color-muted)] hover:text-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-40"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteReview.isPending}
              aria-label="Hapus ulasan"
              className="rounded-full p-1.5 text-[var(--color-foreground)]/40 hover:bg-[var(--color-muted)] hover:text-destructive disabled:pointer-events-none disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <p className="flex-1 text-sm leading-relaxed text-[var(--color-foreground)]/75">
        {review.comment}
      </p>

      <p className="text-xs text-[var(--color-foreground)]/40">
        {timeAgo(review.updatedAt)}
        {edited && <span className="italic"> · diedit</span>}
      </p>
    </Card>
  );
}
