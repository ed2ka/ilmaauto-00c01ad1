export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      orders: {
        Row: {
          created_at: string
          customer_address: string
          customer_name: string
          customer_phone: string
          id: number
          part_id: number
          part_name: string
          part_price: number | null
          shipping_price: number
          status: string
          total_price: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_address: string
          customer_name: string
          customer_phone: string
          id?: never
          part_id: number
          part_name: string
          part_price?: number | null
          shipping_price?: number
          status?: string
          total_price?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_address?: string
          customer_name?: string
          customer_phone?: string
          id?: never
          part_id?: number
          part_name?: string
          part_price?: number | null
          shipping_price?: number
          status?: string
          total_price?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
        ]
      }
      parts: {
        Row: {
          broj: string
          cijena: number | null
          created_at: string
          dio: string
          id: number
          is_available: boolean
          marka: string
          model: string
          slika1: string | null
          slika2: string | null
          slika3: string | null
          tip: string
        }
        Insert: {
          broj?: string
          cijena?: number | null
          created_at?: string
          dio: string
          id: number
          is_available?: boolean
          marka: string
          model?: string
          slika1?: string | null
          slika2?: string | null
          slika3?: string | null
          tip: string
        }
        Update: {
          broj?: string
          cijena?: number | null
          created_at?: string
          dio?: string
          id?: number
          is_available?: boolean
          marka?: string
          model?: string
          slika1?: string | null
          slika2?: string | null
          slika3?: string | null
          tip?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      support_chat_codes: {
        Row: {
          assistant_response: string
          code: string
          created_at: string
          id: number
          user_message: string
        }
        Insert: {
          assistant_response: string
          code: string
          created_at?: string
          id?: never
          user_message: string
        }
        Update: {
          assistant_response?: string
          code?: string
          created_at?: string
          id?: never
          user_message?: string
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string
          id: number
          part_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: never
          part_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: never
          part_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_guest_order: {
        Args: { p_order_id: number; p_user_id: string }
        Returns: boolean
      }
      search_parts: {
        Args: {
          p_broj?: string
          p_dio?: string
          p_limit?: number
          p_marka?: string
          p_offset?: number
          p_query?: string
          p_tip?: string
        }
        Returns: {
          broj: string
          cijena: number
          created_at: string
          dio: string
          id: number
          is_available: boolean
          marka: string
          model: string
          slika1: string
          slika2: string
          slika3: string
          tip: string
          total_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
