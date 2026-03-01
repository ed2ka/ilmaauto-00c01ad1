

##Responzivni VIN Input za mobilne uređaje

### Trenutno stanje
Svih 17 VIN polja su u jednom redu, što na mobilnim ekranima izlazi van okvira.

### Novo ponašanje na mobilnim uređajima
- **Red 1**: Prva 3 polja (WMI) + razmak + sljedećih 6 polja (VDS) = ukupno 9 polja
- **Red 2**: Preostalih 8 polja (VIS) + dugmići "Zalijepi" i "Kopiraj"
- Na desktopu ostaje sve u jednom redu kao i do sada

### Tehničke izmjene

**`src/components/VinInput.tsx`**:

Umjesto jednog `flex` kontejnera sa svih 17 inputa, podijeliti ih u dva dijela:
- Grupa 1: indeksi 0-8 (prva 3 + razmak + sljedećih 6)
- Grupa 2: indeksi 9-16 (preostalih 8) + Zalijepi/Kopiraj dugmići

Struktura:
```
<div className="flex flex-wrap items-center gap-0.5">
  <!-- Grupa 1: inputi 0-8 -->
  <div className="flex items-center gap-0.5">
    {inputs 0-2}
    <span className="w-2" />  <!-- razmak -->
    {inputs 3-8}
  </div>
  <!-- Grupa 2: inputi 9-16 + dugmići -->
  <div className="flex items-center gap-0.5">
    <span className="w-2 hidden sm:inline" />  <!-- razmak samo na desktopu -->
    {inputs 9-16}
    <!-- Zalijepi/Kopiraj dugmići -->
    <div className="flex items-center gap-1 ml-2">
      ...
    </div>
  </div>
</div>
```

Na mobilnom, `flex-wrap` će automatski prebaciti drugu grupu u novi red. Na desktopu, sve ostaje u jednom redu.

Dugmići "Zalijepi" i "Kopiraj" se premještaju iz zasebnog `div`-a ispod inputa u drugi red pored preostalih 8 polja (samo na mobilnom), a na desktopu ostaju dio istog reda.
