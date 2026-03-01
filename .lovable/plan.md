

## Vraćanje pill tagova na neklikabilne

Uklanjanje klikabilne funkcionalnosti sa "Posljednja pretraga" pill tagova -- vraćanje na statične elemente.

### Izmjene

**1. `src/components/SearchPanel.tsx`**:
- Ukloniti `externalBrand` i `externalModel` state (linije 106-107)
- Vratiti `<button>` elemente nazad u `<span>` bez `onClick`, `cursor-pointer`, `hover` efekata i `transition-colors`
- Ukloniti `externalBrand` i `externalModel` props sa `<VehicleSelector>` komponente

**2. `src/components/VehicleSelector.tsx`**:
- Ukloniti `externalBrand` i `externalModel` iz props interfejsa
- Ukloniti oba `useEffect`-a koja reaguju na te props-e
- Vratiti komponentu na originalni oblik prije ove izmjene

