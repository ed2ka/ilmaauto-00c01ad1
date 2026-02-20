

## Bottom footer na /prijava stranici

### Izmjena u `src/pages/Auth.tsx`

Ispod `</main>` taga (linija 168), dodati bottom footer sa tri reda:

**1. Gornja tanka linija** -- `border-t border-white/20`

**2. Sadrzaj footera** -- flex layout sa tri sekcije:
- **Lijeva strana**: linkovi "Politika privatnosti", "Politika kolacica", "Opci uslovi poslovanja", "Uslovi prodaje i garancija povrata" (horizontalno, razdvojeni separatorima)
- **Centar**: copyright tekst
- **Desna strana**: social media ikone (Facebook, Instagram, Viber, WhatsApp) -- iste ikone kao u TopBar-u

**3. Responsive ponasanje**: Na mobilnim uredjajima, linkovi, copyright i ikone ce biti u koloni (vertikalno centrirani).

### Struktura koda

```text
<footer className="relative z-10 border-t border-white/20 py-4 px-4">
  <div className="container mx-auto">
    <!-- Desktop: flex row, Mobile: flex col -->
    
    Lijevo: 4 linka (text-white/60, hover:text-white/90)
    Centar: Copyright tekst (text-white/70)  
    Desno: Social ikone (Facebook, Instagram, Viber, WhatsApp)
  </div>
</footer>
```

### Detalji

- Ikone Viber i WhatsApp su vec definisane kao komponente u `TopBar.tsx` -- izvuci ih u zasebne fajlove ili duplicirati unutar Auth.tsx (dupliciranje je jednostavnije za sada)
- Linkovi koriste `href="#"` kao placeholder dok se ne kreiraju te stranice
- Footer ostaje unutar pozadinske slike jer je `relative z-10`
- Boja teksta: `text-white/60` za linkove, `text-white/70` za copyright, ikone bijele sa opacity

| Fajl | Akcija |
|------|---------|
| `src/pages/Auth.tsx` | Dodati footer sekciju ispod `</main>`, ukljucujuci linkove, copyright i social ikone |

