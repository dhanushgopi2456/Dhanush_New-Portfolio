import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  RotateCw, 
  Github, 
  Copy, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';

export const Certifications: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');

  // Mouse tracking for card spotlights
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(idx);
  };

  const issuers = ['all', ...Array.from(new Set(RESUME_DATA.certifications.map(c => c.issuer)))];

  const filteredCerts = RESUME_DATA.certifications.filter(c => selectedIssuer === 'all' || c.issuer === selectedIssuer);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="certifications" className="py-24 relative z-10 border-t border-white/10 bg-slate-950/25 backdrop-blur-[2px]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered 3D Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-emerald-950/20">
            <Award className="w-4 h-4" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Industry Certifications & <br />
            <span className="liquid-gradient-text">Interactive Flip Cards</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Click any badge card to flip and inspect verified skill competencies, official verification links, and GitHub certificate repositories.
          </p>
        </motion.div>

        {/* Issuer Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl inline-flex flex-wrap gap-2 backdrop-blur-xl shadow-xl">
            {issuers.map((iss) => (
              <button
                key={iss}
                onClick={() => setSelectedIssuer(iss)}
                className={`relative overflow-hidden group px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all capitalize ${
                  selectedIssuer === iss
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-white/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ButtonGlare radius={12} intensity={selectedIssuer === iss ? 0.6 : 0.3} frontColor={{ r: 0.1, g: 0.8, b: 0.6, a: 1 }} />
                <span className="relative z-10">{iss === 'all' ? 'All Issuers' : iss}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid with 3D Tilt & Spring Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => {
            const isFlipped = !!flippedCards[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={(e) => handleCardMouseMove(e, idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="h-[340px] [perspective:1200px] group cursor-pointer select-none transform-gpu"
                onClick={() => toggleFlip(idx)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full relative rounded-[28px]"
                >
                  {/* FRONT SIDE */}
                  <div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="absolute inset-0 glass-card p-6 sm:p-7 rounded-[28px] border border-white/10 flex flex-col justify-between group-hover:border-emerald-500/50 transition-colors shadow-2xl overflow-hidden"
                  >
                    {/* 360 Continuous Laser Border Beam */}
                    <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                      <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#10b981_120deg,#06b6d4_180deg,#8b5cf6_240deg,transparent_300deg)] opacity-35 group-hover:opacity-85 transition-opacity" />
                    </div>

                    {/* Holographic Foil Glare */}
                    <div className="absolute inset-0 holographic-foil opacity-25 group-hover:opacity-60 transition-opacity" />

                    {/* Cursor-tracked internal radial spotlight */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                      style={{
                        opacity: hoveredIndex === idx ? 1 : 0,
                        background: `radial-gradient(350px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(16, 185, 129, 0.2), transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {cert.date}
                        </span>
                      </div>

                      {/* Issuer Badge */}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                        {cert.issuer}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-extrabold text-white mt-3 group-hover:text-emerald-300 transition-colors leading-snug">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                      <span className="text-[11px] font-mono text-slate-400 font-bold">
                        ID: {cert.badgeCode}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="relative overflow-hidden group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-mono font-bold transition-all border border-emerald-500/30 shadow-md"
                      >
                        <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.1, g: 0.9, b: 0.6, a: 1 }} />
                        <span className="relative z-10 flex items-center gap-1.5">
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Flip Card 🔄</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                    className="absolute inset-0 glass-card p-6 sm:p-7 rounded-[28px] border border-emerald-500/40 flex flex-col justify-between shadow-2xl bg-slate-900/90 backdrop-blur-2xl overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Validated Competencies</span>
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip(idx);
                          }}
                          className="relative overflow-hidden group px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] font-mono transition-colors"
                        >
                          <ButtonGlare radius={8} intensity={0.3} />
                          <span className="relative z-10">Flip Back ↩️</span>
                        </button>
                      </div>

                      {/* Validated Skills Bullets */}
                      <div className="mt-3.5 space-y-2">
                        {cert.skillsValidated.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Back Actions: Verify & GitHub Links */}
                    <div className="pt-4 border-t border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Badge Code: {cert.badgeCode}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCode(cert.badgeCode);
                          }}
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                        >
                          {copiedCode === cert.badgeCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode === cert.badgeCode ? 'Copied' : 'Copy ID'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={cert.githubCertUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative overflow-hidden group flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all shadow-md"
                        >
                          <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.1, g: 0.8, b: 0.9, a: 1 }} />
                          <span className="relative z-10 flex items-center gap-1.5">
                            <Github className="w-3.5 h-3.5 text-cyan-400" />
                            <span>GitHub Cert</span>
                          </span>
                        </a>

                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative overflow-hidden group flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                        >
                          <ButtonGlare radius={12} intensity={0.6} frontColor={{ r: 0.2, g: 1, b: 0.7, a: 1 }} />
                          <span className="relative z-10 flex items-center gap-1.5">
                            <span>Verify Official</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
