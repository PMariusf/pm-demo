"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageToggle, T } from "./LanguageContext";
import styles from "./MobileArtistNav.module.css";

const aylineLinks = [
  { href: "/#music", en: "Music", no: "Musikk" },
  { href: "/#lyrics", en: "Lyrics", no: "Tekster" },
  { href: "/#community", en: "Feel / Chat", no: "Følelser / Chat" },
  { href: "/elisra", en: "Explore Elísa", no: "Utforsk Elísa" },
];

const elisaLinks = [
  { href: "/elisra#music", en: "Music", no: "Musikk" },
  { href: "/elisra#story", en: "Story", no: "Historie" },
  { href: "/elisra#world", en: "World", no: "Verden" },
  { href: "/elisra#sound", en: "Sound", no: "Lyd" },
  { href: "/elisra#visuals", en: "Visuals", no: "Visuelt" },
  { href: "/", en: "Back to Ayline", no: "Tilbake til Ayline" },
];

export default function MobileArtistNav() {
  const pathname = usePathname();
  const electric = pathname.startsWith("/elisra");
  const links = electric ? elisaLinks : aylineLinks;
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

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
        <div id="mobile-artist-menu" className={`${styles.panel} ${electric ? styles.electricPanel : ""}`}>
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
            <LanguageToggle className={electric ? "language-toggle language-toggle-electric" : "language-toggle"} />
          </div>
        </div>
      )}
    </div>
  );
}
