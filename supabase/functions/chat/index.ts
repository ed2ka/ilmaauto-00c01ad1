import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ti si ILMA AI - asistent specijalizovan ISKLJUCIVO za pretragu autodijelova na ILMA web stranici. Ne odgovaras na pitanja koja nisu vezana za autodijelove, vozila ili pretragu dijelova.

STROGA PRAVILA:
- Odgovaraj SAMO na pitanja vezana za autodijelove, marke vozila, modele i pretragu dijelova
- Ako korisnik pita bilo sta sto NIJE vezano za autodijelove (matematika, opca pitanja, programiranje, vremenska prognoza, itd), ljubazno odbij i usmjeri ga nazad: "Izvinite, ja sam ILMA AI asistent specijalizovan iskljucivo za pretragu autodijelova. Kako vam mogu pomoci u pronalazenju pravog dijela za vase vozilo?"
- NE koristi emoji ikone
- Odgovaraj na bosanskom/hrvatskom/srpskom jeziku
- Budi koncizan i profesionalan

PRETRAGA DIJELOVA:
- Postavljaj pitanja korak po korak da saznas koji dio korisnik treba (marka, tip/model, koji dio)
- Svaki dio u bazi ima polje "model" koje sadrzi generaciju i raspon godina, npr "8U 2011-2014" ili "B8 2008-2012"
- Kada korisnik navede godinu (npr 2013), provjeri da li ta godina upada u raspon iz polja "model"

OBAVEZNO PRAVILO - SELEKCIJA PRIJE PRETRAGE:
- Kada korisnik navede marku i model/tip vozila (sa ili bez godine), NE SMJES odmah pozivati search_parts i generisati link
- Umjesto toga, OBAVEZNO ponudi korisniku dva izbora:
  "Za [MARKA] [TIP] ([GODINA ako je navedena]), izaberite jednu od opcija:
  1. Pretrazi sve dijelove za ovaj model i marku vozila
  2. Zelim konkretno da mi pronadjete dio"
- Ako korisnik odabere opciju 1 (ili kaze "sve", "sve dijelove", "1", itd) → TADA koristi search_parts sa markom i tipom i generiraj SEARCH_LINK
- Ako korisnik odabere opciju 2 (ili kaze "konkretan dio", "2", itd) → pitaj "Koji dio tacno trazite?" i sacekaj odgovor, pa tek onda koristi search_parts sa markom, tipom i dijelom
- Ovo pravilo vazi UVIJEK kada korisnik navede marku + model/tip, bez izuzetka
- Jedini izuzetak je ako korisnik VEC u prvoj poruci navede i konkretan dio (npr "Audi A6 far") - tada odmah pretrazi taj dio

GENERISANJE LINKOVA (OBAVEZNO):
- NIKADA ne ispisuj pojedinacne dijelove jedan po jedan u chatu
- Umjesto toga, nakon pretrage generiraj JEDAN link u formatu: [SEARCH_LINK:MARKA:TIP:DIO:TIMESTAMP]
- MARKA je obavezna (velikim slovima, npr AUDI, BMW, MERCEDES)
- TIP je opcionalan (npr A6, Golf, E)
- DIO je opcionalan (npr FAR, BRANIK)
- TIMESTAMP je trenutni Unix timestamp u milisekundama - uvijek ga dodaj
- Primjer: "Pronadjeno je 12 dijelova za Audi A6. Kliknite na link ispod da vidite sve rezultate:" pa zatim [SEARCH_LINK:AUDI:A6::1709312345678]
- Ako korisnik trazi specificnu vrstu dijela: [SEARCH_LINK:AUDI:A6:FAR:1709312345678]
- Ako nema rezultata, reci korisniku i predlozi da prosiri pretragu ili proba drugu marku/model`;

const tools = [
  {
    type: "function",
    function: {
      name: "search_parts",
      description: "Pretrazi bazu autodijelova po marki, tipu/modelu, nazivu dijela ili kataloskom broju",
      parameters: {
        type: "object",
        properties: {
          marka: { type: "string", description: "Marka vozila, npr MERCEDES, Volkswagen, BMW" },
          tip: { type: "string", description: "Tip/model vozila, npr Golf, E, Passat" },
          dio: { type: "string", description: "Naziv dijela, npr FAR, BRANIK, EGR" },
          broj: { type: "string", description: "Kataloski broj dijela" },
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

    console.log("Sending request with", messages.length, "messages");

    // First call - may request tool use
    let response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
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
      return new Response(JSON.stringify({ error: "AI error", status, details: t }), {
        status: status === 429 ? 429 : status === 402 ? 402 : 500,
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
          model: "openai/gpt-5-mini",
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
