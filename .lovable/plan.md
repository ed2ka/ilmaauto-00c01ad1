## Problem

Trenutni `/tmp/ilma-vanilla/` paket koristi pogrešan pristup: svaka HTML stranica je prazan skelet sa par `<div id="mount">` elemenata, a sav sadržaj (header, footer, hero tekst, search panel, tabovi, brand grid, FAQ, rating bar, dashboard tabovi, forme) crta JavaScript u runtime.

Posljedice:
- Otvaranje `index.html` direktno (file:// ili statički preview) prikazuje praznu stranicu — to vidiš na screenshot-u.
- PHP programer otvori `index.html` i ne vidi gotovo ništa — mora čitati i prevoditi JS module da bi razumio strukturu.
- SEO ne postoji (Google crawler vidi prazan body).
- Nema graceful degradation ako JS pukne.

## Rješenje

Preokrenuti pristup: **sav statički sadržaj se piše direktno u HTML**, a JavaScript koristi se samo za:
- interakciju (tab switching, modali, dropdown, accordion toggle gdje treba progressive enhancement)
- API pozive (`getParts`, `createOrder`, `chat`, itd.)
- dinamičke liste koje stvarno dolaze iz baze (rezultati pretrage, narudžbe, wishlist)

Sve ostalo (header markup, footer markup, hero, statička FAQ pitanja, statička lista brendova, dashboard nav, auth forme, podrška kartice) ide direktno u HTML kao gotov kod.

## Šta se mijenja u svakom fajlu

### `index.html` (početna)
Inline HTML za:
- Announcement bar (crveni baner sa porukom o dostavi)
- TopBar (social ikone, "ILMA AUTODIJELOVI..." tekst)
- Header (logo, nav linkovi: Početna, Pretraga, Podrška, Profil/Prijava)
- Hero sekcija (slika + overlay)
- Search panel (sva 3 taba sa formama: Po vozilu, Po broju, Po VIN-u)
- Rating bar
- Brand grid (svih 18 brendova kao `<a>` linkovi sa logoima)
- FAQ akordeon (10 stavki sa pitanjima i odgovorima, koristi `<details><summary>`)
- Footer (4-level: CTA + benefits + glavni footer + copyright)

JS samo: dismiss announcement bar, mobile menu toggle, tab switching unutar search panela, popunjavanje modela kad se odabere marka (čita iz `mock-data.js`), AI chat widget.

### `pretraga.html`
Inline HTML: header, sidebar filteri (sa svih 18 brendova kao `<option>`), grid/list toggle dugmad, footer.

JS samo: čita `?marka=...` iz URL-a, zove `getParts()`, renderuje rezultate u `#results-list`, handle "Pošalji upit" modal.

### `detalj-dijela.html`
Inline HTML: header, breadcrumbs skeleton, galerija placeholder (3 slike), info blok layout, Viber/WhatsApp dugmad, footer, `<dialog>` za narudžbu sa kompletnom formom (full_name, phone, email, address, breakdown cijene).

JS samo: čita `?id=...`, zove `getPartById()`, popunjava postojeće `<span>`/`<img>` elemente (npr. `document.getElementById('part-title').textContent = p.dio`), otvara dialog.

### `prijava.html`
Inline HTML: kompletna login forma i register forma sa svim poljima (skrivena dok se ne odabere tab), tab dugmad, Google dugme, link za reset.

JS samo: tab toggle (show/hide), submit handler koji zove `login()`/`register()`.

### `reset-password.html`
Inline HTML: cijela forma već postoji — samo dodati header/footer markup.

### `profil.html`
Inline HTML: header, dashboard nav sa 4 taba + logout dugme, kontejneri za svaku tab sekciju sa skeleton/loading porukama:
- "Moje narudžbe" — prazna tabela sa kolonama
- "Lista želja" — grid kontejner
- "Moji upiti" — lista kontejner
- "Podaci profila" — forma sa svim poljima (full_name, phone, address)

JS samo: tab show/hide, popunjavanje dinamičkih lista (`getMyOrders`, `getWishlist`, `getMyInquiries`), profile update.

### `podrska.html`
Inline HTML: hero sekcija, 3 kontakt kartice, mapa placeholder, kontakt forma, header, footer. Već je skoro kompletno — proširiti sa formom i radnim vremenom.

### `404.html`
Već je OK — samo dodati pravi header/footer markup umjesto `<div id="shared-header">`.

## Šta se izbacuje

- `assets/js/header.js` — više ne ubacuje markup, postaje mali fajl koji samo radi mobile menu toggle, announcement dismiss, active link highlight.
- `assets/js/pages/home.js` — postaje 30-40 linija (samo tab switch + form submit redirekt + popunjavanje modela select-a).
- `<div id="shared-header">`, `<div id="rating-bar-mount">`, `<div id="brand-grid-mount">`, `<div id="faq-mount">`, `<div id="shared-footer">` — sve uklonjeno iz HTML-a, zamijenjeno pravim markupom.

## Šta se zadržava iz trenutnog ZIP-a

- `assets/css/styles.css` (Tailwind build) — radi kako treba.
- `assets/js/api.js` — servisni sloj (mock + fetch wrapper) ostaje 1:1.
- `assets/js/mock-data.js` — ostaje 1:1.
- `assets/js/auth.js`, `format.js`, `chat.js`, `ui.js` — ostaju 1:1.
- `assets/images/` — sve slike i ikone ostaju.
- `README.md`, `API.md` — ostaju, dopunjava se napomena da je sav statički markup u HTML-u i da PHP može direktno ubaciti `<?php include 'header.html'; ?>` ako želi.

## Bonus za PHP

Header i footer markup će postojati i kao samostalni fajlovi:
- `partials/header.html`
- `partials/footer.html`

Tako PHP programer može jednostavno:
```php
<?php include __DIR__ . '/partials/header.html'; ?>
```

I izbjegne dupliranje. (Trenutno HTML stranice će imati inline markup jer otvaranje `.html` direktno mora raditi bez PHP-a.)

## Procjena obima

8 HTML stranica, svaka 200-400 linija inline markup-a + linkovi na CSS/JS. Cijela isporuka:
- HTML: ~2500 linija ukupno
- JS smanjen za ~40% (jer markup-render funkcije nestaju)
- Identičan vizuelni rezultat

## Izlaz

Novi ZIP: `/mnt/documents/ilma-vanilla-v2.zip` (ostavljam i v1 za poređenje), spreman za download. Otvaranje bilo koje HTML stranice direktno u browseru prikazuje kompletan dizajn — bez praznih ekrana.

---

**Pitanje prije implementacije:** Da li želiš da i dalje koristim Tailwind klase u HTML-u (kao što sada radi), ili da migriram na semantičke klase u CSS-u (npr. `.btn-primary` umjesto `bg-primary text-primary-foreground rounded-[9px] py-2.5`)? Tailwind je brži za mene da napišem 1:1, ali semantičke klase su čistije za PHP dev-a. **Preporučujem da ostanemo na Tailwind klasama** jer CSS bundle je već izgrađen i radi.
