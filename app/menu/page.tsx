import { Navbar } from "@/components/sections/navbar";
import { FullMenu } from "@/components/sections/full-menu";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Menu — Es Teh Kulonan",
};

export default function MenuPage() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <div className="pt-8">
        <FullMenu />
      </div>
      <Footer />
    </main>
  );
}
