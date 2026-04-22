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
  const [selectedBanking, setSelectedBanking] = useState<BankingInfo | null>(
    null,
  );

  const bankingInfo: { groom: BankingInfo; bride: BankingInfo } = {
    groom: {
      name: "GROOM",
      stk: "9386300093",
      bank: "Viecombank",
      ctk: "Nguyễn Xuân Đại",
      qrCode: qrCodeGrom,
    },
    bride: {
      name: "BRIDE",
      stk: "9386300093",
      bank: "Viecombank",
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-rose"
    >
      <div className="relative z-10 text-center px-6 space-y-12">
        <h2
          className={`text-5xl md:text-7xl font-serif text-burgundy transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          THANK YOU
        </h2>

        <p
          className={`text-4xl md:text-5xl font-light text-burgundy transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {weddingDate}
        </p>

        <p
          className={`text-xl md:text-2xl text-gray-700 font-light italic transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-10"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {message}
        </p>

        <div
          className={`space-y-6 pt-8 max-w-4xl transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p className="text-lg text-gray-700 font-light leading-relaxed">
            🧧 Mọi sự chúc phúc, sự yêu thương cùng những món quà ý nghĩa từ
            phương xa xin gửi về:
          </p>

          {/* Gift Boxes */}
          <div className="flex justify-center gap-12 py-8">
            {/* Groom Gift Box */}
            <button
              onClick={() => setSelectedBanking(bankingInfo.groom)}
              className="group relative cursor-pointer transform hover:scale-110 transition-transform duration-300 animate-wiggle"
            >
              {/* Gift Box SVG */}
              <svg
                className="w-24 h-24 text-pink-200 group-hover:text-pink-300 drop-shadow-lg"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {/* Box body */}
                <rect
                  x="40"
                  y="80"
                  width="120"
                  height="90"
                  fill="none"
                  stroke="#c41e3a"
                  strokeWidth="8"
                  rx="8"
                />
                <rect
                  x="40"
                  y="80"
                  width="120"
                  height="30"
                  fill="#c41e3a"
                  rx="8"
                />
                {/* Ribbon */}
                <rect x="95" y="30" width="10" height="140" fill="#d4af37" />
                <rect x="40" y="75" width="120" height="10" fill="#d4af37" />
                {/* Bow */}
                <circle cx="70" cy="50" r="16" fill="#c41e3a" />
                <circle cx="130" cy="50" r="16" fill="#c41e3a" />
                <circle cx="100" cy="45" r="20" fill="#c41e3a" />
                {/* Heart on bow */}
                <path
                  d="M100 35 Q105 30 110 35 Q110 40 100 48 Q90 40 90 35 Q95 30 100 35"
                  fill="#d4af37"
                />
              </svg>
              <p className="mt-2 text-sm text-burgundy font-medium">
                {bankingInfo.groom.name}
              </p>
            </button>

            {/* Bride Gift Box */}
            <button
              onClick={() => setSelectedBanking(bankingInfo.bride)}
              className="group relative cursor-pointer transform hover:scale-110 transition-transform duration-300 animate-wiggle"
            >
              {/* Gift Box SVG */}
              <svg
                className="w-24 h-24 text-pink-200 group-hover:text-pink-300 drop-shadow-lg"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                {/* Box body */}
                <rect
                  x="40"
                  y="80"
                  width="120"
                  height="90"
                  fill="none"
                  stroke="#c41e3a"
                  strokeWidth="8"
                  rx="8"
                />
                <rect
                  x="40"
                  y="80"
                  width="120"
                  height="30"
                  fill="#c41e3a"
                  rx="8"
                />
                {/* Ribbon */}
                <rect x="95" y="30" width="10" height="140" fill="#d4af37" />
                <rect x="40" y="75" width="120" height="10" fill="#d4af37" />
                {/* Bow */}
                <circle cx="70" cy="50" r="16" fill="#c41e3a" />
                <circle cx="130" cy="50" r="16" fill="#c41e3a" />
                <circle cx="100" cy="45" r="20" fill="#c41e3a" />
                {/* Heart on bow */}
                <path
                  d="M100 35 Q105 30 110 35 Q110 40 100 48 Q90 40 90 35 Q95 30 100 35"
                  fill="#d4af37"
                />
              </svg>
              <p className="mt-2 text-sm text-burgundy font-medium">
                {bankingInfo.bride.name}
              </p>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Nhấp vào hộp quà để xem thông tin chuyển khoản
          </p>
        </div>

        <p
          className={`text-gray-600 font-light text-sm pt-12 border-t border-burgundy border-opacity-20 transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          © 2026 Made with Dainx
        </p>
      </div>

      {/* Banking Info Modal */}
      {selectedBanking && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBanking(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedBanking(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-3xl font-serif text-burgundy text-center mb-6">
              {selectedBanking.name}
            </h2>

            {/* Banking Info */}
            <div className="space-y-4 mb-6">
              {/* STK */}
              <div className="bg-rose/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">
                  Số tài khoản
                </p>
                <p className="text-xl font-bold text-burgundy mt-1">
                  {selectedBanking.stk}
                </p>
              </div>

              {/* Bank */}
              <div className="bg-rose/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">Ngân hàng</p>
                <p className="text-xl font-bold text-burgundy mt-1">
                  {selectedBanking.bank}
                </p>
              </div>

              {/* CTK */}
              <div className="bg-rose/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">
                  Chủ tài khoản
                </p>
                <p className="text-xl font-bold text-burgundy mt-1">
                  {selectedBanking.ctk}
                </p>
              </div>
            </div>

            {/* QR Code */}
            {selectedBanking.qrCode && (
              <div className="flex flex-col items-center mb-6">
                <p className="text-sm text-gray-600 font-medium mb-3">
                  Mã QR chuyển khoản
                </p>
                <img
                  src={selectedBanking.qrCode}
                  alt={`QR Code ${selectedBanking.name}`}
                  className="w-40 h-40 rounded-lg shadow-lg bg-white p-2 border-4 border-rose"
                />
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setSelectedBanking(null)}
              className="w-full bg-burgundy text-white py-3 rounded-lg font-medium hover:bg-burgundy/90 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
