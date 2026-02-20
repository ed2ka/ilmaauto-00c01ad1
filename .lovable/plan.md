

## Dodavanje stranice "Korisnička podrška" i link u header

### 1. Nova stranica `src/pages/Support.tsx`

Kreirati stranicu inspirisanu priloženom slikom (GoDaddy stil) ali prilagođenu za Ilma Auto Dijelove. Stranica će sadržavati:

**Hero sekcija:**
- Naslov: "Tu smo za vas"
- Podnaslov: kratki tekst o dostupnosti podrške
- Svijetla pozadinska boja (npr. muted/accent ton)

**Kartica za kontakt (umjesto chata):**
- Naslov: "Kontaktirajte nas"
- Opis: "Za brzu pomoć oko narudžbi, dijelova ili bilo kakvih pitanja."
- Tri dugmeta u redu:
  - **Viber** -- otvara Viber link (`viber://chat?number=...` ili placeholder `#`)
  - **WhatsApp** -- otvara WhatsApp link (`https://wa.me/...` ili placeholder `#`)
  - **Poziv** -- otvara tel link (`tel:...` ili placeholder `#`)
- Ikone: koristiti `MessageCircle` (Viber), `MessageSquare` (WhatsApp), `Phone` (Poziv) iz lucide-react
- Radno vrijeme ispod dugmića

Stranica koristi Header i footer layout kao ostale stranice.

### 2. Ruta u `src/App.tsx`

Dodati novu rutu:
```
<Route path="/podrska" element={<Support />} />
```

### 3. Link u `src/components/Header.tsx`

Dodati "KORISNIČKA PODRŠKA" link pored "PRETRAŽI" u desktop navigaciji i u mobilnom meniju:

**Desktop (linija 22-27):**
```
<Link to="/pretraga">PRETRAŽI</Link>
<Link to="/podrska">KORISNIČKA PODRŠKA</Link>
<a href="#">NOVOSTI</a>
```

**Mobilni meni (linija 84-85):**
```
<Link to="/pretraga">PRETRAŽI</Link>
<Link to="/podrska">KORISNIČKA PODRŠKA</Link>
<a href="#">NOVOSTI</a>
```

### Rezime izmjena

| Fajl | Akcija |
|------|---------|
| `src/pages/Support.tsx` | Kreirati -- nova stranica korisničke podrške |
| `src/App.tsx` | Izmjena -- dodati rutu `/podrska` |
| `src/components/Header.tsx` | Izmjena -- dodati link u navigaciju |

