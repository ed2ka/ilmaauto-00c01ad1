

## Fix: Breadcrumbs skriveni iza fiksnog headera

### Problem

TopBar (36px) i Header (64px na mobitelu, 72px na desktopu) su oba `position: fixed`, sto znaci da prekrivaju sadrzaj stranice. Breadcrumbs i ostali sadrzaj nemaju dovoljno gornjeg razmaka (padding-top) da budu vidljivi ispod headera.

Ukupna visina fiksnih elemenata:
- Mobitel: 36px + 64px = **100px**
- Desktop: 36px + 72px = **108px**

### Rjesenje

Dodati `pt-[100px] lg:pt-[108px]` na glavni wrapper (`<div>`) svake stranice koja koristi TopBar + Header. To pomjera sadrzaj ispod fiksnog headera.

### Stranice koje treba popraviti

| Stranica | Fajl |
|----------|------|
| SearchResults | `src/pages/SearchResults.tsx` |
| PartDetail | `src/pages/PartDetail.tsx` |
| Index | `src/pages/Index.tsx` (hero vec ima pt-20/pt-24, ali treba provjeriti) |

### Tehnicke promjene

**1. `src/pages/SearchResults.tsx`**
- Dodati `pt-[100px] lg:pt-[108px]` na root `<div>` element

**2. `src/pages/PartDetail.tsx`**
- Dodati `pt-[100px] lg:pt-[108px]` na root `<div>` element (u svim granama renderinga: loading, not found, i main)

**3. `src/pages/Index.tsx`**
- Provjeriti da li hero sekcija ima dovoljan padding (trenutno koristi `pt-20 lg:pt-24` na content divu, ali to je relativno unutar flex containera -- treba osigurati da cijela `main` sekcija pocinje ispod headera)

