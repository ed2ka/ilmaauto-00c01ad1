

## Pametna narudzba: auto-popunjavanje za prijavljene korisnike

### Problem

Kod vec ima `useEffect` koji pokusava popuniti formu iz profila (linija 71-77 u OrderSheet.tsx), ali korisnik i dalje vidi prazna polja. Moguc uzrok: profil nema sacuvane podatke, ili se `profile` ucitava nakon sto se sheet otvori.

### Rjesenje

Kada je korisnik prijavljen i ima popunjen profil (ime, telefon, adresa), OrderSheet ce:
- Prikazati podatke za dostavu kao **pregledni blok** (ne editabilna forma) sa linkom "Uredi" koji prebacuje na formu
- Odmah ponuditi "Potvrdi narudzbu" dugme -- bez ponovnog unosa

Kada je korisnik prijavljen ali profil je nepotpun:
- Prikazati formu pre-filled sa onim sto postoji
- Poruka: "Popunite podatke koji nedostaju"

Kada je gost (nije prijavljen):
- Prikazati praznu formu kao i do sada
- Poruka: "Prijavite se ili napravite racun za brze narucivanje"

### Tehnicke promjene

**Fajl: `src/components/OrderSheet.tsx`**

1. Dodati stanje `editMode` (boolean, default false za prijavljene sa kompletnim profilom, true za goste i nepotpune profile)
2. Provjeriti da li profil ima sva 3 polja popunjena (`full_name`, `phone`, `address`)
3. Ako je profil kompletan i korisnik je prijavljen:
   - Prikazati podatke za dostavu kao tekst (ime, telefon, adresa) u summary kartici
   - Dugme "Uredi podatke" postavlja `editMode = true` i prikazuje formu
4. Ako profil nije kompletan ili je gost:
   - Prikazati formu (pre-filled ako postoje parcijalni podaci)
5. `useEffect` za auto-fill ostaje isti ali se pokrece i kad se `editMode` ukljuci

| Stanje | Prikaz |
|--------|--------|
| Prijavljen + kompletan profil | Summary podataka + "Uredi" link + "Potvrdi narudzbu" |
| Prijavljen + nepotpun profil | Forma pre-filled + poruka da popuni sto nedostaje |
| Gost | Prazna forma + "Prijavite se / Napravite racun" |

