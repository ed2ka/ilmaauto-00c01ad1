

## Support Chat Code - generisanje i čuvanje historije razgovora

### Šta se radi

1. Nakon što se welcome poruka ispiše, prikazati dodatnu poruku:
   - **"Vaša lozinka za podršku je: XXXX-XXX"** (normalan font)
   - **"Na zahtjev pročitajte ovaj code"** (italic, manji font - kao Napomena)

2. Code format: posljednje 4 cifre timestampa + "-" + 3 random cifre (npr. `1778-112`)

3. Nova tabela u bazi: **support_chat_codes** - čuva historiju pretrage (šta je korisnik pitao, šta je AI odgovorio)

### Vizualni prikaz

```text
+--------------------------------------------+
| Pozdrav, ja sam ILMA AI, Izvolite?         |
| Kako mogu pomoći? Koji dio tražite?        |
|                                            |
| Vaša lozinka za podršku je: 6695-482       |
|                                            |
| Napomena: ILMA AI nikada od vas neće...    |  <- text-[10px] italic
| Na zahtjev pročitajte ovaj code            |  <- text-[10px] italic
+--------------------------------------------+
```

### Tehničke izmjene

**1. Nova tabela: `support_chat_codes`** (migracija)

```sql
CREATE TABLE public.support_chat_codes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code text NOT NULL UNIQUE,
  user_message text NOT NULL,
  assistant_response text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.support_chat_codes ENABLE ROW LEVEL SECURITY;

-- Javno upisivanje (anonimni korisnici mogu koristiti chat)
CREATE POLICY "Anyone can insert chat logs"
  ON public.support_chat_codes FOR INSERT
  WITH CHECK (true);

-- Samo admin može čitati (korisnici ne trebaju pristup)
CREATE POLICY "Service role can read all"
  ON public.support_chat_codes FOR SELECT
  USING (false);
```

**2. Fajl: `src/components/ChatAssistant.tsx`**

- Funkcija `generateSupportCode()`: uzima `Date.now()`, zadnje 4 cifre + "-" + random trocifreni broj
- Dodati state `supportCode` koji se generiše jednom pri otvaranju chata (ili pri novom razgovoru)
- Ažurirati `WELCOME_MSG` da uključi placeholder `{{SUPPORT_CODE}}` ili dodati code kao zasebnu liniju pri renderovanju
- Kod prikaza welcome poruke: nakon Napomene dodati italic tekst "Na zahtjev pročitajte ovaj code"
- Nakon svakog AI odgovora: upisati u `support_chat_codes` tabelu (korisnikova poruka, AI odgovor, support code)
- Čuvati `supportCode` u localStorage zajedno sa porukama, da se ne mijenja pri refreshu

**3. Logika generisanja koda**

```typescript
function generateSupportCode(): string {
  const ts = Date.now().toString();
  const last4 = ts.slice(-4);
  const rand3 = Math.floor(100 + Math.random() * 900).toString();
  return `${last4}-${rand3}`;
}
```

**4. Čuvanje u bazu** - nakon svakog kompletnog AI odgovora poziv:

```typescript
supabase.from('support_chat_codes').insert({
  code: supportCode,
  user_message: lastUserMessage,
  assistant_response: aiResponse
});
```

