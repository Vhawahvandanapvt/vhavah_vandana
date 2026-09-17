"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProductCard({ product }) {
  const { t } = useLanguage();
  const image = product.images?.[0]?.url || "https://placehold.co/600x400/FFFEFB/E8820F?text=Product";

  const getStockLabel = () => {
    if (product.stock > 10) return t("cards.inStock") || "In Stock";
    if (product.stock > 0) {
      const template = t("cards.onlyLeft") || "Only {n} left";
      return template.replace("{n}", product.stock);
    }
    return t("cards.outOfStock") || "Out of Stock";
  };

  return (
    <Link href={`/puja-samagri/${product.slug}`} className="block group">
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl rounded-2xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Sale Type Badge */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {(product.saleType === "rent" || product.saleType === "both") && (
              <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-sm text-[10px] uppercase">
                {t("cards.rent") || "Rent"}
              </Badge>
            )}
            {(product.saleType === "buy" || product.saleType === "both") && (
              <Badge variant="default" className="shadow-sm text-[10px] uppercase">
                {t("cards.buy") || "Buy"}
              </Badge>
            )}
          </div>

          {product.isConsumable && (
            <Badge variant="secondary" className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white border-none shadow-sm text-[10px]">
              {t("cards.consumable") || "Consumable"}
            </Badge>
          )}
        </div>

        <CardContent className="p-4 flex flex-col flex-1">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
            {product.category}
          </span>
          <h3 className="font-heading text-base font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
            {product.shortDescription || product.description?.substring(0, 80)}
          </p>

          <div className="flex items-end justify-between mt-auto">
            <div>
              {product.saleType === "both" ? (
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground font-medium">
                    {t("cards.buy") || "Buy"}: <span className="font-bold text-gray-900">{formatPrice(product.buyPrice)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {t("cards.rent") || "Rent"}: <span className="font-bold text-gray-900">{formatPrice(product.rentPrice)}</span>
                  </div>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.saleType === "rent" ? product.rentPrice : product.buyPrice || product.price)}
                </span>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-1.5">
              <Badge 
                variant={product.stock > 10 ? "outline" : product.stock > 0 ? "secondary" : "destructive"} 
                className={`text-[10px] font-medium ${
                  product.stock > 10 ? "bg-green-50 text-green-700 border-green-200" : 
                  product.stock > 0 ? "bg-amber-50 text-amber-700" : ""
                }`}
              >
                {getStockLabel()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
