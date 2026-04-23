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
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      style={{ background: "#fbf7f1" }}
    >
      {/* Họa tiết hoa lá trang trí ở góc (Connection Decor) */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#d4af37]"
        >
          <path
            d="M150 0C150 80 80 150 0 150"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="150" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center">
        {/* Phần Tiêu đề với dải Line Vàng */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-[#d4af37] text-sm tracking-[0.4em] mb-4 uppercase">
            The Journey of Love
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#800020] relative inline-block">
            {title}
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#d4af37]" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Cột Trái: Nội dung câu chuyện */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative">
              {/* Chữ cái đầu dòng nghệ thuật */}
              <p className="text-gray-700 font-light leading-relaxed text-lg first-letter:text-5xl first-letter:font-serif first-letter:text-[#800020] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                {story}
              </p>
            </div>

            {quote && (
              <div className="relative p-6 bg-white shadow-sm border-l-2 border-[#d4af37] italic">
                <span className="absolute top-2 left-2 text-4xl text-[#d4af37]/20 font-serif">
                  “
                </span>
                <p className="text-gray-600 font-light text-lg relative z-10 leading-relaxed">
                  {quote}
                </p>
              </div>
            )}
          </div>

          {/* Cột Phải: Ảnh dạng Polaroid cao cấp */}
          {image && (
            <div
              className={`relative transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              {/* Hiệu ứng "Băng keo dán" ở góc ảnh */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-2 z-20 border border-white/20" />

              <div className="bg-white p-4 pb-12 shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500">
                <div className="overflow-hidden bg-gray-100 aspect-[4/5]">
                  <img
                    src={image}
                    alt="Our story"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-serif text-[#d4af37] text-sm">
                    Forever Together
                  </p>
                </div>
              </div>

              {/* Icon trang trí phía dưới ảnh */}
              <div className="absolute -bottom-6 -right-6 text-4xl animate-pulse opacity-50">
                ✨
              </div>
            </div>
          )}
        </div>

        {/* Nút scroll xuống tiếp theo */}
        <div
          className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase">
              Um thì...
            </p>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
          </div>
        </div>
      </div>

      {/* Background Decor chìm: Một nhành hoa mờ */}
      <div className="absolute bottom-10 left-10 w-40 h-40 opacity-5 pointer-events-none grayscale">
        <img
          src="https://res.cloudinary.com/dvglujyon/image/upload/v1776937337/pngegg_2_kre1q3.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};
