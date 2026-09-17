"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const savedLocale = localStorage.getItem("preferredLanguage");
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
      document.documentElement.lang = savedLocale;
    }
    setIsLoaded(true);
  }, []);

  const changeLanguage = (newLocale) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
      localStorage.setItem("preferredLanguage", newLocale);
      document.documentElement.lang = newLocale;
      // Optional: set cookie for SSR if needed later
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    }
  };

  // Helper function to resolve dot-notation paths (e.g., "hero.title1")
  const t = (path) => {
    const keys = path.split(".");
    let value = translations[locale];
    for (const key of keys) {
      if (value === undefined) break;
      value = value[key];
    }
    // Fallback to English if translation is missing
    if (value === undefined && locale !== "en") {
      let fallbackValue = translations["en"];
      for (const key of keys) {
        if (fallbackValue === undefined) break;
        fallbackValue = fallbackValue[key];
      }
      return fallbackValue || path;
    }
    return value || path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
