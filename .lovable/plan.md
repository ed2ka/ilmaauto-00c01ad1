
## Premještanje disclaimer teksta iznad dugmeta NARUCI

### Izmjene u `src/pages/PartDetail.tsx`

1. **Ukloniti** postojeci paragraf sa linija 286-288 (tekst "Moguca zamjena...")
2. **Dodati** isti paragraf **iznad** order buttons sekcije, tj. prije `{/* Order buttons */}` komentara na liniji 247

Rezultat: tekst "Moguca zamjena ako ne odgovara: 7 dana -- Procitaj vise" ce se prikazivati izmedju badge-ova (pregleda) i dugmeta NARUCI.
