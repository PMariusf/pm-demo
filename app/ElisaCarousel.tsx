"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/Elisra/ChatGPT%20Image%20Sep%2028,%202026,%2012_18_48%20AM%20(4).png",
  "/images/Elisra/ChatGPT%20Image%20Sep%2028,%202026,%2012_21_51%20AM%20(1).png",
  "/images/Elisra/ChatGPT%20Image%20Sep%2028,%202026,%2012_21_51%20AM%20(2).png",
  "/images/Elisra/ChatGPT%20Image%20Sep%2028,%202026,%2012_21_52%20AM%20(3).png",
  "/images/Elisra/Elisra-landscape.png",
  "/images/Elisra/El%C3%ADsra.png",
  "/images/Elisra/El%C3%ADsra1.png",
  "/images/Elisra/El%C3%ADsra2.png",
] as const;

const intervalMs = 6000;

export default function ElisaCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % images.length);
      setRestartKey((key) => key + 1);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  function pauseTemporarily() {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 8000);
  }

  function goTo(index: number) {
    setActive(index);
    setRestartKey((key) => key + 1);
    pauseTemporarily();
  }

  function previous() {
    goTo((active - 1 + images.length) % images.length);
  }

  function next() {
    goTo((active + 1) % images.length);
  }

  return (
    <div
      className="mt-8 w-full max-w-[520px]"
      aria-label="Elísa visual moments"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="m-0 text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">Elísa · Visual signals</p>
        <span className="text-[10px] tracking-[0.2em] text-white/35">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-cyan-200/15 bg-black shadow-2xl shadow-black/40">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            key={`${images[active]}-${restartKey}`}
            src={images[active]}
            alt={`Elísa visual ${active + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover motion-safe:animate-[elisaKenBurns_6s_ease-out_both]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(139,92,246,.16),transparent_35%),linear-gradient(to_top,rgba(0,0,0,.42),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10">
            <div
              key={`progress-${restartKey}-${active}`}
              className="h-full origin-left bg-gradient-to-r from-cyan-300/75 to-violet-400/85 motion-safe:animate-[elisaProgress_6s_linear_both] motion-reduce:hidden"
            />
          </div>

          <button type="button" onClick={previous} aria-label="Previous Elísa image" className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-lg text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200">‹</button>
          <button type="button" onClick={next} aria-label="Next Elísa image" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-lg text-white backdrop-blur-md transition hover:border-violet-300/70 hover:text-violet-200">›</button>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1" aria-label="Choose Elísa image">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show Elísa image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={`relative h-11 min-w-[58px] overflow-hidden rounded-md border transition ${index === active ? "border-cyan-300/80 opacity-100 shadow-[0_0_18px_rgba(103,232,249,.16)]" : "border-white/10 opacity-45 hover:opacity-85"}`}
          >
            <Image src={src} alt="" fill sizes="58px" className="object-cover" />
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes elisaKenBurns {
          from { transform: scale(1.02) translate3d(0, 0, 0); }
          to { transform: scale(1.08) translate3d(-1.2%, -0.8%, 0); }
        }
        @keyframes elisaProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
