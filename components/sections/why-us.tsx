import { GununganIcon } from "@/components/gunungan-icon";
import { DriveMedia } from "@/components/drive-media";

const reasons = [
  {
    title: "Cita Rasa Khas Kulonan",
    desc: "Diracik dengan resep khas yang terinspirasi cita rasa Wonogiri, Jawa Tengah.",
  },
  {
    title: "Bahan-Bahan Pilihan",
    desc: "Diracik dengan cermat untuk menjaga kualitas dan kesegaran di setiap sajian.",
  },
  {
    title: "Kenikmatan dalam Setiap Momen",
    desc: "Menemani berbagai aktivitas, dari waktu santai sampai kumpul bareng keluarga atau teman.",
  },
];

export function WhyUs() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          Kenapa Memilih Kami
        </p>
        <h2 className="font-heading mt-3 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Kenapa Memilih Es Teh Kulonan?
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {reasons.map((r, i) => (
          <div key={r.title} className="relative pl-14">
            <GununganIcon className="absolute left-0 top-0 h-10 w-9 text-[var(--color-primary)]" />
            <h3 className="font-heading text-lg font-semibold text-[var(--color-foreground)]">
              {i + 1}. {r.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-foreground)]/65">
              {r.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <DriveMedia
          mediaKey="whyUsVideo"
          type="video"
          aspect="aspect-[21/9]"
          label="Video produk — gambar Sprite series, sesuai brief 'Kenapa memilih Es Teh Kulonan'"
          className="mx-auto max-w-4xl"
        />
      </div>
    </section>
  );
}
