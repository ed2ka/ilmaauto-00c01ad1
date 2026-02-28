

## Ogranicavanje ILMA AI na pretragu dijelova + generisanje linkova

### Problem
Trenutno ILMA AI odgovara na bilo kakva pitanja kao opci chatbot. Korisnik moze pitati bilo sta i dobiti odgovor. Takodjer, kada pronadje dijelove, ispisuje ih jedan po jedan u chatu umjesto da ponudi link na stranicu pretrage.

### Rjesenje

#### 1. Azuriranje system prompta (edge function)

Fajl: `supabase/functions/chat/index.ts`

Promijeniti SYSTEM_PROMPT da:
- Strogo ogranici AI samo na pretragu autodijelova - odbija sve ostale teme
- Kada korisnik trazi dijelove, AI koristi `search_parts` tool da provjeri sta postoji u bazi
- Umjesto ispisivanja dijelova jedan po jedan, AI generise **link** u formatu `[SEARCH_LINK:marka:tip:dio:timestamp]`
- AI koristi polje `model` iz baze (npr. "8U 2011-2014") da odredi da li dio odgovara trazenoj godini
- AI ne koristi emoji ikone

Novi prompt ce sadrzavati jasne instrukcije:
- "Ti si ISKLJUCIVO asistent za pretragu autodijelova. Ne odgovaras na pitanja koja nisu vezana za autodijelove."
- "Kada korisnik trazi nesto sto nije vezano za autodijelove, ljubazno ga usmjeri nazad na temu."
- "Kada pronadjes rezultate, generiraj link u formatu [SEARCH_LINK:...] umjesto da ispisujes dijelove."

#### 2. Azuriranje ChatAssistant komponente

Fajl: `src/components/ChatAssistant.tsx`

- Dodati parser za `[SEARCH_LINK:marka:tip:dio:timestamp]` tagove
- Renderovati ih kao dugme/link koji otvara `/pretraga?marka=X&tip=Y&dio=Z&t=TIMESTAMP` u novom tabu
- Timestamp osigurava da je svaki link unikatan
- Ukloniti stari `parsePartCards` i `PartCard` komponentu jer se vise nece koristiti

#### 3. Tok razgovora

```text
Korisnik: "Daj mi sve dijelove za AUDI A6 2013"
AI: (interno poziva search_parts sa marka=AUDI, tip=A6)
AI: (dobije rezultate, filtrira po model polju koje sadrzi 2013 u rasponu)
AI: "Pronadeno je 5 dijelova za Audi A6 (2013). Kliknite na link ispod da vidite sve rezultate:"
    [SEARCH_LINK:AUDI:A6::1772321814261]
    -- renderuje se kao dugme "Pogledaj rezultate za AUDI A6" --

Korisnik: "Koliko je 2+2?"
AI: "Izvinite, ja sam ILMA AI asistent specijalizovan iskljucivo za pretragu autodijelova. 
     Kako vam mogu pomoci u pronalazenju pravog dijela za vase vozilo?"
```

### Tehnicke izmjene

| Fajl | Akcija |
|---|---|
| `supabase/functions/chat/index.ts` | Azurirati SYSTEM_PROMPT - strogo ograniciti na autodijelove, generisanje linkova umjesto ispisa |
| `src/components/ChatAssistant.tsx` | Zamijeniti PartCard parser sa SearchLink parser, renderovati linkove kao dugmad koja otvaraju /pretraga u novom tabu |

### Format generisanog linka

```text
/pretraga?marka=AUDI&tip=A6&t=1772321814261
```

- `marka` - marka vozila (obavezno)
- `tip` - tip/model ako je poznato (opcionalno)
- `dio` - vrsta dijela ako je specificirana (opcionalno)
- `t` - timestamp za unikatnost (uvijek prisutan)

Stranica `/pretraga` vec podrzava ove URL parametre i prikazuje filtrirane rezultate, tako da ne treba mijenjati nista na toj stranici.
