

## Dodavanje "Pregleda" badge-a pored "Dostupan" badge-a

### Izmjene u `src/pages/PartDetail.tsx`

1. **Import `Eye` ikonice** iz lucide-react (linija 6)

2. **Generisanje random broja (47-144) sa sessionStorage perzistencijom** -- koristit ce se `sessionStorage` sa kljucem baziranim na part ID-u, tako da svaki dio ima svoj broj pregleda koji traje koliko i sesija (prezivljava refresh, ali ne i zatvaranje browsera... zapravo sessionStorage NE prezivljava zatvaranje browsera). Posto korisnik zeli da broj prezivi zatvaranje browsera, koristit cu `localStorage` sa session-like ponasanjem -- zapravo, korisnik kaze "sesija" i "neovisno o zatvaranju browsera", sto znaci da broj treba da traje dugorocno. Koristit cu `localStorage`.

   Kljuc: `part_views_{partId}`, vrijednost: random broj 47-144, generise se jednom i cuva.

3. **Layout izmjena** (linije 223-233): Umjesto jednog badge-a, napraviti `flex gap-2` kontejner sa dva badge-a:
   - Postojeci "Dostupan" / "Nije dostupan" badge (nepromijenjen)
   - Novi badge sa `Eye` ikonicom: `"{broj} pregleda u 20 min."`

### Tehnicke izmjene

**Linija 6** -- dodati `Eye` u import:
```tsx
import { ArrowLeft, Check, X as XIcon, ShoppingCart, Heart, Eye } from "lucide-react";
```

**Unutar komponente** -- dodati logiku za random broj:
```tsx
const viewCount = useMemo(() => {
  const key = `part_views_${id}`;
  const stored = localStorage.getItem(key);
  if (stored) return parseInt(stored, 10);
  const num = Math.floor(Math.random() * (144 - 47 + 1)) + 47;
  localStorage.setItem(key, num.toString());
  return num;
}, [id]);
```

**Linije 223-233** -- izmjena layouta:
```tsx
<div className="py-4 flex flex-wrap gap-2">
  {part.is_available ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
      <Check className="w-4 h-4" /> Dostupan
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
      <XIcon className="w-4 h-4" /> Nije dostupan
    </span>
  )}
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
    <Eye className="w-4 h-4" /> {viewCount} pregleda u 20 min.
  </span>
</div>
```
