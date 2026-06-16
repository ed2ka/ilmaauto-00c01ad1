## Problem

Trenutno rješenje fiksira visinu sadržaja taba (`min-h-[236px]` u `SearchPanel.tsx`) i hero sekcije (`min-h-[820px] lg:min-h-[860px]` u `Index.tsx`) kako se pozadinska slika ne bi „pomjerala" pri promjeni tabova. To stvara prazan prostor i krutu visinu, što nije idealno.

## Bolje rješenje

Umjesto fiksiranja visine, fiksirati samu pozadinsku sliku tako da njen kadar ne ovisi o visini hero kontejnera. Pozadina će uvijek prikazivati isti dio slike, bez obzira koliko je SearchPanel visok.

## Promjene

**`src/pages/Index.tsx`** — hero sekcija:
- Vratiti `<main>` na fleksibilnu visinu: ukloniti `min-h-[820px] lg:min-h-[860px]`, vratiti `flex-1` kako bi se prirodno ponašao.
- Background `<div className="absolute inset-0">` ostaje, ali `<img>` mijenjamo: umjesto `w-full h-full object-cover`, koristimo fiksne dimenzije bazirane na viewportu i fiksiramo poziciju.
  - Pristup: zamijeniti `<img>` sa `<div>` koji koristi CSS `background-image`, `background-size: cover`, `background-position: center top`, `background-attachment: fixed` (ili `background-attachment: local` ako fixed pravi probleme na mobilnim). Time slika ima konzistentan kadar bez obzira na visinu kontejnera.
  - Alternativa (ako je `background-attachment: fixed` problematičan na iOS): zadržati `<img>` sa `object-cover object-top` i dodati fiksnu `min-height` slici (npr. `min-h-[900px]`) — tako kontejner može biti manji ali slika ostaje istog kadra.

**`src/components/SearchPanel.tsx`**:
- Ukloniti `min-h-[236px]` sa sadržajnog `<div>`-a — panel će se opet prirodno skupljati po sadržaju tab-a.

## Tehnička napomena

Predlažem prvu varijantu (CSS `background-image` + `background-position: center top`) jer je najpouzdanija i radi i na mobilnim uređajima — kadar slike ostaje isti jer je sidren na vrh, a panel se može slobodno mijenjati po visini ispod njega.

Nema promjena u ostalim komponentama ni tailwind konfiguraciji.