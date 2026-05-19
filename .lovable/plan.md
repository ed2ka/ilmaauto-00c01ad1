
# Plan: Statični HTML/CSS/JS export sa lokalnim Poppins fontom i izrezanim Supabase pozivima

## Cilj
Generisati 100% samostalan ZIP koji radi na Apache/cPanel hostingu bez ikakvog poziva ka Lovable, Google ili Supabase serverima. UI ostaje vizuelno identičan, backend funkcije izrezane sa jasnim TODO komentarima.

## Koraci

### 1. Lokalizacija Poppins fonta
- Skinem Poppins weight 300/400/500/600/700/800/900 (latin + latin-ext) `.woff2` fajlove
- Smjestim ih u `public/fonts/poppins/`
- U `src/index.css` zamijenim `@import url('https://fonts.googleapis.com/...')` sa lokalnim `@font-face` deklaracijama koje pokazuju na `/fonts/poppins/*.woff2`

### 2. Izrezivanje backend poziva
Sve pozive ka Supabase (`supabase.from(...)`, `supabase.auth.*`, `supabase.functions.invoke(...)`) zamijenim sa:
```ts
// TODO: SUPABASE — vratiti kad backend bude spreman
// const { data, error } = await supabase.from('parts').select(...)
const data: any[] = [];
const error = null;
```

Pogođeni fajlovi:
- `src/hooks/useAuth.tsx` — login/register/logout stub-ovi
- `src/hooks/useParts.ts` — prazan niz dijelova
- `src/hooks/useOrders.ts` — prazne narudžbe
- `src/hooks/useInquiries.ts` — no-op submit
- `src/hooks/useWishlist.ts` — localStorage fallback ili prazno
- `src/components/ChatAssistant.tsx` — AI poziv → poruka "AI chat trenutno nedostupan"
- `src/components/VinInput.tsx` — decode poziv → no-op
- `src/pages/Auth.tsx`, `Dashboard.tsx`, `SearchResults.tsx`, `PartDetail.tsx` — prazna stanja umjesto rezultata

UI ostaje vidljiv svuda (forme, dugmad, layout) — samo akcije ne rade i ne bacaju greške u konzoli.

### 3. Production build
- `npm run build` → generiše `dist/`
- Verifikujem da u `dist/assets/*.js` nema string-ova `supabase.co`, `lovable.app`, `lovable.dev`, `fonts.googleapis.com`

### 4. Apache SPA routing
Dodam `dist/.htaccess`:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
Da deep linkovi (`/pretraga`, `/dio/123`, `/support`) rade na refresh.

### 5. Pakovanje
- ZIP cijeli `dist/` folder kao `/mnt/documents/ilma-auto-static.zip`
- Dodam `README.txt` unutra sa uputstvom za upload u cPanel (`public_html/` → Extract)
- Prikažem ga kao `<presentation-artifact>` za download

## Šta dobijaš

```
ilma-auto-static.zip
└── dist/
    ├── index.html
    ├── .htaccess              ← SPA routing za Apache
    ├── favicon-ilma.png
    ├── robots.txt
    ├── README.txt             ← uputstvo za cPanel upload
    ├── fonts/poppins/         ← 7 weight-ova .woff2 lokalno
    └── assets/
        ├── index-[hash].css   ← Tailwind + custom, minified
        ├── index-[hash].js    ← React bundle, minified, BEZ Supabase poziva
        └── [slike, ikone]
```

## Garancija nezavisnosti
- ✅ 0 poziva ka `lovable.app` / `lovable.dev`
- ✅ 0 poziva ka `fonts.googleapis.com` / `fonts.gstatic.com`
- ✅ 0 poziva ka `supabase.co`
- ✅ Brisanje Lovable projekta ne utiče na hostovani sajt
- ✅ Radi na običnom Apache-u bez Node.js/PHP-a (samo static file serving + mod_rewrite)

## Šta NE radi (po dogovoru, kod je sačuvan u komentarima)
- Pretraga dijelova iz baze
- Login / registracija
- Slanje narudžbi i upita
- ILMA AI chat
- VIN decode
- Wishlist persistencija između sesija

Svuda gdje je kod izrezan, ostavljen je `// TODO: SUPABASE — ...` komentar sa originalnim kodom u komentaru ispod, tako da kad podigneš svoj Supabase samo odkomentarišeš.

## Napomena
Build i ZIP traju 1-2 minuta. Nakon odobrenja kreneem odmah i daću ti download link na kraju.
