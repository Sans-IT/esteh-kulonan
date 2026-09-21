type OrnamentCornerProps = {
  className?: string;
};

/**
 * Sepasang ornamen sudut (kiri & kanan, dicerminkan) untuk mempercantik
 * bagian atas sebuah section — dipakai berpasangan mengapit judul.
 * Warna mengikuti currentColor lewat teknik CSS mask, jadi tinggal atur
 * lewat class text-[...] di pemanggilnya.
 */
export function OrnamentCorner({ className }: OrnamentCornerProps) {
  return (
    <div className={className ?? "flex items-start justify-between"}>
      <OrnamentShape />
      <OrnamentShape flip />
    </div>
  );
}

function OrnamentShape({ flip }: { flip?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="block h-10 w-10 bg-current opacity-80 sm:h-14 sm:w-14 dark:opacity-60"
      style={{
        WebkitMaskImage: "url(/ornaments/corner-ornament.svg)",
        maskImage: "url(/ornaments/corner-ornament.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
