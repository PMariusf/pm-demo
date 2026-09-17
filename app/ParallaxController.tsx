"use client";

import { useEffect } from "react";

/** Move only the hero photograph, never the text or cards. */
export default function ParallaxController() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const artwork = hero?.querySelector<HTMLElement>(".hero-art");
    if (!hero || !artwork) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        artwork.style.transform = "";
        return;
      }

      const rect = hero.getBoundingClientRect();
      // Keep the image moving slightly slower than the page while the hero scrolls.
      const distance = Math.max(0, Math.min(70, -rect.top * 0.22));
      artwork.style.transform = `translate3d(0, ${Math.round(distance)}px, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      artwork.style.transform = "";
    };
  }, []);

  return null;
}
