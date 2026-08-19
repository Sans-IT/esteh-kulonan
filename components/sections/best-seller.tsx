"use client";

import { Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DriveMedia } from "@/components/drive-media";
import { bestSellers } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import type { DriveMediaKey } from "@/lib/media";

const bestSellerMediaKey: Record<string, DriveMediaKey> = {
  "ori-jumbo": "bestSellerOriJumbo",
  "teh-leci": "bestSellerTehLeci",
  "lecy-milk-tea": "bestSellerLecyMilkTea",
  "lemon-tea": "bestSellerLemonTea",
  "lemon-tea-honey": "bestSellerLemonTeaHoney",
};

function formatPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function BestSeller() {
  const { addItem, lines } = useCart();

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16 xl:px-10 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Favorit Pelanggan
          </p>
          <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Best Seller Es Teh Kulonan
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {bestSellers.map((item) => {
            const inCart = lines.find((l) => l.id === item.id);
            return (
              <Card
                key={item.id}
                className="flex flex-col gap-3 border-[var(--color-border)] bg-[var(--color-background)] p-3"
              >
                <div className="relative">
                  <Badge className="absolute left-1.5 top-1.5 z-10 border-none bg-[var(--color-secondary)] text-[9px] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary)]">
                    Best Seller
                  </Badge>
                  <DriveMedia
                    mediaKey={bestSellerMediaKey[item.id]}
                    aspect="aspect-square"
                    label={`Foto ${item.name}`}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-center text-xs font-semibold text-[var(--color-foreground)]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-center text-xs text-[var(--color-foreground)]/60">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => addItem(item)}
                  className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
                >
                  {inCart ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Di keranjang ({inCart.qty})
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" /> Keranjang
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
