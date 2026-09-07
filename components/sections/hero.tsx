import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GununganIcon } from "@/components/gunungan-icon";
import { DriveMedia } from "@/components/drive-media";
import { FadeIn } from "@/components/motion/fade-in";
import { ScrollTiltImage } from "@/components/motion/scroll-tilt-image";
import { driveVideos } from "@/lib/media";
import { orderLink } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <GununganIcon className="pointer-events-none absolute -right-24 -top-16 h-[520px] w-[480px] text-[var(--color-primary)]/[0.06]" />

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 xl:px-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <FadeIn delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Asli Solo · Sejak 2022
            </span>
          </FadeIn>

          <FadeIn delay={0.12}>
            <h1 className="font-heading mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--color-foreground)] sm:text-5xl">
              Es Teh Kulonan
              <span className="mt-2 block text-[var(--color-primary)]">
                Diracik Lokal, Resep Khas, Cita Rasa Istimewa
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-foreground)]/70">
              Nikmati kesegaran es teh kulonan yang diracik secara lokal dengan
              resep khas warisan cita rasa Solo. Rasa autentik yang kaya
              karakter di setiap tegukan, menemani setiap momen dengan
              kesegaran istimewa.
            </p>
          </FadeIn>

          <FadeIn delay={0.36}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
              >
                <Link href={orderLink()}>Pesan Sekarang</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
              >
                <Link href="/menu">Lihat Menu</Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        <ScrollTiltImage className="md:justify-self-end">
          <DriveMedia
            fileId={driveVideos.heroVideo}
            type="video"
            autoplay
            label="Video produk — varian Sprite, sesuai brief beranda"
          />
        </ScrollTiltImage>
      </div>
    </section>
  );
}
