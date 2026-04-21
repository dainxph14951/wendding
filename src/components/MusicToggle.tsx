import React, { useState, useRef, useEffect } from "react";

interface MusicToggleProps {
  audioUrl: string;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleToggle = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset to beginning if needed
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error("Lỗi phát nhạc:", err);
    }
  };

  // Try to autoplay on mount; if browser blocks, state remains paused
  useEffect(() => {
    const attemptedMutedRef = { current: false } as { current: boolean };

    const tryAutoplay = async () => {
      if (!audioRef.current) return;
      try {
        // Try unmuted autoplay first
        audioRef.current.muted = false;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          return;
        }
      } catch (err) {
        // continue to muted fallback
      }

      // Fallback: try to start muted (many browsers allow muted autoplay)
      try {
        audioRef.current.muted = true;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          attemptedMutedRef.current = true;
        }
      } catch (err) {
        setIsPlaying(false);
      }
    };

    const handleFirstInteraction = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.muted = false;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        setIsPlaying(true);
      } catch (err) {
        // ignore
      }
    };

    tryAutoplay();
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        onClick={handleToggle}
        className={`music-button fixed top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
          isPlaying
            ? "playing bg-burgundy text-white shadow-lg"
            : "paused bg-white text-burgundy shadow-lg border-2 border-burgundy"
        }`}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        aria-pressed={isPlaying}
      >
        <svg
          className="note w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      </button>
    </>
  );
};
