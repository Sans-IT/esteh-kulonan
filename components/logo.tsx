import { driveImageUrl, logoImage } from "@/lib/media";
import { GununganIcon } from "@/components/gunungan-icon";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

/**
 * Logo resmi Es Teh Kulonan (sudah termasuk tulisan "Es Teh Kulonan" +
 * "Asli Solo" di dalam gambarnya — lihat lib/media.ts `logoImage`).
 * Selama `logoImage` masih kosong, otomatis jatuh ke ikon gunungan
 * placeholder supaya tidak ada slot kosong yang aneh di navbar/footer.
 */
export function Logo({ className }: LogoProps) {
  if (!logoImage) {
    return (
      <GununganIcon className={cn("h-8 w-7 text-[var(--color-primary)]", className)} />
    );
  }

  return (
    // Logo diambil langsung dari Google Drive, bukan file lokal —
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={driveImageUrl(logoImage)}
      alt="Logo Es Teh Kulonan"
      className={cn("h-9 w-auto object-contain", className)}
    />
  );
}
