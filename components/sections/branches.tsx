import { MapPin, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { branches, waLink } from "@/lib/data";

export function Branches() {
  return (
    <section id="cabang" className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            Cabang Kami
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Kunjungi Gerai Terdekat
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-foreground)]/65">
            Kami mengelola dan memasarkan produk di Raya Cerme, Raya Putat
            Lor, Raya Hulaan, Pasar Cerme, dan masih banyak lainnya. Yuk
            langsung kunjungi tempat kami — jangan lupa berikan ulasanmu!
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <Card
              key={b.name}
              className="flex flex-col gap-3 border-[var(--color-border)] bg-[var(--color-background)] p-5"
            >
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {b.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-foreground)]/60">
                    {b.address}
                  </p>
                </div>
              </div>
              <a
                href={waLink(`Halo, saya mau pesan Es Teh Kulonan di ${b.name}`)}
                className="mt-1 flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat WA cabang ini
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
