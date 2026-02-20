

## Dodavanje tabova ispod galerije slika na /dio/:id

### Opis

Ispod galerije slika (lijeva kolona) dodati Tabs komponentu sa dva taba:

**Tab 1: "Napomena o fotografijama"**
Informativni tekst o tome da su fotografije informativnog karaktera.

**Tab 2: "Kupovina dijelova"**
Tekst o savjetima prije kupovine, sa dva linka ("uslovi prodaje" i "politika povrata i garancije") koji ce za sada voditi na `#` dok se ne kreiraju te stranice.

### Tehnicke promjene

**Fajl: `src/pages/PartDetail.tsx`**

- Importovati `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` iz `@/components/ui/tabs`
- Ispod `<PartImageGallery />` komponente (unutar lijeve kolone, linija ~117), dodati Tabs sekciju:

```
<PartImageGallery images={images} alt={part.dio} />

<Tabs defaultValue="photos" className="mt-4">
  <TabsList className="w-full">
    <TabsTrigger value="photos" className="flex-1 text-xs">
      Napomena o fotografijama
    </TabsTrigger>
    <TabsTrigger value="purchase" className="flex-1 text-xs">
      Kupovina dijelova
    </TabsTrigger>
  </TabsList>
  <TabsContent value="photos">
    <p className="text-sm text-muted-foreground leading-relaxed">
      Prikazane fotografije proizvoda su informativnog karaktera...
    </p>
  </TabsContent>
  <TabsContent value="purchase">
    <p className="text-sm text-muted-foreground leading-relaxed">
      Prije narucivanja savjetujemo... sa linkovima
      <a href="#">uslovima prodaje</a> i
      <a href="#">politikom povrata i garancije</a>.
    </p>
  </TabsContent>
</Tabs>
```

Tabovi ce biti kompaktni, sa punom sirinom TabsList-a i manjim fontom (`text-xs`) kako bi se oba naziva ugodno smjestila. Linkovi u drugom tabu ce biti stilizovani kao `text-primary underline`.

### Rezime

| Fajl | Izmjena |
|------|---------|
| `src/pages/PartDetail.tsx` | Dodati Tabs komponentu ispod galerije slika |

