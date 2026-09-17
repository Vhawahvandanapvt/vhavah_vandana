"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function CustomWeddingCta() {
  const { t } = useLanguage();

  const title = t("pages.marriage.customTitle") || "Need a Custom Package?";
  const desc =
    t("pages.marriage.customDesc") ||
    "Every wedding is unique. Share your requirements and we'll create a customized package just for you.";
  const btn = t("pages.marriage.customBtn") || "💬 Request Custom Quote";

  return (
    <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-maroon-50 to-cream-100 border border-maroon-100 text-center">
      <h3 className="font-heading text-2xl font-bold text-maroon-800 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
        {desc}
      </p>
      <a
        href="https://wa.me/916206687491?text=Namaste!%20I%20would%20like%20a%20custom%20wedding%20package%20in%20Varanasi."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-maroon-600 to-maroon-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {btn}
      </a>
    </div>
  );
}
