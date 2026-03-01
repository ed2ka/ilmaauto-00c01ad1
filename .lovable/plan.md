

## Klik na pill tag popunjava VehicleSelector

### Problem
VehicleSelector ima interni state -- nema nacina da se izvana postavi marka/model.

### Rjesenje

**1. `src/components/VehicleSelector.tsx`** -- dodati kontrolirane props:
- Dodati `externalBrand?: string | null` i `externalModel?: string | null` u props interfejs
- Dodati `useEffect` koji reaguje na promjenu ovih props-a:
  - Kada se `externalBrand` postavi, pozvati `setSelectedBrand(externalBrand)` i `setStep("models")`
  - Ne otvarati popover automatski, samo popuniti vrijednosti
- Za model: nakon sto se modeli ucitaju, provjeriti da li `externalModel` odgovara nekom od dostupnih modela (case-insensitive partial match) i ako da, dodati ga u `selectedModels`

**2. `src/components/SearchPanel.tsx`**:
- Dodati state `externalBrand` i `externalModel` (inicijalno null)
- Na klik pill taga, postaviti `externalBrand` i `externalModel` iz kliknutog itema
- Proslijediti te vrijednosti kao props u `<VehicleSelector>`
- Promijeniti `<span>` u `<button>` sa `cursor-pointer` i hover efektom

### Detalji implementacije

VehicleSelector ce dobiti novi useEffect:
```tsx
useEffect(() => {
  if (externalBrand) {
    setSelectedBrand(externalBrand);
    setSelectedModels([]);
    setStep("models");
  }
}, [externalBrand, externalModel]);
```

I drugi useEffect za model matching nakon sto se modeli ucitaju:
```tsx
useEffect(() => {
  if (externalModel && modelOptions.length > 0) {
    const match = modelOptions.find(m => 
      m.toLowerCase().includes(externalModel.toLowerCase())
    );
    if (match && !selectedModels.includes(match)) {
      setSelectedModels([match]);
    }
  }
}, [modelOptions, externalModel]);
```

SearchPanel pill tagovi postaju klikabilni buttoni sa hover efektom (`hover:bg-accent`).

