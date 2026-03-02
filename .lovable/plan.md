

## Uklanjanje sekcije brendova sa stranice pretrage

Ukloniti `SearchBrandGrid` komponentu sa stranice `/pretraga` u fajlu `src/pages/SearchResults.tsx`:

- Ukloniti import `SearchBrandGrid` (linija 8)
- Ukloniti renderovanje `<SearchBrandGrid activeCategory={...} />` (linija 100)

Brendovi ostaju dostupni kroz sidebar filter (Marka dropdown) i kroz početnu stranicu (`BrandGrid` komponenta). Sama `SearchBrandGrid` komponenta se neće brisati za slučaj buduće upotrebe.

