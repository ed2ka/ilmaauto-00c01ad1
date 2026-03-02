

## Prikaz "Nismo pronašli traženi dio" samo za pretragu po kataloškom broju

Trenutno se `NoResultsInquiry` komponenta (sa formom za slanje zahtjeva) prikazuje kad god pretraga ne vrati rezultate, bez obzira na tip pretrage. Treba je prikazivati samo kada korisnik pretražuje po kataloškom broju.

### Izmjena u `src/pages/SearchResults.tsx` (linije 229-237)

Dodati uslov: ako je `params.broj` prisutan (pretraga po kataloškom broju), prikazati `NoResultsInquiry`. U suprotnom, prikazati jednostavnu poruku "Nema rezultata".

```tsx
// Umjesto:
<NoResultsInquiry ... />

// Novo:
{params.broj ? (
  <NoResultsInquiry
    searchQuery={params.query || ""}
    marka={params.marka}
    tip={params.tip}
    dio={params.dio}
    broj={params.broj}
  />
) : (
  <div className="py-12 text-center space-y-3">
    <div className="mx-auto w-14 h-14 rounded-full bg-muted flex items-center justify-center">
      <Search className="w-6 h-6 text-muted-foreground" />
    </div>
    <h2 className="text-xl font-bold text-foreground">Nema rezultata</h2>
    <p className="text-muted-foreground">
      Pokušajte promijeniti filtere ili pretražiti po kataloškom broju.
    </p>
  </div>
)}
```

Potrebno je dodati `Search` ikonu u import iz `lucide-react` u `SearchResults.tsx`.

### Jedna datoteka, jedna izmjena
- `src/pages/SearchResults.tsx` -- uslovni prikaz NoResultsInquiry samo za kataloski broj
