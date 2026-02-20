

## Dodavanje logotipa marke na kartice autodijela

### Opis

U gornji lijevi ugao svake kartice (PartCard) i liste (PartListItem) dodati mali badge sa logotipom marke automobila. Logotipi ce se ucitavati sa javno dostupnog CDN-a za automobilske brendove, a za brendove koji nemaju logo prikazat ce se tekstualna oznaka.

### Marke u bazi

Trenutno postoji 19 marki: AUDI, BMW, Citroen, Dacia, FIAT, FORD, HYUNDAI, IVECO, KIA, LAND ROVER, MERCEDES, OPEL, PEUGEOT, Renault, SEAT, SKODA, SMART, Volkswagen, Volvo.

### Tehnicke promjene

**1. Novi fajl: `src/lib/brandLogos.ts`**

Utility fajl sa mapom koja povezuje naziv marke sa URL-om logotipa. Koristit cemo besplatne SVG logotipe sa `cdn.worldvectorlogo.com` ili slicnog izvora. Fallback za nepoznate marke: prikazati ime marke u malom badge-u.

```typescript
const brandLogoMap: Record<string, string> = {
  "AUDI": "https://...",
  "BMW": "https://...",
  "MERCEDES": "https://...",
  // ... za svih 19 marki
};

export function getBrandLogo(marka: string): string | null { ... }
export function getBrandName(marka: string): string { ... }
```

**2. Izmjena: `src/components/PartCard.tsx`**

Dodati badge u gornji lijevi ugao slike (pored postojeceg Heart dugmeta u gornjem desnom uglu):

```
<div className="absolute top-2 left-2 z-10 bg-white rounded p-1 shadow-sm">
  <img src={logoUrl} alt={part.marka} className="w-6 h-6 object-contain" />
  // ili tekstualni fallback ako nema loga
</div>
```

**3. Izmjena: `src/components/PartListItem.tsx`**

Isti badge dodan u gornji lijevi ugao slike u list prikazu.

### Vizuelni izgled

- Bijela kockica (rounded, shadow) u gornjem lijevom uglu slike
- Logotip dimenzija priblizno 24x24px, object-contain
- Fallback: ime marke u malom fontu unutar bijele kockice
- Ne prekriva se sa Heart dugmetom (koji je u gornjem desnom uglu)

### Rezime izmjena

| Fajl | Akcija |
|------|---------|
| `src/lib/brandLogos.ts` | Kreirati -- mapa marki i URL-ova logotipa |
| `src/components/PartCard.tsx` | Izmjena -- dodati brand badge |
| `src/components/PartListItem.tsx` | Izmjena -- dodati brand badge |

