## Problem

Na `/pretraga` stranici, kada nema rezultata, `NoResultsInquiry` (poruka "Na lageru imamo preko 1.000.000 autodijelova..." + forma za slanje zahtjeva) prikazuje se **samo** kada je pretraga rađena po kataloškom broju (`params.broj`). U svim ostalim slučajevima (pretraga po marki/tipu/nazivu dijela) korisnik vidi samo generičku poruku "Nema rezultata. Pokušajte promijeniti filtere...".

## Rješenje

U `src/pages/SearchResults.tsx`, u bloku za prikaz rezultata, zamijeniti uslov tako da se `NoResultsInquiry` prikazuje **uvijek** kada nema rezultata, bez obzira na to da li je pretraga rađena po kataloškom broju, marki, tipu ili nazivu dijela.

Konkretno, ukloniti `params.broj ? (...) : (generička poruka)` granu i ostaviti samo `NoResultsInquiry` koji već dinamički gradi tekst zahtjeva iz svih dostupnih parametara (`marka`, `tip`, `dio`, `broj`, `query`) preko interne `buildSearchText()` funkcije — tako da radi za sve tipove pretraga.

Generička poruka "Nema rezultata / Pokušajte promijeniti filtere" se uklanja jer je `NoResultsInquiry` korisniji (sadrži CTA za slanje zahtjeva).

## Tehnički detalji

**Fajl:** `src/pages/SearchResults.tsx`

Trenutni kod:
```tsx
) : params.broj ? (
  <NoResultsInquiry searchQuery={...} marka={...} tip={...} dio={...} broj={...} />
) : (
  <div>Nema rezultata. Pokušajte promijeniti filtere...</div>
)
```

Novi kod:
```tsx
) : (
  <NoResultsInquiry
    searchQuery={params.query || ""}
    marka={params.marka}
    tip={params.tip}
    dio={params.dio}
    broj={params.broj}
  />
)
```

Nema drugih izmjena — `NoResultsInquiry` već podržava sve kombinacije parametara.
