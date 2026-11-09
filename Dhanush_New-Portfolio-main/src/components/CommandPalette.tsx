import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Terminal, 
  Compass, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Code2, 
  Sparkles, 
  ExternalLink, 
  Check, 
  FileText, 
  X, 
  Layers, 
  Volume2, 
  VolumeX, 
  Zap, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPdfModal: () => void;
  onOpenAiDrawer: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Contact & Actions' | 'Coding Profiles' | 'Controls';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenPdfModal,
  onOpenAiDrawer,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-hero',
      category: 'Navigation',
      title: 'Hero / Introduction',
      subtitle: 'Jump to top introduction & 3D wireframe scene',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => { onNavigateSection('hero'); onClose(); }
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About & 3D Bento Grid',
      subtitle: 'Jump to academic credentials, GitHub activity & metrics',
      icon: <Compass className="w-4 h-4 text-indigo-400" />,
      action: () => { onNavigateSection('about'); onClose(); }
    },
    {
      id: 'nav-coding',
      category: 'Navigation',
      title: 'Coding Profiles',
      subtitle: 'LeetCode, GeeksforGeeks, Code360 & Codolio 900+ solved',
      icon: <Code2 className="w-4 h-4 text-amber-400" />,
      action: () => { onNavigateSection('coding-profiles'); onClose(); }
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Kinetic 3D Skill Sphere',
      subtitle: 'Interactive 3D tag sphere & infinite marquee stack',
      icon: <Zap className="w-4 h-4 text-purple-400" />,
      action: () => { onNavigateSection('skills'); onClose(); }
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Work Experience',
      subtitle: 'Codec Technologies MERN Stack Developer timeline',
      icon: <Terminal className="w-4 h-4 text-blue-400" />,
      action: () => { onNavigateSection('experience'); onClose(); }
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Projects Showcase (3D Flip)',
      subtitle: 'Veda AI Grader, Team Task Manager, FreshMart, HOS Route, YOLOv9',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      action: () => { onNavigateSection('projects'); onClose(); }
    },
    {
      id: 'nav-certs',
      category: 'Navigation',
      title: 'Certifications Vault',
      subtitle: 'Oracle, Azure AI, ServiceNow, Salesforce, NPTEL holographic cards',
      icon: <Cpu className="w-4 h-4 text-pink-400" />,
      action: () => { onNavigateSection('certifications'); onClose(); }
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact Dhanush Gopi',
      subtitle: 'Send message, copy email or schedule interview',
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      action: () => { onNavigateSection('contact'); onClose(); }
    },

    // Actions & Contacts
    {
      id: 'copy-email',
      category: 'Contact & Actions',
      title: 'Copy Email Address',
      subtitle: RESUME_DATA.personal.email,
      icon: copiedId === 'copy-email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-cyan-400" />,
      action: () => copyToClipboard(RESUME_DATA.personal.email, 'copy-email')
    },
    {
      id: 'copy-phone',
      category: 'Contact & Actions',
      title: 'Copy Phone Number',
      subtitle: RESUME_DATA.personal.phone,
      icon: copiedId === 'copy-phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Phone className="w-4 h-4 text-emerald-400" />,
      action: () => copyToClipboard(RESUME_DATA.personal.phone, 'copy-phone')
    },
    {
      id: 'open-resume',
      category: 'Contact & Actions',
      title: 'View Resume PDF',
      subtitle: 'Open full verified ATS resume viewer modal',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      action: () => { onOpenPdfModal(); onClose(); }
    },
    {
      id: 'open-ai',
      category: 'Contact & Actions',
      title: 'Ask Dhanush AI Assistant',
      subtitle: 'Interactive AI drawer powered by resume intelligence',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => { onOpenAiDrawer(); onClose(); }
    },
    {
      id: 'open-github',
      category: 'Contact & Actions',
      title: 'Visit GitHub Profile',
      subtitle: 'github.com/dhanushgopi2456',
      icon: <Github className="w-4 h-4 text-slate-300" />,
      action: () => { window.open(RESUME_DATA.personal.github, '_blank'); onClose(); }
    },
    {
      id: 'open-linkedin',
      category: 'Contact & Actions',
      title: 'Connect on LinkedIn',
      subtitle: 'linkedin.com/in/dhanush-gopi-kavala',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      action: () => { window.open(RESUME_DATA.personal.linkedin, '_blank'); onClose(); }
    },

    // Coding profiles
    {
      id: 'open-leetcode',
      category: 'Coding Profiles',
      title: 'LeetCode Profile (500+ Solved)',
      subtitle: 'Contest Rating 1550+ | Streak Badge',
      icon: <Code2 className="w-4 h-4 text-amber-400" />,
      action: () => { window.open('https://leetcode.com/u/Dhanush_Gopi/', '_blank'); onClose(); }
    },
    {
      id: 'open-gfg',
      category: 'Coding Profiles',
      title: 'GeeksforGeeks Profile (250+ Solved)',
      subtitle: 'Score 680+ | Problem of the Day Streak',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      action: () => { window.open('https://www.geeksforgeeks.org/profile/gopidhan1xwf', '_blank'); onClose(); }
    },

    // Controls
    {
      id: 'toggle-sound',
      category: 'Controls',
      title: soundEnabled ? 'Mute Portfolio Audio Narrator' : 'Enable Portfolio Audio Narrator',
      subtitle: 'Toggle speech synthesis & audio voiceovers',
      icon: soundEnabled ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />,
      action: () => { setSoundEnabled(!soundEnabled); }
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-slate-950/90 border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(99,102,241,0.2)] overflow-hidden backdrop-blur-2xl z-10 flex flex-col max-h-[80vh]"
          >
            {/* Header / Input Field */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-900/50">
              <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search sections, contacts, links..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none font-sans"
              />
              <div className="flex items-center gap-1.5 ml-2">
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white/5 border border-white/10 rounded">
                  ESC
                </kbd>
                <button
                  onClick={onClose}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Command List */}
            <div className="overflow-y-auto p-2 space-y-1 divide-y divide-white/5">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  <p>No results found for "{query}".</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for "projects", "email", "github", or "dsa".</p>
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 border border-cyan-500/40 shadow-lg' 
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-300'}`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/5">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        {isSelected && (
                          <div className="flex items-center text-cyan-400 text-xs font-mono">
                            <span>Press</span>
                            <kbd className="ml-1 px-1.5 py-0.5 bg-cyan-500/20 border border-cyan-500/40 rounded text-[10px]">
                              ↵ Enter
                            </kbd>
                          </div>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="px-4 py-2.5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd> Select
                </span>
              </div>
              <span className="text-cyan-400/80 font-bold">Dhanush Gopi Kavala • Portfolio 3.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
