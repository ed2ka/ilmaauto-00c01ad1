

## Promjena svih fontova na Poppins

Trenutno stranica koristi vise fontova: "Inter" za body tekst i "Space Grotesk" za naslove (h1, h2, h3). Plan je zamijeniti sve sa Poppins fontom.

### Izmjene

**1. `src/index.css`**
- Ukloniti import za Inter i Space Grotesk fontove
- Dodati import za Poppins sa svim potrebnim tezinama (300-900)
- U base layeru promijeniti `body` font-family sa 'Inter' na 'Poppins'
- Ukloniti posebno pravilo za h1, h2, h3 koje koristi Space Grotesk - neka i naslovi koriste Poppins

**2. `tailwind.config.ts`**
- Promijeniti `fontFamily.display` sa 'Space Grotesk' na 'Poppins' (jer se klasa `font-display` koristi u komponentama)
- Font `sans` vec ima Poppins kao prvi font - to ostaje

**3. Komponente koje koriste `font-display` klasu** (SearchPanel.tsx, Header.tsx)
- Ove komponente koriste `font-display` klasu za naslove
- Nakon promjene u tailwind configu, `font-display` ce automatski koristiti Poppins umjesto Space Grotesk
- Nije potrebna nikakva izmjena u samim komponentama

### Rezultat
- Sav tekst na stranici (naslovi, paragrafi, dugmad, labele) ce koristiti Poppins font
- Google Fonts import ce ucitavati samo Poppins sa svim potrebnim tezinama

