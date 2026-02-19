

## Dugmad "Naruci" i "Naruci preko Vibera" sa formom za narudzbu

### Pregled

Dodajemo dva dugmeta na stranicu detalja dijela, kolonu za cijenu u bazu, tabelu za narudzbe, i Sheet (sidebar popup) formu za narudzbu.

### 1. Promjene u bazi podataka

**A) Nova kolona `cijena` u tabeli `parts`**
- Tip: `numeric(10,2)`, nullable, default `NULL`
- Omogucava unos cijena za svaki dio
- Nullable jer mozda nece svi dijelovi imati unesenu cijenu odmah

**B) Nova tabela `orders` za cuvanje narudzbi**
- `id` -- bigint, auto-generated, primary key
- `part_id` -- bigint, referenca na parts.id
- `part_name` -- text (naziv dijela, za brzi pregled)
- `customer_name` -- text (ime i prezime kupca)
- `customer_phone` -- text (broj telefona)
- `customer_address` -- text (adresa za dostavu)
- `part_price` -- numeric(10,2) (cijena dijela u momentu narudzbe)
- `shipping_price` -- numeric(10,2), default 10.00
- `total_price` -- numeric(10,2) (cijena + postarina)
- `status` -- text, default 'nova' (za pracenje statusa)
- `created_at` -- timestamptz, default now()

**C) RLS politike za `orders` tabelu**
- INSERT: dozvoljeno svima (anonimno narucivanje, bez registracije)
- SELECT/UPDATE/DELETE: zabranjen za anonimne korisnike (samo admin pristup)

### 2. Novi fajl: `src/components/OrderSheet.tsx`

Sheet (sidebar popup) komponenta koja se otvara sa desne strane ekrana. Sadrzi:

**Forma sa poljima:**
- Ime i prezime (obavezno, validacija sa zod)
- Broj telefona (obavezno, validacija formata)
- Adresa za dostavu (obavezno)

**Summary sekcija (ispod forme):**
```text
----------------------------------
Artikal:     Stop svjetlo         
Cijena:                  25.00 KM
Dostava:                 10.00 KM
----------------------------------
UKUPNO:                  35.00 KM
----------------------------------
```

- Ako dio nema unesenu cijenu, prikazuje "Cijena po dogovoru" umjesto iznosa, a ukupno se ne racuna
- Postarina je fiksna: 10.00 KM
- Valuta: KM

**Dugme "Potvrdi narudzbu":**
- Validira formu
- Sprema narudzbu u `orders` tabelu
- Prikazuje toast poruku "Narudzba uspjesno poslana!"
- Zatvara Sheet

### 3. Promjene u `src/pages/PartDetail.tsx`

Ispod badge-a dostupnosti, dodaju se dva dugmeta:

**A) "Naruci" dugme**
- Primary stil, puna sirina
- Klikom otvara OrderSheet komponentu

**B) "Naruci preko Vibera" dugme**
- Outline stil, puna sirina, Viber ikona lijevo (ista SVG kao u TopBar)
- Klikom otvara Viber deep link:
  ```
  viber://chat?number=%2B38761454151&draft=[poruka]
  ```
- Poruka se generise dinamicki: naziv dijela, marka, model, godiste + link na stranicu

### 4. Prikaz cijene na kartici detalja

Ispod kataloskoga broja (ili ispod marka/model sekcije), dodaje se nova sekcija "Cijena" koja prikazuje cijenu dijela ako je unesena, ili "Cijena po dogovoru" ako nije.

### Rezime fajlova

| Fajl | Akcija |
|------|--------|
| Migracija: dodaj `cijena` kolonu | Nova SQL migracija |
| Migracija: kreiraj `orders` tabelu | Nova SQL migracija |
| `src/components/OrderSheet.tsx` | Novi fajl |
| `src/pages/PartDetail.tsx` | Izmjena -- dodaj dugmad, cijenu, import OrderSheet |
| `src/hooks/useParts.ts` | Provjera -- da li vraca `cijena` polje |

