import { useSearchParams, Link } from "react-router-dom";
import { useSearchParts } from "@/hooks/useParts";
import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 20;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);

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

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">
            Rezultati pretrage
            {data && <span className="text-muted-foreground font-normal ml-2">({data.totalCount})</span>}
          </h1>
        </div>

        {/* Active filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {params.marka && <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{params.marka}</span>}
          {params.tip && <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{params.tip}</span>}
          {params.dio && <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{params.dio}</span>}
          {params.broj && <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{params.broj}</span>}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : data && data.parts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.parts.map((part) => (
                <Link
                  key={part.id}
                  to={`/dio/${part.id}`}
                  className="bg-card rounded-lg border hover:shadow-lg transition-shadow group overflow-hidden"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    {part.slika1 ? (
                      <img
                        src={part.slika1}
                        alt={part.dio}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        Nema slike
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2">{part.dio}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{part.marka} {part.tip}</p>
                    {part.broj && <p className="text-xs font-mono text-muted-foreground mt-0.5">{part.broj}</p>}
                    {part.model && <p className="text-xs text-muted-foreground">{part.model}</p>}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-2 rounded-md border hover:bg-accent disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-muted-foreground">
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="p-2 rounded-md border hover:bg-accent disabled:opacity-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nema rezultata za zadane parametre.</p>
            <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block">
              Nazad na početnu
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
