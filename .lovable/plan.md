
# Pixel-perfect statični export — sve stranice + svi modali

Cilj: ZIP koji se ubaci na cPanel i otvori `index.html` — izgleda **identično** kao live preview, bez Lovable-a, bez Supabase-a, bez ikakvog backenda. Svaka ruta postaje pravi `.html` fajl. Svi assetovi (slike, fontovi, ikone, brand logoi) lokalni.

## Pristup: prerender preko headless browsera

Pošto je app React SPA, jedini način da dobijemo **pixel-perfect** statični HTML jeste da pustimo build u headless Chromium, pričekamo da se sve odrenderuje, i snimimo finalni DOM + CSS + asset-e za svaku rutu i svaki modal. Ručno prepisivanje u čisti HTML bi bilo na hiljade linija i nikad ne bi bilo identično.

## Šta će biti u ZIP-u

```
ilma-auto-static-pixel/
├─ index.html                    (početna)
├─ pretraga.html                 (rezultati pretrage — mock podaci)
├─ dio.html                      (detalj dijela — mock)
├─ prijava.html                  (login/registracija)
├─ reset-password.html
├─ profil.html                   (dashboard — mock korisnik)
├─ podrska.html
├─ privatnost.html
├─ uslovi-koristenja.html
├─ uslovi-kupovine.html
├─ politika-povrata.html
├─ kolacici.html
├─ 404.html
├─ modali/
│   ├─ ai-chat.html              (otvoren ILMA AI widget)
│   ├─ order-sheet.html          (otvorena narudžba)
│   ├─ vehicle-selector.html     (otvoren odabir vozila)
│   ├─ search-no-results.html    (modal za upit kad nema rezultata)
│   └─ ... (svi ostali modali koje detektujem)
├─ assets/                       (svi JS/CSS chunkovi — minified)
├─ assets-cdn/                   (svi CDN assetovi lokalno)
├─ images/                       (sve fontove, ikonice, brand logoe)
├─ fonts/                        (Poppins lokalno, ne sa Google Fonts)
└─ README.md
```

## Koraci

### 1. Production build sa mock backendom
- `npm run build` u sandboxu.
- Prije builda, mockujem Supabase klijent tako da vraća deterministične podatke (3-4 primjera dijelova, jedan mock user, jedan order). Ovo se radi samo za potrebe snimanja DOM-a, originalni `client.ts` se ne dira u repou — koristim Vite env override u privremenom `.env.prerender`.

### 2. Lokalizacija fontova
- Skidam Poppins woff2 fajlove direktno sa Google Fonts CDN-a u `dist/fonts/`.
- Prepisujem `@import url('https://fonts.googleapis.com/...')` u `index.css` na lokalni `@font-face` blok prije builda.

### 3. Lokalizacija CDN slika
- Skripta `scripts/localize-assets.mjs` (već postoji) — skida sve `/__l5e/assets-v1/...` u `dist/assets-cdn/`.

### 4. Prerender headless Chromium-om
- Pokrećem statički server nad `dist/` na `localhost:8080`.
- Playwright skripta `scripts/prerender.mjs`:
  - Lista ruta + lista modala (sa instrukcijama kako ih otvoriti — npr. „klikni floating AI button" → snimi DOM).
  - Za svaku stavku: `page.goto(url)`, čeka `networkidle`, čeka da nestanu skeletoni, opciono klika trigger za modal, čeka animaciju, pa:
    - `document.documentElement.outerHTML` → snima u `<slug>.html`
    - Skuplja sve `<link rel=stylesheet>` i `<script src>` iz finalnog DOM-a (već su lokalni jer su iz `dist/`).
  - Prepisuje sve `href="/pretraga"` linkove na `href="pretraga.html"` itd. da SPA navigacija radi kao klasično multi-page (klik na link otvara drugi fajl).
  - Uklanja `<script type="module" src="/assets/index-*.js">` jer React više ne treba — DOM je već snimljen. Ostavlja samo CSS i opciono mali vanilla JS za:
    - Mobilni meni toggle
    - Akkordeon (FAQ)
    - Dismiss announcement bar
    - Otvaranje/zatvaranje modala (čistim `<dialog>` + JS, ~50 linija)

### 5. Vanilla interakcije (minimalni JS)
Pišem mali `static.js` (~100 linija) koji oživi:
- Hamburger meni
- FAQ akkordeon
- Dismiss announcement bar (localStorage)
- AI chat floating button → otvori statičnu poruku „Demo statična verzija — za AI chat koristite live verziju"
- Forme: `e.preventDefault()` + alert „Ovo je statična verzija, forme nisu aktivne"

### 6. README
- Kako otvoriti: dupli klik na bilo koji `.html`, ili upload na cPanel kao što jest.
- Šta radi: izgled, navigacija, akkordeon, mobilni meni, modali (kao statične slike stanja).
- Šta NE radi: pretraga uživo, login, narudžbe, AI chat — to su backend funkcionalnosti, izričito zamijenjene plaćeholderima.

### 7. Pakovanje
- `zip -qr /mnt/documents/ilma-auto-static-pixel.zip .` iz korijena outputa.

## Tehnička ograničenja koja korisnik mora znati

- **Pixel-perfect je za jedan viewport po snimku.** Snimam svaku stranicu na desktop (1440px) i mobilnom (390px) viewportu → duplikat HTML fajlova: `index.html` i `index.mobile.html`, ili — bolje — koristim jedan HTML sa već postojećim Tailwind responsive klasama (one su CSS, ne JS), pa radi na svim širinama. **Idem ovim drugim putem.**
- **Dinamični sadržaj (rezultati pretrage, lista dijelova)** snimljen je sa mock podacima. Ako korisnik želi prave dijelove, treba ih ručno editovati u HTML-u.
- **Hover/focus stanja** su CSS — rade. **Stanja sa state-om** (otvoreni dropdown, toast notifikacije) snimljena su kao zasebne varijante u `modali/`.
- **Animacije i tranzicije** — CSS animacije rade, framer-motion animacije rade samo prvi put (jer React više ne diže komponente); za standalone verziju to je prihvatljivo.

## Deliverable

`/mnt/documents/ilma-auto-static-pixel.zip` — spreman za upload na cPanel kao obični static site.

## Procjena obima

- ~13 ruta × prosječno 1 fajl + ~6 modala = ~20 HTML fajlova
- ~50-80 CDN assetova
- Poppins font (5 weighta × woff2) ~150 KB
- Bundle CSS ~80 KB (ostavljamo), bundle JS ~600 KB (uklanjamo, ne treba)
- Krajnji ZIP: očekivano 3-8 MB

Reci „idemo" i krećem.
