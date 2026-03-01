## Dodavanje disclaimer teksta ispod dugmeta NARUCI

### Izmjene u `src/pages/PartDetail.tsx`

**Nakon linije 285** (kraj order buttons sekcije), dodati jedan paragraf:

```tsx

<p className="text-xs text-muted-foreground mt-1">
  Moguća zamjena ako ne odgovara: 7 dana – <a href="#" className="underline text-primary">Pročitaj više</a>
</p>
```

Link "Pročitaj više" koristi `href="#"` kao placeholder -- moze se kasnije promijeniti na pravu stranicu.