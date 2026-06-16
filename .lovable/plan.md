## Cilj
Zamijeniti trenutni `MarketplaceGrid` (Instagram, Facebook, OLX, Njuškalo, eBay) novim dizajnom: **3 kartice u nizu** — OLX SHOP, NJUŠKALO, EBAY STORE — kako je prikazano na referentnoj slici.

## Promjene

### 1. Upload pravih logotipa kao Lovable Assets
- `user-uploads://2c4d9970d1e22a98ce6e003a94ad2859d7fd473b.png` → `src/assets/olx-logo.png.asset.json`
- `user-uploads://mobile_1.png` (Njuškalo pas) → `src/assets/njuskalo-logo.png.asset.json`
- `user-uploads://images.png` (eBay) → `src/assets/ebay-logo.png.asset.json`

### 2. Prepraviti `src/components/MarketplaceGrid.tsx`
- Ukloniti Instagram i Facebook kartice (i njihove `lucide-react` importe).
- Ukloniti veliki donji eBay banner.
- Napraviti `grid grid-cols-1 md:grid-cols-3 gap-4` sa 3 kartice istog dizajna kao na slici:
  - Bijela pozadina (`bg-white`), suptilan border (`border border-border`), `rounded-[9px]`, blagi hover lift.
  - Lijevo gore: naslov (npr. `OLX SHOP`, `NJUŠKALO`, `EBAY STORE`) u tamnoj `#1b2835` boji, ispod sivi "Kratki opis" tekst.
  - Desno: veliki logo (`<img>` iz upload-anih assetova), centriran vertikalno, `object-contain`.
  - Dolje lijevo: tamni link/tekst u stilu CTA (`PREGLEDAJ OGLASE`, `POSJETI TRGOVINU`, `POSJETI EBAY STORE`) sa malim `ArrowRight`.
- Cijela kartica je `<a>` sa odgovarajućim linkom:
  - OLX: `https://autootpadilma.olx.ba/`
  - Njuškalo: `https://www.njuskalo.hr/trgovina/ilmaauto`
  - eBay: `https://www.ebay.com/str/ilmaautosb`

### 3. Tekstovi (placeholder dok korisnik ne zamijeni)
- Naslovi: `OLX SHOP`, `NJUŠKALO`, `EBAY STORE`
- Opis: `Kratki opis` (za sva tri, kako je i u prilogu)
- CTA: `PREGLEDAJ OGLASE`, `POSJETI TRGOVINU`, `POSJETI EBAY STORE`

### 4. Cleanup
- Obrisati nekorištene SVG fallback-ove `src/assets/olx-icon.svg`, `njuskalo-icon.svg`, `ebay-icon.svg` ako se više nigdje ne koriste (provjerit ću `Footer.tsx` prije brisanja — vjerojatno ih i dalje koristi pa ostaju).

Sekcija ostaje s bijelom pozadinom (`bg-white`).
