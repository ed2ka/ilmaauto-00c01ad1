

## Dodavanje stavki u padajuci meni profila

Trenutno padajuci meni ima samo "Moj profil" i "Odjava". Treba dodati "Narudzbe" i "Lista zelja" tako da redoslijed bude:

1. **Narudzbe** -- vodi na `/profil?tab=orders`
2. **Lista zelja** -- vodi na `/profil?tab=wishlist`
3. **Moj profil** -- vodi na `/profil`
4. **Odjava** -- poziva signOut

### Tehnicke izmjene

**`src/components/Header.tsx`**:
- Import `ShoppingBag` i `Heart` ikone iz lucide-react (Heart vec postoji)
- Dodati dvije nove `DropdownMenuItem` stavke prije "Moj profil":
  - "Narudzbe" sa `ShoppingBag` ikonom, link na `/profil?tab=orders`
  - "Lista zelja" sa `Heart` ikonom, link na `/profil?tab=wishlist`
- Dodati ikone i na postojece stavke za konzistentnost (`User` za "Moj profil")
- Iste stavke dodati i u mobilni meni (linije 88-92)

Separator (`DropdownMenuSeparator`) izmedju "Moj profil" i "Odjava" za vizualno odvajanje.
