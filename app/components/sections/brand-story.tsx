import { FadeInView } from "@/components/motion/fade-in-view";
import { OrnamentCorner } from "@/components/ornament-corner";
import { OrnamentDivider } from "@/components/ornament-divider";

export function BrandStory() {
  return (
    <section
      id="tentang"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-muted)]/40"
    >
      <FadeInView>
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
          <OrnamentCorner className="pointer-events-none absolute inset-x-4 top-6 flex justify-between text-[var(--color-accent)] sm:inset-x-8" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Awal Didirikan
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Berawal dari Pasar Cerme, Gresik
          </h2>

          <OrnamentDivider className="mx-auto my-6 flex items-center justify-center gap-4 text-[var(--color-accent)]" />

          <p className="font-body-decorative mt-5 text-base leading-relaxed text-[var(--color-foreground)]/70">
            Es Teh Kulonan didirikan pada tahun 2022 dan memulai perjalanannya
            di Pasar Cerme, Gresik. Berawal dari keinginan menghadirkan minuman
            teh dengan cita rasa khas yang terinspirasi dari resep tradisional
            Wonogiri, Jawa Tengah — diracik dengan resep khas dan bahan-bahan
            pilihan, menghadirkan cita rasa autentik yang menjadi ciri khas di
            setiap tegukan. Berkat dukungan pelanggan, kami terus berkembang
            menjadi pilihan minuman yang menyegarkan untuk berbagai kalangan.
          </p>
        </div>
      </FadeInView>
    </section>
  );
}
