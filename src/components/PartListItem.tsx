import { Link } from "react-router-dom";
import type { Part } from "@/hooks/useParts";

interface PartListItemProps {
  part: Part;
}

const PartListItem = ({ part }: PartListItemProps) => {
  return (
    <Link
      to={`/dio/${part.id}`}
      className="bg-card rounded-lg border hover:shadow-md transition-shadow flex overflow-hidden"
    >
      <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 bg-muted overflow-hidden">
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
      <div className="p-3 flex flex-col justify-center gap-0.5 min-w-0">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2">{part.dio}</h3>
        <p className="text-xs text-muted-foreground">{part.marka} {part.tip}</p>
        {part.broj && <p className="text-xs font-mono text-muted-foreground">{part.broj}</p>}
        {part.model && <p className="text-xs text-muted-foreground">{part.model}</p>}
      </div>
    </Link>
  );
};

export default PartListItem;
