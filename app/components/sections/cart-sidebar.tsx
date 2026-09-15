"use client";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartContents } from "@/components/sections/cart-view";
import { useCart } from "@/lib/cart-context";

export function CartSidebar({ mobile = false }: { mobile?: boolean }) {
  const { totalItems } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Buka keranjang"
          className={
            mobile
              ? "relative p-1"
              : "relative rounded-full border border-[var(--color-border)] p-2.5 text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)]/40"
          }
        >
          <ShoppingCart className={mobile ? "h-6 w-6" : "h-4 w-4"} />
          {totalItems > 0 && (
            <span
              className={
                mobile
                  ? "absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] font-semibold text-[var(--color-primary-foreground)]"
                  : "absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-semibold text-[var(--color-primary-foreground)]"
              }
            >
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full p-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Keranjang Kamu</SheetTitle>
        </SheetHeader>
        <CartContents />
      </SheetContent>
    </Sheet>
  );
}
