

## Animirani gradient border i outer glow za AI dugme

### 1. CSS animacije u `src/index.css`

Dodati novi `@keyframes spin-gradient` za rotaciju conic/radial gradienta (360 stepeni, beskonacno), i `@keyframes pulse-glow` za blago pulsiranje outer glow-a (scale 1 -> 1.03 -> 1, opacity varijacija).

### 2. Izmjena dugmeta u `src/components/ChatAssistant.tsx` (linija 408-414)

Tehnika za animirani gradient border:
- Koristiti wrapper `div` sa `rounded-full` i `padding: 3px`
- Wrapper ima `background: conic-gradient(from var(--angle), #dc2626, #9333ea, #ffffff, #7f1d1d, #dc2626)` koji se rotira putem CSS animacije (`spin-gradient`)
- CSS custom property `--angle` se animira od 0deg do 360deg koristeci `@property` deklaraciju u CSS-u
- Unutarnje dugme ima `bg-background` i `rounded-full` da se vidi gradient samo kao border

Outer glow:
- Na wrapper dodati `box-shadow: 0 0 15px 2px rgba(220, 38, 38, 0.3)` sa pulsnom animacijom (`pulse-glow`) koja blago mijenja intenzitet shadow-a (opacity 0.2 - 0.4, spread 2px - 5px)
- Animacija traje oko 2-3 sekunde, ease-in-out, infinite

### Tehnicke izmjene

**`src/index.css`** - dodati:
```css
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-gradient {
  to { --gradient-angle: 360deg; }
}

@keyframes pulse-glow-soft {
  0%, 100% { box-shadow: 0 0 12px 2px rgba(220, 38, 38, 0.25); }
  50% { box-shadow: 0 0 18px 4px rgba(220, 38, 38, 0.4); }
}
```

**`src/components/ChatAssistant.tsx`** (linija 407-415) - zamijeniti dugme sa:
- Wrapper `div` sa `className` koji ukljucuje animirani gradient background, `p-[3px] rounded-full`, animaciju `spin-gradient 3s linear infinite` i `pulse-glow-soft 2.5s ease-in-out infinite`
- Unutarnje `button` zadrzava postojeci sadrzaj ali sa `bg-background rounded-full` umjesto border klasa
- Gradient boje: crvena (#dc2626), ljubicasta (#9333ea), bijela (#ffffff), bordo (#7f1d1d)

