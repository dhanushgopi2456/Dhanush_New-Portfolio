import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronRight,
  MapPin,
  Flame,
  Camera,
  RotateCw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Building2,
  ExternalLink
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { PORTFOLIO_PHOTOS } from '../data/photos';
import { VoiceSpeakerControl } from './VoiceSpeakerControl';

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

export const Hero: React.FC<HeroProps> = ({ onOpenPdfModal, onOpenAiDrawer, onExploreClick }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentPhoto = PORTFOLIO_PHOTOS[activePhotoIndex];

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      // Play a crisp pleasant audio beep/synth chord using Web Audio API
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.3); // E5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
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

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden dot-pattern">
      
      {/* Ambient Radial Spotlight Beams */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Interactive Status Pill */}
            <button
              onClick={() => setStatusIndex((prev) => (prev + 1) % AVAILABILITY_STATUSES.length)}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-md shadow-inner transition-all hover:scale-105"
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
                  className="text-xs font-semibold text-emerald-300 tracking-wide uppercase"
                >
                  {AVAILABILITY_STATUSES[statusIndex]}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-sm sm:text-base font-mono font-medium text-blue-400">
                  Hello World! I am
                </p>
                
                {/* Audio Synth Toggle Button */}
                <button
                  onClick={handleToggleAudio}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono flex items-center gap-1.5 transition-all"
                  title="Play audio greeting chime"
                >
                  {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudio ? 'Playing Chime' : 'Sound On'}</span>
                </button>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                Dhanush Gopi <br />
                <span className="gradient-text">Kavala</span>
              </h1>
            </div>

            {/* Cycling Animated Role Text */}
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-slate-400 text-lg sm:text-2xl mr-2 font-light">Specialized in</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
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

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              {/* Voice Speaker Narration Button */}
              <VoiceSpeakerControl />

              <button
                onClick={onExploreClick}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiDrawer}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-purple-300 border border-purple-500/40 hover:border-purple-400 font-semibold text-sm shadow-lg shadow-purple-950/20 transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Ask Dhanush AI</span>
              </button>

              <button
                onClick={onOpenPdfModal}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500 font-semibold text-sm transition-all hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Resume PDF</span>
              </button>
            </div>

            {/* Social Links & Location */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-slate-400 text-xs sm:text-sm">
              <a 
                href={RESUME_DATA.personal.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>github.com/dhanushgopi2456</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-slate-300" />}
                <span>{copiedEmail ? 'Email Copied!' : RESUME_DATA.personal.email}</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: 3D Flip Photo Showcase Card (Uploaded Image Headshot Front + Quick Bio Back) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-md h-[580px] sm:h-[620px] [perspective:1000px]">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-40 animate-pulse-glow" />

              {/* 3D Flip Card Inner Container */}
              <motion.div
                initial={false}
                animate={{ rotateY: isPhotoFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full relative [transform-style:preserve-3d]"
              >
                
                {/* FRONT SIDE (Official Headshot & Full Body Photo Showcase) */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-slate-900/95 rounded-3xl p-3 border border-slate-800/80 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden">
                  
                  {/* Photo Frame - Maximized to show Face & Body */}
                  <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-slate-950/90 group border border-slate-800/60 flex items-center justify-center p-1">
                    <img
                      src={currentPhoto.url}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = currentPhoto.fallbackUrl;
                      }}
                      alt={currentPhoto.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-xl transition-all duration-500 object-cover object-[center_5%] scale-100 sm:scale-105"
                    />

                    {/* Subtle Gradient Overlay at bottom only */}
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Top Action Control Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                      {/* Top Left Flip Trigger */}
                      <button
                        onClick={() => setIsPhotoFlipped(true)}
                        className="px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Card</span>
                      </button>

                      {/* Top Right Floating CGPA Badge */}
                      <div className="px-3 py-1 rounded-full bg-slate-900/90 border border-blue-500/40 text-[11px] font-semibold text-blue-300 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                        <Award className="w-3.5 h-3.5 text-blue-400" />
                        <span>CGPA 9.04</span>
                      </div>
                    </div>

                    {/* Title Banner Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 backdrop-blur-md">
                      <div>
                        <p className="text-xs font-bold text-white tracking-wide">
                          Dhanush Gopi Kavala
                        </p>
                        <p className="text-[11px] text-blue-300 font-mono">
                          Software Engineer & Full Stack Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Photo Switcher Bar */}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between px-1">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Camera className="w-3.5 h-3.5 text-blue-400" />
                      <span>Select Asset Photo:</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      {PORTFOLIO_PHOTOS.map((photo, index) => (
                        <button
                          key={photo.id}
                          onClick={() => setActivePhotoIndex(index)}
                          className={`w-8 h-8 rounded-lg overflow-hidden border transition-all ${
                            activePhotoIndex === index 
                              ? 'border-blue-400 scale-110 shadow-md shadow-blue-500/30 ring-1 ring-blue-400' 
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

                {/* BACK SIDE (Flipped Quick Bio Card) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 border border-blue-500/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                  
                  <div>
                    {/* Back Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                        <h4 className="font-bold text-white text-base">Developer Quick File</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
                        CSE '26
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                        <p className="text-[10px] font-mono text-slate-400 uppercase">Education & CGPA</p>
                        <p className="text-xs font-bold text-white mt-0.5">Sri Vasavi Engineering College (Nov 2022 - July 2026)</p>
                        <p className="text-xs text-blue-300 font-mono">9.04 / 10 CGPA (82.88%)</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                        <p className="text-[10px] font-mono text-slate-400 uppercase">Internship Experience</p>
                        <p className="text-xs font-bold text-white mt-0.5">Codec Technologies Pvt. Ltd.</p>
                        <p className="text-[11px] text-slate-300">MERN Stack Developer (Jan - Mar 2026)</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
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
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                      <span>Copy Email</span>
                    </button>

                    <button
                      onClick={() => setIsPhotoFlipped(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Flip Back to Photo</span>
                    </button>
                  </div>

                </div>

              </motion.div>

              {/* Floating Tech Badges */}
              <div className="absolute -top-4 -left-4 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-slate-200">
                <div className="p-1 rounded-lg bg-blue-500/20 text-blue-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <span>React & Node MERN</span>
              </div>

              <div className="absolute -bottom-4 -right-4 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-slate-200">
                <div className="p-1 rounded-lg bg-purple-500/20 text-purple-400">
                  <Brain className="w-4 h-4" />
                </div>
                <span>YOLOv9 AI Model</span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Stats Grid Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {RESUME_DATA.personal.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="glass-card p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden group hover:border-blue-500/40 transition-all"
            >
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/15 transition-all" />
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-slate-200 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {stat.sub}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
