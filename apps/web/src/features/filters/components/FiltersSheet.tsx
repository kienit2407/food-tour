import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FiltersSidebar, type FiltersState } from "./FiltersSidebar";
import { useI18n } from "@/i18n/i18n";
import { SlidersHorizontal } from "lucide-react";

export function FiltersSheet({
    value,
    onChange,
    districts,
    categories,
    onReset,
}: {
    value: FiltersState;
    onChange: (next: FiltersState) => void;
    districts: string[];
    categories: string[];
    onReset: () => void;
}) {
    const { t } = useI18n();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-2 hover:border-violet-300 hover-lift font-bold gap-2"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    {t("filters")}
                </Button>
            </SheetTrigger>

            {/* ✅ max height + flex-col để header không bị scroll chung */}
            <SheetContent
                side="bottom"
                className="p-0 rounded-t-3xl border-t-4 border-violet-500 max-h-[85vh] flex flex-col
    bg-white text-black"
            >
                <div className="h-1.5 gradient-accent" />

                <SheetHeader className="p-6 pb-4 shrink-0">
                    <SheetTitle className="text-xl font-black text-gradient flex items-center gap-2">
                        🎯 {t("filters")}
                    </SheetTitle>
                </SheetHeader>

                {/* ✅ phần này mới scroll */}
                <div className="px-6 pb-[calc(env(safe-area-inset-bottom)+24px)] overflow-y-auto">
                    <FiltersSidebar
                        variant="sheet"   // ✅ QUAN TRỌNG
                        value={value}
                        onChange={onChange}
                        districts={districts}
                        categories={categories}
                        onReset={onReset}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}
