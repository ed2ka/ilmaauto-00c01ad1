

## Uskladjivanje ikona, upita i narudzbi

### 1. Uskladiti ikonu za "Upiti"
Header dropdown koristi `MessageSquare` ikonu, a tab u Dashboardu koristi `Search`. Zamijenit cu `Search` sa `MessageSquare` u tabu kako bi bile iste.

### 2. Upiti - statusi i odgovor
Trenutno tabela `part_inquiries` nema kolonu za odgovor. Potrebno je:
- Dodati kolonu `admin_response` (text, nullable) u tabelu `part_inquiries` putem migracije
- Prilagoditi status prikaz:
  - `novi` -> "Poslan upit"
  - `u_obradi` -> "Nije odgovoren"  
  - `riješen` -> "Odgovoren"
- Kada je status "Odgovoren" i postoji `admin_response`, prikazati tekst odgovora na upitu

### 3. Narudzbe - detaljan prikaz cijena i datum
Umjesto jednog reda sa datumom i ukupnom cijenom, prikazati:
- "Narudzba kreirana dd.MM.yyyy" umjesto samog datuma
- Raspis cijena:
  - Cijena dijela: X KM
  - Trosak dostave: X KM  
  - Ukupno za naplatu: X KM (bold)

### Tehnicke izmjene

**Migracija baze**: Dodati kolonu `admin_response` u `part_inquiries`
```sql
ALTER TABLE public.part_inquiries ADD COLUMN admin_response text;
```

**`src/pages/Dashboard.tsx`**:
- Zamijeniti `Search` sa `MessageSquare` u importu i u TabsTrigger za "Upiti"
- Upiti sekcija: promijeniti status labele, dodati prikaz odgovora kada postoji
- Narudzbe sekcija: zamijeniti datum/cijena red sa detaljnim prikazom (kreirana datum + raspis cijena)

**`src/components/Header.tsx`**: Bez promjena (vec koristi ispravnu ikonu)
