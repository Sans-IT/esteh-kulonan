import Link from "next/link";
import { MessageCircle, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GununganIcon } from "@/components/gunungan-icon";
import { menuAndalan, orderLink } from "@/lib/data";

const steps = [
  {
    icon: ShoppingBag,
    title: "1. Pilih Menu",
    desc: "Lihat varian dan harga lengkap di halaman Menu, tentukan pilihanmu.",
  },
  {
    icon: MapPin,
    title: "2. Pilih Cabang Terdekat",
    desc: "Cek daftar cabang untuk tahu lokasi paling dekat dengan kamu.",
  },
  {
    icon: MessageCircle,
    title: "3. Review & Kirim di Halaman Order",
    desc: "Cek ringkasan pesanan di halaman Order, lalu kirim langsung ke WA cabang pilihanmu.",
  },
];

export function OrderSteps() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
      <div className="text-center">
        <GununganIcon className="mx-auto h-9 w-8 text-[var(--color-primary)]" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]">
          Order
        </p>
        <h1 className="font-heading mt-2 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Pesan Es Teh Kulonan
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--color-foreground)]/65">
          Susun pesananmu di halaman Order, pilih cabang tujuan, lalu kirim
          langsung ke WhatsApp cabang tersebut — cepat dan tanpa ribet.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.title} className="border-[var(--color-border)] p-6">
            <s.icon className="h-6 w-6 text-[var(--color-primary)]" />
            <h3 className="font-heading mt-4 text-base font-semibold text-[var(--color-foreground)]">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-foreground)]/65">
              {s.desc}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-[var(--color-primary)] p-8 text-center text-[var(--color-primary-foreground)] md:p-12">
        <p className="text-sm uppercase tracking-wider text-[var(--color-secondary)]">
          Order Cepat — Menu Andalan
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {menuAndalan.map((m) => (
            <Button
              key={m}
              asChild
              variant="outline"
              className="border-[var(--color-primary-foreground)]/25 bg-transparent text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-foreground)]/10"
            >
              <Link href="/menu">{m}</Link>
            </Button>
          ))}
        </div>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)]/90"
        >
          <Link href={orderLink()}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Buka Halaman Order
          </Link>
        </Button>
      </div>
    </section>
  );
}
