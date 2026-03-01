## Dodavanje "Pronađeno XYZC dijelova u protekla 24h" iznad dugmeta Pretraži

### Logika broja

- Generisati random četverocifreni broj između 2666 i 8711
- Broj se čuva u `sessionStorage` pod ključem npr. `ilma_parts_found_24h`
- Pri mount-u komponente, provjeriti da li već postoji u sessionStorage -- ako da, koristiti taj; ako ne, generisati novi i sačuvati
- Ovo osigurava da broj ostaje isti dok traje browser sesija (bez obzira na refresh ili navigaciju), i ne restuje se kada se zatvori broswer, dakle otporan je na to.

### UI izmjena u `src/components/SearchPanel.tsx`

- Dodati `useState` + `useEffect` za inicijalizaciju broja iz sessionStorage
- Iznad dugmeta "Pretraži" (linija 202), dodati paragraf:
  ```
  <p className="text-center text-sm text-muted-foreground">
    Pronađeno <span className="font-bold text-foreground">{partsFound24h}</span> dijelova u protekla 24h
  </p>
  ```
- Broj će biti boldiran za vizualni naglasak

### Tehničke izmjene

`**src/components/SearchPanel.tsx**`:

- Dodati state: `const [partsFound24h, setPartsFound24h] = useState<number>(0)`
- Dodati `useEffect` koji čita/piše sessionStorage ključ `ilma_parts_found_24h`
- Umetnuti tekst između linije 201 (`space-y-3`) i linije 202 (`<button>`)