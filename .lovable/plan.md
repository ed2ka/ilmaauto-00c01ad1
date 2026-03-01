

## Ispravka VIN Input responzivnog layout-a

### Problem
Trenutno se koristi `flex-wrap` sa individualnim input poljima, pa se prelom dešava na proizvoljnim mjestima umjesto na definisanim granicama (poslije 9. polja).

### Rjesenje
Grupirati inpute u `inline-flex` kontejnere sa `flex-shrink-0` da se prelom desi samo izmedju grupa, ne unutar njih.

### Pravila

| Uredjaj | Red 1 | Red 2 | Red 3 |
|---------|-------|-------|-------|
| Mobitel (<640px) | 3 + razmak + 6 polja | 8 polja | Zalijepi + Kopiraj |
| Tablet (>=640px) | Svih 17 polja u jednom redu (3+razmak+6+razmak+8) | Zalijepi + Kopiraj | - |
| Desktop | Isto kao tablet | Isto kao tablet | - |

### Tehnicke izmjene u `src/components/VinInput.tsx`

Struktura JSX-a (return blok, linije 113-145):

```tsx
<div className="flex flex-col gap-2">
  {/* Inputi */}
  <div className="flex flex-wrap items-center gap-y-2">
    {/* Grupa A: WMI(0-2) + spacer + VDS(3-8) -- nikad se ne lomi */}
    <div className="inline-flex items-center gap-0.5 flex-shrink-0">
      {[0, 1, 2].map(renderInput)}
      <span className="w-2" />
      {[3, 4, 5, 6, 7, 8].map(renderInput)}
    </div>
    {/* Grupa B: VIS(9-16) -- na mobilnom pada u novi red */}
    <div className="inline-flex items-center gap-0.5 flex-shrink-0">
      <span className="w-2 hidden sm:inline-block" />
      {[9, 10, 11, 12, 13, 14, 15, 16].map(renderInput)}
    </div>
  </div>
  {/* Dugmici -- uvijek zasebni red */}
  <div className="flex items-center gap-3">
    {/* Zalijepi + Kopiraj dugmici (bez promjena) */}
  </div>
</div>
```

Kljucna razlika: inputi su grupisani u dva `inline-flex flex-shrink-0` kontejnera, tako da se `flex-wrap` prelom desava SAMO izmedju grupa A i B, nikad unutar njih.
