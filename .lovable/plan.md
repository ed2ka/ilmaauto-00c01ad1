U `src/components/Footer.tsx`:

1. Zamijeniti `categories` niz sa novim popisom (13 stavki):
   `Motor, Elektrika, Karoserija, Rasvjeta, Ovjes i pogon, Kočnice, Hlađenje i klima, Upravljanje, Točkovi, Kabina, Stakla, Ispuh, Ostalo`.

2. Podijeliti stavke na dvije kolone:
   - **Kolona KATEGORIJE** (prvih 7): Motor, Elektrika, Karoserija, Rasvjeta, Ovjes i pogon, Kočnice, Hlađenje i klima
   - **Prazna kolona** se mijenja u drugu kategorije-kolonu (bez naslova, prazan razmak gdje stoji `<h4>`) sa preostalih 6: Upravljanje, Točkovi, Kabina, Stakla, Ispuh, Ostalo

Stavke ostaju kao `<Link to="/pretraga">` u istom stilu kao postojeće.