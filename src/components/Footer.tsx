import { Link } from "react-router-dom";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import viberIcon from "@/assets/viber-icon.svg";
import instagramIcon from "@/assets/instagram-icon.svg";
import facebookIcon from "@/assets/facebook-icon.svg";
import whatsappIcon from "@/assets/whatsapp-icon.svg";

const categories = [
  "Motor",
  "Kočioni sistem",
  "Ovjes i upravljanje",
  "Elektronika",
  "Karoserija",
  "Rasvjeta",
  "Klimatizacija",
  "Ulje i hemija",
];

const support = [
  { label: "Kontakt", href: "/podrska" },
  { label: "Dostava", href: "/podrska" },
  { label: "Način plaćanja", href: "/podrska" },
  { label: "Povrat robe", href: "/podrska" },
  { label: "FAQ", href: "/podrska" },
  { label: "Pomoć pri odabiru", href: "/podrska" },
];

const socials = [
  { icon: facebookIcon, alt: "Facebook", href: "#" },
  { icon: instagramIcon, alt: "Instagram", href: "#" },
  { icon: whatsappIcon, alt: "WhatsApp", href: "#" },
  { icon: viberIcon, alt: "Viber", href: "#" },
];

const legalLinks = [
  { label: "Privatnost i zaštita podataka", href: "#" },
  { label: "Uslovi korištenja", href: "#" },
  { label: "Uslovi kupovine", href: "#" },
  { label: "Politika povrata", href: "#" },
  { label: "Kolačići", href: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-header text-header-foreground">
      <div className="container mx-auto px-4 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-bold text-2xl tracking-tight">
              <span className="text-white">ILMA</span>{" "}
              <span className="text-white">AUTO</span>
            </div>
            <p className="text-[10px] tracking-[0.25em] text-header-foreground/60 mt-1">
              ORIGINALNI AUTODIJELOVI
            </p>
            <p className="text-sm text-header-foreground/70 mt-6 leading-relaxed">
              Pouzdan izvor originalnih autodijelova za vaše vozilo. Kvalitet,
              sigurnost i brza usluga na prvom mjestu.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.alt}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <img src={s.icon} alt={s.alt} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.15em] mb-5">
              KATEGORIJE
            </h4>
            <ul className="space-y-2.5">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    to="/pretraga"
                    className="text-sm text-header-foreground/70 hover:text-white transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.15em] mb-5">PODRŠKA</h4>
            <ul className="space-y-2.5">
              {support.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className="text-sm text-header-foreground/70 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.15em] mb-5">KONTAKT</h4>
            <ul className="space-y-3.5 text-sm text-header-foreground/70">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-header-foreground/50 shrink-0" />
                <a href="tel:+38762123456" className="hover:text-white transition-colors">
                  +387 62 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-header-foreground/50 shrink-0" />
                <a href="mailto:info@ilmaauto.ba" className="hover:text-white transition-colors">
                  info@ilmaauto.ba
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-header-foreground/50 shrink-0 mt-0.5" />
                <span>
                  Ljetinić br8
                  <br />
                  74264 Jelah Tešanj, BiH
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-header-foreground/50 shrink-0 mt-0.5" />
                <span>
                  Pon - Pet: 08:00 - 16:00
                  <br />
                  Sub: 08:00 - 13:00
                  <br />
                  Nedjelja: Zatvoreno
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="rounded-[12px] bg-white/[0.04] border border-white/10 p-5">
              <h4 className="text-sm font-bold tracking-[0.15em] mb-3">
                BUDITE U TOKU
              </h4>
              <p className="text-xs text-header-foreground/70 mb-4 leading-relaxed">
                Prijavite se za novosti, akcije i korisne savjete o održavanju
                vozila.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Unesite e-mail adresu"
                  className="w-full rounded-[9px] bg-white/[0.06] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-header-foreground/40 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full rounded-[9px] bg-primary text-primary-foreground font-bold tracking-wide px-4 py-2.5 text-xs hover:bg-primary/90 transition-colors"
                >
                  PRIJAVI SE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-header-foreground/55">
          <p>© 2024 ILMA AUTO d.o.o. Sva prava zadržana.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((link, i) => (
              <span key={link.label} className="flex items-center gap-5">
                <a
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
                {i < legalLinks.length - 1 && (
                  <span className="hidden md:inline text-header-foreground/20">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
