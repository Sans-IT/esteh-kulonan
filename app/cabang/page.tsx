import { Navbar } from "@/components/sections/navbar";
import { Branches } from "@/components/sections/branches";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Cabang — Es Teh Kulonan",
};

export default function CabangPage() {
  return (
    <main className="text-[var(--color-foreground)]">
      <Navbar />
      <div className="pt-8">
        <Branches />
      </div>
      <Footer />
    </main>
  );
}
