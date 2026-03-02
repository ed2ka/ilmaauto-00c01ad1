import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCreateInquiry } from "@/hooks/useInquiries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Search, Send, UserPlus } from "lucide-react";

interface NoResultsInquiryProps {
  searchQuery: string;
  marka?: string;
  tip?: string;
  dio?: string;
  broj?: string;
}

const NoResultsInquiry = ({ searchQuery, marka, tip, dio, broj }: NoResultsInquiryProps) => {
  const { user, profile } = useAuth();
  const createInquiry = useCreateInquiry();

  const buildSearchText = () => {
    const parts: string[] = [];
    if (marka) parts.push(marka);
    if (tip) parts.push(tip);
    if (dio) parts.push(dio);
    if (broj) parts.push(`Kat.br: ${broj}`);
    if (searchQuery && !dio && !broj) parts.push(searchQuery);
    return parts.join(" · ") || searchQuery || "—";
  };

  const [name, setName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      toast.error("Sva polja su obavezna.");
      return;
    }

    try {
      const result = await createInquiry.mutateAsync({
        searchQuery: buildSearchText(),
        customerName: trimmedName,
        customerPhone: trimmedPhone,
        customerEmail: trimmedEmail,
      });

      // If guest, save inquiry ID for claiming after registration
      if (!user && result?.id) {
        sessionStorage.setItem("pending_inquiry_id", String(result.id));
      }

      setSubmitted(true);
      toast.success("Zahtjev je uspješno poslan!");
    } catch {
      toast.error("Greška pri slanju zahtjeva. Pokušajte ponovo.");
    }
  };

  if (submitted) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Send className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Zahtjev je poslan!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Kontaktirati ćemo vas na dostavljene kontakt podatke u najkraće vrijeme.
        </p>
        {!user && (
          <div className="pt-4">
            <Link
              to="/prijava"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Želite otvoriti korisnički nalog?
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="mx-auto w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Search className="w-6 h-6 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Nismo pronašli traženi dio u sistemu
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Na lageru imamo preko <strong className="text-foreground">1.000.000 autodijelova</strong> koji još nisu uneseni u sistem.
          Vrlo je vjerovatno da traženi dio imamo na stanju.
        </p>
      </div>

      {/* CTA + Form */}
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6 space-y-5">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Send className="w-5 h-5" />
            Pošaljite zahtjev za dodatnu provjeru
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Search query display */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wide">Tražili ste:</Label>
              <div className="bg-muted rounded-md px-3 py-2.5 text-sm font-medium text-foreground">
                {buildSearchText()}
              </div>
            </div>

            {/* Confirmation checkbox */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="confirm-part"
                checked={confirmed}
                onCheckedChange={(v) => setConfirmed(v === true)}
              />
              <label htmlFor="confirm-part" className="text-sm cursor-pointer leading-tight">
                Potvrđujem da je ovo dio koji tražim
              </label>
            </div>

            <Separator />

            {/* Contact fields */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="inq-name">Ime i prezime</Label>
                <Input
                  id="inq-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Vaše ime i prezime"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inq-phone">Broj telefona</Label>
                <Input
                  id="inq-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+387 6x xxx xxx"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inq-email">Email</Label>
                <Input
                  id="inq-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="vas@email.com"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!confirmed || createInquiry.isPending}
            >
              {createInquiry.isPending ? "Šaljem zahtjev..." : "Pošalji zahtjev"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Kontaktirati ćemo vas na dostavljene kontakt podatke
            </p>
          </form>

          {!user && (
            <>
              <Separator />
              <div className="text-center">
                <Link
                  to="/prijava"
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  Želite otvoriti korisnički nalog?
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NoResultsInquiry;
