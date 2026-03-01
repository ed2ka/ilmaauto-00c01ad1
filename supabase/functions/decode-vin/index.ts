import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { vin } = await req.json();

    if (!vin || vin.length !== 17) {
      return new Response(
        JSON.stringify({ error: "VIN mora imati tačno 17 karaktera." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Ti si VIN dekoder. Iz dostavljenog VIN broja izdvoji ISKLJUČIVO:
- marku vozila (UPPERCASE, npr. "VOLKSWAGEN", "MERCEDES", "BMW", "AUDI", "FORD", "OPEL", "RENAULT", "PEUGEOT", "CITROEN", "FIAT", "TOYOTA", "HYUNDAI", "NISSAN", "MAZDA", "VOLVO", "SKODA", "SEAT", "ALFA ROMEO")
- model/tip vozila (npr. "GOLF", "E CLASS", "3 SERIES", "A4")
- modelsku godinu

Odgovori ISKLJUČIVO pozivanjem funkcije decode_vin_result.`,
          },
          {
            role: "user",
            content: `Dekodiraj ovaj VIN: ${vin}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "decode_vin_result",
              description: "Return decoded VIN data",
              parameters: {
                type: "object",
                properties: {
                  marka: { type: "string", description: "Vehicle make/brand in UPPERCASE" },
                  tip: { type: "string", description: "Vehicle model/type" },
                  godina: { type: "string", description: "Model year" },
                },
                required: ["marka", "tip", "godina"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "decode_vin_result" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Previše zahtjeva, pokušajte ponovo." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Nedovoljno kredita." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Greška pri dekodiranju VIN-a." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      return new Response(JSON.stringify({ error: "Nije moguće dekodirati VIN." }), {
        status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const decoded = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(decoded), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("decode-vin error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Nepoznata greška" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
