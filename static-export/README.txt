ILMA AUTO - Statički Export v4
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
