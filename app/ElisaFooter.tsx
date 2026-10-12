"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { T } from "./LanguageContext";

const email = "marius28@live.no";

export default function ElisaFooter() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <footer className="elisa-footer">
      <div className="elisa-footer-grid">
        <div className="elisa-footer-brand">
          <Link href="/elisra" aria-label="Elísa home" className="elisa-footer-logo">
            <Image
              src="/images/elisa-logo.png"
              alt="Elísa"
              width={1536}
              height={1024}
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
          <p>
            <T
              en="Electronic music, cinematic atmosphere and a visual world inside PM’s."
              no="Elektronisk musikk, cinematisk atmosfære og en visuell verden i PM’s-universet."
            />
          </p>
        </div>

        <div className="elisa-footer-column">
          <h3><T en="Contact" no="Kontakt" /></h3>
          <div className="elisa-footer-links">
            {showEmail ? (
              <a href={`mailto:${email}`}>{email}</a>
            ) : (
              <button type="button" onClick={() => setShowEmail(true)}>
                <T en="Show email" no="Vis e-post" />
              </button>
            )}
            <span>PM’s / Elísa</span>
          </div>
        </div>

        <div className="elisa-footer-column">
          <h3><T en="Quick Links" no="Snarveier" /></h3>
          <div className="elisa-footer-links">
            <a href="#music"><T en="Music" no="Musikk" /></a>
            <a href="#story"><T en="Story" no="Historie" /></a>
            <a href="#world"><T en="World" no="Verden" /></a>
            <a href="#sound"><T en="Sound" no="Lyd" /></a>
            <a href="#visuals"><T en="Visuals" no="Visuelt" /></a>
          </div>
        </div>

        <div className="elisa-footer-column">
          <h3><T en="Socials" no="Sosialt" /></h3>
          <div className="elisa-footer-links">
            <a href="https://www.instagram.com/p_marius__/" target="_blank" rel="noreferrer">Instagram @p_marius__</a>
            <a href="https://www.facebook.com/per.marius.fy" target="_blank" rel="noreferrer">Facebook</a>
            <a href="#top"><T en="Back to top ↑" no="Til toppen ↑" /></a>
          </div>
        </div>
      </div>

      <div className="elisa-footer-bottom">
        <span>© {new Date().getFullYear()} PM’s</span>
        <span>ELÍSA / CONCEPT DEMO</span>
      </div>
    </footer>
  );
}
