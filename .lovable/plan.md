

## Dodavanje "Posljednja pretraga" tagova iznad polja "Marka i tip vozila"

### Sta se dodaje

Iznad VehicleSelector polja u "Filter pretraga dijelova" tabu, prikazat ce se tekst "Posljednja pretraga:" i tri "pill" dugmica sa nasumicnim kombinacijama marka + tip vozila. Svaki refresh stranice prikazuje nove nasumicne kombinacije.

### Izgled

- Tekst "Posljednja pretraga:" u maloj velicini, siva boja
- Tri pill/chip dugmica sa:
  - Svijetlo siva pozadina (`bg-muted`)
  - Tamnija siva boja teksta (`text-muted-foreground`)
  - Border (`border border-border`)
  - Maksimalni border-radius (`rounded-full`)
  - Mali tekst (`text-xs`)
- Dugmici se prikazuju u redu sa wrap-om

### Tehnicke izmjene

**`src/components/SearchPanel.tsx`**:

1. Dodati hardkodiranu listu parova marka + tip, npr:
```ts
const recentSearchPairs = [
  { brand: "BMW", model: "E46" },
  { brand: "VOLKSWAGEN", model: "GOLF 5" },
  { brand: "AUDI", model: "A4 B8" },
  { brand: "MERCEDES", model: "W204" },
  { brand: "OPEL", model: "ASTRA H" },
  { brand: "FORD", model: "FOCUS MK2" },
  { brand: "RENAULT", model: "MEGANE 2" },
  { brand: "PEUGEOT", model: "307" },
  { brand: "SKODA", model: "OCTAVIA 2" },
  { brand: "FIAT", model: "PUNTO" },
  { brand: "TOYOTA", model: "COROLLA" },
  { brand: "SEAT", model: "LEON" },
];
```

2. Dodati `useMemo` koji pri svakom renderovanju (bez dependency arraya, ali s `Math.random`) bira 3 nasumicna para iz liste -- koristeci `useMemo` sa praznim nizom ili jednostavno `useState` s inicijalnom vrijednoscu koja se racuna jednom po renderovanju (ne sessionStorage, jer se treba mjenjati na svaki refresh).

3. U JSX, unutar `activeTab === "filter"` bloka, IZNAD `<VehicleSelector>`, dodati:
```tsx
<div className="space-y-1.5">
  <span className="text-xs text-muted-foreground">Posljednja pretraga:</span>
  <div className="flex flex-wrap gap-1.5">
    {recentSearches.map((item, i) => (
      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground text-xs">
        {item.brand} {item.model}
      </span>
    ))}
  </div>
</div>
```

Broj se nasumicno bira pri svakom renderovanju/refreshu -- nema sessionStorage za ovo jer korisnik zeli da se mijenja svaki put.
