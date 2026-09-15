import { DriveMedia } from "@/components/drive-media"
import { FadeInView } from "@/components/motion/fade-in-view"
import { OrnamentCorner } from "@/components/ornament-corner"
import { OrnamentDivider } from "@/components/ornament-divider"
import { driveVideos, drivePhotos } from "@/lib/media"

export function About() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 py-16 md:py-20 xl:px-10">
      <OrnamentCorner className="pointer-events-none absolute inset-x-6 top-4 hidden justify-between text-[var(--color-accent)] sm:flex xl:inset-x-10" />
      <FadeInView>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-secondary)] uppercase">
              Tentang Kami
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
              Menemani Setiap Momen Bersama Keluarga dan Sahabat
            </h2>
            <OrnamentDivider className="my-5 flex items-center justify-start gap-3 text-[var(--color-accent)]" />
            <p className="font-body-decorative mt-5 text-base leading-relaxed text-[var(--color-foreground)]/70">
              Es Teh Kulonan diracik dengan resep pilihan untuk menemani
              berbagai momen bersama keluarga dan sahabat, dengan cita rasa yang
              khas di setiap tegukan — untuk menemani waktu santai maupun
              kebersamaan bersama orang-orang terdekat.
            </p>

            <div className="mt-8">
              <DriveMedia
                fileId={driveVideos.teamVideo}
                type="video"
                label="Video tim Es Teh Kulonan"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <DriveMedia
              fileId={drivePhotos.teamPhoto1}
              label="Foto tim Es Teh Kulonan"
              aspect="aspect-[3/4]"
              className="sm:mt-8"
            />
          </div>
        </div>
      </FadeInView>
    </section>
  )
}
