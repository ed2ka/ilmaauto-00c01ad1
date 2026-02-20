

## Popravke na Filter sidebar-u

### 1. Sticky pozicija sidebar-a

Sidebar koristi `sticky top-4` sto je preblizu vrhu. Posto stranica ima fiksni header (~108px na desktopu), treba promijeniti na `top-[120px]` kako bi sidebar bio ispod headera sa malo razmaka.

**Fajl: `src/pages/SearchResults.tsx` (linija 169)**
- Promijeniti `sticky top-4` u `sticky top-[120px]`

### 2. X dugme za ponistavanje svakog filtera pojedinacno

Svako polje (Marka, Model/Tip, Naziv dijela, Kataloški broj) dobija malo X dugme koje se prikazuje samo kada to polje ima aktivnu vrijednost. Klikom se brise taj filter.

**Fajl: `src/components/SearchFilterSidebar.tsx`**

Za Select polja (Marka, Model/Tip):
- Omotati Select i X dugme u `relative` wrapper
- X dugme se pozicionira desno od Select trigger-a (ili unutar wrappera)
- Prikazuje se samo kad je vrijednost odabrana

Za Input polja (Naziv dijela, Kataloški broj):
- Dodati X dugme unutar wrappera, vidljivo samo kad polje ima tekst
- Klikom na X poziva `removeParam("dio")` odnosno `removeParam("broj")`

### Rezime izmjena

| Fajl | Izmjena |
|------|---------|
| `src/pages/SearchResults.tsx` | Sticky pozicija: `top-4` -> `top-[120px]` |
| `src/components/SearchFilterSidebar.tsx` | X dugme za resetovanje na svakom polju |

