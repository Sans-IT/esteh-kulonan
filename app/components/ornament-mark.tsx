import { cn } from "@/lib/utils";

type OrnamentMarkProps = {
  className?: string;
};

/**
 * Motif ornamen batik tunggal — dipakai sebagai aksen ikon di berbagai
 * section (menggantikan bentuk gunungan lama yang keliatan seperti
 * "logo api"). Warna & ukuran mengikuti className yang dikirim dari
 * pemanggil (sama seperti OrnamentCorner & OrnamentDivider), lewat
 * teknik CSS mask supaya bentuknya ikut currentColor.
 */
export function OrnamentMark({ className }: OrnamentMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block bg-current", className)}
      style={{
        WebkitMaskImage: "url(/ornaments/page-ornament.svg)",
        maskImage: "url(/ornaments/page-ornament.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
