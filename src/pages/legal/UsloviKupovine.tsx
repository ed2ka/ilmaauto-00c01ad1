import LegalPageLayout from "@/components/LegalPageLayout";

// ✏️ Uredi sadržaj ispod — naslov, datum i sekcije
const UsloviKupovine = () => {
  return (
    <LegalPageLayout title="Uslovi kupovine" lastUpdated="16.06.2026">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ovi uslovi
        regulišu proces naručivanja i kupovine auto dijelova putem platforme
        ILMA AUTO.
      </p>

      <h2>1. Naručivanje</h2>
      <p>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Narudžbe se mogu izvršiti kao gost ili kao registrovani korisnik.
      </p>

      <h2>2. Cijene i način plaćanja</h2>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        Sve cijene su izražene u konvertibilnim markama (KM) sa uključenim PDV-om.
      </p>
      <ul>
        <li>Pouzećem prilikom preuzimanja pošiljke.</li>
        <li>Uplata na transakcijski račun.</li>
        <li>Lično u poslovnici.</li>
      </ul>

      <h2>3. Dostava</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore. Standardna cijena dostave iznosi 10 KM za područje Bosne i
        Hercegovine.
      </p>

      <h2>4. Potvrda narudžbe</h2>
      <p>
        Nakon zaprimanja narudžbe, naš tim će vas kontaktirati radi potvrde
        dostupnosti dijela i ukupne cijene.
      </p>

      <h2>5. Otkazivanje narudžbe</h2>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </LegalPageLayout>
  );
};

export default UsloviKupovine;