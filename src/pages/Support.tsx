import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, MessageSquare, Phone, Clock } from "lucide-react";
import Footer from "@/components/Footer";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Tu smo za vas
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Naš tim je spreman da vam pomogne sa svim pitanjima oko auto dijelova, narudžbi i dostave.
          </p>
        </div>
      </section>

      {/* Contact card */}
      <section className="container mx-auto px-4 -mt-8 pb-20">
        <Card className="max-w-lg mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Kontaktirajte nas</CardTitle>
            <CardDescription>
              Za brzu pomoć oko narudžbi, dijelova ili bilo kakvih pitanja.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <Button asChild variant="outline" className="flex-col h-auto py-4 gap-2">
                <a href="#">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium">Viber</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-col h-auto py-4 gap-2">
                <a href="#">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium">WhatsApp</span>
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-col h-auto py-4 gap-2">
                <a href="#">
                  <Phone className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium">Poziv</span>
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
              <Clock className="w-4 h-4" />
              <span>Pon – Pet: 08:00 – 17:00 | Sub: 08:00 – 13:00</span>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default Support;
