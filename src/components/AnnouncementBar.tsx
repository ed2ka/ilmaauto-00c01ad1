import { useState } from "react";
import { X } from "lucide-react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-[9px]">
      <div className="container mx-auto px-[30px] md:px-4 flex items-center justify-center relative">
        <p className="text-center text-sm max-w-[500px] pr-8">
          Dostava brzom poštom u cijeloj BiH, Balkanu i EU
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 md:right-4 p-0.5 hover:opacity-70 transition-opacity"
          aria-label="Zatvori"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
