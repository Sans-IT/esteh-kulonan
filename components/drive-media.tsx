import { ImageIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { driveImageUrl, driveVideoEmbedUrl, type DriveMediaKey, driveMedia } from "@/lib/media";

type DriveMediaProps = {
  mediaKey: DriveMediaKey;
  label: string;
  type?: "image" | "video";
  className?: string;
  aspect?: string; // tailwind aspect-* class
};

/**
 * Menampilkan gambar/video dari Google Drive berdasarkan ID di lib/media.ts.
 * Kalau ID belum diisi (file belum diupload klien), tampilkan slot
 * placeholder bergaris putus-putus supaya jelas apa yang masih ditunggu.
 */
export function DriveMedia({
  mediaKey,
  label,
  type = "image",
  className,
  aspect = "aspect-[4/5]",
}: DriveMediaProps) {
  const fileId = driveMedia[mediaKey];

  if (!fileId) {
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
        <p className="max-w-[220px] text-[10px] text-[var(--color-foreground)]/35">
          Isi ID Drive di lib/media.ts → {mediaKey}
        </p>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className={cn("overflow-hidden rounded-2xl", aspect, className)}>
        <iframe
          src={driveVideoEmbedUrl(fileId)}
          allow="autoplay"
          className="h-full w-full"
          title={label}
        />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl", aspect, className)}>
      {/* Gambar diambil langsung dari Google Drive via URL, bukan file lokal */}
      <img
        src={driveImageUrl(fileId)}
        alt={label}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
