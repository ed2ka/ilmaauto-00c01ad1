

## Unos 150 artikala u bazu podataka

Procitao sam kompletan JSON fajl sa 150 artikala (IDs 736911-736762).

### Plan

Unijet cu svih 150 artikala direktno u bazu koristeci SQL INSERT naredbe u 3 batcha po 50 artikala.

### Koraci

1. **Batch 1** (artikli 1-50): IDs 736911-736862 -- Mercedes, VW, Ford, Audi, Renault, KIA, SKODA, SEAT, OPEL, SMART, BMW, Dacia, FIAT, IVECO, Land Rover, Hyundai
2. **Batch 2** (artikli 51-100): IDs 736861-736812 -- Mercedes, Hyundai, IVECO, BMW, VW, SKODA, Citroen, Ford, Renault, Volvo, AUDI, PEUGEOT, KIA
3. **Batch 3** (artikli 101-150): IDs 736811-736762 -- Renault, VW, Ford, KIA, AUDI, OPEL, SEAT, Mercedes, PEUGEOT, FIAT, IVECO, Hyundai, BMW

### Tehnicke napomene

- Koristim `INSERT INTO public.parts (...) VALUES (...) ON CONFLICT (id) DO UPDATE SET ...`
- Mapiranje polja: `marka1` -> `marka`, `tip1` -> `tip`, `model1` -> `model`
- Slike koje su `null` ostaju null
- Svi artikli dobijaju `is_available = true`
- 9 postojecih artikala ce se azurirati ako se poklapaju ID-ovi
- Proces zahtijeva 3 odobrenja (jedno po batch-u) jer je ogranicenje alata 50 redova po upitu
- Specijalni karakteri u vrijednostima (apostrofi) ce biti escapovani

