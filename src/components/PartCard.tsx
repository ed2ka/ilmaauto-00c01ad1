import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Part } from "@/hooks/useParts";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistIds, useToggleWishlist } from "@/hooks/useWishlist";
import { getBrandLogo } from "@/lib/brandLogos";

interface PartCardProps {
  part: Part;
}

const PartCard = ({ part }: PartCardProps) => {
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
      className="bg-card rounded-lg border hover:shadow-lg transition-shadow group overflow-hidden flex flex-col relative"
    >
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
      >
        <Heart className={`w-4 h-4 ${isInWishlist ? "fill-primary text-primary" : "text-muted-foreground"}`} />
      </button>
      <div className="aspect-[4/3] bg-muted overflow-hidden relative">
        <div className="absolute top-2 left-2 z-10 bg-white/90 rounded p-1 shadow-sm backdrop-blur-sm">
          {logoUrl ? (
            <img src={logoUrl} alt={part.marka} className="w-6 h-6 object-contain" />
          ) : (
            <span className="text-[10px] font-bold px-0.5 text-foreground uppercase leading-none">{part.marka}</span>
          )}
        </div>
        {part.slika1 ? (
          <img
            src={part.slika1}
            alt={part.dio}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Nema slike
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-0.5">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2">{part.dio}</h3>
        <p className="text-xs text-muted-foreground">{part.marka} {part.tip}</p>
        {part.broj && <p className="text-xs font-mono text-muted-foreground">{part.broj}</p>}
        {part.model && <p className="text-xs text-muted-foreground">{part.model}</p>}
      </div>
    </Link>
  );
};

export default PartCard;
