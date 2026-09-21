"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";

/** A quiet artist moment in the World section, never a second background soundtrack. */
export default function ElisraMotion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || unavailable) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (preference.matches) {
        video.pause();
      } else {
        // Autoplay may be blocked by the browser. The poster remains visible.
        void video.play().catch(() => {});
      }
    };

    syncPlayback();
    preference.addEventListener("change", syncPlayback);
    return () => {
      preference.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, [unavailable]);

  return (
    <div className={styles.motionFrame}>
      {unavailable ? (
        <div className={styles.motionFallback} role="img" aria-label="Elísra portrait" />
      ) : (
        <video
          ref={videoRef}
          className={styles.motionVideo}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/Elisra/Elísra3.png"
          onError={() => setUnavailable(true)}
          aria-label="Silent Elísra motion portrait"
        >
          <source src="/videos/Elisra/Elisra-wink.mp4" type="video/mp4" />
        </video>
      )}
      <span className={styles.motionCaption}>ELÍSRA / IN MOTION</span>
    </div>
  );
}
