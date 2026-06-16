## Cilj

Kreirati 5 pravnih stranica sa lorem ipsum sadržajem koji se lako mijenja, povezati ih sa footerom i sa checkbox linkovima na `/prijava`.

## Rute i slug-ovi

| Stranica | Ruta | Naslov |
|---|---|---|
| Privatnost i zaštita podataka | `/privatnost` | Politika privatnosti i zaštite podataka |
| Uslovi korištenja | `/uslovi-koristenja` | Uslovi korištenja |
| Uslovi kupovine | `/uslovi-kupovine` | Uslovi kupovine |
| Politika povrata | `/politika-povrata` | Politika povrata |
| Kolačići | `/kolacici` | Politika kolačića |

## Komponenta layouta

Kreirati `src/components/LegalPageLayout.tsx`:
- TopBar + Header + AnnouncementBar (kao ostale stranice)
- Hero traka sa naslovom + zadnji datum izmjene (`Posljednje izmjene: 16.06.2026`)
- Container `max-w-3xl`, `prose`-stil tipografija (h2 sekcije, p paragrafi, ul liste)
- Footer komponent na dnu
- Props: `title`, `lastUpdated`, `children`

Svaka stranica je vlastiti fajl u `src/pages/legal/` tako da korisnik može sadržaj mijenjati nezavisno bez ikakve apstrakcije:
- `src/pages/legal/Privatnost.tsx`
- `src/pages/legal/UsloviKoristenja.tsx`
- `src/pages/legal/UsloviKupovine.tsx`
- `src/pages/legal/PolitikaPovrata.tsx`
- `src/pages/legal/Kolacici.tsx`

Sadržaj svake = `<LegalPageLayout title="..." lastUpdated="16.06.2026">` sa 4–6 sekcija lorem ipsuma (`<section><h2>1. Naslov sekcije</h2><p>Lorem ipsum dolor sit amet...</p></section>`). Markirati na vrhu fajla komentarom `// ✏️ Uredi sadržaj ispod`.

## Linkovanje

1. **`src/lib/footer-links.ts`** — zamijeniti `href: "#"` sa pravim rutama:
   ```ts
   { label: "Privatnost i zaštita podataka", href: "/privatnost" },
   { label: "Uslovi korištenja", href: "/uslovi-koristenja" },
   { label: "Uslovi kupovine", href: "/uslovi-kupovine" },
   { label: "Politika povrata", href: "/politika-povrata" },
   { label: "Kolačići", href: "/kolacici" },
   ```
2. **`src/components/Footer.tsx`** i **`src/pages/Auth.tsx`** — promijeniti `<a href>` na `<Link to>` za legal linkove (SPA navigacija, bez full reload).
3. **`src/pages/Auth.tsx`** — checkboxovi:
   - `Prihvatam <Link to="/uslovi-koristenja">uslove korištenja</Link>`
   - `Slažem se sa <Link to="/privatnost">politikom privatnosti</Link>`
4. **`src/App.tsx`** — dodati 5 novih `<Route>` zapisa i importe iznad `Routes`.

Nema promjena u ostalim komponentama; nijedan poslovni logički kod nije diran.