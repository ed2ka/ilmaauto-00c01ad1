## Izmjene u `src/components/Footer.tsx`

### 1. Brand kolona (ispod opisa) — marketplace + social
Zamijeniti trenutni `socials` niz da sadrži 5 ikona u ovom redoslijedu:
- **Facebook** (postojeća ikona)
- **Instagram** (postojeća ikona)
- **OLX.ba** → https://autootpadilma.olx.ba/
- **Njuškalo.hr** → https://www.njuskalo.hr/trgovina/ilmaauto
- **eBay** → https://www.ebay.com/str/ilmaautosb

Za tri nove marketplace ikone generirat ću monohromatske bijele SVG/PNG ikone kao transparent assets (`src/assets/olx-icon.svg`, `njuskalo-icon.svg`, `ebay-icon.svg`) da se uklope u postojeći stil (bijele ikone u `bg-white/10` krugu, 9×9, hover `bg-white/20`).

### 2. KONTAKT kolona — dodati Viber + WhatsApp ispod radnog vremena
Nakon `<li>` sa `Clock` ikonom i radnim vremenom, dodati novi `<li>` koji renderira dva mala dugmeta jedno pored drugog:
- **Viber** → `viber://chat?number=%2B38762667700`
- **WhatsApp** → `https://wa.me/38762667700`

Stil: iste `w-9 h-9 rounded-full bg-white/10 hover:bg-white/20` ikone kao u brand koloni, da bude vizuelno konzistentno, sa malim labelom "Pišite nam:" iznad.

### 3. Čišćenje
- Ukloniti `viber` i `whatsapp` iz `socials` array-a (više nisu u brand koloni).
- Zadržati importe (koriste se u KONTAKT koloni).

### Tehnički detalji
- Sve linkove otvarati u novom tabu (`target="_blank"`, `rel="noopener noreferrer"`).
- Marketplace ikone generirati kao bijele transparent PNG/SVG da prate isti stil kao postojeće social ikone.
- Bez izmjena na drugim komponentama.