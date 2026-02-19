import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import SearchPanel from "@/components/SearchPanel";
import AppRatingBar from "@/components/AppRatingBar";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <main className="relative flex-1 flex flex-col">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Muškarac u automobilu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex items-center pt-[120px] lg:pt-[140px] pb-8">
          <div className="container mx-auto px-4 lg:px-8">
            <SearchPanel />
          </div>
        </div>

        {/* Rating bar */}
        <div className="relative">
          <AppRatingBar />
        </div>
      </main>
    </div>
  );
};

export default Index;
