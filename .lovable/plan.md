## Cilj
Pretvoriti `NoResultsInquiry` u jasno dokumentiran, preimenovan modul s barrel exportom.

## Koraci

1. **Preimenovati komponentu** iz `NoResultsInquiry` u `SearchNoResultsModule` (fajl: `src/components/SearchNoResultsModule.tsx`).
2. **Dodati opširnu dokumentaciju** na vrhu fajla — opis čemu služi, koje propse prima, primjer korištenja, i bilješke za programera.
3. **Kreirati barrel export** `src/components/index.ts` (ako ne postoji) i izvesti `SearchNoResultsModule` iz njega, tako da se može uvoziti kao `import { SearchNoResultsModule } from "@/components"`.
4. **Ažurirati sve importe** — u `src/pages/SearchResults.tsx` zamijeniti stari import i naziv komponente s novim.

## Očekivani rezultat
- Komponenta ima deskriptivno ime koje zvuči kao modul.
- Unutar fajla postoji komentarska dokumentacija (JSDoc / header block) koja objašnjava svrhu, propse i primjer korištenja.
- Postoji `src/components/index.ts` za centralizirane exporte komponenti.
- Nijedan postojeći import nije slomljen.

## Fajlovi koje ćemo dirnuti
- `src/components/NoResultsInquiry.tsx` → preimenovati u `SearchNoResultsModule.tsx` + dokumentacija
- `src/components/index.ts` → novi barrel export
- `src/pages/SearchResults.tsx` → ažurirati import