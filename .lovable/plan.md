# Sakrivanje "Pretraga po broju šasije" taba

## Cilj
Sakriti četvrti tab ("Pretraga po broju šasije") u `SearchPanel` komponenti, ali zadržati kod tako da se može lako vratiti. Preostala tri taba rasporediti ravnomjerno.

## Izmjene u `src/components/SearchPanel.tsx`

1. **Feature flag na vrhu fajla:**
   ```ts
   const SHOW_VIN_TAB = false; // postaviti na true za reaktivaciju
   ```

2. **Filtriranje tabova prije renderovanja:**
   ```ts
   const visibleTabs = tabs.filter(t => SHOW_VIN_TAB || t.id !== "sasija");
   ```
   Mapirati `visibleTabs` umjesto `tabs`.

3. **Grid prilagodba** — trenutno `grid-cols-2 md:grid-cols-4`:
   - Kada je VIN sakriven: `grid-cols-3 md:grid-cols-3` (tri ravnomjerne kolone na svim veličinama, pošto ostaju samo 3 taba).
   - Dinamički preko: `` `grid grid-cols-${visibleTabs.length === 4 ? '2 md:grid-cols-4' : '3'}` `` — ali zbog Tailwind JIT-a koristim eksplicitni ternarni klasni izraz bez interpolacije.

4. **Zadržati netaknuto:**
   - `VinInput` import i `vinSearch` state — ostaje (mrtav kod iza flaga, lako reaktivirati).
   - `handleSearch` granu za `activeTab === "sasija"` — ostaje.
   - JSX blok za `{activeTab === "sasija" && ...}` — ostaje (nikad neće biti aktivan dok je tab sakriven).

5. **Sigurnosna provjera:** Ako je `activeTab === "sasija"` a tab sakriven (npr. iz starog state-a), forsiraj reset na `"filter"`. Pošto je default već `"filter"`, nema problema.

## Šta NE diram
- Logiku VIN dekodiranja, edge funkciju, `VinInput` komponentu.
- Ostale stranice i komponente.

## Reaktivacija u budućnosti
Promijeniti `SHOW_VIN_TAB = true` — i sve radi kao prije.
