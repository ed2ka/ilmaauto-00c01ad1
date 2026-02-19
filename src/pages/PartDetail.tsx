import { useParams, useNavigate } from "react-router-dom";
import { usePartById } from "@/hooks/useParts";
import { ArrowLeft, Check, X as XIcon } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PartImageGallery from "@/components/PartImageGallery";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PartDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: part, isLoading } = usePartById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
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
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Dio nije pronađen.</p>
        </div>
      </div>
    );
  }

  const images = [part.slika1, part.slika2, part.slika3].filter(Boolean) as string[];

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
          </div>

          {/* Details card - right side */}
          <div className="w-full md:w-[45%]">
            <Card>
              <CardContent className="p-6 space-y-0">
                <h1 className="text-2xl font-bold text-foreground">{part.dio}</h1>
                <p className="text-muted-foreground mt-1">
                  {part.marka} {part.tip} {part.model ? `| ${part.model}` : ""}
                </p>

                <Separator className="my-4" />

                {part.broj && (
                  <>
                    <div>
                      <span className="text-sm text-muted-foreground">Kataloški broj</span>
                      <p className="font-mono text-foreground mt-0.5">{part.broj}</p>
                    </div>
                    <Separator className="my-4" />
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
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
                    <Separator className="my-4" />
                    <div>
                      <span className="text-sm text-muted-foreground">Generacija / Godište</span>
                      <p className="text-foreground mt-0.5">{part.model}</p>
                    </div>
                  </>
                )}

                <Separator className="my-4" />

                <div>
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

                <Separator className="my-4" />

                <p className="text-xs text-muted-foreground">ID: {part.id}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartDetail;
