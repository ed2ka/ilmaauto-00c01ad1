import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    
    // Accept either: full phpMyAdmin format, or direct array of items
    let items: any[] = [];
    if (Array.isArray(body)) {
      const rawEntry = body.find((e: any) => e.type === "raw");
      if (rawEntry?.data) {
        items = rawEntry.data;
      } else {
        // Direct array of items
        items = body;
      }
    }

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const BATCH = 100;
    let inserted = 0;

    for (let i = 0; i < items.length; i += BATCH) {
      const batch = items.slice(i, i + BATCH).map((item: any) => ({
        id: parseInt(item.id),
        dio: item.dio || "",
        broj: item.broj || "",
        marka: item.marka1 || item.marka || "",
        tip: item.tip1 || item.tip || "",
        model: item.model1 || item.model || "",
        slika1: item.slika1 || null,
        slika2: item.slika2 || null,
        slika3: item.slika3 || null,
        is_available: true,
      }));

      const { error } = await supabase.from("parts").upsert(batch, { onConflict: "id" });
      if (error) {
        console.error("Insert batch error:", error);
        return new Response(JSON.stringify({ error: error.message, inserted }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      inserted += batch.length;
    }

    return new Response(JSON.stringify({ success: true, inserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("import error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
