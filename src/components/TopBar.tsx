import LanguageSwitcher from "./LanguageSwitcher";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#464747] text-white/70 text-xs">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-12">
        {/* Left text */}
        <p className="hidden md:block text-[11px] tracking-wide">
          ILMA AUTODIJELOVI - prodaja i dostava autodijelova na cijelom Balkanu i EU
        </p>
        <p className="md:hidden text-[10px]">ILMA AUTODIJELOVI</p>

        {/* Right: language switcher */}
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-xs md:text-sm tracking-wide">izaberite jezik</span>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
