## Plan: Zahtjev za pretragu dijela kada nema rezultata

Ovo je kompleksan feature koji zahtijeva bazu podataka, novu komponentu, izmjene na Dashboard-u i logiku za prijavljene/neprijavljene korisnike.

### 1. Nova tabela `part_inquiries` (migracija)

```sql
CREATE TABLE public.part_inquiries (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id),
  search_query text not null,        -- šta je korisnik tražio
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  status text not null default 'novi',  -- novi, u_obradi, riješen
  created_at timestamptz not null default now()
);

ALTER TABLE public.part_inquiries ENABLE ROW LEVEL SECURITY;

-- Svako može kreirati upit (i gosti)
CREATE POLICY "Anyone can create inquiry" ON public.part_inquiries FOR INSERT WITH CHECK (true);
-- Korisnici vide samo svoje upite
CREATE POLICY "Users can view own inquiries" ON public.part_inquiries FOR SELECT USING (user_id = auth.uid());
```

### 2. Nova komponenta `NoResultsInquiry`

Kreirati `src/components/NoResultsInquiry.tsx`:

- Prima search parametre (kataloški broj, naziv dijela, marka, tip) kao props
- Prikazuje lijepu sekciju sa tekstom o 1.000.000+ dijelova na lageru
- Pre-popunjava polje "Vaš upit" sa onim što je korisnik tražio (read-only ali editabilno za potvrdu)
- Polja forme: Ime i prezime, Broj telefona, Email
- Ako je korisnik prijavljen, auto-popuni iz profila i automatski poveže `user_id`
- Ako nije prijavljen, prikaže link "Želite otvoriti korisnički nalog?" koji vodi na `/prijava`
- Na submit: insertuje u `part_inquiries` tabelu, prikaže toast potvrdu
- Poruka ispod forme: "Kontaktirati ćemo vas na dostavljene kontakt podatke"

### 3. Izmjena `SearchResults.tsx`

Zamijeniti postojeći "Nema rezultata" blok (empty state) sa `<NoResultsInquiry />` komponentom, proslijediti joj search parametre.

### 4. Izmjena `Dashboard.tsx`

- Dodati 4. tab "Upiti" (sa ikonom `Search` ili `MessageSquare`)
- Prikazati listu upita iz `part_inquiries` tabele za prijavljenog korisnika
- Svaki upit prikazuje: datum, search query, status (badge)

### 5. Hook `useInquiries`

Kreirati hook za:

- Dohvaćanje upita korisnika (`useMyInquiries`)
- Kreiranje novog upita (`useCreateInquiry`)

### 6. Logika za prijavu i prebacivanje upita

Kada neprijavljeni korisnik pošalje upit sa `user_id = null`, a zatim se registruje:

- Na Auth stranici nakon uspješne registracije, provjeriti sessionStorage za pending inquiry
- Ako postoji, updateati `user_id` na novog korisnika (slično kao `claim_guest_order`)

Za to treba:

- DB funkcija `claim_guest_inquiry` (SECURITY DEFINER)
- RLS policy za update (samo za claim)
- sessionStorage čuvanje inquiry ID-a prije redirekcije na registraciju

### Redoslijed implementacije

1. Migracija baze (tabela + RLS + claim funkcija)
2. Hook `useInquiries.ts`
3. Komponenta `NoResultsInquiry.tsx`
4. Izmjena `SearchResults.tsx` - zamjena empty state
5. Izmjena `Dashboard.tsx` - novi tab "Upiti"
6. Izmjena `Auth.tsx` - claim pending inquiry nakon registracije  
  
  
  
  
Umjesto samo forme — napravi ovo:
  ### Naslov:
  **Nismo pronašli traženi dio u sistemu**
  ### Tekst:
  Na lageru imamo preko 1.000.000 autodijelova koji još nisu uneseni u sistem. Vrlo je vjerovatno da traženi dio imamo na stanju.
  ### CTA blok:
  📩 Pošaljite zahtjev za dodatnu provjeru
  ---
  Forma treba da ima:
  - readonly field:  
  “Tražili ste:” (prepopunjeno)
  - checkbox:  
  ✔️ Potvrđujem da je ovo dio koji tražim
  Tek onda Submit aktivan.