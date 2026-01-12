/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/layout/Header";
// import BottomNav, { bottomNavHeightClass } from "@/components/layout/BottomNav";
import { FiltersSheet } from "@/features/filters/components/FiltersSheet";
import { PlaceCard } from "@/features/listings/components/PlaceCard";
import { PlaceCardSkeleton } from "@/features/listings/components/PlaceCardSkeleton";
import { usePlaceCardsQuery } from "@/features/places/queries";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FiltersState } from "@/features/filters/components/FiltersSidebar";
import { useI18n } from "@/i18n/i18n";
import { Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HomeMobile() {
    const { t } = useI18n();
    const navigate = useNavigate();

    const [filters, setFilters] = useState<FiltersState>({
        district: "all",
        category: "all",
        budgetMax: 200000,
    });

    const query = usePlaceCardsQuery({
        district: filters.district,
        category: filters.category,
        budgetMax: filters.budgetMax,
    });

    const cards = query.data ?? [];
// options state (không phụ thuộc filter)
    const [districtOptions, setDistrictOptions] = useState<string[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

    // chỉ set options 1 lần khi lần đầu có data
    useEffect(() => {
        if (!query.data?.length) return;

        setDistrictOptions((prev) => {
            if (prev.length) return prev;
            const set = new Set<string>();
            query.data.forEach((c) => c.district && set.add(c.district));
            return Array.from(set).sort();
        });

        setCategoryOptions((prev) => {
            if (prev.length) return prev;
            const set = new Set<string>();
            query.data.forEach((c) => c.category && set.add(c.category));
            return Array.from(set).sort();
        });
    }, [query.data]);

    //  NOTE: FiltersSidebar cần mảng string[] -> truyền options cố định
    const districts = useMemo(() => districtOptions, [districtOptions]);
    const categories = useMemo(() => categoryOptions, [categoryOptions])

    const onReset = () =>
        setFilters({ district: "all", category: "all", budgetMax: 200000 });

    const onRandom = () => {
        if (!cards.length) return;
        const pick = cards[Math.floor(Math.random() * cards.length)];
        navigate(`/places/${pick.placeId}`);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 gradient-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-20 right-0 w-72 h-72 gradient-food rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <Header onRandom={onRandom} />

            {/* padding-bottom để BottomNav không che content */}
            <main className={`relative mx-auto max-w-md px-4 py-6 pb-24`}>
                {/* Header Section */}
                <div className="mb-6 animate-slide-up">
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-black text-gradient-food">{t("discover")}</h1>
                        <Sparkles className="h-6 w-6 text-pink-500 animate-pulse" />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-muted-foreground">
                            Khám phá ẩm thực Sài Gòn
                        </p>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs">
                                <TrendingUp className="h-3 w-3" />
                                {query.isLoading ? "…" : cards.length}
                            </Badge>

                            <FiltersSheet
                                value={filters}
                                onChange={setFilters}
                                districts={districts}
                                categories={categories}
                                onReset={onReset}
                            />
                        </div>
                    </div>
                </div>

                {query.isError ? (
                    <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive mb-4 animate-slide-up">
                        <div className="font-bold mb-1">⚠️ Lỗi load dữ liệu</div>
                        <div>{(query.error as any)?.message ?? "unknown"}</div>
                    </div>
                ) : null}

                <div className="grid grid-cols-1 gap-4">
                    {query.isLoading
                        ? Array.from({ length: 6 }).map((_, i) => <PlaceCardSkeleton key={i} />)
                        : cards.map((c) => <PlaceCard key={c.placeId} data={c} />)}
                </div>

                {/* Empty State */}
                {!query.isLoading && cards.length === 0 && (
                    <div className="text-center py-12 animate-slide-up">
                        <div className="text-5xl mb-3">🔍</div>
                        <h3 className="text-lg font-bold mb-1">Không tìm thấy kết quả</h3>
                        <p className="text-sm text-muted-foreground">Thử thay đổi bộ lọc</p>
                    </div>
                )}
            </main>

            {/* <BottomNav /> */}
        </div>
    );
}
