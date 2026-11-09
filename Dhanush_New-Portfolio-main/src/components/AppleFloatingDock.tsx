import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Home, 
  User, 
  Code2, 
  Zap, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Mail, 
  Command, 
  Sparkles, 
  Terminal, 
  FileText,
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import { ButtonGlare } from './ui/button-glare';

interface AppleFloatingDockProps {
  activeSection: string;
  setActiveSection: (secId: string) => void;
  onOpenCommandPalette: () => void;
  onOpenAiDrawer: () => void;
  onOpenPdfModal: () => void;
  isTerminalMode: boolean;
  setIsTerminalMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

interface DockItemDef {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  isActionOnly?: boolean;
  badge?: string;
  color: string;
}

const DockIconItem: React.FC<{
  item: DockItemDef;
  mouseX: any;
  isActive: boolean;
}> = ({ item, mouseX, isActive }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Measure distance from cursor to icon center
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Parabolic spring magnification curve (Apple Dock physics)
  const widthTransform = useTransform(distance, [-120, 0, 120], [42, 64, 42]);
  const heightTransform = useTransform(distance, [-120, 0, 120], [42, 64, 42]);
  const iconScaleTransform = useTransform(distance, [-120, 0, 120], [1, 1.45, 1]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 180, damping: 14 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 180, damping: 14 });
  const iconScale = useSpring(iconScaleTransform, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <motion.button
      ref={ref}
      style={{ width, height }}
      onClick={() => {
        audioSynth.playLaserBlip();
        item.action();
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        audioSynth.playGlassClick();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center rounded-2xl cursor-pointer group transition-colors duration-200 focus:outline-none ${
        isActive 
          ? 'bg-gradient-to-b from-cyan-500/30 to-indigo-600/40 border border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
          : 'bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-white/25 shadow-lg'
      }`}
      aria-label={item.label}
    >
      {/* Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -48, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute pointer-events-none px-2.5 py-1 rounded-xl bg-slate-950/95 border border-white/15 text-slate-100 text-[11px] font-mono font-bold whitespace-nowrap shadow-2xl backdrop-blur-md z-50 flex items-center gap-1.5"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400' : 'bg-slate-400'}`} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                {item.badge}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Icon */}
      <motion.div style={{ scale: iconScale }} className={`transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
        {item.icon}
      </motion.div>

      {/* Active Dot Indicator below icon */}
      {isActive && (
        <motion.span
          layoutId="activeDockDot"
          className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
        />
      )}
    </motion.button>
  );
};

export const AppleFloatingDock: React.FC<AppleFloatingDockProps> = ({
  activeSection,
  setActiveSection,
  onOpenCommandPalette,
  onOpenAiDrawer,
  onOpenPdfModal,
  isTerminalMode,
  setIsTerminalMode,
  soundEnabled,
  setSoundEnabled,
}) => {
  const mouseX = useMotionValue(Infinity);
  const [isDroneOn, setIsDroneOn] = useState(false);

  const scrollToSection = (secId: string) => {
    setActiveSection(secId);
    if (isTerminalMode) setIsTerminalMode(false);
    const el = document.getElementById(secId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems: DockItemDef[] = [
    {
      id: 'hero',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      action: () => scrollToSection('hero'),
      color: 'text-cyan-400',
    },
    {
      id: 'about',
      label: 'Bento & Milestones',
      icon: <User className="w-5 h-5" />,
      action: () => scrollToSection('about'),
      color: 'text-indigo-400',
    },
    {
      id: 'coding-profiles',
      label: 'Coding Stats (900+)',
      icon: <Code2 className="w-5 h-5" />,
      action: () => scrollToSection('coding-profiles'),
      color: 'text-amber-400',
    },
    {
      id: 'skills',
      label: 'Skills Matrix',
      icon: <Zap className="w-5 h-5" />,
      action: () => scrollToSection('skills'),
      color: 'text-purple-400',
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: <Briefcase className="w-5 h-5" />,
      action: () => scrollToSection('experience'),
      color: 'text-blue-400',
    },
    {
      id: 'projects',
      label: 'Featured Projects',
      icon: <FolderGit2 className="w-5 h-5" />,
      action: () => scrollToSection('projects'),
      color: 'text-emerald-400',
    },
    {
      id: 'certifications',
      label: 'Holographic Vault',
      icon: <Award className="w-5 h-5" />,
      action: () => scrollToSection('certifications'),
      color: 'text-pink-400',
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <Mail className="w-5 h-5" />,
      action: () => scrollToSection('contact'),
      color: 'text-cyan-400',
    },
  ];

  const toolItems: DockItemDef[] = [
    {
      id: 'cmd-k',
      label: 'Command Palette',
      badge: '⌘K',
      icon: <Command className="w-5 h-5" />,
      action: onOpenCommandPalette,
      isActionOnly: true,
      color: 'text-cyan-400',
    },
    {
      id: 'ai-drawer',
      label: 'Dhanush AI Assistant',
      badge: 'AI',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      action: onOpenAiDrawer,
      isActionOnly: true,
      color: 'text-purple-400',
    },
    {
      id: 'cli-terminal',
      label: isTerminalMode ? 'Exit Terminal' : 'Interactive CLI Mode',
      badge: 'BASH',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      action: () => setIsTerminalMode(!isTerminalMode),
      isActionOnly: true,
      color: 'text-emerald-400',
    },
    {
      id: 'pdf-resume',
      label: 'ATS Resume PDF',
      badge: 'PDF',
      icon: <FileText className="w-5 h-5 text-cyan-400" />,
      action: onOpenPdfModal,
      isActionOnly: true,
      color: 'text-cyan-400',
    },
  ];

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioSynth.setSoundEnabled(next);
    if (next) {
      audioSynth.playLaserBlip();
    }
  };

  const handleToggleAtmosphere = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      audioSynth.setSoundEnabled(true);
    }
    const running = audioSynth.toggleDrone();
    setIsDroneOn(running);
  };

  return (
    <>
      {/* Top Floating Mini Equalizer & Ambient Audio Synthesizer Controller */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-5 right-5 z-40 flex items-center gap-2.5"
      >
        <button
          onClick={handleToggleAtmosphere}
          onMouseEnter={() => audioSynth.playGlassClick()}
          title="Toggle Zero-Gravity Ambient Synthesizer Drone"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl text-xs font-mono transition-all cursor-pointer ${
            isDroneOn
              ? 'bg-purple-950/80 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
              : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className={`w-3.5 h-3.5 ${isDroneOn ? 'text-purple-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="hidden sm:inline font-bold">Ambient Drone</span>
          {/* Animated 4-Bar Equalizer */}
          <div className="flex items-end gap-[2px] h-3">
            {[0.8, 1.4, 0.6, 1.1].map((scale, i) => (
              <motion.span
                key={i}
                animate={isDroneOn ? { height: ['20%', `${scale * 80}%`, '30%'] } : { height: '25%' }}
                transition={isDroneOn ? { duration: 0.6 + i * 0.15, repeat: Infinity, repeatType: 'reverse' } : {}}
                className={`w-[2.5px] rounded-full ${isDroneOn ? 'bg-cyan-400' : 'bg-slate-600'}`}
              />
            ))}
          </div>
        </button>

        <button
          onClick={handleToggleSound}
          onMouseEnter={() => audioSynth.playGlassClick()}
          title={soundEnabled ? 'Mute Interactive Sound FX' : 'Enable Interactive Sound FX'}
          className={`p-2 rounded-full border backdrop-blur-xl transition-all cursor-pointer ${
            soundEnabled
              ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
              : 'bg-slate-950/70 border-white/10 text-slate-500 hover:text-slate-300'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* Floating Apple-Inspired Cult-UI Glassmorphic Magnification Dock */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="fixed bottom-6 inset-x-0 mx-auto w-max max-w-[95vw] z-50 pointer-events-auto"
        aria-label="Interactive Navigation Dock"
      >
        <div className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-3xl bg-slate-950/80 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.15)] ring-1 ring-white/10 overflow-x-auto no-scrollbar">
          
          {/* Subtle Ambient Laser Edge Line */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

          {/* Section Navigation Items */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => (
              <DockIconItem
                key={item.id}
                item={item}
                mouseX={mouseX}
                isActive={activeSection === item.id && !isTerminalMode}
              />
            ))}
          </div>

          {/* Vertical Glassmorphic Divider */}
          <div className="w-[1px] h-8 bg-white/15 mx-1 flex-shrink-0" />

          {/* Quick Tools & Modal Trigger Items */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {toolItems.map((item) => (
              <DockIconItem
                key={item.id}
                item={item}
                mouseX={mouseX}
                isActive={item.id === 'cli-terminal' && isTerminalMode}
              />
            ))}
          </div>

        </div>
      </motion.nav>
    </>
  );
};
