import { DriveMedia } from "@/components/drive-media";

export function About() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Tentang Kami
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Menemani Setiap Momen Bersama Keluarga dan Sahabat
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-foreground)]/70">
            Es Teh Kulonan diracik dengan resep pilihan untuk menemani
            berbagai momen bersama keluarga dan sahabat, dengan cita rasa
            yang khas di setiap tegukan — untuk menemani waktu santai maupun
            kebersamaan bersama orang-orang terdekat.
          </p>

          <div className="mt-8">
            <DriveMedia
              mediaKey="teamVideo"
              type="video"
              aspect="aspect-video"
              label="Video tim Es Teh Kulonan"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <DriveMedia
            mediaKey="teamPhoto1"
            label="Foto tim Es Teh Kulonan"
            aspect="aspect-[3/4]"
            className="sm:mt-8"
          />
          <DriveMedia
            mediaKey="storePhoto"
            label="Foto gerai Es Teh Kulonan"
            aspect="aspect-[3/4]"
          />
        </div>
      </div>
    </section>
  );
}
