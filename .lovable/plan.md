

## Uskladiti terminologiju: sve na "zahtjev"

Zamijenit cu sve pojave termina "upit" sa "zahtjev" na svim mjestima u aplikaciji.

### Izmjene

**`src/components/Header.tsx`** (linija 69, 103):
- "Upiti" -> "Zahtjevi" (u dropdown meniju i mobilnom meniju)

**`src/pages/Dashboard.tsx`**:
- Linija 184: "Moji upiti za pretragu" -> "Moji zahtjevi"
- Linija 189: "Nemate nijedan upit za pretragu." -> "Nemate nijedan zahtjev."
- Linija 193: Status labele: "Poslan upit" -> "Poslan", "Nije odgovoren" -> "Nije odgovoreno", "Odgovoren" -> "Odgovoreno"
- Linija 202: "Upit kreiran" -> "Zahtjev kreiran"

**`src/components/NoResultsInquiry.tsx`** -- vec koristi "zahtjev", bez promjena potrebnih.

### Stavke koje se NE mijenjaju
- Imena tabela u bazi (`part_inquiries`) -- tehnicka stvar, ne utice na korisnika
- Imena hook-ova i funkcija u kodu (`useMyInquiries`, `createInquiry`) -- interni kod
- Query parametar `tab=inquiries` u URL-u -- tehnicki detalj

