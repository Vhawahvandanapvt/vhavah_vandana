"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function ListingPageHero({
  pageKey,
  gradient = "from-ganga-600 to-ganga-800",
  badgeColor = "text-ganga-200",
  descColor = "text-ganga-100",
  fallbackBadge = "",
  fallbackTitle = "",
  fallbackDesc = "",
}) {
  const { t } = useLanguage();

  const badge = t(`pages.${pageKey}.badge`) || fallbackBadge;
  const title = t(`pages.${pageKey}.title`) || fallbackTitle;
  const desc = t(`pages.${pageKey}.desc`) || fallbackDesc;

  return (
    <section className={`bg-gradient-to-r ${gradient} text-white py-16`}>
      <div className="max-w-7xl mx-auto px-4">
        {badge && (
          <span className={`text-sm font-medium ${badgeColor} uppercase tracking-wider`}>
            {badge}
          </span>
        )}
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2 mb-4">
          {title}
        </h1>
        {desc && (
          <p className={`text-lg ${descColor} max-w-2xl`}>
            {desc}
          </p>
        )}
      </div>
    </section>
  );
}
