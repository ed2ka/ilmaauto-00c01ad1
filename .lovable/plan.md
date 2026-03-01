

## Promjena dugmeta za telefon

### Izmjena u `src/components/SearchFilterSidebar.tsx` (linije 164-170)

- Promijeniti broj telefona sa `+387 66 818 315` na `+387 62 667 700`
- Promijeniti `href` na `tel:+38762667700`
- Promijeniti boju dugmeta sa plavog gradijenta na zuti gradijent (od amber/yellow tonova)

```tsx
<a
  href="tel:+38762667700"
  className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black rounded-lg text-sm font-bold transition-all"
>
  <Phone className="w-4 h-4" />
  +387 62 667 700
</a>
```

Promjene:
- Gradijent: plavi -> zuti (`from-yellow-400 to-amber-500`)
- Tekst: bijeli -> crni (za bolji kontrast na zutoj pozadini)
- Font: `font-medium` -> `font-bold`
- Broj telefona azuriran

