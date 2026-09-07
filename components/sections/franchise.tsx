import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DriveMedia } from "@/components/drive-media"
import { FadeInView } from "@/components/motion/fade-in-view"
import { drivePhotos } from "@/lib/media"
import { franchisePackages, waLink } from "@/lib/data"

export function Franchise() {
  return (
    <section id="franchise">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 xl:px-10">
        <FadeInView>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-secondary)] uppercase">
              Paket Franchise
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
              Mulai Usaha Minumanmu Sendiri
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-foreground)]/65">
              Paket franchise hadir sebagai solusi bagi kamu yang ingin memulai
              usaha minuman dengan lebih mudah, lengkap, dan siap jalan.
            </p>
          </div>
        </FadeInView>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {franchisePackages.map((pkg, i) => (
            <FadeInView key={pkg.name} delay={Math.min(i * 0.1, 0.2)}>
              <Card className="flex flex-col gap-6 border-[var(--color-border)] p-8">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold tracking-wider text-[var(--color-secondary)] uppercase">
                      {pkg.tagline}
                    </p>
                    {pkg.originalPrice && (
                      <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                        DISKON
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-heading text-2xl font-semibold text-[var(--color-foreground)]">
                    {pkg.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    {pkg.originalPrice && (
                      <span className="text-base font-medium text-[var(--color-foreground)]/45 line-through decoration-red-600 decoration-2">
                        {pkg.originalPrice}
                      </span>
                    )}
                    <p className="text-3xl font-semibold text-[var(--color-primary)]">
                      {pkg.price}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-[var(--color-foreground)]/75"
                    >
                      <Check className="h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <DriveMedia
                  fileId={
                    pkg.name.startsWith("Paket A")
                      ? drivePhotos.franchisePaketA
                      : drivePhotos.franchisePaketB
                  }
                  aspect="aspect-video"
                  label={`Foto gerai — spesifikasi ${pkg.name}`}
                />

                <Button
                  asChild
                  className="mt-auto bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
                >
                  <a
                    href={waLink(
                      `Halo, saya tertarik dengan Franchise ${pkg.name}`
                    )}
                  >
                    Tanya Franchise {pkg.name}
                  </a>
                </Button>
              </Card>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
