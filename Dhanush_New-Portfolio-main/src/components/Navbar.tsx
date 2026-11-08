import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Terminal, 
  FileText, 
  Sparkles, 
  Menu, 
  X, 
  Volume2, 
  VolumeX,
} from 'lucide-react';
import { VoiceSpeakerControl } from './VoiceSpeakerControl';
import { ButtonGlare } from './ui/button-glare';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  isTerminalMode: boolean;
  setIsTerminalMode: (val: boolean) => void;
  onOpenPdfModal: () => void;
  onOpenAiDrawer: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  isTerminalMode,
  setIsTerminalMode,
  onOpenPdfModal,
  onOpenAiDrawer,
  soundEnabled,
  setSoundEnabled
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'coding-profiles', label: 'Coding Profiles' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/75 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-indigo-950/20 py-2.5' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with 3D Cyber Shimmer */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center group-hover:bg-slate-900 transition-colors overflow-hidden relative">
              <span className="font-extrabold text-base tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                DGK
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-slate-100 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all block text-sm sm:text-base">
              DHANUSH GOPI K.
            </span>
            <span className="text-[10px] text-cyan-400/90 block -mt-0.5 font-mono tracking-wider">
              MERN & AI ENGINEER
            </span>
          </div>
        </button>

        {/* Desktop Navigation Floating Pill with Framer Motion layoutId */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-2xl shadow-xl shadow-black/40">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
                  isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarActiveTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full -z-10 shadow-lg shadow-blue-500/35 border border-white/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls with Magnetic Pull & Neon Pulse Rings */}
        <div className="hidden sm:flex items-center gap-2">
          
          {/* Voice Speaker / Audio Guide */}
          <div className="relative group">
            <VoiceSpeakerControl compact={true} />
          </div>

          {/* AI Assistant Drawer Trigger with Purple Neon Pulse */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAiDrawer}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/40 text-xs font-semibold shadow-lg shadow-purple-950/30 transition-all overflow-hidden group cursor-pointer"
            title="Ask AI Assistant about Dhanush"
          >
            <ButtonGlare radius={12} crestColor={{ r: 0.8, g: 0.25, b: 0.95, a: 1 }} />
            {/* Neon Pulse Glow */}
            <span className="absolute -inset-1 rounded-xl bg-purple-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="relative z-10 w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="relative z-10">AI Assistant</span>
          </motion.button>

          {/* Terminal Mode Toggle with Emerald Neon Pulse */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTerminalMode(!isTerminalMode)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all overflow-hidden group cursor-pointer ${
              isTerminalMode 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500/30' 
                : 'bg-slate-900/70 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-emerald-500/40 shadow-md'
            }`}
            title="Toggle Interactive CLI Terminal Mode"
          >
            <ButtonGlare radius={12} coolColor={{ r: 0.1, g: 0.85, b: 0.5, a: 1 }} />
            <span className="relative z-10 flex items-center gap-1.5">
              {isTerminalMode ? (
                <Code className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{isTerminalMode ? 'GUI Mode' : 'CLI Mode'}</span>
            </span>
          </motion.button>

          {/* Resume PDF Viewer with Cyan Neon Pulse */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPdfModal}
            className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all border border-blue-400/30 group overflow-hidden cursor-pointer"
          >
            <ButtonGlare radius={12} />
            <span className="absolute -inset-1 rounded-xl bg-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <FileText className="relative z-10 w-3.5 h-3.5" />
            <span className="relative z-10">Resume PDF</span>
          </motion.button>

          {/* Sound Toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="relative p-2 rounded-xl bg-slate-900/70 text-slate-400 hover:text-white border border-slate-700/70 hover:border-blue-500/40 transition-colors shadow-md overflow-hidden group cursor-pointer"
            title={soundEnabled ? 'Mute Interaction Sounds' : 'Enable Interaction Sounds'}
          >
            <ButtonGlare radius={12} />
            <span className="relative z-10">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenAiDrawer}
            className="p-2 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30"
            aria-label="Open AI Assistant"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 mt-2 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    activeSection === link.id 
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/40 shadow-md' 
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsTerminalMode(!isTerminalMode);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-xs font-mono font-bold"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>{isTerminalMode ? 'Switch to Visual GUI Mode' : 'Switch to CLI Terminal Mode'}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenPdfModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  <FileText className="w-4 h-4" />
                  <span>View & Download Resume PDF</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
