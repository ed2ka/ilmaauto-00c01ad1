
# Plan: Pre-render React aplikacije u prave HTML fajlove

## Problem
Trenutni `index.html` ima prazan `<body><div id="root"></div></body>`. Cijeli sadržaj (header, hero, kartice, footer, tekstovi) se generiše tek kad browser pokrene JS bundle. "View source" pokazuje prazan div.

## Rješenje: Pre-rendering (Static Site Generation)
Pokrenuću build-ovani sajt u headless Chromium-u, sačekam da React iscrta DOM, pa snimim kompletan HTML svake rute u poseban `.html` fajl. Rezultat: pravi HTML sa sadržajem u `<body>` koji se vidi i bez JavaScript-a.

## Koraci

### 1. Boot built sajta lokalno
- Pokrenem `python3 -m http.server` u `dist/` folderu
- Dodam fallback rewrite preko mini Express servera tako da `/pretraga`, `/dio/1`, itd. svi vraćaju `index.html` (kao Apache `.htaccess`)

### 2. Headless render svake rute
Koristim Playwright (već je u sandbox-u dostupan kao `nix run`) ili Puppeteer. Za svaku rutu:
- `await page.goto('http://localhost:8080/<route>')`
- `await page.waitForLoadState('networkidle')` + dodatnih 500ms da animacije završe
- `const html = await page.content()` — uzima cijeli `<html>` sa renderovanim `<body>`
- Snimim u `dist-static/<route>/index.html`

Rute koje pre-renderujem:
- `/` → `index.html`
- `/pretraga` → `pretraga/index.html`
- `/support` → `support/index.html`
- `/auth` → `auth/index.html`
- `/dashboard` → `dashboard/index.html`
- `/reset-password` → `reset-password/index.html`
- `/404` → `404.html`

(Dynamic rute poput `/dio/:id` ne mogu pre-renderovati jer ovise o ID-u iz baze koja je izrezana — ostaviće se SPA fallback preko .htaccess.)

### 3. Post-processing svakog HTML-a
- `<html lang="en">` → `<html lang="bs">`
- Uklanjam Helmet/React komentare i `data-reactroot` atribute
- Inline-ujem rendered DOM tako da `<body>` sadrži stvarne `<header>`, `<section>`, `<footer>` elemente sa tekstom
- **Zadržavam `<script src="/assets/index-*.js">` tag** — tako da kad korisnik klikne dugme ili otvori meni, React hidrira i preuzima kontrolu (interaktivnost ostaje)
- Stripujem inline Vite HMR scripts ako se pojave

### 4. Apache config za pretty URL-ove
Update `.htaccess` da `/pretraga` prvo proba `pretraga/index.html`, pa tek onda SPA fallback:
```
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.*)$ $1/index.html [L]

# fallback za dinamičke rute (/dio/:id)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### 5. Verifikacija
Za svaki generisani HTML provjerim:
- `<body>` više nije prazan (sadrži stvarne elemente)
- Pojavljuju se ključni stringovi: "ILMA AUTO", "Pretraga", "Podrška"
- `lang="bs"` postavljen
- Nema poziva ka `lovable.app` / `supabase.co` / `googleapis`

### 6. Re-pack ZIP
- Brišem stari `ilma-auto-static.zip`
- Pakujem novi kao `ilma-auto-static-v2.zip` u `/mnt/documents/`
- README ažuriram da opiše šta je gdje

## Šta dobijaš
```
dist/
├── index.html              ← HOME, pun sadržaj u <body>
├── pretraga/index.html     ← pun sadržaj
├── support/index.html      ← pun sadržaj
├── auth/index.html
├── dashboard/index.html
├── 404.html
├── .htaccess               ← pretty URL routing
├── assets/                 ← JS + CSS bundle (za interaktivnost)
├── fonts/poppins/
└── README.txt
```

Sad kad otvoriš bilo koji `.html` fajl u editoru ili "View source", **vidiš stvarni HTML kod sa tekstom, naslovima, klasama, strukturom** — ne prazan div.

## Tehnički detalji
- Pre-rendering alat: Playwright preko `nix run nixpkgs#playwright-driver -- ...` ili `npm install -D playwright` u radnoj kopiji (van glavnog projekta)
- JS bundle se **zadržava** za hidraciju — sajt ostaje interaktivan (mobile menu, accordions, tabs rade)
- Backend stubovi i lokalni fontovi iz prethodnog ZIP-a ostaju identični
- Vrijeme generisanja: ~2-3 minuta (Playwright instalacija + 7 ruta render)

## Ograničenje koje treba znati
Dinamičke rute (`/dio/123`, `/dio/456`) **ne mogu** biti pre-renderovane jer:
- nema baze sa stvarnim ID-evima dijelova
- broj kombinacija beskonačan
Te rute padaju na SPA fallback (kao i sad) — body opet prazan dok JS ne učita. Ako kasnije podigneš svoj Supabase, mogu se pre-renderovati i one (treba lista ID-eva).
