## Problem

Na homepageu, kad mijenjaš tabove u SearchPanel-u (Filter pretraga / Pretraga po nazivu / Pretraga po kataloškom broju), izgleda kao da se mijenja background slika salona iza pretrage.

Razlog: hero `main` koristi `flex-1` unutar `min-h-screen flex flex-col` layouta. SearchPanel ima različitu visinu za svaki tab (Filter ima više polja od „Pretrage po nazivu"). Kad se panel smanji, smanji se i `main` visina, a `<img>` koristi `object-cover` koji onda iskadrira drugi dio iste slike — pa izgleda kao da je slika promijenjena.

Slika je zapravo ista (`/src/assets/hero-bg-ilma.png`), samo se mijenja vidljivi isječak.

## Rješenje

Postaviti fiksnu minimalnu visinu hero `main` sekcije na `/` tako da varijacije visine SearchPanel-a ne utiču na visinu hero kontejnera. Tako će `object-cover` uvijek prikazivati isti isječak slike.

### Promjene

**`src/pages/Index.tsx`** — na `<main>` elementu (hero sekcija):
- Dodati `min-h-[820px] lg:min-h-[860px]` (vrijednost dovoljna da pokrije i najviši Filter tab bez skakanja).
- Ukloniti `flex-1` da sadržaj ispod ne razvlači hero.
- Zadržati `flex flex-col` i postojeće pozicioniranje SearchPanel-a i rating bara.

Tako hero ostaje vizualno fiksne visine, slika ne „skače", a SearchPanel se mijenja unutar istog okvira.

Nema promjena u `SearchPanel.tsx`, `AnnouncementBar.tsx`, `Header.tsx` niti u tailwind/CSS konfiguraciji.
