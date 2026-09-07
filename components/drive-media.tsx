import { ImageIcon, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { driveImageUrl, driveVideoEmbedUrl } from "@/lib/media"

type DriveMediaProps = {
  fileId?: string
  label: string
  type?: "image" | "video"
  className?: string
  aspect?: string // tailwind aspect-* class
  autoplay?: boolean // khusus video: coba autoplay (dipakai di Beranda)
}

/**
 * Menampilkan gambar/video dari Google Drive berdasarkan file ID.
 * Kalau ID belum diisi (file belum diupload klien), tampilkan slot
 * placeholder bergaris putus-putus supaya jelas apa yang masih ditunggu.
 *
 * Video pakai iframe preview bawaan Drive (paling reliable, langsung ada
 * thumbnail + tombol play tanpa perlu setup lain). Untuk video di
 * Beranda, `autoplay` menambahkan ?autoplay=1 ke iframe-nya — ini bukan
 * fitur resmi dari Google jadi hasilnya bisa beda-beda tergantung
 * browser.
 */
export function DriveMedia({
  fileId,
  label,
  type = "image",
  className,
  aspect = "aspect-video",
  autoplay = false,
}: DriveMediaProps) {
  if (!fileId) {
    const Icon = type === "video" ? PlayCircle : ImageIcon
    return (
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-muted)] p-4 text-center",
          aspect,
          className
        )}
      >
        <Icon className="h-6 w-6 text-[var(--color-primary)]/60" strokeWidth={1.5} />
        <p className="max-w-[200px] text-[11px] leading-snug text-[var(--color-foreground)]/45">
          {label}
        </p>
      </div>
    )
  }

  if (type === "video") {
    return (
      <div className={cn("overflow-hidden rounded-2xl", aspect, className)}>
        <iframe
          src={driveVideoEmbedUrl(fileId, autoplay)}
          allow="autoplay"
          className="h-full w-full"
          title={label}
        />
      </div>
    )
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
  )
}
