

## Kompletna baza autodijelova + pametni chat asistent + stranice

Ovo je veliki korak - formiramo bazu podataka, unosimo artikle, povezujemo pretragu i chat asistenta sa bazom, i kreiramo nove stranice.

---

### 1. Baza podataka - tabela `parts`

Na osnovu JSON podataka, tabela ce imati sljedece kolone:

| Kolona | Tip | Opis |
|--------|-----|------|
| id | bigint (PK) | ID dijela iz originalne baze |
| dio | text | Naziv dijela (npr. "VAKUM PUMPA") |
| broj | text | Kataloski broj (npr. "ENAC46000") |
| marka | text | Marka vozila (npr. "MERCEDES") |
| tip | text | Tip/model vozila (npr. "E") |
| model | text | Generacija/godiste (npr. "W212 2009-2013") |
| slika1 | text | URL prve slike |
| slika2 | text | URL druge slike (nullable) |
| slika3 | text | URL trece slike (nullable) |
| is_available | boolean | Status dostupnosti (default: true) |
| created_at | timestamptz | Datum unosa |

- RLS: tabela je javna za citanje (SELECT), jer su autodijelovi javni katalog
- Kreirace se full-text search indeks na kolonama `dio`, `broj`, `marka`, `tip`, `model` za brzu pretragu
- Bez foreign key-eva na auth.users jer ovo nisu korisnicki podaci

---

### 2. Unos podataka iz JSON-a

- Edge funkcija `import-parts` ce primiti JSON podatke i batch INSERT-ovati ih u bazu
- Mapiranje: `marka1` -> `marka`, `tip1` -> `tip`, `model1` -> `model`
- Oko 500 artikala iz dostavljenog JSON-a

---

### 3. Nove stranice

**a) `/dio/:id` - Stranica detalja dijela**
- Prikazuje sve informacije o dijelu: naziv, kataloski broj, marka, tip, model/godiste
- Galerija slika (1-3 slike) sa mogucnoscu povecanja
- Status dostupnosti
- Dugme "Nazad na pretragu"

**b) `/pretraga` - Stranica rezultata pretrage**
- Grid prikaz dijelova (kartice sa slikom, nazivom, brojem, markom)
- Filteri sa lijeve strane ili na vrhu (marka, tip, naziv dijela)
- Paginacija rezultata
- Klik na karticu vodi na `/dio/:id`

---

### 4. Poboljsanje pretrage u SearchPanel-u

- "Pretrazi" dugme ce pokrenuti pretragu po bazi i navigirati na `/pretraga` sa query parametrima
- Filter pretraga: kombinacija marka + tip + naziv dijela + kategorija
- Pretraga po nazivu: full-text search po `dio` koloni
- Pretraga po kataloskom broju: exact/partial match po `broj` koloni
- Pretraga po broju sasije: za sada placeholder (sasija nije u bazi)
- VehicleSelector ce se popunjavati iz baze (distinct marke i tipovi)
- Broj rezultata ("45018") ce se dinamicki racunati iz baze

---

### 5. Chat asistent - nadogradnja

Trenutni chat asistent ce dobiti nove mogucnosti:

**a) Animacija "tipkanja" pri otvaranju**
- Umjesto instantne poruke, prikazuju se tri tacke (typing indicator) na 1-2 sekunde
- Zatim se pojavljuje poruka dobrodoslice

**b) Pretraga po bazi**
- Edge funkcija `chat` ce dobiti pristup bazi podataka
- AI model ce dobiti tool/function calling mogucnost: `search_parts(marka, tip, dio, broj)`
- Kada korisnik kaze "trebam far za Golf 5", asistent ce pretraziti bazu i vratiti rezultate
- Rezultati se prikazuju kao klikabilne kartice unutar chata sa slikom, nazivom i linkom na `/dio/:id`

**c) System prompt nadogradnja**
- Instrukcija da asistent koristi search_parts funkciju za pretragu
- Kada pronadje dijelove, prikazuje ih kao strukturirane rezultate
- Format odgovora ukljucuje linkove na detalje dijela

---

### 6. Tehnicke izmjene - pregled fajlova

| Fajl | Akcija | Opis |
|------|--------|------|
| SQL migracija | Novi | Kreiranje tabele `parts` sa indeksima i RLS |
| SQL migracija | Novi | DB funkcija `search_parts` za pretragu |
| `supabase/functions/import-parts/index.ts` | Novi | Edge funkcija za batch import artikala |
| `supabase/functions/chat/index.ts` | Izmjena | Dodati pristup bazi i search tool za AI |
| `src/components/ChatAssistant.tsx` | Izmjena | Typing animacija, prikaz rezultata kao kartice |
| `src/components/SearchPanel.tsx` | Izmjena | Povezati pretragu sa bazom, dinamicki broj rezultata |
| `src/components/VehicleSelector.tsx` | Izmjena | Popunjavati marke/tipove iz baze |
| `src/pages/SearchResults.tsx` | Novi | Stranica sa rezultatima pretrage |
| `src/pages/PartDetail.tsx` | Novi | Stranica detalja dijela |
| `src/App.tsx` | Izmjena | Dodati nove rute |
| `src/hooks/useParts.ts` | Novi | React Query hookovi za pretragu i dohvat dijelova |

---

### Redoslijed implementacije

1. Kreirati tabelu `parts` i DB funkciju `search_parts` (migracija)
2. Kreirati edge funkciju `import-parts` i unijeti podatke iz JSON-a
3. Kreirati hook `useParts.ts` za pretragu
4. Kreirati stranicu `PartDetail.tsx` i `SearchResults.tsx`
5. Azurirati `App.tsx` sa novim rutama
6. Povezati `SearchPanel` i `VehicleSelector` sa bazom
7. Nadograditi `chat` edge funkciju sa pristupom bazi
8. Nadograditi `ChatAssistant.tsx` sa animacijom i prikazom rezultata

