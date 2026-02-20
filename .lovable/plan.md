## Globalni Footer na svim stranicama

### Opis

Kreiracu zajednicku `Footer` komponentu prema dizajnu sa slike koja sadrzi dva dijela:

**1. Crveni CTA bar** (gornji dio)

- Naslov: "Imate pitanja / nejasnoća?"
- Podnaslov: "Slobodno nam se obratite. Naš tim Vam je na raspolaganju 24/7"
- Dugme: "KONTAKTIRAJTE NAS" (bijelo dugme, link na /podrska)
- Pozadina: crvena boja (primary)

**2. Traka sa prednostima** (donji dio, bijela pozadina)

- 5 stavki sa ikonama u krug (crveno-narancasta):
  - BRZA DOSTAVA - "U sve regije u BiH"
  - ONLINE PLAĆANJE - "Dostupno više vrsta plaćanja"
  - 24/7 PODRŠKA - "Uvijek smo na raspolaganju"
  - KUPOVINA BEZ RIZIKA - "Garancija na proizvode"
  - MOGUCNOST POVRATA - "Povrat robe u roku od 7 dana"

### Tehnicke izmjene


| Fajl                          | Akcija                                         |
| ----------------------------- | ---------------------------------------------- |
| `src/components/Footer.tsx`   | Kreirati novu komponentu sa oba dijela footera |
| `src/pages/Index.tsx`         | Dodati Footer na dno stranice                  |
| `src/pages/SearchResults.tsx` | Dodati Footer na dno stranice                  |
| `src/pages/PartDetail.tsx`    | Dodati Footer na dno stranice                  |
| `src/pages/Dashboard.tsx`     | Dodati Footer na dno stranice                  |
| `src/pages/Support.tsx`       | Dodati Footer na dno stranice                  |
| `src/pages/ResetPassword.tsx` | Dodati Footer na dno stranice                  |


Stranica `/prijava` (Auth.tsx) vec ima svoj poseban footer koji se uklapa u pozadinsku sliku, pa ce se taj zadrzati kako jeste.

### Struktura Footer komponente

```text
<footer>
  <!-- Crveni CTA bar -->
  <div className="bg-primary">
    <div className="container">
      <h2>Imate pitanja / nejasnoća?</h2>
      <p>Slobodno nam se obratite...</p>
      <Link to="/podrska">KONTAKTIRAJTE NAS</Link>
    </div>
  </div>

  <!-- Benefits bar -->
  <div className="bg-white border-t">
    <div className="container flex justify-between">
      [5 stavki sa ikonama]
    </div>
  </div>
</footer>
```

Ikone ce biti bijele boje iz Lucide biblioteke (Truck, CreditCard, Headphones, ShieldCheck, RotateCcw) unutar krugova sa crveno pozadinom, kao na referentnoj slici.