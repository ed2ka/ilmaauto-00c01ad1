import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Part {
  id: number;
  dio: string;
  broj: string;
  marka: string;
  tip: string;
  model: string;
  slika1: string | null;
  slika2: string | null;
  slika3: string | null;
  is_available: boolean;
  created_at: string;
}

interface SearchParams {
  marka?: string;
  tip?: string;
  dio?: string;
  broj?: string;
  query?: string;
  limit?: number;
  offset?: number;
}

interface SearchResult {
  parts: Part[];
  totalCount: number;
}

export function useSearchParts(params: SearchParams, enabled = true) {
  return useQuery<SearchResult>({
    queryKey: ["parts", "search", params],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_parts", {
        p_marka: params.marka || null,
        p_tip: params.tip || null,
        p_dio: params.dio || null,
        p_broj: params.broj || null,
        p_query: params.query || null,
        p_limit: params.limit || 20,
        p_offset: params.offset || 0,
      });

      if (error) throw error;
      const rows = (data as any[]) || [];
      return {
        parts: rows.map(({ total_count, ...rest }) => rest as Part),
        totalCount: rows.length > 0 ? Number(rows[0].total_count) : 0,
      };
    },
    enabled,
  });
}

export function usePartById(id: string | undefined) {
  return useQuery<Part | null>({
    queryKey: ["parts", "detail", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("parts")
        .select("*")
        .eq("id", parseInt(id))
        .single();
      if (error) throw error;
      return data as Part;
    },
    enabled: !!id,
  });
}

export function useBrands() {
  return useQuery<string[]>({
    queryKey: ["parts", "brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parts")
        .select("marka")
        .order("marka");
      if (error) throw error;
      const unique = [...new Set((data || []).map((d: any) => d.marka))].filter(Boolean);
      return unique.sort();
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useModels(marka: string | null) {
  return useQuery<string[]>({
    queryKey: ["parts", "models", marka],
    queryFn: async () => {
      if (!marka) return [];
      const { data, error } = await supabase
        .from("parts")
        .select("tip")
        .eq("marka", marka)
        .order("tip");
      if (error) throw error;
      const unique = [...new Set((data || []).map((d: any) => d.tip))].filter(Boolean);
      return unique.sort();
    },
    enabled: !!marka,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePartsCount() {
  return useQuery<number>({
    queryKey: ["parts", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("parts")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
    staleTime: 1000 * 60 * 5,
  });
}
