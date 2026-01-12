/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/layout/Header";
import { FiltersSidebar, type FiltersState } from "@/features/filters/components/FiltersSidebar";
import { PlaceCard } from "@/features/listings/components/PlaceCard";
import { PlaceCardSkeleton } from "@/features/listings/components/PlaceCardSkeleton";
import { usePlaceCardsQuery } from "@/features/places/queries";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp } from "lucide-react";

export default function HomeDesktop() {
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
        <div className="min-h-max bg-background relative overflow-x-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 gradient-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 gradient-food rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 gradient-warm rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

            <Header onRandom={onRandom} />

            <main className="relative mx-auto max-w-7xl px-6 py-8">
                <div className="grid grid-cols-12 gap-8">
                    <aside className="col-span-12 lg:col-span-3">
                        <FiltersSidebar
                            value={filters}
                            onChange={setFilters}
                            districts={districts}
                            categories={categories}
                            onReset={onReset}
                        />
                    </aside>

                    <section className="col-span-12 lg:col-span-9">
                        {/* Header Section */}
                        <div className="mb-8 animate-slide-up">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-black text-gradient-food">
                                    {t("recommended")}
                                </h1>
                                <Sparkles className="h-8 w-8 text-pink-500 animate-pulse" />
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                                <p className="text-muted-foreground">
                                    Khám phá những địa điểm ẩm thực tuyệt vời tại Sài Gòn
                                </p>

                                <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                                    <TrendingUp className="h-3.5 w-3.5" />
                                    {query.isLoading ? "…" : `${cards.length} ${t("results")}`}
                                </Badge>
                            </div>
                        </div>

                        {query.isError ? (
                            <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-6 text-sm text-destructive animate-slide-up">
                                <div className="font-bold mb-1">⚠️ Lỗi load dữ liệu</div>
                                <div>{(query.error as any)?.message ?? "unknown"}</div>
                            </div>
                        ) : null}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {query.isLoading
                                ? Array.from({ length: 6 }).map((_, i) => <PlaceCardSkeleton key={i} />)
                                : cards.map((c) => <PlaceCard key={c.placeId} data={c} />)}
                        </div>

                        {/* Empty State */}
                        {!query.isLoading && cards.length === 0 && (
                            <div className="text-center py-16 animate-slide-up">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold mb-2">Không tìm thấy kết quả</h3>
                                <p className="text-muted-foreground">Thử thay đổi bộ lọc để xem thêm địa điểm</p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
