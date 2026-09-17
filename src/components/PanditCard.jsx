"use client";

import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function PanditCard({ pandit }) {
  const { t } = useLanguage();

  const getAvailabilityText = (status) => {
    if (status === "available") return t("cards.available") || "Available";
    if (status === "busy") return t("cards.busy") || "Busy";
    return t("cards.unavailable") || "Unavailable";
  };

  return (
    <Link href={`/panditjis/${pandit.slug}`} className="block group">
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl rounded-2xl transition-all duration-300 group-hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            {/* Profile Image */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 ring-1 ring-gray-200 group-hover:ring-primary/30 transition-all">
              <Image
                src={pandit.profileImage || "https://placehold.co/400x400/FFFEFB/E8820F?text=Pandit+Ji"}
                alt={pandit.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                {pandit.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Rating rating={pandit.rating} count={pandit.reviewsCount} size="xs" />
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {pandit.experience}+ {t("cards.years") || "years"}
                </span>
                <Badge 
                  variant={pandit.availability === "available" ? "default" : pandit.availability === "busy" ? "secondary" : "destructive"} 
                  className={`text-[10px] uppercase tracking-wider ${
                    pandit.availability === "available" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                    pandit.availability === "busy" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : ""
                  }`}
                >
                  {getAvailabilityText(pandit.availability)}
                </Badge>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mt-4 leading-relaxed">
            {pandit.shortBio || pandit.bio?.substring(0, 100)}
          </p>

          {/* Specializations */}
          {pandit.specializations?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {pandit.specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} variant="outline" className="text-[10px] font-medium text-muted-foreground bg-muted/50 border-border/50">
                  {spec}
                </Badge>
              ))}
              {pandit.specializations.length > 3 && (
                <Badge variant="outline" className="text-[10px] text-gray-500 border-dashed">
                  +{pandit.specializations.length - 3} {t("cards.more") || "more"}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        {/* Languages & Price */}
        <CardFooter className="p-4 bg-muted/30 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <MessageCircle className="w-3.5 h-3.5" />
            {pandit.languages?.join(", ")}
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">{formatPrice(pandit.price)}</span>
            {pandit.priceNote && (
              <span className="block text-[10px] text-muted-foreground font-medium">{pandit.priceNote}</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
