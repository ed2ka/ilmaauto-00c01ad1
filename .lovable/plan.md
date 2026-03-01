

## Prikaz narudzbi sa detaljnim informacijama i vizuelnim statusom

### Problem
Trenutno narudzbe prikazuju samo naziv dijela, datum i cijenu. Nedostaju kataloški broj, detalji vozila, vizuelni prikaz statusa i tracking informacije.

### Izmjene

**1. Migracija baze -- dodavanje kolona za tracking**

Dodati dvije nove kolone u `orders` tabelu:
- `tracking_code` (text, nullable) -- kod za pracenje posiljke
- `tracking_url` (text, nullable) -- link za pracenje posiljke

```sql
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS tracking_code text,
  ADD COLUMN IF NOT EXISTS tracking_url text;
```

**2. Izmjena upita u `src/hooks/useOrders.ts`**

Umjesto `select("*")`, koristiti join sa `parts` tabelom da se dohvate svi detalji dijela:

```typescript
.select("*, parts(dio, broj, marka, tip, model)")
```

**3. Redizajn prikaza narudzbi u `src/pages/Dashboard.tsx`**

Za svaku narudzbu prikazati:

- **Zaglavlje**: Puni naziv artikla (dio) i kataloški broj (broj)
- **Detalji vozila**: Marka, tip, model (godiste)
- **Vizuelni stepper statusa** sa 4 koraka:
  1. Poslana narudzba
  2. Primljena
  3. Obradjena
  4. Na dostavi

  Stepper koristi horizontalnu liniju sa krugovima/ikonama. Aktivni koraci su obojeni (primary), buduci su sivi. Mapiranje DB statusa na korake:
  - `nova` = korak 1 (Poslana)
  - `primljena` = korak 2
  - `u obradi` = korak 3 (Obradjena)
  - `poslano` = korak 4 (Na dostavi)

- **Tracking sekcija** (prikazuje se samo ako `tracking_code` postoji):
  - Tracking kod prikazan kao badge ili monospace tekst
  - Link "Prati posiljku" koji vodi na `tracking_url`

- **Datum i cijena**: Ispod svega, datum narudzbe i ukupna cijena

### Vizuelni primjer stepera

```text
  (1)--------(2)--------(3)--------(4)
Poslana   Primljena  Obradjena  Na dostavi
```

Aktivni koraci: ispunjeni krugovi sa primary bojom i linijom
Buduci koraci: sivi krugovi i isprekidana linija
