## Zašto se razlikuje

Globalni `Footer` komponent (`src/components/Footer.tsx`) renderuje se na svim stranicama i sadrži donju traku sa:
- `© 2024 ILMA AUTO d.o.o. Sva prava zadržana.`
- Linkovi: `Privatnost i zaštita podataka | Uslovi korištenja | Uslovi kupovine | Politika povrata | Kolačići`

Stranica `/prijava` (i `/registracija`) NE koristi `<Footer />` — umjesto toga `src/pages/Auth.tsx` ima vlastiti, ručno napisan mini-footer (linije 285–311) sa drugačijim tekstom (`Copyright © 1998-2025 ...`), drugačijim labelama linkova (`Politika privatnosti`, `Opći uslovi poslovanja`, ...) i ikonama društvenih mreža. To je istorijski uvedeno da bi se ispod auth forme prikazala kompaktna traka preko pozadinske slike, ali rezultat je nedosljednost.

## Plan

Uskladiti donju traku na Auth stranici sa onom iz `Footer.tsx`, bez dodavanja punog tamnog Footer komponenta (da bi pozadinska slika ostala vidljiva).

U `src/pages/Auth.tsx`, zamijeniti postojeći `<footer>` blok (linije 285–311) sa kompaktnom verzijom koja:

1. Koristi ista 2 elementa kao globalni footer:
   - lijevo: `© 2024 ILMA AUTO d.o.o. Sva prava zadržana.`
   - desno: ista lista `legalLinks` sa istim redoslijedom, labelama i `|` razdjelnicima kao u `Footer.tsx`.
2. Uklanja društvene ikone iz auth footera (nema ih u globalnom).
3. Zadržava trenutni stil prikladan za tamnu pozadinu: `border-t border-white/10`, `text-white/55`, `hover:text-white`, `text-xs`, container i padding identični globalnom (`py-5`, `gap-4`, `flex-col md:flex-row`).
4. Lista linkova se duplira inline (kratka), ili se ekstraktuje u `src/lib/footer-links.ts` i importuje u oba mjesta. Predlog: ekstraktovati u `src/lib/footer-links.ts` kao `export const legalLinks = [...]`, pa import u `Footer.tsx` i `Auth.tsx` — jedan izvor istine, buduće promjene se rade na jednom mjestu.

Nema promjena na ostalim stranicama — one već koriste globalni `Footer` i ostaju identične.