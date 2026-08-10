import { DriveMedia } from "@/components/drive-media";
import { bestSellers } from "@/lib/data";
import type { DriveMediaKey } from "@/lib/media";

const bestSellerMediaKey: Record<string, DriveMediaKey> = {
  "Ori Jumbo": "bestSellerOriJumbo",
  "Teh Leci": "bestSellerTehLeci",
  "Lecy Milk Tea": "bestSellerLecyMilkTea",
  "Lemon Tea": "bestSellerLemonTea",
  "Lemon Tea Honey": "bestSellerLemonTeaHoney",
};

export function BestSeller() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">
            Favorit Pelanggan
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Best Seller Es Teh Kulonan
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {bestSellers.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-3">
              <DriveMedia
                mediaKey={bestSellerMediaKey[item.name]}
                aspect="aspect-square"
                label={`Foto ${item.name}`}
                className="w-full"
              />
              <p className="text-center text-xs font-semibold text-[var(--color-foreground)]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
