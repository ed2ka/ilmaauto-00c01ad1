import LegalPageLayout from "@/components/LegalPageLayout";

// ✏️ Uredi sadržaj ispod — naslov, datum i sekcije
const Kolacici = () => {
  return (
    <LegalPageLayout title="Politika kolačića" lastUpdated="16.06.2026">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Naša platforma
        koristi kolačiće (cookies) radi poboljšanja korisničkog iskustva.
      </p>

      <h2>1. Šta su kolačići?</h2>
      <p>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Kolačići su male tekstualne datoteke koje se pohranjuju na vašem
        uređaju prilikom posjete web stranici.
      </p>

      <h2>2. Vrste kolačića koje koristimo</h2>
      <ul>
        <li><strong>Neophodni kolačići</strong> — omogućavaju osnovno funkcionisanje stranice.</li>
        <li><strong>Analitički kolačići</strong> — pomažu nam da razumijemo kako koristite stranicu.</li>
        <li><strong>Funkcionalni kolačići</strong> — pamte vaše postavke i preference.</li>
        <li><strong>Marketinški kolačići</strong> — koriste se za prikaz relevantnih oglasa.</li>
      </ul>

      <h2>3. Upravljanje kolačićima</h2>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        Možete u bilo kojem trenutku promijeniti postavke kolačića u svom
        pretraživaču.
      </p>

      <h2>4. Kolačići trećih strana</h2>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore. Određene treće strane (npr. analitički servisi) mogu postavljati
        svoje kolačiće.
      </p>

      <h2>5. Izmjene politike</h2>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </LegalPageLayout>
  );
};

export default Kolacici;