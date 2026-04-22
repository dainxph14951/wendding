import React, { useRef, useEffect, useState } from "react";

interface MemoriesProps {
  images: { src: string; alt: string }[];
}

export const Memories: React.FC<MemoriesProps> = ({ images }) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (idx: number) => {
    setCurrentIndex(idx);
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#fbf7f1" }}
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-red-900">
              ALBUM
            </h1>
            <span className="text-xl md:text-2xl text-gray-600">of</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-red-900">
              LOVE
            </h1>
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-2xl">❤️</span>
          </div>
        </div>

        {/* Main Image Container */}
        <div className="relative w-full max-w-5xl mb-12 mx-auto px-4">
          {/* Main Image with frame */}
          <div
            className="relative bg-white border-8 border-red-800 rounded-3xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="w-full h-full object-cover"
            />

            {/* Fullscreen button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Top-left arrow */}
                <path
                  d="M3 3l6 0M3 3L3 9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Top-right arrow */}
                <path
                  d="M21 3l-6 0M21 3L21 9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Bottom-left arrow */}
                <path
                  d="M3 21l6 0M3 21L3 15"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Bottom-right arrow */}
                <path
                  d="M21 21l-6 0M21 21L21 15"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 justify-center flex-wrap max-w-5xl">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-4 transition-all ${
                currentIndex === idx
                  ? "border-red-800 scale-110"
                  : "border-gray-300 hover:border-red-600"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {currentIndex === idx && (
                <div className="absolute top-1 right-1">
                  <span className="text-red-600 text-lg">❤️</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Image counter */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-20 right-3 text-white bg-gray-800 bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition z-50"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Fullscreen Image */}
              <img
                src={images[currentIndex]?.src}
                alt={images[currentIndex]?.alt}
                className="max-w-90vw max-h-90vh object-contain"
              />

              {/* Navigation in Fullscreen */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 rounded-full p-4 hover:bg-opacity-75 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 rounded-full p-4 hover:bg-opacity-75 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Counter in Fullscreen */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
