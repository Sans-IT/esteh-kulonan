"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MapPin,
  MessageCircle,
  ExternalLink,
  Navigation,
  Loader2,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { FadeInView } from "@/components/motion/fade-in-view"
import { branches, orderLink } from "@/lib/data"

// Embed Google Maps pakai query pencarian alamat — tidak butuh API key.
// Map bawaan Google di mode embed ini SUDAH interaktif (bisa digeser/pan,
// discroll-zoom, dsb) langsung di dalam iframe-nya.
function mapEmbedSrc(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
}

function mapDirectionsLink(address: string, origin?: string) {
  const params = new URLSearchParams({
    api: "1",
    destination: address,
  })
  if (origin) params.set("origin", origin)
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

function BranchCard({ branch }: { branch: (typeof branches)[number] }) {
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState("")

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Perangkat tidak mendukung lokasi.")
      return
    }
    setLocating(true)
    setLocationError("")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = `${pos.coords.latitude},${pos.coords.longitude}`
        window.open(
          mapDirectionsLink(branch.address, origin),
          "_blank",
          "noopener,noreferrer"
        )
        setLocating(false)
      },
      () => {
        setLocationError(
          "Gagal mengambil lokasi. Izinkan akses lokasi dulu, ya."
        )
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <Card className="flex flex-col gap-3 overflow-hidden border-[var(--color-border)] bg-[var(--color-background)] p-5">
      <div className="flex items-start gap-2.5">
        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-primary)]" />
        <div>
          <p className="text-sm font-semibold text-[var(--color-foreground)]">
            {branch.name}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-foreground)]/60">
            {branch.address}
          </p>
        </div>
      </div>

      {/* Peta interaktif per cabang — bisa digeser/di-zoom langsung di
          dalam kartu (gesture map bawaan Google Maps embed). */}
      <div className="-mx-5 overflow-hidden border-y border-[var(--color-border)]">
        <iframe
          src={mapEmbedSrc(branch.address)}
          className="h-48 w-full touch-pan-y grayscale-[0.15]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Peta lokasi ${branch.name}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href={orderLink({
            cabang: branch.name,
            wa: branch.wa,
            address: branch.address,
          })}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Chat WA
        </Link>
        <a
          href={mapDirectionsLink(branch.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-foreground)]/60 hover:text-[var(--color-primary)]"
        >
          Buka di Maps
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={locating}
          className="ml-auto flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-foreground)]/70 transition-colors hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] disabled:opacity-60"
        >
          {locating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Navigation className="h-3.5 w-3.5" />
          )}
          Lokasi Saya
        </button>
      </div>
      {locationError && (
        <p className="text-[11px] text-destructive">{locationError}</p>
      )}
    </Card>
  )
}

export function Branches() {
  return (
    <section id="cabang">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 xl:px-10">
        <FadeInView>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase">
              Cabang Kami
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
              Kunjungi Gerai Terdekat
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-foreground)]/65">
              Kami mengelola dan memasarkan produk di Raya Cerme, Raya Putat
              Lor, Raya Hulaan, Pasar Cerme, dan masih banyak lainnya. Geser
              petanya langsung, atau tekan &quot;Lokasi Saya&quot; untuk lihat
              arah dari posisimu sekarang.
            </p>
          </div>
        </FadeInView>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b, i) => (
            <FadeInView key={b.name} delay={Math.min(i * 0.06, 0.24)}>
              <BranchCard branch={b} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
