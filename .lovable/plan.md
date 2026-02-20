

## Izmjene u Header navigaciji

### 1. Tekst stavki -- veliko pocetno slovo

Trenutno su linkovi pisani velikim slovima ("PRETRAŽI", "KORISNIČKA PODRŠKA"). Promijenit ce se u:
- "Pretraži"
- "Korisnička podrška"

### 2. Ikone uz stavke

Dodati Lucide ikone ispred teksta:
- **Pretraži**: `Search` ikona
- **Korisnička podrška**: `Headset` ikona

### 3. Hover animacija -- crvena linija ispod

Svaki nav link dobija custom underline animaciju pomocu `after` pseudo-elementa:
- Linija se pojavljuje s lijeva na desno pri hoveru
- Boja linije: crvena (`bg-red-500`)
- Tekst hover efekat: blagi prelaz boje

CSS klase (Tailwind):
```
relative inline-flex items-center gap-1.5 
after:content-[''] after:absolute after:w-full after:scale-x-0 
after:h-0.5 after:bottom-0 after:left-0 after:bg-red-500 
after:origin-bottom-right after:transition-transform after:duration-300 
hover:after:scale-x-100 hover:after:origin-bottom-left
```

### 4. Uklanjanje "Novosti"

Obrisati stavku "NOVOSTI" iz desktop navigacije (linija 28-30) i mobilnog menija (linija 89).

### Rezime izmjena

| Fajl | Izmjena |
|------|---------|
| `src/components/Header.tsx` | Veliko pocetno slovo, ikone, hover animacija, uklanjanje Novosti |

