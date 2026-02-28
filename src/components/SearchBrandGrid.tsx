import { useSearchParams } from "react-router-dom";
import { allBrands } from "@/lib/brandLogos";
import { useBrandsByCategory } from "@/hooks/useParts";
import { cn } from "@/lib/utils";

interface Props {
  activeCategory: string | null;
}

const SearchBrandGrid = ({ activeCategory }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeMarka = searchParams.get("marka") || "";
  const { data: availableBrands } = useBrandsByCategory(activeCategory);

  const handleClick = (brandName: string) => {
    const next = new URLSearchParams(searchParams);
    if (activeMarka === brandName) {
      next.delete("marka");
    } else {
      next.set("marka", brandName);
    }
    next.delete("tip"); // reset model when brand changes
    setSearchParams(next);
  };

  return (
    <div className="mb-5">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {allBrands.map((brand) => {
          const isActive = activeMarka === brand.name;
          const isDisabled =
            activeCategory && availableBrands
              ? !availableBrands.includes(brand.name)
              : false;

          return (
            <button
              key={brand.name}
              onClick={() => !isDisabled && handleClick(brand.name)}
              disabled={isDisabled}
              className={cn(
                "group flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200",
                isActive
                  ? "border-primary bg-primary/10 shadow-md scale-105"
                  : "bg-card hover:shadow-md hover:scale-105",
                isDisabled && "opacity-30 grayscale pointer-events-none"
              )}
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
              <span
                className={cn(
                  "text-xs font-medium text-center leading-tight transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {brand.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBrandGrid;
