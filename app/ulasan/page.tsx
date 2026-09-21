import { Navbar } from "@/components/sections/navbar";
import { Reviews } from "@/components/sections/reviews";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Ulasan — Es Teh Kulonan",
};

export default function UlasanPage() {
  return (
    <main className="text-[var(--color-foreground)]">
      <Navbar />
      <Reviews />
      <Footer />
    </main>
  );
}
