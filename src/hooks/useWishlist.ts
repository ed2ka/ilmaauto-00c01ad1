import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useWishlist = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["wishlist", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishlist")
        .select("part_id, created_at, parts:part_id(id, dio, marka, tip, model, broj, slika1, cijena)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
};

export const useWishlistIds = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["wishlist-ids", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishlist")
        .select("part_id");
      if (error) throw error;
      return new Set((data ?? []).map((w) => w.part_id));
    },
  });
};

export const useToggleWishlist = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ partId, isInWishlist }: { partId: number; isInWishlist: boolean }) => {
      if (!user) throw new Error("Not authenticated");
      if (isInWishlist) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("part_id", partId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wishlist")
          .insert({ user_id: user.id, part_id: partId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
      qc.invalidateQueries({ queryKey: ["wishlist-ids"] });
    },
  });
};
