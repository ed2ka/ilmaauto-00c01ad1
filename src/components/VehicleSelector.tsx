import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useBrands, useModels } from "@/hooks/useParts";

interface VehicleSelectorProps {
  onSelectionChange?: (brand: string | null, models: string[]) => void;
}

const VehicleSelector = ({ onSelectionChange }: VehicleSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"brands" | "models">("brands");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const { data: brands = [] } = useBrands();
  const { data: modelOptions = [] } = useModels(selectedBrand);

  const allSelected = modelOptions.length > 0 && modelOptions.every((m) => selectedModels.includes(m));

  useEffect(() => {
    onSelectionChange?.(selectedBrand, selectedModels);
  }, [selectedBrand, selectedModels]);



  const handleBrandClick = (brand: string) => {
    if (brand !== selectedBrand) {
      setSelectedModels([]);
    }
    setSelectedBrand(brand);
    setStep("models");
  };

  const handleBack = () => setStep("brands");

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBrand(null);
    setSelectedModels([]);
    setStep("brands");
  };

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const toggleAll = () => {
    setSelectedModels(allSelected ? [] : [...modelOptions]);
  };

  const displayValue = () => {
    if (!selectedBrand) return "";
    if (selectedModels.length === 0) return selectedBrand;
    if (allSelected) return `${selectedBrand} - Svi modeli`;
    if (selectedModels.length <= 3) return `${selectedBrand} - ${selectedModels.join(", ")}`;
    return `${selectedBrand} - ${selectedModels.length} modela`;
  };

  return (
    <Popover open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (open) setStep(selectedBrand ? "models" : "brands"); }}>
      <PopoverTrigger asChild>
        <fieldset className="relative border border-input rounded bg-background px-3 pt-1 pb-0 cursor-pointer">
          <legend className="text-xs text-muted-foreground px-1">marka i tip vozila</legend>
          <div className="w-full h-9 flex items-center justify-between text-sm">
            <span className={displayValue() ? "text-foreground" : "text-muted-foreground/50"}>
              {displayValue() || "Izaberite marku i tip vozila"}
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              {selectedBrand && (
                <button onClick={handleClear} className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm hover:bg-accent">
                  <X className="w-4 h-4" />
                </button>
              )}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
              </svg>
            </div>
          </div>
        </fieldset>
      </PopoverTrigger>

      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)] bg-popover border border-input shadow-lg z-[100]"
        align="start"
        sideOffset={4}
      >
        {step === "brands" && (
          <div className="max-h-64 overflow-y-auto">
            {brands.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">Učitavanje...</div>
            ) : brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandClick(brand)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent transition-colors ${
                  brand === selectedBrand ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                <span>{brand}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}

        {step === "models" && selectedBrand && (
          <div>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-input">
              <button onClick={handleBack} className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold tracking-wide uppercase text-foreground">{selectedBrand}</span>
            </div>

            {modelOptions.length > 0 && (
              <label className="flex items-center gap-3 px-4 py-2.5 border-b border-input cursor-pointer hover:bg-accent transition-colors">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                <span className="text-sm font-medium text-foreground">Odaberi sve</span>
              </label>
            )}

            <div className="max-h-52 overflow-y-auto">
              {modelOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-muted-foreground">Učitavanje...</div>
              ) : modelOptions.map((model) => (
                <label key={model} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-accent transition-colors">
                  <Checkbox checked={selectedModels.includes(model)} onCheckedChange={() => toggleModel(model)} />
                  <span className="text-sm text-foreground">{model}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default VehicleSelector;
