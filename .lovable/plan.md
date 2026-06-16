Koristiti istu sliku (`src/assets/hero-bg-ilma.png.asset.json`) kao blurovanu pozadinu na 3 mjesta:

1. **`src/pages/Support.tsx`** — hero sekcija (linija 84). Iznad postojećeg radial gradient layera dodati `<img src={heroBg.url} className="absolute inset-0 w-full h-full object-cover blur-md scale-110" />` i tamni overlay (`bg-[#1b2835]/70`) da tekst ostane čitljiv. Postojeća radial gradient ostaje iznad za dodatni crveni naglasak.

2. **`src/pages/Auth.tsx`** — zamijeniti `import authBg from "@/assets/auth-bg.jpg"` da pokazuje na novi asset pointer (`heroBgAsset.url`) i dodati `blur-md scale-110` klase na postojeći `<img>` tag (linija 166). Pokriva i `/prijava` i `/registracija` jer obje koriste istu Auth komponentu.

Sve ostalo (overlay, tekst, kartice) ostaje isto.