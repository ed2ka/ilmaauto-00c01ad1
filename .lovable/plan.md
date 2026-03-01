
## Povezivanje dugmeta "Traži uz asistenta" sa ChatAssistant widgetom

Trenutno dugme "Traži uz asistenta" u SearchPanel postavlja lokalni state `isChatOpen` koji se nigdje ne koristi za otvaranje ChatAssistant komponente. ChatAssistant ima svoj nezavisni `isOpen` state.

### Rjesenje: Custom DOM Event

Najjednostavniji pristup bez prop drillinga ili context providera -- koristiti custom DOM event.

### Tehnicke izmjene

**1. `src/components/SearchPanel.tsx`** (linija 235):
- Zamijeniti `onClick={() => setIsChatOpen(true)}` sa `onClick={() => window.dispatchEvent(new CustomEvent('open-chat-assistant'))}`
- Ukloniti nekoristen `isChatOpen` state (linija 85)

**2. `src/components/ChatAssistant.tsx`**:
- Dodati `useEffect` koji slusa `open-chat-assistant` event na `window` objektu
- Kada primi event, pozvati `setIsOpen(true)`

```tsx
useEffect(() => {
  const handler = () => setIsOpen(true);
  window.addEventListener('open-chat-assistant', handler);
  return () => window.removeEventListener('open-chat-assistant', handler);
}, []);
```

Ovim se dugme iz SearchPanel-a direktno povezuje sa ChatAssistant widgetom bez potrebe za zajednickim parent state-om ili context providerom.
