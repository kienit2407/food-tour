export type VListingRow = {
    item_id: string | null;
    dish_name: string | null;
    category: string | null;
    price_min: number | null;
    price_max: number | null;
    price_raw: string | null;
    item_notes: string | null;

    place_id: string | null;
    place_name: string | null;
    district: string | null;
    street: string | null;
    full_address: string | null;
    open_hours_raw: string | null;
    place_notes: string | null;
    maps_query: string | null;
    maps_url: string | null;
};

export type PlaceCardModel = {
    placeId: string;
    placeName: string;
    district?: string | null;
    fullAddress?: string | null;
    openHoursRaw?: string | null;

    dishName?: string | null;
    category?: string | null;

    priceMin?: number | null;
    priceMax?: number | null;
    priceRaw?: string | null;
};
