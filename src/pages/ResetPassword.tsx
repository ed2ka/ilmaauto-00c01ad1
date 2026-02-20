import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check for recovery event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    // Also check hash for type=recovery
    if (window.location.hash.includes("type=recovery")) {
      setReady(true);
    }
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Lozinke se ne poklapaju.");
      return;
    }
    if (password.length < 6) {
      toast.error("Lozinka mora imati najmanje 6 znakova.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Lozinka uspješno promijenjena!");
      navigate("/");
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col bg-background pt-[100px] lg:pt-[108px]">
        <TopBar />
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <p className="text-muted-foreground">Učitavanje...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background pt-[100px] lg:pt-[108px]">
      <TopBar />
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Nova lozinka</CardTitle>
            <CardDescription>Unesite novu lozinku za vaš račun.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-pass">Nova lozinka</Label>
                <Input id="new-pass" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-pass">Potvrdi lozinku</Label>
                <Input id="confirm-pass" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6} />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Spremam..." : "Postavi novu lozinku"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ResetPassword;
