

## Dodavanje "Upiti" stavke u padajući meni profila

Potrebno je dodati link "Upiti" na dva mjesta u `src/components/Header.tsx`:

### 1. Desktop padajuci meni (linija 64-67)
Dodati novu `DropdownMenuItem` sa `MessageSquare` ikonom i linkom na `/profil?tab=inquiries`, odmah nakon "Lista zelja".

### 2. Mobilni meni (linija 99-100)  
Dodati isti link u mobilnom meniju, nakon "Lista zelja".

### 3. Import
Dodati `MessageSquare` u import iz `lucide-react`.

### Tehnicki detalji

Izmjene su samo u fajlu `src/components/Header.tsx`:
- Import: dodati `MessageSquare` u postojeci lucide-react import
- Desktop meni: nova stavka izmedju "Lista zelja" i "Moj profil"
- Mobilni meni: nova stavka izmedju "Lista zelja" i "Moj profil"

