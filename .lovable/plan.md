

## Dodavanje "Obriši chat" dugmeta u ILMA AI header

### Izmjene

**Fajl: `src/components/ChatAssistant.tsx`**

1. Dodati `Trash2` ikonu u import iz `lucide-react`
2. U header dijelu (linija 242-256), izmedju naslova "ILMA AI" i dugmeta za minimiziranje, dodati novo dugme sa `Trash2` ikonom
3. Dugme ce pozivati funkciju `clearChat` koja:
   - Resetuje `messages` state na pocetnu pozdravnu poruku `[{ role: "assistant", content: WELCOME_MSG }]`
   - Brise localStorage pod kljucem `ilma-ai-messages`
4. Redoslijed dugmadi u headeru: **Obriši chat** | **Minimiziraj** | **Zatvori**

### Funkcija clearChat

```text
clearChat():
  - setMessages([{ role: "assistant", content: WELCOME_MSG }])
  - localStorage removeItem ili ce se automatski sacuvati via useEffect
```

Posto vec postoji `useEffect` koji cuva poruke u localStorage pri svakoj promjeni, dovoljno je samo resetovati state - localStorage ce se automatski azurirati.

