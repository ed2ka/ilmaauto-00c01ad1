
## Dodavanje WhatsApp dugmeta pored Viber dugmeta

### Izmjene u `src/pages/PartDetail.tsx`

1. **Import WhatsApp ikonice** (linija 27-28): Dodati import za `whatsapp-icon.svg`

2. **Izmjena layout-a dugmadi** (linije 240-254): Zamijeniti jedan Viber dugme sa dva dugmeta u istom redu:
   - Viber i WhatsApp dugmici ce biti u `flex flex-row gap-2` kontejneru
   - Oba dugmeta imaju `flex-1` da budu jednake sirine

3. **WhatsApp link format**: `https://wa.me/38761454151?text={encodedMessage}` -- ista poruka kao za Viber

### Struktura

```text
[        Naruci dugme (puna sirina)       ]
[ Viber dugme (50%) ] [ WhatsApp dugme (50%) ]
```

### Tehnicke izmjene

**Linija 28** - dodati import:
```tsx
import whatsappIcon from "@/assets/whatsapp-icon.svg";
```

**Linije 240-254** - zamijeniti sa:
```tsx
<div className="flex gap-2">
  <Button variant="outline" className="flex-1" asChild>
    <a href={viberLink} target="_blank" rel="noopener noreferrer">
      <img src={viberIcon} alt="Viber" className="w-4 h-4 mr-1" />
      Naruči preko Vibera
    </a>
  </Button>
  <Button variant="outline" className="flex-1" asChild>
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4 mr-1" />
      Naruči preko WhatsApp
    </a>
  </Button>
</div>
```

WhatsApp link koristi `https://wa.me/38761454151?text={encodeURIComponent(message)}` sa istom porukom kao Viber dugme.
