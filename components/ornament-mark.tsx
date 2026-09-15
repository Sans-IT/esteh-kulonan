import { cn } from "@/lib/utils";

type OrnamentMarkProps = {
  className?: string;
};

/**
 * Satu motif ornamen batik (dari /ornaments/corner-ornament.svg) untuk
 * dipakai sebagai ikon tunggal — pengganti ikon gunungan lama di judul
 * section, daftar alasan, logo, dsb, supaya konsisten dengan gaya
 * ornamen yang sudah dipakai di bagian "Tentang".
 * Warna ikut currentColor lewat CSS mask, jadi tinggal atur lewat class
 * text-[...] di pemanggilnya (sama seperti komponen ornamen lainnya).
 */
export function OrnamentMark({ className }: OrnamentMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block bg-current", className)}
      style={{
        WebkitMaskImage: "url(/ornaments/corner-ornament.svg)",
        maskImage: "url(/ornaments/corner-ornament.svg)",
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
