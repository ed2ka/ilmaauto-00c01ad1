import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize, X as XIcon } from "lucide-react";
import { createPortal } from "react-dom";

interface PartImageGalleryProps {
  images: string[];
  alt: string;
}

const PartImageGallery = ({ images, alt }: PartImageGalleryProps) => {
  const [activeImg, setActiveImg] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;

  const goNext = useCallback(() => {
    setActiveImg((prev) => (prev < total - 1 ? prev + 1 : prev));
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveImg((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isFullscreen, goNext, goPrev]);

  if (total === 0) {
    return (
      <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        Nema slike
      </div>
    );
  }

  const ArrowButton = ({
    direction,
    onClick,
    disabled,
    className = "",
  }: {
    direction: "left" | "right";
    onClick: () => void;
    disabled: boolean;
    className?: string;
  }) =>
    !disabled ? (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`absolute top-1/2 -translate-y-1/2 ${
          direction === "left" ? "left-2" : "right-2"
        } bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors z-10 ${className}`}
      >
        {direction === "left" ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>
    ) : null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden border cursor-pointer select-none"
        onClick={() => setIsFullscreen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeImg]}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Arrows */}
        <ArrowButton direction="left" onClick={goPrev} disabled={activeImg === 0} />
        <ArrowButton direction="right" onClick={goNext} disabled={activeImg === total - 1} />

        {/* Counter badge */}
        {total > 1 && (
          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
            {activeImg + 1} / {total}
          </span>
        )}

        {/* Fullscreen button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen(true);
          }}
          className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded p-1.5 transition-colors"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                i === activeImg ? "border-primary" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen overlay */}
      {isFullscreen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <XIcon className="w-7 h-7" />
            </button>

            {/* Counter */}
            {total > 1 && (
              <span className="absolute top-4 left-4 text-white/80 text-sm font-medium">
                {activeImg + 1} / {total}
              </span>
            )}

            {/* Arrows */}
            <ArrowButton direction="left" onClick={goPrev} disabled={activeImg === 0} className="!left-4" />
            <ArrowButton direction="right" onClick={goNext} disabled={activeImg === total - 1} className="!right-4" />

            {/* Image - click to close */}
            <img
              src={images[activeImg]}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] object-contain cursor-pointer"
              onClick={() => setIsFullscreen(false)}
              draggable={false}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default PartImageGallery;
