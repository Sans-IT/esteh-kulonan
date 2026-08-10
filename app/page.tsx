import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { BrandStory } from "@/components/sections/brand-story";
import { WhyUs } from "@/components/sections/why-us";
import { MenuHighlight } from "@/components/sections/menu-highlight";
import { Footer } from "@/components/sections/footer";
import { GununganIcon } from "@/components/gunungan-icon";

const ctaLinks = [
  { href: "/tentang", label: "Tentang Kami", desc: "Cerita, makna logo, dan tim di balik Es Teh Kulonan" },
  { href: "/menu", label: "Menu & Harga", desc: "Semua varian teh, kopi, dan best seller" },
  { href: "/cabang", label: "Cabang Terdekat", desc: "10 titik jualan di sekitar Gresik" },
  { href: "/order", label: "Cara Order", desc: "Pesan langsung lewat WhatsApp" },
];

export default function Home() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <Hero />
      <BrandStory />
      <WhyUs />
      <MenuHighlight />

      <section className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
        <div className="text-center">
          <GununganIcon className="mx-auto h-9 w-8 text-[var(--color-primary)]" />
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Jelajahi Lebih Lanjut</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ctaLinks.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] p-5 transition-colors hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-muted)]/40"
            >
              <div>
                <p className="font-semibold text-[var(--color-foreground)]">{c.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-foreground)]/60">
                  {c.desc}
                </p>
              </div>
              <ArrowRight className="mt-4 h-4 w-4 text-[var(--color-primary)] transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
