import React, { useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { MarqueeSection } from './MarqueeSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactButton } from './ContactButton';

export const JackPortfolio: React.FC = () => {
  useEffect(() => {
    document.title = 'Jack -- 3D Creator';
  }, []);

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] min-h-screen w-full relative selection:bg-[#B600A8] selection:text-white"
      style={{
        backgroundColor: '#0C0C0C',
        fontFamily: "'Kanit', sans-serif",
        overflowX: 'clip',
      }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection />

      {/* Contact Section Anchor & Footer */}
      <footer
        id="contact"
        className="w-full bg-[#0C0C0C] py-20 px-6 sm:px-10 text-center border-t border-white/10 flex flex-col items-center justify-center gap-8 relative z-20"
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <h3
            className="hero-heading font-black uppercase text-center tracking-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            Let&apos;s Connect
          </h3>
          <p className="text-[#D7E2EA]/70 text-sm sm:text-base font-light max-w-md">
            Ready to bring your 3D vision to life? Send an inquiry and let&apos;s build something striking.
          </p>
          <div className="mt-2">
            <ContactButton href="mailto:jack3dcreator@example.com" />
          </div>
        </div>

        <p className="text-[#D7E2EA]/40 text-xs sm:text-sm tracking-widest uppercase mt-6">
          &copy; {new Date().getFullYear()} JACK &bull; 3D CREATOR &bull; ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
};
