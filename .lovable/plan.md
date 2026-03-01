

## Responzivni VIN Input -- ispravka layout-a

### Pravila po uređaju

**Mobilni telefoni (ispod 640px / `sm`):**
- Red 1: Prva 3 polja + razmak + narednih 6 polja (ukupno 9)
- Red 2: Preostalih 8 polja
- Red 3: Ikona Zalijepi + tekst "Zalijepi" + Ikona Kopiraj + tekst "Kopiraj"

**Tableti i desktop (640px+):**
- Sve u jednom redu kao originalno: 3 polja + razmak + 6 polja + razmak + 8 polja, a dugmici ispod u zasebnom redu

### Tehnicke izmjene

**`src/components/VinInput.tsx`**:

Vratiti strukturu blizu originalne za tablet/desktop, a na mobilnom koristiti `flex-wrap` za prelom:

```tsx
<div className="flex flex-col gap-2">
  {/* Inputi */}
  <div className="flex flex-wrap items-center gap-0.5 gap-y-2">
    {/* Grupa 1: WMI (0-2) + spacer + VDS (3-8) */}
    {[0, 1, 2].map(renderInput)}
    <span className="w-2" />
    {[3, 4, 5, 6, 7, 8].map(renderInput)}
    <span className="w-2 hidden sm:inline-block" />
    {/* Na mobilnom ovo ide u novi red automatski jer nema mjesta */}
    {[9, 10, 11, 12, 13, 14, 15, 16].map(renderInput)}
  </div>
  {/* Dugmici -- uvijek u zasebnom redu */}
  <div className="flex items-center gap-3">
    <button ...>
      <ClipboardPaste /> Zalijepi
    </button>
    <button ...>
      <ClipboardCopy /> Kopiraj
    </button>
  </div>
</div>
```

Kljucne promjene:
- Svi inputi idu u jedan `flex-wrap` kontejner -- na mobilnom ce se preostalih 8 automatski prebaciti u novi red jer nema prostora
- Dugmici (Zalijepi/Kopiraj) su uvijek u zasebnom redu ispod inputa, sa vidljivim tekstom na svim velicinama ekrana (ukloniti `hidden sm:inline`)
- Na tabletu/desktopu svi inputi staju u jedan red, dugmici ispod -- isto kao originalno

