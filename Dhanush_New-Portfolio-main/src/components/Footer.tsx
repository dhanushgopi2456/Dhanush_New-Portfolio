import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 border-t border-white/10 bg-slate-950/90 text-slate-400 text-xs relative z-10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div>
          <p className="text-base font-extrabold text-white tracking-tight">
            DHANUSH GOPI KAVALA
          </p>
          <p className="text-[11px] text-cyan-400/90 font-mono mt-0.5 tracking-wider">
            Software Engineer • MERN Stack & AI Vision • Vercel Ready
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-slate-300 font-medium">
          <a
            href={RESUME_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={RESUME_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${RESUME_DATA.personal.email}`}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
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
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-white border border-white/10 transition-colors shadow-lg shadow-black/40"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};
