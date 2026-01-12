/* eslint-disable react-refresh/only-export-components */
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Heart, Activity } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

const NAV_H = "h-16"; // dùng để padding-bottom cho page

export const bottomNavHeightClass = NAV_H;

export default function BottomNav() {
  const { t } = useI18n();
  const { pathname } = useLocation();

  const items = [
    { to: "/", label: t("discover"), icon: Home },
    { to: "/favorites", label: t("favorites"), icon: Heart },
    { to: "/activity", label: t("activity"), icon: Activity },
  ];

  return (
    <nav className={cn("fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-lg shadow-lg", NAV_H)}>
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 gradient-accent" />

      <div className="mx-auto flex max-w-md items-center justify-around px-4 h-full">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1.5 py-2 text-xs font-bold w-full transition-all duration-300",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active Indicator */}
              {active && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 gradient-accent rounded-full animate-scale-in" />
              )}

              {/* Icon with Background */}
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                active
                  ? "gradient-accent shadow-glow scale-110"
                  : "bg-muted/50 hover:bg-muted"
              )}>
                <Icon className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  active ? "text-white" : ""
                )} />
              </div>

              <span className={cn(
                "truncate transition-all duration-300",
                active ? "font-extrabold" : ""
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
