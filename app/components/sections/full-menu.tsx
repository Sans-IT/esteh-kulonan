"use client"

import { useMemo, useState } from "react"
import { Search, Plus, Minus, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DriveMedia } from "@/components/drive-media"
import { FadeIn } from "@/components/motion/fade-in"
import { menuData, type MenuItem } from "@/lib/data"
import { driveMenuImages } from "@/lib/media"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

function formatPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`
}

function MenuCard({ item }: { item: MenuItem }) {
  const { lines, addItem, updateQty } = useCart()
  const inCart = lines.find((l) => l.id === item.id)

  return (
    <Card className="flex flex-col gap-3 border-[var(--color-border)] bg-[var(--color-background)] p-3">
      <div className="relative">
        {item.bestSeller && (
          <span className="absolute top-1.5 left-1.5 z-10 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            <Star className="h-2.5 w-2.5 fill-white" />
            Best Seller
          </span>
        )}
        <DriveMedia
          fileId={driveMenuImages[item.id]}
          aspect="aspect-square"
          label={`Foto ${item.name}`}
          className="w-full"
        />
      </div>

      <div className="flex-1">
        <p className="text-sm leading-snug font-semibold text-[var(--color-foreground)]">
          {item.name}
        </p>
        <p className="mt-0.5 text-xs text-[var(--color-foreground)]/50">
          {item.size}
        </p>
        <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
          {formatPrice(item.price)}
        </p>
      </div>

      {inCart ? (
        <div className="flex items-center justify-between rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 px-1 py-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => updateQty(item.id, inCart.qty - 1)}
            aria-label="Kurangi"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="text-sm font-semibold text-[var(--color-primary)]">
            {inCart.qty}
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => updateQty(item.id, inCart.qty + 1)}
            aria-label="Tambah"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          onClick={() => addItem(item)}
          className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
        >
          <Plus className="h-3.5 w-3.5" /> Tambah
        </Button>
      )}
    </Card>
  )
}

const ALL_CATEGORY = "Semua"

export function FullMenu() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>(ALL_CATEGORY)

  // Daftar kategori dibuat sekali dari menuData (array filter/map), jadi
  // kalau ada kategori baru di lib/data.ts, chip filter otomatis ikut nambah.
  const categories = useMemo(
    () => [ALL_CATEGORY, ...menuData.map((c) => c.category)],
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menuData
      .filter((cat) => category === ALL_CATEGORY || cat.category === category)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) => !q || item.name.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [query, category])

  return (
    <section id="menu">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 xl:px-10">
        <FadeIn>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-secondary)] uppercase">
              Daftar Menu
            </p>
            <h1 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
              Menu Es Teh Kulonan
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-foreground)]/60">
              Pilih menu, klik keranjang di navbar untuk lanjut checkout ke
              halaman Order.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mx-auto mt-8 max-w-sm">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground)]/40" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari menu..."
              className="border-[var(--color-border)] pl-9"
            />
          </div>

          {/* Filter kategori — pakai array .filter() di atas berdasarkan
              chip yang dipilih, jadi user tidak perlu scroll semua menu. */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                  category === cat
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                    : "border-[var(--color-border)] text-[var(--color-foreground)]/60 hover:border-[var(--color-primary)]/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-[var(--color-foreground)]/50">
            Menu &quot;{query}&quot; tidak ditemukan
            {category !== ALL_CATEGORY ? ` di kategori ${category}` : ""}.
          </p>
        ) : (
          <div className="mt-12 space-y-12">
            {filtered.map((cat, i) => (
              <FadeIn key={cat.category} delay={Math.min(i * 0.06, 0.3)}>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-[var(--color-primary)]">
                    {cat.category}
                  </h2>
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {cat.items.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
