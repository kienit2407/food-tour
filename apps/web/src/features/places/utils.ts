import type { PlaceSummary, VListingRow } from "@/types/types";

export function groupListingsToPlaces(rows: VListingRow[]): PlaceSummary[] {
    const map = new Map<string, PlaceSummary>();

    for (const r of rows) {
        const pid = r.place_id;
        if (!pid) continue;

        const existing = map.get(pid);
        const placeName = r.place_name ?? "Không rõ tên";

        const dish = (r.dish_name ?? "").trim();
        const cat = (r.category ?? "").trim();

        if (!existing) {
            map.set(pid, {
                place_id: pid,
                place_name: placeName,
                district: r.district ?? undefined,
                street: r.street ?? undefined,
                full_address: r.full_address ?? undefined,
                open_hours_raw: r.open_hours_raw ?? undefined,
                place_notes: r.place_notes ?? undefined,
                maps_query: r.maps_query ?? undefined,
                maps_url: r.maps_url ?? undefined,
                categories: cat ? [cat] : [],
                dish_names: dish ? [dish] : [],
                price_min: r.price_min ?? undefined,
                price_max: r.price_max ?? undefined,
            });
            continue;
        }

        if (cat && !existing.categories.includes(cat)) existing.categories.push(cat);
        if (dish && !existing.dish_names.includes(dish)) existing.dish_names.push(dish);

        const pmin = r.price_min ?? null;
        const pmax = r.price_max ?? null;

        if (pmin !== null) {
            existing.price_min = existing.price_min === undefined ? pmin : Math.min(existing.price_min, pmin);
        }
        if (pmax !== null) {
            existing.price_max = existing.price_max === undefined ? pmax : Math.max(existing.price_max, pmax);
        }
    }

    return Array.from(map.values());
}
