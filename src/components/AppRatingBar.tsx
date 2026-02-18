import { Star, Download } from "lucide-react";

const AppRatingBar = () => {
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
        <button className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
          <Download className="w-4 h-4" />
          Preuzmite mobilnu aplikaciju.
        </button>
      </div>
    </div>
  );
};

export default AppRatingBar;
