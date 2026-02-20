

## Promjena hero slike i boje headera

### 1. Nova hero slika

Kopirati uploadovanu sliku (`Untitled-1.jpg`) u `src/assets/hero-bg.jpg` (zamjena postojece). Import u `Index.tsx` ostaje isti jer se fajl zove isto.

### 2. Boja headera i top bara: #1b2835

Azurirati CSS varijable u `src/index.css`:

- `--header-bg` sa `220 20% 10%` na `207 32% 16%` (HSL ekvivalent za #1b2835)
- `--foreground` ostaje nepromijenjen -- top bar koristi `bg-foreground`, pa cemo i njega prebaciti na novu boju

Posto TopBar koristi `bg-foreground` a Header koristi `bg-header`, treba:
- Promijeniti `--header-bg` na `207 32% 16%`
- U `TopBar.tsx` zamijeniti `bg-foreground` sa `bg-header` tako da oba dijela koriste istu boju

### Rezime izmjena

| Fajl | Akcija |
|------|---------|
| `src/assets/hero-bg.jpg` | Zamijeniti novom uploadovanom slikom |
| `src/index.css` | Azurirati `--header-bg` na `207 32% 16%` |
| `src/components/TopBar.tsx` | Zamijeniti `bg-foreground` sa `bg-header` |

