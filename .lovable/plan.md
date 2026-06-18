# Plan: HANDOFF.md – kompletna mapa frontenda

Kreirati jedan markdown dokument u korijenu projekta koji programer može preuzeti i koristiti kao referencu za daljnji rad na frontendu.

## Šta se radi

Novi fajl: `HANDOFF.md` (u root-u projekta, pored `README.md`).

## Sadržaj dokumenta

1. **Uvod** – kratki opis projekta (ILMA AUTO, B2C platforma za autodijelove, Balkans/EU), preview i published URL.
2. **Tech stack** – React 18, Vite 5, TypeScript 5, Tailwind v3, shadcn/ui, React Router, TanStack Query, Lovable Cloud (Supabase).
3. **Struktura projekta** – stablo glavnih foldera (`src/pages`, `src/components`, `src/components/ui`, `src/hooks`, `src/lib`, `src/assets`, `src/integrations/supabase`, `supabase/functions`).
4. **Rute (stranice)** – tabela svih 12 ruta + 404, sa kolonama: path, fajl, opis, ko može pristupiti (javno / ulogovan).
5. **Layout komponente** – `AnnouncementBar`, `TopBar`, `Header`, `Footer`, `LanguageSwitcher`, `NavLink` – sa opisom gdje se koriste.
6. **Sekcije / moduli** – sve sekcijske komponente (SearchPanel, VehicleSelector, VinInput, BrandGrid, SearchBrandGrid, CategoryGrid, HowToOrder, TrustBar, InquiryCTA, FAQ, MarketplaceGrid, AppRatingBar, SearchFilterSidebar, PartCard, PartListItem, PartImageGallery, OrderStatusStepper, SearchNoResultsModule, LegalPageLayout, ChatAssistant) – sa kratkim opisom uloge.
7. **Modali / sheetovi / overlay** – `OrderSheet`, `ChatAssistant`, profil dropdown, mobilni meni, `AnnouncementBar` dismiss, toaster/sonner, shadcn primitivi (dialog, alert-dialog, sheet, drawer, popover, dropdown-menu, itd.).
8. **Autentikacija** – flowovi (email/password, Google OAuth, auto-login nakon registracije, reset password), zaštićene rute, hookovi.
9. **Hookovi** – `useAuth`, `useWishlist`, `useOrders`, `useInquiries`, `useParts`, `usePwaInstall`, `use-mobile`, `use-toast`.
10. **Lib helperi** – `formatPrice`, `brandLogos`, `contact`, `footer-links`, `utils`.
11. **Backend touchpoints** – Supabase client, korištene tabele (parts, wishlist, orders, inquiries, profiles, user_roles), edge funkcije (`chat`, `decode-vin`, `import-parts`).
12. **Assets** – logo, hero, inquiry CTA, ikone (viber, whatsapp, facebook, instagram, olx, ebay, njuskalo), logoi marki vozila.
13. **Design system / konvencije** – Poppins, primarna boja `#1b2835`, header `#343535`, brand crvena, `rounded-[9px]`, hover bez shadowa, bosanski format cijena `1.000,00 KM`, zaokruženje na 5 KM, datumi `DD.MM.YYYY`.
14. **Kontakt brojevi** – Viber/WhatsApp `+387 62 667 700` (centralizirano u `src/lib/contact.ts`), uz napomenu o nesinkronizovanom `+387 61 454 151` na `PartDetail` i `SearchNoResultsModule`.
15. **SEO / meta** – `index.html`, manifest, robots, favicon.
16. **Skripte za pokretanje** – `npm install`, `npm run dev`, `npm run build` (iz `package.json`).
17. **Poznata otvorena pitanja / TODO** – npr. unifikacija Viber broja.

## Tehnički detalji

- Format: GitHub-flavored markdown, tabele, sekcije sa `##` naslovima.
- Sva interna referenca koristi relativne putanje (`src/...`) tako da programer može direktno kliknuti u editoru.
- Bez mijenjanja postojećeg koda – samo novi fajl.

## Šta NIJE u planu

- Ne mijenjam postojeće komponente.
- Ne dodajem nove rute / funkcionalnosti.
- Ne diram backend ni schema.
