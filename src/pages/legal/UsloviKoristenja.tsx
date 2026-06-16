import LegalPageLayout from "@/components/LegalPageLayout";

// ✏️ Uredi sadržaj ispod — naslov, datum i sekcije
const UsloviKoristenja = () => {
  return (
    <LegalPageLayout title="Uslovi korištenja" lastUpdated="16.06.2026">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Korištenjem
        platforme ILMA AUTO prihvatate sljedeće uslove korištenja.
      </p>

      <h2>1. Prihvatanje uslova</h2>
      <p>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Pristupom platformi smatra se da ste pročitali i prihvatili ove uslove.
      </p>

      <h2>2. Korisnički nalog</h2>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Odgovorni ste za tačnost podataka i
        čuvanje pristupnih podataka.
      </p>

      <h2>3. Pravila ponašanja</h2>
      <ul>
        <li>Zabranjeno je zloupotrebljavati platformu.</li>
        <li>Zabranjeno je objavljivati lažne ili obmanjujuće informacije.</li>
        <li>Zabranjeno je narušavati sigurnost ili dostupnost servisa.</li>
      </ul>

      <h2>4. Intelektualna svojina</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Sav sadržaj platforme vlasništvo je
        ILMA AUTO d.o.o.
      </p>

      <h2>5. Ograničenje odgovornosti</h2>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>

      <h2>6. Izmjene uslova</h2>
      <p>
        Zadržavamo pravo izmjene uslova u bilo kojem trenutku. Sve izmjene će
        biti objavljene na ovoj stranici sa naznačenim datumom posljednje izmjene.
      </p>
    </LegalPageLayout>
  );
};

export default UsloviKoristenja;