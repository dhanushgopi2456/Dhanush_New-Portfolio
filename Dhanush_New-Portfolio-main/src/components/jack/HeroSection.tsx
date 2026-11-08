import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { FileText, Bot, Volume2, Camera } from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';
import { speakGreetingAndObjective } from '../../utils/speechUtils';

interface HeroSectionProps {
  onOpenPdfModal?: () => void;
  onOpenAiDrawer?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPdfModal,
  onOpenAiDrawer,
}) => {
  const [photoMode, setPhotoMode] = useState<'portrait' | 'fullbody'>('portrait');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakGreetingAndObjective(RESUME_DATA.personal.careerObjective);
    setTimeout(() => setIsSpeaking(false), 9000);
  };

  const portraitSrc = photoMode === 'portrait' ? '/Dhanush_Gopi.png' : '/image 4.png';

  return (
    <section className="h-screen w-full flex flex-col justify-between overflow-x-clip relative bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 z-30 relative"
      >
        <div className="flex items-center gap-6 sm:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Quick Utility Triggers */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenPdfModal && (
            <button
              onClick={onOpenPdfModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D7E2EA]/20 text-[#D7E2EA] text-xs uppercase tracking-wider transition-all cursor-pointer"
              title="View ATS Resume"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>
          )}

          {onOpenAiDrawer && (
            <button
              onClick={onOpenAiDrawer}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D7E2EA]/20 text-[#D7E2EA] text-xs uppercase tracking-wider transition-all cursor-pointer"
              title="Open AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Chat</span>
            </button>
          )}

          <button
            onClick={handleSpeak}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs uppercase tracking-wider transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 hover:bg-white/10 border-[#D7E2EA]/20 text-[#D7E2EA]'
            }`}
            title="Audio Career Objective"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-emerald-400' : 'text-emerald-400'}`} />
            <span className="hidden md:inline">{isSpeaking ? 'Playing...' : 'Audio'}</span>
          </button>
        </div>
      </motion.nav>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden z-0 pointer-events-none mt-6 sm:mt-4 md:-mt-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[16.5vw]">
            Hi, i&apos;m dhanush
          </h1>
        </motion.div>
      </div>

      {/* 3. Hero Portrait with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto relative group"
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={portraitSrc}
              alt="Dhanush Gopi Kavala - Full Stack AI Engineer"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] h-auto object-contain select-none pointer-events-auto drop-shadow-2xl transition-all duration-300"
              draggable={false}
            />
          </Magnet>

          {/* Photo Switcher Pill */}
          <button
            onClick={() => setPhotoMode(prev => prev === 'portrait' ? 'fullbody' : 'portrait')}
            className="absolute bottom-6 right-2 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[#D7E2EA] text-[10px] uppercase tracking-wider cursor-pointer shadow-lg"
            title="Switch Photo Pose"
          >
            <Camera className="w-3 h-3 text-cyan-400" />
            <span>Pose</span>
          </button>
        </motion.div>
      </div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 relative">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[170px] sm:max-w-[240px] md:max-w-[280px]"
        >
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a full stack & ai engineer driven by crafting striking, scalable, and unforgettable systems
          </p>
        </motion.div>

        {/* Right Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton href="#contact" />
        </motion.div>
      </div>
    </section>
  );
};
