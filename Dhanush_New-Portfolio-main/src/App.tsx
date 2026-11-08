import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CodingProfiles } from './components/CodingProfiles';
import { InteractiveSkills } from './components/InteractiveSkills';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumePdfModal } from './components/ResumePdfModal';
import { TerminalView } from './components/TerminalView';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { VideoBackground } from './components/VideoBackground';
import { LivingCanvas } from './components/LivingCanvas';
import { RESUME_DATA } from './data/resumeData';
import { speakGreetingAndObjective } from './utils/speechUtils';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const hasAutoSpokenRef = useRef(false);

  // Automatically trigger career objective voice narration when preloader finishes or on first interaction
  useEffect(() => {
    if (!isLoading && !hasAutoSpokenRef.current) {
      const triggerSpeech = () => {
        if (!hasAutoSpokenRef.current) {
          hasAutoSpokenRef.current = true;
          speakGreetingAndObjective(RESUME_DATA.personal.careerObjective);
        }
      };

      // 1. Immediate attempt after preloader
      const timer = setTimeout(() => {
        triggerSpeech();
      }, 500);

      // 2. User interaction listener in case browser blocked autoplay
      const handleUserGesture = () => {
        triggerSpeech();
        window.removeEventListener('pointerdown', handleUserGesture);
        window.removeEventListener('keydown', handleUserGesture);
        window.removeEventListener('scroll', handleUserGesture);
      };

      window.addEventListener('pointerdown', handleUserGesture);
      window.addEventListener('keydown', handleUserGesture);
      window.addEventListener('scroll', handleUserGesture);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('pointerdown', handleUserGesture);
        window.removeEventListener('keydown', handleUserGesture);
        window.removeEventListener('scroll', handleUserGesture);
      };
    }
  }, [isLoading]);

  // Section Observer to synchronize the floating navbar active pill automatically on scroll
  useEffect(() => {
    if (isTerminalMode) return;

    const sectionIds = [
      'hero',
      'about',
      'coding-profiles',
      'skills',
      'experience',
      'projects',
      'certifications',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTerminalMode]);

  const handleExploreClick = () => {
    setActiveSection('projects');
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Animated Futuristic Sci-Fi Preloader */}
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Cinematic Color-Graded Video Background */}
      <VideoBackground />

      {/* Living Three.js WebGL Space Canvas & Aurora Mesh Background */}
      <LivingCanvas />

      {/* Custom Magnetic Dual-Ring Glowing Cursor with Stardust Trail */}
      <CustomCursor />

      {isTerminalMode ? (
        <TerminalView onExitTerminal={() => setIsTerminalMode(false)} />
      ) : (
        <div className="relative z-10 min-h-screen bg-[#030712]/40 text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
          {/* Navigation Header */}
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isTerminalMode={isTerminalMode}
            setIsTerminalMode={setIsTerminalMode}
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
            onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
          />

          {/* Main Cinematic Sections */}
          <main>
            <Hero
              onOpenPdfModal={() => setIsPdfModalOpen(true)}
              onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
              onExploreClick={handleExploreClick}
            />
            <About />
            <CodingProfiles />
            <InteractiveSkills />
            <ExperienceTimeline />
            <Projects />
            <Certifications />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Modals & Drawers */}
          <ResumePdfModal
            isOpen={isPdfModalOpen}
            onClose={() => setIsPdfModalOpen(false)}
          />

          <AiAssistantDrawer
            isOpen={isAiDrawerOpen}
            onClose={() => setIsAiDrawerOpen(false)}
          />
        </div>
      )}
    </>
  );
}
