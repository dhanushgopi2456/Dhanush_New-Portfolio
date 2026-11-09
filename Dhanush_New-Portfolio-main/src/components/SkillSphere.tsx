import React, { useEffect, useRef, useState } from 'react';
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
import { ButtonGlare } from './ui/button-glare';
import { audioSynth } from '../utils/audioSynth';

interface SkillNode {
  skill: Skill;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

type FormationType = 'sphere' | 'helix' | 'grid';

export const SkillSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0.25, y: 0.35 });
  const [isRotating, setIsRotating] = useState(true);
  const [formation, setFormation] = useState<FormationType>('sphere');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [autoHighlightIndex, setAutoHighlightIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(RESUME_DATA.skills[0]);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  const skills = RESUME_DATA.skills;
  const radius = 195; // 3D boundary radius

  // Automatically cycle through skills every 3 seconds
  useEffect(() => {
    if (!isRotating) return;
    const autoCycleTimer = setInterval(() => {
      setAutoHighlightIndex((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(autoCycleTimer);
  }, [skills.length, isRotating]);

  // Sync auto highlighted skill
  useEffect(() => {
    if (!hoveredSkill) {
      setSelectedSkill(skills[autoHighlightIndex]);
    }
  }, [autoHighlightIndex, hoveredSkill, skills]);

  // Continuous 3D rotation animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isRotating && !isDraggingRef.current) {
        setRotation((prev) => ({
          x: prev.x + delta * 0.18,
          y: prev.y + delta * 0.32,
        }));
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isRotating]);

  // Morphogenesis Distribution Calculations
  const nodes: SkillNode[] = skills.map((skill, index) => {
    let initialX = 0;
    let initialY = 0;
    let initialZ = 0;

    if (formation === 'helix') {
      // Double Helix DNA spiral choreography
      const t = (index / skills.length) * Math.PI * 4;
      const strand = index % 2 === 0 ? 1 : -1;
      initialX = Math.cos(t) * radius * 0.9 * strand;
      initialY = ((index / skills.length) - 0.5) * 320;
      initialZ = Math.sin(t) * radius * 0.9 * strand;
    } else if (formation === 'grid') {
      // 3D Spatial Grid matrix
      const cols = 4;
      const col = index % cols;
      const row = Math.floor(index / cols);
      initialX = (col - 1.5) * 95;
      initialY = (row - 1.8) * 80;
      initialZ = Math.sin(index * 0.9) * 55;
    } else {
      // Fibonacci Sphere surface distribution
      const phi = Math.acos(1 - (2 * (index + 0.5)) / skills.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      initialX = radius * Math.sin(phi) * Math.cos(theta);
      initialY = radius * Math.sin(phi) * Math.sin(theta);
      initialZ = radius * Math.cos(phi);
    }

    // Rotation matrices around X and Y axes
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    // Rotate around Y axis
    const x1 = initialX * cosY + initialZ * sinY;
    const y1 = initialY;
    const z1 = -initialX * sinY + initialZ * cosY;

    // Rotate around X axis
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    // Perspective projection scale
    const perspective = 440;
    const scale = (perspective + z2) / perspective;

    // Category filter check
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const opacity = matchesCategory 
      ? Math.max(0.28, Math.min(1, (z2 + radius) / (2 * radius)))
      : 0.12;

    return {
      skill,
      x: x2,
      y: y2,
      z: z2,
      scale: matchesCategory ? Math.max(0.65, scale) : Math.max(0.45, scale * 0.7),
      opacity,
    };
  });

  // Sort nodes from back to front (Painter's algorithm for genuine 3D depth)
  const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

  // Mouse drag handlers for direct manual 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseRef.current.x;
    const deltaY = e.clientY - lastMouseRef.current.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.008,
      y: prev.y + deltaX * 0.008,
    }));

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleFormationChange = (form: FormationType) => {
    audioSynth.playLaserBlip();
    setFormation(form);
  };

  const handleCategoryFilter = (cat: string) => {
    audioSynth.playLaserBlip();
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
              className={`px-2.5 py-1 rounded-xl uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-400/50 shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rotation Play/Pause */}
        <button
          onClick={() => {
            audioSynth.playLaserBlip();
            setIsRotating(!isRotating);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
        >
          {isRotating ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
          <span>{isRotating ? 'Pause Orbit' : 'Resume Orbit'}</span>
        </button>
      </div>

      {/* Main 3D Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl">
        
        {/* Left: 3D Interactive Morphing Canvas */}
        <div className="lg:col-span-8 flex justify-center">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Center Ambient Core Light */}
            <div className="absolute w-44 h-44 rounded-full bg-cyan-500/10 blur-[50px] pointer-events-none animate-pulse-glow" />
            <div className="absolute w-32 h-32 rounded-full bg-purple-500/15 blur-[40px] pointer-events-none" />

            {/* Orbit Ring Indicator for Spatial Perspective */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/10 pointer-events-none animate-spin-slow opacity-40 [transform:rotateX(65deg)]" />

            {/* Render 3D Tag Nodes */}
            {sortedNodes.map((node) => {
              const isSelected = selectedSkill?.name === node.skill.name;
              const isHovered = hoveredSkill?.name === node.skill.name;

              return (
                <div
                  key={node.skill.name}
                  onClick={() => {
                    audioSynth.playGlassClick();
                    setSelectedSkill(node.skill);
                  }}
                  onMouseEnter={() => {
                    audioSynth.playGlassClick();
                    setHoveredSkill(node.skill);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    transform: `translate3d(${node.x}px, ${node.y}px, 0px) scale(${node.scale})`,
                    zIndex: Math.floor(node.z + radius),
                    opacity: node.opacity,
                  }}
                  className={`absolute p-2.5 sm:p-3 rounded-2xl flex items-center gap-2 cursor-pointer transition-all duration-300 transform-gpu ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.6)] border-2 border-white scale-110'
                      : isHovered
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-400 shadow-lg scale-105'
                      : 'bg-slate-950/85 text-slate-200 border border-white/15 backdrop-blur-md hover:border-cyan-400'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-cyan-400'}`} />
                  <span className="text-xs font-mono font-bold tracking-tight whitespace-nowrap">
                    {node.skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 font-semibold text-slate-300">
                    {node.skill.level}%
                  </span>
                </div>
              );
            })}
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
                className="glass-card p-6 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden"
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
                  {selectedSkill.experience}
                </p>

                {/* Animated Level Bar */}
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
