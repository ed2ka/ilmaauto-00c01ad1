import { useState } from "react";
import { Search, SlidersHorizontal, Type, Hash, Car } from "lucide-react";

type SearchTab = "filter" | "naziv" | "kataloski" | "sasija";

const tabs: {id: SearchTab;label: React.ReactNode;icon: string;}[] = [
{ id: "filter", label: <>Filter<br/>pretraga dijelova</>, icon: "SlidersHorizontal" },
{ id: "naziv", label: <>Pretraga po<br/>nazivu dijela</>, icon: "Type" },
{ id: "kataloski", label: <>Pretraga po<br/>kataloškom broju</>, icon: "Hash" },
{ id: "sasija", label: <>Pretraga po<br/>broju šasije</>, icon: "Car" }];


const FloatingSelect = ({ label, children }: {label: string;children: React.ReactNode;}) =>
<fieldset className="relative border border-input rounded bg-background px-3 pt-1 pb-0">
    <legend className="text-xs text-muted-foreground px-1">{label}</legend>
    <select className="w-full h-9 bg-transparent text-sm text-foreground focus:outline-none appearance-none cursor-pointer pr-6">
      {children}
    </select>
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/4">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" /></svg>
    </div>
  </fieldset>;


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
    <div className="backdrop-blur-md rounded w-full max-w-2xl animate-fade-in-up shadow-2xl bg-white/0">
      {/* Header */}
      <div className="p-6 md:p-8 pb-4 md:pb-5 px-[32px] py-[50px] bg-white/70 backdrop-blur-md">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
          Pretraga dijelova
        </h2>
        <p className="text-white/80 text-sm">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingSelect label="marka vozila">
                <option value="">Izaberite marku vozila</option>
                <option>Audi</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Volkswagen</option>
                <option>Toyota</option>
                <option>Ford</option>
              </FloatingSelect>
              <FloatingSelect label="tip vozila">
                <option value="">Izaberite tip/model vozila</option>
              </FloatingSelect>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput label="Naziv dijela" placeholder='Upišite naziv modela, npr "desni far"' />
              <FloatingSelect label="Kategorija dijela">
                <option value="">Odaberite kategoriju dijela</option>
                <option>Motor</option>
                <option>Karoserija</option>
                <option>Elektrika</option>
                <option>Ovjes</option>
                <option>Kočnice</option>
              </FloatingSelect>
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