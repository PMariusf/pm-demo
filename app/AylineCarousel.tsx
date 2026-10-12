"use client";

import Image from "next/image";
import { useState } from "react";

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

export default function AylineCarousel() {
  const [active, setActive] = useState(0);

  function previous() {
    setActive((current) => (current - 1 + images.length) % images.length);
  }

  function next() {
    setActive((current) => (current + 1) % images.length);
  }

  return (
    <div className="mt-8 w-full max-w-[520px]" aria-label="Ayline visual moments">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="m-0 text-[10px] uppercase tracking-[0.3em] text-[#d9b77f]/75">Ayline · Visual moments</p>
        <span className="text-[10px] tracking-[0.2em] text-white/35">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40">
        <div className="relative aspect-[4/3] w-full">
          <Image
            key={images[active]}
            src={images[active]}
            alt={`Ayline visual ${active + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

          <button
            type="button"
            onClick={previous}
            aria-label="Previous Ayline image"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-lg text-white backdrop-blur-md transition hover:border-[#d8ad72]/70 hover:text-[#e4bd83]"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next Ayline image"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-lg text-white backdrop-blur-md transition hover:border-[#d8ad72]/70 hover:text-[#e4bd83]"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1" aria-label="Choose Ayline image">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show Ayline image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={`relative h-11 min-w-[58px] overflow-hidden rounded-md border transition ${
              index === active ? "border-[#d8ad72] opacity-100" : "border-white/10 opacity-45 hover:opacity-85"
            }`}
          >
            <Image src={src} alt="" fill sizes="58px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
