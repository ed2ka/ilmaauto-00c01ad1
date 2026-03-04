

## Razdvojiti "Rezultati pretrage" naslov u poseban red na mobilnom prikazu

Trenutno su naslov "Rezultati pretrage", dugme "Filteri", grid/list ikonice i select za sortiranje svi u jednom redu (`flex items-center justify-between`). Na mobilnom ekranu to je pretrpano.

### Izmjena u `src/pages/SearchResults.tsx` (linije 108-165)

Restrukturirati layout tako da:
1. **Naslov "Rezultati pretrage" (sa brojem rezultata)** bude u svom redu -- puni width, iznad svega
2. **Ispod naslova** -- red sa: Filteri dugme (lijevo), grid/list ikonice + sort select (desno)

Ovo se primjenjuje samo na mobilni prikaz (`isMobile`). Na desktopu ostaje kao sada.

### Konkretna izmjena

Zamijeniti blok linija 108-165 sa:

```tsx
{/* Mobile: title on separate row */}
{isMobile ? (
  <>
    <h1 className="text-lg font-bold text-foreground mb-3">
      Rezultati pretrage
      {data && <span className="text-muted-foreground font-normal ml-2 text-sm">({data.totalCount})</span>}
    </h1>
    <div className="flex items-center justify-between mb-5">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm hover:bg-accent transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filteri
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] overflow-y-auto">
          <SheetHeader><SheetTitle>Filteri</SheetTitle></SheetHeader>
          <div className="mt-4"><SearchFilterSidebar /></div>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        {/* grid/list toggle + sort select -- isti kao sada */}
      </div>
    </div>
  </>
) : (
  /* Desktop: existing single-row layout unchanged */
  <div className="flex items-center justify-between mb-5">
    <h1 className="text-lg font-bold text-foreground">
      Rezultati pretrage
      {data && <span className="text-muted-foreground font-normal ml-2 text-sm">({data.totalCount})</span>}
    </h1>
    <div className="flex items-center gap-2">
      {/* grid/list toggle + sort select */}
    </div>
  </div>
)}
```

### Jedna datoteka
- `src/pages/SearchResults.tsx` -- restrukturiranje header sekcije za mobilni prikaz

