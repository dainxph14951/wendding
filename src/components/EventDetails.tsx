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
  groomPhone,
  groomName,
  bridePhone,
  brideName,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const invitationCards = [
    {
      title: "TIỆC CƯỚI NHÀ TRAI",
      schedule: "THỨ 7 - 10:00",
      date: "25 . 07 . 2026",
      lunarDate: "Tức Ngày 12 tháng 6 năm Bính Ngọ",
      locationTitle: "TẠI TƯ GIA NHÀ TRAI",
      locationAddress: "Thôn Bắc - Đông Thái Ninh - Hưng Yên",
      mapLink: "https://maps.app.goo.gl/psr5RsQbDKbWRFTJ9",
    },
    {
      title: "TIỆC CƯỚI NHÀ GÁI",
      schedule: "THỨ TƯ - 10 : 00",
      date: "22 . 07 . 2026",
      lunarDate: "Tức Ngày 09 tháng 06 năm Bính Ngọ",
      locationTitle: "TẠI TƯ GIA NHÀ GÁI",
      locationAddress: "TDP Liên Đình - Nghi Sơn - Thanh Hóa",
      mapLink: "https://maps.app.goo.gl/2hLbqz5XWUXKwxkm6",
    },
  ];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const weddingDateObj = new Date(weddingDate);
      const targetDate = new Date(
        weddingDateObj.getFullYear(),
        weddingDateObj.getMonth(),
        weddingDateObj.getDate(),
        10,
        0,
        0,
      ).getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex flex-col items-center py-20 overflow-hidden"
      style={{ background: "#fbf7f1" }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <div className="relative z-10 w-full max-w-4xl px-6 space-y-24">
        {/* 1. SECTION: INVITATION CARDS */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <p className="text-[#d4af37] text-xs tracking-[0.5em] mb-4 uppercase">
              Save the date
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#800020]">
              WEDDING INVITATION
            </h2>
            <div className="mt-4 flex justify-center items-center gap-4">
              <div className="h-[1px] w-12 bg-[#d4af37]/40" />
              <span className="text-[#d4af37]">✨</span>
              <div className="h-[1px] w-12 bg-[#d4af37]/40" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {invitationCards.map((card, index) => (
              <article
                key={index}
                className="relative group overflow-hidden rounded-[2rem] bg-[#800020] p-8 text-center border border-[#d4af37]/30 shadow-2xl transition-transform hover:-translate-y-2"
              >
                {/* Sparkle & Shimmer Effects (Reuse) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[200%] animate-[shimmer_5s_infinite]" />
                <div className="absolute inset-3 border border-[#d4af37]/20 rounded-[1.6rem] pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#f8f4e1] uppercase tracking-wider">
                    {card.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase">
                    {card.schedule}
                  </p>

                  <div className="py-4 border-y border-[#d4af37]/20 mx-4">
                    <p className="text-3xl font-serif font-bold text-white">
                      {card.date}
                    </p>
                    <p className="text-[10px] italic text-[#d4af37]/80 mt-1">
                      {card.lunarDate}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-lg font-serif text-[#f8f4e1]">
                      {card.locationTitle}
                    </p>
                    <p className="text-xs font-light text-white/70 leading-relaxed">
                      {card.locationAddress}
                    </p>
                  </div>

                  <a
                    href={card.mapLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#800020] transition-all"
                  >
                    📍 Xem bản đồ
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 2. SECTION: COUNTDOWN */}
        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-[#800020]">
              COUNTDOWN TIME
            </h2>
            <p className="text-[#d4af37] text-[10px] tracking-[0.4em] mt-2 uppercase">
              Until we say I DO
            </p>
          </div>

          {/* 1.5 SECTION: WEDDING CALENDAR (Khối mới thêm) */}
          <div
            className={`mb-16 transition-all duration-1000 delay-200 flex flex-col items-center text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-5xl md:text-6xl font-serif font-bold text-[#800020] mb-6">
              10:00
            </p>

            <div className="flex items-center gap-4 md:gap-8 mb-4">
              <span className="text-gray-600 font-serif text-lg md:text-xl uppercase tracking-widest">
                Thứ 7
              </span>
              <div className="h-8 w-[1px] bg-gray-300" />
              <span className="text-5xl md:text-6xl font-serif font-bold text-[#800020]">
                25
              </span>
              <div className="h-8 w-[1px] bg-gray-300" />
              <span className="text-gray-600 font-serif text-lg md:text-xl uppercase tracking-widest">
                Tháng 07
              </span>
            </div>

            <p className="text-3xl md:text-4xl font-serif text-gray-700 mb-4">
              2026
            </p>

            <p className="text-sm md:text-base text-gray-500 italic mb-8">
              (Tức ngày 12/06 năm Bính ngọ)
            </p>

            {/* Khối giờ đón khách & khai tiệc */}
            <div className="flex gap-12 md:gap-20 mb-12">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                  Đón khách
                </p>
                <p className="text-2xl font-serif font-bold text-[#800020]">
                  09:00
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                  Khai tiệc
                </p>
                <p className="text-2xl font-serif font-bold text-[#800020]">
                  10:00
                </p>
              </div>
            </div>

            {/* Bảng Lịch Tháng 2 */}
            <div className="relative bg-white/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-2xl p-6 shadow-sm w-full max-w-sm">
              <div className="text-[#800020] font-serif font-bold mb-4 border-b border-[#800020]/10 pb-2">
                Tháng 7 / 2026
              </div>

              {/* Các thứ trong tuần */}
              <div className="grid grid-cols-7 text-[10px] text-gray-400 mb-4 uppercase tracking-tighter">
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
                <span>T7</span>
                <span className="text-[#800020]">CN</span>
              </div>

              {/* Các ngày trong tháng */}
              <div className="grid grid-cols-7 gap-y-4 text-sm font-serif text-gray-700">
                {/* Ngày 29, 30 tháng 6 */}
                {[29, 30].map((day) => (
                  <span key={`prev-${day}`} className="text-gray-300">
                    {day}
                  </span>
                ))}

                {/* Render tất cả ngày 1-31 tháng 7, ngày 25 có hình trái tim */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isWeddingDay = day === 25;
                  return isWeddingDay ? (
                    <div
                      key={day}
                      className="relative flex items-center justify-center"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-8 h-8 text-[#800020] fill-current"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>
                      <span className="relative z-10 text-white text-[10px] font-bold mt-[-2px]">
                        {day}
                      </span>
                    </div>
                  ) : (
                    <span
                      key={day}
                      className="flex items-center justify-center"
                    >
                      {day}
                    </span>
                  );
                })}

                {/* Ngày 1, 2 tháng 8 */}
                {[1, 2].map((day) => (
                  <span key={`next-${day}`} className="text-gray-300">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
            {[
              { value: timeLeft.days, label: "Ngày" },
              { value: timeLeft.hours, label: "Giờ" },
              { value: timeLeft.minutes, label: "Phút" },
              { value: timeLeft.seconds, label: "Giây" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-4 md:p-6 shadow-xl border border-[#d4af37]/20 text-center group overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#800020]/0 group-hover:bg-[#800020]/5 transition-colors" />
                <p className="text-2xl md:text-4xl font-serif font-bold text-[#800020]">
                  {item.value}
                </p>
                <div className="w-4 h-[1px] bg-[#d4af37] mx-auto my-2" />
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SECTION: CALLING CARDS (Contact) */}
        <div
          className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {/* Groom Card */}
            <div className="group relative bg-white p-6 w-64 shadow-lg border-t-4 border-[#800020] transition-transform hover:-rotate-1">
              <div className="absolute -top-3 -left-3 text-2xl opacity-20">
                🕊️
              </div>
              <p className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase mb-1">
                Groom
              </p>
              <h4 className="text-xl font-serif text-[#800020] mb-4">
                {groomName}
              </h4>
              <a
                href={`tel:${groomPhone}`}
                className="flex items-center gap-3 text-gray-600 hover:text-[#800020] transition-colors"
              >
                <span className="p-2 bg-red-50 rounded-full text-xs">📞</span>
                <span className="text-sm font-medium">{groomPhone}</span>
              </a>
            </div>

            <div className="hidden md:block h-12 w-[1px] bg-[#d4af37]/30" />

            {/* Bride Card */}
            <div className="group relative bg-white p-6 w-64 shadow-lg border-t-4 border-[#800020] transition-transform hover:rotate-1">
              <div className="absolute -top-3 -right-3 text-2xl opacity-20 rotate-12">
                🌸
              </div>
              <p className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase mb-1">
                Bride
              </p>
              <h4 className="text-xl font-serif text-[#800020] mb-4">
                {brideName}
              </h4>
              <a
                href={`tel:${bridePhone}`}
                className="flex items-center gap-3 text-gray-600 hover:text-[#800020] transition-colors"
              >
                <span className="p-2 bg-red-50 rounded-full text-xs">📞</span>
                <span className="text-sm font-medium">{bridePhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer { 0% { transform: translateX(-200%); } 100% { transform: translateX(200%); } }
        @keyframes twinkle { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
      `,
        }}
      />
    </section>
  );
};
