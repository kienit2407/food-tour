import { supabase } from "@/lib/supabase";
import type { VListingRow } from "./types";

export type ListingsFilters = {
    district?: string | null;
    category?: string | null;
    budgetMax?: number | null; // VNĐ
};

export async function fetchVListings(filters: ListingsFilters) {
    let q = supabase
        .from("v_listings")
        .select(
            [
                "item_id",
                "dish_name",
                "category",
                "price_min",
                "price_max",
                "price_raw",
                "item_notes",
                "place_id",
                "place_name",
                "district",
                "street",
                "full_address",
                "open_hours_raw",
                "place_notes",
                "maps_query",
                "maps_url",
            ].join(",")
        )
        .limit(500);

    if (filters.district && filters.district !== "all") {
        q = q.eq("district", filters.district);
    }

    if (filters.category && filters.category !== "all") {
        q = q.eq("category", filters.category);
    }

    // budgetMax: lọc những item có (price_min null OR price_min <= budget) và (price_max null OR price_max <= budget)
    if (filters.budgetMax && filters.budgetMax > 0) {
        const b = filters.budgetMax;
        q = q
            .or(`price_min.is.null,price_min.lte.${b}`)
            .or(`price_max.is.null,price_max.lte.${b}`);
    }

    const { data, error } = await q;
    if (error) throw error;

    return (data ?? []) as unknown as VListingRow[];
}

/** gộp rows -> 1 card/1 place (pick row đầu tiên làm "featured item") */
export function groupToPlaceCards(rows: VListingRow[]) {
    const map = new Map<string, VListingRow>();

    for (const r of rows) {
        const pid = r.place_id ?? "";
        if (!pid) continue;
        if (!map.has(pid)) map.set(pid, r);
    }

    return Array.from(map.values()).map((r) => ({
        placeId: r.place_id!,
        placeName: r.place_name ?? "—",
        district: r.district,
        fullAddress: r.full_address,
        openHoursRaw: r.open_hours_raw,
        dishName: r.dish_name,
        category: r.category,
        priceMin: r.price_min,
        priceMax: r.price_max,
        priceRaw: r.price_raw,
    }));
}
export async function fetchPlaceById(placeId: string) {
  const { data, error } = await supabase
    .from("places")
    .select(
      [
        "id",
        "name",
        "district",
        "street",
        "full_address",
        "open_hours_raw",
        "notes",
        "maps_query",
        "maps_url",
        "created_at",
        "updated_at",
      ].join(",")
    )
    .eq("id", placeId)
    .single();

  if (error) throw error;
  return data as unknown as {
    id: string;
    name: string | null;
    district: string | null;
    street: string | null;
    full_address: string | null;
    open_hours_raw: string | null;
    notes: string | null;
    maps_query: string | null;
    maps_url: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  };
}

export async function fetchItemsByPlaceId(placeId: string) {
  const { data, error } = await supabase
    .from("items")
    .select(
      [
        "id",
        "place_id",
        "dish_name",
        "category",
        "price_min",
        "price_max",
        "price_raw",
        "notes",
        "source",
        "source_ref",
        "created_at",
        "updated_at",
      ].join(",")
    )
    .eq("place_id", placeId)
    .order("price_min", { ascending: true, nullsFirst: true });

  if (error) throw error;

  return (data ?? []) as unknown as Array<{
    id: string;
    place_id: string;
    dish_name: string | null;
    category: string | null;
    price_min: number | null;
    price_max: number | null;
    price_raw: string | null;
    notes: string | null;
  }>;
}