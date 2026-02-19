import { useParams, useNavigate } from "react-router-dom";
import { usePartById } from "@/hooks/useParts";
import { ArrowLeft, Check, X as XIcon } from "lucide-react";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";

const PartDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: part, isLoading } = usePartById(id);
  const [activeImg, setActiveImg] = useState(0);

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
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Nazad
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-3">
            {images.length > 0 ? (
              <>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden border">
                  <img
                    src={images[activeImg]}
                    alt={part.dio}
                    className="w-full h-full object-contain"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                          i === activeImg ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                Nema slike
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">{part.dio}</h1>

            {part.broj && (
              <div>
                <span className="text-sm text-muted-foreground">Kataloški broj</span>
                <p className="font-mono text-foreground">{part.broj}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Marka</span>
                <p className="font-semibold text-foreground">{part.marka}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Model</span>
                <p className="font-semibold text-foreground">{part.tip}</p>
              </div>
            </div>

            {part.model && (
              <div>
                <span className="text-sm text-muted-foreground">Generacija / Godište</span>
                <p className="text-foreground">{part.model}</p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
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

            <p className="text-xs text-muted-foreground pt-4">ID: {part.id}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartDetail;
