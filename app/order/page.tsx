import { Suspense } from "react";
import { Navbar } from "@/components/sections/navbar";
import { CartView } from "@/components/sections/cart-view";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Order — Es Teh Kulonan",
};

export default function OrderPage() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl px-6 py-24 text-center text-sm text-[var(--color-foreground)]/50">
            Memuat halaman order...
          </div>
        }
      >
        <CartView />
      </Suspense>
      <Footer />
    </main>
  );
}
