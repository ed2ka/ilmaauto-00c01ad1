

## Randomizacija cijena i formatiranje u KM formatu

### 1. Ažuriranje cijena u bazi podataka

Pokrenucu SQL upit koji svim dijelovima dodjeljuje nasumicnu cijenu u rasponu 150 - 1300 KM, u koracima od 5 (dakle: 150, 155, 160, ... 1295, 1300). Svaki dio dobija razlicitu random cijenu. Nijedan dio nece ostati bez cijene.

```sql
UPDATE parts
SET cijena = 150 + (floor(random() * 231) * 5)
-- daje vrijednosti: 150, 155, 160, ..., 1295, 1300
```

### 2. Kreiranje helper funkcije za formatiranje cijena

Novi fajl `src/lib/formatPrice.ts` sa funkcijom koja formatira broj u bosanski format:
- Separator hiljada: `.`
- Decimalni separator: `,`
- Sufiks: ` KM`
- Primjer: `1000` → `1.000,00 KM`

### 3. Azuriranje prikaza cijena u UI

Sva mjesta koja prikazuju cijene ce koristiti novu `formatPrice` funkciju:

| Fajl | Linija | Trenutno | Novo |
|------|--------|----------|------|
| `src/pages/PartDetail.tsx` | 214 | `${Number(part.cijena).toFixed(2)} KM` | `formatPrice(part.cijena)` |
| `src/pages/Dashboard.tsx` | 113 | `${Number(o.total_price).toFixed(2)} KM` | `formatPrice(o.total_price)` |
| `src/components/OrderSheet.tsx` | 293, 298, 304 | `.toFixed(2) KM` | `formatPrice(...)` |

Ukupno 5 izmjena u 3 fajla + 1 novi utility fajl + 1 SQL migracija.
