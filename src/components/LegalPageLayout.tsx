import { ReactNode } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

const LegalPageLayout = ({ title, lastUpdated, children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <main className="flex-1 pt-[128px] lg:pt-[136px]">
        {/* Hero */}
        <div className="bg-[#1b2835] text-white">
          <div className="container mx-auto px-4 lg:px-8 py-14 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-sm text-white/60">Posljednje izmjene: {lastUpdated}</p>
          </div>
        </div>

        {/* Content */}
        <article className="container mx-auto px-4 lg:px-8 py-12 max-w-3xl">
          <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-foreground/80 prose-li:text-foreground/80 prose-a:text-primary">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;