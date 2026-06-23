import { promises as fs } from "node:fs";
import path from "node:path";

const DIST = "dist";

// 1. Copy fonts/ folder from previously-prepared static-out/fonts
const FONTS_SRC = "static-out/fonts";
const FONTS_DST = path.join(DIST, "fonts");
await fs.mkdir(FONTS_DST, { recursive: true });
for (const f of await fs.readdir(FONTS_SRC)) {
  await fs.copyFile(path.join(FONTS_SRC, f), path.join(FONTS_DST, f));
}

// 2. Build a local poppins.css that points to local woff2
let pop = await fs.readFile(path.join(FONTS_SRC, "poppins.css"), "utf8");
pop = pop.replace(/https:\/\/fonts\.gstatic\.com\/s\/poppins\/v24\//g, "");
await fs.writeFile(path.join(FONTS_DST, "poppins.css"), pop);

// 3. Patch the built CSS bundle: remove google @import, prepend local @font-face
const assetsDir = path.join(DIST, "assets");
const cssFiles = (await fs.readdir(assetsDir)).filter((f) => f.endsWith(".css"));
for (const f of cssFiles) {
  const p = path.join(assetsDir, f);
  let css = await fs.readFile(p, "utf8");
  css = css.replace(/@import\s+url\(['"]?https:\/\/fonts\.googleapis\.com[^)]*\)\s*;?/g, "");
  const face = pop.replace(/url\(([A-Za-z0-9._-]+)\)/g, "url(../fonts/$1)");
  css = face + "\n" + css;
  await fs.writeFile(p, css);
  console.log("patched", p);
}

// 4. Copy index.html as 404.html so any path lands on the SPA (for path-based hosts).
const idx = await fs.readFile(path.join(DIST, "index.html"), "utf8");
await fs.writeFile(path.join(DIST, "404.html"), idx);

// 5. .htaccess for cPanel/Apache SPA routing fallback.
await fs.writeFile(
  path.join(DIST, ".htaccess"),
  `Options -MultiViews\nRewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.html [L]\n`
);

// 6. README
await fs.writeFile(
  path.join(DIST, "README.md"),
  `# ILMA AUTO — standalone (statična) verzija\n\n` +
  `Standalone HTML/CSS/JS verzija sajta — radi BEZ backend-a, BEZ Lovable-a i BEZ instalacije ičega.\n\n` +
  `## Lokalno (file://) ili cPanel\n\n` +
  `Otvori \`index.html\` direktno u browseru. Sve stranice rade preko **hash routing-a** (\`index.html#/pretraga\`, \`index.html#/dio/1\`...), tako da nije potreban server niti rewrite pravila.\n\n` +
  `Za cPanel: uploaduj cijeli sadržaj foldera u \`public_html\`. Priložen je i \`.htaccess\` ali nije obavezan jer se koristi hash routing.\n\n` +
  `## Šta NE radi (jer nema backend-a)\n\n` +
  `- Prijava, registracija i Google OAuth (forme javljaju da je offline verzija)\n` +
  `- Stvarne narudžbe i upiti\n` +
  `- AI chat asistent (decode VIN, chat itd.)\n` +
  `- Lista dijelova radi na 8 demo proizvoda\n\n` +
  `## Šta RADI\n\n` +
  `- Sav UI/dizajn 1:1 sa live verzijom\n` +
  `- Navigacija između svih stranica (početna, pretraga, detalji artikla, prijava, podrška, legal stranice)\n` +
  `- Svi tabovi, dropdowns, modali, FAQ akordeon\n` +
  `- Filteri i pretraga (rade na demo bazi)\n` +
  `- Detalji artikla (sa fallback slikama)\n` +
  `- Lokalni fontovi (Poppins woff2) i lokalne slike\n`
);

console.log("postprocess complete");