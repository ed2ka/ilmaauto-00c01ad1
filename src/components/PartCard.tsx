import { Link } from "react-router-dom";
import type { Part } from "@/hooks/useParts";

interface PartCardProps {
  part: Part;
}

const PartCard = ({ part }: PartCardProps) => {
  return (
    <Link
      to={`/dio/${part.id}`}
      className="bg-card rounded-lg border hover:shadow-lg transition-shadow group overflow-hidden flex flex-col"
    >
      <div className="aspect-[4/3] bg-muted overflow-hidden">
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
