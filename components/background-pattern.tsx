/**
 * Watermark motif "Ragam Hias Jawa — Parang Sederhana" di belakang seluruh
 * halaman. Memakai teknik CSS mask (bukan background-image biasa) supaya
 * warnanya ikut mengikuti --color-foreground — jadi otomatis pas untuk mode
 * terang maupun gelap tanpa perlu dua file gambar.
 */
export function BackgroundPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.020] dark:opacity-[0.035]"
      style={{
        backgroundColor: "var(--color-foreground)",
        WebkitMaskImage: "url(/patterns/parang-sederhana.png)",
        maskImage: "url(/patterns/parang-sederhana.png)",
        WebkitMaskRepeat: "repeat",
        maskRepeat: "repeat",
        WebkitMaskSize: "180px 180px",
        maskSize: "180px 180px",
      }}
    />
  );
}
