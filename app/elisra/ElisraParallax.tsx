"use client";

import { useEffect, useRef } from "react";
import heroStyles from "./hero.module.css";

/** Only the image moves; the title and buttons remain in their original positions. */
export default function ElisraParallax() {
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;
    const hero = artwork?.parentElement;
    if (!artwork || !hero) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (motionPreference.matches) {
        artwork.style.transform = "";
        return;
      }

      const top = hero.getBoundingClientRect().top;
      // Overscan in the CSS keeps the image edges hidden as it drifts on scroll.
      const offset = Math.max(-64, Math.min(64, -top * 0.16));
      artwork.style.transform = `translate3d(0, ${Math.round(offset)}px, 0)`;
    };

    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    motionPreference.addEventListener("change", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      motionPreference.removeEventListener("change", queueUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      artwork.style.transform = "";
    };
  }, []);

  return <div ref={artworkRef} className={heroStyles.photo} role="img" aria-label="Elísra landscape artwork" />;
}
