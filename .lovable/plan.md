

## Redizajn PartDetail stranice: side-by-side layout na desktopu

Trenutno su slike i detalji poslagani jedno ispod drugog na svim velicinama ekrana. Na desktopu to ostavlja previse praznog prostora. Cilj je napraviti klasican OLX-stil layout: slika lijevo, detalji desno.

### Sta se mijenja

**Layout na desktopu (>=768px): dva stupca**
- Lijeva strana (~55%): glavna slika + thumbnailovi
- Desna strana (~45%): Card sa svim detaljima (naslov, kataloski broj, marka/model, dostupnost, ID)

**Layout na mobilnom (<768px): ostaje vertikalan**
- Slika gore na punoj sirini
- Detalji ispod -- kao sto je sada

**Max-width se povecava na 5xl** da bi side-by-side layout imao dovoljno prostora.

### Layout struktura (desktop)

```text
+--------------------------------------------------+
| TopBar                                           |
| Header                                           |
+--------------------------------------------------+
| Breadcrumbs: Pocetna > AUDI > A3 > EGR          |
| < Nazad                                          |
+-------------------------+------------------------+
| [Slika - aspect 4/3]   | Naziv dijela (h1)      |
|                         | AUDI A3 | 8P 2003-2008 |
| [Thumb] [Thumb] [Thumb] | ---------------------- |
|                         | Kataloski broj         |
|                         | 03G131512AE            |
|                         | ---------------------- |
|                         | Marka       Model      |
|                         | AUDI        A3         |
|                         | ---------------------- |
|                         | Generacija / Godiste   |
|                         | 8P 2003-2008           |
|                         | ---------------------- |
|                         | [Dostupan] badge       |
|                         | ---------------------- |
|                         | ID: 736882             |
+-------------------------+------------------------+
```

### Tehnicke napomene

**Fajl koji se mijenja:**
- `src/pages/PartDetail.tsx`

**Promjene:**
- `max-w-3xl` se mijenja u `max-w-5xl` za vise prostora
- Sekcija sa slikama i Card se omotavaju u `flex flex-col md:flex-row md:gap-8` kontejner
- Slika dobija `md:w-[55%]` i `md:sticky md:top-6` da ostane vidljiva dok korisnik skroluje detalje
- Card sa detaljima dobija `md:w-[45%]`
- Na mobilnom (<md) ostaje vertikalan layout kao dosad
- Aspect ratio slike se mijenja na `aspect-[4/3]` za bolji vizuelni balans u side-by-side layoutu

