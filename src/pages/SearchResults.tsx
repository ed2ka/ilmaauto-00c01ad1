import { useSearchParams, Link } from "react-router-dom";
import { useSearchParts } from "@/hooks/useParts";
import { useState, useEffect, useMemo } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PartCard from "@/components/PartCard";
import CategoryGrid from "@/components/CategoryGrid";

import PartListItem from "@/components/PartListItem";
import SearchFilterSidebar from "@/components/SearchFilterSidebar";
import NoResultsInquiry from "@/components/NoResultsInquiry";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/Footer";

const PAGE_SIZE = 20;

type SortOption = "newest" | "oldest" | "az" | "za";
type ViewMode = "grid" | "list";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortOption>("oldest");
  const isMobile = useIsMobile();

  const params = {
    marka: searchParams.get("marka") || undefined,
    tip: searchParams.get("tip") || undefined,
    dio: searchParams.get("dio") || undefined,
    broj: searchParams.get("broj") || undefined,
    query: searchParams.get("q") || undefined,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  };

  const { data, isLoading } = useSearchParts(params);

  useEffect(() => { setPage(0); }, [searchParams.toString()]);

  const sortedParts = useMemo(() => {
    if (!data?.parts) return [];
    const parts = [...data.parts];
    switch (sort) {
      case "az": return parts.sort((a, b) => a.dio.localeCompare(b.dio));
      case "za": return parts.sort((a, b) => b.dio.localeCompare(a.dio));
      case "newest": return parts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case "oldest":
      default: return parts.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
  }, [data?.parts, sort]);

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background pt-[128px] lg:pt-[136px]">
      <TopBar />
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-2.5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Početna</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {params.marka ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link to="/pretraga">Pretraga</Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {params.tip ? (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to={`/pretraga?marka=${params.marka}`}>{params.marka}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem><BreadcrumbPage>{params.tip}</BreadcrumbPage></BreadcrumbItem>
                    </>
                  ) : (
                    <BreadcrumbItem><BreadcrumbPage>{params.marka}</BreadcrumbPage></BreadcrumbItem>
                  )}
                </>
              ) : (
                <BreadcrumbItem><BreadcrumbPage>Rezultati pretrage</BreadcrumbPage></BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Category grid */}
        <CategoryGrid />
        
        {isMobile ? (
          <>
            <h1 className="text-lg font-bold text-foreground mb-3">
              Rezultati pretrage
              {data && <span className="text-muted-foreground font-normal ml-2 text-sm">({data.totalCount})</span>}
            </h1>
            <div className="flex items-center justify-between mb-5">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm hover:bg-accent transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filteri
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filteri</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <SearchFilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                    title="Grid prikaz"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                    title="List prikaz"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                  <SelectTrigger className="w-[140px] bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="oldest">Najstarije</SelectItem>
                    <SelectItem value="newest">Najnovije</SelectItem>
                    <SelectItem value="az">Naziv A-Z</SelectItem>
                    <SelectItem value="za">Naziv Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-lg font-bold text-foreground">
              Rezultati pretrage
              {data && <span className="text-muted-foreground font-normal ml-2 text-sm">({data.totalCount})</span>}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                  title="Grid prikaz"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                  title="List prikaz"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="oldest">Najstarije</SelectItem>
                  <SelectItem value="newest">Najnovije</SelectItem>
                  <SelectItem value="az">Naziv A-Z</SelectItem>
                  <SelectItem value="za">Naziv Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          {!isMobile && (
            <aside className="w-60 flex-shrink-0">
              <div className="sticky top-[148px] border rounded-lg p-4 bg-card">
                <SearchFilterSidebar />
              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`bg-card rounded-lg border animate-pulse ${viewMode === "list" ? "flex h-28" : ""}`}>
                    <div className={viewMode === "grid" ? "aspect-[4/3] bg-muted" : "w-28 h-full bg-muted"} />
                    <div className="p-3 space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedParts.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedParts.map((part) => (
                      <PartCard key={part.id} part={part} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedParts.map((part) => (
                      <PartListItem key={part.id} part={part} />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="p-2 rounded-md border hover:bg-accent disabled:opacity-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {page + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={page >= totalPages - 1}
                      className="p-2 rounded-md border hover:bg-accent disabled:opacity-50 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : params.broj ? (
              <NoResultsInquiry
                searchQuery={params.query || ""}
                marka={params.marka}
                tip={params.tip}
                dio={params.dio}
                broj={params.broj}
              />
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Nema rezultata</h2>
                <p className="text-muted-foreground">
                  Pokušajte promijeniti filtere ili pretražiti po kataloškom broju.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
