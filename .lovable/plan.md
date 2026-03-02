

## FAQ sekcija na homepage-u

Dodati FAQ sekciju ispod sekcije "Marka vozila" u `src/pages/Index.tsx` koristeći postojeću `Accordion` komponentu iz `src/components/ui/accordion.tsx`.

### Implementacija

- Kreirati novu komponentu `src/components/FAQ.tsx` sa Accordion komponentom
- Prvo pitanje (`defaultValue`) otvoreno, ostala zatvorena
- Chevron ikonica već postoji u `AccordionTrigger` komponenti
- Dodati FAQ komponentu u `Index.tsx` između `BrandGrid` sekcije i `Footer`-a
- Stilizacija: bijela pozadina, container layout, naslov "Često postavljana pitanja"

### Sadržaj
10 pitanja i odgovora kako ih je korisnik naveo, uključujući formatiranje liste za pitanje #8 (načini plaćanja).

