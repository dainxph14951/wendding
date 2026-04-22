import React, { useRef, useEffect, useState } from "react";

interface ThankYouProps {
  weddingDate: string;
  message?: string;
  qrCodeGrom?: string;
  qrCodeBride?: string;
}

export const ThankYou: React.FC<ThankYouProps> = ({
  weddingDate,
  message = "Hạnh phúc được bạn ở bên chúng mình",
  qrCodeGrom,
  qrCodeBride,
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
          className={`text-xl md:text-2xl text-gray-700 font-light italic max-w-md transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
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
          <div className="grid grid-cols-2 gap-2">
            {/* Groom Section */}
            <div className="bg-rose rounded-lg p-2 space-y-3 text-left">
              <h3
                className={`text-lg font-serif text-burgundy mb-4 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: "0.5s" }}
              >
                GROOM
              </h3>
              <p
                className={`text-gray-700 font-light transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <span className="font-medium text-burgundy">STK:</span>{" "}
                9386300093
              </p>
              <p
                className={`text-gray-700 font-light transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: "0.7s" }}
              >
                <span className="font-medium text-burgundy">Ngân hàng:</span>{" "}
                Viecombank
              </p>
              <p
                className={`text-gray-700 font-light transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: "0.8s" }}
              >
                <span className="font-medium text-burgundy">CTK:</span> Nguyễn
                Xuân Đại
              </p>
              {qrCodeGrom && (
                <div className="flex justify-center pt-4">
                  <img
                    src={qrCodeGrom}
                    alt="QR Code Groom"
                    className="w-40 h-40 rounded-lg shadow-lg bg-white p-2"
                  />
                </div>
              )}
            </div>

            {/* Bride Section */}
            <div className="bg-rose rounded-lg p-2 space-y-3 text-left">
              <h3
                className={`text-lg font-serif text-burgundy mb-4 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: "0.5s" }}
              >
                BRIDE
              </h3>
              <p
                className={`text-gray-700 font-light transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <span className="font-medium text-burgundy">STK:</span>{" "}
                9386300093
              </p>
              <p
                className={`text-gray-700 font-light transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: "0.7s" }}
              >
                <span className="font-medium text-burgundy">Ngân hàng:</span>{" "}
                Viecombank
              </p>
              <p
                className={`text-gray-700 font-light transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: "0.8s" }}
              >
                <span className="font-medium text-burgundy">CTK:</span> Nguyễn
                Hồng Nhung
              </p>
              {qrCodeBride && (
                <div className="flex justify-center pt-4">
                  <img
                    src={qrCodeBride}
                    alt="QR Code Bride"
                    className="w-40 h-40 rounded-lg shadow-lg bg-white p-2"
                  />
                </div>
              )}
            </div>
          </div>
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
    </section>
  );
};
