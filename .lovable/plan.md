## Problem

Stranica `/podrska` izgleda kao generički šablon — basic muted hero, mala kartica sa tri outline dugmeta. Ne prati premium UI ostatka sajta (tamne sekcije, crveni akcenti, glassmorphism, zaobljeni interaktivni elementi `rounded-[9px]`, polirane kartice). Plus, padding ispod headera nije usklađen sa novom visinom headera (treba `pt-[128px] lg:pt-[136px]`).

## Redizajn `src/pages/Support.tsx`

### 1. Hero sekcija (premium dark)
- Pozadina: dark `#1b2835` sa suptilnim radijalnim gradijentom + crveni akcent glow.
- Eyebrow tag: "PODRŠKA 24/7" u crvenom kapsuliranom badge-u.
- Naslov H1 (font-display, veći, bijeli): "Tu smo za vas, uvijek".
- Podnaslov (svjetlo-sivi, max-w-2xl).
- Tri brza meta-podatka u redu: "Prosječan odgovor < 5 min", "5000+ riješenih upita", "Pon–Sub dostupni" sa ikonama.
- Padding: `pt-[160px] lg:pt-[180px] pb-20` (kompenzira novi header).

### 2. Glavna mreža kontakta (3 kartice umjesto 3 dugmeta u jednoj kartici)
Grid `md:grid-cols-3 gap-6`, svaka kartica:
- Bijela kartica, `rounded-[9px]`, suptilna ivica, hover: tamnija ivica (bez shadow-a — kako definiše memory).
- Ikona u obojenom kvadratu (Viber=ljubičasta, WhatsApp=zelena, Poziv=crveni brand).
- Naziv kanala + opisni red ("Najbrži odgovor", "Sa slikom dijela", "Direktan poziv").
- Prikaz broja/handle-a.
- CTA dugme u brand stilu (`rounded-[9px]`, brand-red za primary kanal).

### 3. Radno vrijeme + lokacija blok
Dva-kolonska sekcija ispod kartica:
- Lijevo: kartica "Radno vrijeme" sa listom dana (Pon–Pet, Sub, Ned zatvoreno), Clock ikona, naglašen "Sada otvoreno" status badge (zelena tačka koja pulsira).
- Desno: kartica "Sjedište" sa MapPin ikonom, adresom (Ljetinić 8, 74264 Jelah-Tešanj, BiH), i email-om info@ilmaauto.com.

### 4. FAQ teaser sekcija
- Naslov "Često postavljana pitanja".
- 4 najčešća pitanja u accordion stilu (reupotrijebiti `Accordion` ako postoji), ili link na FAQ sekciju.
- CTA dugme "Pogledaj sva pitanja" (brand-red, `rounded-[9px]`).

### 5. CTA traka prije footera
Tamna sekcija (`#1b2835`) sa porukom "Niste pronašli dio?" + crveno dugme "Pošalji upit" (vodi na `/pretraga` ili otvori inquiry modal).

## Stilske konvencije (iz memorije)
- Sve interaktivne komponente: `rounded-[9px]`.
- Hover na karticama: darker border, BEZ shadow-a.
- Tipografija: Poppins, semantic tokens (`text-foreground`, `bg-card`, `text-primary`).
- Bez hardkodiranih boja u komponentama — koristiti postojeće tokene + `brand-red` / `#1b2835` gdje već postoje u CSS-u.

## SEO
- Dodati `<Helmet>` ili native title/meta: title "Korisnička podrška — ILMA AUTO", meta description na bosanskom.
