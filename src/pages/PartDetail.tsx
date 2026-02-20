import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePartById } from "@/hooks/useParts";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistIds, useToggleWishlist } from "@/hooks/useWishlist";
import { ArrowLeft, Check, X as XIcon, ShoppingCart, Heart } from "lucide-react";
import { getBrandLogo } from "@/lib/brandLogos";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PartImageGallery from "@/components/PartImageGallery";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import OrderSheet from "@/components/OrderSheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/Footer";

const ViberIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.4 0C9.47.03 5.33.35 3.25 2.25 1.67 3.83 1.1 6.15 1.04 9.02c-.06 2.87-.13 8.26 5.06 9.79h.01l-.01 2.24s-.06.91.56 1.09c.75.23 1.19-.48 1.91-1.25.39-.42.93-1.04 1.34-1.51 3.69.31 6.53-.4 6.85-.5.75-.24 4.98-.79 5.67-6.42.71-5.8-.34-9.47-2.2-11.12C18.68.56 14.54.02 12.14 0h-.74zM12 1.67h.63c2.09.02 5.65.43 7.24 1.84 1.74 1.47 2.46 4.7 1.85 9.72-.56 4.6-3.87 5.25-4.49 5.45-.27.09-2.77.7-5.93.48 0 0-2.35 2.84-3.08 3.57-.12.12-.26.17-.35.15-.13-.04-.17-.19-.16-.42l.02-3.87C2.8 16.97 2.67 12.36 2.72 9.1c.05-2.49.52-4.42 1.75-5.64C6.23 1.73 9.89 1.69 12 1.67zm-.37 3.6a.47.47 0 00-.47.48c0 .27.21.48.47.48 1.2 0 2.3.45 3.14 1.27a4.24 4.24 0 011.3 3.12.47.47 0 00.95 0c0-1.4-.54-2.72-1.54-3.71a5.34 5.34 0 00-3.74-1.5l-.11-.14zm.05 1.85a.47.47 0 00-.07.94c1.56.13 2.76 1.28 2.89 2.87a.47.47 0 00.94-.08c-.16-2.02-1.71-3.5-3.69-3.66a.47.47 0 00-.07-.07zm.02 1.87a.47.47 0 00-.14.92c.72.16 1.22.66 1.37 1.37a.47.47 0 00.92-.19c-.21-1.02-.94-1.75-1.97-1.96a.47.47 0 00-.18-.14zm-2.14.56c.16-.01.33.05.52.2l.05.04c.36.3.73.66 1.01 1.05.27.38.44.77.28 1.1l-.03.05-.47.67a.54.54 0 00-.05.54c.46.94 1.1 1.8 1.89 2.52a6.93 6.93 0 002.69 1.64c.2.07.42.01.56-.14l.55-.6.04-.04c.3-.28.64-.18.94-.03l2.13 1.2c.3.17.4.52.23.82a2.55 2.55 0 01-1.17 1.08 2.82 2.82 0 01-1.41.24c-1.17-.12-2.58-.82-4.12-2.07a12.09 12.09 0 01-2.35-2.54 9.07 9.07 0 01-1.35-2.88c-.19-.82-.03-1.47.48-1.93l.02-.02c.22-.2.4-.38.64-.45.07-.02.14-.03.21-.04h.1z"/>
  </svg>
);

const PartDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: part, isLoading } = usePartById(id);
  const [orderOpen, setOrderOpen] = useState(false);
  const { user } = useAuth();
  const { data: wishlistIds } = useWishlistIds();
  const toggleWishlist = useToggleWishlist();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-[100px] lg:pt-[108px]">
        <TopBar />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Učitavanje...</div>
        </div>
      </div>
    );
  }

  if (!part) {
    return (
      <div className="min-h-screen flex flex-col pt-[100px] lg:pt-[108px]">
        <TopBar />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Dio nije pronađen.</p>
        </div>
      </div>
    );
  }

  const images = [part.slika1, part.slika2, part.slika3].filter(Boolean) as string[];
  const isInWishlist = wishlistIds?.has(part.id) ?? false;
  const brandLogo = getBrandLogo(part.marka);

  const handleWishlist = () => {
    if (!user) {
      navigate("/prijava");
      return;
    }
    toggleWishlist.mutate({ partId: part.id, isInWishlist });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-[100px] lg:pt-[108px]">
      <TopBar />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="cursor-pointer">Početna</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/pretraga?marka=${encodeURIComponent(part.marka)}`}
                className="cursor-pointer"
              >
                {part.marka}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/pretraga?marka=${encodeURIComponent(part.marka)}&tip=${encodeURIComponent(part.tip)}`}
                className="cursor-pointer"
              >
                {part.tip}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{part.dio}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Nazad
        </button>

        {/* Side-by-side on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Images - left side */}
          <div className="w-full md:w-[55%] md:sticky md:top-6 self-start mb-6 md:mb-0">
            <PartImageGallery images={images} alt={part.dio} />

            <Tabs defaultValue="photos" className="mt-4">
              <TabsList className="w-full">
                <TabsTrigger value="photos" className="flex-1 text-xs">
                  Napomena o fotografijama
                </TabsTrigger>
                <TabsTrigger value="purchase" className="flex-1 text-xs">
                  Kupovina dijelova
                </TabsTrigger>
              </TabsList>
              <TabsContent value="photos">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prikazane fotografije proizvoda su informativnog karaktera i mogu se razlikovati od stvarnog izgleda dijela. Preporučujemo da prije kupovine provjerite tačne specifikacije i kompatibilnost proizvoda. Ako imate pitanja, kontaktirajte nas za dodatne informacije ili dodatne slike.
                </p>
              </TabsContent>
              <TabsContent value="purchase">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prije naručivanja savjetujemo da provjerite da li dio odgovara modelu i godini proizvodnje vašeg vozila. U slučaju nejasnoća ili potrebe za stručnim savjetom, naš tim stoji na raspolaganju. Svi dijelovi se isporučuju uz prethodnu provjeru ispravnosti. Kupovinom potvrđujete da ste upoznati sa{" "}
                  <a href="#" className="text-primary underline">uslovima prodaje</a> i{" "}
                  <a href="#" className="text-primary underline">politikom povrata i garancije</a>.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Details card - right side */}
          <div className="w-full md:w-[45%]">
            <Card>
              <CardContent className="p-6">
                <div className="py-2 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    {brandLogo && (
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
                        <img src={brandLogo} alt={part.marka} className="w-8 h-8 object-contain" />
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">{part.dio}</h1>
                      <p className="text-muted-foreground mt-1">
                        {part.marka} {part.tip} {part.model ? `| ${part.model}` : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleWishlist}
                    className="p-2 rounded-full hover:bg-muted transition-colors flex-shrink-0"
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>

                <Separator />

                {part.broj && (
                  <>
                    <div className="py-4">
                      <span className="text-sm text-muted-foreground">Kataloški broj</span>
                      <p className="font-mono text-foreground mt-0.5">{part.broj}</p>
                    </div>
                    <Separator />
                  </>
                )}

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Marka</span>
                    <p className="font-semibold text-foreground mt-0.5">{part.marka}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Model</span>
                    <p className="font-semibold text-foreground mt-0.5">{part.tip}</p>
                  </div>
                </div>

                {part.model && (
                  <>
                    <Separator />
                    <div className="py-4">
                      <span className="text-sm text-muted-foreground">Generacija / Godište</span>
                      <p className="text-foreground mt-0.5">{part.model}</p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Cijena */}
                <div className="py-4">
                  <span className="text-sm text-muted-foreground">Cijena</span>
                  <p className="text-xl font-bold text-foreground mt-0.5">
                    {part.cijena != null && part.cijena > 0
                      ? `${Number(part.cijena).toFixed(2)} KM`
                      : "Cijena po dogovoru"}
                  </p>
                </div>

                <Separator />

                <div className="py-4">
                  {part.is_available ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      <Check className="w-4 h-4" /> Dostupan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                      <XIcon className="w-4 h-4" /> Nije dostupan
                    </span>
                  )}
                </div>

                {/* Order buttons */}
                <div className="flex flex-col gap-2 pb-4">
                  <Button className="w-full" onClick={() => setOrderOpen(true)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Naruči
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={(() => {
                        const pageUrl = window.location.href;
                        const partTitle = `${part.dio} – ${part.marka} ${part.tip}${part.model ? ` (${part.model})` : ""}`;
                        const message = `Pozdrav, zanima me ovaj artikal sa vaše web stranice: ${partTitle} – ILMA AUTO | originalni autodijelovi za sve marke vozila - ${pageUrl}`;
                        return `viber://chat?number=%2B38761454151&draft=${encodeURIComponent(message)}`;
                      })()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ViberIcon className="w-4 h-4 mr-2" />
                      Naruči preko Vibera
                    </a>
                  </Button>
                </div>

                <Separator />

                <p className="text-xs text-muted-foreground pt-4">ID: {part.id}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Sheet */}
        <OrderSheet
          open={orderOpen}
          onOpenChange={setOrderOpen}
          part={{
            id: part.id,
            dio: part.dio,
            marka: part.marka,
            tip: part.tip,
            model: part.model,
            cijena: part.cijena,
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PartDetail;
