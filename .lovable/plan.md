

## Zamjena social media ikona novim SVG fajlovima

### Opis

Kopirat cu 4 uploadovana SVG fajla (facebook, instagram, viber, whatsapp) u `src/assets/` folder, a zatim cu zamijeniti sve inline SVG ikone i Lucide ikone na svim mjestima gdje se koriste.

### Tehnicke izmjene

| Fajl | Akcija |
|------|--------|
| `src/assets/facebook-icon.svg` | Kopirati uploadovani SVG |
| `src/assets/instagram-icon.svg` | Kopirati uploadovani SVG |
| `src/assets/viber-icon.svg` | Kopirati uploadovani SVG |
| `src/assets/whatsapp-icon.svg` | Kopirati uploadovani SVG |
| `src/components/TopBar.tsx` | Zamijeniti Lucide Facebook/Instagram i inline ViberIcon/WhatsAppIcon sa importovanim SVG fajlovima (kao img tagovi, bijele boje) |
| `src/pages/Auth.tsx` | Zamijeniti inline ViberIcon/WhatsAppIcon i Lucide Facebook/Instagram sa importovanim SVG fajlovima |
| `src/pages/PartDetail.tsx` | Zamijeniti inline ViberIcon sa importovanim SVG fajlom |

SVG fajlovi vec imaju `fill: #f3f4f5` (skoro bijela), sto ce raditi na tamnim pozadinama. Na svim mjestima ce se koristiti `<img>` tag sa `className="w-4 h-4"` za konzistentnu velicinu.

