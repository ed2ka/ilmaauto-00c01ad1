## Problem
Hero pozadinska slika se "pomjera" kada korisnik mijenja tabove jer SearchPanel mijenja visinu (filter tab je najviši, naziv/kataloški su kraći). Pošto je `background-size: cover` vezan za visinu hero kontejnera, manja visina = drugačiji crop slike.

## Rješenje
Fiksirati visinu hero sekcije na visinu koju ima kada je aktivan "Filter pretraga dijelova" tab (najviši sadržaj). Tako pozadina uvijek ima istu dimenziju kontejnera i crop ostaje identičan bez obzira na aktivni tab.

## Izmjene

**`src/pages/Index.tsx`** — hero `<main>`:
- Dodati fiksni `min-h-[820px] lg:min-h-[880px]` nazad na `<main>` (vrijednost otprilike odgovara visini hero-a kada je filter tab aktivan — VehicleSelector + naziv + kategorija polja).
- Zadržati postojeću pozadinu (`<div>` sa `backgroundImage`, `background-size: cover`, `background-position: center top`).
- Pošto je visina hero-a sada konstantna, SearchPanel može mijenjati svoju visinu unutar centrirane content zone — pozadina ostaje vizuelno identična.

**`src/components/SearchPanel.tsx`** — bez izmjena (tabovi mogu slobodno mijenjati visinu, ne utiče više na pozadinu).

## Tehnička napomena
Razlog zašto prethodno rješenje (`center top` + cover) nije dovoljno: cover skalira sliku da pokrije i širinu i visinu kontejnera. Kada se visina kontejnera smanji, slika se i dalje skalira da pokrije širinu, ali zoom level se mijenja → drugačiji vizuelni crop. Fiksiranjem `min-height` hero kontejnera, ulazni parametri za `cover` ostaju konstantni.
