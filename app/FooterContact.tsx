"use client";

import { useState } from "react";

const email = "marius28@live.no";

export default function FooterContact() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px 16px",
        fontSize: 12,
        letterSpacing: ".08em",
        color: "rgba(255,255,255,.58)",
        textTransform: "uppercase",
      }}
      aria-label="PM’s contact and social links"
    >
      <span>© {new Date().getFullYear()} PM’s</span>
      <span aria-hidden="true">·</span>
      {showEmail ? (
        <a
          href={`mailto:${email}`}
          style={{ color: "inherit", textDecoration: "none" }}
          aria-label={`Email PM’s at ${email}`}
        >
          {email}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setShowEmail(true)}
          style={{
            padding: 0,
            border: 0,
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            font: "inherit",
            letterSpacing: "inherit",
            textTransform: "inherit",
          }}
          aria-label="Show email address"
        >
          Show email
        </button>
      )}
      <span aria-hidden="true">·</span>
      <a
        href="https://www.instagram.com/p_marius__/"
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Instagram @p_marius__
      </a>
      <span aria-hidden="true">·</span>
      <a
        href="https://www.facebook.com/per.marius.fy"
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Facebook
      </a>
    </div>
  );
}
