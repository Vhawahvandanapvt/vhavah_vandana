"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Flame } from "lucide-react";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";

const getNavLinks = (t) => [
  { href: "/ghats", label: t("nav.ghats") },
  { href: "/puja-festivals", label: t("nav.puja") },
  { href: "/marriage-celebrations", label: t("nav.marriage") },
  { href: "/puja-samagri", label: t("nav.samagri") },
  { href: "/panditjis", label: t("nav.pandit") },
];

export default function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const navLinks = getNavLinks(t);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "glass shadow-sm border-border"
            : "bg-background/80 backdrop-blur-md border-transparent"
        }`}
      >
        {/* Top Bar */}
        <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}`}>
          <div className="bg-primary text-primary-foreground text-xs py-1.5">
            <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
              <span className="flex items-center gap-3 font-medium tracking-widest uppercase text-[11px] sm:text-xs">
                <Flame className="w-3.5 h-3.5 text-saffron-200" /> 
                हर हर महादेव | Har Har Mahadev 
                <Flame className="w-3.5 h-3.5 text-saffron-200" />
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 overflow-hidden ring-2 ring-primary/10">
                <Image 
                  src="/logo.jpeg" 
                  alt="Vhavah Vandana Logo" 
                  width={150}
                  height={150}
                  quality={100}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-heading text-xl font-bold leading-none tracking-tight text-gray-900 group-hover:text-primary transition-colors">
                  Vhawah Vandana
                </h1>
                <p className="text-[10px] font-medium tracking-widest uppercase text-gray-500 mt-0.5">
                  Spiritual Services
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher isMobile={false} />

              <LoginButton />

              <Button
                asChild
                className="hidden sm:flex rounded-full px-6 shadow-sm hover:shadow-md transition-all"
              >
                <Link href="/booking">{t("nav.bookNow")}</Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-foreground/80 hover:text-primary hover:bg-primary/5"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-[500px] opacity-100 border-t border-border" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background px-4 py-4 space-y-1 shadow-inner flex flex-col h-full overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-foreground/80 font-medium hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Button asChild className="w-full rounded-lg">
                <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>{t("nav.bookNow")}</Link>
              </Button>
            </div>
            <LanguageSwitcher isMobile={true} />
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </>
  );
}
