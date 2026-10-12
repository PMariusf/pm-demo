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
    <section className="border-y border-white/10 bg-[#090b0d] py-14 sm:py-20" aria-labelledby="ayline-visual-moments">
      <div className="shell">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-0 text-[11px] uppercase tracking-[0.34em] text-[#d9b77f]">Ayline · Visual moments</p>
            <h2 id="ayline-visual-moments" className="mt-2 font-serif text-3xl text-white sm:text-4xl">Between the words.</h2>
          </div>
          <p className="m-0 max-w-md text-sm leading-6 text-white/45">Quiet frames from the same world as the songs — reflective, warm and a little cinematic.</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              key={images[active]}
              src={images[active]}
              alt={`Ayline visual ${active + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 1400px"
              className="object-cover"
              priority={active === 0}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs tracking-[0.22em] text-white/65 backdrop-blur-md">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>

            <button
              type="button"
              onClick={previous}
              aria-label="Previous Ayline image"
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-xl text-white backdrop-blur-md transition hover:border-[#d8ad72]/70 hover:text-[#e4bd83] sm:left-5"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next Ayline image"
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-xl text-white backdrop-blur-md transition hover:border-[#d8ad72]/70 hover:text-[#e4bd83] sm:right-5"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Choose Ayline image">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show Ayline image ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={`relative h-20 min-w-[110px] overflow-hidden rounded-lg border transition sm:h-24 sm:min-w-[140px] ${
                index === active ? "border-[#d8ad72] opacity-100" : "border-white/10 opacity-55 hover:opacity-90"
              }`}
            >
              <Image src={src} alt="" fill sizes="140px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
