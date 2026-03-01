

## Interaktivne kartice za opcije u ILMA AI chatu

### Problem
Kada AI ponudi opcije (npr. "1. Pretrazi sve dijelove..." i "2. Zelim konkretno..."), one se prikazuju kao obican tekst. Korisnik mora rucno upisati "1" ili "2" umjesto da jednostavno klikne.

### Rjesenje

**Fajl: `src/components/ChatAssistant.tsx`**

1. Dodati funkciju `parseOptions(text)` koja detektuje numerirane opcije u AI odgovoru (pattern: `1. ...` / `2. ...`) i razdvaja tekst na:
   - `textBefore` - tekst prije opcija
   - `options[]` - niz opcija (label tekst)
   - `textAfter` - tekst poslije opcija (npr. "Molim odgovorite...")

2. Kreirati komponentu `OptionCard` - klikabilna kartica koja:
   - Prikazuje broj opcije i tekst
   - Ima hover efekat i pointer kursor
   - Na klik salje tekst opcije kao korisnicku poruku (poziva `send` funkciju sa sadrzajem opcije)
   - Responsive dimenzije - zauzima punu sirinu chat prozora

3. Azurirati `MessageBubble` da prima `onOptionClick` callback i koristi `parseOptions` za renderovanje opcija kao kartica umjesto teksta

4. U `ChatAssistant` komponenti proslijediti `onOptionClick` handler koji dodaje korisnikovu poruku i pokrece `send`

### Dizajn kartica

```text
+------------------------------------------+
|  1  Pretrazi sve dijelove za ovaj model   |
|     i marku vozila                        |
+------------------------------------------+

+------------------------------------------+
|  2  Zelim konkretno da mi pronadjete dio  |
+------------------------------------------+
```

- Kartice imaju border, zaobljene uglove, padding
- Hover: lagana promjena pozadine
- Broj opcije istaknut boldano
- Kartice se prilagodjavaju sirini chat prozora (responsive)
- "Molim odgovorite sa 1 ili 2" tekst se SAKRIJE jer vise nije potreban

### Regex za detekciju opcija

Pattern ce traziti linije koje pocinju sa `1.`, `2.`, itd. i izdvojiti ih kao opcije. Tekst "Molim odgovorite sa 1 ili 2" ce se filtrirati jer kartice same po sebi sluze kao odgovor.

### Tehnicke izmjene - samo jedan fajl

- `src/components/ChatAssistant.tsx`: dodati `parseOptions`, `OptionCard`, azurirati `MessageBubble` i `ChatAssistant`
