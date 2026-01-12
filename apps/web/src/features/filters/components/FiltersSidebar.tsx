import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n";
import { formatVND } from "@/lib/format";
import { Label } from "@/components/ui/label";
import { MapPin, Utensils, Wallet, RotateCcw } from "lucide-react";

export type FiltersState = {
  district: string;   // "all" | ...
  category: string;   // "all" | ...
  budgetMax: number;  // VNĐ
};

export function FiltersSidebar({
  value,
  onChange,
  districts,
  categories,
  onReset,
  variant = "sidebar", // ✅ NEW
}: {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  districts: string[];
  categories: string[];
  onReset: () => void;
  variant?: "sidebar" | "sheet"; // ✅ NEW
}) {
  const { t } = useI18n();

  const Fields = (
    <div className="space-y-6">
      {/* District Filter */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-bold">
          <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/20">
            <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          {t("district")}
        </Label>

        <Select value={value.district} onValueChange={(v) => onChange({ ...value, district: v })}>
          <SelectTrigger className="border-2 hover:border-violet-300 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-semibold">
              ✨ {t("all")}
            </SelectItem>
            {districts.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-bold">
          <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/20">
            <Utensils className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
          </div>
          {t("category")}
        </Label>

        <Select value={value.category} onValueChange={(v) => onChange({ ...value, category: v })}>
          <SelectTrigger className="border-2 hover:border-violet-300 transition-colors">
            <SelectValue placeholder={t("all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-semibold">
              ✨ {t("all")}
            </SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-sm font-bold">
            <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/20">
              <Wallet className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            </div>
            {t("budget")}
          </Label>

          <span className="text-sm font-black text-gradient-warm px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20">
            {formatVND(value.budgetMax)}
          </span>
        </div>

        <Slider
          value={[value.budgetMax]}
          onValueChange={([v]) => onChange({ ...value, budgetMax: v })}
          min={20000}
          max={500000}
          step={10000}
          className="py-2"
        />

        <div className="flex justify-between text-[11px] text-muted-foreground font-semibold">
          <span>{formatVND(20000)}</span>
          <span>{formatVND(500000)}+</span>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full border-2 hover:border-violet-300 hover-lift font-bold gap-2"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4" />
        {t("reset")}
      </Button>
    </div>
  );

  // ✅ Mobile Sheet: KHÔNG Card, KHÔNG sticky, KHÔNG title lặp
  if (variant === "sheet") {
    return <div className="space-y-6">{Fields}</div>;
  }

  // ✅ Desktop Sidebar: giữ nguyên UI đẹp + sticky
  return (
    <Card className="sticky top-24 border-2 hover:border-violet-200 transition-all duration-300 overflow-hidden">
      <div className="h-1.5 gradient-accent" />
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-black text-gradient flex items-center gap-2">
          🎯 {t("filters")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{Fields}</CardContent>
    </Card>
  );
}
