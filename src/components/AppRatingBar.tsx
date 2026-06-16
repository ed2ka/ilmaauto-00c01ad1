import { useState } from "react";
import { Star, Download, Share, Plus, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { useToast } from "@/hooks/use-toast";

const AppRatingBar = () => {
  const { canInstall, isInstalled, isIOS, promptInstall } = usePwaInstall();
  const { toast } = useToast();
  const [iosOpen, setIosOpen] = useState(false);

  const handleClick = async () => {
    if (canInstall) {
      const outcome = await promptInstall();
      if (outcome === "accepted") {
        toast({ title: "Aplikacija instalirana", description: "ILMA AUTO je sada na vašem uređaju." });
      }
      return;
    }
    if (isIOS) {
      setIosOpen(true);
      return;
    }
    toast({
      title: "Instalacija nije dostupna",
      description: "Otvorite stranicu u Chrome, Edge ili Safari pretraživaču na svom uređaju da biste instalirali aplikaciju.",
    });
  };

  // Sakrij dugme ako je već instalirana
  const showButton = !isInstalled;

  return (
    <div className="bg-foreground/90 backdrop-blur-sm py-3 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-4 h-4 fill-rating text-rating" />
          ))}
          <Star className="w-4 h-4 text-rating fill-rating/40" />
        </div>
        <span className="font-bold text-primary-foreground text-sm">4.2</span>
        {isInstalled ? (
          <span className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Aplikacija instalirana
          </span>
        ) : (
          <button
            onClick={handleClick}
            className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Instaliraj aplikaciju
          </button>
        )}
      </div>

      <Dialog open={iosOpen} onOpenChange={setIosOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Instaliraj na iPhone / iPad</DialogTitle>
            <DialogDescription>
              Safari ne nudi automatsku instalaciju. Slijedite ova 3 koraka:
            </DialogDescription>
          </DialogHeader>
          <ol className="space-y-3 text-sm text-foreground">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
              <span className="flex items-center gap-1.5">
                Tapnite na <Share className="w-4 h-4 inline" /> <strong>Share</strong> dugme u dnu Safari-ja.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
              <span className="flex items-center gap-1.5">
                Odaberite <Plus className="w-4 h-4 inline" /> <strong>Add to Home Screen</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
              <span>Potvrdite sa <strong>Add</strong> — ikona ILMA AUTO će se pojaviti na home screen-u.</span>
            </li>
          </ol>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppRatingBar;
