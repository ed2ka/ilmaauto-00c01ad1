

## Hover efekat na karticama rezultata pretrage

Uklanjanje shadow efekta pri hoveru i zamjena sa tamnijim borderom na oba prikaza (Grid i List).

### Izmjene

**`src/components/PartCard.tsx` (linija 33)**
- Trenutno: `hover:shadow-lg transition-shadow`
- Novo: `hover:border-foreground/30 transition-colors`
- Zoom efekat na slici ostaje nepromijenjen

**`src/components/PartListItem.tsx` (linija 33)**
- Trenutno: `hover:shadow-md transition-shadow`
- Novo: `hover:border-foreground/30 transition-colors`

Obje kartice ce pri hoveru dobiti tamniji border umjesto sjene, dok image zoom efekat na Grid prikazu ostaje.
