import { ShieldCheck, Truck, BadgeCheck, Headphones } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "ORIGINALNI AUTODIJELOVI",
    desc: "Svi dijelovi su originalni i garantuju kvalitet i dug vijek trajanja.",
  },
  {
    icon: Truck,
    title: "BRZA I SIGURNA DOSTAVA",
    desc: "Brza dostava dijelova u BiH, zemlje Balkana i EU.",
  },
  {
    icon: BadgeCheck,
    title: "PROVJERENO I TESTIRANO",
    desc: "Dijelovi su provjereni prema podacima proizvođača vašeg vozila.",
  },
  {
    icon: Headphones,
    title: "PODRŠKA PRI ODABIRU",
    desc: "Naš stručni tim vam stoji na raspolaganju za sva pitanja i pomoć.",
  },
];

const TrustBar = () => {
  return (
    <section className="bg-[#ececec] py-10 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-border">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-4 px-4 lg:px-6">
              <it.icon className="w-10 h-10 shrink-0 text-primary stroke-[1.5]" />
              <div>
                <h3 className="text-sm font-bold tracking-wide text-foreground leading-tight">
                  {it.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;