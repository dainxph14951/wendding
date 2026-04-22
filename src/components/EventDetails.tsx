import React, { useEffect, useState, useRef } from "react";

interface EventDetailsProps {
  weddingDate: string;
  weddingTime: string;
  venue: string;
  address: string;
  groomPhone: string;
  groomName: string;
  bridePhone: string;
  brideName: string;
  mapUrl?: string;
  mapEmbed?: string;
  story?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  weddingDate,
  weddingTime,
  venue,
  address,
  groomPhone,
  groomName,
  bridePhone,
  brideName,
  mapEmbed,
  story,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{ background: "#fbf7f1" }}
    >
      <div className="relative z-10 w-full max-w-2xl px-6 py-12">
        <h2
          className={`text-5xl md:text-6xl font-serif text-burgundy text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(30px)",
            transitionDelay: "0.2s",
          }}
        >
          COUNTDOWN TIME
        </h2>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 mb-12 text-center">
          {[
            { value: timeLeft.days, label: "Ngày" },
            { value: timeLeft.hours, label: "Giờ" },
            { value: timeLeft.minutes, label: "Phút" },
            { value: timeLeft.seconds, label: "Giây" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-rose rounded-lg p-4 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: isVisible
                  ? "translateX(0)"
                  : idx % 2 === 0
                    ? "translateX(-30px)"
                    : "translateX(30px)",
                transitionDelay: `${0.3 + idx * 0.1}s`,
              }}
            >
              <p className="text-3xl md:text-4xl font-serif text-burgundy">
                {item.value}
              </p>
              <p className="text-sm text-gray-600 font-light mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {story && (
          <div
            className={`text-center text-gray-600 font-light leading-relaxed mb-12 space-y-2 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transitionDelay: "0.7s",
            }}
          >
            <p>{story}</p>
          </div>
        )}

        {/* Groom & Bride Info */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div
            className={`text-center border-l-4 border-gold pl-4 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transitionDelay: "0.8s",
            }}
          >
            <p className="text-lg font-light text-gray-700 mb-2">{groomName}</p>
            <a
              href={`tel:${groomPhone}`}
              className="inline-flex items-center gap-2 text-burgundy hover:text-opacity-75 transition-colors"
            >
              <span>📞</span>
              <span className="text-sm font-light">{groomPhone}</span>
            </a>
          </div>
          <div
            className={`text-center border-r-4 border-gold pr-4 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transitionDelay: "0.8s",
            }}
          >
            <p className="text-lg font-light text-gray-700 mb-2">{brideName}</p>
            <a
              href={`tel:${bridePhone}`}
              className="inline-flex items-center gap-2 text-burgundy hover:text-opacity-75 transition-colors"
            >
              <span>📞</span>
              <span className="text-sm font-light">{bridePhone}</span>
            </a>
          </div>
        </div>

        {/* Wedding Details */}
        <div
          className={`bg-rose rounded-lg p-6 mb-12 space-y-4 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(30px)",
            transitionDelay: "0.9s",
          }}
        >
          <div>
            <h3 className="text-lg font-light text-burgundy mb-2">
              Thời Gian (Time)
            </h3>
            <p className="text-gray-700 font-light">{weddingDate}</p>
            <p className="text-gray-700 font-light">{weddingTime}</p>
          </div>

          <div>
            <h3 className="text-lg font-light text-burgundy mb-2">
              Địa chỉ (Address)
            </h3>
            <p className="text-gray-700 font-medium">{venue}</p>
            <p className="text-gray-600 font-light">{address}</p>
          </div>
        </div>

        {/* Map */}
        {mapEmbed && (
          <div
            className={`mb-12 rounded-lg overflow-hidden shadow-lg transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transitionDelay: "1s",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: mapEmbed }} />
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
