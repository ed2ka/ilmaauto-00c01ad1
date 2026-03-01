

## Izmjene VIN inputa i error poruke

### 1. Poboljšana error poruka za neuspješno dekodiranje VIN-a

U `src/components/SearchPanel.tsx`, promijeniti catch blok (linija 120) da prikazuje specifičnu poruku:

> "Žao nam je, nismo uspjeli pronaći vaše vozilo automatski putem broja šasije, molimo vas izvršite pretragu na neki drugi način."

### 2. COPY i PASTE dugmad sa ikonama i tekstom

U `src/components/VinInput.tsx`:

- Zamijeniti postojece PASTE dugme (samo ikona) sa dugmetom koje ima ikonu + tekst "Zalijepi"
- Dodati novo COPY dugme sa `ClipboardCopy` ikonom + tekst "Kopiraj" koje kopira trenutni VIN string u clipboard
- Oba dugmeta ce biti u redu ispod VIN polja, stilizirana kao mali linkovi/dugmici

### Tehnicke izmjene

**`src/components/SearchPanel.tsx`** (linija 120)
- Promijeniti `description` u toast poruci na novu poruku

**`src/components/VinInput.tsx`**
- Import `ClipboardCopy` iz lucide-react pored `ClipboardPaste`
- Dodati `handleCopyButton` funkciju koja koristi `navigator.clipboard.writeText(value)`
- Zamijeniti layout: VIN polja gore, ispod toga red sa dva dugmeta (Zalijepi i Kopiraj)
- Dugmad: `flex items-center gap-1.5` sa ikonom (w-4 h-4) i tekstom

