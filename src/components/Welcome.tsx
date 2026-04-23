import React, { useEffect, useState } from "react";

interface WelcomeProps {
  groomName: string;
  brideName: string;
  groomAlias?: string;
  brideAlias?: string;
  bgImage?: string;
}

export const Welcome: React.FC<WelcomeProps> = ({
  groomName,
  brideName,
  bgImage = "https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/img-welcome_fmpcl3.webp",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Tự động mở thư sau 0.5s khi trang load
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#fbf7f1]">
      {/* 1. Background Image với hiệu ứng Zoom chậm (Ken Burns) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out scale-110"
        style={{
          backgroundImage: `url(${bgImage})`,
          transform: isOpen ? "scale(1)" : "scale(1.15)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />
      </div>

      {/* 2. Hiệu ứng hạt lấp lánh bay (Gold Dust) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-200 rounded-full animate-twinkle opacity-0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* 3. Envelope Flaps (Cánh thư chuyển động) */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {/* Cánh trái */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-[#fbf7f1] shadow-2xl transition-transform duration-[1500ms] ease-in-out z-30`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%)",
            transform: isOpen ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          {/* Dấu ấn sáp (Wax Seal) một nửa */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#800020] rounded-full flex items-center justify-end pr-1 border-2 border-[#d4af37] shadow-lg">
            <span className="text-[#d4af37] text-2xl font-serif">囍</span>
          </div>
        </div>

        {/* Cánh phải */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 bg-[#fbf7f1] shadow-2xl transition-transform duration-[1500ms] ease-in-out z-30`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 20% 50%)",
            transform: isOpen ? "translateX(100%)" : "translateX(0)",
          }}
        >
          {/* Dấu ấn sáp (Wax Seal) nửa còn lại */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#800020] rounded-full flex items-center justify-start pl-1 border-2 border-[#d4af37] shadow-lg -translate-x-1/2">
            <span className="text-[#d4af37] text-2xl font-serif">囍</span>
          </div>
        </div>
      </div>

      {/* 4. Nội dung chính */}
      <div className="relative z-20 w-full h-screen">
        <div className="container mx-auto h-full px-6 md:px-12 flex flex-col justify-between py-12 md:py-20">
          {/* PHẦN TRÊN: WELCOME TO (Góc trái trên) */}
          <div className="text-left space-y-2 pt-10 md:pt-0">
            <div className="overflow-hidden">
              <h2
                className={`text-4xl md:text-6xl font-light tracking-[0.3em] text-black transition-all duration-1000 delay-[1.5s] ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
              >
                WELCOME
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className={`text-4xl md:text-6xl font-light tracking-[0.3em] text-black transition-all duration-1000 delay-[1.7s] ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
              >
                TO
              </h2>
            </div>
            <p
              className={`mt-4 text-sm md:text-base font-light text-black/60 max-w-xs transition-all duration-1000 delay-[2s] ${isOpen ? "opacity-100" : "opacity-0"}`}
            >
              Chúng mình kết hôn rồi! Hẹn bạn đến chung vui cùng chúng mình
              trong ngày trọng đại.
            </p>
          </div>

          {/* PHẦN DƯỚI: OUR WEDDING & NAMES (Góc trái dưới) */}
          <div className="flex flex-col items-start justify-end text-left">
            <div className="mb-6 md:mb-10">
              <h1
                className={`text-6xl md:text-8xl font-serif text-[#800020] leading-none transition-all duration-1000 delay-[1.5s] ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              >
                OUR
              </h1>
              <h1
                className={`text-6xl md:text-8xl font-serif text-[#800020] leading-none transition-all duration-1000 delay-[1.8s] ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              >
                WEDDING
              </h1>
            </div>

            <div
              className={`space-y-3 transition-all duration-1000 delay-[2.2s] ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Tên Chú Rể */}
              <div className="flex items-baseline gap-4 border-b border-black/10 pb-2">
                <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-black/40 uppercase">
                  Groom
                </span>
                <p className="text-2xl md:text-4xl font-serif text-black">
                  {groomName}
                </p>
              </div>

              {/* Tên Cô Dâu */}
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-black/40 uppercase">
                  Bride
                </span>
                <p className="text-2xl md:text-4xl font-serif text-black">
                  {brideName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-20px); }
        }
      `,
        }}
      />
    </section>
  );
};
