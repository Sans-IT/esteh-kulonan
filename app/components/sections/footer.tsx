import Link from "next/link";
import { MessageCircle, Phone, MapPin, Music2 } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social-icons";
import { Logo } from "@/components/logo";
import { orderLink, WA_NUMBER, PHONE_DISPLAY, HQ_ADDRESS, socials } from "@/lib/data";

const navLinks = [
  { href: "/tentang", label: "Tentang" },
  { href: "/menu", label: "Menu" },
  { href: "/ulasan", label: "Ulasan" },
  { href: "/cabang", label: "Cabang" },
  { href: "/franchise", label: "Franchise" },
];

const socialLinks = [
  { key: "instagram", href: socials.instagram, icon: InstagramIcon, label: "Instagram" },
  { key: "tiktok", href: socials.tiktok, icon: Music2, label: "TikTok" },
  { key: "facebook", href: socials.facebook, icon: FacebookIcon, label: "Facebook" },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="mx-auto max-w-[1400px] px-6 py-14 xl:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-10" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-primary-foreground)]/70">
              Minuman teh tradisional khas Solo — autentik, berkualitas, dan
              sarat nilai budaya, hadir menemani setiap momenmu.
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="rounded-full bg-[var(--color-primary-foreground)]/10 p-2 transition-colors hover:bg-[var(--color-primary-foreground)]/20"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-foreground)]/60">
              Navigasi
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-primary-foreground)]/80 hover:text-[var(--color-primary-foreground)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-foreground)]/60">
              Kontak
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-primary-foreground)]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{HQ_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:+${WA_NUMBER}`} className="hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-foreground)]/60">
              Pesan Langsung
            </p>
            <Link
              href={orderLink()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-secondary-foreground)] transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Pesan Sekarang
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-primary-foreground)]/15 pt-6 text-center text-xs text-[var(--color-primary-foreground)]/50">
          © {new Date().getFullYear()} Es Teh Kulonan. Asli Solo.
        </div>
      </div>
    </footer>
  );
}
