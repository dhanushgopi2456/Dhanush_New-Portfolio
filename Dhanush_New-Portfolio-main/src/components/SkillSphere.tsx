import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCw, Play, Pause, Zap, CheckCircle2, Award, Info } from 'lucide-react';
import { RESUME_DATA, Skill } from '../data/resumeData';

interface SkillNode {
  skill: Skill;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

export const SkillSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.3 });
  const [isRotating, setIsRotating] = useState(true);
  const [autoHighlightIndex, setAutoHighlightIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(RESUME_DATA.skills[0]);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  const skills = RESUME_DATA.skills;
  const radius = 180; // Sphere radius in px

  // Automatically cycle through skills every 3 seconds to show skills automatically
  useEffect(() => {
    if (!isRotating) return;
    const autoCycleTimer = setInterval(() => {
      setAutoHighlightIndex((prev) => (prev + 1) % skills.length);
    }, 2800);
    return () => clearInterval(autoCycleTimer);
  }, [skills.length, isRotating]);

  // Sync auto highlighted skill to selectedSkill if user hasn't manually selected one recently
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
          x: prev.x + delta * 0.25,
          y: prev.y + delta * 0.45,
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

  // Compute 3D position for each skill using Fibonacci Sphere Distribution
  const nodes: SkillNode[] = skills.map((skill, index) => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / skills.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;

    // Initial 3D coordinates on sphere surface
    const initialX = radius * Math.sin(phi) * Math.cos(theta);
    const initialY = radius * Math.sin(phi) * Math.sin(theta);
    const initialZ = radius * Math.cos(phi);

    // Apply 3D rotation matrices around X and Y axes
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

    // Perspective projection scale (front items larger, back items smaller)
    const perspective = 400;
    const scale = (perspective + z2) / perspective;
    const opacity = Math.max(0.15, Math.min(1, (z2 + radius) / (2 * radius)));

    return {
      skill,
      x: x2,
      y: y2,
      z: z2,
      scale,
      opacity,
    };
  });

  // Sort nodes so items in back render behind items in front
  const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

  // Mouse / Touch Drag handlers for manual 3D sphere rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    setRotation((prev) => ({
      x: prev.x - dy * 0.005,
      y: prev.y + dx * 0.005,
    }));

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const activeSkillToDisplay = hoveredSkill || selectedSkill || skills[0];

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Interactive Skill Sphere</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Continuously Rotating Tech Cloud
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Drag to rotate or watch as the sphere automatically rotates and highlights skills.
          </p>
        </div>

        {/* Sphere Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-semibold transition-all ${
              isRotating
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-600/20'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {isRotating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-blue-400" />
                <span>Pause Auto-Rotate</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Auto-Rotate</span>
              </>
            )}
          </button>

          <button
            onClick={() => setRotation({ x: 0.2, y: 0.3 })}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs"
            title="Reset Orientation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Sphere on Left/Center + Active Skill Details Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Interactive 3D Sphere Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[420px] select-none">
          
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            {/* Center Sphere Axis Ring Visualizer */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-blue-500/10 pointer-events-none animate-spin-slow" />
            <div className="absolute w-[240px] h-[240px] rounded-full border border-purple-500/10 pointer-events-none" />

            {/* Render 3D Skill Tag Nodes */}
            {sortedNodes.map((node) => {
              const isAutoActive = skills[autoHighlightIndex].name === node.skill.name;
              const isSelected = selectedSkill?.name === node.skill.name;
              const isHovered = hoveredSkill?.name === node.skill.name;
              const isFeatured = isAutoActive || isSelected || isHovered;

              return (
                <div
                  key={node.skill.name}
                  onClick={() => setSelectedSkill(node.skill)}
                  onMouseEnter={() => setHoveredSkill(node.skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px) scale(${node.scale * (isFeatured ? 1.25 : 1)})`,
                    opacity: node.z > -50 ? node.opacity : node.opacity * 0.4,
                    zIndex: Math.floor(node.z + radius) + (isFeatured ? 500 : 0),
                  }}
                  className={`absolute px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-lg whitespace-nowrap ${
                    isFeatured
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white ring-2 ring-blue-400 shadow-blue-500/50 scale-110'
                      : node.skill.featured
                      ? 'bg-slate-900/90 text-blue-300 border border-blue-500/40 hover:border-blue-400 hover:text-white'
                      : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isFeatured ? 'bg-white animate-ping' : 'bg-blue-400'}`} />
                  <span>{node.skill.name}</span>
                  {isFeatured && <Zap className="w-3 h-3 text-amber-300 animate-pulse" />}
                </div>
              );
            })}
          </div>

          <p className="text-[11px] font-mono text-slate-500 mt-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>Click any node to lock inspection. Hover to inspect details.</span>
          </p>
        </div>

        {/* Selected / Auto-Highlighted Skill Details Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkillToDisplay.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950 border border-blue-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden"
            >
              {/* Subtle Ambient Background Accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase font-bold">
                  {activeSkillToDisplay.category} Category
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{activeSkillToDisplay.level}% Proficiency</span>
                </span>
              </div>

              <h4 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-2">
                <span>{activeSkillToDisplay.name}</span>
                {activeSkillToDisplay.featured && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Core Focus
                  </span>
                )}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
                {activeSkillToDisplay.description}
              </p>

              {/* Proficiency Level Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Mastery Level</span>
                  <span className="text-blue-400 font-bold">{activeSkillToDisplay.level} / 100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSkillToDisplay.level}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-md shadow-blue-500/40"
                  />
                </div>
              </div>

              {/* Key Implementations List */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Real-World Application in Portfolio:
                </p>
                <div className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Used extensively across FreshMart, Team Task Manager, and YOLOv9 Deep Learning projects.
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Quick Skill Selector Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 10).map((s) => (
              <button
                key={s.name}
                onClick={() => setSelectedSkill(s)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  activeSkillToDisplay.name === s.name
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
