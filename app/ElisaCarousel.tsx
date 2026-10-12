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
  }, [paused, restartKey]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  function pauseTemporarily() {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      setPaused(false);
      setRestartKey((key) => key + 1);
    }, 8000);
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
      aria-label="Elísa visual signals"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="m-0 text-[10px] uppercase tracking-[0.32em] text-cyan-200/80">Elísa / Visual frequency</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-violet-200/35">Electric signal archive</p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-cyan-100/45">
          SIG {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative rounded-[20px] border border-cyan-300/20 bg-[#050711]/90 p-[5px] shadow-[0_20px_65px_rgba(0,0,0,.52),0_0_35px_rgba(56,189,248,.10),0_0_70px_rgba(124,58,237,.08)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -left-8 top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-6 bottom-8 h-28 w-28 rounded-full bg-violet-500/12 blur-3xl" />

        <div className="relative overflow-hidden rounded-[15px] border border-white/8 bg-[#02030a]">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              key={`${images[active]}-${restartKey}`}
              src={images[active]}
              alt={`Elísa visual ${active + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover motion-safe:animate-[elisaKenBurns_6s_ease-out_both]"
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(168,85,247,.22),transparent_32%),radial-gradient(circle_at_12%_76%,rgba(34,211,238,.14),transparent_35%),linear-gradient(to_top,rgba(2,3,10,.62),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(125,211,252,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,.12)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[.08] [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_3px,rgba(255,255,255,.3)_4px)]" />

            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-cyan-300/25 bg-[#050711]/55 px-3 py-1.5 backdrop-blur-lg">
              <span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-white/25" : "bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,.8)]"}`} />
              <span className="text-[9px] uppercase tracking-[0.24em] text-cyan-100/80">Live signal</span>
            </div>

            <div className="pointer-events-none absolute bottom-5 left-5 right-16">
              <p className="m-0 text-[10px] uppercase tracking-[0.28em] text-cyan-100/48">Pulse / light / afterimage</p>
            </div>

            <button type="button" onClick={previous} aria-label="Previous Elísa image" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-cyan-300/25 bg-[#050711]/65 text-lg text-cyan-100 backdrop-blur-xl transition hover:-translate-x-0.5 hover:border-cyan-200/70 hover:bg-cyan-300/10 hover:shadow-[0_0_22px_rgba(34,211,238,.18)]">‹</button>
            <button type="button" onClick={next} aria-label="Next Elísa image" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-violet-300/25 bg-[#050711]/65 text-lg text-violet-100 backdrop-blur-xl transition hover:translate-x-0.5 hover:border-violet-200/70 hover:bg-violet-300/10 hover:shadow-[0_0_22px_rgba(167,139,250,.18)]">›</button>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
              {!paused && (
                <div
                  key={`progress-${restartKey}-${active}`}
                  className="h-full origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 motion-safe:animate-[elisaProgress_6s_linear_both] motion-reduce:hidden shadow-[0_0_12px_rgba(34,211,238,.7)]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Choose Elísa image">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show Elísa image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={`relative h-12 min-w-[60px] overflow-hidden rounded-md border bg-[#050711] p-[2px] transition duration-300 ${
              index === active
                ? "border-cyan-300/75 opacity-100 shadow-[0_0_18px_rgba(34,211,238,.18),0_0_28px_rgba(124,58,237,.10)]"
                : "border-white/10 opacity-38 hover:-translate-y-0.5 hover:border-violet-300/35 hover:opacity-80"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[3px]">
              <Image src={src} alt="" fill sizes="60px" className="object-cover contrast-[1.05] saturate-[1.08]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/8 via-transparent to-violet-500/12" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-white/24">
        <span>{paused ? "Signal paused" : "Auto transmission"}</span>
        <span className="text-cyan-100/28">ELÍSA // 2000X</span>
      </div>

      <style jsx global>{`
        @keyframes elisaKenBurns {
          from { transform: scale(1.02) translate3d(0, 0, 0); filter: saturate(1); }
          to { transform: scale(1.085) translate3d(-1.1%, -0.7%, 0); filter: saturate(1.08); }
        }
        @keyframes elisaProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
