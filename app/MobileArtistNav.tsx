"use client";

import { useEffect, useState } from "react";
import { LanguageToggle, T } from "./LanguageContext";
import styles from "./MobileArtistNav.module.css";

type MobileArtistNavProps = {
  variant?: "warm" | "electric";
  links: Array<{ href: string; en: string; no: string }>;
};

export default function MobileArtistNav({ variant = "warm", links }: MobileArtistNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.button} ${open ? styles.open : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-artist-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        <span className={styles.icon} aria-hidden="true"><span /><span /><span /></span>
      </button>

      {open && (
        <div id="mobile-artist-menu" className={`${styles.panel} ${variant === "electric" ? styles.electricPanel : ""}`}>
          <nav className={styles.links} aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={`${link.href}-${link.en}`} href={link.href} onClick={() => setOpen(false)}>
                <T en={link.en} no={link.no} />
                <span className={styles.arrow} aria-hidden="true">↘</span>
              </a>
            ))}
          </nav>
          <div className={styles.tools}>
            <span className={styles.label}><T en="Language" no="Språk" /></span>
            <LanguageToggle className={variant === "electric" ? "language-toggle language-toggle-electric" : "language-toggle"} />
          </div>
        </div>
      )}
    </div>
  );
}
