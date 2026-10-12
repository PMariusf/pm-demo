"use client";

import { useState } from "react";

const email = "marius28@live.no";

export default function FooterContact() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="footer-contact" aria-label="PM’s contact and social links">
      <span className="footer-contact-copyright">© {new Date().getFullYear()} PM’s</span>
      <span className="footer-contact-separator" aria-hidden="true">·</span>
      {showEmail ? (
        <a href={`mailto:${email}`} aria-label={`Email PM’s at ${email}`}>
          {email}
        </a>
      ) : (
        <button type="button" onClick={() => setShowEmail(true)} aria-label="Show email address">
          Show email
        </button>
      )}
      <span className="footer-contact-separator" aria-hidden="true">·</span>
      <a href="https://www.instagram.com/p_marius__/" target="_blank" rel="noreferrer">
        Instagram @p_marius__
      </a>
      <span className="footer-contact-separator" aria-hidden="true">·</span>
      <a href="https://www.facebook.com/per.marius.fy" target="_blank" rel="noreferrer">
        Facebook
      </a>
    </div>
  );
}
