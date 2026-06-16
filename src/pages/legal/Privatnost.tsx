import LegalPageLayout from "@/components/LegalPageLayout";

// ✏️ Uredi sadržaj ispod — naslov, datum i sekcije
const Privatnost = () => {
  return (
    <LegalPageLayout
      title="Politika privatnosti i zaštite podataka"
      lastUpdated="16.06.2026"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ova politika
        opisuje kako ILMA AUTO d.o.o. prikuplja, koristi i štiti vaše lične
        podatke prilikom korištenja naše platforme.
      </p>

      <h2>1. Podaci koje prikupljamo</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <ul>
        <li>Lični podaci: ime, prezime, email, broj telefona, adresa.</li>
        <li>Podaci o vozilu: VIN, marka, model, godište.</li>
        <li>Tehnički podaci: IP adresa, tip uređaja, pretraživač.</li>
      </ul>

      <h2>2. Svrha obrade podataka</h2>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Vaši podaci se koriste isključivo u
        svrhu izvršenja narudžbe, komunikacije i poboljšanja usluge.
      </p>

      <h2>3. Pravni osnov obrade</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Obrada se vrši na osnovu vaše izričite
        saglasnosti ili izvršenja ugovora.
      </p>

      <h2>4. Čuvanje i sigurnost</h2>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum. Primjenjujemo organizacione i
        tehničke mjere zaštite.
      </p>

      <h2>5. Vaša prava</h2>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium. Imate pravo na pristup, ispravku, brisanje i
        prenos svojih podataka.
      </p>

      <h2>6. Kontakt</h2>
      <p>
        Za sva pitanja vezana za zaštitu podataka kontaktirajte nas putem stranice{" "}
        <a href="/podrska">Podrška</a>.
      </p>
    </LegalPageLayout>
  );
};

export default Privatnost;