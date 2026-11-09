import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCw, 
  Play, 
  Pause, 
  Zap, 
  CheckCircle2, 
  Award, 
  Info,
  Layers,
  Dna,
  Grid,
  Globe
} from 'lucide-react';
import { RESUME_DATA, Skill } from '../data/resumeData';
import { audioSynth } from '../utils/audioSynth';

type FormationType = 'sphere' | 'helix' | 'grid';

export const SkillSphere: React.FC = () => {
  const [formation, setFormation] = useState<FormationType>('sphere');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isRotating, setIsRotating] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(RESUME_DATA.skills[0]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const skills = RESUME_DATA.skills;
  const radius = 175; // 3D boundary radius

  // Precompute static 3D coordinates once per formation
  const nodePositions = useMemo(() => {
    return skills.map((skill, index) => {
      let x = 0;
      let y = 0;
      let z = 0;

      if (formation === 'helix') {
        const t = (index / skills.length) * Math.PI * 4;
        const strand = index % 2 === 0 ? 1 : -1;
        x = Math.cos(t) * radius * 0.9 * strand;
        y = ((index / skills.length) - 0.5) * 320;
        z = Math.sin(t) * radius * 0.9 * strand;
      } else if (formation === 'grid') {
        const cols = 4;
        const col = index % cols;
        const row = Math.floor(index / cols);
        x = (col - 1.5) * 85;
        y = (row - 1.8) * 75;
        z = Math.sin(index * 0.9) * 45;
      } else {
        // Fibonacci Sphere distribution
        const phi = Math.acos(1 - (2 * (index + 0.5)) / skills.length);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
      }

      return { skill, x, y, z };
    });
  }, [skills, formation]);

  const handleFormationChange = (form: FormationType) => {
    try { audioSynth.playLaserBlip(); } catch {}
    setFormation(form);
  };

  const handleCategoryFilter = (cat: string) => {
    try { audioSynth.playLaserBlip(); } catch {}
    setActiveCategory(cat);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Morphogenesis Formation & Category Controls */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-4 mb-6 px-4">
        
        {/* Formation Toggles */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/10 shadow-lg">
          <button
            onClick={() => handleFormationChange('sphere')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              formation === 'sphere'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Sphere</span>
          </button>

          <button
            onClick={() => handleFormationChange('helix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              formation === 'helix'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Double Helix</span>
          </button>

          <button
            onClick={() => handleFormationChange('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              formation === 'grid'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>3D Grid</span>
          </button>
        </div>

        {/* Category Focus Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {['all', 'frontend', 'backend', 'database', 'language', 'aiml'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl uppercase font-bold text-[10px] tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rotation Play/Pause Toggle */}
        <button
          onClick={() => setIsRotating(prev => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono font-bold text-slate-300 hover:text-white cursor-pointer"
          title="Toggle Auto Rotation"
        >
          {isRotating ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{isRotating ? 'Pause Orbit' : 'Resume Orbit'}</span>
        </button>

      </div>

      {/* Main 3D Stage & Detail Split View */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Pure Hardware-Accelerated CSS 3D Morphing Canvas */}
        <div className="lg:col-span-8 flex justify-center py-6">
          <div
            className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] flex items-center justify-center select-none [perspective:1200px]"
          >
            {/* Center Ambient Core Light */}
            <div className="absolute w-44 h-44 rounded-full bg-cyan-500/15 blur-[50px] pointer-events-none animate-pulse-glow" />
            <div className="absolute w-32 h-32 rounded-full bg-purple-500/20 blur-[40px] pointer-events-none" />

            {/* Orbit Ring Indicator */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/10 pointer-events-none animate-spin-slow opacity-40 [transform:rotateX(65deg)]" />

            {/* Hardware-Accelerated 3D CSS Transform Sphere Container */}
            <div
              style={{
                transformStyle: 'preserve-3d',
                animation: isRotating ? 'cssSphereOrbit 28s linear infinite' : 'none',
              }}
              className="relative w-0 h-0 flex items-center justify-center transform-gpu"
            >
              {nodePositions.map(({ skill, x, y, z }) => {
                const isSelected = selectedSkill?.name === skill.name;
                const isHovered = hoveredSkill?.name === skill.name;
                const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;

                return (
                  <div
                    key={skill.name}
                    onClick={() => {
                      try { audioSynth.playGlassClick(); } catch {}
                      setSelectedSkill(skill);
                    }}
                    onMouseEnter={() => {
                      try { audioSynth.playGlassClick(); } catch {}
                      setHoveredSkill(skill);
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                      opacity: matchesCategory ? 1 : 0.2,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-opacity duration-300 transform-gpu"
                  >
                    <div
                      className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.8)] border border-white scale-110 z-30'
                          : isHovered
                          ? 'bg-slate-800 text-cyan-300 border border-cyan-400 shadow-lg scale-105 z-20'
                          : 'bg-[#0B0C14]/90 text-slate-200 border border-white/15 hover:border-cyan-400 hover:scale-105'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-cyan-400'}`} />
                      <span className="text-xs font-mono font-bold tracking-tight whitespace-nowrap">
                        {skill.name}
                      </span>
                      <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/40 font-semibold text-slate-300">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Skill Detail Inspection Card */}
        <div className="lg:col-span-4 w-full">
          <AnimatePresence mode="wait">
            {selectedSkill && (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0B0C14]/95 p-6 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                      {selectedSkill.category}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-extrabold text-white px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10">
                    {selectedSkill.level}% Proficiency
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2">
                  {selectedSkill.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedSkill.description}
                </p>

                {/* Level Bar */}
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-white/10 p-[1px] mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_10px_#22d3ee]"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified in Projects
                  </span>
                  <span className="text-cyan-400 font-bold">Production Ready</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
