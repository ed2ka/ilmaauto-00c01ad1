## Cilj
Pored postojećeg dugmeta "Pošalji zahtjev" u empty-state formi (kad pretraga ne vrati rezultat), dodati drugo dugme **"Pošalji porukom na Viber"** koje otvara Viber sa pripremljenom porukom koja sadrži sve podatke koje je korisnik unio u formu — po istom obrascu kao "Viber narudžba" dugme na ekranu dijela.

## Fajl
- `src/components/SearchNoResultsModule.tsx`

## Izmjene

### 1. Layout dugmadi
Trenutno postoji jedno full-width dugme "Pošalji zahtjev". Zamijeniti ga sa dva dugmeta jedno do drugog (kao na PartDetail):

```text
[ Pošalji zahtjev ]   [ 🟣 Pošalji porukom na Viber ]
```

Na mobilu (sm:) ostaju side-by-side jer su kratki; ako bude tijesno, mogu se složiti vertikalno (`flex-col sm:flex-row`).

### 2. Viber poruka
Sastaviti string sa svim podacima iz forme:

```
Pozdrav, šaljem zahtjev za provjeru dijela koji nije pronađen u sistemu:

Tražim: {buildSearchText()}

Ime i prezime: {name}
Telefon: {phone}
Email: {email}

ILMA AUTO | originalni autodijelovi za sve marke vozila - {window.location.href}
```

Encode-ovati kroz `encodeURIComponent` i upakovati u:
`viber://chat?number=%2B38761454151&draft=<encoded>`

(isti broj kao na PartDetail: `+38761454151`)

### 3. Ponašanje
- Viber dugme je **disabled** dok:
  - checkbox "Potvrđujem da je ovo dio koji tražim" nije označen, ili
  - bilo koje od polja (ime / telefon / email) je prazno.
- Klik na Viber dugme **ne šalje** inquiry u bazu (za razliku od "Pošalji zahtjev"). Otvara samo Viber sa pripremljenom porukom. Ovo prati logiku PartDetail ekrana gdje "Viber narudžba" samo otvara chat, a "Naruči" dugme čuva narudžbu u sistem.
- Stil: `variant="outline"` + Viber ikona (`@/assets/viber-icon.svg`) + `[filter:brightness(0)]` — identično PartDetail.

### 4. Import
Dodati: `import viberIcon from "@/assets/viber-icon.svg";`

## Šta se NE mijenja
- Postojeća `handleSubmit` logika, validacija, toast, sessionStorage handling, "thank you" stanje, "Želite otvoriti korisnički nalog?" link — sve ostaje netaknuto.
- Broj telefona i format Viber URL-a — koristi se isti hardkodirani broj kao trenutno na PartDetail.
