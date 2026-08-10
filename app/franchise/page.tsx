import { Navbar } from "@/components/sections/navbar";
import { Franchise } from "@/components/sections/franchise";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Franchise — Es Teh Kulonan",
};

export default function FranchisePage() {
  return (
    <main className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <div className="pt-8">
        <Franchise />
      </div>
      <Footer />
    </main>
  );
}
