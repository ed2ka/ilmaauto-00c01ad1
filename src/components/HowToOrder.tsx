import { Car, Search, ShoppingCart } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Car,
    title: "Odaberi vozilo",
    desc: "Unesite podatke o vašem vozilu u gornji filter i odaberite tačan model.",
  },
  {
    num: "02",
    icon: Search,
    title: "Pronađi dio",
    desc: "Pregledajte rezultate i pronađite odgovarajući originalni dio.",
  },
  {
    num: "03",
    icon: ShoppingCart,
    title: "Pošalji upit / naruči",
    desc: "Dodajte dio u listu upita i pošaljite nam. Javimo vam se s ponudom.",
  },
];

const HowToOrder = () => {
  return (
    <section className="bg-background py-14 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex items-center gap-5">
              {/* Number + circle icon */}
              <div className="relative flex items-center shrink-0">
                <span className="text-5xl lg:text-6xl font-bold text-muted-foreground/30 leading-none mr-3">
                  {s.num}
                </span>
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-border bg-background flex items-center justify-center">
                  <s.icon className="w-9 h-9 lg:w-10 lg:h-10 text-primary stroke-[1.5]" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>

              {/* Dashed connector */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-primary/40"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;