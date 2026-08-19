import { GununganIcon } from "@/components/gunungan-icon";

const points = [
  {
    title: "Bentuk Gunungan (Wayang)",
    desc: "Melambangkan budaya Jawa, khususnya daerah Solo. Menunjukkan bahwa produk memiliki akar tradisi yang kuat dan membawa identitas lokal.",
  },
  {
    title: "Motif Ornamen di Dalamnya",
    desc: "Corak ukiran khas batik/wayang menggambarkan keindahan, keaslian, dan nilai seni — kesan produk yang berkelas dan tidak asal-asalan.",
  },
  {
    title: "Tulisan \u201cEs Teh Kulonan\u201d",
    desc: "\u201cKulonan\u201d dalam bahasa Jawa berarti barat, menekankan bahwa minuman ini menggunakan resep khas turun-temurun.",
  },
  {
    title: "Tulisan \u201cAsli Solo\u201d",
    desc: "Menegaskan asal-usul produk dari Solo, yang terkenal dengan budaya dan kulinernya — membangun kepercayaan atas cita rasa khas daerah tersebut.",
  },
];

export function LogoMeaning() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/40">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          <GununganIcon className="h-16 w-14 text-[var(--color-primary)]" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Makna di Balik Logo
          </p>
          <h2 className="font-heading mt-2 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
            Simbol Gunungan, Akar Budaya Solo
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="border-l-2 border-[var(--color-secondary)] pl-5">
              <h3 className="font-heading text-base font-semibold text-[var(--color-foreground)]">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-foreground)]/65">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic leading-relaxed text-[var(--color-foreground)]/60">
          Logo ini menyampaikan bahwa Es Teh Kulonan adalah minuman teh
          tradisional khas Solo yang autentik, berkualitas, dan memiliki
          nilai budaya tinggi.
        </p>
      </div>
    </section>
  );
}
