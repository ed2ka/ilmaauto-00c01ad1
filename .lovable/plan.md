## Cilj

Logo ILMA AUTO mora "presjeći" oba header bara — gornja žuta polovina (ILMA) leži preko svijetlog top bara, a donja crvena polovina (AUTO) preko sivog main header bara. Logo savršeno centriran horizontalno.

## Izmjene

### 1. `src/components/TopBar.tsx`
- Povećati visinu sa `h-9` na `h-12` (top bar postaje viši da prihvati gornju polovinu loga).

### 2. `src/components/Header.tsx`
- Pomjeriti header niže: `top-9` → `top-12` (da prati novu visinu top bara).
- Povećati visinu main headera: `h-16 lg:h-[72px]` → `h-20 lg:h-[88px]`.
- Logo container: ukloniti `-my-2`, dodati apsolutno pozicioniranje tako da je logo centriran preko spoja dva bara:
  - `absolute left-1/2 -translate-x-1/2 -top-6 lg:-top-8` (logo izlazi van main headera prema gore u top bar)
  - Visina loga: `h-16 lg:h-20` (dovoljno velika da pola bude u top baru, pola u main baru).
  - `z-10` da bude iznad oba bara.

### 3. Padding ispod headera
Provjeriti da li glavni sadržaj koristi neki `pt-*` koji se oslanja na ukupnu visinu (top 9 + 16/72). Ako da, ažurirati offset u `Index.tsx`/layoutu na novu ukupnu visinu (12 + 20 = 32 mobile / 12 + 88px desktop).

## Rezultat
Logo izgleda identično kao na slici — žuti dio preko `#e1e1e1` top bara, crveni dio preko `#8a8989` glavnog headera, savršeno centriran.
