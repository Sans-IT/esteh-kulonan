"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
};

export function StarRating({ value, onChange, size = 18, readOnly = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(n)}
          aria-label={`${n} bintang`}
          className={cn(!readOnly && "cursor-pointer", readOnly && "cursor-default")}
        >
          <Star
            width={size}
            height={size}
            className={cn(
              n <= value
                ? "fill-[var(--color-secondary)] text-[var(--color-secondary)]"
                : "fill-transparent text-[var(--color-foreground)]/25"
            )}
          />
        </button>
      ))}
    </div>
  );
}
