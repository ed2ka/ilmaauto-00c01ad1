import { useState } from "react";
import { Search, SlidersHorizontal, Type, Hash, Car, X } from "lucide-react";
import VehicleSelector from "./VehicleSelector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type SearchTab = "filter" | "naziv" | "kataloski" | "sasija";

const tabs: {id: SearchTab;label: React.ReactNode;icon: string;}[] = [
{ id: "filter", label: <>Filter<br/>pretraga dijelova</>, icon: "SlidersHorizontal" },
{ id: "naziv", label: <>Pretraga po<br/>nazivu dijela</>, icon: "Type" },
{ id: "kataloski", label: <>Pretraga po<br/>kataloškom broju</>, icon: "Hash" },
{ id: "sasija", label: <>Pretraga po<br/>broju šasije</>, icon: "Car" }];

const categoryOptions = ["Motor", "Karoserija", "Elektrika", "Ovjes", "Kočnice"];

const CategorySelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <fieldset className="relative border border-input rounded bg-background px-3 pt-1 pb-0 cursor-pointer">
          <legend className="text-xs text-muted-foreground px-1">Kategorija dijela</legend>
          <div className="w-full h-9 flex items-center justify-between text-sm">
            <span className={selected ? "text-foreground" : "text-muted-foreground/50"}>
              {selected || "Odaberite kategoriju dijela"}
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              {selected && (
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
        <div className="max-h-64 overflow-y-auto">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelected(cat); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors ${
                cat === selected ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};


const FloatingInput = ({ label, placeholder }: {label: string;placeholder: string;}) =>
<fieldset className="relative border border-input rounded bg-background px-3 pt-1 pb-0">
    <legend className="text-xs text-muted-foreground px-1">{label}</legend>
    <input
    type="text"
    placeholder={placeholder}
    className="w-full h-9 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none" />

  </fieldset>;


const SearchPanel = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>("filter");

  return (
    <div className="backdrop-blur-md rounded-lg w-full max-w-2xl animate-fade-in-up shadow-2xl bg-white/0 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-8 py-[50px] bg-white/70 backdrop-blur-md">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
          Pretraga dijelova
        </h2>
        <p className="text-white/80 text-base md:text-lg">
          Najveća baza autodijelova na Balkanu
        </p>
      </div>

      {/* Tabs - single row with dividers */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {tabs.map((tab, i) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative flex flex-col items-center gap-2 py-4 px-3 text-xs font-semibold tracking-wide transition-all duration-200 ${
          activeTab === tab.id ?
          "text-primary bg-card" :
          "text-muted-foreground hover:text-foreground bg-tab-inactive"} ${
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
            <VehicleSelector />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput label="Naziv dijela" placeholder='Upišite naziv modela, npr "desni far"' />
              <CategorySelect />
            </div>
          </div>
        }

        {activeTab === "naziv" &&
        <div className="animate-fade-in">
            <FloatingInput label="Naziv dijela" placeholder='Upišite naziv dijela, npr "prednji branik"' />
          </div>
        }

        {activeTab === "kataloski" &&
        <div className="animate-fade-in">
            <FloatingInput label="Kataloški broj" placeholder="Upišite kataloški broj dijela" />
          </div>
        }

        {activeTab === "sasija" &&
        <div className="animate-fade-in">
            <FloatingInput label="Broj šasije (VIN)" placeholder="Upišite broj šasije vozila" />
          </div>
        }
      </div>

      {/* CTA */}
      <div className="p-6 md:p-8 pt-4 md:pt-6 bg-card">
        <button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
          Pretraži <span className="font-bold">45018</span> rezultata
        </button>
      </div>
    </div>);

};

export default SearchPanel;