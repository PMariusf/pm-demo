import type { ReactNode } from "react";
import AylineCarousel from "./AylineCarousel";
import ElisaCarousel from "./ElisaCarousel";
import { T } from "./LanguageContext";

type BehindSoundProps = {
  artist: "Ayline" | "Elísa";
  eyebrow: ReactNode;
  title: ReactNode;
  intro: ReactNode;
  body: ReactNode;
  details: Array<{ label: ReactNode; value: ReactNode; key: string }>;
  variant?: "warm" | "electric";
};

export default function BehindSound({
  artist,
  eyebrow,
  title,
  intro,
  body,
  details,
  variant = "warm",
}: BehindSoundProps) {
  const electric = variant === "electric";

  return (
    <section
      className={`relative overflow-hidden border-y border-white/10 ${
        electric ? "bg-[#070914]" : "bg-[#0a0b0d]"
      }`}
      aria-labelledby={`${artist.toLowerCase().replace("í", "i")}-behind-sound-title`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-70 ${
          electric
            ? "bg-[radial-gradient(circle_at_82%_25%,rgba(103,92,255,.22),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(0,214,255,.11),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_82%_25%,rgba(216,173,114,.16),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(255,255,255,.05),transparent_30%)]"
        }`}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-[min(100%-38px,1420px)] items-start gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-20 lg:py-28">
        <div className="min-w-0 self-start">
          <p
            className={`mb-4 text-[11px] uppercase tracking-[.28em] sm:tracking-[.34em] ${
              electric ? "text-cyan-200/65" : "text-[#d9b77f]"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            id={`${artist.toLowerCase().replace("í", "i")}-behind-sound-title`}
            className="m-0 max-w-[10ch] font-serif text-4xl leading-[.98] tracking-[-.035em] text-white sm:text-6xl lg:text-7xl"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55 sm:mt-6 sm:text-base">{intro}</p>

          {artist === "Ayline" && (
            <div className="mt-7 max-w-[500px] sm:mt-8">
              <AylineCarousel />
            </div>
          )}

          {artist === "Elísa" && (
            <div className="mt-7 max-w-[500px] sm:mt-8">
              <ElisaCarousel />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="mb-6 flex items-center gap-4 sm:mb-8">
            <span
              className={`h-px w-14 ${electric ? "bg-cyan-200/50" : "bg-[#d9b77f]/60"}`}
              aria-hidden="true"
            />
            <span className="text-xs uppercase tracking-[.3em] text-white/40">{artist}</span>
          </div>

          <div className="m-0 max-w-3xl whitespace-pre-line font-serif text-xl leading-[1.5] text-white/88 sm:text-3xl">
            {body}
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-10 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.key} className="bg-[#0b0d10]/95 px-5 py-5 sm:px-6">
                <span
                  className={`block text-[10px] uppercase tracking-[.24em] sm:tracking-[.27em] ${
                    electric ? "text-cyan-200/55" : "text-[#d9b77f]/75"
                  }`}
                >
                  {detail.label}
                </span>
                <strong className="mt-2 block text-sm font-medium leading-6 text-white/78">{detail.value}</strong>
              </div>
            ))}
          </div>

          <p className="mb-0 mt-8 text-sm italic tracking-wide text-white/35">
            <T
              en="Two artists. Two different ways into the same feeling."
              no="To artister. To forskjellige veier inn i den samme følelsen."
            />
          </p>
        </div>
      </div>
    </section>
  );
}
