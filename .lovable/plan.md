

## Prosirivanje prijave/registracije na /prijava stranici

### 1. Google prijava (OAuth)

Koristit cemo Lovable Cloud managed Google OAuth. Potrebno je:
- Pozvati Configure Social Login tool za generisanje lovable modula
- Dodati "Prijavi se putem Google-a" dugme na oba taba (prijava i registracija)
- Dugme ce biti vizualno odvojeno separatorom ("ili") od forme

### 2. Nova polja na registraciji

Dodati dva nova polja u registracijsku formu:
- **Adresa** (tekstualno polje, obavezno)
- **Broj telefona** (tekstualno polje, obavezno)

Ova polja ce se slati kao `user_metadata` prilikom registracije, a `handle_new_user` trigger ce se azurirati da cuva `phone` i `address` u `profiles` tabeli.

### 3. Checkbox za uslove koristenja

Dodati tri checkboxa koji moraju biti oznaceni prije registracije:
- "Prihvatam uslove koristenja" (link na #)
- "Slazem se sa politikom privatnosti" (link na #)
- "Saglasan/na sam da se moji podaci koriste za registraciju na ovaj servis"

Dugme "Registruj se" ce biti onemoguceno dok svi checkboxovi nisu oznaceni.

### 4. Azuriranje `useAuth.tsx`

Prosiriti `signUp` funkciju da prima `phone` i `address` parametre i salje ih kao `user_metadata`.

### 5. Azuriranje database triggera

Azurirati `handle_new_user()` funkciju da izvlaci `phone` i `address` iz `raw_user_meta_data` i upisuje u `profiles` tabelu.

---

### Tehnicke izmjene

| Fajl / Resurs | Akcija |
|----------------|--------|
| Lovable Cloud Social Auth | Konfigurisati Google OAuth putem alata |
| `src/hooks/useAuth.tsx` | Prosiriti `signUp` da prima phone i address |
| `src/pages/Auth.tsx` | Dodati Google dugme, polja za adresu/telefon, checkboxove |
| DB migracija | Azurirati `handle_new_user` trigger da cuva phone i address |

### Vizualni raspored registracije (odozgo prema dole)

```text
[Google dugme]
---- ili ----
Ime i prezime
Email
Lozinka
Potvrdi lozinku
Adresa
Broj telefona
[ ] Prihvatam uslove koristenja
[ ] Slazem se sa politikom privatnosti
[ ] Saglasan sam da se moji podaci koriste...
[Registruj se]
```

### Vizualni raspored prijave (odozgo prema dole)

```text
[Google dugme]
---- ili ----
Email
Lozinka
[Prijavi se]
Zaboravljena lozinka?
```

