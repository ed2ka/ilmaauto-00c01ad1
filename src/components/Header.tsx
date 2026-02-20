import { Heart, User, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  return (
    <header className="fixed top-9 left-0 right-0 z-50 bg-header">
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
            <Link to="/">
              <h1 className="font-display text-lg lg:text-2xl font-bold tracking-wider text-header-foreground">
                ILMA AUTO DIJELOVI
              </h1>
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
                    <Link to="/profil">Moj profil</Link>
                  </DropdownMenuItem>
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
        <div className="lg:hidden bg-header border-t border-header-foreground/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a href="#" className="block text-sm font-medium text-header-foreground/90 py-2">PRETRAŽI</a>
            <a href="#" className="block text-sm font-medium text-header-foreground/90 py-2">NOVOSTI</a>
            {user ? (
              <>
                <Link to="/profil" className="block text-sm font-medium text-header-foreground/90 py-2" onClick={() => setMobileMenuOpen(false)}>Moj profil</Link>
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="block text-sm font-medium text-header-foreground/90 py-2">Odjava</button>
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
