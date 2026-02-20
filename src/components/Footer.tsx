import { Link } from "react-router-dom";
import { Truck, CreditCard, Headphones, ShieldCheck, RotateCcw, ChevronUp, MapPin, Phone, Mail } from "lucide-react";
import ilmaLogo from "@/assets/ilma-logo.svg";
import viberIcon from "@/assets/viber-icon.svg";
import instagramIcon from "@/assets/instagram-icon.svg";
import facebookIcon from "@/assets/facebook-icon.svg";
import whatsappIcon from "@/assets/whatsapp-icon.svg";

const benefits = [
  { icon: Truck, title: "BRZA DOSTAVA", desc: "U sve regije u BiH" },
  { icon: CreditCard, title: "ONLINE PLAĆANJE", desc: "Dostupno više vrsta plaćanja" },
  { icon: Headphones, title: "24/7 PODRŠKA", desc: "Uvijek smo na raspolaganju" },
  { icon: ShieldCheck, title: "KUPOVINA BEZ RIZIKA", desc: "Garancija na proizvode" },
  { icon: RotateCcw, title: "MOGUĆNOST POVRATA", desc: "Povrat robe u roku od 7 dana" },
];

const socialLinks = [
  { icon: viberIcon, alt: "Viber", href: "#" },
  { icon: instagramIcon, alt: "Instagram", href: "#" },
  { icon: facebookIcon, alt: "Facebook", href: "#" },
  { icon: whatsappIcon, alt: "WhatsApp", href: "#" },
];

const footerLinks = [
  { label: "Politika privatnosti", href: "#" },
  { label: "Politika kolačića", href: "#" },
  { label: "Opći uslovi poslovanja", href: "#" },
  { label: "Uslovi prodaje i garancija povrata", href: "#" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {/* Main Footer */}
      <div className="bg-header text-header-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <img src={ilmaLogo} alt="ILMA AUTO" className="h-24 w-auto" />
            </div>

            {/* Info */}
            <div className="space-y-4 text-center md:text-left">
              <p className="text-sm text-header-foreground/80 leading-relaxed">
                Mi smo prodavnica originalnih auto dijelova sa dugogodišnjim iskustvom. 
                Nudimo širok asortiman dijelova za sve marke i modele vozila po najpovoljnijim cijenama.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  Ljetinić 8, 74264 Jelah-Tešanj, BiH
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  +387 32 667 700
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  +387 62 667 700
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  info@ilmaauto.com
                </p>
              </div>
            </div>

            {/* Scroll to top + Social */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 rounded-md bg-header-foreground/10 hover:bg-header-foreground/20 text-header-foreground px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Vrati se na početak
                <ChevronUp className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-header-foreground/10 hover:bg-header-foreground/20 flex items-center justify-center transition-colors"
                  >
                    <img src={s.icon} alt={s.alt} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-header text-header-foreground border-t border-header-foreground/10 py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-header-foreground/60">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-header-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="whitespace-nowrap">
            Copyright 1998-2026 ILMA AUTO d.o.o - sva prava zadržana
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
