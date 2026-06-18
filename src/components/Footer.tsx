import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import viberIcon from "@/assets/viber-icon.svg";
import instagramIcon from "@/assets/instagram-icon.svg";
import facebookIcon from "@/assets/facebook-icon.svg";
import whatsappIcon from "@/assets/whatsapp-icon.svg";
import olxIcon from "@/assets/olx-icon.svg";
import njuskaloIcon from "@/assets/njuskalo-icon.svg";
import ebayIcon from "@/assets/ebay-icon.svg";
import ilmaLogo from "@/assets/ilma-auto-logo-round.png.asset.json";
import { legalLinks } from "@/lib/footer-links";

const categories = [
  "Motor",
  "Elektrika",
  "Karoserija",
  "Rasvjeta",
  "Ovjes i pogon",
  "Kočnice",
  "Hlađenje i klima",
  "Upravljanje",
  "Točkovi",
  "Kabina",
  "Stakla",
  "Ispuh",
  "Ostalo",
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
  { icon: olxIcon, alt: "OLX.ba", href: "https://autootpadilma.olx.ba/" },
  { icon: njuskaloIcon, alt: "Njuškalo.hr", href: "https://www.njuskalo.hr/trgovina/ilmaauto" },
  { icon: ebayIcon, alt: "eBay", href: "https://www.ebay.com/str/ilmaautosb" },
];

const Footer = () => {
  return (
    <footer className="bg-header text-header-foreground">
      <div className="container mx-auto px-4 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={ilmaLogo.url}
              alt="ILMA AUTO"
              className="w-20 h-20 mb-4"
            />
            <p className="text-sm text-header-foreground/70 leading-relaxed">
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
              {categories.slice(0, 7).map((c) => (
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
          {/* Categories continued */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.15em] mb-5 invisible">.</h4>
            <ul className="space-y-2.5">
              {categories.slice(7).map((c) => (
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
                <div className="flex flex-col">
                  <a href={CONTACT.phoneMobileHref} className="hover:text-white transition-colors">
                    {CONTACT.phoneMobile}
                  </a>
                  <a href={CONTACT.phoneLandlineHref} className="hover:text-white transition-colors">
                    {CONTACT.phoneLandline}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-header-foreground/50 shrink-0" />
                <a href={CONTACT.emailHref} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-header-foreground/50 shrink-0 mt-0.5" />
                <span>
                  {CONTACT.company}
                  <br />
                  {CONTACT.addressLine1}
                  <br />
                  {CONTACT.addressLine2}, {CONTACT.country}
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
              <li className="pt-1">
                <p className="text-xs text-header-foreground/50 mb-2 tracking-wide">Pišite nam:</p>
                <div className="flex items-center gap-2">
                  <a
                    href="viber://chat?number=%2B38762667700"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Viber"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <img src={viberIcon} alt="Viber" className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/38762667700"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" />
                  </a>
                </div>
              </li>
            </ul>
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
                <Link
                  to={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
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
