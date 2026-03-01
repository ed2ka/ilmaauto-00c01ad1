

## Izmjena ikonica i teksta na Viber/WhatsApp dugmićima

### Izmjene u `src/pages/PartDetail.tsx`

1. **Crne ikonice**: Dodati CSS filter `brightness(0)` na obe `<img>` ikonice kako bi bile crne boje -- klasa `[filter:brightness(0)]` ili inline style
2. **Tekst dugmića**:
   - "Naruči preko Vibera" -> "Viber narudžba"
   - "Naruči preko WhatsApp" -> "WhatsApp narudžba"

### Tehničke izmjene

**Linija 253**: Dodati `[filter:brightness(0)]` klasu i promijeniti tekst
```tsx
<img src={viberIcon} alt="Viber" className="w-4 h-4 mr-1 [filter:brightness(0)]" />
Viber narudžba
```

**Linija 268**: Isto za WhatsApp
```tsx
<img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4 mr-1 [filter:brightness(0)]" />
WhatsApp narudžba
```
