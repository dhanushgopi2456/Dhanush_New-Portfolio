import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { CodingProfiles } from './CodingProfiles';
import { InteractiveSkills } from './InteractiveSkills';
import { ExperienceTimeline } from './ExperienceTimeline';
import { Projects } from './Projects';
import { Certifications } from './Certifications';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { ResumePdfModal } from './ResumePdfModal';
import { TerminalView } from './TerminalView';
import { AiAssistantDrawer } from './AiAssistantDrawer';
import { Preloader } from './Preloader';
import { CustomCursor } from './CustomCursor';
import { LivingCanvas } from './LivingCanvas';
import { RESUME_DATA } from '../data/resumeData';
import { speakGreetingAndObjective } from '../utils/speechUtils';

export const DhanushPortfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const hasAutoSpokenRef = useRef(false);

  useEffect(() => {
    document.title = 'Dhanush Gopi - Full Stack AI Engineer';
  }, []);

  // Automatically trigger career objective voice narration when preloader finishes
  useEffect(() => {
    if (!isLoading && !hasAutoSpokenRef.current) {
      const triggerSpeech = () => {
        if (!hasAutoSpokenRef.current) {
          hasAutoSpokenRef.current = true;
          speakGreetingAndObjective(RESUME_DATA.personal.careerObjective);
        }
      };

      const timer = setTimeout(() => {
        triggerSpeech();
      }, 500);

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

    const sections = [
      'hero',
      'about',
      'profiles',
      'skills',
      'experience',
      'projects',
      'certifications',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTerminalMode]);

  const handleExploreClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <LivingCanvas />
      <CustomCursor />

      {isTerminalMode ? (
        <TerminalView onExitTerminal={() => setIsTerminalMode(false)} />
      ) : (
        <div className="relative z-10 min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
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

          <Footer />

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
};
