

## Dodavanje novih logotipa marki

### Promjene

**1. Kopiranje 9 novih logotipa u `src/assets/brands/`**

Fajlovi: nissan.webp, opel.webp, peugeot.webp, renault.webp, seat.webp, skoda.webp, toyota.webp, volkswagen.webp, volvo.webp

**2. Azuriranje `src/lib/brandLogos.ts`**

- Dodati 9 novih importa za uploadovane logotipe
- Prosiriti `brandLogoMap` sa novim markama: NISSAN, OPEL, PEUGEOT, RENAULT, SEAT, SKODA, TOYOTA, VOLKSWAGEN, VOLVO
- Azurirati `allBrands` listu -- dodati NISSAN i TOYOTA kao nove marke, a za OPEL, PEUGEOT, RENAULT, SEAT, SKODA, VOLKSWAGEN, VOLVO zamijeniti `null` sa odgovarajucim logotipom

Nakon ove izmjene, samo 4 marke ostaju bez logotipa: **Dacia, Iveco, Kia, Land Rover, Smart**.

### Rezime

| Fajl | Akcija |
|------|---------|
| `src/assets/brands/*.webp` | Kopirati 9 novih logotipa |
| `src/lib/brandLogos.ts` | Dodati importe i azurirati mapu i allBrands listu |

Sve ostale komponente (PartCard, PartListItem, PartDetail, BrandGrid) automatski koriste `getBrandLogo()` i `allBrands` pa ce odmah prikazivati nove logotipe bez dodatnih izmjena.

