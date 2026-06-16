import { Heart, User, Menu, X, LogOut, Search, Headset, ShoppingBag, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ilmaLogo from "@/assets/ilma-auto-logo.png.asset.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  return (
    <header className="fixed top-12 left-0 right-0 z-50 bg-brand-gray">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-20 lg:h-[88px]">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/pretraga" className="relative inline-flex items-center gap-1.5 text-sm font-medium text-header-foreground/90 hover:text-header-foreground transition-colors pb-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              <Search className="w-4 h-4" />
              Pretraži
            </Link>
            <Link to="/podrska" className="relative inline-flex items-center gap-1.5 text-sm font-medium text-header-foreground/90 hover:text-header-foreground transition-colors pb-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              <Headset className="w-4 h-4" />
              Korisnička podrška
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-header-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - straddles top bar and main header */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 lg:-top-8 z-10">
            <Link to="/" aria-label="ILMA AUTO - Početna">
              <img
                src={ilmaLogo.url}
                alt="ILMA AUTO"
                className="h-20 lg:h-24 w-auto"
              />
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link to={user ? "/profil?tab=wishlist" : "/prijava"} className="text-header-foreground/80 hover:text-header-foreground transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 hover:text-header-foreground transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{profile?.full_name || "Profil"}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profil?tab=orders"><ShoppingBag className="w-4 h-4 mr-2" /> Narudžbe</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profil?tab=wishlist"><Heart className="w-4 h-4 mr-2" /> Lista želja</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profil?tab=inquiries"><MessageSquare className="w-4 h-4 mr-2" /> Zahtjevi</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profil?tab=profile"><User className="w-4 h-4 mr-2" /> Moj profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" /> Odjava
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/prijava"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-header-foreground/90 hover:text-header-foreground transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Prijava / Registracija</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-gray border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link to="/pretraga" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}><Search className="w-4 h-4" /> Pretraži</Link>
            <Link to="/podrska" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}><Headset className="w-4 h-4" /> Korisnička podrška</Link>
            {user ? (
              <>
                <Link to="/profil?tab=orders" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}><ShoppingBag className="w-4 h-4" /> Narudžbe</Link>
                <Link to="/profil?tab=wishlist" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}><Heart className="w-4 h-4" /> Lista želja</Link>
                <Link to="/profil?tab=inquiries" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}><MessageSquare className="w-4 h-4" /> Zahtjevi</Link>
                <Link to="/profil?tab=profile" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}><User className="w-4 h-4" /> Moj profil</Link>
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2"><LogOut className="w-4 h-4" /> Odjava</button>
              </>
            ) : (
              <Link to="/prijava" className="flex items-center gap-2 text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}>
                <User className="w-4 h-4" />
                Prijava / Registracija
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
