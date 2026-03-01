

## Napomena tekst - manji font i italic stil

### Izmjena

**Fajl: `src/components/ChatAssistant.tsx`**

Razdvojiti WELCOME_MSG na dva dijela pri renderovanju:
- Gornji dio (pozdrav): "Pozdrav, ja sam ILMA AI..." - ostaje kao sada
- Donji dio (napomena): "Napomena: ILMA AI nikada..." - prikazuje se manjim fontom i italic stilom

### Tehničke izmjene

1. **Ažurirati `MessageBubble`**: Dodati logiku koja detektuje da li poruka sadrži "Napomena:" i razdvaja tekst na dva dijela. Gornji dio se renderuje normalno (`text-sm`), donji dio sa `text-[10px] italic` (3 veličine manji od `text-sm` koji je 14px).

2. **Ažurirati `WelcomeTypingBubble`**: Isti tretman - kada typing animacija dođe do "Napomena:" dijela, taj tekst se prikazuje manjim fontom i italic stilom.

3. Nema promjena u samom `WELCOME_MSG` stringu - samo u renderovanju.

### Vizualni rezultat

```text
+--------------------------------------------+
| Pozdrav, ja sam ILMA AI, Izvolite?         |  <- normalan font (text-sm / 14px)
| Kako mogu pomoći? Koji dio tražite?        |
|                                            |
| Napomena: ILMA AI nikada od vas neće       |  <- manji font (text-[10px]) + italic
| tražiti bilo kakve lične podatke...        |
+--------------------------------------------+
```

