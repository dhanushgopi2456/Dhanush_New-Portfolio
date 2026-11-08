import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Sparkles, Terminal, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing Developer Portfolio...');

  useEffect(() => {
    const messages = [
      'Loading MERN Stack Core Modules...',
      'Verifying ServiceNow & Azure Certifications...',
      'Configuring YOLOv9 Deep Learning Vision Models...',
      'Connecting Competitive Coding Stats (900+ Solved)...',
      'Portfolio Environment Ready!'
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }

        if (next < 25) setStatusMessage(messages[0]);
        else if (next < 50) setStatusMessage(messages[1]);
        else if (next < 75) setStatusMessage(messages[2]);
        else if (next < 95) setStatusMessage(messages[3]);
        else setStatusMessage(messages[4]);

        return next;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white p-6 dot-pattern"
    >
      {/* Ambient Radial Spotlight */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-6">
        
        {/* Animated Brand Logo Ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-blue-500/40 flex items-center justify-center shadow-2xl relative overflow-hidden">
            <span className="text-3xl font-extrabold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              DGK
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-3 border-2 border-dashed border-blue-500/30 rounded-3xl pointer-events-none"
          />
        </div>

        {/* Name and Subtitle */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Dhanush Gopi Kavala
          </h2>
          <p className="text-xs font-mono text-blue-400">
            Full Stack Engineer & AI Enthusiast
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>{statusMessage}</span>
            </span>
            <span className="text-blue-400 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-blue-500/50"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* System Badges Ticker */}
        <div className="flex items-center gap-3 pt-2 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            React 19 & Tailwind v4
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            CGPA 9.04
          </span>
        </div>

      </div>
    </motion.div>
  );
};
