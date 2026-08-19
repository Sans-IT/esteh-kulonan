"use client";

import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { menuData } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

function formatPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function FullMenu() {
  const [query, setQuery] = useState("");
  const { addItem, lines } = useCart();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menuData;
    return menuData
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  return (
    <section id="menu" className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 xl:px-10 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Daftar Menu
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Menu Kopi, Teh Ori &amp; Varian Kulonan
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-foreground)]/60">
            Kamu bisa lihat dan pilih menu lalu order via WhatsApp — klik
            ikon keranjang di navbar untuk lanjut checkout.
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-foreground)]/40" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari menu..."
            className="border-[var(--color-border)] pl-9"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-[var(--color-foreground)]/50">
            Menu &quot;{query}&quot; tidak ditemukan.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cat) => (
              <Card
                key={cat.category}
                className="border-[var(--color-border)] bg-[var(--color-background)] p-6"
              >
                <h3 className="font-heading text-base font-semibold text-[var(--color-primary)]">
                  {cat.category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {cat.items.map((item) => {
                    const inCart = lines.find((l) => l.id === item.id);
                    return (
                      <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-[var(--color-foreground)]">
                            {item.name}
                          </span>
                          {item.bestSeller && (
                            <Badge className="border-none bg-[var(--color-secondary)] text-[10px] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary)]">
                              Best Seller
                            </Badge>
                          )}
                          <span className="text-xs text-[var(--color-foreground)]/45">
                            {item.size}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <span className="font-semibold text-[var(--color-foreground)]/80">
                            {formatPrice(item.price)}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                            onClick={() => addItem(item)}
                            aria-label={`Tambah ${item.name} ke keranjang`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                          {inCart && (
                            <span className="text-[10px] font-semibold text-[var(--color-primary)]">
                              x{inCart.qty}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
