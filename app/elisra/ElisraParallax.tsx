"use client";

import { useEffect, useRef, useState } from "react";
import heroStyles from "./hero.module.css";

export default function ElisraParallax() {
  const artworkRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const artwork = artworkRef.current;
    const hero = artwork?.parentElement;
    if (!artwork || !hero) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(motionPreference.matches);
    syncMotion();
    let frame = 0;

    const update = () => {
      frame = 0;
      if (motionPreference.matches) {
        artwork.style.transform = "";
        return;
      }
      const top = hero.getBoundingClientRect().top;
      const offset = Math.max(-64, Math.min(64, -top * 0.16));
      artwork.style.transform = `translate3d(0, ${Math.round(offset)}px, 0)`;
    };

    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    motionPreference.addEventListener("change", syncMotion);
    motionPreference.addEventListener("change", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      motionPreference.removeEventListener("change", syncMotion);
      motionPreference.removeEventListener("change", queueUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      artwork.style.transform = "";
    };
  }, []);

  return (
    <div ref={artworkRef} className={heroStyles.photo} role="img" aria-label="Elísra moving hero artwork">
      {!reducedMotion && (
        <video
          className={heroStyles.heroVideo}
          src="/images/Elisra/generated-video-cover-art-1791220543938.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
      <span className={heroStyles.signalLine} aria-hidden="true">SIGNAL // CONNECTED · ELÍSRA</span>
    </div>
  );
}
