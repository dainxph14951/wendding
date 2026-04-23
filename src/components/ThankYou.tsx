import React, { useRef, useEffect, useState } from "react";

interface ThankYouProps {
  weddingDate: string;
  message?: string;
  qrCodeGrom?: string;
  qrCodeBride?: string;
}

interface BankingInfo {
  name: string;
  stk: string;
  bank: string;
  ctk: string;
  qrCode?: string;
}

export const ThankYou: React.FC<ThankYouProps> = ({
  weddingDate,
  message = "Hạnh phúc được bạn ở bên chúng mình",
  qrCodeGrom,
  qrCodeBride,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);

  const bankingInfo: { groom: BankingInfo; bride: BankingInfo } = {
    groom: {
      name: "CHÚ RỂ",
      stk: "9386300093",
      bank: "Vietcombank",
      ctk: "Nguyễn Xuân Đại",
      qrCode: qrCodeGrom,
    },
    bride: {
      name: "CÔ DÂU",
      stk: "9386300093",
      bank: "Vietcombank",
      ctk: "Nguyễn Hồng Nhung",
      qrCode: qrCodeBride,
    },
  };

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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#fffafb]"
    >
      {/* CSS Animations: Petals, Wiggle, and Glow */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes petal-float {
              0% { transform: translateY(-10%) rotate(0deg); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
            @keyframes wiggle {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes gold-glow {
              0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.4); }
              50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.7); }
            }
            .petal { position: absolute; background: #ffb7c5; border-radius: 150% 0 150% 0; animation: petal-float 10s infinite linear; pointer-events: none; z-index: 1; }
            .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
            .animate-gold-glow { animation: gold-glow 2s infinite; }
          `,
        }}
      />

      {/* Falling Petals */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 15 + 10}px`,
            height: `${Math.random() * 15 + 10}px`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: Math.random() * 0.6,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <h2
            className={`text-5xl md:text-8xl font-serif text-[#800020] tracking-widest transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            THANK YOU
          </h2>
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-xl md:text-2xl font-light text-[#800020]/80 tracking-[0.2em] mb-2 uppercase">
              {weddingDate}
            </p>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-[#d4af37]/40" />
              <span className="text-[#d4af37]">✨</span>
              <div className="h-[1px] w-8 bg-[#d4af37]/40" />
            </div>
            <p className="text-lg md:text-xl text-gray-500 font-serif italic max-w-lg mx-auto leading-relaxed">
              "{message}"
            </p>
          </div>
        </div>

        {/* Lucky Envelope Section */}
        <div
          className={`pt-6 transition-all duration-1000 delay-500 flex flex-col items-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm md:text-base text-gray-600 font-light mb-8 italic">
            🧧 Mọi sự chúc phúc và quà tặng xin gửi về:
          </p>

          <div
            className="relative inline-block group cursor-pointer"
            onClick={() => setIsGiftModalOpen(true)}
          >
            {/* Floating Gold Coins */}
            <div className="absolute -top-6 -left-8 animate-bounce text-2xl z-10">
              🟡
            </div>
            <div className="absolute top-1/2 -right-10 animate-bounce delay-700 text-xl z-10">
              🟡
            </div>

            {/* The Envelope */}
            <button className="relative w-44 h-60 md:w-48 md:h-64 bg-[#c41e3a] rounded-2xl border-[3px] border-[#d4af37] shadow-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 animate-wiggle animate-gold-glow">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#d4af37] border-4 border-[#f3cf7a] flex items-center justify-center shadow-inner">
                <span className="text-[#c41e3a] text-5xl md:text-6xl font-serif font-bold">
                  囍
                </span>
              </div>
              <div className="mt-6 text-center px-4">
                <p className="text-[#f3cf7a] font-serif text-base font-bold tracking-[0.2em]">
                  HỘP MỪNG CƯỚI
                </p>
                <p className="text-white/60 text-[9px] mt-2 uppercase tracking-widest animate-pulse">
                  Nhấn để mở
                </p>
              </div>
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/fish-scales.png')]" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={`pt-16 transition-opacity duration-1000 delay-700 ${isVisible ? "opacity-40" : "opacity-0"}`}
        >
          <div className="h-[1px] w-12 bg-[#800020] mx-auto mb-4" />
          <p className="text-[10px] tracking-[0.4em] text-[#800020] uppercase font-bold">
            © 2026 MADE WITH LOVE
          </p>
        </footer>
      </div>

      {/* Dual Column Modal */}
      {isGiftModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 backdrop-blur-md bg-black/60"
          onClick={() => setIsGiftModalOpen(false)}
        >
          <div
            className="relative bg-[#800020] text-white rounded-[2rem] shadow-2xl max-w-xl w-full border border-[#d4af37]/40 p-6 md:p-10 transform transition-all animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsGiftModalOpen(false)}
              className="absolute top-4 right-5 text-[#d4af37]/60 hover:text-[#d4af37] text-3xl transition-transform hover:rotate-90"
            >
              ×
            </button>

            <h3 className="text-xl md:text-2xl font-serif text-[#d4af37] text-center mb-8 uppercase tracking-widest">
              Hộp Mừng Cưới
            </h3>

            <div className="flex flex-row gap-4 md:gap-8 justify-center items-stretch">
              {/* Groom Column */}
              <div className="flex-1 flex flex-col items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-center mb-4">
                  <p className="text-[9px] uppercase tracking-widest text-[#d4af37]/70">
                    Gửi đến
                  </p>
                  <h4 className="text-sm md:text-base font-serif font-bold text-white uppercase tracking-wide">
                    {bankingInfo.groom.name}
                  </h4>
                </div>
                <div className="w-full space-y-2 mb-4 text-[10px] md:text-xs border-y border-white/10 py-3">
                  <div className="flex flex-col">
                    <span className="text-[#d4af37]/50 text-[8px] uppercase tracking-tighter">
                      Số tài khoản
                    </span>
                    <span className="font-mono font-bold text-white tracking-widest mt-0.5 select-all">
                      {bankingInfo.groom.stk}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#d4af37]/50 text-[8px] uppercase tracking-tighter">
                      Ngân hàng
                    </span>
                    <span className="truncate text-white/90">
                      {bankingInfo.groom.bank}
                    </span>
                  </div>
                </div>
                <div className="mt-auto bg-white p-1.5 rounded-xl shadow-lg shadow-black/40">
                  <img
                    src={bankingInfo.groom.qrCode}
                    alt="QR Groom"
                    className="w-20 h-20 md:w-32 md:h-32 object-contain"
                  />
                </div>
              </div>

              {/* Bride Column */}
              <div className="flex-1 flex flex-col items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-center mb-4">
                  <p className="text-[9px] uppercase tracking-widest text-[#d4af37]/70">
                    Gửi đến
                  </p>
                  <h4 className="text-sm md:text-base font-serif font-bold text-white uppercase tracking-wide">
                    {bankingInfo.bride.name}
                  </h4>
                </div>
                <div className="w-full space-y-2 mb-4 text-[10px] md:text-xs border-y border-white/10 py-3">
                  <div className="flex flex-col">
                    <span className="text-[#d4af37]/50 text-[8px] uppercase tracking-tighter">
                      Số tài khoản
                    </span>
                    <span className="font-mono font-bold text-white tracking-widest mt-0.5 select-all">
                      {bankingInfo.bride.stk}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#d4af37]/50 text-[8px] uppercase tracking-tighter">
                      Ngân hàng
                    </span>
                    <span className="truncate text-white/90">
                      {bankingInfo.bride.bank}
                    </span>
                  </div>
                </div>
                <div className="mt-auto bg-white p-1.5 rounded-xl shadow-lg shadow-black/40">
                  <img
                    src={bankingInfo.bride.qrCode}
                    alt="QR Bride"
                    className="w-20 h-20 md:w-32 md:h-32 object-contain"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsGiftModalOpen(false)}
              className="mt-10 w-full py-2.5 rounded-full border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#800020] transition-all font-bold uppercase text-[10px] tracking-widest shadow-xl"
            >
              Đóng cửa sổ
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
