import React, { useRef, useEffect, useState } from "react";

interface WeddingDayProps {
  image?: string;
  mainText: string;
  description: string;
  shortStories?: { title: string; content: string }[];
}

export const WeddingDay: React.FC<WeddingDayProps> = ({
  image,
  mainText,
  description,
  shortStories = [],
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const renderAnimatedLetters = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className={`letter ${i % 2 === 0 ? "" : "letter-slow"}`}
        style={{ animationDelay: `${i * 0.035}s` }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));
  const bgImage =
    image ||
    "https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/img-wedding-day_kg9eyq.jpg";

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "#fbf7f1" }}
    >
      {/* Background blurred image from public */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: "blur(6px) brightness(0.8)",
          transform: "scale(1.02)",
        }}
      />
      {/* subtle tint overlay to improve text contrast */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Gradient overlays for soft top/bottom edges */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-6 py-12">
        {image && (
          <div
            className={`mb-12 transition-opacity ${isVisible ? "opacity-100 animate-fadeUp" : "opacity-0"}`}
          >
            <img
              src={image}
              alt="Lễ Cưới"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-burgundy mb-6 leading-tight">
              {isVisible ? renderAnimatedLetters(mainText) : mainText}
            </h2>

            <p
              className={`text-gray-700 font-light text-base md:text-lg mb-8 italic transition-opacity ${
                isVisible ? "opacity-100 animate-fadeUp-delay-200" : "opacity-0"
              }`}
            >
              {description}
            </p>

            {shortStories.length > 0 && (
              <div className="space-y-6">
                {shortStories.map((story, idx) => (
                  <div
                    key={idx}
                    className={`border-l-4 border-gold pl-6 py-4 transition-opacity ${isVisible ? "opacity-100 animate-fadeUp-delay-400" : "opacity-0"}`}
                  >
                    <h3 className="text-burgundy font-serif text-xl mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed">
                      {story.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
