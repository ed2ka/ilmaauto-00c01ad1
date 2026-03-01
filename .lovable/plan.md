

## Izmjene na prikazu narudzbi

### 1. Format datuma DD-MM-YYYY

Na liniji 144 u `src/pages/Dashboard.tsx`, zamijeniti `toLocaleDateString("bs-BA")` sa custom formatom koristeci `date-fns` funkciju `format(date, "dd-MM-yyyy")`.

Takodje pretraziti cijelu aplikaciju za bilo koje druge prikaze datuma i primijeniti isti format.

### 2. Tracking sekcija -- uvijek vidljiva

Trenutno se tracking sekcija prikazuje samo ako `tracking_code` postoji (linija 122). Izmjena:

- Ukloniti uslov `(o as any).tracking_code &&`
- Uvijek prikazivati tracking sekciju
- Ako `tracking_code` postoji: prikazati kod i link kao do sada
- Ako `tracking_code` NE postoji: prikazati poruku "Nije jos uvijek dodijeljen kod za pracenje" u sivo/italic stilu

### Tehnicke izmjene

**`src/pages/Dashboard.tsx`**:
- Import `format` iz `date-fns`
- Linija 144: `format(new Date(o.created_at), "dd-MM-yyyy")`
- Linije 122-137: Ukloniti uslovni prikaz, dodati fallback poruku za tracking

