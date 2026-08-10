import { Navbar } from "@/components/sections/navbar";
import { OrderSteps } from "@/components/sections/order-steps";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Order — Es Teh Kulonan",
};

export default function OrderPage() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <OrderSteps />
      <Footer />
    </main>
  );
}
