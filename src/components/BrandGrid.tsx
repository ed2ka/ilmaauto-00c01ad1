import { Link } from "react-router-dom";
import { allBrands } from "@/lib/brandLogos";

const BrandGrid = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
      {allBrands.map((brand) => (
        <Link
          key={brand.name}
          to={`/pretraga?marka=${encodeURIComponent(brand.name)}`}
          className="group flex flex-col items-center gap-2 p-4 rounded-[9px] border bg-card hover:border-foreground hover:bg-muted transition-all duration-200"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-muted-foreground">
                {brand.name.charAt(0)}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
            {brand.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default BrandGrid;
