

## Animacija kucanja za pozdravnu poruku ILMA AI

### Opis
Kada se chat otvori, pozdravna poruka nece biti prikazana odjednom, nego ce se slova ispisivati jedno po jedno (typewriter efekat), kao da AI kuca poruku u realnom vremenu. Ovo daje autentican dojam vestacke inteligencije.

### Tehnicke izmjene

**Fajl: `src/components/ChatAssistant.tsx`**

1. Dodati state `isTypingWelcome` i `displayedWelcome` za pracenje animacije
2. Kada se chat otvori i prva poruka je welcome poruka, pokrenuti interval koji dodaje slovo po slovo (brzina ~20-30ms po karakteru)
3. Tokom animacije prikazivati trepajuci kursor na kraju teksta
4. Animacija se pokrece samo za welcome poruku (ne za poruke iz localStorage koje su vec vidjene)
5. Dodati `welcomeAnimated` ref da se animacija ne ponavlja ako korisnik minimizira i ponovo otvori chat u istoj sesiji

### Tok animacije

```text
Chat se otvori → prazna poruka sa trepajucim kursorom
→ slova se pojavljuju jedno po jedno (~25ms)
→ "P" → "Po" → "Poz" → "Pozd" → ... → puna poruka
→ kursor nestane, poruka kompletna
```

### Detalji implementacije

- Koristiti `useEffect` koji prati `isOpen` state
- `setInterval` sa 25ms pauzom izmedju svakog karaktera
- Cleanup interval pri unmount ili zavrsetku animacije
- Ako korisnik zatvori chat tokom animacije, interval se cisti
- Poruke ucitane iz localStorage se prikazuju normalno bez animacije (jer ih je korisnik vec vidio)
- Nova `WelcomeTypingBubble` komponenta za prikaz animiranog teksta sa kursorom

