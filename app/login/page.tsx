import Link from "next/link";
import { GununganIcon } from "@/components/gunungan-icon";
import { LoginCard } from "@/components/auth/login-form";

export const metadata = {
  title: "Masuk — Es Teh Kulonan",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[var(--color-muted)]/40 px-6 py-12">
      <Link href="/" className="flex items-center gap-2.5">
        <GununganIcon className="h-9 w-8 text-[var(--color-primary)]" />
        <span className="font-heading text-lg font-semibold tracking-tight text-[var(--color-primary)]">
          Es Teh Kulonan
        </span>
      </Link>

      <LoginCard />

      <Link
        href="/"
        className="text-xs font-medium text-[var(--color-foreground)]/50 hover:text-[var(--color-primary)]"
      >
        ← Kembali ke beranda
      </Link>
    </main>
  );
}
