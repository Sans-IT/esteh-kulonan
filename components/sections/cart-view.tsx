"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GununganIcon } from "@/components/gunungan-icon";
import { useCart } from "@/lib/cart-context";

function formatPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function CartView() {
  const { lines, updateQty, removeItem, clear, totalPrice, checkoutWaLink } = useCart();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 xl:px-10 md:py-20">
      <div className="text-center">
        <GununganIcon className="mx-auto h-9 w-8 text-[var(--color-primary)]" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          Order
        </p>
        <h1 className="font-heading mt-2 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Keranjang Kamu
        </h1>
      </div>

      {lines.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-muted)]/40 py-16 text-center">
          <ShoppingBag className="h-8 w-8 text-[var(--color-foreground)]/30" />
          <p className="text-sm text-[var(--color-foreground)]/60">Keranjang masih kosong</p>
          <Button
            asChild
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
          >
            <Link href="/menu">Tambah Menu</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {lines.map((line) => (
            <Card
              key={line.id}
              className="flex flex-wrap items-center justify-between gap-4 border-[var(--color-border)] p-4"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--color-foreground)]">{line.name}</p>
                <p className="text-xs text-[var(--color-foreground)]/50">
                  {line.size} · {formatPrice(line.price)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] px-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => updateQty(line.id, line.qty - 1)}
                    aria-label="Kurangi"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-5 text-center text-sm font-medium">{line.qty}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => updateQty(line.id, line.qty + 1)}
                    aria-label="Tambah"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <p className="w-24 text-right text-sm font-semibold text-[var(--color-foreground)]">
                  {formatPrice(line.price * line.qty)}
                </p>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-[var(--color-foreground)]/40 hover:text-destructive"
                  onClick={() => removeItem(line.id)}
                  aria-label={`Hapus ${line.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}

          <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
            <button
              onClick={clear}
              className="text-xs font-medium text-[var(--color-foreground)]/50 hover:text-destructive"
            >
              Kosongkan keranjang
            </button>
            <div className="text-right">
              <p className="text-xs text-[var(--color-foreground)]/50">Total</p>
              <p className="font-heading text-xl font-semibold text-[var(--color-primary)]">
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            >
              <Link href="/menu">Tambah Menu Lagi</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="flex-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
            >
              <a href={checkoutWaLink()}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Checkout via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
