## Plan: Zamjena emoji zastavica s pravim slikama u LanguageSwitcher

### Problem
Trenutno LanguageSwitcher prikazuje emoji zastavice (🇧🇦, 🇭🇷, 🇷🇸, 🇬🇧, 🇩🇪) koje ne izgledaju profesionalno na svim platformama i browserima.

### Rješenje
Zamijeniti emoji znakove s pravim PNG slikama zastavica.

### Koraci implementacije

1. **Generirati 5 PNG slika zastavica** i spremiti ih u `public/flags/`:
   - `ba.png` — Bosna i Hercegovina (20x14px)
   - `hr.png` — Hrvatska (20x14px)
   - `rs.png` — Srbija (20x14px)
   - `gb.png` — Velika Britanija (20x14px)
   - `de.png` — Njemačka (20x14px)

2. **Izmijeniti `src/components/LanguageSwitcher.tsx`**:
   - Zamijeniti `flag: string` (emoji) s `flag: string` (putanja do slike, npr. `/flags/ba.png`)
   - Zamijeniti `<span className="text-sm">{active.flag}</span>` s `<img src={active.flag} alt="" className="w-5 h-3.5 object-cover rounded-[2px]" />`
   - Zamijeniti isto za dropdown item zastavice
   - Dodati odgovarajuće `alt` tekstove za pristupačnost

3. **Testirati** da zastavice ispravno renderiraju u triggeru i dropdownu na desktopu i mobilnom pregledniku.

### Napomena
- Slike će biti male (~20x14px) kako ne bi opteretile stranicu
- Koristit će se CSS `object-cover` za pravilno skaliranje
- Držat će se isti layout i ponašanje dropdowna