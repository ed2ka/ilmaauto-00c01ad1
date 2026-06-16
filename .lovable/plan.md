U `src/pages/Index.tsx` hero pozadina se učitava iz `@/assets/hero-bg.jpg`.

Koraci:
1. Upload priložene slike (`user-uploads://ova-ChatGPT_Image_Jun_16_2026_04_53_51_PM.png`) kao Lovable asset → `src/assets/hero-bg-ilma.jpg.asset.json`.
2. U `src/pages/Index.tsx` zamijeniti import `heroBg` da pokazuje na novi asset pointer i koristiti `heroBg.url` u `<img src=...>`.
3. Ukloniti stari `src/assets/hero-bg.jpg` ako se nigdje drugdje ne koristi (provjera grep-om).