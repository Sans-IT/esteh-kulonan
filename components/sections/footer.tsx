import { MessageCircle } from "lucide-react";
import { GununganIcon } from "@/components/gunungan-icon";
import { waLink } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="mx-auto max-w-[1400px] px-6 xl:px-10 py-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <GununganIcon className="h-10 w-9 text-[var(--color-secondary)]" />
          <p className="text-lg font-semibold">Es Teh Kulonan</p>
          <p className="max-w-md text-sm leading-relaxed text-[var(--color-primary-foreground)]/70">
            Minuman teh tradisional khas Solo — autentik, berkualitas, dan
            sarat nilai budaya, hadir menemani setiap momenmu.
          </p>
          <a
            href={waLink("Halo, saya mau tanya-tanya tentang Es Teh Kulonan")}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            081299960009
          </a>
        </div>

        <div className="mt-10 border-t border-[var(--color-primary-foreground)]/15 pt-6 text-center text-xs text-[var(--color-primary-foreground)]/50">
          © {new Date().getFullYear()} Es Teh Kulonan. Asli Solo.
        </div>
      </div>
    </footer>
  );
}
