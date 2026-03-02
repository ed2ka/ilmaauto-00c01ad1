

## Precizni datumi sa vremenom

Trenutno datumi koriste format `dd-MM-yyyy` (npr. "02-03-2026"). Korisnik zahtijeva da se prikazuje i tačno vrijeme.

### Izmjene u `src/pages/Dashboard.tsx`

**Narudžbe (linija 156)**: Promijeniti format datuma sa vremenom
- Prije: `Narudžba kreirana 02-03-2026`
- Poslije: `Narudžba kreirana 02.03.2026 u 15:42`

**Upiti (linija 202)**: Dodati label + vrijeme
- Prije: `02-03-2026`
- Poslije: `Upit kreiran 02.03.2026 u 15:42`

### Tehnicki detalji

Promjena formata na oba mjesta sa `"dd-MM-yyyy"` na `"dd.MM.yyyy 'u' HH:mm"`:

Linija 156:
```tsx
Narudžba kreirana {format(new Date(o.created_at), "dd.MM.yyyy 'u' HH:mm")}
```

Linija 202:
```tsx
Upit kreiran {format(new Date(inq.created_at), "dd.MM.yyyy 'u' HH:mm")}
```
