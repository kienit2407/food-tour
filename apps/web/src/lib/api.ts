import type { Listing } from "../types/types";
import { supabase } from "./supabase";

export async function fetchListings(params: {
  district?: string | null;
  category?: string | null;
  limit?: number;
}): Promise<Listing[]> {
  let q = supabase.from("v_listings").select("*");

  if (params.district) q = q.eq("district", params.district);
  if (params.category) q = q.eq("category", params.category);

  q = q.order("place_name", { ascending: true }).limit(params.limit ?? 200);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Listing[];
}
