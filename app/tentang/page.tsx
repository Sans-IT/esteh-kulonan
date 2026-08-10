import { Navbar } from "@/components/sections/navbar";
import { About } from "@/components/sections/about";
import { LogoMeaning } from "@/components/sections/logo-meaning";
import { JumatBerkah } from "@/components/sections/jumat-berkah";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Tentang Kami — Es Teh Kulonan",
};

export default function TentangPage() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <div className="pt-8">
        <About />
        <LogoMeaning />
        <JumatBerkah />
      </div>
      <Footer />
    </main>
  );
}
