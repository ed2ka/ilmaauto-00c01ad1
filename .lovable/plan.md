

## Azuriranje TopBar ikona - bijele ikone + OLX SVG logo

Korisnik je uploadao bijeli OLX SVG logo i zeli da sve social media ikone budu bijele boje.

### Izmjene

**1. Kopirati OLX SVG u projekt**
- Kopirati `user-uploads://OLX_icon.svg` u `src/assets/olx-icon.svg`

**2. Izmjene u `src/components/TopBar.tsx`**
- Obrisati `OlxIcon` komponentu (stari SVG)
- Importati novi OLX SVG: `import olxIcon from "@/assets/olx-icon.svg"`
- Za OLX link koristiti `<img src={olxIcon} alt="OLX" className="w-4 h-4" />`
- `ViberIcon` SVG: promijeniti `fill="currentColor"` na `fill="white"`
- `WhatsAppIcon` SVG: promijeniti `fill="currentColor"` na `fill="white"`
- Lucide `Facebook` i `Instagram`: dodati `color="white"` prop
- Na linkovima: ukloniti `hover:text-background` i dodati `opacity-90 hover:opacity-100` za hover efekat

