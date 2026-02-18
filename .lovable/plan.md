
## Spajanje "marka vozila" i "tip vozila" u jedan element

Trenutno su "marka vozila" i "tip vozila" dva odvojena select polja. Plan je spojiti ih u jedan pametni dropdown element koji radi u dva koraka:

### Kako ce raditi

1. Korisnik klikne na polje "Marka i tip vozila"
2. Otvori se dropdown sa listom marki (Audi, BMW, Mercedes, itd.)
3. Kada korisnik klikne na marku (npr. Audi), dropdown se prosiri i prikazuje modele te marke
4. Na vrhu liste modela stoji checkbox "Odaberi sve" koji oznacava sve modele
5. Korisnik moze oznaciti pojedinacne modele ili sve odjednom
6. Odabrani modeli se prikazuju u polju (npr. "Audi - A3, A4, A6" ili "Audi - Svi modeli")

### Tehnicka implementacija

**Novi component: `VehicleSelector.tsx`**
- Custom dropdown component koji koristi Popover iz Radix UI
- State management:
  - `selectedBrand` - odabrana marka vozila
  - `selectedModels` - array odabranih modela
  - `isOpen` - da li je dropdown otvoren
  - `step` - "brands" ili "models" (koji korak je aktivan)
- Podaci o markama i modelima definisani kao objekt:
  ```
  Audi: [A1, A3, A4, A5, A6, A8, Q3, Q5, Q7, TT]
  BMW: [Serija 1, Serija 3, Serija 5, Serija 7, X1, X3, X5, X6]
  Mercedes: [A klasa, B klasa, C klasa, E klasa, S klasa, GLA, GLC, GLE]
  ...
  ```
- Dropdown izgleda kao FloatingSelect (ista stilizacija sa floating label)
- Unutar dropdowna:
  - Ako je step "brands": lista marki kao klikabilni redovi
  - Ako je step "models": back dugme, naziv marke, zatim "Odaberi sve" checkbox, pa lista modela sa checkboxima
- Checkbox koristi Radix Checkbox komponentu

**Izmjene u `SearchPanel.tsx`**
- Ukloniti dva odvojena FloatingSelect polja za marku i tip
- Zamijeniti sa jednim `<VehicleSelector />` componentom koji zauzima punu sirinu reda
- Ostala polja (naziv dijela, kategorija) ostaju ista u drugom redu

### Vizuelni izgled

```
+--------------------------------------------------+
| marka i tip vozila                                |
| Audi - A3, A4, Q5                            v   |
+--------------------------------------------------+

Dropdown otvoren (korak 1 - marke):
+--------------------------------------------------+
| > Audi                                           |
| > BMW                                            |
| > Mercedes                                       |
| > Volkswagen                                     |
| > Toyota                                         |
| > Ford                                           |
+--------------------------------------------------+

Dropdown otvoren (korak 2 - modeli):
+--------------------------------------------------+
| < Nazad     AUDI                                 |
|--------------------------------------------------|
| [x] Odaberi sve                                  |
|--------------------------------------------------|
| [x] A1                                           |
| [x] A3                                           |
| [ ] A4                                           |
| [ ] A5                                           |
+--------------------------------------------------+
```
