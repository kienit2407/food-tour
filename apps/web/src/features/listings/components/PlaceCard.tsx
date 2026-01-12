import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n";
import { formatVND } from "@/lib/format";
import { MapPin, Utensils, Wallet, Clock, ArrowRight } from "lucide-react";
import type { PlaceCardModel } from "@/features/places/types";
import { Link } from "react-router-dom";

function priceText(p: PlaceCardModel) {
  if (p.priceRaw) return p.priceRaw;
  if (p.priceMin != null && p.priceMax != null) return `${formatVND(p.priceMin)} – ${formatVND(p.priceMax)}`;
  if (p.priceMin != null) return `Từ ${formatVND(p.priceMin)}`;
  if (p.priceMax != null) return `Đến ${formatVND(p.priceMax)}`;
  return "—";
}

export function PlaceCard({ data }: { data: PlaceCardModel }) {
  const { t } = useI18n();

  return (
    <Card className="group hover-lift overflow-hidden border-2 hover:border-violet-200 transition-all duration-300 animate-slide-up">
      {/* Gradient Accent Bar */}
      <div className="h-1.5 gradient-accent" />

      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            {/* Place Name with Gradient on Hover */}
            <h3 className="text-xl font-black truncate mb-2 group-hover:text-gradient-food transition-all">
              {data.placeName}
            </h3>

            {/* Dish Info */}
            {data.dishName ? (
              <div className="flex items-center gap-2 text-sm">
                <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <Utensils className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-foreground">{data.dishName}</span>
                  {data.category && (
                    <span className="text-muted-foreground ml-2">• {data.category}</span>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">—</span>
            )}
          </div>

          {/* View Detail Button */}
          <Button
            asChild
            size="sm"
            className="gradient-accent hover:shadow-glow shrink-0 font-semibold group/btn text-white"
          >
            <Link to={`/places/${data.placeId}`} className="flex items-center gap-1">
              {t("view_detail")}
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform text-white" />
            </Link>
          </Button>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 pt-4 border-t">
          {/* Location */}
          <div className="flex items-start gap-3 text-sm group/item">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 shrink-0">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 pt-1">
              <div className="font-semibold text-foreground truncate">
                {data.district ?? "—"}
              </div>
              {data.fullAddress && (
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {data.fullAddress}
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-bold text-foreground pt-0.5">{priceText(data)}</span>
          </div>

          {/* Opening Hours */}
          {data.openHoursRaw && (
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-muted-foreground truncate pt-0.5">{data.openHoursRaw}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
