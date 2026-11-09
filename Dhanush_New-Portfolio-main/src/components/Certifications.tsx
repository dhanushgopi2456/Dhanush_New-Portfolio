import React, { useState, useEffect, useRef, Suspense } from 'react';
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
import { RESUME_DATA, Certification } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';
import { SectionFlowingBackground } from './SectionFlowingBackground';
import { audioSynth } from '../utils/audioSynth';

const CertificationInspectModal = React.lazy(() => import('./CertificationInspectModal').then(m => ({ default: m.CertificationInspectModal })));

// Collectible Hallmark 3D Card with Iridescent CSS Foil Shader
interface HallmarkCardProps {
  cert: Certification;
  index: number;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onInspect: () => void;
  onCopyCode: (code: string) => void;
  copiedCode: string | null;
}

const HallmarkCard: React.FC<HallmarkCardProps> = ({
  cert,
  index,
  isFlipped,
  onToggleFlip,
  onInspect,
  onCopyCode,
  copiedCode
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const tiltX = -((y - cy) / cy) * 9;
    const tiltY = ((x - cx) / cx) * 9;

    // Angle of vector from center to mouse in degrees
    const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 180;

    el.style.setProperty('--card-x', `${x}px`);
    el.style.setProperty('--card-y', `${y}px`);
    el.style.setProperty('--foil-angle', `${angle}deg`);
    el.style.setProperty('--tilt-x', `${tiltX}deg`);
    el.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onToggleFlip}
      className="h-[350px] [perspective:1400px] group cursor-pointer select-none"
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered && !isFlipped ? 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' : undefined,
        }}
        className="w-full h-full relative rounded-[28px] transition-transform duration-150 ease-out"
      >
        {/* FRONT SIDE: Collectible Hallmark 3D Card with Iridescent Foil */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 glass-card p-6 sm:p-7 rounded-[28px] border border-white/10 flex flex-col justify-between group-hover:border-emerald-500/50 transition-colors shadow-2xl overflow-hidden"
        >
          {/* 360 Continuous Laser Border Beam */}
          <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
            <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#10b981_120deg,#06b6d4_180deg,#a855f7_240deg,transparent_300deg)] opacity-35 group-hover:opacity-85 transition-opacity" />
          </div>

          {/* Dynamic Iridescent CSS Foil Shader (shifts dynamically with mouse tilt) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 -z-0"
            style={{
              opacity: isHovered ? 0.75 : 0.25,
              background: 'linear-gradient(var(--foil-angle, 135deg), rgba(244,63,94,0.3) 0%, rgba(6,182,212,0.4) 25%, rgba(250,204,21,0.35) 50%, rgba(168,85,247,0.4) 75%, rgba(16,185,129,0.35) 100%)',
              mixBlendMode: 'color-dodge',
            }}
          />

          {/* Sweeping Diagonal Glass Sheen */}
          <div 
            className="pointer-events-none absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 52%, transparent 60%)',
              transform: isHovered ? 'translate(calc(var(--card-x, 0px) * 0.3), calc(var(--card-y, 0px) * 0.3))' : 'translate(0px, 0px)',
            }}
          />

          {/* Cursor-tracked internal radial spotlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: 'radial-gradient(350px circle at var(--card-x, -500px) var(--card-y, -500px), rgba(16, 185, 129, 0.2), transparent 70%)',
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

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioSynth.playLaserBlip();
                  onInspect();
                }}
                className="px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all border border-cyan-500/30 cursor-pointer"
                title="Inspect in 3D"
              >
                Inspect 3D 🔍
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFlip();
                }}
                className="relative overflow-hidden group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-mono font-bold transition-all border border-emerald-500/30 shadow-md cursor-pointer"
              >
                <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.1, g: 0.9, b: 0.6, a: 1 }} />
                <span className="relative z-10 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip 🔄</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
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
                  onToggleFlip();
                }}
                className="relative overflow-hidden group px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
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
                  onCopyCode(cert.badgeCode);
                }}
                className="text-emerald-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
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
    </div>
  );
};

export const Certifications: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [inspectingCert, setInspectingCert] = useState<Certification | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');

  const issuers = ['all', ...Array.from(new Set(RESUME_DATA.certifications.map(c => c.issuer)))];
  const filteredCerts = RESUME_DATA.certifications.filter(c => selectedIssuer === 'all' || c.issuer === selectedIssuer);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // 10-Second Continuous Auto Flip Loop for all Certification Cards
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setFlippedCards((prev) => {
        const anyFlipped = Object.values(prev).some(Boolean);
        const next: Record<number, boolean> = {};
        filteredCerts.forEach((_, idx) => {
          next[idx] = !anyFlipped;
        });
        return next;
      });
    }, 10000);
    return () => clearInterval(flipInterval);
  }, [filteredCerts.length]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="certifications" className="py-24 relative z-10 bg-transparent overflow-hidden">
      <SectionFlowingBackground variant="certifications" position="right" particleCount={420} />
      <div className="gradient-wave-divider absolute top-0 inset-x-0" />
      
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
            <span className="liquid-gradient-text">Holographic 3D Vault</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Collectible hallmark 3D cards coated in an iridescent CSS foil shader that shifts dynamically with tilt angle. Click any card to inspect verified competencies.
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

        {/* Certifications Grid with Iridescent Hallmark 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => (
            <HallmarkCard
              key={cert.badgeCode || idx}
              cert={cert}
              index={idx}
              isFlipped={!!flippedCards[idx]}
              onToggleFlip={() => toggleFlip(idx)}
              onInspect={() => setInspectingCert(cert)}
              onCopyCode={handleCopyCode}
              copiedCode={copiedCode}
            />
          ))}
        </div>

        {/* 360-Degree Hallmark 3D Badge Inspector Modal (Suspense Lazy Chunk) */}
        <Suspense fallback={null}>
          {inspectingCert && (
            <CertificationInspectModal
              cert={inspectingCert}
              onClose={() => setInspectingCert(null)}
            />
          )}
        </Suspense>

      </div>
    </section>
  );
};
