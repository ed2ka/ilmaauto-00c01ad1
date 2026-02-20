

## Naslov i podnaslov iznad modala na /prijava stranici

### Izmjene u `src/pages/Auth.tsx`

**1. Dodati naslov i podnaslov iznad Card komponente (linija 127-128)**

Iznad `<Card>` dodati:
- Naslov: "Pristup korisnickom nalogu" -- bijeli tekst, veci font, bold
- Podnaslov: "Upravljajte narudzbama, adresama i podacima na jednostavan nacin." -- bijeli tekst, manji, priguseni

**2. Promjena layouta da modal raste prema dole**

Trenutno `main` koristi `items-center` sto centrira Card vertikalno. Kada se prebaci na registraciju (vise polja), modal se pomjera gore-dole jer se recentrira.

Rjesenje:
- Zamijeniti `items-center` sa `items-start` i dodati `pt-[15vh]` ili slicno da se naslov pozicionira na fiksnom mjestu od vrha
- Alternativno, koristiti `justify-start` sa paddingom, tako da naslov i modal uvijek krecu od iste tacke, a modal raste samo prema dole

Konkretno:
- `main` klasa: zamijeniti `items-center` sa `items-start justify-center` i dodati gornji padding
- Omotati naslov + Card u `div` sa fiksnom pozicijom od vrha

### Struktura

```text
<main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 py-8">
  <div className="w-full max-w-md flex flex-col items-center">
    <h1>Pristup korisnickom nalogu</h1>
    <p>Upravljajte narudzbama, adresama i podacima...</p>
    <Card className="w-full">
      ...
    </Card>
  </div>
</main>
```

Koristeci `flex-col` i `items-center` sa wrapper divom, naslov ostaje fiksiran na vrhu wrappera, a Card raste prema dole kada se prebaci na registraciju.

### Rezime

| Fajl | Akcija |
|------|---------|
| `src/pages/Auth.tsx` | Dodati naslov/podnaslov iznad Card-a, promijeniti layout na flex-col da modal raste prema dole |

