import { ImageIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  label: string;
  type?: "image" | "video";
  className?: string;
  aspect?: string; // tailwind aspect-* class
};

/**
 * Placeholder bergaya "slip resep" untuk slot media yang isinya menunggu
 * upload dari klien (foto produk, foto tim, video). Tandai jelas apa yang
 * perlu diganti, bukan gambar generik yang menyamarkan bahwa ini belum final.
 */
export function MediaPlaceholder({
  label,
  type = "image",
  className,
  aspect = "aspect-[4/5]",
}: MediaPlaceholderProps) {
  const Icon = type === "video" ? PlayCircle : ImageIcon;
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-muted)] p-6 text-center",
        aspect,
        className
      )}
    >
      <Icon className="h-8 w-8 text-[var(--color-primary)]/60" strokeWidth={1.5} />
      <p className="text-sm font-medium text-[var(--color-foreground)]/60">
        {type === "video" ? "Slot video" : "Slot foto"}
      </p>
      <p className="max-w-[220px] text-xs text-[var(--color-foreground)]/45">{label}</p>
    </div>
  );
}
