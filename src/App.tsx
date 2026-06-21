import { useState, useRef, useEffect } from "react";
import { Welcome } from "./components/Welcome";
import { OurStory } from "./components/OurStory";
import { WeddingDay } from "./components/WeddingDay";
import { Memories } from "./components/Memories";
import { EventDetails } from "./components/EventDetails";
import { ThankYou } from "./components/ThankYou";
import { MusicToggle } from "./components/MusicToggle";
import { Confetti } from "./components/Confetti";
import { PetalFall } from "./components/PetalFall";
import "./index.css";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const sections = [
    <Welcome
      key="welcome"
      groomName="Xuân Đại"
      brideName="Hồng Nhung"
      groomAlias="Chú rể"
      brideAlias="Cô dâu"
    />,
    <OurStory
      key="story"
      title="OUR STORY"
      story="Chúng mình tin rằng, giữa nhân gian rộng lớn, luôn tồn tại những người, những chuyện và những mối chân tình mà ngay từ khoảnh khắc đầu tiên chạm mắt, đã định sẵn là duyên nợ cả đời. Cái duyên ấy tựa như mầm cây âm thầm bám rễ trong tim, xanh tươi suốt kiếp này và cả những luân hồi mai sau. Trên hành trình kỳ diệu của nhân sinh, mỗi chúng ta rồi sẽ tìm thấy một dải cực quang của riêng mình. Chúng mình tin vào tình yêu thuần khiết, tin vào sợi dây từ trường vô hình sẽ dẫn lối để ta được lắng nghe một lời tỏ tình—trong trẻo như ánh trăng và nồng nàn vị lắng đọng của thời gian."
      quote="Xuân Đại ❤ Hồng Nhung"
    />,
    <WeddingDay
      image={
        "https://res.cloudinary.com/dvglujyon/image/upload/v1782050352/gao18283_1_dd8is2.jpg"
      }
      key="wedding"
      mainText="We Get Married"
      description="Giữa muôn vạn vì sao rực rỡ, em chính là định mệnh hiển nhiên nhất của đời anh."
      shortStories={[
        {
          title: "Tình yêu...",
          content:
            "Là khi đôi mắt ta chạm nhau, thắp lên những niềm vui thầm lặng. Là khi đôi tay dù chẳng cất lời, vẫn cảm nhận được hai trái tim đang hòa cùng một nhịp.",
        },
        {
          title: "Chúng mình luôn tin rằng...",
          content:
            "Tình yêu đẹp nhất là sự song hành. Ta gặp nhau trong ánh sáng tinh khôi, cùng thắp lửa cho mỗi bước chân đi và nâng niu từng khoảnh khắc vụn vặt nhất. Cuộc đời là một hành trình kỳ diệu, nơi chúng mình không chỉ cùng nhau khám phá thế giới, mà còn tìm thấy chính bản thân mình trong tình yêu của đối phương.",
        },
      ]}
    />,
    <Memories
      key="memories"
      images={[
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782050038/a5_zqlskv.jpg",
          alt: "couple 1",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782050040/a3_bkgxet.jpg",
          alt: "couple 2",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782053058/gao18207_1_haxtac.jpg",
          alt: "couple 3",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782053110/gao18089_1_skugzq.jpg",
          alt: "couple 4",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782051372/gao18556_1_1_bs5zxx.jpg",
          alt: "couple 5",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782051625/gao18644_1_1_rzdxx0.jpg",
          alt: "couple 6",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782051877/gao18472_1_1_iwalhc.jpg",
          alt: "couple 7",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1782051896/gao18435_1_jk4hwk.jpg",
          alt: "couple 8",
        },
      ]}
    />,
    <EventDetails
      key="details"
      weddingDate="2026-07-25"
      weddingTime="Ngày 17 tháng 07 ấm lịch 12:00 PM"
      venue="Trống Đông Palace"
      address="123 Main Street, Hanoi, Vietnam"
      groomName="Xuân Đại"
      groomPhone="(+84) 3863-00092"
      brideName="Hồng Nhung"
      bridePhone="(+84) 3951-61551"
      story=""
      mapEmbed='<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d663.0297302475916!2d106.5262437897435!3d20.490353719647867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1776762109519!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    />,
    // <RSVP key="rsvp" />,
    <ThankYou
      key="thankyou"
      weddingDate="25.07"
      message="Chúc mình sắp bắt đầu một trình mới cùng nhau. Niềm vui này sẽ trọn vẹn hơn khi có bạn bên cạnh. Vì vậy, chúng mình mong được bạn chung vui trong ngày hạnh phúc này"
      qrCodeGrom="https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/qr-n_wgpgos.jpg"
      qrCodeBride="https://res.cloudinary.com/dvglujyon/image/upload/v1778567878/z7817241470861_ed83c4396af8a2f385ad53f5d59b619a_m7mhca.jpg"
    />,
  ];

  // Handle scroll to section
  useEffect(() => {
    if (containerRef.current) {
      setIsScrolling(true);
      const container = containerRef.current;
      const children = Array.from(container.children) as HTMLElement[];
      const target = children[currentPage]?.offsetTop ?? 0;
      container.scrollTo({ top: target, behavior: "smooth" });

      // Allow scroll detection after animation completes
      const timer = setTimeout(() => {
        setIsScrolling(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // Handle native scroll with better throttle
  useEffect(() => {
    const handleScroll = () => {
      // Ignore scroll events triggered by programmatic scrollTo
      if (isScrolling) return;

      if (containerRef.current) {
        const container = containerRef.current;
        const scrollPosition = container.scrollTop;

        const children = Array.from(container.children) as HTMLElement[];
        let nearest = 0;
        let minDist = Infinity;

        children.forEach((child, i) => {
          const offset = child.offsetTop;
          const dist = Math.abs(scrollPosition - offset);
          if (dist < minDist) {
            minDist = dist;
            nearest = i;
          }
        });

        // Only update if page actually changed
        if (
          nearest !== currentPage &&
          nearest < sections.length &&
          nearest >= 0
        ) {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          scrollTimeoutRef.current = setTimeout(() => {
            setCurrentPage(nearest);
          }, 150);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      // Use passive listener for better scroll performance
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentPage, sections.length, isScrolling]);

  // Handle arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInvitationOpen) return;
      if (e.key === "ArrowDown" && currentPage < sections.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.key === "ArrowUp" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, sections.length, isInvitationOpen]);

  return (
    <div className="relative w-screen h-screen overflow-hidden app-shell">
      {!isInvitationOpen && (
        <div className="invitation-overlay fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfaf6] transition-opacity duration-1000">
          {/* Lớp nền mờ ảo phía sau */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm brightness-[0.4] scale-110"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dvglujyon/image/upload/v1781491946/anhbiathiep_keahgb.png')`,
            }}
          />

          {/* Tấm thiệp chính */}
          <div className="invitation-card relative w-[85%] max-w-[380px] bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center border border-[#d4af37]/20 animate-in fade-in zoom-in duration-1000">
            {/* Viền chỉ vàng mảnh bên trong tạo độ tinh tế */}
            <div className="absolute inset-3 border border-[#d4af37]/10 rounded-[1.8rem] pointer-events-none" />
            {/* Con dấu sáp (Pulse & Wiggle) */}
            <div className="invite-seal relative mx-auto mb-6 w-20 h-20 md:w-24 md:h-24">
              <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl animate-ping opacity-60" />
              <img
                src="https://res.cloudinary.com/dvglujyon/image/upload/v1776916775/pngegg_1_zizqbj.png"
                alt="Seal"
                className="relative z-10 w-full h-full object-contain drop-shadow-lg animate-[wiggle_3s_ease-in-out_infinite]"
              />
            </div>
            {/* Tên cặp đôi */}
            <div className="space-y-1 mb-6">
              <p className="font-script invite-name text-2xl md:text-3xl text-[#800020] font-bold tracking-tight uppercase uppercase leading-tight">
                Xuân Đại
              </p>
              <p className="invite-name text-xl font-serif text-[#d4af37] italic font-light">
                &amp;
              </p>
              <p className="font-script invite-name text-2xl md:text-3xl text-[#800020] font-bold tracking-tight uppercase uppercase leading-tight">
                Hồng Nhung
              </p>
            </div>{" "}
                   
            <div className="absolute bottom-10 left-10 w-40 h-40 opacity-5 pointer-events-none grayscale">
              <img
                src="https://res.cloudinary.com/dvglujyon/image/upload/v1776937337/pngegg_2_kre1q3.png"
                alt="pattern"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Đường kẻ phân cách nghệ thuật */}
            <div className="invite-divider flex items-center justify-center gap-3 mb-6">
              <div className="h-[0.5px] w-10 bg-[#d4af37]/40" />
              <span className="text-[#d4af37] text-[10px]">✨</span>
              <div className="h-[0.5px] w-10 bg-[#d4af37]/40" />
            </div>
            {/* Thông tin ngày tháng */}
            <p className="invite-date text-[#800020]/70 font-script italic text-sm md:text-base mb-1">
              25 tháng 7, 2026
            </p>
            <p className="font-script invite-label text-[10px] tracking-[0.4em] text-gray-400 uppercase mb-8">
              Thân Mời
            </p>
            {/* Nút mở thiệp với hiệu ứng mượt */}
            <button
              type="button"
              className="invite-button relative overflow-hidden group bg-[#800020] text-white px-10 py-3 rounded-full font-serif tracking-[0.2em] shadow-lg hover:bg-red-800 transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => setIsInvitationOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 text-xs md:text-sm font-bold font-script">
                MỞ THIỆP
              </span>
            </button>
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
    @keyframes wiggle {
      0%, 100% { transform: rotate(-4deg); }
      50% { transform: rotate(4deg); }
    }
  `,
            }}
          />
        </div>
      )}

      {isInvitationOpen && (
        <>
          <MusicToggle
            audioUrl="https://res.cloudinary.com/dvglujyon/video/upload/v1776915359/leduong_pys4qs.mp3"
            shouldAutoPlay={isInvitationOpen}
          />
          {currentPage === 0 && <PetalFall />}
          {currentPage === 0 && <Confetti />}
        </>
      )}

      {/* Main container */}
      <div
        ref={containerRef}
        className={`relative w-full h-screen overflow-y-scroll transition-opacity duration-700 ${
          isInvitationOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none", // Hide scrollbar for IE and Edge
          scrollbarWidth: "none", // Hide scrollbar for Firefox
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex flex-col w-full h-full">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`section w-full flex-shrink-0 section-fade ${
                currentPage === idx ? "is-active" : ""
              }`}
            >
              {section}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
