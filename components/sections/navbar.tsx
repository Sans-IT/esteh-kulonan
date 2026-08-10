"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GununganIcon } from "@/components/gunungan-icon";
import { waLink } from "@/lib/data";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/cabang", label: "Cabang" },
  { href: "/franchise", label: "Franchise" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <GununganIcon className="h-8 w-7 text-[var(--color-primary)]" />
          <span className="text-lg font-semibold tracking-tight text-[var(--color-primary)]">
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

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
          >
            <a href={waLink("Halo, saya mau pesan Es Teh Kulonan")}>Pesan Sekarang</a>
          </Button>
        </div>

        <button
          className="md:hidden"
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] px-5 py-4 md:hidden">
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
