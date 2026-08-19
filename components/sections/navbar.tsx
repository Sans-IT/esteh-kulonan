"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GununganIcon } from "@/components/gunungan-icon";
import { waLink } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/menu", label: "Menu" },
  { href: "/ulasan", label: "Ulasan" },
  { href: "/cabang", label: "Cabang" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 xl:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <GununganIcon className="h-8 w-7 text-[var(--color-primary)]" />
          <span className="font-heading text-lg font-semibold tracking-tight text-[var(--color-primary)]">
            Es Teh Kulonan
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--color-foreground)]/70 transition-colors hover:text-[var(--color-primary)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/order"
            aria-label="Keranjang"
            className="relative rounded-full border border-[var(--color-border)] p-2.5 text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)]/40"
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-semibold text-[var(--color-primary-foreground)]">
                {totalItems}
              </span>
            )}
          </Link>
          <Button
            asChild
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
          >
            <a href={waLink("Halo, saya mau pesan Es Teh Kulonan")}>Pesan Sekarang</a>
          </Button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Link href="/order" aria-label="Keranjang" className="relative p-1">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] font-semibold text-[var(--color-primary-foreground)]">
                {totalItems}
              </span>
            )}
          </Link>
          <button aria-label="Buka menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[var(--color-foreground)]/70"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[var(--color-foreground)]/70"
            >
              Order / Keranjang
            </Link>
            <Button
              asChild
              className="mt-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
            >
              <a href={waLink("Halo, saya mau pesan Es Teh Kulonan")}>Pesan Sekarang</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
