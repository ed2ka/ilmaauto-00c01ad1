import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Part } from "@/hooks/useParts";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistIds, useToggleWishlist } from "@/hooks/useWishlist";
import { getBrandLogo } from "@/lib/brandLogos";

interface PartListItemProps {
  part: Part;
}

const PartListItem = ({ part }: PartListItemProps) => {
  const { user } = useAuth();
  const { data: wishlistIds } = useWishlistIds();
  const toggleWishlist = useToggleWishlist();
  const navigate = useNavigate();
  const isInWishlist = wishlistIds?.has(part.id) ?? false;
  const logoUrl = getBrandLogo(part.marka);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/prijava");
      return;
    }
    toggleWishlist.mutate({ partId: part.id, isInWishlist });
  };

  return (
    <Link
      to={`/dio/${part.id}`}
      className="bg-card rounded-lg border hover:border-foreground/30 transition-colors flex overflow-hidden relative"
    >
      <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 bg-muted overflow-hidden relative">
        <div className="absolute top-1.5 left-1.5 z-10 bg-white/90 rounded p-1 shadow-sm backdrop-blur-sm">
          {logoUrl ? (
            <img src={logoUrl} alt={part.marka} className="w-5 h-5 object-contain" />
          ) : (
            <span className="text-[9px] font-bold px-0.5 text-foreground uppercase leading-none">{part.marka}</span>
          )}
        </div>
        {part.slika1 ? (
          <img
            src={part.slika1}
            alt={part.dio}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            Nema slike
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col justify-center gap-0.5 min-w-0 flex-1">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2">{part.dio}</h3>
        <p className="text-xs text-muted-foreground">{part.marka} {part.tip}</p>
        {part.broj && <p className="text-xs font-mono text-muted-foreground">{part.broj}</p>}
        {part.model && <p className="text-xs text-muted-foreground">{part.model}</p>}
      </div>
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
      >
        <Heart className={`w-4 h-4 ${isInWishlist ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      </button>
    </Link>
  );
};

export default PartListItem;
