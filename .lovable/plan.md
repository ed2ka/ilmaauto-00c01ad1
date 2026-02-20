

## Registracija, Prijava, Dashboard, Lista zelja i Pracenje narudzbi

### Pregled

Kompletna integracija korisnickog sistema: registracija i prijava (email/password), korisnicki dashboard sa pregledom narudzbi i statusom, lista zelja (wishlist), i povezivanje "Prijava/Registracija" dugmadi u Header-u. U OrderSheet popupu dodajemo link "Napravi racun".

### 1. Baza podataka -- nove tabele i promjene

**A) Tabela `profiles`**
- `id` (uuid, PK, referenca na auth.users.id, ON DELETE CASCADE)
- `full_name` (text)
- `phone` (text)
- `address` (text)
- `created_at` (timestamptz, default now())
- RLS: korisnik moze citati i uredjivati samo svoj profil
- Trigger: automatski kreira profil kad se korisnik registruje

**B) Tabela `wishlist`**
- `id` (bigint, auto-generated PK)
- `user_id` (uuid, referenca na auth.users.id, ON DELETE CASCADE)
- `part_id` (bigint, referenca na parts.id, ON DELETE CASCADE)
- `created_at` (timestamptz, default now())
- UNIQUE constraint na (user_id, part_id)
- RLS: korisnik vidi/dodaje/brise samo svoje stavke

**C) Promjena na `orders` tabeli**
- Dodati kolonu `user_id` (uuid, nullable, referenca na auth.users.id)
- Nullable jer postojece narudzbe nemaju korisnika, a i dalje dozvoljavamo gost narudzbe
- Azurirati RLS: korisnik moze vidjeti samo svoje narudzbe (WHERE user_id = auth.uid())

### 2. Novi fajlovi

**A) `src/hooks/useAuth.ts`**
- React context/hook za autentifikaciju
- `signUp(email, password, fullName)` -- registracija
- `signIn(email, password)` -- prijava
- `signOut()` -- odjava
- `resetPassword(email)` -- reset lozinke
- `user` -- trenutni korisnik
- `loading` -- stanje ucitavanja
- Koristi `onAuthStateChange` listener

**B) `src/pages/Auth.tsx`**
- Stranica sa tabovima: Prijava / Registracija
- Polja za registraciju: Ime i prezime, Email, Lozinka, Potvrda lozinke
- Polja za prijavu: Email, Lozinka
- Link "Zaboravljena lozinka?"
- Redirect na pocetnu nakon uspjesne prijave
- Ako je korisnik vec prijavljen, redirect na /profil

**C) `src/pages/ResetPassword.tsx`**
- Stranica za postavljanje nove lozinke (obavezna za password reset flow)
- Prikazuje formu za novu lozinku
- Poziva `supabase.auth.updateUser({ password })`

**D) `src/pages/Dashboard.tsx`**
- Korisnicki dashboard sa tabovima:
  - **Moje narudzbe** -- lista svih narudzbi korisnika sa statusom (nova, u obradi, poslano, zavrseno)
  - **Lista zelja** -- prikaz sacuvanih dijelova sa mogucnoscu uklanjanja
  - **Profil** -- ime, email, telefon, adresa + mogucnost uredivanja
- Zasticena ruta -- ako korisnik nije prijavljen, redirect na /prijava

**E) `src/hooks/useWishlist.ts`**
- Hook za upravljanje listom zelja
- `useWishlist()` -- dohvati sve stavke
- `useToggleWishlist()` -- dodaj/ukloni dio
- `useIsInWishlist(partId)` -- provjeri da li je dio u listi

**F) `src/hooks/useOrders.ts`**
- Hook za dohvat narudzbi prijavljenog korisnika
- `useMyOrders()` -- lista narudzbi sa statusom

### 3. Promjene na postojecim fajlovima

**A) `src/components/Header.tsx`**
- "Prijava / Registracija" dugme postaje Link na /prijava
- Kad je korisnik prijavljen: prikazuje ime korisnika + dropdown meni (Moj profil, Odjava)
- Heart ikona postaje Link na listu zelja u dashboardu (ili prikazuje broj stavki)

**B) `src/components/OrderSheet.tsx`**
- Dodati link "Napravi racun" iznad ili ispod forme
- Ako je korisnik prijavljen: automatski popuni ime, telefon i adresu iz profila
- Prilikom submit-a: ako je korisnik prijavljen, postavi `user_id` na narudzbi

**C) `src/components/PartCard.tsx` i `src/components/PartListItem.tsx`**
- Dodati Heart ikonu za dodavanje u listu zelja
- Ako je korisnik prijavljen i dio je u listi, srce je popunjeno (filled)
- Ako korisnik nije prijavljen i klikne srce, redirect na prijavu

**D) `src/pages/PartDetail.tsx`**
- Dodati Heart dugme za wishlist pored naslova ili u akcijama

**E) `src/App.tsx`**
- Dodati AuthProvider wrapper
- Dodati rute: /prijava, /profil, /reset-password
- Zasticena ruta za /profil

### 4. Flow korisnika

```text
Gost korisnik:
  Pregledava dijelove -> Klikne "Naruci" -> Vidi formu + link "Napravi racun"
  Klikne "Prijava/Registracija" u headeru -> /prijava stranica
  
Registrovan korisnik:
  Prijavljen -> Klikne "Naruci" -> Forma automatski popunjena
  Dashboard -> Vidi svoje narudzbe sa statusom
  Dashboard -> Upravlja listom zelja
  Dashboard -> Uredjuje profil
```

### Rezime fajlova

| Fajl | Akcija |
|------|--------|
| SQL migracija: profiles, wishlist, orders update | Nova migracija |
| `src/hooks/useAuth.ts` | Novi fajl |
| `src/hooks/useWishlist.ts` | Novi fajl |
| `src/hooks/useOrders.ts` | Novi fajl |
| `src/pages/Auth.tsx` | Novi fajl |
| `src/pages/ResetPassword.tsx` | Novi fajl |
| `src/pages/Dashboard.tsx` | Novi fajl |
| `src/components/Header.tsx` | Izmjena -- auth stanje, linkovi |
| `src/components/OrderSheet.tsx` | Izmjena -- link "Napravi racun", auto-fill, user_id |
| `src/components/PartCard.tsx` | Izmjena -- wishlist dugme |
| `src/components/PartListItem.tsx` | Izmjena -- wishlist dugme |
| `src/pages/PartDetail.tsx` | Izmjena -- wishlist dugme |
| `src/App.tsx` | Izmjena -- AuthProvider, nove rute |

