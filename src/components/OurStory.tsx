import React, { useEffect, useRef, useState } from "react";

interface OurStoryProps {
  title?: string;
  story: string;
  quote?: string;
  image?: string;
}

export const OurStory: React.FC<OurStoryProps> = ({
  title = "CÂU CHUYỆN CỦA CHÚNG MÌNH",
  story,
  quote,
  image,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden "
      style={{ background: "#fbf7f1" }}
    >
      <div className="relative z-10 max-w-2xl w-full px-6 py-12 space-y-8">
        <h2
          className={`text-5xl md:text-6xl font-serif text-burgundy text-center mb-12 transition-opacity duration-700 ${
            isVisible ? "opacity-100 animate-fadeUp" : "opacity-0"
          }`}
        >
          {title}
        </h2>

        <div className="space-y-6">
          <p
            className={`text-gray-700 font-light leading-relaxed text-lg text-center md:text-left transition-opacity duration-700 ${
              isVisible ? "opacity-100 animate-fadeUp-delay-200" : "opacity-0"
            }`}
          >
            {story}
          </p>

          {quote && (
            <div
              className={`border-l-4 border-gold pl-6 py-4 transition-opacity duration-700 ${
                isVisible ? "opacity-100 animate-fadeUp-delay-400" : "opacity-0"
              }`}
            >
              <p className="text-gray-600 font-light italic text-lg">{quote}</p>
            </div>
          )}
        </div>

        {image && (
          <div
            className={`mt-12 transition-opacity duration-700 ${
              isVisible ? "opacity-100 animate-fadeUp-delay-400" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt="Our story"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-burgundy"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};
