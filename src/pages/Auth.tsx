import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import authBg from "@/assets/auth-bg.jpg";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Facebook, Instagram } from "lucide-react";

const ViberIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M11.4 0C9.47.03 5.33.35 3.25 2.25 1.67 3.83 1.1 6.15 1.04 9.02c-.06 2.87-.13 8.26 5.06 9.79h.01l-.01 2.24s-.06.91.56 1.09c.75.23 1.19-.48 1.91-1.25.39-.42.93-1.04 1.34-1.51 3.69.31 6.53-.4 6.85-.5.75-.24 4.98-.79 5.67-6.42.71-5.8-.34-9.47-2.2-11.12C18.68.56 14.54.02 12.14 0h-.74zM12 1.67h.63c2.09.02 5.65.43 7.24 1.84 1.74 1.47 2.46 4.7 1.85 9.72-.56 4.6-3.87 5.25-4.49 5.45-.27.09-2.77.7-5.93.48 0 0-2.35 2.84-3.08 3.57-.12.12-.26.17-.35.15-.13-.04-.17-.19-.16-.42l.02-3.87C2.8 16.97 2.67 12.36 2.72 9.1c.05-2.49.52-4.42 1.75-5.64C6.23 1.73 9.89 1.69 12 1.67zm-.37 3.6a.47.47 0 00-.47.48c0 .27.21.48.47.48 1.2 0 2.3.45 3.14 1.27a4.24 4.24 0 011.3 3.12.47.47 0 00.95 0c0-1.4-.54-2.72-1.54-3.71a5.34 5.34 0 00-3.74-1.5l-.11-.14zm.05 1.85a.47.47 0 00-.07.94c1.56.13 2.76 1.28 2.89 2.87a.47.47 0 00.94-.08c-.16-2.02-1.71-3.5-3.69-3.66a.47.47 0 00-.07-.07zm.02 1.87a.47.47 0 00-.14.92c.72.16 1.22.66 1.37 1.37a.47.47 0 00.92-.19c-.21-1.02-.94-1.75-1.97-1.96a.47.47 0 00-.18-.14zm-2.14.56c.16-.01.33.05.52.2l.05.04c.36.3.73.66 1.01 1.05.27.38.44.77.28 1.1l-.03.05-.47.67a.54.54 0 00-.05.54c.46.94 1.1 1.8 1.89 2.52a6.93 6.93 0 002.69 1.64c.2.07.42.01.56-.14l.55-.6.04-.04c.3-.28.64-.18.94-.03l2.13 1.2c.3.17.4.52.23.82a2.55 2.55 0 01-1.17 1.08 2.82 2.82 0 01-1.41.24c-1.17-.12-2.58-.82-4.12-2.07a12.09 12.09 0 01-2.35-2.54 9.07 9.07 0 01-1.35-2.88c-.19-.82-.03-1.47.48-1.93l.02-.02c.22-.2.4-.38.64-.45.07-.02.14-.03.21-.04h.1z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.79a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.73.98.99-3.63-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 017 2.9 9.83 9.83 0 012.9 7c0 5.46-4.44 9.9-9.9 9.9l-.02-.04zM20.52 3.48A11.78 11.78 0 0012.05 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.16 1.6 5.98L0 24l6.23-1.63a11.93 11.93 0 005.72 1.46h.01c6.59 0 11.94-5.35 11.95-11.94A11.87 11.87 0 0020.52 3.48z"/>
  </svg>
);

const Auth = () => {
  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassConfirm, setRegPassConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  if (loading) return null;
  if (user) return <Navigate to="/profil" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(loginEmail, loginPass);
    setSubmitting(false);
    if (error) {
      toast.error("Pogrešan email ili lozinka.");
    } else {
      toast.success("Uspješno ste se prijavili!");
      navigate("/");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPass !== regPassConfirm) {
      toast.error("Lozinke se ne poklapaju.");
      return;
    }
    if (regPass.length < 6) {
      toast.error("Lozinka mora imati najmanje 6 znakova.");
      return;
    }
    setSubmitting(true);
    const { error } = await signUp(regEmail, regPass, regName);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Registracija uspješna! Provjerite email za potvrdu.");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await resetPassword(forgotEmail);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Email za reset lozinke je poslan.");
      setShowForgot(false);
    }
  };

  if (showForgot) {
    return (
      <div className="min-h-screen flex flex-col bg-background pt-[100px] lg:pt-[108px]">
        <TopBar />
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Zaboravljena lozinka</CardTitle>
              <CardDescription>Unesite email adresu i poslaćemo vam link za reset.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgot} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input id="forgot-email" type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Šaljem..." : "Pošalji link"}
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgot(false)}>
                  Nazad na prijavu
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-[100px] lg:pt-[108px]">
      <TopBar />
      <Header />
      <main className="flex-1 relative flex items-center justify-center px-4 py-8">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-header/70" />
        <Card className="w-full max-w-md relative z-10">
          <Tabs defaultValue="login">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Prijava</TabsTrigger>
                <TabsTrigger value="register">Registracija</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-pass">Lozinka</Label>
                    <Input id="login-pass" type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Prijava..." : "Prijavi se"}
                  </Button>
                  <button type="button" className="text-sm text-primary hover:underline w-full text-center" onClick={() => setShowForgot(true)}>
                    Zaboravljena lozinka?
                  </button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Ime i prezime</Label>
                    <Input id="reg-name" value={regName} onChange={e => setRegName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-pass">Lozinka</Label>
                    <Input id="reg-pass" type="password" value={regPass} onChange={e => setRegPass(e.target.value)} required minLength={6} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-pass-confirm">Potvrdi lozinku</Label>
                    <Input id="reg-pass-confirm" type="password" value={regPassConfirm} onChange={e => setRegPassConfirm(e.target.value)} required minLength={6} />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Registracija..." : "Registruj se"}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
      <footer className="relative z-10 border-t border-white/20 py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-[11px] text-white/60">
            <a href="#" className="hover:text-white/90 transition-colors">Politika privatnosti</a>
            <a href="#" className="hover:text-white/90 transition-colors">Politika kolačića</a>
            <a href="#" className="hover:text-white/90 transition-colors">Opći uslovi poslovanja</a>
            <a href="#" className="hover:text-white/90 transition-colors">Uslovi prodaje i garancija povrata</a>
          </div>
          <p className="text-[11px] text-white/70 text-center whitespace-nowrap">
            Copyright &copy; 1998-2025 ILMA AUTO d.o.o – Sva prava zadržana
          </p>
          <div className="flex items-center gap-2">
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Facebook">
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Instagram">
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Viber">
              <ViberIcon />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
