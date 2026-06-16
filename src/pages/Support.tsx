import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  MapPin,
  Mail,
  Phone,
  Zap,
  CheckCircle2,
  Users,
  ArrowRight,
} from "lucide-react";
import viberIcon from "@/assets/viber-icon.svg";
import whatsappIcon from "@/assets/whatsapp-icon.svg";
import { Link } from "react-router-dom";

const channels = [
  {
    name: "Viber",
    tag: "NAJBRŽI ODGOVOR SA SLIKOM DIJELA",
    handle: "+387 62 667 700",
    description: "Pošaljite VIN, sliku ili kataloški broj dijela.\nodgovaramo za par minuta.",
    icon: viberIcon,
    iconBg: "bg-[#7360F2]/10",
    href: "viber://chat?number=%2B38762667700",
    primary: true,
  },
  {
    name: "WhatsApp",
    tag: "NAJBRŽI ODGOVOR SA SLIKOM DIJELA",
    handle: "+387 62 667 700",
    description: "Idealno za slanje fotografija oštećenog dijela ili saobraćajne.",
    icon: whatsappIcon,
    iconBg: "bg-[#25D366]/10",
    href: "https://wa.me/38762667700",
    primary: false,
  },
  {
    name: "Direktan poziv",
    tag: "PONEJDELJAK - SUBOTA",
    handle: "+387 62 667 700",
    description: "Razgovarajte direktno sa našim timom\nbez čekanja na red.",
    icon: null,
    iconBg: "bg-brand-red/10",
    href: "tel:+38762667700",
    primary: false,
  },
];

const faqs = [
  {
    q: "Koliko brzo dobijem odgovor na upit?",
    a: "Prosječno vrijeme odgovora je ispod 5 minuta tokom radnog vremena. Van radnog vremena javljamo se prvo sljedeće jutro.",
  },
  {
    q: "Mogu li poslati sliku dijela ili kataloški broj dijela?",
    a: "Da - najlakše je preko Vibera ili WhatsApp-a. Pošaljite sliku, VIN ili broj sa dijela (kataloški broj dijela) i mi ćemo provjeriti dostupnost te vam javiti odmah.",
  },
  {
    q: "Dostavljate li u cijelu BiH i region ili zemlje EU?",
    a: "Da, dostava naručenih dijelova dostupna je za zemlje Balkana (BIH, HR, SRB, CG) kao i za sve druge zemlje regiona i Svijeta. Naplata se obračunava po važećem cjenovniku i težini paketa.\n\ndostavljamo na cijelom Balkanu i u EU. Standardna dostava unutar BiH je 10 KM.",
  },
  {
    q: "Šta ako dio nije ispravan?",
    a: "Svaki dio ima garanciju. U slučaju problema, zamjena ili povrat sredstava se rješava u najkraćem mogućem roku.",
  },
];

const Support = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />

      {/* Hero */}
      <section className="relative pt-[160px] lg:pt-[180px] pb-20 bg-[#1b2835] overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 20% 20%, hsl(var(--brand-red) / 0.25), transparent 60%), radial-gradient(500px circle at 80% 80%, hsl(var(--brand-red) / 0.15), transparent 55%)",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 text-brand-red text-xs font-semibold tracking-wider uppercase mb-5 border border-brand-red/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
              </span>
              PODRŠKA JE DOSTUPNA
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              Tu smo za vas, <span className="text-brand-red">uvijek!</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto whitespace-pre-line">
              Naš tim odgovara na pitanja o auto dijelovima, narudžbama i dostavi.
              Brzo, jasno i bez kompliciranja.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 max-w-2xl mx-auto">
              {[
                { icon: Zap, label: "< 25 min odgovor" },
                { icon: CheckCircle2, label: "5.000+ riješenih upita" },
                { icon: Users, label: "PON - SUB dostupni" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-[9px] bg-white/5 border border-white/10 text-white/80 text-sm"
                >
                  <Icon className="w-4 h-4 text-brand-red" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-5">
          {channels.map((c) => (
            <div
              key={c.name}
              className="group bg-card border border-border rounded-[9px] p-6 transition-colors hover:border-foreground/30 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-[9px] ${c.iconBg} flex items-center justify-center mb-4`}>
                {c.icon ? (
                  <img src={c.icon} alt="" className="w-6 h-6" />
                ) : (
                  <Phone className="w-6 h-6 text-brand-red" />
                )}
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-red mb-1">
                {c.tag}
              </span>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1 whitespace-pre-line">{c.description}</p>
              <div className="text-sm font-medium text-foreground mb-4">{c.handle}</div>
              <Button
                asChild
                className={`rounded-[9px] w-full ${
                  c.primary
                    ? "bg-brand-red hover:bg-brand-red/90 text-white"
                    : "bg-foreground/5 hover:bg-foreground/10 text-foreground"
                }`}
              >
                <a href={c.href}>
                  Otvori {c.name}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Hours + Location */}
      <section className="container mx-auto px-4 mt-14">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-[9px] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-[9px] bg-brand-red/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-brand-red" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">Radno vrijeme</h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Sada otvoreno
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              {[
                ["Ponedjeljak – Petak", "08:00 – 17:00"],
                ["Subota", "08:00 – 13:00"],
                ["Nedjelja", "Zatvoreno"],
              ].map(([day, hours]) => (
                <li key={day} className="flex justify-between border-b border-border last:border-0 pb-2 last:pb-0">
                  <span className="text-muted-foreground">{day}</span>
                  <span className="font-medium text-foreground">{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-[9px] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-[9px] bg-brand-red/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-red" />
              </div>
              <h3 className="font-display font-bold text-foreground">Sjedište i kontakt</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground">Ljetinić 8, 74264 Jelah – Tešanj, BiH</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <a href="mailto:info@ilmaauto.com" className="text-foreground hover:text-brand-red transition-colors">
                  info@ilmaauto.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <a href="tel:+38762667700" className="text-foreground hover:text-brand-red transition-colors">
                  +387 62 667 700
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-red">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
              Često postavljana pitanja
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-[9px] px-5 bg-card"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 my-20">
        <div className="relative overflow-hidden rounded-[9px] bg-[#e1e1e1] p-8 md:p-12 text-center">
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-3">
              Niste pronašli ono što tražite?
            </h2>
            <p className="text-black mb-6 max-w-lg mx-auto whitespace-pre-line">
              Pošaljite nam upit sa detaljima o dijelu - naš strulni tim odgovoriti
              će vam u najkraćem mogućem roku. Na stanju imamo preko 1,7mil dijelova koji nisu uneseni u sistem.
            </p>
            <Button asChild size="lg" className="rounded-[9px] bg-brand-red hover:bg-brand-red/90 text-white">
              <Link to="/pretraga">
                Pošalji upit
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
