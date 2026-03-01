

## VIN Input - Unos cifra po cifra

Zamjena obicnog text inputa za VIN broj sa custom komponentom koja prikazuje 17 individualnih polja za unos, jedno po karakteru.

### Nova komponenta: `src/components/VinInput.tsx`

- 17 individualnih polja (`input` elemenata) u nizu, svako prima jedan karakter
- Automatski prelaz na sljedece polje nakon unosa karaktera
- Backspace brise trenutno polje i vraca fokus na prethodno
- **Paste podrska**: Detektuje `onPaste` event, rasporedi karaktere po poljima, preskace razmake
- **Paste ikonica**: Dugme sa `ClipboardPaste` ikonom na kraju niza - klik cita clipboard (`navigator.clipboard.readText()`) i popunjava polja
- **Filtriranje razmaka**: Svaki unos prolazi kroz filter koji odbacuje space karaktere (` `)
- Dozvoljeni karakteri: alfanumericki (A-Z, 0-9), sve se automatski pretvara u uppercase
- Vizuelno: polja grupisana u segmente (npr. 3-6-8 format VIN-a) sa malim razmakom izmedju grupa
- Stil polja: `w-8 h-10 text-center border rounded text-sm font-mono uppercase` sa fokusom highlight

### Izmjena: `src/components/SearchPanel.tsx`

- Import `VinInput` komponente
- U "sasija" tabu zamijeniti `FloatingInput` sa:
  ```
  <fieldset> sa legendom "Broj sasije (VIN)"
    <VinInput value={vinSearch} onChange={setVinSearch} />
  </fieldset>
  ```
- `vinSearch` state ostaje string od 17 karaktera, VinInput interno upravlja nizom

### Detalji ponasanja

1. **Unos**: Korisnik klikne na prvo polje, upise karakter, fokus ide na sljedece
2. **Paste**: Ctrl+V na bilo kojem polju - razmaci se filtriraju, karakteri se rasporede
3. **Paste dugme**: Klik na ikonicu - cita clipboard, filtrira razmake, popunjava polja
4. **Razmaci**: Automatski se brisu iz unosa i paste-a
5. **Backspace**: Brise karakter i vraca fokus na prethodno polje

