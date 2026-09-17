"use client";

import Link from "next/link";
import Image from "next/image";
import { Landmark, Sparkles, Heart, Package, UserCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

const CATEGORIES = [
  {
    icon: Landmark,
    title: "Ghat Booking",
    description: "Book sacred ghats for puja ceremonies and rituals",
    href: "/ghats",
    image: "/images/categories/ghat-booking.jpg",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-200/50",
  },
  {
    icon: Sparkles,
    title: "Puja & Festivals",
    description: "Sacred pujas, havans, and festival ceremonies",
    href: "/puja-festivals",
    image: "/images/categories/puja-festivals.jpg",
    gradient: "from-orange-400 to-amber-500",
    shadow: "shadow-orange-200/50",
  },
  {
    icon: Heart,
    title: "Marriage & Celebrations",
    description: "Traditional weddings and celebration ceremonies",
    href: "/marriage-celebrations",
    image: "/images/categories/marriage-celebrations.jpg",
    gradient: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-200/50",
  },
  {
    icon: Package,
    title: "Puja Samagri",
    description: "Buy or rent authentic puja items and materials",
    href: "/puja-samagri",
    image: "/images/categories/puja-samagri.jpg",
    gradient: "from-amber-500 to-yellow-600",
    shadow: "shadow-amber-200/50",
  },
  {
    icon: UserCircle2,
    title: "Book Pandit Ji",
    description: "Experienced Vedic pandits for all ceremonies",
    href: "/panditjis",
    image: "/images/categories/panditjis.jpg",
    gradient: "from-primary to-primary/80",
    shadow: "shadow-orange-200/50",
  },
];

export default function CategoryCard({ index }) {
  const { t } = useLanguage();
  const cat = CATEGORIES[index] || CATEGORIES[0];
  const translatedTitle = t(`categories.items.${index}.title`);
  const translatedDesc = t(`categories.items.${index}.description`);

  return (
    <Link href={cat.href} className="block group h-full">
      <Card className="relative overflow-hidden border-border/50 shadow-sm hover:shadow-xl rounded-2xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <CardContent className="p-6 flex flex-col flex-1 bg-background z-10 relative">
          <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {translatedTitle}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {translatedDesc}
          </p>
          
          <div className="mt-auto flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
            {t("categories.explore")}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export { CATEGORIES };
