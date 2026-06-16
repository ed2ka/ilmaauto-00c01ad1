Plan: Promjena boja headera i top bara

## Cilj
Postaviti glavni header i top bar na točno zadane boje, bez utjecaja na footer i auth stranicu (koji ostaju crni).

## Koraci

### 1. Header.tsx — glavni header u sivu `#8a8989`
- Zamijeniti `bg-header` → `bg-brand-gray` u glavnom `<header>` elementu i mobilnom meniju.
- Zamijeniti `text-header-foreground` → `text-white` (zadržava se trenutna bijela tipografija za kontrast i estetiku).
- Zamijeniti `border-header-foreground/10` → `border-white/10` kod mobilnog menija.

### 2. TopBar.tsx — top bar u svijetlo sivu `#e1e1e1`
- Zamijeniti `bg-header` → `bg-brand-light`.
- Zamijeniti `text-header-foreground/70` → `text-brand-noir/70` (tamna tipografija zbog vidljivosti na svijetloj podlozi).
- Zamijeniti `bg-background/20` (skoro nevidljivi razdjelnici) → `bg-brand-noir/15` (tamniji, čitljiviji razdjelnici).

## Napomena
- CSS varijabla `--header-bg` se **ne dira** — footer (`Footer.tsx`) i auth overlay (`Auth.tsx`) ostaju crni.
- Boje su već definirane u brand tokenima: `bg-brand-gray` = `#8a8989`, `bg-brand-light` = `#e1e1e1`, `text-brand-noir` = `#1a1a1a`.
