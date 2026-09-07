import { DriveMedia } from "@/components/drive-media";
import { driveVideos } from "@/lib/media";
import { GununganIcon } from "@/components/gunungan-icon";
import { FadeInView } from "@/components/motion/fade-in-view";

export function JumatBerkah() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 xl:px-10 py-16 md:py-20">
      <FadeInView>
        <div className="grid items-center gap-10 rounded-3xl bg-[var(--color-secondary)]/10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <GununganIcon className="h-10 w-9 text-[var(--color-secondary)]" />
            <h2 className="font-heading mt-4 text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
              Jumat Berkah
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-foreground)]/70">
              Kami juga mengadakan Jumat Berkah untuk kalian yang mengikuti tim
              Es Teh Kulonan. Jangan lupa terus pantau kabar kami, ya!
            </p>
          </div>
          <DriveMedia
            fileId={driveVideos.jumatBerkahVideo}
            type="video"
            label="Video dokumentasi Jumat Berkah"
          />
        </div>
      </FadeInView>
    </section>
  );
}
