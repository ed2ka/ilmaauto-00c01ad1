

## VIN Dekoder - Pretraga po broju sasije

Kada korisnik unese VIN broj u tab "Pretraga po broju sasije" i klikne "Pretrazi", aplikacija ce:

1. Poslati VIN na backend funkciju koja koristi AI model za dekodiranje
2. Iz VIN-a izvuci marku, tip/model i godiste vozila
3. Preusmjeriti korisnika na `/pretraga` sa aktivnim filterima (marka, tip) na osnovu dekodiranih podataka
4. Prikazati loading stanje dok se VIN dekodira

### Tehnicke izmjene

**1. Nova backend funkcija `supabase/functions/decode-vin/index.ts`**
- Prima VIN broj kao input
- Koristi Lovable AI (gemini-2.5-flash) za dekodiranje VIN-a
- Vraca JSON sa `marka`, `tip` i `godina` poljem
- AI prompt instruira model da iz VIN-a izvuce iskljucivo marku, model i modelsku godinu
- Mapira rezultat na format koji odgovara postojecim markama u bazi (uppercase, npr. "MERCEDES", "VOLKSWAGEN", "FORD")

**2. Izmjena `src/components/SearchPanel.tsx`**
- U `handleSearch()` za tab "sasija": umjesto direktnog navigiranja sa `q=VIN`, poziva edge funkciju `decode-vin`
- Prikazuje loading spinner na dugmetu dok traje dekodiranje
- Po uspjesnom dekodiranju: navigira na `/pretraga?marka=MERCEDES&tip=E` (primjer)
- Po gresci: prikazuje toast poruku o neuspjelom dekodiranju
- Dodaje state `isDecoding` za upravljanje loading stanjem

**3. Tok korisnickog iskustva**
- Korisnik unese VIN (17 karaktera) u polje
- Klikne "Pretrazi"
- Dugme prikazuje spinner i tekst "Dekodiranje VIN-a..."
- Nakon 1-2 sekunde, korisnik je preusmjeren na stranicu pretrage sa aktivnim filterima za tu marku i tip vozila
- Rezultati prikazuju samo dijelove dostupne za to vozilo

