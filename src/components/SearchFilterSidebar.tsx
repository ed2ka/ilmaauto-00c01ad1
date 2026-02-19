import { useSearchParams } from "react-router-dom";
import { useBrands, useModels } from "@/hooks/useParts";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, X } from "lucide-react";

const SearchFilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const marka = searchParams.get("marka") || "";
  const tip = searchParams.get("tip") || "";
  const dio = searchParams.get("dio") || "";
  const broj = searchParams.get("broj") || "";

  const { data: brands = [] } = useBrands();
  const { data: models = [] } = useModels(marka || null);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    // reset tip when marka changes
    if (key === "marka") next.delete("tip");
    setSearchParams(next);
  };

  const removeParam = (key: string) => updateParam(key, "");

  const resetAll = () => setSearchParams({});

  const activeFilters = [
    marka && { key: "marka", label: marka },
    tip && { key: "tip", label: tip },
    dio && { key: "dio", label: dio },
    broj && { key: "broj", label: broj },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Filteri</h3>
        {activeFilters.length > 0 && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Resetuj
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activeFilters.map((f) => (
            <Badge key={f.key} variant="secondary" className="gap-1 pr-1 cursor-pointer" onClick={() => removeParam(f.key)}>
              {f.label}
              <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Marka</label>
          <Select value={marka || undefined} onValueChange={(v) => updateParam("marka", v)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Sve marke" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {brands.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Model / Tip</label>
          <Select
            value={tip || undefined}
            onValueChange={(v) => updateParam("tip", v)}
            disabled={!marka}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder={marka ? "Svi modeli" : "Odaberi marku"} />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {models.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Naziv dijela</label>
          <Input
            placeholder="npr. far, branik..."
            value={dio}
            onChange={(e) => updateParam("dio", e.target.value)}
            className="bg-background"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Kataloški broj</label>
          <Input
            placeholder="npr. 1K0941..."
            value={broj}
            onChange={(e) => updateParam("broj", e.target.value)}
            className="bg-background"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilterSidebar;
