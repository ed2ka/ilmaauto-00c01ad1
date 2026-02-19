import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ti si ILMA asistent za autodijelove. Tvoja uloga je da pomogneš korisniku pronaći pravi autodijel.

Pravila:
- Budi ljubazan, koncizan i profesionalan
- Postavljaj pitanja korak po korak da saznaš koji dio korisnik treba
- Pitaj redom: koja marka vozila, koji model/tip, koji dio treba
- Odgovaraj na bosanskom/hrvatskom/srpskom jeziku
- Koristi emoji ikone umjereno za prijateljski ton 🚗

VAŽNO - Pretraga baze:
Kada imaš dovoljno informacija (barem marku i dio), OBAVEZNO koristi search_parts tool da pretražiš bazu.
Nikada ne govori korisniku da sam pretražuje - TI tražiš za njega!
Kada pronađeš dijelove, prikaži ih kao listu sa formatom:
[PART:id:naziv:broj:marka:tip:slika_url]
Na primjer: [PART:736911:VAKUM PUMPA:ENAC46000:MERCEDES:E:https://example.com/img.jpg]
Ako nema rezultata, reci korisniku i predloži da proširi pretragu.`;

const tools = [
  {
    type: "function",
    function: {
      name: "search_parts",
      description: "Pretraži bazu autodijelova po marki, tipu/modelu, nazivu dijela ili kataloškom broju",
      parameters: {
        type: "object",
        properties: {
          marka: { type: "string", description: "Marka vozila, npr MERCEDES, Volkswagen, BMW" },
          tip: { type: "string", description: "Tip/model vozila, npr Golf, E, Passat" },
          dio: { type: "string", description: "Naziv dijela, npr FAR, BRANIK, EGR" },
          broj: { type: "string", description: "Kataloški broj dijela" },
        },
      },
    },
  },
];

async function searchPartsInDb(args: any) {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabase.rpc("search_parts", {
    p_marka: args.marka || null,
    p_tip: args.tip || null,
    p_dio: args.dio || null,
    p_broj: args.broj || null,
    p_query: null,
    p_limit: 10,
    p_offset: 0,
  });

  if (error) {
    console.error("DB search error:", error);
    return { results: [], total: 0 };
  }

  return {
    results: (data || []).map((p: any) => ({
      id: p.id,
      dio: p.dio,
      broj: p.broj,
      marka: p.marka,
      tip: p.tip,
      model: p.model,
      slika1: p.slika1,
      is_available: p.is_available,
    })),
    total: data?.[0]?.total_count || 0,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // First call - may request tool use
    let response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        tools,
        stream: false,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", status, t);
      return new Response(JSON.stringify({ error: "AI error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result = await response.json();
    let choice = result.choices?.[0];

    // Handle tool calls
    if (choice?.finish_reason === "tool_calls" || choice?.message?.tool_calls) {
      const toolCalls = choice.message.tool_calls || [];
      const toolMessages: any[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
        choice.message,
      ];

      for (const tc of toolCalls) {
        if (tc.function.name === "search_parts") {
          const args = JSON.parse(tc.function.arguments);
          const searchResult = await searchPartsInDb(args);
          toolMessages.push({
            role: "tool",
            tool_call_id: tc.id,
            content: JSON.stringify(searchResult),
          });
        }
      }

      // Second call with tool results - stream this one
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: toolMessages,
          stream: true,
        }),
      });

      if (!response.ok) {
        const t = await response.text();
        console.error("AI second call error:", response.status, t);
        return new Response(JSON.stringify({ error: "AI error" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // No tool calls - stream the initial response
    // Since we used stream:false, convert to SSE format
    const content = choice?.message?.content || "";
    const sseData = `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\ndata: [DONE]\n\n`;
    return new Response(sseData, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
