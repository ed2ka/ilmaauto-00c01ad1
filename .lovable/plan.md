

## Dodavanje BrandGrid-a na /pretraga i povezivanje sa kategorijama

### 1. Kreiranje novog hook-a za dohvat marki po kategoriji

Novi hook `useBrandsByCategory` u `src/hooks/useParts.ts` koji za odabranu kategoriju vraca listu marki koje imaju dijelove u toj kategoriji.

Potrebno je napraviti mapiranje kategorija na `dio` vrijednosti iz baze:

| Kategorija | dio vrijednosti |
|---|---|
| motor | MOTOR, MJENJAC, AUTOMATSKI MJENJAC, USISNA GRANA, IZDUVNA GRANA, EGR, CIJEV EGR, KUCISTE FILTERA ULJA, VAKUM PUMPA, VODENA PUMPA, CIRKULACIONA PUMPA, SERVO PUMPA, MOTORIC TURBINE, REDUKTOR, LAMBDA SONDA, POTENCIOMETAR GASA |
| karoserija | BLATOBRAN, PREDNJA HAUBA, ZADNJA HAUBA, VRATA, BAGLAMA VRATA, LAJSNA VRATA, RETROVIZOR, RESETKA BRANIKA, DIFUZOR, BLENDA, KOMPLET SASIJA |
| elektrika | ELEKTRONIKA MOTORA, MODUL, DISPLEJ, RADIO, KAMERA, RADAR SENZOR, TAHO SAT |
| ovjes | MOST |
| kocnice | (nema direktnih) |
| svjetla | FAR, MAGLENKA, STOP SVJETLO, KATADIOPTER |
| stakla | STAKLO |
| unutrasnjost | AIRBAG, SJEDISTA, KOLO VOLANA, KLIMATRONIK, PEPELJARA, UNUTRASNJI RETROVIZOR, PREKIDAC BRISACA, PREKIDAC SVJETALA, PREKIDAC CETIRI ZMIGAVCA, PREKIDACI PODIZACA, KUGLA MJENJACA, RESETKA VENTILACIJE, MOTORIC VENTILACIJE, MOTORIC PODIZACA, BRAVA VRATA, BRAVA HAUBE, BRAVA PALJENJA, STEKA VRATA, BRISAC, MOTORIC BRISACA, NOSAC AKUMULATORA, PLASTIKA, RACVA VODE, HLADNJAK INTERKULERA |

SQL upit: `SELECT DISTINCT marka FROM parts WHERE dio = ANY($1)` - gdje je $1 niz dio vrijednosti za odabranu kategoriju.

### 2. Kreiranje komponente SearchBrandGrid

Nova komponenta `src/components/SearchBrandGrid.tsx`:
- Prima `activeCategory` (string) kao prop
- Prikazuje isti grid brendova kao `BrandGrid` sa homepage-a (isti vizual)
- Klikom na brand, postavlja `marka` URL parametar (i zadrzava ostale parametre)
- Ako je kategorija aktivna:
  - Dohvata listu marki koje imaju dijelove u toj kategoriji
  - Marke koje NEMAJU dijelove: greyed out (opacity-40, pointer-events-none, grayscale)
  - Marke koje IMAJU dijelove: normalan izgled, klikabilne
- Ako kategorija NIJE aktivna: sve marke su klikabilne normalno
- Aktivna marka (iz URL-a) ima istaknuti stil (border-primary)

### 3. Integracija u SearchResults stranicu

U `src/pages/SearchResults.tsx`:
- Importovati `SearchBrandGrid`
- Dodati odmah ispod `<CategoryGrid />` (linija 104)
- Proslijediti `activeCategory` iz URL parametra `kategorija`

### Tehnicke izmjene

| Fajl | Akcija |
|---|---|
| `src/hooks/useParts.ts` | Dodati `useBrandsByCategory` hook + mapiranje kategorija na dio |
| `src/components/SearchBrandGrid.tsx` | **Novi fajl** - brand grid sa category-aware stanjem |
| `src/pages/SearchResults.tsx` | Dodati SearchBrandGrid ispod CategoryGrid |

