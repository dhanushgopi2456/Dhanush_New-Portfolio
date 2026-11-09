import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp, Sparkles, Send, Zap } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { MagneticButton } from './MagneticButton';
import { audioSynth } from '../utils/audioSynth';
import { ButtonGlare } from './ui/button-glare';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioSynth.playLaserBlip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchCollaboration = () => {
    audioSynth.playSuccessChime();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(`mailto:${RESUME_DATA.personal.email}?subject=Collaboration%20Inquiry%20from%20Portfolio`, '_blank');
    }
  };

  return (
    <footer className="pt-20 pb-28 border-t border-white/10 bg-slate-950/95 text-slate-400 text-xs relative z-10 backdrop-blur-2xl overflow-hidden">
      
      {/* Background Cosmic Portal Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-cyan-500/10 via-purple-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Flagship Magnetic 3D "Launch Collaboration" Portal Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group">
          
          {/* Shimmer laser border */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open to Full-Time Software Engineering & AI Roles</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to engineer something <span className="liquid-gradient-text">extraordinary</span>?
            </h3>
            <p className="text-slate-400 font-mono text-xs max-w-lg">
              Let's connect to discuss software architecture, MERN microservices, computer vision pipelines, or high-performance frontend engineering.
            </p>
          </div>

          {/* Magnetic 3D "Launch Collaboration" Portal Button */}
          <MagneticButton strength={0.4}>
            <button
              onClick={handleLaunchCollaboration}
              onMouseEnter={() => audioSynth.playGlassClick()}
              className="relative overflow-hidden group/btn px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold font-mono text-sm tracking-wide shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all transform hover:scale-105 cursor-pointer flex items-center gap-3"
            >
              <ButtonGlare radius={20} intensity={0.6} frontColor={{ r: 0.1, g: 0.9, b: 0.95, a: 1 }} />
              <Zap className="w-4 h-4 text-slate-950 fill-current animate-bounce" />
              <span className="relative z-10 text-white drop-shadow-md">Launch Collaboration</span>
              <Send className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </MagneticButton>

        </div>

        {/* Footer Meta Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
          
          {/* Brand */}
          <div>
            <p className="text-base font-extrabold text-white tracking-tight">
              DHANUSH GOPI KAVALA
            </p>
            <p className="text-[11px] text-cyan-400/90 font-mono mt-0.5 tracking-wider">
              B.Tech CSE Graduate (9.04 CGPA) • MERN Stack & AI Vision Engineer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-slate-300 font-medium">
            <a
              href={RESUME_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioSynth.playGlassClick()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-mono text-xs"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={RESUME_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioSynth.playGlassClick()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-mono text-xs"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${RESUME_DATA.personal.email}`}
              onMouseEnter={() => audioSynth.playGlassClick()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-mono text-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Copyright & Scroll Top Button */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-slate-500">
              &copy; {new Date().getFullYear()} Dhanush Gopi Kavala
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              onMouseEnter={() => audioSynth.playGlassClick()}
              className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-white border border-white/10 transition-colors shadow-lg shadow-black/40 cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>

        </div>

      </div>
    </footer>
  );
};
