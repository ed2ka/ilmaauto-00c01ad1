
## Izmjene na SearchPanel-u, dodavanje Trustpilot sekcije i popup banera

### 1. Preimenovanje dugmadi u SearchPanel-u

U `src/components/SearchPanel.tsx`:
- Crveno dugme: umjesto "Pretraži X rezultata" → **"Pretraži"**
- Drugo dugme: umjesto "Niste sigurni kako tražiti? Isprobajte asistenta" → **"Traži uz asistenta"**

### 2. Info traka ispod dugmadi (Trustpilot + broj dijelova)

Ispod oba dugmeta, unutar SearchPanel-a, dodati novu sekciju:
- Tekst: **"Preko 700.000 dostupnih dijelova"**
- Trustpilot ikonica (koristit cu Lucide `Star` ikone) sa ocjenom **4.8/5** (4 pune zvjezdice + 1 skoro puna)
- Sve centrirano, manji tekst, bijela/siva boja

### 3. Popup baner iznad TopBar-a

Novi komponent `AnnouncementBar.tsx`:
- Tekst: **"Dostava brzom poštom u cijeloj BiH, Balkanu i EU"**
- X dugme za zatvaranje na desnoj strani
- Padding: 9px top/bottom
- Desktop: max-width teksta 500px, centrirano
- Mobitel/tablet: padding lijevo/desno 30px za tekst, dozvoljeno prelomiti u dva reda
- Pozadina: primary (crvena) sa bijelim tekstom
- Kada se zatvori, baner nestaje i ostatak stranice se pomjeri gore
- Koristit cu `useState` za vidljivost

### Tehnicke izmjene

| Fajl | Akcija |
|------|--------|
| `src/components/SearchPanel.tsx` | Preimenovati dugmad, dodati Trustpilot + broj dijelova sekciju ispod CTA |
| `src/components/AnnouncementBar.tsx` | **Novi fajl** - dismissible baner sa porukom |
| `src/pages/Index.tsx` | Dodati AnnouncementBar iznad TopBar-a |

### Struktura AnnouncementBar-a

```text
<div className="bg-primary text-white py-[9px]">
  <div className="container mx-auto px-[30px] md:px-4 flex items-center justify-center relative">
    <p className="text-center text-sm max-w-[500px]">
      Dostava brzom poštom u cijeloj BiH, Balkanu i EU
    </p>
    <button className="absolute right-4">
      <X />
    </button>
  </div>
</div>
```

Kada se baner zatvori, `pt-[120px]` na hero content-u se automatski prilagodi jer TopBar ostaje fixed a baner je iznad njega u document flow. Trebat ce prilagoditi top offset TopBar-a i Header-a da uzmu u obzir visinu banera.
