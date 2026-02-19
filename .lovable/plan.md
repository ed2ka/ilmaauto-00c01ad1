

## Kompletni redizajn stranice rezultata pretrage

Inspirisano screenshotom koji si podijelio (OLX stil), stranica pretrage ce dobiti profesionalan izgled sa sidebar filterima, grid/list toggleom, breadcrumbovima i slikama koje popunjavaju cijeli prostor.

### Sta se mijenja

**1. Slike popunjavaju cijeli prostor kartice**
- Zamjena `object-contain` sa `object-cover` -- slike ce uvijek popuniti kontejner bez praznog prostora
- Aspect ratio ostaje konzistentan (4:3 umjesto 1:1 za realističniji prikaz)

**2. Breadcrumb navigacija**
- Pocetna > Rezultati pretrage > [Marka] > [Model]
- Koristi postojeci Breadcrumb komponent iz `src/components/ui/breadcrumb.tsx`
- Prikazuje se ispod headera kao tanka traka

**3. Toolbar sa prikazom i sortiranjem**
- "Prikaz" toggle sa Grid i List ikonom (LayoutGrid, List iz lucide-react)
- "Sortiraj" dropdown (desno) -- Najnovije, Naziv A-Z, Naziv Z-A
- Broj rezultata prikazan u naslovu

**4. Lijevi sidebar sa filterima**
- Naslov "FILTERI" sa "Resetuj" dugmetom
- Aktivni filteri prikazani kao badge-ovi sa X za uklanjanje
- Filter za marku (dropdown sa svim markama iz baze)
- Filter za model/tip (dropdown zavisan od odabrane marke)
- Filter za naziv dijela (tekstualni input)
- Na mobilnom: sidebar se sakriva, pristupa se preko "Filteri" dugmeta

**5. Dva nacina prikaza**
- Grid: kartice u 3 kolone (sa slikom gore, info dole) -- slicno screenshotu
- List: horizontalni redovi (slika lijevo 100px, detalji desno)

**6. Poboljsane kartice**
- Slika 4:3 aspect ratio sa `object-cover`
- Naziv dijela (bold), marka + tip, kataloski broj, model/godina

### Layout struktura

```text
+------------------------------------------+
| TopBar                                   |
| Header                                   |
+------------------------------------------+
| Breadcrumbs: Pocetna > Pretraga > AUDI   |
+------------------------------------------+
| Prikaz: [Grid][List]    Sortiraj: [v]    |
+----------+-------------------------------+
| FILTERI  |                               |
| [Resetuj]|  Grid/List rezultata          |
|          |                               |
| Marka  v |  [Card] [Card] [Card]         |
| Model  v |  [Card] [Card] [Card]         |
| Naziv  _ |                               |
|          |  Paginacija                    |
+----------+-------------------------------+
```

### Tehnicke napomene

**Fajlovi koji se kreiraju:**
- `src/components/SearchFilterSidebar.tsx` -- sidebar sa filterima, koristi `useBrands()` i `useModels()` hookove, azurira URL parametre preko `useSearchParams`
- `src/components/PartCard.tsx` -- kartica za grid prikaz sa `object-cover` slikama
- `src/components/PartListItem.tsx` -- red za list prikaz

**Fajlovi koji se mijenjaju:**
- `src/pages/SearchResults.tsx` -- kompletni redizajn: dodavanje breadcrumbova, sidebara, toolbara, grid/list toglea, sortiranja

**Koristeni postojeci komponenti:**
- `Breadcrumb` iz `src/components/ui/breadcrumb.tsx`
- `useBrands()` i `useModels()` iz `src/hooks/useParts.ts`
- `Select` iz `src/components/ui/select.tsx` za sort dropdown
- Ikone iz lucide-react: `LayoutGrid`, `List`, `SlidersHorizontal`, `RotateCcw`, `X`

**Sidebar na mobilnom:**
- Na ekranima < 768px sidebar se sakriva
- Prikazuje se "Filteri" dugme koje otvara Sheet (slide-in panel) sa filterima
- Na desktopu sidebar je uvijek vidljiv (w-64, lijevo)

**Sortiranje:**
- Lokalno sortiranje rezultata (client-side) po: najnovije, naziv A-Z, naziv Z-A
- Ne zahtijeva izmjene u bazi

