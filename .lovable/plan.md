## Izmjena CTA sekcije na `/podrska`

U `src/pages/Support.tsx`, posljednja CTA sekcija ("Niste pronašli ono što tražite?"):

- Pozadina: `bg-[#1b2835]` → `bg-[#e1e1e1]`
- Ukloniti tamni radijalni gradijent overlay (ne odgovara svijetloj pozadini)
- Naslov H2: `text-white` → `text-[#8a8989]`
- Paragraf: `text-white/70` → `text-[#8a8989]`
- CTA dugme "Pošalji upit": ostaje crveno (`bg-brand-red`) sa bijelim tekstom — dovoljan kontrast na svijetlom backgroundu
