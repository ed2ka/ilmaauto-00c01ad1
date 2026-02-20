

## "PRETRAZI" link u headeru + Kategorije dijelova na stranici pretrage

### Promjene

### 1. Header.tsx -- "PRETRAZI" postaje Link na /pretraga

Umjesto `<button>` sa `<ChevronDown>`, "PRETRAZI" postaje obican `<Link to="/pretraga">` bez dropdown-a. Isto vazi za mobilni meni.

- Ukloniti `ChevronDown` ikonu
- Zamijeniti `<button>` sa `<Link to="/pretraga">`
- U mobilnom meniju: `<a href="#">` zamijeniti sa `<Link to="/pretraga">`

### 2. SearchResults.tsx -- Kategorije dijelova (kockice sa ikonama)

Dodati sekciju "Kategorije dijelova" iznad listinga rezultata (ispod breadcrumbs, iznad toolbar-a). Horizontalni scroll na mobilnom, grid na desktopu.

**Kategorije sa Lucide ikonama:**

| Kategorija | Ikona (lucide-react) |
|---|---|
| Motor | `Cog` |
| Karoserija | `Car` |
| Elektrika | `Zap` |
| Ovjes | `ArrowUpDown` |
| Kocnice | `Disc3` |
| Svjetla | `Lightbulb` |
| Stakla | `Square` |
| Unutrasnjost | `Armchair` |

Svaka kategorija je kockica (kartica) sa ikonom i nazivom. Klikom na kategoriju postavlja se URL parametar `kategorija=...` koji filtrira rezultate. Aktivna kategorija je vizualno oznacena (primary boja).

**Dizajn kockice:**
- Zaobljeni uglovi, border, hover efekat
- Ikona centrirana iznad naziva
- Grid: 4 kolone na desktopu, horizontalni scroll na mobilnom
- Visina kartice: kompaktna (~80px)

### 3. Sortiranje -- default "najstarije prvo"

Kad korisnik dodje na /pretraga bez parametara, default sort je "oldest" (najstarije dodani do najsvjezije). Dodati novu sort opciju "oldest" i postaviti je kao default.

### Tehnicke promjene

**Fajlovi:**

| Fajl | Akcija |
|---|---|
| `src/components/Header.tsx` | Izmjena -- PRETRAZI postaje Link |
| `src/pages/SearchResults.tsx` | Izmjena -- dodati kategorije sekciju, novi default sort |

