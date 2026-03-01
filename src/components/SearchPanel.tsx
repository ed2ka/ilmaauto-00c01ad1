import { useState } from "react";
import { Search, SlidersHorizontal, Type, Hash, Car, X, MessageCircle, Star, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import VehicleSelector from "./VehicleSelector";
import VinInput from "./VinInput";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { usePartsCount } from "@/hooks/useParts";

type SearchTab = "filter" | "naziv" | "kataloski" | "sasija";

const tabs: {id: SearchTab;label: React.ReactNode;icon: string;}[] = [
{ id: "filter", label: <>Filter<br />pretraga dijelova</>, icon: "SlidersHorizontal" },
{ id: "naziv", label: <>Pretraga po<br />nazivu dijela</>, icon: "Type" },
{ id: "kataloski", label: <>Pretraga po<br />kataloškom broju</>, icon: "Hash" },
{ id: "sasija", label: <>Pretraga po<br />broju šasije</>, icon: "Car" }];


const categoryOptions = ["Motor", "Karoserija", "Elektrika", "Ovjes", "Kočnice"];

const CategorySelect = ({ value, onChange }: {value: string | null;onChange: (v: string | null) => void;}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <fieldset className="relative border border-input rounded bg-background px-3 pt-1 pb-0 cursor-pointer">
          <legend className="text-xs text-muted-foreground px-1">Kategorija dijela</legend>
          <div className="w-full h-9 flex items-center justify-between text-sm">
            <span className={value ? "text-foreground" : "text-muted-foreground/50"}>
              {value || "Odaberite kategoriju dijela"}
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              {value &&
              <button onClick={handleClear} className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm hover:bg-accent">
                  <X className="w-4 h-4" />
                </button>
              }
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
              </svg>
            </div>
          </div>
        </fieldset>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] bg-popover border border-input shadow-lg z-[100]" align="start" sideOffset={4}>
        <div className="max-h-64 overflow-y-auto">
          {categoryOptions.map((cat) =>
          <button
            key={cat}
            onClick={() => {onChange(cat);setIsOpen(false);}}
            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors ${cat === value ? "text-primary font-medium" : "text-foreground"}`}>

              {cat}
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>);

};

const FloatingInput = ({ label, placeholder, value, onChange }: {label: string;placeholder: string;value: string;onChange: (v: string) => void;}) =>
<fieldset className="relative border border-input rounded bg-background px-3 pt-1 pb-0">
    <legend className="text-xs text-muted-foreground px-1">{label}</legend>
    <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full h-9 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none" />

  </fieldset>;


const SearchPanel = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>("filter");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter state
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [partName, setPartName] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [nameSearch, setNameSearch] = useState("");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [vinSearch, setVinSearch] = useState("");

  const { data: totalCount } = usePartsCount();

  const handleSearch = async () => {
    if (activeTab === "sasija") {
      if (!vinSearch || vinSearch.trim().length !== 17) {
        toast({ title: "Greška", description: "VIN broj mora imati tačno 17 karaktera.", variant: "destructive" });
        return;
      }
      setIsDecoding(true);
      try {
        const { data, error } = await supabase.functions.invoke("decode-vin", {
          body: { vin: vinSearch.trim().toUpperCase() },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        const params = new URLSearchParams();
        if (data.marka) params.set("marka", data.marka.toUpperCase());
        if (data.tip) params.set("tip", data.tip.toUpperCase());
        navigate(`/pretraga?${params.toString()}`);
      } catch (e: any) {
        toast({ title: "Dekodiranje neuspješno", description: "Žao nam je, nismo uspjeli pronaći vaše vozilo automatski putem broja šasije, molimo vas izvršite pretragu na neki drugi način.", variant: "destructive" });
      } finally {
        setIsDecoding(false);
      }
      return;
    }

    const params = new URLSearchParams();

    if (activeTab === "filter") {
      if (selectedBrand) params.set("marka", selectedBrand);
      if (selectedModels.length === 1) params.set("tip", selectedModels[0]);
      if (partName) params.set("dio", partName);
    } else if (activeTab === "naziv") {
      if (nameSearch) params.set("dio", nameSearch);
    } else if (activeTab === "kataloski") {
      if (catalogSearch) params.set("broj", catalogSearch);
    }

    navigate(`/pretraga?${params.toString()}`);
  };

  return (
    <div className="backdrop-blur-md rounded-lg w-full max-w-2xl animate-fade-in-up shadow-2xl bg-white/0 overflow-hidden border border-white/[0.28]">
      {/* Header */}
      <div className="px-6 md:px-8 py-[50px] bg-white/10 backdrop-blur-md border-solid rounded border-muted-foreground border-0">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">Pretraga dijelova</h2>
        <p className="text-white/80 text-base md:text-lg">Najveća baza autodijelova na Balkanu</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {tabs.map((tab, i) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative flex flex-col items-center gap-2 py-4 px-3 text-xs font-semibold tracking-wide transition-all duration-200 after:content-[''] after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:bg-red-500 after:transition-transform after:duration-300 ${
          activeTab === tab.id ? "text-primary bg-card after:scale-x-100 after:origin-bottom-left" : "text-muted-foreground hover:text-foreground bg-tab-inactive after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left"} ${
          i > 0 ? "border-l border-input" : ""}`}>

            {tab.icon === "SlidersHorizontal" && <SlidersHorizontal className="w-5 h-5" />}
            {tab.icon === "Type" && <Type className="w-5 h-5" />}
            {tab.icon === "Hash" && <Hash className="w-5 h-5" />}
            {tab.icon === "Car" && <Car className="w-5 h-5" />}
            <span className="text-center leading-tight">{tab.label}</span>
          </button>
        )}
      </div>

      {/* Form fields */}
      <div className="px-6 md:px-8 pb-2 pt-6 bg-card">
        {activeTab === "filter" &&
        <div className="space-y-4 animate-fade-in">
            <VehicleSelector onSelectionChange={(brand, models) => {setSelectedBrand(brand);setSelectedModels(models);}} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput label="Naziv dijela" placeholder='Upišite naziv, npr "desni far"' value={partName} onChange={setPartName} />
              <CategorySelect value={category} onChange={setCategory} />
            </div>
          </div>
        }
        {activeTab === "naziv" &&
        <div className="animate-fade-in">
            <FloatingInput label="Naziv dijela" placeholder='Upišite naziv dijela, npr "prednji branik"' value={nameSearch} onChange={setNameSearch} />
          </div>
        }
        {activeTab === "kataloski" &&
        <div className="animate-fade-in">
            <FloatingInput label="Kataloški broj" placeholder="Upišite kataloški broj dijela" value={catalogSearch} onChange={setCatalogSearch} />
          </div>
        }
        {activeTab === "sasija" &&
        <div className="animate-fade-in">
            <fieldset className="relative border border-input rounded bg-background px-3 pt-1 pb-3">
              <legend className="text-xs text-muted-foreground px-1">Broj šasije (VIN)</legend>
              <VinInput value={vinSearch} onChange={setVinSearch} />
            </fieldset>
          </div>
        }
      </div>

      {/* CTA */}
      <div className="p-6 md:p-8 pt-4 md:pt-6 bg-card space-y-3">
        <button
          onClick={handleSearch}
          disabled={isDecoding}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed">

          {isDecoding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Dekodiranje VIN-a...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Pretraži
            </>
          )}
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-full h-11 border-2 border-primary bg-transparent text-primary font-medium rounded transition-all duration-200 flex items-center justify-center gap-2 hover:bg-primary/5">
          <MessageCircle className="w-4 h-4" />
          Traži uz asistenta
        </button>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2 pb-1">
          <span className="text-muted-foreground text-xs">Preko 700.000 dostupnih dijelova</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-rating text-rating" />
            ))}
            <Star className="w-3.5 h-3.5 text-rating fill-rating/80" />
            <span className="text-xs font-semibold text-muted-foreground ml-0.5">4.8</span>
          </div>
        </div>
      </div>

    </div>);

};

export default SearchPanel;