import { ArrowRight } from "lucide-react";
import olxLogo from "@/assets/olx-logo.png.asset.json";
import njuskaloLogo from "@/assets/njuskalo-logo.png.asset.json";
import ebayLogo from "@/assets/ebay-logo.png.asset.json";

const cards = [
  {
    title: "OLX SHOP",
    description: "Pogledajte kompletnu ponudu polovnih i novih auto dijelova.",
    cta: "PREGLEDAJ OGLASE",
    href: "https://autootpadilma.olx.ba/",
    logo: olxLogo.url,
    logoAlt: "OLX",
    logoClass: "max-h-24 max-w-[55%]",
  },
  {
    title: "NJUŠKALO",
    description: "ILMA AUTO ponuda za kupce iz Hrvatske.",
    cta: "POSJETI TRGOVINU",
    href: "https://www.njuskalo.hr/trgovina/ilmaauto",
    logo: njuskaloLogo.url,
    logoAlt: "Njuškalo",
    logoClass: "max-h-32 max-w-[55%]",
  },
  {
    title: "EBAY STORE",
    description: "Auto dijelovi dostupni kupcima širom Europe i svijeta.",
    cta: "POSJETI EBAY STORE",
    href: "https://www.ebay.com/str/ilmaautosb",
    logo: ebayLogo.url,
    logoAlt: "eBay",
    logoClass: "max-h-20 max-w-[55%]",
  },
];

const MarketplaceGrid = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[9px] bg-white border border-border hover:border-[#1b2835] p-6 min-h-[240px] flex flex-col justify-between transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="relative z-10">
                  <h3 className="text-[#1b2835] text-2xl font-bold tracking-wide mb-2">
                    {c.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{c.description}</p>
                </div>
                <img
                  src={c.logo}
                  alt={c.logoAlt}
                  className={`${c.logoClass} object-contain shrink-0`}
                />
              </div>
              <span className="inline-flex items-center gap-2 text-[#1b2835] text-xs font-bold tracking-wider">
                {c.cta} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceGrid;