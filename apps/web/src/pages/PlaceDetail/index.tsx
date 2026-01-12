/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/i18n";
import { formatVND } from "@/lib/format";
import { ArrowLeft, Clock, MapPin, ExternalLink, Utensils, Info, Star, Sparkles } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePlaceItemsQuery, usePlaceQuery } from "@/features/places/queries";
import { Skeleton } from "@/components/ui/skeleton";

function itemPriceText(it: {
    price_raw: string | null;
    price_min: number | null;
    price_max: number | null;
}) {
    if (it.price_raw) return it.price_raw;
    if (it.price_min != null && it.price_max != null) return `${formatVND(it.price_min)} – ${formatVND(it.price_max)}`;
    if (it.price_min != null) return `Từ ${formatVND(it.price_min)}`;
    if (it.price_max != null) return `Đến ${formatVND(it.price_max)}`;
    return "—";
}

export default function PlaceDetailPage() {
    const { t } = useI18n();
    const nav = useNavigate();
    const { id } = useParams();

    const placeId = id ?? "";

    const placeQ = usePlaceQuery(placeId);
    const itemsQ = usePlaceItemsQuery(placeId);

    const place = placeQ.data;
    const items = itemsQ.data ?? [];

    // Group items by category
    const categories = Array.from(new Set(items.map(it => it.category).filter(Boolean)));

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 gradient-food rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 gradient-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <Header />

            <main className="relative mx-auto max-w-5xl px-4 md:px-6 py-6 pb-12">
                {/* Navigation */}
                <div className="mb-6 flex items-center justify-between gap-3 animate-slide-up">
                    <Button
                        variant="outline"
                        onClick={() => nav(-1)}
                        className="hover-lift border-2 font-semibold border-[#D16BA1] text-[#D16BA1]"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t("back")}
                    </Button>

                    {place?.maps_url && (
                        <Button
                            asChild
                            className="gradient-accent hover:shadow-glow font-semibold text-white"
                        >
                            <a href={place.maps_url} target="_blank" rel="noreferrer">
                                <MapPin className="mr-2 h-4 w-4" />
                                {t("map")}
                            </a>
                        </Button>
                    )}
                </div>

                {/* HERO SECTION */}
                <Card className="mb-6 overflow-hidden border-2 hover:border-violet-200 transition-all animate-slide-up">
                    {/* Gradient Header */}
                    <div className="h-2 gradient-food" />

                    <CardContent className="p-6 md:p-8">
                        {placeQ.isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-2/3" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-3/4" />
                            </div>
                        ) : placeQ.isError ? (
                            <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-6 text-sm text-destructive">
                                <div className="font-bold mb-1">⚠️ Lỗi load dữ liệu</div>
                                <div>{(placeQ.error as any)?.message ?? "unknown"}</div>
                            </div>
                        ) : (
                            <>
                                {/* Place Name */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h1 className="text-3xl md:text-4xl font-black text-gradient-food flex items-center gap-3">
                                        {place?.name ?? "—"}
                                        <Sparkles className="h-8 w-8 text-pink-500 animate-pulse" />
                                    </h1>
                                    <Badge className="gradient-warm text-white font-bold px-3 py-1 shrink-0">
                                        <Star className="h-3 w-3 mr-1" />
                                        Featured
                                    </Badge>
                                </div>

                                {/* Location & Hours */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-100 dark:border-blue-900/20">
                                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 shrink-0">
                                            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-sm text-blue-900 dark:text-blue-100 mb-1">
                                                Địa chỉ
                                            </div>
                                            <div className="text-sm text-blue-700 dark:text-blue-300">
                                                {place?.district ?? "—"}
                                            </div>
                                            {place?.full_address && (
                                                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                                    {place.full_address}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {place?.open_hours_raw && (
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border-2 border-purple-100 dark:border-purple-900/20">
                                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 shrink-0">
                                                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-sm text-purple-900 dark:text-purple-100 mb-1">
                                                    {t("open_hours_label")}
                                                </div>
                                                <div className="text-sm text-purple-700 dark:text-purple-300">
                                                    {place.open_hours_raw}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Notes */}
                                {place?.notes && (
                                    <div className="mt-6 p-5 rounded-xl bg-linear-to-br from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 border-2 border-orange-100 dark:border-orange-900/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                                                <Info className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div className="font-bold text-orange-900 dark:text-orange-100">
                                                {t("notes")}
                                            </div>
                                        </div>
                                        <div className="text-sm text-orange-800 dark:text-orange-200 whitespace-pre-line leading-relaxed">
                                            {place.notes}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* MENU SECTION */}
                <Card className="overflow-hidden border-2 animate-slide-up">
                    <div className="h-1.5 gradient-accent" />

                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-black text-gradient flex items-center gap-2">
                            <Utensils className="h-6 w-6 text-orange-500" />
                            {t("menu")}
                            <Badge variant="secondary" className="ml-2">
                                {items.length} món
                            </Badge>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {itemsQ.isLoading ? (
                            <div className="grid gap-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Card key={i} className="border-2">
                                        <CardContent className="p-5 space-y-3">
                                            <Skeleton className="h-6 w-1/2" />
                                            <Skeleton className="h-4 w-2/3" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : itemsQ.isError ? (
                            <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-6 text-sm text-destructive">
                                <div className="font-bold mb-1">⚠️ Lỗi load menu</div>
                                <div>{(itemsQ.error as any)?.message ?? "unknown"}</div>
                            </div>
                        ) : items.length ? (
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="mb-6 w-full justify-start overflow-x-auto flex-nowrap">
                                    <TabsTrigger value="all" className="font-bold">
                                        Tất cả ({items.length})
                                    </TabsTrigger>
                                    {categories.map((cat) => (
                                        <TabsTrigger key={cat} value={cat!} className="font-semibold">
                                            {cat} ({items.filter(it => it.category === cat).length})
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <TabsContent value="all" className="mt-0">
                                    <div className="grid gap-4">
                                        {items.map((it) => (
                                            <Card key={it.id} className="group hover-lift border-2 overflow-hidden">
                                                <div className="h-1 gradient-warm" />
                                                <CardContent className="p-5">
                                                    <div className="flex items-start justify-between gap-4 mb-3">
                                                        <h3 className="font-black text-lg group-hover:text-gradient-food transition-all">
                                                            {it.dish_name ?? "—"}
                                                        </h3>
                                                        <Badge className="gradient-accent text-white font-bold shrink-0">
                                                            {itemPriceText(it)}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex flex-wrap gap-3 mb-3">
                                                        {it.category && (
                                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                                                                <Utensils className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                                                                <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
                                                                    {it.category}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {it.notes && (
                                                        <>
                                                            <Separator className="my-3" />
                                                            <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                                                                {it.notes}
                                                            </div>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                {categories.map((cat) => (
                                    <TabsContent key={cat} value={cat!} className="mt-0">
                                        <div className="grid gap-4">
                                            {items.filter(it => it.category === cat).map((it) => (
                                                <Card key={it.id} className="group hover-lift border-2 overflow-hidden">
                                                    <div className="h-1 gradient-warm" />
                                                    <CardContent className="p-5">
                                                        <div className="flex items-start justify-between gap-4 mb-3">
                                                            <h3 className="font-black text-lg group-hover:text-gradient-food transition-all">
                                                                {it.dish_name ?? "—"}
                                                            </h3>
                                                            <Badge className="gradient-accent text-white font-bold shrink-0">
                                                                {itemPriceText(it)}
                                                            </Badge>
                                                        </div>

                                                        {it.notes && (
                                                            <>
                                                                <Separator className="my-3" />
                                                                <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                                                                    {it.notes}
                                                                </div>
                                                            </>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-3">🍽️</div>
                                <h3 className="text-lg font-bold mb-1">Chưa có món ăn</h3>
                                <p className="text-sm text-muted-foreground">{t("no_items")}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bottom Actions */}
                <div className="mt-8 flex gap-3 justify-center animate-slide-up">
                    <Button
                        variant="outline"
                        asChild
                        className="hover-lift border-2 font-bold border-[#D16BA1] text-[#D16BA1]"
                    >
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t("discover")}
                        </Link>
                    </Button>

                    {place?.maps_url && (
                        <Button
                            asChild
                            className="gradient-food hover:shadow-glow-warm font-bold text-white"
                        >
                            <a href={place.maps_url} target="_blank" rel="noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Xem bản đồ
                            </a>
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
}
