import AnnouncementBar from "@/components/AnnouncementBar";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import SearchPanel from "@/components/SearchPanel";
import AppRatingBar from "@/components/AppRatingBar";
import BrandGrid from "@/components/BrandGrid";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import TrustBar from "@/components/TrustBar";
import HowToOrder from "@/components/HowToOrder";
import InquiryCTA from "@/components/InquiryCTA";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
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

      <HowToOrder />

      {/* Brands section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Dostupne marke vozila</h2>
          <p className="text-center text-muted-foreground mb-8">Pronađite odgovarajuće autodijelove za željenu marku i model vašeg vozila.</p>
          <BrandGrid />
        </div>
      </section>

      <TrustBar />
      <InquiryCTA />
      <FAQ />

      <Footer />
    </div>
  );
};

export default Index;
