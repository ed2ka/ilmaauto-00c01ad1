import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useClaimGuestInquiry } from "@/hooks/useInquiries";
import { lovable } from "@/integrations/lovable/index";
import authBgAsset from "@/assets/hero-bg-ilma.png.asset.json";
const authBg = authBgAsset.url;
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import facebookIcon from "@/assets/facebook-icon.svg";
import instagramIcon from "@/assets/instagram-icon.svg";
import viberIcon from "@/assets/viber-icon.svg";
import whatsappIcon from "@/assets/whatsapp-icon.svg";

const Auth = () => {
  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const claimInquiry = useClaimGuestInquiry();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassConfirm, setRegPassConfirm] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptData, setAcceptData] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  // Password visibility states
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegPassConfirm, setShowRegPassConfirm] = useState(false);

  const allChecked = acceptTerms && acceptPrivacy && acceptData;

  if (loading) return null;
  if (user) return <Navigate to="/profil" replace />;

  const handleGoogleLogin = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) toast.error("Greška pri Google prijavi.");
  };

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
    const { error } = await signUp(regEmail, regPass, regName, regPhone, regAddress);
    if (error) {
      setSubmitting(false);
      toast.error(error.message);
      return;
    }
    // Auto-login after registration
    const { error: loginError, data: loginData } = await signIn(regEmail, regPass);
    setSubmitting(false);
    if (loginError) {
      toast.error("Registracija uspješna, ali automatska prijava nije uspjela. Prijavite se ručno.");
    } else {
      // Claim pending guest inquiry
      const pendingId = sessionStorage.getItem("pending_inquiry_id");
      if (pendingId && loginData?.user?.id) {
        claimInquiry.mutate({ inquiryId: Number(pendingId), userId: loginData.user.id });
        sessionStorage.removeItem("pending_inquiry_id");
      }
      toast.success("Registracija uspješna! Dobrodošli!");
      navigate("/profil");
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

  const PasswordToggle = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button
      type="button"
      tabIndex={-1}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      onClick={onToggle}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  if (showForgot) {
    return (
      <div className="min-h-screen flex flex-col bg-background pt-[128px] lg:pt-[136px]">
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
    <div className="min-h-screen flex flex-col pt-[128px] lg:pt-[136px] relative">
      <TopBar />
      <Header />
      <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover blur-md scale-110" />
      <div className="absolute inset-0 bg-header/70" />
      <main className="flex-1 relative z-10 flex flex-col items-center px-4 py-8 pt-[12vh]">
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Pristup korisničkom nalogu</h1>
          <p className="text-white/70 text-center mb-6">Upravljajte narudžbama, adresama i podacima na jednostavan način.</p>
        <Card className="w-full relative">
          <Tabs defaultValue="login">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Prijava</TabsTrigger>
                <TabsTrigger value="register">Registracija</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="login">
                <div className="space-y-4">
                  <Button type="button" variant="outline" className="w-full flex items-center gap-2" onClick={handleGoogleLogin}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Prijavi se putem Google-a
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><Separator /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">ili</span></div>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-pass">Lozinka</Label>
                      <div className="relative">
                        <Input id="login-pass" type={showLoginPass ? "text" : "password"} value={loginPass} onChange={e => setLoginPass(e.target.value)} required className="pr-10" />
                        <PasswordToggle show={showLoginPass} onToggle={() => setShowLoginPass(!showLoginPass)} />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Prijava..." : "Prijavi se"}
                    </Button>
                    <button type="button" className="text-sm text-primary hover:underline w-full text-center" onClick={() => setShowForgot(true)}>
                      Zaboravljena lozinka?
                    </button>
                  </form>
                </div>
              </TabsContent>
              <TabsContent value="register">
                <div className="space-y-4">
                  <Button type="button" variant="outline" className="w-full flex items-center gap-2" onClick={handleGoogleLogin}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Registruj se putem Google-a
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><Separator /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">ili</span></div>
                  </div>
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
                      <div className="relative">
                        <Input id="reg-pass" type={showRegPass ? "text" : "password"} value={regPass} onChange={e => setRegPass(e.target.value)} required minLength={6} className="pr-10" />
                        <PasswordToggle show={showRegPass} onToggle={() => setShowRegPass(!showRegPass)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-pass-confirm">Potvrdi lozinku</Label>
                      <div className="relative">
                        <Input id="reg-pass-confirm" type={showRegPassConfirm ? "text" : "password"} value={regPassConfirm} onChange={e => setRegPassConfirm(e.target.value)} required minLength={6} className="pr-10" />
                        <PasswordToggle show={showRegPassConfirm} onToggle={() => setShowRegPassConfirm(!showRegPassConfirm)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-address">Adresa</Label>
                      <Input id="reg-address" value={regAddress} onChange={e => setRegAddress(e.target.value)} required placeholder="Vaša adresa za dostavu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">Broj telefona</Label>
                      <Input id="reg-phone" type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} required placeholder="+387 6x xxx xxx" />
                    </div>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-2">
                        <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(v) => setAcceptTerms(v === true)} />
                        <label htmlFor="terms" className="text-xs leading-tight cursor-pointer">
                          Prihvatam <a href="#" className="text-primary hover:underline">uslove korištenja</a>
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <Checkbox id="privacy" checked={acceptPrivacy} onCheckedChange={(v) => setAcceptPrivacy(v === true)} />
                        <label htmlFor="privacy" className="text-xs leading-tight cursor-pointer">
                          Slažem se sa <a href="#" className="text-primary hover:underline">politikom privatnosti</a>
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <Checkbox id="data" checked={acceptData} onCheckedChange={(v) => setAcceptData(v === true)} />
                        <label htmlFor="data" className="text-xs leading-tight cursor-pointer">
                          Saglasan/na sam da se moji podaci koriste za registraciju na ovaj servis
                        </label>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={submitting || !allChecked}>
                      {submitting ? "Registracija..." : "Registruj se"}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        </div>
      </main>
      <footer className="relative z-10 py-4 px-4">
        <div className="container mx-auto border-t border-[#ffffff33] pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
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
              <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Viber">
              <img src={viberIcon} alt="Viber" className="w-4 h-4" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="WhatsApp">
              <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
