"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { useReviewsQuery } from "@/lib/reviews-query";
import { cn } from "@/lib/utils";

export function ReviewsPreview() {
  const { data: reviews = [], isLoading } = useReviewsQuery();
  const average =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  // Marquee cuma tampil kalau memang ada ulasan. Efek "loop mulus" perlu
  // array-nya digandakan (standar teknik marquee CSS) — tapi itu cuma
  // masuk akal kalau ulasannya sudah cukup banyak. Kalau ulasannya masih
  // sedikit (mis. baru 1–3), gandakan malah kelihatan seperti "ulasan
  // duplikat" karena kartu yang sama langsung muncul lagi persis di
  // sebelahnya. Jadi di bawah ambang ini tampilkan saja apa adanya,
  // statis, tanpa animasi/duplikasi.
  const MIN_FOR_LOOP = 6;
  const shouldLoop = reviews.length >= MIN_FOR_LOOP;
  const marqueeItems = shouldLoop ? [...reviews, ...reviews] : reviews;

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16 text-center xl:px-10 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          Apa Kata Pelanggan
        </p>
        <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Rasakan Kesegaran Alami Es Teh Kulonan
        </h2>

        {!isLoading && reviews.length > 0 ? (
          <div className="mt-6 flex items-center justify-center gap-3">
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
          !isLoading && (
            <p className="mx-auto mt-4 max-w-md text-sm text-[var(--color-foreground)]/60">
              Jadikan setiap tegukan lebih bermakna bersama Es Teh Kulonan —
              jadi yang pertama kasih ulasan!
            </p>
          )
        )}

        <Button
          asChild
          className="mt-8 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
        >
          <Link href="/ulasan">Lihat / Tulis Ulasan</Link>
        </Button>
      </div>

      {marqueeItems.length > 0 && (
        <div className="border-t border-[var(--color-border)] py-6">
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div
              className={cn(
                "flex gap-4 px-4",
                shouldLoop ? "marquee-track w-max" : "flex-wrap justify-center"
              )}
            >
              {marqueeItems.map((r, i) => (
                <div
                  key={`${r.id}-${i}`}
                  className="flex w-72 flex-shrink-0 flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-left"
                >
                  <StarRating value={r.rating} readOnly size={13} />
                  <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-foreground)]/70">
                    {r.comment}
                  </p>
                  <p className="text-xs font-semibold text-[var(--color-foreground)]">
                    {r.userName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
