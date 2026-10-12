"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/Unsorted/ChatGPT%20Image%20Aug%207,%202026,%2007_23_59%20PM%20(2).png",
  "/images/Unsorted/image-gen-2(3).png",
  "/images/Unsorted/image-gen-3(4).png",
  "/images/Unsorted/image-gen-4(1).png",
  "/images/Unsorted/image-gen-4(2).png",
  "/images/Unsorted/image-gen-4(3).png",
  "/images/Unsorted/image-gen-5(1).png",
  "/images/Unsorted/image-gen-6(1).png",
  "/images/Unsorted/image-gen-6.png",
] as const;

const AUTOPLAY_MS = 6000;

export default function AylineCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
      setRestartKey((current) => current + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, restartKey]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  function pauseTemporarily() {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      setPaused(false);
      setRestartKey((current) => current + 1);
    }, 8000);
  }

  function previous() {
    pauseTemporarily();
    setActive((current) => (current - 1 + images.length) % images.length);
    setRestartKey((current) => current + 1);
  }

  function next() {
    pauseTemporarily();
    setActive((current) => (current + 1) % images.length);
    setRestartKey((current) => current + 1);
  }

  function choose(index: number) {
    pauseTemporarily();
    setActive(index);
    setRestartKey((current) => current + 1);
  }

  return (
    <div
      className="mt-8 w-full max-w-[520px]"
      aria-label="Ayline visual moments"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <style>{`
        @keyframes ayline-cinematic-drift {
          0% { transform: scale(1.015) translate3d(0, 0, 0); }
          100% { transform: scale(1.085) translate3d(-0.7%, -0.35%, 0); }
        }
        @keyframes ayline-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ayline-drift,
          .ayline-progress { animation: none !important; }
        }
      `}</style>

      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-white/30" : "bg-[#d9b77f]"}`} aria-hidden="true" />
          <p className="m-0 text-[10px] uppercase tracking-[0.3em] text-[#d9b77f]/75">Ayline · Visual moments</p>
        </div>
        <span className="text-[10px] tracking-[0.2em] text-white/35">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            key={`${images[active]}-${restartKey}`}
            src={images[active]}
            alt={`Ayline visual ${active + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="ayline-drift object-cover"
            style={{ animation: paused ? "none" : `ayline-cinematic-drift ${AUTOPLAY_MS}ms ease-out both` }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#d8ad72]/10 to-transparent" />

          <button
            type="button"
            onClick={previous}
            aria-label="Previous Ayline image"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-lg text-white backdrop-blur-md transition hover:scale-105 hover:border-[#d8ad72]/70 hover:text-[#e4bd83]"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next Ayline image"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-lg text-white backdrop-blur-md transition hover:scale-105 hover:border-[#d8ad72]/70 hover:text-[#e4bd83]"
          >
            ›
          </button>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            {!paused && (
              <span
                key={`progress-${active}-${restartKey}`}
                className="ayline-progress block h-full origin-left bg-[#d8ad72]/85"
                style={{ animation: `ayline-progress ${AUTOPLAY_MS}ms linear forwards` }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1" aria-label="Choose Ayline image">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => choose(index)}
            aria-label={`Show Ayline image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={`relative h-11 min-w-[58px] overflow-hidden rounded-md border transition duration-300 ${
              index === active
                ? "border-[#d8ad72] opacity-100 shadow-[0_0_18px_rgba(216,173,114,.14)]"
                : "border-white/10 opacity-40 hover:-translate-y-0.5 hover:opacity-85"
            }`}
          >
            <Image src={src} alt="" fill sizes="58px" className="object-cover" />
          </button>
        ))}
      </div>

      <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/25">
        {paused ? "Paused · move away to continue" : "Cinematic sequence · autoplay"}
      </p>
    </div>
  );
}
