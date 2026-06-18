import { useSearchParams } from "react-router-dom";
import { useBrands, useModels } from "@/hooks/useParts";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, RotateCcw, X } from "lucide-react";

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
    <>
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
          <div className="flex items-center gap-1">
            <Select value={marka || undefined} onValueChange={(v) => updateParam("marka", v)}>
              <SelectTrigger className="bg-background flex-1">
                <SelectValue placeholder="Sve marke" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {marka && (
              <button onClick={() => removeParam("marka")} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Model / Tip</label>
          <div className="flex items-center gap-1">
            <Select
              value={tip || undefined}
              onValueChange={(v) => updateParam("tip", v)}
              disabled={!marka}
            >
              <SelectTrigger className="bg-background flex-1">
                <SelectValue placeholder={marka ? "Svi modeli" : "Odaberi marku"} />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {models.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {tip && (
              <button onClick={() => removeParam("tip")} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Naziv dijela</label>
          <div className="relative">
            <Input
              placeholder="npr. far, branik..."
              value={dio}
              onChange={(e) => updateParam("dio", e.target.value)}
              className="bg-background pr-8"
            />
            {dio && (
              <button onClick={() => removeParam("dio")} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Kataloški broj</label>
          <div className="relative">
            <Input
              placeholder="npr. 1K0941..."
              value={broj}
              onChange={(e) => updateParam("broj", e.target.value)}
              className="bg-background pr-8"
            />
            {broj && (
              <button onClick={() => removeParam("broj")} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

      <div className="space-y-4 mt-6 pt-6 border-t border-border">
        <div>
          <h4 className="font-bold text-sm text-foreground">GARANCIJA</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Na sve kupljene dijelove ostvarujete garanciju od <strong className="text-foreground">1 godine</strong>.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm text-foreground">EASY RETURN</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Sve kupljene dijelove možete vratiti u roku od <strong className="text-foreground">7 dana</strong>.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={CONTACT.phoneMobileHref}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-brand-yellow to-brand-yellow hover:from-brand-yellow/90 hover:to-brand-yellow/90 text-brand-noir rounded-lg text-sm font-bold transition-all"
          >
            <Phone className="w-4 h-4" />
            {CONTACT.phoneMobile}
          </a>
          <a
            href={CONTACT.phoneLandlineHref}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-lg text-sm font-bold transition-all"
          >
            <Phone className="w-4 h-4" />
            {CONTACT.phoneLandline}
          </a>
        </div>
      </div>
    </>
  );
};

export default SearchFilterSidebar;
