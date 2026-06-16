import olxIcon from "@/assets/olx-icon.svg";
import facebookIcon from "@/assets/facebook-icon.svg";
import instagramIcon from "@/assets/instagram-icon.svg";
import viberIcon from "@/assets/viber-icon.svg";
import whatsappIcon from "@/assets/whatsapp-icon.svg";
import LanguageSwitcher from "./LanguageSwitcher";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-brand-light text-brand-noir/70 text-xs">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-12">
        {/* Left text */}
        <p className="hidden md:block text-[11px] tracking-wide">
          ILMA AUTODIJELOVI - prodaja i dostava autodijelova na cijelom Balkanu i EU
        </p>
        <p className="md:hidden text-[10px]">ILMA AUTODIJELOVI</p>

        {/* Right: social icons + language switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
          <a href="#" className="p-1.5 opacity-90 hover:opacity-100 transition-opacity" aria-label="OLX">
            <img src={olxIcon} alt="OLX" className="w-4 h-4" />
          </a>
          <div className="w-px h-3 bg-brand-noir/15" />
          <a href="#" className="p-1.5 opacity-90 hover:opacity-100 transition-opacity" aria-label="Facebook">
            <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
          </a>
          <div className="w-px h-3 bg-brand-noir/15" />
          <a href="#" className="p-1.5 opacity-90 hover:opacity-100 transition-opacity" aria-label="Instagram">
            <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
          </a>
          <div className="w-px h-3 bg-brand-noir/15" />
          <a href="#" className="p-1.5 opacity-90 hover:opacity-100 transition-opacity" aria-label="Viber">
            <img src={viberIcon} alt="Viber" className="w-4 h-4" />
          </a>
          <div className="w-px h-3 bg-brand-noir/15" />
          <a href="#" className="p-1.5 opacity-90 hover:opacity-100 transition-opacity" aria-label="WhatsApp">
            <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" />
          </a>
          </div>
          <div className="w-px h-3 bg-brand-noir/15" />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
