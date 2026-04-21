import React from "react";

interface WelcomeProps {
  groomName: string;
  brideName: string;
  groomAlias?: string;
  brideAlias?: string;
  bgImage?: string;
}

export const Welcome: React.FC<WelcomeProps> = ({
  groomName,
  brideName,
  bgImage = "/img-welcome.webp",
}) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden text-black">
      {/* Background image from public/ (place your file at public/background.jpg) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
      </div>

      <div className="relative z-10 w-full h-full">
        <div className="container mx-auto h-full px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Left large stacked heading */}
          <div className="pt-6 md:pt-12 md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-black leading-tight opacity-0 animate-fadeUp">
              WELCOME
            </h2>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-black leading-tight opacity-0 animate-fadeUp-delay-200">
              TO
            </h2>

            <p className="mt-4 text-sm md:text-lg font-light text-black/80 max-w-md opacity-0 animate-fadeUp-delay-400">
              Chúng mình kết hôn rồi! Hẹn bạn đến chung vui cùng chúng mình
              trong ngày trọng đại.
            </p>
          </div>

          {/* Right large title and names at bottom-right on mobile */}
          <div className="md:w-1/2 flex flex-col items-end justify-end h-full pb-8 md:pb-16">
            <div className="text-right">
              <h1 className="text-4xl md:text-6xl font-serif text-black opacity-0 animate-fadeUp">
                OUR
              </h1>
              <h1 className="text-4xl md:text-6xl font-serif text-black opacity-0 animate-fadeUp-delay-200">
                WEDDING
              </h1>
            </div>

            <div className="mt-6 md:mt-8 text-right">
              <p className="text-xl md:text-2xl font-serif opacity-0 animate-fadeUp-delay-400">
                GROOM / {groomName}
              </p>
              <p className="text-xl md:text-2xl font-serif opacity-0 animate-fadeUp-delay-400">
                BRIDE / {brideName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
