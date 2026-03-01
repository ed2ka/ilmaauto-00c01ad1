

## Dinamične statusne poruke ispod tačkica dok AI pretražuje

### Izmjena

**Fajl: `src/components/ChatAssistant.tsx`**

Zadržati postojeće tri skačuće tačkice i dodati ispod njih rotirajući tekst sa kontekstualnim porukama.

### Vizualni prikaz

```text
+-------------------------------+
|         ● ● ●                 |
| Pretražujem marku vozila...   |
+-------------------------------+
```

Tačkice ostaju gore, ispod njih se pojavljuje tekst koji se mijenja svakih ~2 sekunde sa fade animacijom.

### Tehničke izmjene

1. **Zamjena `TypingIndicator` sa `SmartTypingIndicator`**:
   - Prima `userMessage` prop (posljednja korisnikova poruka)
   - Gornji dio: tri skačuće tačkice (nepromijenjene)
   - Donji dio: rotirajući tekst sa `useState` + `setInterval` (2s)
   - Fade-in animacija pri promjeni teksta (CSS transition ili `animate-fade-in`)

2. **Funkcija `getContextMessages(text)`**:
   - Provjerava da li korisnikov tekst sadrži poznate brendove (Audi, BMW, Mercedes, itd.) ili ključne riječi (dio, filter, kočnica...)
   - Ako prepozna kontekst: vraća niz poput ["Pretražujem marku vozila...", "Pretražujem model...", "Pretražujem godište...", "Provjeravam dostupne dijelove...", "Pripremam rezultate..."]
   - Ako ne prepozna: vraća generalne poruke ["Pretražujem bazu podataka...", "Analiziram upit...", "Pripremam odgovor..."]

3. **Ažuriranje renderovanja**: Proslijediti posljednju korisnikovu poruku u `SmartTypingIndicator` umjesto starog `TypingIndicator`.

