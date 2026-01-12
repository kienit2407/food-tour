import { useQuery } from "@tanstack/react-query";
import { fetchItemsByPlaceId, fetchPlaceById, fetchVListings, groupToPlaceCards, type ListingsFilters } from "./api";

export const placesKeys = {
  listings: (filters: ListingsFilters) => ["v_listings", filters] as const,
};

export function usePlaceCardsQuery(filters: ListingsFilters) {
  return useQuery({
    queryKey: placesKeys.listings(filters),
    queryFn: async () => {
      const rows = await fetchVListings(filters);
      return groupToPlaceCards(rows);
    },
    staleTime: 30_000,
  });
}
export const placeDetailKeys = {
  place: (id: string) => ["places", "detail", id] as const,
  items: (id: string) => ["items", "by_place", id] as const,
};

export function usePlaceQuery(placeId: string) {
  return useQuery({
    queryKey: placeDetailKeys.place(placeId),
    queryFn: () => fetchPlaceById(placeId),
    enabled: !!placeId,
    staleTime: 30_000,
  });
}

export function usePlaceItemsQuery(placeId: string) {
  return useQuery({
    queryKey: placeDetailKeys.items(placeId),
    queryFn: () => fetchItemsByPlaceId(placeId),
    enabled: !!placeId,
    staleTime: 30_000,
  });
}