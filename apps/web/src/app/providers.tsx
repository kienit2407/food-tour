import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { I18nProvider } from "@/i18n/i18n";
import { BrowserRouter } from "react-router-dom";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <I18nProvider>{children}</I18nProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}
