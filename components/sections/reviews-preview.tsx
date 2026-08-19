"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { useReviews } from "@/lib/reviews-store";

export function ReviewsPreview() {
  const { reviews, average, hydrated } = useReviews();

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16 text-center xl:px-10 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          Apa Kata Pelanggan
        </p>
        <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Rasakan Kesegaran Alami Es Teh Kulonan
        </h2>

        {hydrated && reviews.length > 0 ? (
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
          <p className="mx-auto mt-4 max-w-md text-sm text-[var(--color-foreground)]/60">
            Jadikan setiap tegukan lebih bermakna bersama Es Teh Kulonan —
            jadi yang pertama kasih ulasan!
          </p>
        )}

        <Button
          asChild
          className="mt-8 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
        >
          <Link href="/ulasan">Lihat / Tulis Ulasan</Link>
        </Button>
      </div>
    </section>
  );
}
