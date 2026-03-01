

## Ujednačavanje stilova: CategoryGrid + SearchBrandGrid + BrandGrid

### Izmjene

Sve tri komponente trebaju imati isti border-radius (`rounded-[9px]`) u svim stanjima (default, hover, selected) -- bez promjene radiusa pri hoveru/selekciji. Hover i selected stanje: siva podloga (`bg-muted`), crni okvir/tekst/ikone (`border-foreground`, `text-foreground`).

---

**1. `src/components/CategoryGrid.tsx`** (linija 48-52)

- Ukloniti `hover:rounded-xl` i `rounded-xl` iz active stanja
- Sve ostaje `rounded-[9px]` uvijek
- Hover: `hover:border-foreground hover:bg-muted hover:shadow-sm hover:text-foreground`
- Active: `border-foreground bg-muted text-foreground shadow-sm`

**2. `src/components/SearchBrandGrid.tsx`** (linija 41-46)

- Zamijeniti `rounded-xl` sa `rounded-[9px]`
- Active: `border-foreground bg-muted shadow-md scale-105` umjesto `border-primary bg-primary/10`
- Hover: `hover:border-foreground hover:bg-muted hover:shadow-md hover:scale-105`
- Tekst (linija 63-67): active `text-foreground` umjesto `text-primary`

**3. `src/components/BrandGrid.tsx`** (linija 11)

- Zamijeniti `rounded-xl` sa `rounded-[9px]`
- Hover: dodati `hover:border-foreground hover:bg-muted` umjesto samo `hover:shadow-md`
- Tekst ostaje `group-hover:text-foreground` (vec je crno)

### Rezultat

Sve kockice (kategorije i brendovi) imaju identičan `rounded-[9px]` u svim stanjima, sa sivom podlogom i crnim okvirom/tekstom/ikonama pri hoveru i selekciji.
