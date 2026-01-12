export type Listing = {
    item_id: string;
    dish_name: string | null;
    category: string | null;
    price_min: number | null;
    price_max: number | null;
    price_raw: string | null;
    item_notes: string | null;

    place_id: string;
    place_name: string;
    district: string | null;
    street: string | null;
    full_address: string | null;
    open_hours_raw: string | null;
    place_notes: string | null;
    maps_query: string | null;
    maps_url: string | null;
};
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

export type PlaceRow = {
    id: string;
    name: string | null;
    district: string | null;
    street: string | null;
    full_address: string | null;
    open_hours_raw: string | null;
    notes: string | null;
    maps_query: string | null;
    maps_url: string | null;
};

export type ItemRow = {
    id: string;
    place_id: string | null;
    dish_name: string | null;
    category: string | null;
    price_min: number | null;
    price_max: number | null;
    price_raw: string | null;
    notes: string | null;
};

export type PlaceSummary = {
    place_id: string;
    place_name: string;
    district?: string;
    street?: string;
    full_address?: string;
    open_hours_raw?: string;
    place_notes?: string;
    maps_url?: string;
    maps_query?: string;

    // computed
    categories: string[];
    dish_names: string[];
    price_min?: number; // min across items
    price_max?: number; // max across items
};
