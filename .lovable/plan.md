## Rebrand UI — ILMA AUTO crveno/žuta paleta

### Checkpoint
Lovable automatski čuva svaki korak. Vraćanje: dugme **Revert** ispod bilo koje moje poruke, ili `View History` na vrhu chata. Nema potrebe za ručnim checkpointom.

### Brand paleta (iz prilogu)
| Token | Hex | HSL | Namjena |
|---|---|---|---|
| `--brand-noir` | `#2B0000` | `0 100% 8%` | Header, dark sections, footer pozadina |
| `--brand-bordeaux` | `#6A040F` | `355 96% 22%` | Hover stanja, sekundarne tamne površine |
| `--brand-blood` | `#9D0208` | `359 97% 31%` | Naslovi accent, badges, gradijenti |
| `--brand-red` | `#D00000` | `0 100% 41%` | **Primary** — CTA, linkovi, aktivna stanja |
| `--brand-yellow` | `#FFBA08` | `44 99% 51%` | **Accent** — sekundarni CTA, oznake, highlights |

### Strategija — centralni izvor istine
Sve mijenjam u `src/index.css` (HSL tokeni) — automatski propagira kroz cijelu aplikaciju jer 95% komponenti već koristi semantičke tokene (`bg-primary`, `text-primary`, `bg-header`, itd.).

**Mapiranje tokena:**
```
--primary           = #D00000     (bilo #DC2626 — vrlo blisko)
--ring              = #D00000
--destructive       = #9D0208
--header-bg         = #2B0000     (bilo #1b2835 tamno plava)
--rating            = #FFBA08     (bilo #FACC15)
--hero-overlay      = #2B0000
--background        = bijela (ostaje)
--foreground        = #2B0000 (umjesto tamno sive — suptilno toplije)
--muted             = #f5ebeb (toplo nude umjesto hladne sive)
--border            = vrlo svijetla bordo nijansa
```

Dark mode tokeni dobijaju `--background: #2B0000` paletu.

### Hardcoded vrijednosti koje takođe ažuriram
- `bg-[#1b2835]` → već je tokenizirano kao `--header-bg`, automatski radi
- `bg-[#facc15]` u `MarketplaceGrid.tsx` (6×) → `bg-[#FFBA08]` (žuti CTA buttoni)
- `bg-[#ececec]` (TrustBar, InquiryCTA, MarketplaceGrid) — **zadržavam** kao neutralni svjetli separator između sekcija; lijepo razdvaja crvene/žute akcente. Mogu ga promijeniti u toplo bež `#F7EFEA` ako želiš — reci.
- `AnnouncementBar` (crvena traka) → ostaje, sad koristi `--brand-blood` umjesto tailwind `red-600`
- Auth/Login pozadina, dropdown highlights, focus ringovi → automatski preko tokena

### Komponente koje vizuelno mijenjaju izgled (sve preko tokena)
Header, TopBar, Footer, Hero overlay, SearchPanel tabovi, BrandGrid hover, TrustBar, HowToOrder ikonice, InquiryCTA card, FAQ accordion accenti, PartCard cijene/warranty, OrderSheet, OrderStatusStepper, Dashboard, Auth, SearchResults filteri, ChatAssistant ILMA AI border gradient, AppRatingBar zvjezdice.

### Što NE diram
- `MarketplaceGrid` brand kartice (Instagram pink, Facebook plava, OLX tirkizna, Njuškalo žuta, eBay multicolor) — to su tuđi brendovi, moraju ostati prepoznatljivi
- Google OAuth dugme (Google brand boje)
- ILMA logo (`ilma-logo.svg` već crveno-žuti, perfektno pasuje)
- Layout, typography, spacing, sve funkcionalno

### Plan u koracima
1. Update `src/index.css` — svi HSL tokeni + light i dark mode
2. Update `MarketplaceGrid.tsx` — 6× `#facc15` → `#FFBA08`
3. Update `ChatAssistant.tsx` gradient border — koristiti nove brand crvene
4. Update `AnnouncementBar.tsx` — koristi `bg-[hsl(var(--brand-blood))]` ili token
5. Quick scan ostalih hardcoded crvenih (`#dc2626`, `#7f1d1d`) → zamijeniti s novim brand crvenim

Nakon završetka, otvori homepage i nekoliko podstranica (Auth, Dashboard, PartDetail, SearchResults) i ako nešto ne paše javi mi, pa polirujemo.

Da krenem?
