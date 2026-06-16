## Nova sekcija: "Pronađite nas online" (poslije FAQ)

Dodajem novu sekciju na homepage ispod "Najčešće postavljena pitanja", identičnu uploadanom dizajnu.

### Struktura (5 kartica u grid layoutu)

Layout: 2 kolone gore (4 kartice) + 1 široka kartica dolje. Svaka kartica `rounded-[9px]`, visine ~220px, sa pozadinskim vizualom/logom desno i tekstualnim sadržajem lijevo.

```
┌─────────────────┬─────────────────┐
│  INSTAGRAM      │  FACEBOOK       │
├─────────────────┼─────────────────┤
│  OLX SHOP       │  NJUŠKALO       │
├─────────────────┴─────────────────┤
│  EBAY STORE (full width)          │
└───────────────────────────────────┘
```

### Kartice — sadržaj

1. **Instagram** — crna pozadina, IG gradient logo desno
   - "Pratite nove dijelove, vozila za rastavljanje i dnevne objave."
   - @ilmaauto
   - CTA žuti button: "ZAPRATI NAS →"
   - Link: instagram.com/ilmaauto

2. **Facebook** — tamno plava pozadina, FB "f" logo desno
   - "Novosti, akcije, dolazak novih vozila i komunikacija sa kupcima."
   - CTA žuti: "POSJETI STRANICU →"

3. **OLX Shop** — tamno zelena, OLX logo desno
   - "Pogledajte kompletnu ponudu polovnih i novih auto dijelova."
   - CTA tirkizni: "PREGLEDAJ OGLASE →"

4. **Njuškalo** — žuta pozadina + njuškalo maskota
   - "ILMA AUTO ponuda za kupce iz Hrvatske."
   - CTA žuti (tamni tekst): "POSJETI TRGOVINU →"

5. **eBay Store** (široka) — tamno plava sa svjetskom mapom + slika dijelova/kutije
   - Naslov: "**EBAY** STORE" (EBAY žuto, STORE bijelo)
   - "Auto dijelovi dostupni kupcima širom Europe i svijeta."
   - Checklist: Globalna dostava, eBay Buyer Protection, Hiljade dostupnih dijelova
   - CTA žuti: "POSJETI EBAY STORE →"

### Tehnički detalji

- Novi file: `src/components/MarketplaceGrid.tsx`
- Import i ubacivanje u `src/pages/Index.tsx` poslije `<FAQ />`, prije `<Footer />`
- Tipografija: Poppins (postojeća), uppercase tracking za naslove
- Border radius: `rounded-[9px]` (project standard)
- Generiram potrebne pozadinske vizuale (auto far, ebay scene, njuškalo maskota itd.) preko imagegen — premium tier za eBay karticu (sadrži tekst/logo detalje); ili koristim CSS gradient + tekst-only logo overlay ako želite uštedu
- Logo gradijenti (IG/FB/OLX/eBay/Njuškalo) renderirani kao veliki vodeni žigovi desno na svakoj kartici

### Pitanja prije implementacije

1. **URL-ovi** — koje su tačne adrese za Instagram, Facebook, OLX shop, Njuškalo trgovinu i eBay store? (Trebam ih za href-ove)
2. **Pozadinski vizuali** — da generišem nove slike (premium, ~5 generacija) ili da koristim čistu boju + veliki logo kao prozirni vodeni žig (besplatno, brže)?
