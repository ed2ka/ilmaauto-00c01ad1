# ILMA AUTO — Frontend Handoff

Kompletna mapa frontenda za predaju programeru. Sve putanje su relativne na korijen projekta.

- **Preview:** https://id-preview--5b023c23-50d2-47e1-9db1-1c531607df1e.lovable.app
- **Published:** https://ilmaauto.lovable.app

---

## 1. Uvod

ILMA AUTO je B2C platforma za prodaju polovnih i novih autodijelova (tržište: Bosna i Hercegovina, šire Balkans/EU). Korisnik može pretraživati dijelove po nazivu, po vozilu (marka/model), po VIN broju, ili kroz AI asistenta. Narudžba se može poslati kao gost ili kao ulogovani korisnik, sa Viber/WhatsApp prečicama prema operateru.

---

## 2. Tech stack

- **React 18** + **TypeScript 5**
- **Vite 5** (build/dev)
- **Tailwind CSS v3** + **shadcn/ui** (Radix primitivi)
- **React Router v6** (`BrowserRouter`)
- **TanStack Query** (server state)
- **Lovable Cloud** (Supabase: Auth, Postgres, Edge Functions, Storage)
- **Vitest** (testovi)

---

## 3. Struktura projekta

```
├── index.html                 # SEO meta, OG, favicon, manifest link
├── public/
│   ├── manifest.webmanifest   # PWA manifest
│   ├── robots.txt
│   └── placeholder.svg
├── src/
│   ├── App.tsx                # Router + providers
│   ├── main.tsx               # Entry
│   ├── index.css              # Tailwind + design tokens
│   ├── pages/                 # Sve rute (vidi sekciju 4)
│   │   └── legal/
│   ├── components/            # App komponente + ui/ (shadcn)
│   │   └── ui/                # Shadcn primitivi
│   ├── hooks/                 # useAuth, useWishlist, useOrders, ...
│   ├── lib/                   # formatPrice, brandLogos, contact, utils
│   ├── assets/                # Logo, hero, ikone (.svg / .png)
│   └── integrations/supabase/ # Client (auto-gen, ne dirati)
└── supabase/
    ├── config.toml
    └── functions/             # Edge funkcije (chat, decode-vin, import-parts)
```

---

## 4. Rute (stranice)

Sve definirano u `src/App.tsx`.

| # | Ruta | Fajl | Pristup | Opis |
|---|------|------|---------|------|
| 1 | `/` | `src/pages/Index.tsx` | Javno | Početna: hero sa pozadinom salona, `SearchPanel` (po dijelu / vozilu / VIN / AI), `AppRatingBar`, `HowToOrder`, `BrandGrid`, `TrustBar`, `InquiryCTA`, `FAQ`, `MarketplaceGrid`, `Footer`. |
| 2 | `/pretraga` | `src/pages/SearchResults.tsx` | Javno | Rezultati pretrage. Lijevo `SearchFilterSidebar`, desno grid/list (`PartCard` / `PartListItem`). Prazno stanje → `SearchNoResultsModule`. |
| 3 | `/dio/:id` | `src/pages/PartDetail.tsx` | Javno | Detalj dijela: `PartImageGallery`, info, cijena, dugmad „Naruči", „Viber narudžba", „WhatsApp", wishlist heart, fake brojač pregleda, info o dostavi. Otvara `OrderSheet`. |
| 4 | `/prijava` | `src/pages/Auth.tsx` | Javno | Prijava + registracija (email/password + Google OAuth). Pozadina sa dark overlayem, legal footer dolje. |
| 5 | `/reset-password` | `src/pages/ResetPassword.tsx` | Javno | Reset lozinke (forma + potvrda). |
| 6 | `/profil` | `src/pages/Dashboard.tsx` | Ulogovan | Korisnički dashboard. Tab preko URL parametra `?tab=orders\|wishlist\|inquiries\|profile`. |
| 7 | `/podrska` | `src/pages/Support.tsx` | Javno | Korisnička podrška: hero, kontakt kartice (telefon, email, Viber, WhatsApp), radno vrijeme. |
| 8 | `/privatnost` | `src/pages/legal/Privatnost.tsx` | Javno | Privatnost i zaštita podataka. |
| 9 | `/uslovi-koristenja` | `src/pages/legal/UsloviKoristenja.tsx` | Javno | Uslovi korištenja. |
| 10 | `/uslovi-kupovine` | `src/pages/legal/UsloviKupovine.tsx` | Javno | Uslovi kupovine. |
| 11 | `/politika-povrata` | `src/pages/legal/PolitikaPovrata.tsx` | Javno | Politika povrata. |
| 12 | `/kolacici` | `src/pages/legal/Kolacici.tsx` | Javno | Politika kolačića. |
| * | `*` | `src/pages/NotFound.tsx` | Javno | 404. |

Globalno (van `<Routes>`, vidljivo na svim stranama): **`ChatAssistant`** — ILMA AI widget, fixed bottom-right.

---

## 5. Layout komponente

| Komponenta | Fajl | Opis |
|------------|------|------|
| `AnnouncementBar` | `src/components/AnnouncementBar.tsx` | Crveni dismissible bar na vrhu, info o dostavi. |
| `TopBar` | `src/components/TopBar.tsx` | Tanki info bar (telefon, jezik). |
| `Header` | `src/components/Header.tsx` | Glavni navbar: logo centriran, linkovi „Pretraži" + „Korisnička podrška", wishlist heart, profil dropdown ili „Prijava". Mobilni meni (hamburger). |
| `Footer` | `src/components/Footer.tsx` | 4-nivoa: benefits bar, glavni dark dio sa linkovima, crveni CTA, legal red. |
| `LanguageSwitcher` | `src/components/LanguageSwitcher.tsx` | Izbornik jezika. |
| `NavLink` | `src/components/NavLink.tsx` | Helper za nav linkove sa underline animacijom. |

---

## 6. Sekcije i moduli

| Komponenta | Fajl | Opis |
|------------|------|------|
| `SearchPanel` | `src/components/SearchPanel.tsx` | Glavni search box sa tabovima (Po dijelu / Po vozilu / VIN / AI chat), glassmorphism UI, animirani prelazi. |
| `VehicleSelector` | `src/components/VehicleSelector.tsx` | 2-koraka odabir marka → model, select-all / clear. |
| `VinInput` | `src/components/VinInput.tsx` | 17-polja VIN unos (3-6-8 format), copy/paste, mobile wrap. |
| `BrandGrid` | `src/components/BrandGrid.tsx` | Grid logoa marki vozila (.webp + text fallback). |
| `SearchBrandGrid` | `src/components/SearchBrandGrid.tsx` | Verzija grida za search sekciju. |
| `CategoryGrid` | `src/components/CategoryGrid.tsx` | Grid kategorija dijelova. |
| `HowToOrder` | `src/components/HowToOrder.tsx` | Sekcija „Kako naručiti" sa koracima. |
| `TrustBar` | `src/components/TrustBar.tsx` | Pojas povjerenja / garancija. |
| `InquiryCTA` | `src/components/InquiryCTA.tsx` | CTA blok „pošalji upit" sa pozadinskom slikom. |
| `FAQ` | `src/components/FAQ.tsx` | 10 pitanja, accordion, full width. |
| `MarketplaceGrid` | `src/components/MarketplaceGrid.tsx` | Kartice za OLX, eBay, Njuškalo. |
| `AppRatingBar` | `src/components/AppRatingBar.tsx` | Ocjene aplikacije ispod heroa. |
| `SearchFilterSidebar` | `src/components/SearchFilterSidebar.tsx` | Filteri u rezultatima pretrage. |
| `PartCard` | `src/components/PartCard.tsx` | Kartica dijela (grid prikaz) sa wishlist heart. |
| `PartListItem` | `src/components/PartListItem.tsx` | Red dijela (list prikaz) sa wishlist heart. |
| `PartImageGallery` | `src/components/PartImageGallery.tsx` | Galerija slika na detalju dijela. |
| `OrderStatusStepper` | `src/components/OrderStatusStepper.tsx` | 4-koraka stepper statusa narudžbe. |
| `SearchNoResultsModule` | `src/components/SearchNoResultsModule.tsx` | Prazno stanje pretrage: forma zahtjeva + dugmad „Pošalji zahtjev" i „Pošalji porukom na Viber". |
| `LegalPageLayout` | `src/components/LegalPageLayout.tsx` | Wrapper za sve pravne stranice. |
| `ChatAssistant` | `src/components/ChatAssistant.tsx` | ILMA AI chat widget: animirani border, prompt flowovi, support kodovi. |

Barrel export: `src/components/index.ts` (trenutno samo `SearchNoResultsModule`).

---

## 7. Modali, sheetovi, overlay

| Element | Fajl / izvor | Tip |
|---------|--------------|-----|
| `OrderSheet` | `src/components/OrderSheet.tsx` | Bočni sheet za narudžbu dijela. Gost flow (hold logika) + ulogovani flow. Dostava 10 KM. |
| `ChatAssistant` panel | `src/components/ChatAssistant.tsx` | Plutajući chat (open/close), poziva edge funkciju `chat`. |
| Profil dropdown | `src/components/Header.tsx` (`DropdownMenu`) | Narudžbe, Lista želja, Zahtjevi, Moj profil, Odjava. |
| Mobilni meni | `src/components/Header.tsx` | Hamburger overlay. |
| `AnnouncementBar` dismiss | `src/components/AnnouncementBar.tsx` | Zatvaranje banner-a. |
| Toasteri | `src/components/ui/toaster.tsx` + `src/components/ui/sonner.tsx` | Globalno mountano u `App.tsx`. |

**Shadcn UI primitivi** (`src/components/ui/*`): `accordion`, `alert-dialog`, `alert`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toggle`, `toggle-group`, `tooltip`.

---

## 8. Autentikacija

- **Provideri:** email/password + Google OAuth.
- **Auto-login** nakon registracije.
- **Reset lozinke:** flow kroz `/reset-password`.
- **Zaštićene rute:** `/profil` (preusmjerava na `/prijava` ako nema sesije).
- **Provider:** `AuthProvider` (iz `src/hooks/useAuth.tsx`) wrappuje cijeli router.
- **Klijent:** `src/integrations/supabase/client.ts` (auto-generisan, ne mijenjati).

---

## 9. Hookovi

| Hook | Fajl | Šta radi |
|------|------|----------|
| `useAuth` | `src/hooks/useAuth.tsx` | Sesija, profil, signIn / signUp / signOut, Google OAuth. |
| `useWishlist` | `src/hooks/useWishlist.ts` | `useWishlistIds()`, `useToggleWishlist()`. |
| `useOrders` | `src/hooks/useOrders.ts` | Narudžbe korisnika i kreiranje. |
| `useInquiries` | `src/hooks/useInquiries.ts` | Zahtjevi za dijelove (no-results forma). |
| `useParts` | `src/hooks/useParts.ts` | Fetch / filter dijelova. |
| `usePwaInstall` | `src/hooks/usePwaInstall.ts` | PWA install prompt. |
| `use-mobile` | `src/hooks/use-mobile.tsx` | Breakpoint detekcija. |
| `use-toast` | `src/hooks/use-toast.ts` | Toast helper. |

---

## 10. Lib helperi

| Fajl | Šta radi |
|------|----------|
| `src/lib/formatPrice.ts` | Bosanski format cijena (`1.000,00 KM`), zaokruženje na 5 KM. |
| `src/lib/brandLogos.ts` | `getBrandLogo(marka)` → URL `.webp` loga sa text fallback. |
| `src/lib/contact.ts` | Centralizovani kontakt brojevi (Viber/WhatsApp). |
| `src/lib/footer-links.ts` | Niz legal linkova za footer. |
| `src/lib/utils.ts` | `cn()` (clsx + tailwind-merge). |

---

## 11. Backend touchpoints (Lovable Cloud / Supabase)

**Klijent:** `import { supabase } from "@/integrations/supabase/client"`.

**Tabele (public schema, sa RLS):**
- `profiles` — korisnički profili.
- `user_roles` — role (admin/moderator/user), čita se preko `has_role()` security-definer funkcije.
- `parts` — katalog dijelova.
- `wishlist` — lista želja po korisniku.
- `orders` — narudžbe (gost + ulogovani).
- `inquiries` — zahtjevi iz „nema rezultata" forme.

**Edge funkcije:** `supabase/functions/`
- `chat` — ILMA AI asistent (proxy prema Lovable AI Gateway).
- `decode-vin` — VIN decoder.
- `import-parts` — import kataloga.

---

## 12. Assets

`src/assets/`

- **Logo:** `ilma-auto-logo.png`, `ilma-auto-logo-round.png`, `ilma-logo.svg`.
- **Hero pozadina:** `hero-bg-ilma.png`.
- **CTA pozadina:** `inquiry-cta-bg.png`.
- **Ikone (SVG):** `viber-icon.svg`, `whatsapp-icon.svg`, `facebook-icon.svg`, `instagram-icon.svg`, `olx-icon.svg`, `ebay-icon.svg`, `njuskalo-icon.svg`.
- **Marketplace logoi (PNG):** `olx-logo.png`, `ebay-logo.png`, `njuskalo-logo.png`.
- **Logoi marki vozila:** `.webp` fajlovi servirani preko `getBrandLogo()` iz `src/lib/brandLogos.ts`.

---

## 13. Design system i konvencije

- **Tipografija:** Poppins (bez serifa).
- **Primarna boja (brand dark):** `#1b2835`.
- **Header background:** `#343535`.
- **Brand crvena:** za CTA i akcente (semantički token).
- **Border radius interaktivnih elemenata:** `rounded-[9px]`.
- **Hover na karticama:** tamniji border, **bez** shadowa.
- **Cijene:** bosanski format `1.000,00 KM`, zaokruženje na najbližih 5 KM.
- **Datumi:** `DD.MM.YYYY`.
- **Pravilo:** boje, gradijenti i sjene se koriste samo preko semantičkih tokena iz `src/index.css` i `tailwind.config.ts`. Bez hardcoded boja u komponentama.
- **Branding:** ne spominjati „Lovable" u javnim meta-podacima ni UI-u.

---

## 14. Kontakt brojevi

- **Centralizovani:** `+387 62 667 700` — `src/lib/contact.ts` (Viber + WhatsApp).
- **Nesinkronizovano (TODO):** `+387 61 454 151` direktno u:
  - `src/pages/PartDetail.tsx` (dugme „Viber narudžba")
  - `src/components/SearchNoResultsModule.tsx` (dugme „Pošalji porukom na Viber")

Viber link format: `viber://chat?number=%2B<broj>&draft=<urlencoded poruka>`.

---

## 15. SEO i meta

- **`index.html`** — `<title>`, `<meta name="description">`, OG / Twitter tagovi, canonical, viewport, favicon, link na `manifest.webmanifest`.
- **`public/manifest.webmanifest`** — PWA manifest.
- **`public/robots.txt`** — crawler pravila.
- Pravila: title < 60 znakova, meta description < 160 znakova, jedan H1 po stranici.

---

## 16. Pokretanje

```bash
npm install
npm run dev      # Vite dev server (default port 8080)
npm run build    # Produkcijski build
npm run preview  # Lokalni preview builda
npm test         # Vitest
```

Sve skripte: vidi `package.json`.

---

## 17. Otvorena pitanja / TODO

- **Unifikacija Viber broja:** `PartDetail` i `SearchNoResultsModule` koriste `+387 61 454 151` umjesto centralizovanog `+387 62 667 700` iz `src/lib/contact.ts`.
- **`src/components/index.ts`** trenutno eksportuje samo `SearchNoResultsModule` — ostale komponente se importuju direktnim putanjama.
- **Brand logoi marki vozila:** periodično dopunjavati `.webp` setove pri dodavanju novih marki.

---

_Snapshot stanja frontenda. Za izmjene strukture rutiranja vidi `src/App.tsx`._
