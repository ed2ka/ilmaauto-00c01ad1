# Zašto dobijaš 404

Aplikacija se učitala (vidiš React komponentu "404 / Return to Home"), ali **router ne prepoznaje URL**.

Razlog: uploadovao si u podfolder `/ilmaautodijelovi/`, a build je napravljen za root (`/`). React Router gleda `location.pathname` i vidi `/ilmaautodijelovi/` — to ne odgovara nijednoj definisanoj ruti (`/`, `/pretraga`, `/podrska`…), pa prikazuje NotFound stranicu.

Pre-renderovan HTML jeste tu (sadržaj se nakratko vidi), ali čim se React pokrene (hydration), zamijeni ga NotFound komponentom.

# Plan: napraviti v4 portable export

Cilj: jedan ZIP koji radi **bilo gdje** — root, podfolder, subdomena, čak i otvoren lokalno preko `file://` (uz HTTP server).

## Šta ću promijeniti samo u export skripti (ne dira glavnu aplikaciju)

1. **Privremeno prebaciti router na HashRouter** prije builda
   - URL-ovi će biti `index.html#/pretraga`, `index.html#/podrska`, itd.
   - Hash dio se ne šalje serveru → nema potrebe za `.htaccess` rewrite pravilima
   - Radi u bilo kojem folderu, na bilo kojoj domeni, bez konfiguracije

2. **Zadržati relativne putanje** (`./assets/...`) iz v3

3. **Pre-render** glavne stranice u `index.html` (sadržaj odmah vidljiv prije JS-a)

4. **Ažurirati `.htaccess`** — ostaje samo za pravilno serviranje fontova/MIME tipova, bez SPA rewrite-a (nije potreban sa hash routerom)

5. **Ažurirati `README.txt`** sa uputstvom:
   - Otpakuj u bilo koji folder na cPanel-u
   - Otvori `index.html` u browseru
   - Radi i u `public_html/`, `public_html/ilmaautodijelovi/`, ili lokalno (preko `python -m http.server`)

## Tehnički detalji

- Skripta `prerender.mjs` privremeno patchuje `src/App.tsx` (`BrowserRouter` → `HashRouter`), pokrene `vite build`, pre-renderuje rute, pa vrati originalni `App.tsx`
- Glavna aplikacija na Lovable-u ostaje na `BrowserRouter` (čiste URL-ove) — patch je samo za static export
- Izlaz: `ilma-auto-static-v4.zip`

## Šta i dalje neće raditi (kao i u v3)

- Pretraga dijelova, login, narudžbe, AI chat (sve što traži backend)
- To zahtijeva da export ima pristup Lovable Cloud backendu — trenutno je sve stubovano

## Pitanje prije implementacije

Da li ti odgovara da URL-ovi izgledaju ovako:
`https://edotuka.com/ilmaautodijelovi/#/pretraga`

Ako ti **mora** biti `…/pretraga` bez `#`, onda umjesto HashRouter-a moram setovati `basename="/ilmaautodijelovi"` — ali to znači da ZIP radi **samo** u tom tačnom folderu (nije portable).