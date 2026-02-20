

## Logotipi marki automobila -- lokalne slike + homepage sekcija

### 1. Kopiranje uploadovanih logotipa u projekat

Kopirati 9 uploadovanih webp fajlova u `src/assets/brands/`:
- alfa-romeo.webp, audi.webp, bmw.webp, citroen.webp, fiat.webp, ford.webp, hyundai.webp, mazda.webp, mercedes-benz.webp

Napomena: Alfa Romeo i Mazda nisu trenutno u bazi, ali ce biti dostupni za buducu upotrebu.

### 2. Azuriranje `src/lib/brandLogos.ts`

Zamijeniti vanjske URL-ove sa lokalnim importima:

```typescript
import audiLogo from "@/assets/brands/audi.webp";
import bmwLogo from "@/assets/brands/bmw.webp";
// ... za svih 9 uploadovanih

const brandLogoMap: Record<string, string> = {
  "AUDI": audiLogo,
  "BMW": bmwLogo,
  "CITROEN": citroenLogo,
  "FIAT": fiatLogo,
  "FORD": fordLogo,
  "HYUNDAI": hyundaiLogo,
  "MERCEDES": mercedesLogo,
  // Ostale marke (DACIA, IVECO, KIA, LAND ROVER, OPEL, PEUGEOT, RENAULT, SEAT, SKODA, SMART, VOLKSWAGEN, VOLVO) -- tekstualni fallback dok se ne dodaju logotipi
};
```

Dodati novu exportovanu listu svih brendova za homepage grid:

```typescript
export const allBrands = [
  { name: "AUDI", logo: audiLogo },
  { name: "BMW", logo: bmwLogo },
  // ... sve marke iz baze sa logotipom ili null
];
```

### 3. Dodavanje logotipa na stranicu detalja dijela (`src/pages/PartDetail.tsx`)

U desnoj kartici, pored naslova dijela i oznake marke, dodati logotip:

```tsx
<div className="py-2 flex items-start justify-between gap-2">
  <div className="flex items-start gap-3">
    {logoUrl && (
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
        <img src={logoUrl} alt={part.marka} className="w-8 h-8 object-contain" />
      </div>
    )}
    <div>
      <h1 className="text-2xl font-bold">{part.dio}</h1>
      <p className="text-muted-foreground mt-1">{part.marka} {part.tip} ...</p>
    </div>
  </div>
  ...
</div>
```

### 4. Nova komponenta `src/components/BrandGrid.tsx`

Grid sekcija sa svim markama u kockicama. Klikom na marku otvara se pretraga sa filterom:

```tsx
// Responsive grid: 4 kolone mobile, 5 tablet, 6+ desktop
// Svaka kockica: bijela kartica sa logotipom + ime marke ispod
// Link: /pretraga?marka=MERCEDES
```

Svaka kockica sadrzi:
- Logotip marke (ili inicijal za marke bez logotipa)
- Ime marke ispod logotipa
- Hover efekat (shadow, scale)
- Klik vodi na `/pretraga?marka=IME_MARKE`

### 5. Azuriranje homepage-a (`src/pages/Index.tsx`)

Dodati BrandGrid sekciju ispod hero dijela, iznad AppRatingBar:

```tsx
{/* Brands section */}
<section className="relative bg-background py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold text-center mb-8">Pretrazite po marki</h2>
    <BrandGrid />
  </div>
</section>
```

### Rezime izmjena

| Fajl | Akcija |
|------|---------|
| `src/assets/brands/*.webp` | Kopirati 9 logotipa |
| `src/lib/brandLogos.ts` | Lokalni importi umjesto URL-ova, dodati allBrands listu |
| `src/components/PartCard.tsx` | Bez promjena (vec koristi getBrandLogo) |
| `src/components/PartListItem.tsx` | Bez promjena (vec koristi getBrandLogo) |
| `src/pages/PartDetail.tsx` | Dodati logotip pored naslova dijela |
| `src/components/BrandGrid.tsx` | Nova komponenta -- grid logotipa sa linkovima |
| `src/pages/Index.tsx` | Dodati BrandGrid sekciju |

### Nedostajuci logotipi

Za 10 marki iz baze nema uploadovanih logotipa: **Dacia, Iveco, Kia, Land Rover, Opel, Peugeot, Renault, Seat, Skoda, Smart, Volkswagen, Volvo**. Za njih ce se prikazivati tekstualni fallback (ime marke u badge-u) dok ne budu dodani.
