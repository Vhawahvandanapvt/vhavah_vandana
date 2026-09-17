"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { languages } from "@/lib/translations";

export default function LanguageSwitcher({ isMobile }) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLang = languages.find((l) => l.code === locale) || languages[0];

  if (isMobile) {
    return (
      <div className="py-2 border-t border-border mt-2 pt-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
          Select Language
        </p>
        <div className="grid grid-cols-2 gap-2 px-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLocale(lang.code)}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                locale === lang.code
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/80 hover:bg-muted"
              }`}
            >
              <span>{lang.name}</span>
              {locale === lang.code && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-border"
        title="Change Language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden lg:inline-block w-6 text-center">{activeLang.name.substring(0,2)}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-80 overflow-y-auto p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  locale === lang.code
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span>{lang.name}</span>
                  <span className="text-[10px] text-muted-foreground">{lang.engName}</span>
                </div>
                {locale === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
