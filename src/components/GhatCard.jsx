"use client";

import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function GhatCard({ ghat }) {
  const { t, locale } = useLanguage();
  const isHindi = locale === "hi";
  const primaryName = isHindi && ghat.name?.hi ? ghat.name.hi : (ghat.name?.en || ghat.name || "Unnamed Ghat");
  const secondaryName = isHindi && ghat.name?.en ? ghat.name.en : (!isHindi && ghat.name?.hi ? ghat.name.hi : null);
  const image = ghat.images?.[0]?.url || "https://placehold.co/600x400/FFFEFB/E8820F?text=Ghat";

  return (
    <Link href={`/ghats/${ghat.slug}`} className="block group">
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl rounded-2xl transition-all duration-300 group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={primaryName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {ghat.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600 border-none shadow-md">
              {t("cards.featured") || "Featured"}
            </Badge>
          )}
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-background/95 text-foreground shadow-sm font-semibold">
              {formatPrice(ghat.price)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5">
          <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {primaryName}
          </h3>
          {secondaryName && (
            <p className="text-xs text-primary mb-2 font-medium">{secondaryName}</p>
          )}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {ghat.shortDescription || ghat.description?.substring(0, 100)}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <Rating rating={ghat.rating} count={ghat.reviewsCount} size="xs" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Users className="w-3.5 h-3.5" />
              {ghat.capacity}+ {t("cards.capacity") || "capacity"}
            </div>
          </div>

          {ghat.suitableFor?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {ghat.suitableFor.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] font-medium text-muted-foreground bg-muted/50 border-border/50">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
