

## Zamjena disclaimer teksta sa ikonicama (po uzoru na screenshot)

### Izmjene u `src/pages/PartDetail.tsx`

Zamijeniti postojeci paragraf (linije 247-249) sa dva elementa u redu, svaki sa ikonom -- po uzoru na screenshot:

```tsx
<div className="flex items-center gap-6 mt-1 mb-3 text-sm text-muted-foreground">
  <div className="flex items-center gap-2">
    <RefreshCcw className="w-5 h-5 text-foreground" />
    <span>Besplatna zamjena: 7 dana</span>
  </div>
  <div className="flex items-center gap-2">
    <Truck className="w-5 h-5 text-foreground" />
    <span>Dostava u cijeloj BiH i EU</span>
  </div>
</div>
```

- Ikona `RefreshCcw` (lucide) za zamjenu/povrat -- odgovara ikoni sa screenshota
- Ikona `Truck` (lucide) za dostavu -- odgovara ikoni kamiona sa screenshota
- Tekst prilagodjen na bosanski jezik
- Dodati `RefreshCcw` i `Truck` u postojeci import iz `lucide-react`

