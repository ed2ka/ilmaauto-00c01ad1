# ILMA AUTO — statična verzija (pixel-perfect frontend)

Ovo je kompletan statični export sajta — sve stranice, svi assetovi, sve lokalno.
Bez Node-a, bez npm install, bez backenda.

## Kako pokrenuti

**Upload na cPanel (preporučeno):**
Prebaci sve fajlove iz ovog foldera u `public_html` (ili poddirektorij) i sve radi.

**Lokalno na svom računaru:**
- Najlakše: dupli klik na bilo koji `.html` fajl (npr. `index.html`).
- Ili pokreni mini server: `python3 -m http.server 8000` u ovom folderu, pa otvori `http://localhost:8000`.

## Šta sadrži

| Stranica | Fajl |
|---|---|
| Početna | `index.html` |
| Pretraga rezultata | `pretraga.html` |
| Detalj dijela | `dio.html` |
| Prijava / Registracija | `prijava.html` |
| Reset lozinke | `reset-password.html` |
| Korisnički profil | `profil.html` |
| Podrška | `podrska.html` |
| Privatnost | `privatnost.html` |
| Uslovi korištenja | `uslovi-koristenja.html` |
| Uslovi kupovine | `uslovi-kupovine.html` |
| Politika povrata | `politika-povrata.html` |
| Kolačići | `kolacici.html` |
| 404 | `404.html` |

Folderi:
- `assets/` — minified CSS bundle i pomoćni assetovi
- `assets-cdn/` — sve slike (hero, CTA pozadina, brand logoi)
- `fonts/` — Poppins font lokalno (woff2)
- `icons/`, `flags/` — favicon, PWA ikone, zastave jezika

## Šta radi

- Cijeli dizajn (typography, boje, layout, hover stanja, responsive)
- Navigacija između stranica (svi linkovi rewritovani na `.html` fajlove)
- Sve slike, fontovi, ikone — lokalno

## Šta NE radi (i zašto)

Ovo je **frontend snapshot**, ne aplikacija. Sljedeće zavisi od backenda i nije uključeno:
- Pretraga dijelova uživo, filtri sa podacima
- Prijava / registracija / Google OAuth
- Narudžbe, košarica, lista želja
- AI chat asistent
- VIN dekoder
- Slanje formi (sve forme su blokirane i pokazuju alert)

Da ovo proradi, potreban je backend (Supabase ili ekvivalent) — koji nije dio statičnog exporta.

## Modifikacija

Tekstove i slike možeš editovati direktno u HTML fajlovima. CSS je u `assets/index-*.css`
(minified — promjene se prave search-replace ili izvoze ponovo iz source projekta).
