
## Uklanjanje shadow i scale efekata sa brand kockica

Ukloniti `shadow-md`, `scale-105`, `hover:shadow-md` i `hover:scale-105` sa svih brand grid komponenti.

### Izmjene

**1. `src/components/SearchBrandGrid.tsx`** (linija 42-45)
- Active: ukloniti `shadow-md scale-105`
- Hover: ukloniti `hover:shadow-md hover:scale-105`

**2. `src/components/BrandGrid.tsx`** (linija 11)
- Hover: ukloniti `hover:shadow-md hover:scale-105`

### Rezultat
Brand kockice nece imati nikakav shadow niti zoom efekat ni u jednom stanju.
