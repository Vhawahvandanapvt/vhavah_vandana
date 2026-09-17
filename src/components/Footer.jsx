"use client";

import Link from "next/link";
import { Flame, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const getFooterLinks = (t) => ({
  services: [
    { href: "/ghats", label: t("categories.items.0.title") },
    { href: "/puja-festivals", label: t("categories.items.1.title") },
    { href: "/marriage-celebrations", label: t("categories.items.2.title") },
    { href: "/puja-samagri", label: t("categories.items.3.title") },
    { href: "/panditjis", label: t("categories.items.4.title") },
  ],
  popular: [
    { href: "/puja-festivals/ganga-aarti-ceremony", label: "Ganga Aarti" },
    { href: "/puja-festivals/rudrabhishek-puja", label: "Rudrabhishek" },
    { href: "/puja-festivals/satyanarayan-katha", label: "Satyanarayan Katha" },
    { href: "/ghats/dashashwamedh-ghat", label: "Dashashwamedh Ghat" },
    { href: "/ghats/assi-ghat", label: "Assi Ghat" },
  ],
  company: [
    { href: "/booking", label: t("footer.bookService") },
    { href: "/admin/login", label: t("footer.adminLogin") },
  ],
});

export default function Footer() {
  const { t } = useLanguage();
  const footerLinks = getFooterLinks(t);

  return (
    <footer className="bg-[#2D231F] text-[#FFFEFB]/80">
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white/20 shadow-lg">
                <Image 
                  src="/logo.jpeg" 
                  alt="Vhavah Vandana Logo" 
                  width={150}
                  height={150}
                  quality={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white leading-tight">Vhavah Vandana</h3>
                <p className="text-[10px] tracking-widest uppercase text-gray-500 mt-0.5">Spiritual Services</p>
              </div>
            </div>
            <p className="text-sm text-[#FFFEFB]/60 leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            {/* WhatsApp Contact */}
            <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-white rounded-full">
              <a
                href="https://wa.me/916206687491?text=Namaste!%20I%20would%20like%20to%20know%20more%20about%20Kashi%20Vandana%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("footer.chatWhatsapp")}
              </a>
            </Button>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">{t("footer.ourServices")}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#FFFEFB]/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">{t("footer.popularServices")}</h4>
            <ul className="space-y-3">
              {footerLinks.popular.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#FFFEFB]/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">{t("footer.contactUs")}</h4>
            <div className="space-y-4 text-sm text-[#FFFEFB]/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="whitespace-pre-line">{t("footer.address")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+916206687491" className="hover:text-white transition-colors">+91 62066 87491</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@vhavahvandana.com" className="hover:text-white transition-colors">info@vhavahvandana.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{t("footer.hours")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-sm text-[#FFFEFB]/50">
              © {new Date().getFullYear()} Vhavah Vandana. {t("footer.copyright")} <span className="ml-2 italic text-[#FFFEFB]/40 block sm:inline mt-1 sm:mt-0">{t("footer.harHarMahadev")}</span>
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-sm text-[#FFFEFB]/50">
              {footerLinks.company.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
