

## Dodavanje selekcije u ILMA AI - pitanje prije pretrage

### Problem
Kada korisnik napise "AUDI A6 2013", AI odmah generise link sa svim dijelovima. Korisnik nema opciju da specificira da li zeli SVE dijelove ili trazi jedan konkretan dio.

### Rjesenje

**Fajl: `supabase/functions/chat/index.ts`**

Azurirati `SYSTEM_PROMPT` da doda novo pravilo u tok razgovora:

Kada korisnik navede marku i model (sa ili bez godine), AI NE smije odmah pretraziti i generisati link. Umjesto toga, AI mora ponuditi korisniku dva izbora:

```text
"Za AUDI A6 (2013), izaberite jednu od opcija:

1. Pretrazi sve dijelove za ovaj model i marku vozila
2. Zelim konkretno da mi pronadjete dio"
```

- Ako korisnik odabere opciju 1 → AI koristi search_parts i generise SEARCH_LINK sa markom i tipom
- Ako korisnik odabere opciju 2 → AI pita "Koji dio tacno trazite?" i nastavlja razgovor dok ne sazna koji dio, pa tek onda pretrazuje i generise link sa markom, tipom i dijelom

### Tehnicke izmjene

Samo jedan fajl: `supabase/functions/chat/index.ts` - dodavanje instrukcija u SYSTEM_PROMPT sekciju "PRETRAGA DIJELOVA" da AI uvijek ponudi izbor prije nego sto krene sa pretragom.

