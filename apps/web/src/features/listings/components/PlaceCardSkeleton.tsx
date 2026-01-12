import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PlaceCardSkeleton() {
  return (
    <Card className="overflow-hidden border-2 animate-pulse">
      {/* Gradient Accent Bar */}
      <div className="h-1.5 bg-gradient-to-r from-violet-200 to-purple-200 dark:from-violet-800 dark:to-purple-800" />

      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-3 flex-1">
            {/* Title */}
            <Skeleton className="h-7 w-3/4 animate-shimmer" />
            {/* Dish info */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </div>
          {/* Button */}
          <Skeleton className="h-9 w-28 rounded-md shrink-0" />
        </div>

        {/* Info Grid */}
        <div className="space-y-3 pt-4 border-t">
          {/* Location */}
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
            <Skeleton className="h-5 w-1/4" />
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
