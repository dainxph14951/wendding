import React, { useRef, useEffect, useState } from "react";

interface MemoriesProps {
  images: { src: string; alt: string }[];
}

export const Memories: React.FC<MemoriesProps> = ({ images }) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "#fbf7f1" }}
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 py-12">
        {/* Horizontal scroll container */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto snap-x snap-mandatory"
          >
            <div className="flex gap-6 pb-4" style={{ minWidth: "100%" }}>
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 snap-center transition-opacity duration-700 ${
                    isVisible ? "opacity-100 animate-fadeUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-h-[70vh] max-w-[90vw] object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Left arrow indicator */}
          {canScrollLeft && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 animate-bounce pointer-events-none">
              <svg
                className="w-8 h-8 text-burgundy opacity-70"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {/* Right arrow indicator */}
          {canScrollRight && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 animate-bounce pointer-events-none">
              <svg
                className="w-8 h-8 text-burgundy opacity-70"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex gap-2 mt-6 justify-center">
          {images.map((_, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full bg-burgundy opacity-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
