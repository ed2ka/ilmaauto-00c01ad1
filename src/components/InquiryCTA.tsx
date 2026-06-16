import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import bg from "@/assets/inquiry-cta-bg.png.asset.json";

const InquiryCTA = () => {
  return (
    <section className="bg-[#e1e1e1] pb-14 lg:pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className="relative rounded-[14px] overflow-hidden bg-[#0a0a0a] text-white"
          style={{
            backgroundImage: `url(${bg.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-6 lg:px-12 py-12 lg:py-16 min-h-[280px]">
            <div className="lg:col-span-7 text-left">
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
                Niste sigurni koji dio odgovara vašem vozilu?
              </h2>
              <p className="mt-3 text-sm lg:text-base text-white/80 leading-relaxed max-w-2xl">
                Pošaljite nam broj šasije ili podatke o vozilu, naš tim će
                provjeriti kompatibilnost i pomoći vam pri odabiru pravog
                dijela.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/podrska"
                  className="inline-flex items-center justify-center gap-2 rounded-[9px] bg-primary text-primary-foreground font-bold tracking-wide px-7 py-3.5 text-sm hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  POŠALJI UPIT
                </Link>
                <Link
                  to="/podrska"
                  className="inline-flex items-center justify-center gap-2 rounded-[9px] bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold tracking-wide px-7 py-3.5 text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  KONTAKTIRAJ NAS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryCTA;