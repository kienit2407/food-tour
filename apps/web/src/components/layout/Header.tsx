import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n";
import { Languages, Shuffle, Sparkles } from "lucide-react";

export default function Header({
    onRandom,
}: {
    onRandom?: () => void;
}) {
    const { t, locale, setLocale } = useI18n();

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md shadow-sm " >
            {/* Gradient Background Accent */}
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/5 via-fuchsia-500/5 to-pink-500/5 pointer-events-none" />

            <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3 group">
                    {/* Logo with Gradient & Animation */}
                    <div className="relative h-12 w-12 rounded-2xl gradient-food flex items-center justify-center shadow-lg hover:shadow-glow-warm transition-all duration-300 animate-float">
                        <span className="font-black text-white text-xl">🍜</span>
                    </div>

                    <div className="leading-tight">
                        <div className="text-xl font-black text-gradient-food flex items-center gap-2">
                            {t("app_name")}
                            <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
                        </div>
                        <div className="text-[11px] text-muted-foreground font-semibold tracking-wide">
                            Saigon Culinary Guide ✨
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
                        className="hover-lift border-2 border-[#D16BA1] font-semibold "
                    >
                        <Languages className="mr-2 h-4 w-4" />
                        {locale.toUpperCase()}
                    </Button>

                    <Button
                        size="sm"
                        onClick={onRandom}
                        className="gradient-accent hover:shadow-glow transition-all duration-300 font-semibold text-white"
                    >
                        <Shuffle className="mr-2 h-4 w-4" />
                        {t("surprise")}
                    </Button>
                </div>
            </div>
        </header>
    );
}
