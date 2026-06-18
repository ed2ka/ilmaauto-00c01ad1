## Cilj

Standardizirati kontakt podatke u cijeloj aplikaciji na:

- **Mobitel:** +387 62 667 700 (`tel:+38762667700`)
- **Fiksni:** +387 32 667 700 (`tel:+38732667700`)
- **Email:** [info@ilmaauto.com](mailto:info@ilmaauto.com) (`mailto:info@ilmaauto.com`)
- **Adresa:** ILMA d.o.o, Ljetinić 8, 74264 Jelah – Tešanj, Bosna i Hercegovina
- **Viber/WhatsApp:** ostaju na +387 62 667 700 (mobilni)

## Izmjene po fajlu

`**src/components/Footer.tsx**`

- Telefon: zamijeniti `+387 62 123 456` (`tel:+38762123456`) sa **dva reda**: mobitel `+387 62 667 700` i fiksni `+387 32 667 700`, oba klikabilna (`tel:` linkovi).
- Email: `info@ilmaauto.ba` → `info@ilmaauto.com` (i `mailto:` link).
- Adresa: `Ljetinić br8` / `74264 Jelah Tešanj, BiH` → `ILMA d.o.o`, `Ljetinić 8`, `74264 Jelah – Tešanj, Bosna i Hercegovina`.
- Viber/WhatsApp linkovi (`38762667700`) — bez promjene.

`**src/pages/Support.tsx**`

- Kartica "Telefon" (linija 47–55): zadržati `+387 62 667 700` kao primarni i dodati drugi `handle` red ili podnaslov sa `+387 32 667 700` (`tel:+38732667700`). Najjednostavnije: prikazati oba broja unutar iste kartice, oba klikabilna.
- Sekcija sa kontakt detaljima (linije 217–228):
  - Adresa: dodati prefiks `ILMA d.o.o, Ljetinić 8, 74264 Jelah – Tešanj, Bosna i Hercegovina` (puni oblik umjesto `BiH`).
  - Email: već `info@ilmaauto.com` — bez promjene.
  - Telefon: ispod postojećeg `+387 62 667 700` dodati drugi red `+387 32 667 700` sa `tel:+38732667700`.
- Viber/WhatsApp kartice — bez promjene (ostaju na mobilnom 62).

`**src/components/SearchFilterSidebar.tsx**`

- Već prikazuje `+387 62 667 700`. Dodati drugi red ispod sa `+387 32 667 700` (`tel:+38732667700`), istim stilom.

## Bez izmjena

- **Placeholderi** u input poljima (`Auth.tsx`, `OrderSheet.tsx`, `NoResultsInquiry.tsx` — `"+387 6x xxx xxx"`) — to su input hintovi za korisnika, ne kontakt podaci firme.
- **Data fajlovi** (`src/data/export_7.json` itd.) — sadrže kataloške brojeve dijelova, ne kontakte.
- **Supabase auto-gen fajlovi** i `chat/index.ts` ne sadrže kontakt podatke firme.

## Napomena

Nakon ovog koraka, ako kasnije želiš lakše održavanje, mogli bismo izvući kontakte u jedan modul (`src/lib/contact.ts`) — ali to nije u opsegu ovog zadatka osim ako tražiš.  
- ok tražim, ubaci to tako u taj modul