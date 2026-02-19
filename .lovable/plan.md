

## Unos 150 artikala u bazu podataka

Trenutno stanje: 9 artikala u bazi. Cilj: 150 artikala.

### Pristup

Unijet cu 150 artikala iz JSON fajla direktno u bazu koristeci SQL INSERT naredbe u batchevima po 50 artikala (ogranicenje alata).

### Koraci

1. **Batch 1** (artikli 1-50): Unos prvih 50 artikala (IDs 736911-736862)
2. **Batch 2** (artikli 51-100): Unos sljedecih 50 artikala
3. **Batch 3** (artikli 101-150): Unos zadnjih 50 artikala

### Tehnicke napomene

- Koristim `INSERT INTO public.parts (...) VALUES (...) ON CONFLICT (id) DO UPDATE SET ...` za svaki batch
- Mapiranje: `marka1` -> `marka`, `tip1` -> `tip`, `model1` -> `model`
- Slike koje su `null` ostaju null
- Svi artikli dobijaju `is_available = true`
- 9 postojecih artikala ce se azurirati ako se poklapaju ID-ovi (ON CONFLICT)
- Proces zahtijeva 3 odobrenja (jedno po batch-u)

