

## Poboljsanja autentikacije i gost-narudzbe

### 1. Prikaz/sakrivanje lozinke (Eye toggle)

Dodati ikonu oka (`Eye` / `EyeOff` iz lucide-react) pored polja za lozinku na:
- **Prijava**: polje "Lozinka" (linija 165)
- **Registracija**: polja "Lozinka" i "Potvrdi lozinku" (linije 197, 201)

Implementacija: wrapper `div` sa `relative` klasom oko Input-a, a ikona apsolutno pozicionirana desno. Klik na ikonu mijenja `type` izmedju `password` i `text`.

Novi state varijable:
- `showLoginPass` za login
- `showRegPass` za registraciju
- `showRegPassConfirm` za potvrdu lozinke

### 2. Automatska prijava nakon registracije (bez email verifikacije)

Izmjena u `src/pages/Auth.tsx` (`handleRegister` funkcija, linije 65-83):
- Nakon uspjesnog `signUp`, odmah pozvati `signIn(regEmail, regPass)`
- Ako je prijava uspjesna, preusmjeriti na pocetnu stranicu
- Promijeniti toast poruku sa "Provjerite email" na "Registracija uspjesna! Dobrodosli!"

Izmjena u `src/hooks/useAuth.tsx` (`signUp` funkcija):
- Nema promjena potrebnih -- signUp vec radi, a `onAuthStateChange` ce automatski uhvatiti sesiju kada se korisnik uloguje

**Napomena**: Ako je email verifikacija i dalje ukljucena na backendu, `signIn` nakon `signUp` nece uspjeti dok se email ne potvrdi. Preporucam da se provjeri da li je auto-confirm vec aktivan ili ga treba rucno ukljuciti u postavkama.

### 3. Popup nakon gost narudzbe za kreiranje naloga

Izmjene u `src/components/OrderSheet.tsx`:
- Dodati novi state: `showAccountPrompt` (boolean)
- Dodati state za cuvanje podataka gosta: `guestData` (ime, telefon, adresa)
- Nakon uspjesne narudzbe bez prijave (gost), umjesto zatvaranja sheet-a, prikazati Dialog/AlertDialog sa pitanjem:
  - Naslov: "Zelite li otvoriti korisnicki nalog?"
  - Tekst: "Vasi podaci ce biti sacuvani za brze narudbe u buducnosti."
  - Dugmad: **DA** i **NE**
- Ako korisnik klikne **NE** -- zatvori popup i sheet
- Ako korisnik klikne **DA** -- prikazati mali formular sa:
  - Email (prazan, za unos)
  - Lozinka (prazna, za unos)
  - Ime, telefon i adresa vec popunjeni iz narudzbe (readonly ili skriveni)
  - Dugme "Kreiraj nalog"
- Registracija koristi `signUp` sa podacima iz narudzbe + unesenim emailom i lozinkom
- Nakon registracije, automatski signIn

### Tehnicke izmjene po fajlovima

**`src/pages/Auth.tsx`**:
- Import `Eye`, `EyeOff` iz lucide-react
- 3 nova state-a za password visibility
- Input type dinamicki (`showLoginPass ? "text" : "password"`)
- Ikona oka kao apsolutno pozicionirano dugme
- `handleRegister`: nakon signUp, pozvati signIn i navigate("/")

**`src/components/OrderSheet.tsx`**:
- Import `AlertDialog` komponente i `Eye`, `EyeOff`
- Novi state-ovi: `showAccountPrompt`, `guestData`, `regEmail`, `regPassword`, `showRegPassword`
- Modifikovati `handleSubmitOrder`: ako je gost i narudzba uspjesna, sacuvati podatke i prikazati prompt
- Dodati AlertDialog sa dva koraka: pitanje DA/NE, pa formular za email+lozinku
- Funkcija za registraciju koja koristi sacuvane podatke

