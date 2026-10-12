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
          0% { transform: scale(1.018) translate3d(0, 0, 0); }
          100% { transform: scale(1.09) translate3d(-0.8%, -0.45%, 0); }
        }
        @keyframes ayline-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes ayline-grain {
          0%,100% { transform: translate(0,0); }
          25% { transform: translate(-1%,1%); }
          50% { transform: translate(1%,-1%); }
          75% { transform: translate(.5%,1%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ayline-drift,
          .ayline-progress,
          .ayline-grain { animation: none !important; }
        }
      `}</style>

      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="m-0 font-serif text-[11px] uppercase tracking-[0.28em] text-[#e2bd83]">Ayline / From the words</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/28">Cinematic rock portraits</p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#e2bd83]/55">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative rounded-[18px] border border-[#d8ad72]/25 bg-[#120e0b] p-[5px] shadow-[0_18px_55px_rgba(0,0,0,.48),0_0_0_1px_rgba(216,173,114,.05),0_0_35px_rgba(128,69,28,.12)]">
        <div className="relative overflow-hidden rounded-[14px] border border-white/8 bg-black">
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

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,4,2,.66),transparent_48%),radial-gradient(circle_at_15%_15%,rgba(181,84,32,.18),transparent_38%),radial-gradient(circle_at_85%_82%,rgba(216,173,114,.11),transparent_32%)]" />
            <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-25 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.035)_0,rgba(255,255,255,.035)_1px,transparent_1px,transparent_3px)]" />
            <div className="ayline-grain pointer-events-none absolute -inset-6 opacity-[.08] [background-image:radial-gradient(circle,rgba(255,255,255,.55)_0.5px,transparent_0.7px)] [background-size:5px_5px]" style={{ animation: "ayline-grain .8s steps(2,end) infinite" }} />

            <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-[#d8ad72]/25 bg-black/40 px-3 py-1.5 backdrop-blur-md">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#e5c08b]/85">Rock frame · {String(active + 1).padStart(2, "0")}</span>
            </div>

            <div className="pointer-events-none absolute bottom-5 left-5 right-16">
              <p className="m-0 font-serif text-[16px] italic tracking-wide text-white/78">Words become sound.</p>
            </div>

            <button
              type="button"
              onClick={previous}
              aria-label="Previous Ayline image"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-sm border border-[#d8ad72]/35 bg-[#0b0806]/75 text-xl text-[#e5c08b] backdrop-blur-md transition hover:-translate-x-0.5 hover:border-[#e5c08b]/75 hover:bg-[#1a110b]/90"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next Ayline image"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-sm border border-[#d8ad72]/35 bg-[#0b0806]/75 text-xl text-[#e5c08b] backdrop-blur-md transition hover:translate-x-0.5 hover:border-[#e5c08b]/75 hover:bg-[#1a110b]/90"
            >
              ›
            </button>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-black/35">
              {!paused && (
                <span
                  key={`progress-${active}-${restartKey}`}
                  className="ayline-progress block h-full origin-left bg-gradient-to-r from-[#8f4b26] via-[#c37a3a] to-[#e2bd83]"
                  style={{ animation: `ayline-progress ${AUTOPLAY_MS}ms linear forwards` }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Choose Ayline image">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => choose(index)}
            aria-label={`Show Ayline image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={`relative h-12 min-w-[60px] overflow-hidden rounded-sm border bg-[#0a0705] p-[2px] transition duration-300 ${
              index === active
                ? "border-[#d8ad72]/85 opacity-100 shadow-[0_0_20px_rgba(181,98,42,.22)]"
                : "border-[#5c4634]/35 opacity-38 hover:-translate-y-0.5 hover:border-[#d8ad72]/45 hover:opacity-80"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image src={src} alt="" fill sizes="60px" className="object-cover saturate-[.88] contrast-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b1408]/35 to-transparent" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/25">
        <span className={`h-1.5 w-1.5 ${paused ? "bg-white/20" : "bg-[#c37a3a]"}`} aria-hidden="true" />
        <span>{paused ? "Paused" : "Auto sequence"}</span>
      </div>
    </div>
  );
}
