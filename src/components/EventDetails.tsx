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

interface WeddingTimelineItem {
  time: string;
  label: string;
  icon: React.ReactNode;
}

const TimelineIconSvg = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

/** Đón tiếp — ly champagne cổ điển */
const TimelineGuestIcon = () => (
  <TimelineIconSvg>
    <ellipse
      cx="8.5"
      cy="4"
      rx="2.2"
      ry="0.75"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M6.5 4v6.2c0 1.6 1 2.9 2.5 3.2V17H5.5v1.5h4"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M6.5 4v6.2c0 1.6 1 2.9 2.5 3.2V17H5.5v1.5h4" />
    <ellipse
      cx="15.5"
      cy="4"
      rx="2.2"
      ry="0.75"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M17.5 4v6.2c0 1.6-1 2.9-2.5 3.2V17H19v1.5h-4"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M17.5 4v6.2c0 1.6-1 2.9-2.5 3.2V17H19v1.5h-4" />
    <path d="M10 11.8c.8.5 1.7.8 2.5.8s1.7-.3 2.5-.8" />
    <path d="M12 3.2v1.2" strokeWidth="1" />
    <circle cx="12" cy="2.6" r="0.5" fill="currentColor" stroke="none" />
  </TimelineIconSvg>
);

/** Khai mạc — bánh cưới ba tầng */
const TimelineFeastIcon = () => (
  <TimelineIconSvg>
    <path d="M6 20h12M8 20v-2.5M16 20v-2.5" strokeWidth="1.1" />
    <path
      d="M5 17.5h14a1 1 0 0 0 1-.9l-1.2-4.5H5.2L4 16.6a1 1 0 0 0 1 1z"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M5 17.5h14a1 1 0 0 0 1-.9l-1.2-4.5H5.2L4 16.6a1 1 0 0 0 1 1z" />
    <path d="M7.5 13h9l.8-3H6.7l.8 3z" fill="currentColor" fillOpacity="0.14" />
    <path d="M7.5 13h9l.8-3H6.7l.8 3z" />
    <path
      d="M9 9.5h6l.6-2.2H8.4l.6 2.2z"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path d="M9 9.5h6l.6-2.2H8.4l.6 2.2z" />
    <path
      d="M12 5.5c-.8 0-1.4.5-1.4 1.1S11.2 7.7 12 7.7s1.4-.5 1.4-1.1S12.8 5.5 12 5.5z"
      fill="currentColor"
      stroke="none"
    />
    <path d="M12 7.7V9.5" strokeWidth="1" />
    <circle cx="10" cy="15.2" r="0.35" fill="currentColor" stroke="none" />
    <circle cx="14" cy="15.2" r="0.35" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11.2" r="0.35" fill="currentColor" stroke="none" />
  </TimelineIconSvg>
);

/** Thành hôn — nhẫn đôi & trái tim */
const TimelineRingsIcon = () => (
  <TimelineIconSvg>
    <path
      d="M12 4.2c-.3-.9-1.4-1.5-2.4-1.1-.9.4-1.3 1.5-.8 2.4.3.6 1 1 1.7 1l.1.1c.2-.5.6-.9 1.1-1.1.9-.4 2-.2 2.4.7.3.7 0 1.5-.7 1.9"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="none"
    />
    <path d="M12 4.2c-.3-.9-1.4-1.5-2.4-1.1-.9.4-1.3 1.5-.8 2.4.3.6 1 1 1.7 1l.1.1c.2-.5.6-.9 1.1-1.1.9-.4 2-.2 2.4.7.3.7 0 1.5-.7 1.9" />
    <circle cx="8.5" cy="15" r="3.2" />
    <circle cx="15.5" cy="15" r="3.2" />
    <path d="M11.7 15.2c.6.5 1.5.5 2.1 0" />
    <circle
      cx="8.5"
      cy="15"
      r="1.1"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="none"
    />
    <circle
      cx="15.5"
      cy="15"
      r="1.1"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="none"
    />
  </TimelineIconSvg>
);

/** Lưu niệm — ảnh polaroid & trái tim */
const TimelineCameraIcon = () => (
  <TimelineIconSvg>
    <rect
      x="5"
      y="4"
      width="11"
      height="14"
      rx="1"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <rect x="5" y="4" width="11" height="14" rx="1" />
    <rect
      x="6.5"
      y="5.5"
      width="8"
      height="7.5"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="none"
    />
    <path
      d="M10 11.2C8.5 9.8 7.5 8.8 7.5 7.8c0-.9.7-1.6 1.6-1.6.7 0 1.3.4 1.6 1 .3-.6.9-1 1.6-1 .9 0 1.6.7 1.6 1.6 0 1-1 2-2.5 3.4L10 11.2z"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="none"
    />
    <path d="M10 11.2C8.5 9.8 7.5 8.8 7.5 7.8c0-.9.7-1.6 1.6-1.6.7 0 1.3.4 1.6 1 .3-.6.9-1 1.6-1 .9 0 1.6.7 1.6 1.6 0 1-1 2-2.5 3.4L10 11.2z" />
    <path d="M6.5 15.5h8" strokeWidth="1" />
    <path
      d="M17.5 9.5h2.5v6a1 1 0 0 1-1 1h-1.5"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M17.5 9.5h2.5v6a1 1 0 0 1-1 1h-1.5" />
    <circle cx="18.8" cy="12.5" r="1.4" />
    <path
      d="M20 8.5l-1-.5h-1.2l-.6 1h1.8l1-.5z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="none"
    />
    <path d="M20 8.5l-1-.5h-1.2l-.6 1h1.8l1-.5z" />
  </TimelineIconSvg>
);

const weddingTimeline: WeddingTimelineItem[] = [
  { time: "07:00", label: "Đón tiếp quý khách", icon: <TimelineGuestIcon /> },
  { time: "08:00", label: "Khai mạc tiệc cưới", icon: <TimelineFeastIcon /> },
  { time: "09:00", label: "Lễ thành hôn", icon: <TimelineRingsIcon /> },
  {
    time: "09:30",
    label: "Chụp hình lưu niệm với Cô dâu & Chú rể",
    icon: <TimelineCameraIcon />,
  },
];

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
      title: "Tiệc cưới nhà trai",
      schedule: "THỨ 7 - 10:00",
      date: "25 . 07 . 2026",
      lunarDate: "Tức Ngày 12 tháng 6 năm Bính Ngọ",
      locationTitle: "TẠI TƯ GIA NHÀ TRAI",
      locationAddress: "Thôn Bắc - Đông Thái Ninh - Hưng Yên",
      mapLink: "https://maps.app.goo.gl/psr5RsQbDKbWRFTJ9",
    },
    {
      title: "Tiệc cưới nhà gái",
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
            <p className="font-script text-2xl md:text-3xl text-[#d4af37] mb-2">
              Save the date
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-[#800020] leading-tight">
              Wedding Invitation
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
                  <h3 className="font-script text-2xl md:text-3xl text-[#f8f4e1] leading-snug">
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
                    <p className=" text-xl md:text-2xl text-[#f8f4e1]">
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
            <h2 className="font-script text-5xl md:text-6xl text-[#800020] leading-tight">
              Countdown Time
            </h2>
            <p className="font-script text-xl md:text-2xl text-[#d4af37] mt-1">
              Until we say I do
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
              <span className="text-gray-600 font-serif text-lg md:text-xl uppercase tracking-widest">
                Ngày 25
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
                <p className="font-script text-lg text-gray-500 mb-2">
                  Đón khách
                </p>
                <p className="text-2xl font-serif font-bold text-[#800020]">
                  09:00
                </p>
              </div>
              <div>
                <p className="font-script text-lg text-gray-500 mb-2">
                  Khai tiệc
                </p>
                <p className="text-2xl font-serif font-bold text-[#800020]">
                  10:00
                </p>
              </div>
            </div>

            {/* Bảng Lịch Tháng 2 */}
            <div className="relative bg-white/50 backdrop-blur-sm border border-[#d4af37]/30 rounded-2xl p-6 shadow-sm w-full max-w-sm">
              <div className="font-script text-2xl text-[#800020] mb-4 border-b border-[#800020]/10 pb-2">
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

          {/* Timeline lịch trình tiệc */}
          <div
            className={`mt-16 flex flex-col items-center transition-all duration-1000 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-center font-script text-3xl md:text-4xl text-[#800020] mb-8">
              Lịch trình trong ngày
            </p>
            <div className="relative mx-auto w-full max-w-sm">
              {weddingTimeline.map((item, index) => (
                <div
                  key={item.time}
                  className={`relative flex items-start gap-5 ${index < weddingTimeline.length - 1 ? "pb-10" : ""}`}
                >
                  <div className="relative flex w-14 shrink-0 flex-col items-center">
                    {index < weddingTimeline.length - 1 && (
                      <div
                        className="absolute left-1/2 top-14 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#d4af37]/60 to-[#d4af37]/15"
                        aria-hidden
                      />
                    )}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/50 bg-gradient-to-br from-white via-[#fffdf8] to-[#f8f0e3] text-[#800020] shadow-md ring-1 ring-[#d4af37]/15">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 pt-3 text-left">
                    <p className="font-serif text-xl font-bold text-[#800020] tabular-nums">
                      {item.time}
                    </p>
                    <p className="font-serif text-base text-gray-700 leading-snug">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
              <p className="font-serif text-xl text-[#d4af37] mb-1">Groom</p>
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
              <p className="font-serif text-xl text-[#d4af37] mb-1">Bride</p>
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
