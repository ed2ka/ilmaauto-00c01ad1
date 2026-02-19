
## Redizajn stranice detalja dijela (OLX stil)

Trenutno detalji dijela izgledaju "sirovo" -- informacije su rasporedene u dva stupca (slike lijevo, detalji desno) bez vizualnog razdvajanja sekcija. Cilj je postici izgled slican OLX oglasu iz slike 1.

### Sta se mijenja

**1. Layout: slike gore, detalji ispod (na cijeloj sirini)**
- Umjesto side-by-side grida, slike zauzimaju punu sirinu na vrhu
- Ispod slika dolaze detalji u karticama (Card komponent)

**2. Naslov dijela -- velika, boldana sekcija**
- Naziv dijela (h1) prikazan velikim fontom, slicno OLX naslovu
- Ispod naslova: marka + tip kao podnaslov

**3. Detalji u odvojenim karticama**
- **Kartica 1**: Kataloski broj, Marka/Model grid, Generacija/Godiste -- sa Separator komponentom izmedju
- **Kartica 2**: Status dostupnosti (Dostupan/Nije dostupan)
- Svaka sekcija vizualno odvojena linijom (Separator) kao na OLX-u

**4. Breadcrumb navigacija**
- Pocetna > [Marka] > [Model] > [Naziv dijela]
- Zamjenjuje trenutno "Nazad" dugme (koje ostaje kao dodatna opcija)

**5. ID na dnu, suptilno**
- ID: 736882 ostaje na dnu kao mala siva oznaka

### Tehnicke napomene

**Fajl koji se mijenja:**
- `src/pages/PartDetail.tsx` -- kompletni redizajn layouta

**Koristeni postojeci komponenti:**
- `Card`, `CardContent` iz `src/components/ui/card.tsx`
- `Separator` iz `src/components/ui/separator.tsx`
- `Breadcrumb` komponenti iz `src/components/ui/breadcrumb.tsx`
- Ikone iz lucide-react: `ArrowLeft`, `Check`, `X`, `Eye`, `Share2`

**Nova struktura:**
```text
+------------------------------------------+
| TopBar                                   |
| Header                                   |
+------------------------------------------+
| Breadcrumbs: Pocetna > AUDI > A3 > EGR   |
+------------------------------------------+
|  [Slika - puna sirina, aspect 16:9]     |
|  [Thumbnail] [Thumbnail] [Thumbnail]     |
+------------------------------------------+
|  Naziv dijela (h1, bold, velik)          |
|  AUDI A3 | 8P 2003-2008                  |
|  ----------------------------------------|
|  Kataloski broj                          |
|  03G131512AE                             |
|  ----------------------------------------|
|  Marka          Model                    |
|  AUDI            A3                       |
|  ----------------------------------------|
|  Generacija / Godiste                    |
|  8P 2003-2008                            |
|  ----------------------------------------|
|  [Dostupan] badge                        |
|  ----------------------------------------|
|  ID: 736882                              |
+------------------------------------------+
```

**Slike:**
- Glavna slika: aspect-[16/9] sa `object-cover` umjesto object-contain
- Thumbnailovi ostaju isti (w-20 h-20)
- Max-width 3xl za sadrzaj ispod slika
