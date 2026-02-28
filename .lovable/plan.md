

## Refaktoring ILMA AI Asistenta

### 1. Premjestiti ChatAssistant na globalni nivo (App.tsx)

Trenutno je ChatAssistant renderovan unutar SearchPanel-a i koristi Dialog komponentu. Treba ga pretvoriti u **globalni floating widget** koji je prisutan na svim stranicama:
- Ukloniti ChatAssistant iz `SearchPanel.tsx`
- Dodati ChatAssistant u `App.tsx` (unutar BrowserRouter, ali van Routes)
- ChatAssistant ce sam upravljati svojim stanjem (open/minimized/closed) -- vise ne prima props

### 2. Redizajn ChatAssistant komponente

**Floating dugme (donji desni ugao):**
- Uvijek vidljivo na svim stranicama, svim uredjajima
- Tekst: "AI Pretraga dijelova" sa MessageCircle ikonom
- Zaobljeno dugme, stil slican ATTACHMENT SLIKA 1 (rounded-full, border, bijela pozadina)
- Pozicija: `fixed bottom-6 right-6 z-50`

**Header chata:**
- Naslov: "ILMA AI" umjesto "ILMA Asistent"
- Samo jedan X dugme (ukloniti dupli X bug -- Dialog komponenta dodaje svoj X, a custom X je vec tu)
- Dodati dugme za minimiziranje (Minus ikona) pored X-a

**Pozdravna poruka:**
- Tekst: "Pozdrav, ja sam ILMA AI, Izvolite? Kako mogu pomoci? Koji dio trazite?"
- Prazan red pa napomena: "Napomena: ILMA AI nikada od vas nece traziti bilo kakve licne podatke, niti ih prikuplja u svoju bazu, sav razgovor i podaci koji se razmjenjuju se koriste iskljucivo u svrhu pretrage i lakseg pronalazenja dijelova."

**Persistencija konverzacije:**
- Koristiti `localStorage` za cuvanje poruka (key: `ilma-ai-messages`)
- Pri otvaranju, ucitati poruke iz localStorage
- Pri svakoj novoj poruci, sacuvati u localStorage
- Konverzacija prezivljava zatvaranje taba/browsera

**Minimiziranje:**
- Stanje: `open` (puni chat), `minimized` (samo floating dugme), `closed` (isto kao minimized)
- Kada se minimizira, chat nestaje ali floating dugme ostaje
- Kada se ponovo otvori, konverzacija je tu

### 3. Zamjena Dialog-a za custom panel

Umjesto Radix Dialog-a (koji dodaje overlay i svoj X):
- Koristiti obican `div` sa `fixed` pozicioniranjem
- Pozicija: donji desni ugao, iznad floating dugmeta
- Velicina: `w-[380px] h-[500px]` na desktopu, na mobitelu puni ekran ili skoro puni

### Tehnicke izmjene

| Fajl | Akcija |
|---|---|
| `src/components/ChatAssistant.tsx` | Potpuni refaktoring -- floating widget, localStorage, custom panel umjesto Dialog-a |
| `src/components/SearchPanel.tsx` | Ukloniti ChatAssistant import i renderovanje, zadrzati "Trazi uz asistenta" dugme koje otvara globalni chat |
| `src/App.tsx` | Dodati ChatAssistant kao globalni widget |

### Struktura nove komponente

```text
-- Floating dugme (fixed bottom-right, uvijek vidljivo kada chat nije otvoren)
   [MessageCircle icon] AI Pretraga dijelova

-- Chat panel (fixed bottom-right, iznad dugmeta, kada je otvoren)
   Header: "ILMA AI" | [Minimize] [X]
   Body: poruke sa scroll-om
   Footer: input + send dugme
```

### localStorage logika

```text
Key: "ilma-ai-messages"
Value: JSON.stringify(messages[])
- Ucitaj pri mount-u komponente
- Sacuvaj nakon svake nove poruke
- Pozdravna poruka se dodaje samo ako nema sacuvanih poruka
```
