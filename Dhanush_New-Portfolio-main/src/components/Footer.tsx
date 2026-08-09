import React from 'react';
import { Github, Linkedin, Mail, Heart, Sparkles, ArrowUp } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div>
          <p className="text-sm font-bold text-white">
            DHANUSH GOPI KAVALA
          </p>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            Software Engineer • MERN Stack & AI Vision • Vercel Ready
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-slate-400">
          <a
            href={RESUME_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={RESUME_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${RESUME_DATA.personal.email}`}
            className="hover:text-white transition-colors"
          >
            Email
          </a>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-slate-500">
            &copy; {new Date().getFullYear()} Dhanush Gopi Kavala
          </span>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
