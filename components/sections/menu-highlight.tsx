import { Card } from "@/components/ui/card";
import { DriveMedia } from "@/components/drive-media";
import { ScrollTiltImage } from "@/components/motion/scroll-tilt-image";
import { FadeInView } from "@/components/motion/fade-in-view";
import { driveVideos } from "@/lib/media";
import { menuAndalan } from "@/lib/data";

export function MenuHighlight() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
        <FadeInView>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
              Menu Andalan
            </p>
            <h2 className="font-heading mt-3 text-2xl font-semibold sm:text-3xl">
              Rasakan Kesegaran Khas Es Teh Kulonan
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-primary-foreground)]/75">
              Hadir dengan resep khas dan bahan-bahan pilihan untuk menemani
              setiap momen — dari waktu santai hingga berkumpul bersama
              keluarga dan sahabat — dengan rasa autentik yang menyegarkan.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {menuAndalan.map((m) => (
              <Card
                key={m}
                className="border-[var(--color-primary-foreground)]/15 bg-[var(--color-primary-foreground)]/[0.06] p-4 text-center"
              >
                <p className="text-sm font-semibold">{m}</p>
              </Card>
            ))}
          </div>
        </FadeInView>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <ScrollTiltImage className="mx-auto w-full max-w-lg">
            <DriveMedia
              fileId={driveVideos.menuHighlightVideoVarian}
              type="video"
              autoplay
              label="Video produk — 6 gelas varian menu"
            />
          </ScrollTiltImage>
          <ScrollTiltImage className="mx-auto w-full max-w-lg">
            <DriveMedia
              fileId={driveVideos.menuHighlightVideoChoco}
              type="video"
              autoplay
              label="Video produk — Choco series coklat"
            />
          </ScrollTiltImage>
        </div>
      </div>
    </section>
  );
}
