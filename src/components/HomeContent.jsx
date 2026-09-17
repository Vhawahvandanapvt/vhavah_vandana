"use client";

import Link from "next/link";
import Image from "next/image";
import CategoryCard from "@/components/CategoryCard";
import GhatCard from "@/components/GhatCard";
import ServiceCard from "@/components/ServiceCard";
import PanditCard from "@/components/PanditCard";
import ProductCard from "@/components/ProductCard";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { Search, FileText, Send, Heart, CheckCircle, MapPin, HandCoins, ShieldCheck, Smartphone, Settings, Star, UserCircle2 } from "lucide-react";

export default function HomeContent({ ghats, services, pandits, products, reviews }) {
  const { t } = useLanguage();

  const getHowItWorks = () => [
    { icon: Search, title: t("howItWorks.steps.0.title"), desc: t("howItWorks.steps.0.desc") },
    { icon: FileText, title: t("howItWorks.steps.1.title"), desc: t("howItWorks.steps.1.desc") },
    { icon: Send, title: t("howItWorks.steps.2.title"), desc: t("howItWorks.steps.2.desc") },
    { icon: Heart, title: t("howItWorks.steps.3.title"), desc: t("howItWorks.steps.3.desc") },
  ];

  const getWhyChoose = () => [
    { icon: CheckCircle, title: t("whyChoose.items.0.title"), desc: t("whyChoose.items.0.desc") },
    { icon: MapPin, title: t("whyChoose.items.1.title"), desc: t("whyChoose.items.1.desc") },
    { icon: HandCoins, title: t("whyChoose.items.2.title"), desc: t("whyChoose.items.2.desc") },
    { icon: ShieldCheck, title: t("whyChoose.items.3.title"), desc: t("whyChoose.items.3.desc") },
    { icon: Smartphone, title: t("whyChoose.items.4.title"), desc: t("whyChoose.items.4.desc") },
    { icon: Settings, title: t("whyChoose.items.5.title"), desc: t("whyChoose.items.5.desc") },
  ];

  const getFaqs = () => [
    { q: t("faq.items.0.q"), a: t("faq.items.0.a") },
    { q: t("faq.items.1.q"), a: t("faq.items.1.a") },
    { q: t("faq.items.2.q"), a: t("faq.items.2.a") },
    { q: t("faq.items.3.q"), a: t("faq.items.3.a") },
    { q: t("faq.items.4.q"), a: t("faq.items.4.a") },
    { q: t("faq.items.5.q"), a: t("faq.items.5.a") },
  ];

  return (
    <main>
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-[#14110F]">
        <div className="absolute inset-0">
          <Image
            src="/hero-varanasi.jpg"
            alt="Varanasi Ganga Aarti"
            fill
            className="object-cover opacity-90"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#14110F]/40" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-6 border border-primary/20 backdrop-blur-md">
              {t("hero.badge")}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-playfair mb-6 tracking-tight text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
            {t("hero.title1")} <br />
            <span className="text-primary italic">{t("hero.title2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500 fill-mode-both">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8 text-base h-14 shadow-[0_0_30px_-5px_rgba(232,130,15,0.4)] hover:shadow-[0_0_40px_-5px_rgba(232,130,15,0.6)] hover:-translate-y-1 transition-all duration-300">
              <Link href="/booking">{t("hero.cta1")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 text-base h-14 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30 backdrop-blur-md hover:-translate-y-1 transition-all duration-300">
              <Link href="/ghats">{t("hero.cta2")}</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-12 mt-12 md:mt-16 animate-in fade-in duration-1000 delay-700 fill-mode-both">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">500+</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{t("hero.stat1Label")}</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">50+</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{t("hero.stat2Label")}</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">4.8</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium flex items-center justify-center gap-1">
                {t("hero.stat3Label")} <Star className="w-3 h-3 text-primary fill-primary" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CATEGORIES ===== */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("categories.sectionBadge")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
              {t("categories.sectionTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("categories.sectionDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <CategoryCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ===== SECTION 4: POPULAR GHATS ===== */}
      {ghats.length > 0 && (
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("ghatsSection.badge")}</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                  {t("ghatsSection.title")}
                </h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 hover:bg-primary/5">
                <Link href="/ghats">{t("ghatsSection.viewAll")}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ghats.map((ghat) => (
                <GhatCard key={ghat._id} ghat={ghat} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 5: PUJA & FESTIVALS ===== */}
      {services.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("servicesSection.badge")}</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                  {t("servicesSection.title")}
                </h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 hover:bg-primary/5">
                <Link href="/puja-festivals">{t("servicesSection.viewAll")}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SectionDivider />

      {/* ===== SECTION 6: FEATURED PANDITS ===== */}
      {pandits.length > 0 && (
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("panditsSection.badge")}</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                  {t("panditsSection.title")}
                </h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 hover:bg-primary/5">
                <Link href="/panditjis">{t("panditsSection.viewAll")}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pandits.map((pandit) => (
                <PanditCard key={pandit._id} pandit={pandit} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 7: PUJA SAMAGRI ===== */}
      {products.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("productsSection.badge")}</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                  {t("productsSection.title")}
                </h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 hover:bg-primary/5">
                <Link href="/puja-samagri">{t("productsSection.viewAll")}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SectionDivider />

      {/* ===== SECTION 8: HOW IT WORKS ===== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("howItWorks.badge")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
              {t("howItWorks.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {getHowItWorks().map((step, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-md transition-all">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-10 -mt-2 w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center shadow-md ring-4 ring-white">
                  {i + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: WHY CHOOSE US ===== */}
      <section className="py-16 md:py-24 bg-[#14110F] text-white border-t border-[#3A2A20]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("whyChoose.badge")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              {t("whyChoose.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {getWhyChoose().map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="font-heading text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-[#FFFEFB]/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 11: TESTIMONIALS ===== */}
      {reviews.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("testimonials.badge")}</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
                {t("testimonials.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review._id} className="p-8 rounded-3xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-8 italic">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <UserCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{review.customerName}</p>
                      <p className="text-xs text-primary font-medium uppercase tracking-wider mt-0.5">
                        {review.entityType === "pandit" ? t("testimonials.panditService") : t("testimonials.ghatExperience")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 12: FAQ ===== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("faq.badge")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
              {t("faq.title")}
            </h2>
          </div>

          <div className="space-y-4">
            {getFaqs().map((faq, i) => (
              <details key={i} className="group bg-muted/50 rounded-2xl border border-border/50 overflow-hidden">
                <summary className="flex items-center justify-between px-8 py-5 cursor-pointer list-none font-heading font-semibold text-gray-900 hover:text-primary transition-colors">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm shrink-0 group-open:-rotate-180 transition-transform duration-300">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-8 pb-6 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
