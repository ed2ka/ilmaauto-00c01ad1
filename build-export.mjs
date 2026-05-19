import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync, cpSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';

const ROOT = process.cwd();
const APP = path.join(ROOT, 'src/App.tsx');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(ROOT, 'static-export');
const ZIP = '/mnt/documents/ilma-auto-static-v4.zip';

// 1) Patch App.tsx: BrowserRouter -> HashRouter
const orig = readFileSync(APP, 'utf8');
const patched = orig
  .replace(/BrowserRouter as Router,?\s*/g, '')
  .replace(/\bBrowserRouter\b/g, 'HashRouter');
writeFileSync(APP, patched);
console.log('Patched App.tsx -> HashRouter');

// 2) Build with relative base
let buildOk = false;
try {
  if (existsSync(DIST)) rmSync(DIST, { recursive: true });
  const r = spawnSync('npx', ['vite', 'build', '--base=./'], { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });
  if (r.status !== 0) throw new Error('vite build failed');
  buildOk = true;
} finally {
  writeFileSync(APP, orig);
  console.log('Restored App.tsx');
}
if (!buildOk) process.exit(1);

// 3) Serve dist and prerender '/'
const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  const fp = path.join(DIST, p);
  if (existsSync(fp) && statSync(fp).isFile()) {
    const ext = path.extname(fp).slice(1);
    const mime = { html:'text/html', js:'application/javascript', css:'text/css', json:'application/json', png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', webp:'image/webp', svg:'image/svg+xml', woff:'font/woff', woff2:'font/woff2', ttf:'font/ttf', ico:'image/x-icon' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': mime });
    res.end(readFileSync(fp));
  } else {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(readFileSync(path.join(DIST, 'index.html')));
  }
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;
console.log('Server on', port);

const browser = await puppeteer.launch({
  executablePath: '/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
const html = await page.content();
writeFileSync(path.join(DIST, 'index.html'), html);
console.log('Prerendered index.html', html.length, 'bytes');
await browser.close();
server.close();

// 4) Copy to OUT and write README + .htaccess
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });
cpSync(DIST, OUT, { recursive: true });

writeFileSync(path.join(OUT, '.htaccess'), `# ILMA AUTO static export
# HashRouter koristi #/... pa SPA rewrite NIJE potreban.
AddType font/woff2 .woff2
AddType font/woff .woff
AddType image/webp .webp

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
`);

writeFileSync(path.join(OUT, 'README.txt'), `ILMA AUTO - Statički Export v4
================================

KAKO INSTALIRATI:
1. Otpakuj cijeli ZIP u folder na cPanel-u (npr. public_html/ ili public_html/ilmaautodijelovi/)
2. Otvori URL u browseru, npr:
   - https://tvojdomen.com/
   - https://tvojdomen.com/ilmaautodijelovi/
3. Sve radi - bez konfiguracije.

KAKO POKRENUTI LOKALNO (na računaru):
- Otpakuj ZIP u folder
- Otvori terminal/cmd u tom folderu i pokreni:
    python -m http.server 8000
  (ili: npx serve)
- Otvori http://localhost:8000

NAPOMENA: Ne možeš samo dupli-klik na index.html. Modern JavaScript zahtijeva HTTP server.

URL FORMAT:
Ovaj export koristi hash router, pa URL-ovi izgledaju ovako:
  https://tvojdomen.com/ilmaautodijelovi/#/pretraga
  https://tvojdomen.com/ilmaautodijelovi/#/podrska
  https://tvojdomen.com/ilmaautodijelovi/#/profil
To omogućava da paket radi BILO GDJE (root, podfolder, subdomena) bez .htaccess rewrite-a.

ŠTA RADI:
- Komplet UI, navigacija, animacije, hover efekti
- Mobilni meni, akordeoni, modali, forme
- Sve vizualne komponente

ŠTA NE RADI (potreban backend):
- Pretraga dijelova iz baze
- Login/registracija
- Narudžbe i wishlist sinhronizacija
- AI chat asistent
- VIN dekoder

VERZIJA: v4 (HashRouter, portable)
`);

// 5) Zip
if (existsSync(ZIP)) rmSync(ZIP);
const zipR = spawnSync('zip', ['-r', '-q', ZIP, '.'], { cwd: OUT, stdio: 'inherit' });
if (zipR.status !== 0) { console.error('zip failed'); process.exit(1); }
console.log('Created', ZIP);
const s = statSync(ZIP);
console.log('Size:', (s.size/1024/1024).toFixed(2), 'MB');
