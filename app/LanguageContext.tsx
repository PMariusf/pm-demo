"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "no";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("pm-language");
    if (stored === "no" || stored === "en") {
      setLanguageState(stored);
      document.documentElement.lang = stored === "no" ? "nb" : "en";
    }
  }, []);

  function setLanguage(next: Language) {
    setLanguageState(next);
    window.localStorage.setItem("pm-language", next);
    document.documentElement.lang = next === "no" ? "nb" : "en";
  }

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function T({ en, no }: { en: React.ReactNode; no: React.ReactNode }) {
  const { language } = useLanguage();
  return <>{language === "no" ? no : en}</>;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={className} role="group" aria-label="Language / Språk">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={language === "en" ? "language-option is-active" : "language-option"}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => setLanguage("no")}
        aria-pressed={language === "no"}
        className={language === "no" ? "language-option is-active" : "language-option"}
      >
        NO
      </button>
    </div>
  );
}
