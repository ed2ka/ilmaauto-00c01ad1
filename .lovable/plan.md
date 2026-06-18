
# Standalone statični frontend — lokalni export

Cilj: jedan folder/ZIP koji sadrži kompletan frontend (HTML + CSS + JS + svi assetovi) koji radi otvaranjem `index.html` u browseru, **bez** `npm install`, bez Node-a, bez dev servera.

## Šta će biti uključeno

- Produkcijski Vite build (`dist/`) — minifikovan HTML/CSS/JS.
- Svi CDN assetovi (`/__l5e/assets-v1/...`) skinuti lokalno u `dist/assets-cdn/` i URL-ovi prepisani u JS/CSS bundleu na relativne putanje.
- Svi `public/` fajlovi (favicon, manifest, robots, ikone).
- README sa uputstvom kako pokrenuti lokalno.

## Šta neće raditi u standalone modu (i zašto)

Pošto nema backenda kad se otvori lokalno bez interneta:
- **Lovable Cloud / Supabase pozivi** (login, narudžbe, wishlist, dijelovi iz baze, AI chat, VIN decode) — frontend će se učitati i renderovati UI, ali svi pozivi prema `*.supabase.co` će failati ako nema interneta. Ako ima interneta, radiće normalno (klijent zove production Supabase URL iz `.env`).
- **SPA routing pri otvaranju kroz `file://`** — React Router-u treba `http://`. Stoga je preporuka: koristiti bilo koji statički server (vidi README ispod), ili host na bilo kojem statičnom hostingu (Netlify/GitHub Pages/itd).

## Koraci (build mode)

1. **Build**
   - `npm install` (samo jednom u sandboxu, ne na korisničkoj mašini)
   - `npm run build` → generiše `dist/`

2. **Skidanje CDN assetova lokalno**
   - Skripta `scripts/localize-assets.mjs`:
     - Rekurzivno skenira `dist/` (`.html`, `.css`, `.js`) za sve URL-ove `/__l5e/assets-v1/<id>/<file>`.
     - Skida svaki preko `https://ilmaauto.lovable.app/__l5e/assets-v1/...` u `dist/assets-cdn/<id>/<file>`.
     - Prepisuje sve pojave u bundle fajlovima na relativnu putanju `./assets-cdn/<id>/<file>` (i `assets-cdn/...` u `index.html`).
   - Iste pretrage primijeniti i na `dist/index.html` i `dist/manifest.webmanifest`.

3. **README**
   - `dist/README.md` sa:
     - „Dva načina pokretanja":
       - **Najlakše:** `npx serve dist` ili Python `python3 -m http.server 8080` iz foldera, pa otvoriti `http://localhost:8080`.
       - **Bez ičega instaliranog:** dupli klik na `index.html` (uz upozorenje da SPA rute i Supabase mogu praviti probleme).
     - Napomena o backendu (radi samo uz internet, jer zove production Supabase).

4. **Pakovanje**
   - `cd dist && zip -r ../ilma-auto-static.zip .`
   - Kopirati ZIP u `/mnt/documents/ilma-auto-static.zip` da ga korisnik može preuzeti.

## Tehnički detalji

- Skripta koristi samo Node ugrađene module (`node:fs`, `node:fetch`, `node:path`). Bez novih dependencyja.
- Bazni URL za skidanje: `https://ilmaauto.lovable.app` (production, ima sve uploadovane assetove).
- `index.html` u Vite buildu već koristi relativne `/assets/...` putanje za bundle, pa SPA radi pod bilo kojim statičnim serverom.
- Za apsolutne `/` URL-ove u manifestu/ikonama (`/favicon-ilma.png`, `/icons/apple-touch-icon.png`) — to su `public/` fajlovi, već su u `dist/` nakon builda; ne treba ih skidati.

## Deliverable

- `/mnt/documents/ilma-auto-static.zip` — spreman za download.
- Poruka korisniku sa linkom i kratkim how-to.

## Ograničenja koja vrijedi eksplicitno reći korisniku

- Ovo je **frontend snapshot**, ne self-hosted backend. Ako želi i backend lokalno (vlastiti Supabase + edge funkcije + baza + AI key), to je posebno veliki posao i nije u opsegu ovog plana.
