import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePartById } from "@/hooks/useParts";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistIds, useToggleWishlist } from "@/hooks/useWishlist";
import { ArrowLeft, Check, X as XIcon, ShoppingCart, Heart } from "lucide-react";
import { getBrandLogo } from "@/lib/brandLogos";
import { formatPrice } from "@/lib/formatPrice";
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

import viberIcon from "@/assets/viber-icon.svg";
import whatsappIcon from "@/assets/whatsapp-icon.svg";

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
                      ? formatPrice(part.cijena)
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
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
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
                        <img src={viberIcon} alt="Viber" className="w-4 h-4 mr-1 [filter:brightness(0)]" />
                        Viber narudžba
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a
                        href={(() => {
                          const pageUrl = window.location.href;
                          const partTitle = `${part.dio} – ${part.marka} ${part.tip}${part.model ? ` (${part.model})` : ""}`;
                          const message = `Pozdrav, zanima me ovaj artikal sa vaše web stranice: ${partTitle} – ILMA AUTO | originalni autodijelovi za sve marke vozila - ${pageUrl}`;
                          return `https://wa.me/38761454151?text=${encodeURIComponent(message)}`;
                        })()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4 mr-1 [filter:brightness(0)]" />
                        WhatsApp narudžba
                      </a>
                    </Button>
                  </div>
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
