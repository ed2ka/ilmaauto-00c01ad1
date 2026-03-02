import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CreateInquiryParams {
  searchQuery: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export const useMyInquiries = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-inquiries", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("part_inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: CreateInquiryParams) => {
      const { data, error } = await supabase.rpc("create_inquiry", {
        p_user_id: user?.id || null,
        p_search_query: params.searchQuery,
        p_customer_name: params.customerName,
        p_customer_phone: params.customerPhone,
        p_customer_email: params.customerEmail,
      });
      if (error) throw error;
      return { id: data as number };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-inquiries"] });
    },
  });
};

export const useClaimGuestInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ inquiryId, userId }: { inquiryId: number; userId: string }) => {
      const { data, error } = await supabase.rpc("claim_guest_inquiry", {
        p_inquiry_id: inquiryId,
        p_user_id: userId,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-inquiries"] });
    },
  });
};
