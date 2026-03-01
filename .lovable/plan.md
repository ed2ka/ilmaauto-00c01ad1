

## Dodavanje GARANCIJA i EASY RETURN sekcije ispod filtera

### Izmjene u `src/components/SearchFilterSidebar.tsx`

Ispod zatvarajuceg `</div>` za `space-y-5` (linija 148), ali unutar komponente, dodati novu sekciju sa:

1. **GARANCIJA** -- boldovan naslov, pa tekst: "Na sve kupljene dijelove ostvarujete garanciju od **1 godine**."
2. **EASY RETURN** -- boldovan naslov, pa tekst: "Sve kupljene dijelove mozete vratiti u roku od **7 dana**."
3. **Telefon** -- stilizovan kao plavo dugme sa ikonom telefona i brojem +387 66 818 315 (klikabilan, `tel:` link)

Sekcija ce biti odvojena separatorom ili marginom od filtera, sa stilom koji prati screenshot (bold naslovi, normalan tekst, plavo dugme za telefon sa zaobljenim uglovima i gradijentom).

### Tehnicke izmjene:

- Dodati import za `Phone` iz `lucide-react`
- Dodati JSX blok nakon `space-y-5` diva (unutar return-a, wrapper ce biti fragment ili dodatni div)
- Telefonsko dugme: `a` tag sa `href="tel:+38766818315"`, plavi gradijent pozadina, bijeli tekst, zaobljeni uglovi

