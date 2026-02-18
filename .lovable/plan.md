

## Dodavanje opcije za ponistavanje odabira u VehicleSelector

Trenutno VehicleSelector nema mogucnost da korisnik ponisti (ocisti) odabranu marku i modele. Plan je dodati "X" dugme za brisanje odabira.

### Kako ce raditi

- Kada korisnik odabere marku i/ili modele, desno u polju (pored strelice) pojavi se mala "X" ikona
- Klikom na "X" ponistava se kompletna selekcija (marka i modeli se resetuju)
- "X" ikona se prikazuje samo kada postoji odabir (ako nista nije odabrano, nema "X")
- Klikom na "X" ne otvara se dropdown - samo se brise odabir

### Tehnicka implementacija

**Izmjene u `VehicleSelector.tsx`**

- Dodati `handleClear` funkciju koja resetuje `selectedBrand` na `null`, `selectedModels` na prazan array, i `step` na `"brands"`
- U trigger polju, pored chevron strelice, dodati `X` ikonu (iz lucide-react) koja se prikazuje samo kad `selectedBrand` postoji
- Na `X` ikonu staviti `onClick` handler sa `e.stopPropagation()` kako klik ne bi otvorio dropdown
- Ikona ce biti mala (w-4 h-4), sive boje sa hover efektom na tamniju

