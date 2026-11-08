import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Terminal, 
  FileText, 
  Sparkles, 
  Menu, 
  X, 
  Volume2, 
  VolumeX,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import { VoiceSpeakerControl } from './VoiceSpeakerControl';
import { RESUME_DATA } from '../data/resumeData';

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
    window.addEventListener('scroll', handleScroll);
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-blue-950/10 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
              <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                DG
              </span>
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-100 tracking-tight group-hover:text-blue-400 transition-colors block text-base">
              DHANUSH GOPI K.
            </span>
            <span className="text-[11px] text-slate-400 block -mt-1 font-mono">
              MERN & AI Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 shadow-md shadow-blue-500/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Features */}
        <div className="hidden sm:flex items-center gap-2">
          
          {/* Voice Speaker / Audio Guide */}
          <VoiceSpeakerControl compact={true} />

          {/* AI Assistant Drawer Trigger */}
          <button
            onClick={onOpenAiDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all hover:scale-105"
            title="Ask AI Assistant about Dhanush"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>AI Assistant</span>
          </button>

          {/* Terminal Mode Toggle */}
          <button
            onClick={() => setIsTerminalMode(!isTerminalMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
              isTerminalMode 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700/80 hover:text-white'
            }`}
            title="Toggle Interactive CLI Terminal Mode"
          >
            {isTerminalMode ? <Code className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
            <span>{isTerminalMode ? 'GUI Mode' : 'CLI Mode'}</span>
          </button>

          {/* Resume PDF Viewer */}
          <button
            onClick={onOpenPdfModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-md shadow-blue-600/30 transition-all hover:scale-105"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
            title={soundEnabled ? 'Mute Interaction Sounds' : 'Enable Interaction Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenAiDrawer}
            className="p-2 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 mt-2 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-xs font-mono"
              >
                <Terminal className="w-4 h-4" />
                <span>{isTerminalMode ? 'Switch to GUI Visual Mode' : 'Switch to CLI Terminal Mode'}</span>
              </button>

              <button
                onClick={() => {
                  onOpenPdfModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-medium"
              >
                <FileText className="w-4 h-4" />
                <span>View & Download Resume PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
