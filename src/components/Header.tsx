import { Heart, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-header">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <button className="flex items-center gap-1 text-sm font-medium text-header-foreground/90 hover:text-header-foreground transition-colors">
              PRETRAŽI
              <ChevronDown className="w-4 h-4" />
            </button>
            <a href="#" className="text-sm font-medium text-header-foreground/90 hover:text-header-foreground transition-colors">
              NOVOSTI
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-header-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:text-center">
            <h1 className="font-display text-lg lg:text-2xl font-bold tracking-wider text-header-foreground">
              ILMA AUTO DIJELOVI
            </h1>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="text-header-foreground/80 hover:text-header-foreground transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-header-foreground/90 hover:text-header-foreground transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Prijava / Registracija</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-header border-t border-header-foreground/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a href="#" className="block text-sm font-medium text-header-foreground/90 py-2">PRETRAŽI</a>
            <a href="#" className="block text-sm font-medium text-header-foreground/90 py-2">NOVOSTI</a>
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2">
              <User className="w-4 h-4" />
              Prijava / Registracija
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
