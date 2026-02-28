

## Stilizacija tabova u SearchPanel-u

Tabovi pretrage ("Filter pretraga dijelova", "Pretraga po nazivu dijela", itd.) ce dobiti:

1. **Aktivni tab** - crvena linija ispod (3px debljine), isti stil kao na screenshot-u
2. **Hover efekat** - animirana crvena linija koja se popunjava s lijeva na desno, isti kao u Header navigaciji (koristi `after:` pseudo-element sa `scale-x` transformacijom)

### Tehnicke izmjene

**`src/components/SearchPanel.tsx`** (linije 128-130) - izmjena klasa na tab button-u:

- Dodati `after:` pseudo-element za hover animaciju (isti pattern kao Header linkovi)
- Aktivni tab dobija `after:scale-x-100` (linija uvijek vidljiva)
- Neaktivni tab dobija `after:scale-x-0` sa hover efektom `hover:after:scale-x-100`
- Klase: `after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:bg-red-500 after:origin-bottom-right after:transition-transform after:duration-300`
- Aktivni: `after:scale-x-100 after:origin-bottom-left`
- Neaktivni: `after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left`

Nema novih fajlova ni zavisnosti. Samo CSS klase na postojecem button elementu.

