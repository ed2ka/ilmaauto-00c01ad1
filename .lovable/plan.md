

## Popravka toka gost narudzbe: "Hold" pristup

### Problem
1. Narudzba se trenutno unosi u bazu PRIJE nego sto se korisnik odluci za registraciju, pa gost narudzbe nemaju `user_id`
2. RLS polisa za INSERT na `orders` tabeli je RESTRICTIVE umjesto PERMISSIVE, sto potpuno blokira gost narudzbe (401 greska)

### Novo ponasanje
1. Gost popuni formu i klikne "Potvrdi narudzbu"
2. Podaci narudzbe se cuvaju u memoriji (NE upisuju u bazu)
3. Popup pita: "Zelite li otvoriti korisnicki nalog?" DA / NE
4. **DA**: Podaci iz narudzbe se popune u formu za registraciju, gost unese email i lozinku, registruje se i automatski uloguje, pa se narudzba unosi u bazu SA `user_id`
5. **NE**: Narudzba se unosi u bazu BEZ `user_id`

### Tehnicke izmjene

**1. Migracija baze -- popravka RLS polise**

Obrisati postojecu RESTRICTIVE INSERT polisu i kreirati novu PERMISSIVE koja dozvoljava svima da naruče:

```sql
DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;
CREATE POLICY "Anyone can place an order"
  ON public.orders FOR INSERT
  WITH CHECK (true);
```

**2. Izmjene u `src/components/OrderSheet.tsx`**

- Ukloniti `guestOrderId` state (vise nije potreban)
- Dodati novi state `pendingOrder` koji cuva podatke narudzbe u memoriji
- Promijeniti `handleSubmitOrder`:
  - Za prijavljene korisnike: odmah upisati u bazu (kao i do sad)
  - Za goste: sacuvati podatke u `pendingOrder`, prikazati popup, NE upisivati u bazu
- Dodati helper funkciju `insertOrder(userId?)` koja vrsi stvarni INSERT u bazu
- Promijeniti "NE" dugme: poziva `insertOrder()` bez user_id, pa zatvara dijaloge
- Promijeniti `handleGuestRegister`: nakon registracije i login-a, poziva `insertOrder(userId)` sa novim user ID-jem
- Ukloniti poziv `claim_guest_order` RPC-a (vise nije potreban)

Ovim pristupom narudzba se uvijek unosi sa ispravnim `user_id` od pocetka, bez potrebe za naknadnim azuriranjem.

