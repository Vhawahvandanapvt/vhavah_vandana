"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ServiceCard({ service }) {
  const { t } = useLanguage();
  const image = service.images?.[0]?.url || "https://placehold.co/600x400/FFFEFB/E8820F?text=Service";
  const href = service.category === "marriage-celebration"
    ? `/marriage-celebrations/${service.slug}`
    : `/puja-festivals/${service.slug}`;

  const categoryLabel = service.category === "marriage-celebration"
    ? (t("cards.marriage") || "Marriage")
    : (t("cards.puja") || "Puja");

  return (
    <Link href={href} className="block group">
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl rounded-2xl transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {service.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600 border-none shadow-md">
              {t("cards.featured") || "Featured"}
            </Badge>
          )}
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-primary/90 hover:bg-primary text-primary-foreground border-none backdrop-blur-sm"
          >
            {categoryLabel}
          </Badge>
        </div>

        <CardContent className="p-5">
          <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
            {service.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {service.shortDescription || service.description?.substring(0, 100)}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-lg font-bold text-gray-900">{formatPrice(service.price)}</span>
              {service.priceNote && (
                <span className="text-[10px] text-muted-foreground ml-1.5 font-medium">{service.priceNote}</span>
              )}
            </div>
            {service.duration && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                {service.duration}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
