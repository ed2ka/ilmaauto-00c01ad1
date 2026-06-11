# Plan konverzije ILMA AUTO → vanilla HTML/CSS/JS

Cilj: identičan dizajn i ponašanje, bez React/Vite/TS/Supabase, spreman za PHP/MySQL backend. Isporuka kao ZIP u `/mnt/documents/ilma-vanilla.zip`. Postojeći React projekat ostaje netaknut.

## 1. Struktura izlaznog projekta

```text
ilma-vanilla/
├── index.html              (Po\u010detna - hero + SearchPanel + brendovi + FAQ)
├── pretraga.html           (SearchResults - sidebar filteri, grid/list)
├── detalj-dijela.html      (PartDetail - galerija, OrderSheet, Viber/WhatsApp)
├── prijava.html            (Auth - login + registracija tabovi)
├── reset-password.html
├── profil.html             (Dashboard - tabovi: orders/wishlist/inquiries/profile)
├── podrska.html            (Support)
├── 404.html
│
├── assets/
│   ├── css/
│   │   ├── styles.css      (Tailwind kompajliran, sve klase koje se koriste)
│   │   └── fonts.css       (Poppins @font-face ili Google Fonts link)
│   ├── js/
│   │   ├── api.js          (servisni sloj: getParts, getPartById, getOrders, ...)
│   │   ├── mock-data.js    (~25 dijelova, 3 narud\u017ebe, 2 upita, wishlist)
│   │   ├── auth.js         (login/register/logout - localStorage mock session)
│   │   ├── format.js       (formatPrice BAM format, formatDate DD.MM.YYYY)
│   │   ├── ui.js           (modali, dropdown, tabovi, mobile menu, accordion)
│   │   ├── header.js       (renderuje header + announcement bar na svaku stranicu)
│   │   ├── footer.js       (renderuje footer)
│   │   ├── search-panel.js (tabovi pretrage, VIN input maska, vehicle selector)
│   │   ├── search-results.js
│   │   ├── part-detail.js  (galerija, order sheet)
│   │   ├── dashboard.js
│   │   ├── chat.js         (ChatAssistant widget, mock streaming odgovori)
│   │   └── pages/...       (po potrebi specifi\u010dna logika)
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── brand-logos/*.webp
│   │   └── icons/*.svg
│   └── vendor/
│       └── (opcionalno: alpine.js ili sli\u010dno - NE\u0106E se koristiti, sve vanilla)
│
├── README.md               (kratak vodi\u010d za PHP dev-a)
└── API.md                  (puni ugovor svih endpointa)
```

## 2. CSS strategija - Tailwind → statički CSS

- Pokrenem jednokratan Tailwind CLI build nad postojećim React izvorom da generišem **jedan `styles.css**` sa svim klasama koje aplikacija koristi.
- Custom HSL design tokeni iz `src/index.css` (background, primary, header, tab-inactive, rating itd.) prenose se kao `:root` CSS varijable.
- Custom fontovi (Poppins) i animacije (fade-in, fade-in-up) prenose se kao @keyframes u istom fajlu.
- Rezultat: PHP dev linkuje `<link rel="stylesheet" href="/assets/css/styles.css">` i ne treba Node.js.

## 3. Servisni sloj (`api.js`) — ugovor sa PHP backendom

Sve funkcije prvo gađaju mock, ali su pripremljene za `fetch()` zamjenu. Primjer:

```js
// api.js
const API_BASE = ""; // PHP dev postavi npr. "/api"
const USE_MOCK = true; // PHP dev postavi false

export async function getParts({ marka, tip, dio, broj, page = 1 } = {}) {
  if (USE_MOCK) return mockSearchParts({ marka, tip, dio, broj, page });
  const url = new URL(`${API_BASE}/parts`, location.origin);
  Object.entries({ marka, tip, dio, broj, page }).forEach(([k,v]) => v && url.searchParams.set(k,v));
  const r = await fetch(url); if (!r.ok) throw new Error(r.statusText);
  return r.json();
}
```

Funkcije koje API sloj izlaže (1:1 sa postojećim Supabase pozivima):


| Funkcija                                   | PHP endpoint         | Method              |
| ------------------------------------------ | -------------------- | ------------------- |
| `getParts(filters)`                        | `/api/parts`         | GET                 |
| `getPartById(id)`                          | `/api/parts/{id}`    | GET                 |
| `getPartsCount()`                          | `/api/parts/count`   | GET                 |
| `createOrder(payload)`                     | `/api/orders`        | POST                |
| `getMyOrders()`                            | `/api/orders`        | GET                 |
| `createInquiry(payload)`                   | `/api/inquiries`     | POST                |
| `getMyInquiries()`                         | `/api/inquiries`     | GET                 |
| `getWishlist()` / `toggleWishlist(partId)` | `/api/wishlist`      | GET/POST/DELETE     |
| `login(email, password)`                   | `/api/auth/login`    | POST                |
| `register(payload)`                        | `/api/auth/register` | POST                |
| `logout()`                                 | `/api/auth/logout`   | POST                |
| `getProfile()` / `updateProfile(payload)`  | `/api/profile`       | GET/PUT             |
| `resetPassword(email)`                     | `/api/auth/reset`    | POST                |
| `decodeVin(vin)`                           | `/api/decode-vin`    | POST                |
| `chat(messages)`                           | `/api/chat`          | POST (SSE ili JSON) |


Svaki endpoint detaljno dokumentovan u `API.md` (request body, response shape, primjeri).

## 4. Mock podaci (`mock-data.js`)

- 25 dijelova sa svim poljima: `id, dio, broj, marka, tip, model, slika1..3, is_available, cijena, opis`.
- 3 narudžbe sa različitim statusima (4-step stepper).
- 2 upita (part_inquiries) sa različitim statusima.
- 1 testni user u localStorage (email/password: `test@ilma.ba` / `test123`).
- Wishlist od 4 dijela.
- Brendovi sa logo path-ovima (.webp) i fallback tekstom.

## 5. Vanilla zamjene za React komponente


| React komponenta                        | Vanilla pristup                                                |
| --------------------------------------- | -------------------------------------------------------------- |
| `Header` + `AnnouncementBar` + `TopBar` | `header.js` injectuje HTML u `<header data-shared>`            |
| `Footer`                                | `footer.js` injectuje HTML u `<footer data-shared>`            |
| `SearchPanel` tabovi                    | `data-tab` atributi + click handler u `search-panel.js`        |
| `VehicleSelector` (2 koraka)            | Modalni popover sa scrollable listom marki/modela              |
| `VinInput` (3-6-8 grupisanje)           | 3 input polja sa auto-advance i paste handler                  |
| `Dropdown menu` (header profil)         | `<details>` ili custom click+outside-click handler             |
| `Dialog`/`Sheet` (OrderSheet, modali)   | `<dialog>` element + `showModal()`                             |
| `Accordion` (FAQ)                       | `<details><summary>`                                           |
| `Toast` (sonner)                        | Mini vanilla toast u `ui.js` (queue + auto-dismiss)            |
| `react-router`                          | Obične HTML stranice, query params preko `URLSearchParams`     |
| `useAuth` context                       | `auth.js` sa localStorage + custom `authChange` event          |
| `tanstack-query`                        | Direktni `await api.getX()` pozivi, manual loading state       |
| `framer-motion`                         | CSS animacije/transitions (fade-in već definisane)             |
| `lucide-react` ikone                    | Inline SVG snippets izvučeni iz Lucide (ili `<i data-lucide>`) |
| `ChatAssistant`                         | Floating widget sa mock streaming (setInterval chunkovi)       |


## 6. AI Chat — mock implementacija + API ugovor

Frontend ostaje vizuelno identičan (floating button, panel, history u localStorage `ilma-ai-messages`, animirani border, prompt opcije). 

Umjesto Supabase edge funkcije, `api.chat(messages)` simulira streaming:

- Ako poruka sadrži "audi", "bmw", "far", itd. → vraća mock odgovor sa `[SEARCH_LINK:MARKA:TIP:DIO:timestamp]` markerom.
- Frontend parser ostaje isti i renderuje dugme za pretragu.
- Loading dots i postupno ispisivanje teksta zadržani.

PHP ugovor (u `API.md`):

```
POST /api/chat
Body: { messages: [{role:"user"|"assistant", content:"..."}] }
Response (SSE preporu\u010deno): event-stream sa "data: {delta:'...'}\n\n" + finalni "data: [DONE]"
Alternativa: JSON { content: "..." } - frontend podr\u017eava oba.

POST /api/decode-vin
Body: { vin: "17-char-string" }
Response: { marka: "AUDI", tip: "A6", godina: 2015 } ili { error: "..." }
```

## 7. Funkcionalnosti koje se zadržavaju 1:1

- Responsive (mobile menu hamburger, mobile sticky elements).
- Bosanski cjenovni format (`formatPrice` portovan u JS).
- DD.MM.YYYY datumi.
- Round-to-5 KM logika.
- Wishlist heart toggle (localStorage + sinhronizacija sa dashboard tabom).
- Tab sinhronizacija sa URL (`?tab=orders` itd.) preko `URLSearchParams` + `history.replaceState`.
- Glassmorphism efekti, hover stanja bez sjenki, `rounded-[9px]`.
- Animirani crveni underline na nav linkovima.
- FAQ akordeon.
- Order stepper (4 koraka).
- Fake brojači (parts found 24h, view counters) — preko `sessionStorage`.

## 8. Šta se uklanja

- Cijeli `src/integrations/supabase/`, `supabase/functions/`, `supabase/config.toml`.
- Sve Lovable-specifične zavisnosti (`@lovable.dev/*` ako postoje).
- Vite/Tailwind/TS/ESLint config — PHP dev ne treba ništa od ovoga.
- `package.json`, `bun.lock`, `node_modules` — nema.
- Google OAuth dugme prikazano je, ali otvara modal "Konfigurisati na backendu" jer OAuth zahtijeva server-side flow (dokumentovano u API.md kao `GET /api/auth/google`).

## 9. Tehnički detalji izvršenja

1. Pokrenem Tailwind CLI nad React izvorom da generišem `styles.css` koji obuhvata sve klase (bez purge greški).
2. Skinem koristene fontove i sve slike (hero, brand logoi, ikone) u `assets/`.
3. Za svaku stranicu ručno portujem JSX → semantički HTML (zadržavam iste Tailwind klase pa CSS samo radi).
4. Portujem hooks/utility u plain JS module (ES modules sa `<script type="module">`).
5. Napišem `README.md` (instalacija na Apache/Nginx, kako uključiti PHP) i `API.md` (svi endpointi).
6. QA: otvorim svaki `.html` fajl, provjerim layout, mobile prikaz, klikove (modali, tabovi, dropdown, formaze, chat widget).
7. Spakujem sve u `/mnt/documents/ilma-vanilla.zip` i isporučim kao artefakt.

## 10. Ograničenja koja je dobro znati

- **Google OAuth** ne može raditi čisto frontend — PHP backend mora implementirati OAuth callback.
- **AI chat** će vraćati samo mock odgovore dok PHP ne implementira `/api/chat`.
- **VIN decoder** mock vraća pseudo-rezultat za poznate VIN-ove iz mock liste; pravi decode zahtijeva PHP+vanjski API (npr. NHTSA).
- **Realtime** (Supabase realtime) — nema vanlla zamjene; PHP dev može dodati WebSocket/SSE po potrebi.
- **Slike dijelova** — mock koristi placeholder URL-ove; pravi sistem zahtijeva PHP upload endpoint.

## 11. Procjena obima

~8 HTML fajlova, ~15 JS modula, 1 CSS bundle, ~25-40 slika/ikona. Tipovan ZIP ~3-6 MB. Generišem sve u jednom prolazu i isporučim kao download.

---

**Nakon "Implement plan"**: krećem od Tailwind builda, pa skeleta HTML stranica, pa JS modula, pa QA, pa ZIP. Sve unutar projekta u privremenom folderu `/tmp/ilma-vanilla/`, a finalni rezultat u `/mnt/documents/`. Postojeći React projekat se ne dira.  
  
  
  


**Potvrđujem sve navedeno.**

**Molim te da sada generišeš kompletan ZIP paket vanilla HTML/CSS/JS verzije projekta u /mnt/documents/ za download.**

**Važno:**

**konvertuj cijelu aplikaciju, ne samo home page**

**uključi sve stranice koje postoje u React projektu**

**uključi sve modale, forme, dropdown menije, tabove i UI interakcije**

**zadrži dizajn što bliže 1:1 postojećoj React verziji**

**uključi mock podatke i fetch wrapper servisni sloj**

**uključi API dokumentaciju za PHP backend**

**postojeći React projekat ne dirati**

**Konačni ZIP treba biti spreman za PHP programera kao samostalni HTML/CSS/JS frontend paket.**