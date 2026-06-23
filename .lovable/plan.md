Plan za popravku standalone static verzije:

1. Napraviti pravi vanilla JS sloj za statički export
- Registracija/prijava: omogućiti klik na tabove i prebacivanje između login/register/reset prikaza.
- Homepage search panel: omogućiti tabove “po vozilu”, “po nazivu”, “po kataloškom broju” i prikaz odgovarajućih polja.
- Dropdowns: napraviti lokalni JS za Radix/shadcn select/dropdown elemente koji su u exportu ostali kao statični HTML.
- FAQ: omogućiti accordion otvaranje/zatvaranje pitanja na homepage.
- Mobile/header meniji: best-effort aktivirati hamburger/dropdown ako postoje u snapshotu.

2. Popraviti stranicu artikla
- Ukloniti stanje koje ostaje na “Učitavanje”.
- Pre-renderovati ili ubaciti statičke podatke za primjer artikla tako da `dio.html` odmah prikazuje kompletan dizajn artikla.
- Linkove ka artiklima iz pretrage povezati na lokalni `dio.html` ili generisane statičke HTML stranice.

3. Ponovo regenerisati/popravljati export
- Zadržati postojeći pixel-perfect CSS i lokalne assete.
- U svaki HTML ubaciti popravljeni `static.js`.
- Provjeriti da nema eksternih CSS/font/image zavisnosti.
- Ponovo zapakovati `ilma-auto-static-pixel.zip`.

4. Verifikacija prije predaje
- Otvoriti `static-out/index.html`, `prijava.html`, `pretraga.html` i `dio.html` lokalno kroz browser.
- Provjeriti: CSS učitan, FAQ radi, tabovi rade, dropdowns rade, registracija tab radi, artikl više ne stoji na “Učitavanje”.
- Tek nakon toga dati novi ZIP za preuzimanje.