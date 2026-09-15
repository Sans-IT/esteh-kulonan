import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Skeleton kartu ulasan — dipakai saat data ulasan masih dimuat (bukan
 * teks "Memuat ulasan..." polos), supaya terasa lebih halus/tidak "loncat"
 * begitu data datang.
 */
export function ReviewCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex animate-pulse flex-col gap-3 border-[var(--color-border)] p-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2">
          <div className="h-3.5 w-24 rounded-full bg-[var(--color-muted)]" />
          <div className="h-3 w-20 rounded-full bg-[var(--color-muted)]" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-[var(--color-muted)]" />
        <div className="h-3 w-5/6 rounded-full bg-[var(--color-muted)]" />
        <div className="h-3 w-2/3 rounded-full bg-[var(--color-muted)]" />
      </div>
      <div className="h-2.5 w-16 rounded-full bg-[var(--color-muted)]" />
    </Card>
  );
}
