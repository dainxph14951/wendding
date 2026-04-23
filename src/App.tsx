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
      key="wedding"
      mainText="WE GET MARRIED"
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
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/img-2_wuqfzl.jpg",
          alt: "couple 1",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/img-1_tebgdn.jpg",
          alt: "couple 2",
        },
        {
          src: "https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/img-welcome_fmpcl3.webp",
          alt: "couple 3",
        },
      ]}
    />,
    <EventDetails
      key="details"
      weddingDate="2026-08-20"
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
      weddingDate="20.08"
      message="Hạnh phúc được bạn ở bên chúng mình"
      qrCodeGrom="https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/qr-n_wgpgos.jpg"
      qrCodeBride="https://res.cloudinary.com/dvglujyon/image/upload/v1776849624/qr-n_wgpgos.jpg"
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
        <div className="invitation-overlay">
          <div className="invitation-card">
            <div className="invite-seal" />
            <p className="invite-name">Xuân Đại</p>
            <p className="invite-name">&amp;</p>
            <p className="invite-name">Hồng Nhung</p>
            <div className="invite-divider" />
            <p className="invite-date">10 tháng 5, 2026</p>
            <p className="invite-label">Thân Mời</p>
            <button
              type="button"
              className="invite-button"
              onClick={() => setIsInvitationOpen(true)}
            >
              Mở thiệp
            </button>
          </div>
        </div>
      )}

      {isInvitationOpen && (
        <>
          <MusicToggle
            audioUrl="https://res.cloudinary.com/dvglujyon/video/upload/v1776914886/Le%CC%82%CC%83_%C4%90u%CC%9Bo%CC%9B%CC%80ng_swexji.mp3"
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
