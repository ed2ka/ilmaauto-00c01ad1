import { useState } from "react";
import { Search } from "lucide-react";

type SearchTab = "filter" | "naziv" | "kataloski" | "sasija";

const tabs: { id: SearchTab; label: string }[] = [
  { id: "filter", label: "FILTER PRETRAGA DIJELOVA" },
  { id: "naziv", label: "PRETRAGA PO NAZIVU DIJELA" },
  { id: "kataloski", label: "PRETRAGA PO KATALOŠKOM BROJU" },
  { id: "sasija", label: "PRETRAGA PO BROJU ŠASIJE" },
];

const SearchPanel = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>("filter");

  return (
    <div className="bg-card/95 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-2xl animate-fade-in-up">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-card-foreground mb-1">
        Pretraga dijelova
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Najveća baza autodijelova na Balkanu
      </p>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                activeTab === tab.id ? "border-primary" : "border-muted-foreground/40"
              }`}
            >
              {activeTab === tab.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              )}
            </div>
            <span className="text-center leading-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form fields */}
      {activeTab === "filter" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Marka vozila</label>
              <select className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
                <option value="">Izaberite marku vozila</option>
                <option>Audi</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Volkswagen</option>
                <option>Toyota</option>
                <option>Ford</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Tip vozila</label>
              <select className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
                <option value="">Izaberite tip/model vozila</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Naziv dijela</label>
              <input
                type="text"
                placeholder='Upišite naziv modela, npr "desni far"'
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Kategorija dijela</label>
              <select className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
                <option value="">Odaberite kategoriju dijela</option>
                <option>Motor</option>
                <option>Karoserija</option>
                <option>Elektrika</option>
                <option>Ovjes</option>
                <option>Kočnice</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === "naziv" && (
        <div className="animate-fade-in">
          <label className="text-xs text-muted-foreground mb-1 block">Naziv dijela</label>
          <input
            type="text"
            placeholder='Upišite naziv dijela, npr "prednji branik"'
            className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      )}

      {activeTab === "kataloski" && (
        <div className="animate-fade-in">
          <label className="text-xs text-muted-foreground mb-1 block">Kataloški broj</label>
          <input
            type="text"
            placeholder="Upišite kataloški broj dijela"
            className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      )}

      {activeTab === "sasija" && (
        <div className="animate-fade-in">
          <label className="text-xs text-muted-foreground mb-1 block">Broj šasije (VIN)</label>
          <input
            type="text"
            placeholder="Upišite broj šasije vozila"
            className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      )}

      {/* CTA */}
      <button className="w-full mt-6 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
        <Search className="w-4 h-4" />
        Pretraži <span className="font-bold">45.018</span> rezultata
      </button>
    </div>
  );
};

export default SearchPanel;
