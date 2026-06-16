# PWA instalacija preko "Preuzmite aplikaciju" dugmeta

## Cilj
Postojeće dugme u `AppRatingBar` pretvoriti u trigger za instalaciju PWA-e. Dodati svu potrebnu PWA infrastrukturu (manifest, ikone, head tagovi) bez service workera / offline moda — samo "Add to Home Screen".

## 1. Manifest + ikone

**`public/manifest.webmanifest`** (novi fajl):
```json
{
  "name": "ILMA AUTO",
  "short_name": "ILMA AUTO",
  "description": "Originalni autodijelovi — pretraga i narudžba",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1b2835",
  "lang": "bs",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

**Ikone** (`public/icons/`):
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)
- `icon-maskable-512.png` (512×512, sa safe-zone paddingom za maskable)
- `apple-touch-icon.png` (180×180)

Generisati ih sa `imagegen` koristeći ILMA AUTO brand (#1b2835 pozadina, bijeli logo/inicijali).

## 2. `index.html` head tagovi

Dodati:
```html
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#1b2835" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="ILMA AUTO" />
```

## 3. PWA install hook

**`src/hooks/usePwaInstall.ts`** (novi):
- Sluša `beforeinstallprompt` event, sprema ga u state, sprječava default.
- Sluša `appinstalled` event → resetuje prompt.
- Detektuje da li je već instalirano (`display-mode: standalone` ili `navigator.standalone` za iOS).
- Detektuje iOS Safari (gdje `beforeinstallprompt` ne postoji).
- Vraća: `{ canInstall, isInstalled, isIOS, promptInstall() }`.

## 4. `AppRatingBar` izmjena

- Importuje `usePwaInstall`.
- Klik na dugme:
  - Ako `canInstall` → poziva `promptInstall()` (Android/Chrome/Edge native prompt).
  - Ako `isIOS` → otvara mali modal/toast sa instrukcijama "Share → Add to Home Screen".
  - Ako `isInstalled` → dugme se sakriva (ili pokazuje "Aplikacija instalirana" disabled).
  - Ako ništa od navedenog (desktop browser bez podrške) → sakriva dugme.
- Tekst dugmeta promijeniti u "Instaliraj aplikaciju" (ostavlja Download ikonu).

**iOS modal**: jednostavan shadcn `Dialog` sa korak-po-korak uputstvom i Share ikonom.

## 5. Šta NE radim
- Ne dodajem service worker, `vite-plugin-pwa`, Workbox, offline cache, niti registracioni kod (po PWA skill default-u — korisnik traži samo instalaciju, ne offline).
- Ne diram postojeću logiku zvjezdica/rejtinga.

## Tehnički detalji
- TypeScript tip za `BeforeInstallPromptEvent` definisan lokalno u hook-u (nije u standardnim lib-ovima).
- Manifest se referencira sa `/manifest.webmanifest` (Vite servira `public/` iz roota).
- U Lovable preview iframe-u native prompt obično neće raditi — pravi test je na published `.lovable.app` ili custom domeni preko HTTPS-a. Spomenuti to korisniku na kraju.
