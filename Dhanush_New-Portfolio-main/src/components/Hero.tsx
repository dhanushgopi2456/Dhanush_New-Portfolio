import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Award, 
  Code2, 
  Brain, 
  GraduationCap, 
  CheckCircle2, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ExternalLink,
  Camera,
  Layers,
  Zap
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { PORTFOLIO_PHOTOS } from '../data/photos';
import { VoiceSpeakerControl } from './VoiceSpeakerControl';
import { subscribeSpeechState, VoiceSpeakerState } from '../utils/speechUtils';

interface HeroProps {
  onOpenPdfModal: () => void;
  onOpenAiDrawer: () => void;
  onExploreClick: () => void;
}

const ROLES = [
  "MERN Stack Developer",
  "Full Stack Software Engineer",
  "YOLOv9 Computer Vision Researcher",
  "Java & Python Algorithm Specialist",
  "B.Tech CSE Graduate (9.04 CGPA)"
];

const AVAILABILITY_STATUSES = [
  "Available for Software Engineering Roles",
  "Open to Full Stack & MERN Remote Roles",
  "YOLOv9 AI & Computer Vision Collaborations"
];

// Dynamic Count-Up Hook Component for Metrics
const AnimatedCounter: React.FC<{ target: number; suffix?: string; decimals?: number; duration?: number }> = ({
  target,
  suffix = '',
  decimals = 0,
  duration = 2
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // EaseOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * target;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenPdfModal, onOpenAiDrawer, onExploreClick }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Typewriter effect for "Hello World! I am"
  const fullTypewriter = "Hello World! I am";
  const [typewriterText, setTypewriterText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Card cursor spotlight coordinate state
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });
  const [cardHovered, setCardHovered] = useState(false);
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Voice Narration listener for live visualizer
  const [speechState, setSpeechState] = useState<VoiceSpeakerState>({
    isSpeaking: false,
    isPaused: false,
    currentText: ''
  });

  useEffect(() => {
    const unsubscribe = subscribeSpeechState((state) => {
      setSpeechState(state);
    });
    return () => unsubscribe();
  }, []);

  // Terminal typewriter execution on mount
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullTypewriter.length) {
        setTypewriterText(fullTypewriter.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 70);

    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  // Role cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentPhoto = PORTFOLIO_PHOTOS[activePhotoIndex];

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.3); // E5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.7);
      } catch (e) {
        console.error('Audio playback exception', e);
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!profileCardRef.current) return;
    const rect = profileCardRef.current.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Staggered 3D character array for "Dhanush Gopi Kavala"
  const firstName = "Dhanush Gopi";
  const lastName = "Kavala";

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden dot-pattern">
      
      {/* Multi-layered Ambient Radial Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Interactive Status Pill with Pulsing Emerald Radar Wave */}
            <div className="relative inline-block">
              {/* Concentric Pulsing Radar Rings */}
              <span className="radar-ring" />
              <span className="radar-ring" style={{ animationDelay: '0.8s' }} />
              <span className="radar-ring" style={{ animationDelay: '1.6s' }} />

              <button
                onClick={() => setStatusIndex((prev) => (prev + 1) % AVAILABILITY_STATUSES.length)}
                className="relative z-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 backdrop-blur-xl shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 group"
                title="Click to cycle status mode"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-bold text-emerald-300 tracking-wide uppercase font-mono"
                  >
                    {AVAILABILITY_STATUSES[statusIndex]}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            {/* Main Greeting & 3D Staggered Name Reveal */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Terminal Typewriter Greeting */}
                <div className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-sm sm:text-base font-mono font-semibold text-cyan-400 flex items-center shadow-inner">
                  <span>{typewriterText}</span>
                  <span className={`inline-block w-2 h-4 ml-1 bg-cyan-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                
                {/* Audio Synth Toggle with Live Visualizer Waveform */}
                <button
                  onClick={handleToggleAudio}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                    isPlayingAudio
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:border-cyan-500/40'
                  }`}
                  title="Play audio greeting chime"
                >
                  {isPlayingAudio ? (
                    <div className="flex items-center gap-0.5 h-3.5">
                      <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-bounce" />
                    </div>
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{isPlayingAudio ? 'Sound Playing' : 'Sound On'}</span>
                </button>
              </div>

              {/* 3D Staggered Character Reveal Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight [perspective:1000px]">
                <span className="inline-block">
                  {firstName.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 35, rotateX: 60, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block transform-gpu"
                      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <br />
                <span className="liquid-gradient-text inline-block">
                  {lastName.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 35, rotateX: 60, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block transform-gpu"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Cycling Animated Role Text */}
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-slate-400 text-lg sm:text-2xl mr-2 font-light">Specialized in</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Professional Summary Excerpt */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Results-driven Computer Science Graduate specialized in building high-performance <strong className="text-white font-semibold">MERN Stack applications</strong>, scalable <strong className="text-white font-semibold">REST APIs</strong>, and deep learning models with <strong className="text-white font-semibold">PyTorch & YOLOv9</strong>.
            </p>

            {/* Primary Action Buttons with Magnetic Pull */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              {/* Voice Speaker Narration Button with Live Waveform */}
              <VoiceSpeakerControl />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreClick}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all border border-blue-400/30 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenAiDrawer}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-purple-300 border border-purple-500/40 hover:border-purple-400 font-bold text-sm shadow-lg shadow-purple-950/30 transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>Ask Dhanush AI</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenPdfModal}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500 font-bold text-sm transition-all shadow-md"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Resume PDF</span>
              </motion.button>
            </div>

            {/* Social Links & Location */}
            <div className="flex flex-wrap items-center gap-6 pt-3 text-slate-400 text-xs sm:text-sm">
              <a 
                href={RESUME_DATA.personal.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <div className="p-1 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-blue-500 transition-colors">
                  <Github className="w-3.5 h-3.5 text-slate-300" />
                </div>
                <span>github.com/dhanushgopi2456</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <div className="p-1 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-emerald-500 transition-colors">
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-slate-300" />}
                </div>
                <span>{copiedEmail ? 'Email Copied!' : RESUME_DATA.personal.email}</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: 3D Physics-Based Floating Rig (perspective: 1200px) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div 
              ref={profileCardRef}
              onMouseMove={handleProfileMouseMove}
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
              className="relative w-full max-w-md h-[580px] sm:h-[620px] [perspective:1200px]"
            >
              
              {/* Multi-Color Neon Aura Behind Rig */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 rounded-[32px] blur-2xl opacity-45 animate-pulse-glow" />

              {/* Continuous Zero-Gravity Levitation Rig */}
              <motion.div
                animate={{
                  y: [-9, 9, -9],
                  rotateX: [-3, 3, -3],
                  rotateY: [-2.5, 2.5, -2.5],
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full relative [transform-style:preserve-3d]"
              >
                {/* 3D Flip Card Container with Spring-Loaded Physics */}
                <motion.div
                  initial={false}
                  animate={{ rotateY: isPhotoFlipped ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="w-full h-full relative [transform-style:preserve-3d]"
                >
                  
                  {/* FRONT SIDE (Headshot Photo Showcase) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] bg-slate-900/60 rounded-[30px] p-3 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden group">
                    
                    {/* Continuous 360 Laser Border Beam */}
                    <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                      <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#3b82f6_120deg,#ec4899_180deg,#8b5cf6_240deg,transparent_300deg)] opacity-60" />
                    </div>

                    {/* Cursor-Tracked Spotlight */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                      style={{
                        opacity: cardHovered ? 1 : 0,
                        background: `radial-gradient(400px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(99, 102, 241, 0.25), transparent 70%)`,
                      }}
                    />

                    {/* Photo Frame */}
                    <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-slate-950/90 border border-slate-800/80 flex items-center justify-center p-1">
                      <img
                        src={currentPhoto.url}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = currentPhoto.fallbackUrl;
                        }}
                        alt={currentPhoto.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full rounded-xl transition-all duration-700 object-cover object-[center_5%] scale-100 sm:scale-105 group-hover:scale-110"
                      />

                      {/* Holographic Glare Overlay */}
                      <div className="absolute inset-0 holographic-foil opacity-30 group-hover:opacity-60 transition-opacity" />

                      {/* Subtle Vignette Gradient */}
                      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />

                      {/* Top Action Control Bar */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => setIsPhotoFlipped(true)}
                          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/50 text-amber-300 text-[11px] font-mono font-bold backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Flip Card 🔄</span>
                        </motion.button>

                        <div className="px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/50 text-[11px] font-bold text-cyan-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                          <Award className="w-3.5 h-3.5 text-cyan-400" />
                          <span>CGPA 9.04</span>
                        </div>
                      </div>

                      {/* Title Banner Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/85 border border-white/10 backdrop-blur-xl shadow-xl">
                        <div>
                          <p className="text-xs font-extrabold text-white tracking-wide">
                            Dhanush Gopi Kavala
                          </p>
                          <p className="text-[11px] text-cyan-400 font-mono">
                            Software Engineer & Full Stack Developer
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Photo Switcher Bar */}
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between px-1">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                        <Camera className="w-3.5 h-3.5 text-blue-400" />
                        <span>Asset Switcher:</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {PORTFOLIO_PHOTOS.map((photo, index) => (
                          <button
                            key={photo.id}
                            onClick={() => setActivePhotoIndex(index)}
                            className={`w-8 h-8 rounded-lg overflow-hidden border transition-all ${
                              activePhotoIndex === index 
                                ? 'border-cyan-400 scale-110 shadow-lg shadow-cyan-500/40 ring-1 ring-cyan-400' 
                                : 'border-slate-700 opacity-60 hover:opacity-100'
                            }`}
                            title={photo.title}
                          >
                            <img 
                              src={photo.url} 
                              alt={photo.title}
                              onError={(e) => { (e.currentTarget as HTMLImageElement).src = photo.fallbackUrl; }}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* BACK SIDE (Developer Bio File) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900/90 border border-blue-500/40 rounded-[30px] p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
                    
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-cyan-400" />
                          <h4 className="font-bold text-white text-base">Developer Quick File</h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
                          CSE '26
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                          <p className="text-[10px] font-mono text-slate-400 uppercase">Education & Score</p>
                          <p className="text-xs font-bold text-white mt-0.5">Sri Vasavi Engineering College (Nov 2022 - July 2026)</p>
                          <p className="text-xs text-cyan-400 font-mono font-bold">9.04 / 10 CGPA (82.88%)</p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                          <p className="text-[10px] font-mono text-slate-400 uppercase">Internship Experience</p>
                          <p className="text-xs font-bold text-white mt-0.5">Codec Technologies Pvt. Ltd.</p>
                          <p className="text-[11px] text-slate-300">MERN Stack Developer (Jan - Mar 2026)</p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[10px] font-mono text-slate-400 uppercase">Published Research Paper</p>
                            <a
                              href="https://github.com/dhanushgopi2456/My_Certifications/blob/main/ResearchPaper_Certificate.jpeg"
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-mono text-amber-400 hover:underline flex items-center gap-1 font-bold"
                            >
                              <span>Certificate</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                          <p className="text-xs font-bold text-white mt-0.5">YOLOv9 Deep Learning Vision Paper</p>
                          <p className="text-[11px] text-slate-300">Published IEEE Conference AIDE-2024</p>
                        </div>
                      </div>
                    </div>

                    {/* Back Action Bar */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono transition-all"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                        <span>Copy Email</span>
                      </button>

                      <button
                        onClick={() => setIsPhotoFlipped(false)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Back to Photo</span>
                      </button>
                    </div>

                  </div>

                </motion.div>

                {/* Orbiting Floating Badges with Subtle 3D Parallax */}
                <motion.div
                  animate={{
                    y: [6, -6, 6],
                    x: [-3, 3, -3],
                  }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -left-4 px-3.5 py-2 rounded-2xl bg-slate-950/90 border border-blue-500/40 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-semibold text-slate-200 z-30"
                >
                  <div className="p-1 rounded-lg bg-blue-500/20 text-cyan-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span>React & Node MERN</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [-6, 6, -6],
                    x: [3, -3, 3],
                  }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 px-3.5 py-2 rounded-2xl bg-slate-950/90 border border-purple-500/40 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-semibold text-slate-200 z-30"
                >
                  <div className="p-1 rounded-lg bg-purple-500/20 text-purple-400">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span>YOLOv9 AI Model</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [4, -4, 4],
                    x: [2, -2, 2],
                  }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 -right-6 px-3 py-1.5 rounded-2xl bg-slate-950/90 border border-amber-500/40 shadow-xl backdrop-blur-xl flex items-center gap-1.5 text-xs font-bold text-amber-300 z-30 hidden sm:flex"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>CGPA 9.04</span>
                </motion.div>

              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Dynamic Metric Cards with Viewport Count-Up & Glowing Bottom Sweeps */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {/* Card 1: 9.04 CGPA */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/25 transition-all" />
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
              <AnimatedCounter target={9.04} decimals={2} />
            </p>
            <p className="text-xs font-bold text-slate-200 mt-1 uppercase tracking-wider">
              {RESUME_DATA.personal.stats[0].label}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {RESUME_DATA.personal.stats[0].sub}
            </p>
            {/* Glowing Bottom Border Sweep */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-border-sweep" />
          </div>

          {/* Card 2: 900+ Solved */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-purple-500/50 transition-all">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/25 transition-all" />
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
              <AnimatedCounter target={900} suffix="+" />
            </p>
            <p className="text-xs font-bold text-slate-200 mt-1 uppercase tracking-wider">
              {RESUME_DATA.personal.stats[1].label}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {RESUME_DATA.personal.stats[1].sub}
            </p>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-border-sweep" />
          </div>

          {/* Card 3: 6 Certifications */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/25 transition-all" />
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
              <AnimatedCounter target={6} />
            </p>
            <p className="text-xs font-bold text-slate-200 mt-1 uppercase tracking-wider">
              {RESUME_DATA.personal.stats[2].label}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {RESUME_DATA.personal.stats[2].sub}
            </p>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-sweep" />
          </div>

          {/* Card 4: AIDE-2024 Research */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/25 transition-all" />
            <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-mono tracking-tight">
              AIDE-2024
            </p>
            <p className="text-xs font-bold text-slate-200 mt-1 uppercase tracking-wider">
              {RESUME_DATA.personal.stats[3].label}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {RESUME_DATA.personal.stats[3].sub}
            </p>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-border-sweep" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
