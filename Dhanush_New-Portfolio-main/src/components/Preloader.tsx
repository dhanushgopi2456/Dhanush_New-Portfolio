import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [statusMessage, setStatusMessage] = useState('BOOTING LUXURY ENGINE...');

  useEffect(() => {
    const messages = [
      'INITIALIZING WEBGL 3D SHADER PIPELINE...',
      'LOADING MERN STACK DATA STRUCTURES...',
      'CALIBRATING YOLOV9 AI VISION WEIGHTS...',
      'SYNCHRONIZING 900+ ALGORITHMIC MILESTONES...',
      'SPATIAL ZERO-GRAVITY ENVIRONMENT READY'
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const step = Math.floor(Math.random() * 3) + 2;
        const next = Math.min(prev + step, 100);

        if (next < 25) setStatusMessage(messages[0]);
        else if (next < 50) setStatusMessage(messages[1]);
        else if (next < 75) setStatusMessage(messages[2]);
        else if (next < 95) setStatusMessage(messages[3]);
        else setStatusMessage(messages[4]);

        if (next >= 100) {
          clearInterval(timer);
          audioSynth.playSuccessChime();
          // Trigger zero-gravity camera shutter split
          setTimeout(() => {
            setIsOpening(true);
            setTimeout(() => {
              onComplete();
            }, 850);
          }, 350);
          return 100;
        }

        return next;
      });
    }, 28);

    return () => clearInterval(timer);
  }, [onComplete]);

  const formattedProgress = progress.toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden select-none">
      
      {/* Upper Camera Shutter Blade */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpening ? '-100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#030712] border-b border-cyan-500/30 flex items-end justify-center z-20 shadow-[0_15px_60px_rgba(6,182,212,0.25)]"
      >
        {/* Upper Sci-Fi Tech Lines */}
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-6 left-8 flex items-center gap-2 font-mono text-[11px] text-cyan-400 font-bold tracking-widest">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>SYS.PORTFOLIO // v2.6 FLAGSHIP</span>
        </div>
        <div className="absolute top-6 right-8 font-mono text-[11px] text-slate-500">
          SECURE CONNECTION: 9.04 CGPA
        </div>
      </motion.div>

      {/* Lower Camera Shutter Blade */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isOpening ? '100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#030712] border-t border-purple-500/30 flex items-start justify-center z-20 shadow-[0_-15px_60px_rgba(168,85,247,0.25)]"
      >
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute bottom-6 left-8 font-mono text-[11px] text-slate-500">
          DHANUSH GOPI KAVALA // SOFTWARE ENGINEER
        </div>
        <div className="absolute bottom-6 right-8 font-mono text-[11px] text-purple-400 font-bold flex items-center gap-2">
          <span>ZERO-G SHUTTER APERTURE</span>
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
        </div>
      </motion.div>

      {/* Center Stage & Morphing Monogram Content */}
      <motion.div
        animate={{
          opacity: isOpening ? 0 : 1,
          scale: isOpening ? 1.4 : 1,
        }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6"
      >
        {/* Multi-layered Neon Ambient Aura */}
        <div className="absolute w-[520px] h-[520px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute w-[360px] h-[360px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Center Container */}
        <div className="relative flex flex-col items-center text-center space-y-7 max-w-sm w-full">
          
          {/* Morphing Monogram SVG for DGK */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            
            {/* Rotating Outer Hexagonal Laser Frame */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <polygon
                points="50 3, 90 25, 90 75, 50 97, 10 75, 10 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="opacity-70"
              />
            </motion.svg>

            {/* Counter-Rotating Inner Square Aperture */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 border border-purple-500/40 rounded-2xl pointer-events-none"
            />

            {/* Center Monogram Tile */}
            <div className="relative w-16 h-16 rounded-2xl bg-slate-950/90 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-cyan-950/60 overflow-hidden group">
              <span className="font-extrabold text-2xl font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-indigo-300 to-purple-400">
                DGK
              </span>
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12"
              />
            </div>
          </div>

          {/* Large High-Contrast Glowing Cyan Counter (00 - 100) */}
          <div className="space-y-1">
            <div className="flex items-baseline justify-center gap-1 font-mono">
              <motion.span 
                key={formattedProgress}
                initial={{ opacity: 0.8, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-300 tracking-tighter drop-shadow-[0_0_35px_rgba(34,211,238,0.7)]"
              >
                {formattedProgress}
              </motion.span>
              <span className="text-xl font-bold text-cyan-400/80 font-mono">%</span>
            </div>
            
            <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              {statusMessage}
            </p>
          </div>

          {/* Glowing Laser Progress Bar */}
          <div className="w-full space-y-2">
            <div className="w-full h-2.5 rounded-full bg-slate-950/90 border border-slate-800 overflow-hidden p-[2px] shadow-inner relative">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_#22d3ee] relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
              </motion.div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>INITIALIZING CORES</span>
              <span>STANDBY FOR SHUTTER APERTURE</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
