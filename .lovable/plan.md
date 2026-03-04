
## Plan za brendiranje sajta na ILMA AUTO

Na osnovu tvog odgovora, uradiću samo branding u javnom interfejsu i metadata sloju, bez mijenjanja vidljivog logotipa u headeru/footeru.

### Šta ću promijeniti

#### 1. Browser title
U `index.html` ću promijeniti:
- `title` u: `ILMA AUTO - originalni autodijelovi`

#### 2. Favicon
Iskoristiću uploadani znak kao favicon:
- kopirati `user-uploads://Screenshot_1-2.png` u `public/`
- povezati ga u `index.html` preko `<link rel="icon" ...>`

#### 3. Uklanjanje svih javno vidljivih Lovable tragova iz metadata
U `index.html` ću zamijeniti sve default vrijednosti koje sada spominju Lovable:
- `meta description`
- `meta author`
- `og:title`
- `og:description`
- `og:image` (ukloniti Lovable preview sliku i zamijeniti lokalnim favicon/brand assetom ili neutralnom ILMA varijantom)
- `twitter:site`
- `twitter:image`

### Šta neću dirati
- neću mijenjati postojeći tekstualni logo u headeru
- neću dirati README i interne developerske fajlove
- neću dirati auto-generisane integracione fajlove

### Tehnički detalji
- Glavna izmjena je u `index.html`
- Favicon asset će biti dodat u `public/` kako bi bio dostupan direktno iz browsera
- Pošto želiš da se “Lovable” nigdje ne spominje javno, ukloniću i preostale default social/share meta reference iz head sekcije

### Datoteke obuhvaćene planom
- `index.html`
- `public/...` (novi favicon fajl iz dostavljenog uploada)
