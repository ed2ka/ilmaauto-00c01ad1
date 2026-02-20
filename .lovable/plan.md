

## Novi Footer dizajn za homepage

### Opis

Potpuno cu redizajnirati `Footer.tsx` komponentu prema slici. Footer ce imati tamnu pozadinu (#1b2835 - header boja) i sastojati se od tri dijela:

**1. Glavni dio** - Logo + opis + kontakt + social ikone
- Lijevo: ILMA AUTO logo (uploadovani SVG)
- Sredina: opis firme, adresa, telefoni, email
- Desno gore: "Vrati se na pocetak" dugme (scroll to top)
- Desno dolje: social media ikone (Viber, Instagram, Facebook, WhatsApp)

**2. Donja traka** - copyright i linkovi
- Lijevo: linkovi (Politika privatnosti, Politika kolacica, Opci uslovi poslovanja, Uslovi prodaje i garancija povrata)
- Desno: "Copyright 1998-2026 ILMA AUTO d.o.o - sva prava zadrzana"

**3. Postojeci dijelovi** (CTA bar i Benefits bar) ostaju iznad novog footera

### Tehnicke izmjene

| Fajl | Akcija |
|------|--------|
| `src/assets/ilma-logo.svg` | Kopirati uploadovani ILMA AUTO logo |
| `src/components/Footer.tsx` | Dodati novi tamni footer sekciju ispod postojecih CTA i Benefits barova |

### Struktura novog Footer-a

```text
<footer>
  <!-- Postojeci CTA Bar (crveni) -->
  <!-- Postojeci Benefits Bar (bijeli) -->
  
  <!-- NOVI: Glavni footer (tamna pozadina) -->
  <div className="bg-header text-header-foreground">
    <div className="container">
      <!-- Grid: Logo | Info + Kontakt | Scroll-to-top + Social -->
      <div>
        <img src={ilmaLogo} /> <!-- Logo lijevo -->
      </div>
      <div>
        <p>Mi smo prodavnica originalnih auto dijelova...</p>
        <p>Ljetinić 8, 74264 Jelah-Tešanj, BiH</p>
        <p>+387 32 667 700</p>
        <p>+387 62 667 700</p>
        <p>info@ilmaauto.com</p>
      </div>
      <div>
        <button>Vrati se na početak</button> <!-- scroll to top -->
        <div><!-- Viber, Instagram, Facebook, WhatsApp ikone --></div>
      </div>
    </div>
  </div>

  <!-- NOVI: Copyright bar -->
  <div className="bg-header border-t border-white/10">
    <div className="container flex justify-between">
      <div>Politika privatnosti | Politika kolačića | ...</div>
      <p>Copyright 1998-2026 ILMA AUTO d.o.o - sva prava zadržana</p>
    </div>
  </div>
</footer>
```

Social media ikone ce koristiti postojece SVG assete (viber-icon.svg, instagram-icon.svg, facebook-icon.svg, whatsapp-icon.svg) ali sa vecim dimenzijama (w-8 h-8) i bijelom bojom kao na slici.

"Vrati se na pocetak" dugme ce koristiti `window.scrollTo({ top: 0, behavior: 'smooth' })` uz ChevronUp ikonu iz Lucide biblioteke.

