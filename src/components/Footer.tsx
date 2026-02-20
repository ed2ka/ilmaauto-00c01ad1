import { Link } from "react-router-dom";
import { Truck, CreditCard, Headphones, ShieldCheck, RotateCcw } from "lucide-react";

const benefits = [
  { icon: Truck, title: "BRZA DOSTAVA", desc: "U sve regije u BiH" },
  { icon: CreditCard, title: "ONLINE PLAĆANJE", desc: "Dostupno više vrsta plaćanja" },
  { icon: Headphones, title: "24/7 PODRŠKA", desc: "Uvijek smo na raspolaganju" },
  { icon: ShieldCheck, title: "KUPOVINA BEZ RIZIKA", desc: "Garancija na proizvode" },
  { icon: RotateCcw, title: "MOGUĆNOST POVRATA", desc: "Povrat robe u roku od 7 dana" },
];

const Footer = () => {
  return (
    <footer>
      {/* CTA Bar */}
      <div className="bg-primary py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-primary-foreground">
              Imate pitanja / nejasnoća?
            </h2>
            <p className="text-primary-foreground/80 mt-1">
              Slobodno nam se obratite. Naš tim Vam je na raspolaganju 24/7
            </p>
          </div>
          <Link
            to="/podrska"
            className="inline-flex items-center justify-center rounded-md bg-background text-foreground font-semibold px-8 py-3 text-sm hover:bg-background/90 transition-colors whitespace-nowrap"
          >
            KONTAKTIRAJTE NAS
          </Link>
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="bg-background border-t py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
