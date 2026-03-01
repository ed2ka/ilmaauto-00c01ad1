

## Promjena teksta u sekciji sa ikonicama

### Izmjene u `src/pages/PartDetail.tsx` (linije 248-255)

Tekst u oba bloka ce biti razbijen u dva reda koristeci `<br />` tag:

```tsx
<div className="flex items-center gap-6 mt-1 mb-3 text-sm text-muted-foreground">
  <div className="flex items-center gap-2">
    <RefreshCcw className="w-5 h-5 text-foreground" />
    <span>Besplatna zamjena<br />7 dana</span>
  </div>
  <div className="flex items-center gap-2">
    <Truck className="w-5 h-5 text-foreground" />
    <span>Dostava:<br />BiH, Balkan i EU</span>
  </div>
</div>
```

Promjene:
- Prvi blok: "Besplatna zamjena" na jednom redu, "7 dana" na drugom
- Drugi blok: "Dostava:" na jednom redu, "BiH, Balkan i EU" na drugom

