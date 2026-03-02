
## Otvaranje ispravnog taba iz URL parametra

### Problem
Dashboard stranica koristi `defaultValue="orders"` na `Tabs` komponenti i potpuno ignorise `?tab=` query parametar iz URL-a. Zato klik na "Upiti", "Lista zelja" itd. iz header dropdown menija uvijek otvara tab "Narudžbe".

### Rješenje
U `src/pages/Dashboard.tsx`:

1. Importovati `useSearchParams` iz `react-router-dom`
2. Procitati `tab` parametar iz URL-a
3. Koristiti ga kao `defaultValue` umjesto hardkodiranog `"orders"`
4. Mapirati header linkove na ispravne tab vrijednosti (orders, inquiries, wishlist, profile)

### Tehnicke izmjene

**Fajl: `src/pages/Dashboard.tsx`**

- Dodati `useSearchParams` u import iz `react-router-dom` (linija 3)
- Dodati konstantu za citanje tab parametra:
  ```typescript
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "orders";
  ```
- Promijeniti `<Tabs defaultValue="orders">` u `<Tabs defaultValue={activeTab}>` (linija 76)

**Fajl: `src/components/Header.tsx`**

- Promijeniti link "Moj profil" sa `/profil` na `/profil?tab=profile` u oba menija (desktop i mobilni) kako bi i taj link otvarao ispravan tab

### Mapiranje linkova
| Meni stavka | URL | Tab vrijednost |
|---|---|---|
| Narudžbe | /profil?tab=orders | orders |
| Upiti | /profil?tab=inquiries | inquiries |
| Lista želja | /profil?tab=wishlist | wishlist |
| Moj profil | /profil?tab=profile | profile |
