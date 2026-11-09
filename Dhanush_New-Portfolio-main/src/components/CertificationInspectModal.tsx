import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Award, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  RotateCw
} from 'lucide-react';
import { Certification } from '../data/resumeData';
import { audioSynth } from '../utils/audioSynth';
import { ButtonGlare } from './ui/button-glare';

interface CertificationInspectModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertificationInspectModal: React.FC<CertificationInspectModalProps> = ({ cert, onClose }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!cert) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: -yPct * 45, // tilt up/down
      y: xPct * 55,  // rotate left/right
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleCopyCode = () => {
    audioSynth.playSuccessChime();
    navigator.clipboard.writeText(cert.badgeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        
        {/* Spatial Dimmed Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-0"
        />

        {/* 3D Inspect Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl flex flex-col items-center"
        >
          {/* Top Close Bar */}
          <div className="w-full flex justify-between items-center mb-4 px-2">
            <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>3D HOLOGRAPHIC BADGE INSPECTOR // MOVE CURSOR TO ROTATE</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Rotatable Hallmark Holographic Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-[460px] [perspective:1400px] cursor-grab active:cursor-grabbing select-none"
          >
            <motion.div
              animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full relative rounded-3xl p-8 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.3)] bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/95 flex flex-col justify-between overflow-hidden group"
            >
              {/* Dynamic Iridescent CSS Foil Shimmer */}
              <div 
                className="absolute inset-0 pointer-events-none holographic-foil opacity-75 group-hover:opacity-100 transition-opacity"
                style={{
                  backgroundPosition: `${50 + rotation.y * 1.5}% ${50 + rotation.x * 1.5}%`
                }}
              />

              {/* 360 Laser Perimeter Beam */}
              <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#10b981_120deg,#06b6d4_180deg,#8b5cf6_240deg,transparent_300deg)] opacity-60" />
              </div>

              {/* Card Top: Issuer & Date */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-emerald-400 shadow-xl shadow-emerald-950/40">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      {cert.issuer}
                    </span>
                    <p className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Issued: {cert.date}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                  OFFICIAL BADGE
                </span>
              </div>

              {/* Card Center: Title & Skills */}
              <div className="relative z-10 space-y-4 my-2">
                <h3 className="text-2xl font-extrabold text-white leading-snug">
                  {cert.title}
                </h3>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
                    Validated Competencies:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {cert.skillsValidated.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom: Verification ID & Action Buttons */}
              <div className="relative z-10 pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Badge ID: <strong className="text-emerald-300 font-bold">{cert.badgeCode}</strong></span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={cert.githubCertUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/15 text-xs font-bold transition-all shadow-md"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub Proof</span>
                  </a>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <span>Verify Official</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

          <p className="text-[11px] font-mono text-slate-500 mt-4">
            Interactive Dynamic Point Light active • Click outside to dismiss
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
