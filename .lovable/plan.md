

## Pojednostavljenje Footer-a

### Opis

Uklonit cu cijelu srednju kolonu (opis firme, adresa, telefoni, email) iz tamnog dijela footera. Logo na lijevoj strani cu povecati. Footer ce imati samo dvije kolone: logo (lijevo) i scroll-to-top + social ikone (desno).

### Tehnicke izmjene

| Fajl | Akcija |
|------|--------|
| `src/components/Footer.tsx` | Ukloniti Info sekciju (linije 86-110), prebaciti grid sa 3 na 2 kolone, povecati logo sa `h-24` na `h-32` |

### Detalji promjena

- Uklanjam kompletnu srednju kolonu sa opisom, adresom, telefonima i emailom
- Mijenjam `grid-cols-1 md:grid-cols-3` u `grid-cols-1 md:grid-cols-2`
- Povecavam logo sa `h-24` na `h-32`
- Uklanjam nekoristene importe (`MapPin`, `Phone`, `Mail`)
- CTA bar, Benefits bar, social ikone, scroll-to-top dugme i copyright bar ostaju nepromijenjeni

