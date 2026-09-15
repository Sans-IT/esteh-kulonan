type OrnamentDividerProps = {
  className?: string;
};

/**
 * Motif dekoratif untuk ditaruh di tengah-tengah topik/penjelasan (mis. di
 * antara judul cerita brand dan paragraf isinya, atau sebagai penutup
 * sebuah section). Warna mengikuti currentColor via CSS mask.
 */
export function OrnamentDivider({ className }: OrnamentDividerProps) {
  return (
    <div className={className ?? "mx-auto my-6 flex items-center justify-center gap-4"}>
      <span className="h-px w-12 bg-current opacity-30 sm:w-20" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="block h-8 w-16 shrink-0 bg-current opacity-80 sm:h-10 sm:w-20"
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
      <span className="h-px w-12 bg-current opacity-30 sm:w-20" aria-hidden="true" />
    </div>
  );
}
