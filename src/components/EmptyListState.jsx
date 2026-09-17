"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function EmptyListState({
  icon = "🏛️",
  pageKey,
  fallbackText = "No items available yet.",
}) {
  const { t } = useLanguage();
  const text = t(`pages.${pageKey}.empty`) || fallbackText;

  return (
    <div className="text-center py-20">
      <span className="text-5xl mb-4 block">{icon}</span>
      <p className="text-gray-500">{text}</p>
    </div>
  );
}
