import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { menuData } from "@/lib/data";

function formatPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function FullMenu() {
  return (
    <section id="menu" className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Daftar Menu
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Menu Kopi, Teh Ori &amp; Varian Kulonan
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menuData.map((cat) => (
            <Card
              key={cat.category}
              className="border-[var(--color-border)] bg-[var(--color-background)] p-6"
            >
              <h3 className="text-base font-semibold text-[var(--color-primary)]">
                {cat.category}
              </h3>
              <ul className="mt-4 space-y-3">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-[var(--color-foreground)]">
                        {item.name}
                      </span>
                      {item.bestSeller && (
                        <Badge className="border-none bg-[var(--color-secondary)] text-[10px] text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
                          Best Seller
                        </Badge>
                      )}
                      <span className="text-xs text-[var(--color-foreground)]/45">
                        {item.size}
                      </span>
                    </span>
                    <span className="whitespace-nowrap font-semibold text-[var(--color-foreground)]/80">
                      {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
