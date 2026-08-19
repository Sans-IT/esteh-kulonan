import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DriveMedia } from "@/components/drive-media";
import { franchisePackages, waLink } from "@/lib/data";

export function Franchise() {
  return (
    <section id="franchise" className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Paket Franchise
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Mulai Usaha Minumanmu Sendiri
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-foreground)]/65">
            Paket franchise hadir sebagai solusi bagi kamu yang ingin memulai
            usaha minuman dengan lebih mudah, lengkap, dan siap jalan.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {franchisePackages.map((pkg) => (
            <Card
              key={pkg.name}
              className="flex flex-col gap-6 border-[var(--color-border)] p-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
                  {pkg.tagline}
                </p>
                <h3 className="font-heading mt-1 text-2xl font-semibold text-[var(--color-foreground)]">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-primary)]">
                  {pkg.price}
                </p>
              </div>

              <ul className="space-y-2.5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--color-foreground)]/75">
                    <Check className="h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                    {f}
                  </li>
                ))}
              </ul>

              <DriveMedia
                mediaKey={pkg.name.startsWith("Paket A") ? "franchisePaketA" : "franchisePaketB"}
                aspect="aspect-video"
                label={`Foto gerai — spesifikasi ${pkg.name}`}
              />

              <Button
                asChild
                className="mt-auto bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
              >
                <a href={waLink(`Halo, saya tertarik dengan Franchise ${pkg.name}`)}>
                  Tanya Franchise {pkg.name}
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
