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
    </div>
  );
};

export default Auth;
