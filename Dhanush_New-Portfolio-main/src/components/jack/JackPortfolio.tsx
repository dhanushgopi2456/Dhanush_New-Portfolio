import React, { useState, useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { MarqueeSection } from './MarqueeSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactButton } from './ContactButton';
import { ResumePdfModal } from '../ResumePdfModal';
import { AiAssistantDrawer } from '../AiAssistantDrawer';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  FileText,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { RESUME_DATA } from '../../data/resumeData';

export const JackPortfolio: React.FC = () => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  useEffect(() => {
    document.title = 'Dhanush Gopi -- Full Stack & AI Engineer';
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
      <HeroSection
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
      />

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
        className="w-full bg-[#0C0C0C] py-24 px-6 sm:px-10 text-center border-t border-white/10 flex flex-col items-center justify-center gap-12 relative z-20"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
            Available For Opportunities
          </span>

          <h3
            className="hero-heading font-black uppercase text-center tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Let&apos;s Connect
          </h3>

          <p className="text-[#D7E2EA]/75 text-sm sm:text-base font-light max-w-lg leading-relaxed">
            Open for Full Stack Software Engineering, MERN development, and AI / Machine Learning roles. Let&apos;s build something striking and high-impact together.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <ContactButton href={`mailto:${RESUME_DATA.personal.email}`} />
            
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer select-none flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Resume</span>
            </button>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6 text-left">
            <a
              href={`mailto:${RESUME_DATA.personal.email}`}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] text-[#D7E2EA]/50 uppercase tracking-wider">Email</div>
                <div className="text-xs font-mono text-white truncate">{RESUME_DATA.personal.email}</div>
              </div>
            </a>

            <a
              href={`tel:${RESUME_DATA.personal.phone}`}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] text-[#D7E2EA]/50 uppercase tracking-wider">Phone</div>
                <div className="text-xs font-mono text-white truncate">{RESUME_DATA.personal.phone}</div>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] text-[#D7E2EA]/50 uppercase tracking-wider">Location</div>
                <div className="text-xs text-white truncate">{RESUME_DATA.personal.location}</div>
              </div>
            </div>
          </div>

          {/* Social Profiles & Coding Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a
              href={RESUME_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-[#D7E2EA] transition-all hover:scale-105"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>GitHub</span>
            </a>

            <a
              href={RESUME_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-[#D7E2EA] transition-all hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://leetcode.com/u/Dhanush_Gopi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-[#D7E2EA] transition-all hover:scale-105"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>LeetCode (500+)</span>
            </a>

            <a
              href="https://www.geeksforgeeks.org/profile/gopidhan1xwf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-[#D7E2EA] transition-all hover:scale-105"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>GFG (250+)</span>
            </a>
          </div>
        </div>

        <p className="text-[#D7E2EA]/40 text-xs sm:text-sm tracking-widest uppercase mt-6">
          &copy; {new Date().getFullYear()} DHANUSH GOPI KAVALA &bull; FULL STACK & AI ENGINEER &bull; ALL RIGHTS RESERVED
        </p>
      </footer>

      {/* Modals & AI Assistant Drawer */}
      <ResumePdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

      <AiAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />
    </div>
  );
};
