import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Da li su dijelovi originalni?",
    answer: "Da. Svi dijelovi u našoj ponudi su OEM originalni dijelovi skinuti sa vozila. Ne prodajemo kineske niti zamjenske dijelove — isključivo fabričke komponente proizvođača.",
  },
  {
    question: "Da li dijelovi imaju garanciju?",
    answer: "Da. Na svaki dio dajemo garanciju na ispravnost. Svaki dio je prethodno testiran i provjeren prije slanja kupcu.",
  },
  {
    question: "Šta ako mi dio ne odgovara?",
    answer: "Omogućili smo EASY RETURN – povrat u roku od 7 dana. Ukoliko dio ne odgovara ili vam nije potreban, možete ga vratiti u predviđenom roku.",
  },
  {
    question: "Da li su vozila sa kojih skidate dijelove legalna?",
    answer: "Da. Sva vozila koja otkupljujemo za dijelove imaju uredno porijeklo i prolaze zakonski propisanu proceduru. Svaki dio ima poznato porijeklo i evidentirano vozilo sa kojeg je demontiran.",
  },
  {
    question: "Koliko dijelova imate na stanju?",
    answer: "U sistemu imamo preko 700.000 dostupnih autodijelova.\n\nFun fact: Na lageru imamo više od 1.000.000 dijelova koji još nisu uneseni u sistem zbog obima posla.",
    hasFunFact: true,
  },
  {
    question: "Šta ako ne mogu pronaći dio koji tražim?",
    answer: "Vrlo je vjerovatno da dio imamo na stanju, ali još nije unesen u sistem. Kontaktirajte nas — naši stručnjaci će provjeriti raspoloživost i javiti vam u najkraćem roku.",
  },
  {
    question: "U koje zemlje vršite dostavu?",
    answer: "Dostavu vršimo brzom poštom u sve zemlje Balkana i širom Evropske unije.",
  },
  {
    question: "Koji su načini plaćanja dostupni?",
    answer: "payment-list",
    isPaymentList: true,
  },
  {
    question: "Da li nudite saradnju za auto-mehaničare i servise?",
    answer: "Da. Majstori i servisi se mogu registrovati kao poslovni korisnici i ostvariti do 30% popusta na sve dijelove.",
  },
  {
    question: "Kako mogu biti siguran da kupujem pravi dio?",
    answer: "Svaki dio ima jasno navedene podatke o vozilu sa kojeg je demontiran. Naš tim vam stoji na raspolaganju za dodatnu provjeru kompatibilnosti prije kupovine.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-2">Često postavljana pitanja</h2>
        <p className="text-center text-muted-foreground mb-8">
          Odgovori na najčešća pitanja naših kupaca
        </p>
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.isPaymentList ? (
                  <div>
                    <p className="mb-2">Plaćanje je moguće:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Karticama</li>
                      <li>Gotovinski pri preuzimanju</li>
                    </ul>
                    <p className="mt-3 text-muted-foreground text-sm">
                      Dozvoljen je pregled paketa prilikom uručenja
                    </p>
                  </div>
                ) : item.hasFunFact ? (
                  <div>
                    <p>U sistemu imamo preko 700.000 dostupnih autodijelova.</p>
                    <p className="mt-3 bg-muted/50 rounded-md p-3 text-sm">
                      <span className="font-semibold">Fun fact:</span> Na lageru imamo više od 1.000.000 dijelova koji još nisu uneseni u sistem zbog obima posla.
                    </p>
                  </div>
                ) : (
                  <p>{item.answer}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
