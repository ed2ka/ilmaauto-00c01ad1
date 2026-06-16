import { ArrowRight, Check } from "lucide-react";
import { Instagram, Facebook } from "lucide-react";

const MarketplaceGrid = () => {
  return (
    <section className="bg-[#ececec] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Instagram */}
          <a
            href="https://instagram.com/ilmaauto"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[9px] bg-black p-7 min-h-[220px] flex flex-col justify-between transition-transform hover:-translate-y-0.5"
          >
            <Instagram
              className="absolute -right-8 top-1/2 -translate-y-1/2 w-56 h-56 opacity-30"
              style={{ color: "#E1306C" }}
              strokeWidth={1.5}
            />
            <div className="relative z-10">
              <h3 className="text-white text-3xl font-bold tracking-wide mb-3">INSTAGRAM</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-[60%]">
                Pratite nove dijelove, vozila za rastavljanje i dnevne objave.
              </p>
              <div className="flex items-center gap-2 mt-3 text-white/90 text-sm">
                <Instagram className="w-4 h-4" />
                <span>@ilmaauto</span>
              </div>
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-[#FFBA08] text-black text-xs font-bold tracking-wider px-4 py-2.5 rounded-[9px]">
                ZAPRATI NAS <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/ilmaauto"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[9px] bg-[#0a1f3d] p-7 min-h-[220px] flex flex-col justify-between transition-transform hover:-translate-y-0.5"
          >
            <Facebook
              className="absolute -right-10 top-1/2 -translate-y-1/2 w-72 h-72 opacity-30 fill-[#1877F2]"
              style={{ color: "#1877F2" }}
              strokeWidth={1}
            />
            <div className="relative z-10">
              <h3 className="text-white text-3xl font-bold tracking-wide mb-3">FACEBOOK</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-[60%]">
                Novosti, akcije, dolazak novih vozila i komunikacija sa kupcima.
              </p>
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-[#FFBA08] text-black text-xs font-bold tracking-wider px-4 py-2.5 rounded-[9px]">
                POSJETI STRANICU <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* OLX */}
          <a
            href="https://www.olx.ba/korisnik/ilmaauto"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[9px] bg-[#0a2820] p-7 min-h-[220px] flex flex-col justify-between transition-transform hover:-translate-y-0.5"
          >
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10rem] leading-none font-black tracking-tighter opacity-40 select-none"
              style={{ color: "#23E5DB", fontFamily: "Poppins, sans-serif" }}
            >
              olx
            </span>
            <div className="relative z-10">
              <h3 className="text-white text-3xl font-bold tracking-wide mb-3">OLX SHOP</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-[60%]">
                Pogledajte kompletnu ponudu polovnih i novih auto dijelova.
              </p>
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-[#23E5DB] text-[#0a2820] text-xs font-bold tracking-wider px-4 py-2.5 rounded-[9px]">
                PREGLEDAJ OGLASE <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Njuškalo */}
          <a
            href="https://www.njuskalo.hr/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[9px] bg-[#FFCC00] p-7 min-h-[220px] flex flex-col justify-between transition-transform hover:-translate-y-0.5"
          >
            <span
              className="absolute right-4 bottom-4 text-5xl font-bold opacity-90 select-none"
              style={{ color: "#1a1a1a", fontFamily: "Poppins, sans-serif" }}
            >
              njuškalo
            </span>
            <div className="relative z-10">
              <h3 className="text-white text-3xl font-bold tracking-wide mb-3 drop-shadow">NJUŠKALO</h3>
              <p className="text-white text-sm leading-relaxed max-w-[60%] drop-shadow-sm">
                ILMA AUTO ponuda za kupce iz Hrvatske.
              </p>
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-[#1a1a1a] text-[#FFCC00] text-xs font-bold tracking-wider px-4 py-2.5 rounded-[9px]">
                POSJETI TRGOVINU <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        </div>

        {/* eBay full width */}
        <a
          href="https://www.ebay.com/usr/ilmaauto"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-[9px] bg-gradient-to-br from-[#0a1f3d] via-[#0d2b52] to-[#081530] p-8 mt-4 min-h-[260px] flex flex-col justify-between transition-transform hover:-translate-y-0.5"
        >
          {/* eBay logo watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-7xl md:text-8xl font-black tracking-tight opacity-90 select-none" style={{ fontFamily: "Poppins, sans-serif" }}>
              <span style={{ color: "#E53238" }}>e</span>
              <span style={{ color: "#0064D2" }}>b</span>
              <span style={{ color: "#F5AF02" }}>a</span>
              <span style={{ color: "#86B817" }}>y</span>
            </div>
          </div>

          <div className="relative z-10 max-w-[45%]">
            <h3 className="text-4xl font-bold tracking-wide mb-3">
              <span className="text-[#FFBA08]">EBAY</span>{" "}
              <span className="text-white">STORE</span>
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Auto dijelovi dostupni kupcima širom Europe i svijeta.
            </p>
            <ul className="space-y-2 mb-5">
              {["Globalna dostava", "eBay Buyer Protection", "Hiljade dostupnih dijelova"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white text-sm">
                  <span className="w-5 h-5 rounded-full border border-[#FFBA08] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#FFBA08]" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-[#FFBA08] text-black text-xs font-bold tracking-wider px-4 py-2.5 rounded-[9px]">
              POSJETI EBAY STORE <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default MarketplaceGrid;