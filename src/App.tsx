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
// import { NavMenu } from "./components/NavMenu";
import "./index.css";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
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
          src: "/img-2.jpg",
          alt: "couple 1",
        },
        {
          src: "/img-1.jpg",
          alt: "couple 2",
        },
        {
          src: "/img-welcome.webp",
          alt: "couple 3",
        },
      ]}
    />,
    <EventDetails
      key="details"
      weddingDate="2025-08-20"
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
      qrCodeGrom="/qr-n.jpg"
      qrCodeBride="/qr-n.jpg"
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
    console.log("currentPage", currentPage);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentPage < sections.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.key === "ArrowUp" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, sections.length]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <MusicToggle audioUrl="/nhac_nen.mp3" />
      {currentPage === 0 && <PetalFall />}
      {currentPage === 0 && <Confetti />}
      {/* <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        menuItems={menuItems}
        currentPage={currentPage}
      /> */}

      {/* Main container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-y-scroll"
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
            <div key={idx} className="section w-full flex-shrink-0">
              {section}
            </div>
          ))}
        </div>
      </div>

      {/* Dot pagination */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {sections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentPage
                ? "bg-burgundy w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to section ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-40 lg:hidden">
        {sections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentPage ? "bg-burgundy w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
