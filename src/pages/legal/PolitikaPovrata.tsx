import LegalPageLayout from "@/components/LegalPageLayout";

// ✏️ Uredi sadržaj ispod — naslov, datum i sekcije
const PolitikaPovrata = () => {
  return (
    <LegalPageLayout title="Politika povrata" lastUpdated="16.06.2026">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. ILMA AUTO
        d.o.o. omogućava povrat proizvoda u skladu sa uslovima navedenim u
        nastavku.
      </p>

      <h2>1. Pravo na povrat</h2>
      <p>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Imate pravo na povrat proizvoda u roku od 14 dana od dana preuzimanja.
      </p>

      <h2>2. Uslovi za povrat</h2>
      <ul>
        <li>Proizvod mora biti nekorišten i u originalnom pakovanju.</li>
        <li>Priložiti račun ili dokaz o kupovini.</li>
        <li>Proizvod ne smije biti oštećen od strane kupca.</li>
      </ul>

      <h2>3. Postupak povrata</h2>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Kontaktirajte nas putem stranice{" "}
        <a href="/podrska">Podrška</a> radi inicijacije procesa povrata.
      </p>

      <h2>4. Povrat novca</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore. Povrat sredstava će biti izvršen u roku od 14 dana od prijema i
        provjere vraćenog proizvoda.
      </p>

      <h2>5. Reklamacije</h2>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </LegalPageLayout>
  );
};

export default PolitikaPovrata;