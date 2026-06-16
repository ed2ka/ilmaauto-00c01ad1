## Nove ILMA AUTO boje — rebrand

### Nova paleta
| Token | Hex | HSL | Namjena |
|---|---|---|---|
| `--brand-red` | `#d30f13` | `359 86% 44%` | **Primary** — CTA, linkovi, aktivna stanja, accenti |
| `--brand-yellow` | `#feef01` | `56 99% 50%` | **Accent** — sekundarni CTA, highlights, žute oznake |
| `--brand-gray` | `#8a8989` | `0 0% 54%` | Tekst muted, sekundarne ivice |
| `--brand-light` | `#e1e1e1` | `0 0% 88%` | Border, separator, kartice |
| `--brand-bg` | `#f9f9f9` | `0 0% 98%` | Pozadinski svjetli neutralni (sekcije) |

Stara tamno-bordo paleta (`#2B0000`, `#6A040F`, `#9D0208`) **izbacuje se**. Header više nije tamno bordo — biće čisto crni/tamno sivi ili bijeli s crvenim accentom (predlažem **crni header `#1a1a1a`** za kontrast s crvenom/žutom; ako želiš bijeli javi).

### Mapiranje semantičkih tokena (`src/index.css`)
```
--primary           = #d30f13   (brand red)
--ring              = #d30f13
--destructive       = #d30f13
--accent            = #feef01   (brand yellow)
--header-bg         = #1a1a1a   (neutralna crna — siguran kontrast)
--hero-overlay      = #1a1a1a
--foreground        = #1a1a1a
--muted             = #f9f9f9
--muted-foreground  = #8a8989
--border            = #e1e1e1
--input             = #e1e1e1
--secondary         = #f9f9f9
--rating            = #feef01
```

Dark mode: pozadina `#1a1a1a`, surface `#2a2a2a`, primary ostaje crvena, accent žuta.

### Komponente koje vizuelno mijenjaju izgled (automatski preko tokena)
Header (sad crn umjesto bordo), TopBar, Footer, Hero overlay, SearchPanel, BrandGrid, TrustBar, InquiryCTA, FAQ, PartCard, OrderSheet, OrderStatusStepper, Dashboard, Auth, ChatAssistant gradient, AppRatingBar zvjezdice (sad još jače žute).

### Hardcoded fixevi
- `MarketplaceGrid.tsx` — `#FFBA08` (6×) → `#feef01`
- `ChatAssistant.tsx` — gradient `#D00000`/`#6A040F` → `#d30f13`/`#1a1a1a`
- Header/SearchPanel/PartDetail/SearchFilterSidebar utility klase (`brand-red`, `brand-bordeaux`, `brand-yellow`) → nove vrijednosti propagiraju automatski jer su tokenizirane; bordo se mapira na crnu/sivu, žuta na novu žutu, crvena na novu crvenu
- `tailwind.config.ts` — `brand.bordeaux` i `brand.blood` ostaju kao alias na nove HSL vrijednosti (bordeaux→noir crna, blood→red) ili ih uklanjam i zamijenim s `brand-gray`/`brand-light`/`brand-bg`

### Što NE diram
- `MarketplaceGrid` brand kartice (Instagram, Facebook, OLX, Njuškalo, eBay)
- Google OAuth dugme
- ILMA logo
- Layout, typography, spacing
- `#ececec` separator u `InquiryCTA` (mogu zamijeniti s `#e1e1e1` iz nove palete za konzistentnost — predlažem da)

### Koraci
1. Prepiši HSL tokene u `src/index.css` (light + dark)
2. Update `tailwind.config.ts` — dodaj `gray`, `light`, `bg`; preusmjeri `bordeaux`/`blood`/`noir` na nove neutralne tako da postojeće utility klase i dalje rade
3. `MarketplaceGrid.tsx` — žuti CTA na `#feef01`, tekst dugmeta crn (`#1a1a1a`) jer je nova žuta jako svijetla
4. `ChatAssistant.tsx` — gradient na nove crvene
5. Zamijeni `#ececec` → `#e1e1e1` u `InquiryCTA`, `TrustBar`, `MarketplaceGrid` separator
6. Brzi pregled: Auth, Dashboard, PartDetail, SearchResults — provjera kontrasta žutog teksta

### Pitanje prije izvršenja
**Header boja** — preferiraš:
- (A) **Crni `#1a1a1a`** s crvenim accentom (moja preporuka — najjači brand kontrast, kao Ferrari/Shell)
- (B) **Bijeli `#ffffff`** s crvenim logom (svjetliji, prozračniji)
- (C) **Crveni `#d30f13`** (full brand, ali težak za navigaciju)

Kad potvrdiš header boju, krećem.
