import { useSearchParams } from "react-router-dom";
import { Cog, Car, Zap, ArrowUpDown, Disc3, Lightbulb, Square, Armchair } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface Category {
  name: string;
  value: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  { name: "Motor", value: "motor", icon: Cog },
  { name: "Karoserija", value: "karoserija", icon: Car },
  { name: "Elektrika", value: "elektrika", icon: Zap },
  { name: "Ovjes", value: "ovjes", icon: ArrowUpDown },
  { name: "Kočnice", value: "kocnice", icon: Disc3 },
  { name: "Svjetla", value: "svjetla", icon: Lightbulb },
  { name: "Stakla", value: "stakla", icon: Square },
  { name: "Unutrašnjost", value: "unutrasnjost", icon: Armchair },
];

const CategoryGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("kategorija") || "";
  const isMobile = useIsMobile();

  const handleClick = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (activeCategory === value) {
      next.delete("kategorija");
    } else {
      next.set("kategorija", value);
    }
    setSearchParams(next);
  };

  const items = categories.map((cat) => {
    const Icon = cat.icon;
    const isActive = activeCategory === cat.value;
    return (
      <button
        key={cat.value}
        onClick={() => handleClick(cat.value)}
        className={cn(
          "flex flex-col items-center justify-center gap-1.5 rounded-[9px] border px-4 py-3 min-w-[90px] transition-all duration-200",
          "hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm",
          isActive
            ? "border-primary bg-primary/10 text-primary shadow-sm"
            : "border-border bg-card text-muted-foreground"
        )}
      >
        <Icon className={cn("w-6 h-6", isActive && "text-primary")} strokeWidth={1.5} />
        <span className={cn("text-xs font-medium whitespace-nowrap", isActive && "text-primary")}>
          {cat.name}
        </span>
      </button>
    );
  });

  if (isMobile) {
    return (
      <div className="mb-4">
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">{items}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">{items}</div>
    </div>
  );
};

export default CategoryGrid;
