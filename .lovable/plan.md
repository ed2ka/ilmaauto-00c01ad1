

## ILMA AI Asistent sa pravim AI backend-om

Dodajemo dugme ispod "Pretrazi" buttona koje otvara chat popup sa pravim AI asistentom koji pomaze korisnicima pronaci autodijelove.

### Kako ce raditi

1. Korisnik klikne na dugme "Niste sigurni kako traziti? Isprobajte asistenta"
2. Otvara se elegantni chat Dialog popup
3. Asistent odmah posalje prvu poruku: "Ja sam ILMA asistent! Kako ti mogu pomoci? Koji dio trazis?"
4. Korisnik pise poruke, a AI odgovara u realnom vremenu (streaming) - postavljajuci pitanja o marki, modelu, dijelu
5. Poruke se prikazuju token-po-token kako pristizu

### Arhitektura

```text
+------------------+        +------------------------+        +----------------------------+
|  ChatAssistant   | -----> | Edge Function (chat)   | -----> | Lovable AI Gateway         |
|  (React Dialog)  | <----- | supabase/functions/chat | <----- | google/gemini-3-flash      |
|  SSE streaming   |        | System prompt: ILMA    |        |                            |
+------------------+        +------------------------+        +----------------------------+
```

### Sta se kreira

**1. Edge funkcija `supabase/functions/chat/index.ts`**
- Prima poruke od klijenta, dodaje system prompt koji definise ILMA asistenta
- System prompt: "Ti si ILMA asistent za autodijelove. Pomazi korisniku pronaci pravi dio postavljajuci pitanja o marki vozila, modelu, nazivu dijela i kategoriji. Budi ljubazan i koncizan."
- Koristi streaming (SSE) za real-time odgovore
- Hendla CORS, 429 (rate limit) i 402 (payment) greske
- Model: `google/gemini-3-flash-preview`

**2. Azuriranje `supabase/config.toml`**
- Dodaje chat funkciju sa `verify_jwt = false`

**3. Nova komponenta `src/components/ChatAssistant.tsx`**
- Dialog popup sa chat interfejsom
- Header: "ILMA Asistent" sa MessageCircle ikonom i X dugmetom
- Podrucje za poruke sa scroll-om (ScrollArea)
- Chat bubble-ovi: asistent lijevo (siva pozadina), korisnik desno (primary boja)
- Input polje + Send dugme na dnu
- SSE streaming - tokeni se prikazuju kako pristizu
- Pocetna poruka asistenta se prikazuje odmah pri otvaranju
- Loading indikator dok AI odgovara (tri tacke animacija)
- Hendlanje 429/402 gresaka sa toast notifikacijom

**4. Izmjena `src/components/SearchPanel.tsx`**
- Import i renderovanje ChatAssistant komponente
- Novo dugme ispod "Pretrazi" buttona:
  - Stil: prozirna pozadina, `border-2 border-primary`, tekst primary boje
  - Ikona: MessageCircle
  - Tekst: "Niste sigurni kako traziti? Isprobajte asistenta"
- State `isChatOpen` za kontrolu otvaranja/zatvaranja popup-a

### Vizuelni izgled chata

```text
+------------------------------------------+
|  [MessageCircle] ILMA Asistent       [X] |
+------------------------------------------+
|                                          |
|  [Bot avatar]                            |
|  Ja sam ILMA asistent! Kako ti mogu      |
|  pomoci? Koji dio trazis?                |
|                                          |
|                     [User bubble]        |
|                     Trebam far za golf 5  |
|                                          |
|  [Bot avatar]                            |
|  Odlicno! Da potvrdim - trazite far za   |
|  Volkswagen Golf 5. Koji far vam treba:  |
|  prednji lijevi, prednji desni...?       |
|                                          |
+------------------------------------------+
|  [Upisite poruku...        ] [Posalji]   |
+------------------------------------------+
```

