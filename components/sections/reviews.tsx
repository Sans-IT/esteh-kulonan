"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GununganIcon } from "@/components/gunungan-icon";
import { StarRating } from "@/components/star-rating";
import { useReviews } from "@/lib/reviews-store";

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

export function Reviews() {
  const { reviews, addReview, average, hydrated } = useReviews();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview({ name, rating, comment });
    setName("");
    setRating(5);
    setComment("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 xl:px-10 md:py-20">
      <div className="text-center">
        <GununganIcon className="mx-auto h-9 w-8 text-[var(--color-primary)]" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          Ulasan
        </p>
        <h1 className="font-heading mt-2 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Apa Kata Pelanggan Kami
        </h1>

        {hydrated && reviews.length > 0 ? (
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="font-heading text-3xl font-semibold text-[var(--color-primary)]">
              {average.toFixed(1)}
            </span>
            <div className="text-left">
              <StarRating value={Math.round(average)} readOnly />
              <p className="text-xs text-[var(--color-foreground)]/50">
                Dari {reviews.length} ulasan
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--color-foreground)]/50">
            Belum ada ulasan — jadilah yang pertama!
          </p>
        )}
      </div>

      <Card className="mt-10 border-[var(--color-border)] p-6">
        <p className="text-sm font-semibold text-[var(--color-foreground)]">
          Tulis Ulasanmu
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu"
              className="border-[var(--color-border)]"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-foreground)]/60">Rating:</span>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan pengalamanmu minum Es Teh Kulonan..."
            className="border-[var(--color-border)]"
            rows={3}
          />
          <Button
            type="submit"
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
          >
            <MessageSquare className="mr-1.5 h-4 w-4" />
            Kirim Ulasan
          </Button>
          {submitted && (
            <p className="text-xs font-medium text-[var(--color-accent)]">
              Terima kasih atas ulasannya!
            </p>
          )}
        </form>
      </Card>

      <div className="mt-10 space-y-4">
        {reviews.map((r) => (
          <Card key={r.id} className="border-[var(--color-border)] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--color-foreground)]">{r.name}</p>
                <StarRating value={r.rating} readOnly size={14} />
              </div>
              <span className="whitespace-nowrap text-xs text-[var(--color-foreground)]/40">
                {timeAgo(r.createdAt)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-foreground)]/75">
              {r.comment}
            </p>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-[var(--color-foreground)]/40">
        Ulasan tersimpan di browser perangkatmu.
      </p>
    </section>
  );
}
