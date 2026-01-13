/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

import { useI18n } from "@/i18n/i18n";
import { ArrowLeft, Clock, MapPin, Info,  } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {usePlaceQuery } from "@/features/places/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";


export default function PlaceDetailPage() {
    const { t } = useI18n();
    const nav = useNavigate();
    const { id } = useParams();

    const placeId = id ?? "";

    const placeQ = usePlaceQuery(placeId);

    const place = placeQ.data;

    // Group items by category

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

                                {/* Location & Hours */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border-2 border-blue-100">
                                        <div className="p-2 rounded-lg bg-blue-100 shrink-0">
                                            <MapPin className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-sm text-blue-900 b-1">
                                                Địa chỉ
                                            </div>
                                            <div className="text-sm text-blue-700">
                                                {place?.district ?? "—"}
                                            </div>
                                            {place?.full_address && (
                                                <div className="text-xs text-blue-600 mt-1">
                                                    {place.full_address}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {place?.open_hours_raw && (
                                        <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border-2 border-purple-100">
                                            <div className="p-2 rounded-lg bg-purple-100 shrink-0">
                                                <Clock className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-sm text-purple-900 mb-1">
                                                    {t("open_hours_label")}
                                                </div>
                                                <div className="text-sm text-purple-700">
                                                    {place.open_hours_raw}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Notes */}
                                {place?.notes && (
                                    <div className="mt-6 p-5 rounded-xl bg-linear-to-br from-orange-50 to-yellow-50 border-2 border-orange-100">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 rounded-lg bg-orange-100">
                                                <Info className="h-4 w-4 text-orange-600" />
                                            </div>
                                            <div className="font-bold text-orange-900">
                                                {t("notes")}
                                            </div>
                                        </div>
                                        <div className="text-sm text-orange-800 whitespace-pre-line leading-relaxed">
                                            {place.notes}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>

                
                {/* Bottom Actions
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
                </div> */}
            </main>
        </div>
    );
}