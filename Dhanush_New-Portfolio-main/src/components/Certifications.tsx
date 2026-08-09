import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, ExternalLink, Calendar, CheckCircle2, RotateCw, Github, Copy, Check, Sparkles, Filter } from 'lucide-react';
import { RESUME_DATA, Certification } from '../data/resumeData';

export const Certifications: React.FC = () => {
  // Store flipped card indices
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');

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
    <section id="certifications" className="py-20 relative z-10 border-t border-slate-800/60 bg-slate-950/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Industry Certifications & <br />
            <span className="gradient-text">Interactive Flip Cards</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Click any badge card to flip and inspect verified skill modules, credential verification links, and GitHub certificate repositories.
          </p>
        </div>

        {/* Issuer Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-2xl inline-flex flex-wrap gap-2">
            {issuers.map((iss) => (
              <button
                key={iss}
                onClick={() => setSelectedIssuer(iss)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all capitalize ${
                  selectedIssuer === iss
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {iss === 'all' ? 'All Issuers' : iss}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid with 3D Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => {
            const isFlipped = !!flippedCards[idx];

            return (
              <div
                key={idx}
                className="h-[320px] perspective-1000 group cursor-pointer"
                onClick={() => toggleFlip(idx)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative rounded-3xl"
                >
                  {/* FRONT SIDE */}
                  <div
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 glass-card p-6 rounded-3xl border border-slate-800/90 flex flex-col justify-between group-hover:border-emerald-500/50 transition-all shadow-xl bg-slate-900/90"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {cert.date}
                        </span>
                      </div>

                      {/* Issuer Badge */}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {cert.issuer}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500">
                        ID: {cert.badgeCode}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-mono transition-all"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Card 🔄</span>
                      </button>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                    className="absolute inset-0 glass-card p-6 rounded-3xl border border-emerald-500/40 flex flex-col justify-between shadow-2xl bg-slate-950"
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
                          className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white text-[10px]"
                        >
                          Flip Back ↩️
                        </button>
                      </div>

                      {/* Validated Skills Bullets */}
                      <div className="mt-3 space-y-1.5">
                        {cert.skillsValidated.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Back Actions: Verify & GitHub Links */}
                    <div className="pt-4 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                        <span>Badge Code: {cert.badgeCode}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCode(cert.badgeCode);
                          }}
                          className="text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          {copiedCode === cert.badgeCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode === cert.badgeCode ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={cert.githubCertUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold"
                        >
                          <Github className="w-3.5 h-3.5 text-blue-400" />
                          <span>GitHub Cert</span>
                        </a>

                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
                        >
                          <span>Verify Official</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
