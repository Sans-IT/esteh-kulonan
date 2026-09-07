"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LogIn, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GununganIcon } from "@/components/gunungan-icon";
import { StarRating } from "@/components/star-rating";
import { ReviewCard } from "@/components/sections/review-card";
import { ReviewCardSkeleton } from "@/components/sections/review-card-skeleton";
import { FadeIn } from "@/components/motion/fade-in";
import { useSession, signIn, signOut } from "@/lib/auth-client";
import { REVIEW_MAX_LENGTH, useReviewsQuery, useAddReviewMutation } from "@/lib/reviews-query";
import { cn } from "@/lib/utils";

const filters: Array<{ label: string; value: number | "all" }> = [
  { label: "Semua", value: "all" },
  { label: "5", value: 5 },
  { label: "4", value: 4 },
  { label: "3", value: 3 },
  { label: "2", value: 2 },
  { label: "1", value: 1 },
];

export function Reviews() {
  const { data: session, isPending: sessionLoading } = useSession();
  const { data: reviews = [], isLoading: reviewsLoading } = useReviewsQuery();
  const addReview = useAddReviewMutation();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [filter, setFilter] = useState<number | "all">("all");

  const average =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const myReview = session?.user ? reviews.find((r) => r.userId === session.user.id) : undefined;

  const filteredReviews = useMemo(
    () => (filter === "all" ? reviews : reviews.filter((r) => r.rating === filter)),
    [reviews, filter]
  );

  // Render 5 ulasan dulu, tambah 5 lagi tiap kali sentinel di bawah
  // daftar kelihatan (lazy load waktu discroll) — bukan render semua
  // sekaligus.
  const PAGE_SIZE = 5;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((v) => Math.min(v + PAGE_SIZE, filteredReviews.length));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [filteredReviews.length]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview.mutate(
      { rating, comment: comment.trim() },
      { onSuccess: () => { setComment(""); setRating(5); } }
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 xl:px-10 md:py-20">
      <FadeIn>
        <div className="text-center">
          <GununganIcon className="mx-auto h-9 w-8 text-[var(--color-primary)]" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Ulasan
          </p>
          <h1 className="font-heading mt-2 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Apa Kata Pelanggan Kami
          </h1>

          {!reviewsLoading && reviews.length > 0 ? (
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
            !reviewsLoading && (
              <p className="mt-4 text-sm text-[var(--color-foreground)]/50">
                Belum ada ulasan — jadilah yang pertama!
              </p>
            )
          )}
        </div>
      </FadeIn>

      <Card className="mx-auto mt-10 max-w-2xl border-[var(--color-border)] p-6">
        {sessionLoading ? (
          <p className="text-sm text-[var(--color-foreground)]/50">Memuat sesi login...</p>
        ) : !session?.user ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <p className="text-sm text-[var(--color-foreground)]/70">
              Login dengan Google untuk menulis ulasan.
            </p>
            <Button
              onClick={() => signIn.social({ provider: "google", callbackURL: "/ulasan" })}
              className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
            >
              <LogIn className="mr-1.5 h-4 w-4" />
              Login dengan Google
            </Button>
          </div>
        ) : myReview ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <p className="text-sm text-[var(--color-foreground)]/70">
              Kamu sudah pernah memberi ulasan dengan akun ini — cari kartu
              punyamu di daftar bawah untuk <b>edit</b> atau <b>hapus</b>.
            </p>
            <button
              onClick={() => signOut()}
              className="mt-1 text-xs font-medium text-[var(--color-foreground)]/50 hover:text-[var(--color-primary)]"
            >
              Keluar dari akun
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--color-foreground)]">
                Tulis Ulasanmu — {session.user.name}
              </p>
              <button
                onClick={() => signOut()}
                className="text-xs font-medium text-[var(--color-foreground)]/40 hover:text-[var(--color-primary)]"
              >
                Keluar
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-foreground)]/60">Rating:</span>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, REVIEW_MAX_LENGTH))}
                  placeholder="Ceritakan pengalamanmu (singkat aja)..."
                  className="border-[var(--color-border)]"
                  rows={3}
                  maxLength={REVIEW_MAX_LENGTH}
                />
                <p className="mt-1 text-right text-[10px] text-[var(--color-foreground)]/40">
                  {comment.length}/{REVIEW_MAX_LENGTH}
                </p>
              </div>
              <Button
                type="submit"
                disabled={addReview.isPending}
                className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
              >
                <MessageSquare className="mr-1.5 h-4 w-4" />
                {addReview.isPending ? "Mengirim..." : "Kirim Ulasan"}
              </Button>
              {addReview.isError && (
                <p className="text-xs font-medium text-destructive">
                  {(addReview.error as Error).message}
                </p>
              )}
            </form>
          </>
        )}
      </Card>

      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
              filter === f.value
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                : "border-[var(--color-border)] text-[var(--color-foreground)]/60 hover:border-[var(--color-primary)]/40"
            )}
          >
            {f.value === "all" ? f.label : `${f.label} ★`}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reviewsLoading &&
          Array.from({ length: 8 }).map((_, i) => <ReviewCardSkeleton key={i} />)}
        {!reviewsLoading && filteredReviews.length === 0 && (
          <p className="col-span-full text-center text-sm text-[var(--color-foreground)]/40">
            Belum ada ulasan dengan rating ini.
          </p>
        )}
        {visibleReviews.map((r, i) => (
          <FadeIn key={r.id} delay={Math.min(i * 0.04, 0.24)} y={10}>
            <ReviewCard review={r} isOwn={session?.user?.id === r.userId} />
          </FadeIn>
        ))}
      </div>

      {hasMore && (
        <div
          ref={sentinelRef}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      )}
    </section>
  );
}
