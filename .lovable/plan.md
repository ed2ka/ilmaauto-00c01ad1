## Ispravka Language Switcher-a — zamjena tekstualnih kodova zastavicama

### Cilj
U `LanguageSwitcher` komponenti zamijeniti tekstualne prefikse jezika (BA, CRO, SRB, EN, DE) emoji zastavicama, tako da se nigdje ne prikazuje tekstualni kod već isključivo zastavica.

### Promjene

1. **`src/components/LanguageSwitcher.tsx`**
   - **Trigger (otvarajući gumb):** ukloniti `<span>{active.code}</span>` — ostaviti samo zastavicu + strelicu.
   - **Dropdown stavke:** ukloniti `<span className="font-semibold w-10">{lang.code}</span>` — ostaviti samo zastavicu + puni naziv zemlje/jezika.
   - Prilagoditi razmake/klase ako je potrebno radi ravnoteže bez tekstualnog koda.

### Izlaz
Language switcher prikazuje isključivo zastavice bez tekstualnih prefiksa tipa "BA", "CRO" itd.