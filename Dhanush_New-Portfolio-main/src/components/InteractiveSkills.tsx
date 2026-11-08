import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Code2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Database, 
  Brain, 
  Wrench, 
  Users, 
  Zap, 
  Cpu
} from 'lucide-react';
import { SkillSphere } from './SkillSphere';
import { RESUME_DATA, Skill } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';

type CategoryFilter = 'all' | 'frontend' | 'backend' | 'database' | 'language' | 'aiml' | 'tools' | 'soft';

export const InteractiveSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  // Mouse tracking for card spotlights
  const [hoveredCardName, setHoveredCardName] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCardName(name);
  };

  const categories: { id: CategoryFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Badges', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'frontend', label: 'Frontend', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'backend', label: 'Backend', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'database', label: 'Databases', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'language', label: 'Languages & DSA', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'aiml', label: 'AI & Vision', icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'tools', label: 'Tools & DevOps', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'soft', label: 'Soft Skills', icon: <Users className="w-3.5 h-3.5" /> }
  ];

  const filteredSkills = RESUME_DATA.skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBadgeClick = (skill: Skill, event: React.MouseEvent) => {
    setActiveSkill(skill);

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x, y },
      colors: ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#10b981']
    });
  };

  return (
    <section id="skills" className="py-24 relative z-10 bg-transparent">
      <div className="gradient-wave-divider absolute top-0 inset-x-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered 3D Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-indigo-950/20">
            <Zap className="w-4 h-4" />
            <span>Interactive Skill Badges & 3D Sphere</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Technical Matrix & <br />
            <span className="liquid-gradient-text">Proficiency Badges</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Interact with the 3D rotating skill sphere or filter individual domain badges below. Click any badge to trigger inspection and confetti burst!
          </p>
        </motion.div>

        {/* 3D Continuously Rotating Skill Sphere */}
        <div className="mb-16">
          <SkillSphere />
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/60 p-3 rounded-2xl border border-white/10 backdrop-blur-2xl shadow-xl">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative overflow-hidden group flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-white/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ButtonGlare radius={12} intensity={selectedCategory === cat.id ? 0.5 : 0.25} frontColor={{ r: 0.3, g: 0.6, b: 1, a: 1 }} />
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat.icon}
                  <span>{cat.label}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
          </div>

        </div>

        {/* Skills Grid with Cursor Spotlight and 360 Laser Borders */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => handleBadgeClick(skill, e)}
                onMouseMove={(e) => handleCardMouseMove(e, skill.name)}
                onMouseLeave={() => setHoveredCardName(null)}
                className="glass-card p-5 rounded-2xl border border-white/10 cursor-pointer group relative overflow-hidden select-none hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/15 transition-all transform-gpu"
              >
                {/* 360-Degree Continuous Rotating Laser Border Beam */}
                <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                  <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#06b6d4_120deg,#6366f1_180deg,#ec4899_240deg,transparent_300deg)] opacity-30 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Internal Cursor Spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                  style={{
                    opacity: hoveredCardName === skill.name ? 1 : 0,
                    background: `radial-gradient(300px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(6, 182, 212, 0.22), transparent 70%)`,
                  }}
                />

                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500 group-hover:scale-110 transition-all shadow-md">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Level Tag */}
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2 relative z-10">
                  {skill.description}
                </p>

                {/* Animated Level Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800 relative z-10 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full shadow-sm"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skill Detail Modal with Ultra High-Motion Glass */}
        <AnimatePresence>
          {activeSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-slate-900 border border-white/10 p-6 sm:p-7 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden backdrop-blur-2xl"
              >
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-600/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-600/20">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeSkill.name}</h3>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                        {activeSkill.category} Domain
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveSkill(null)}
                    className="relative overflow-hidden group px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                  >
                    <ButtonGlare radius={12} intensity={0.3} />
                    <span className="relative z-10">Close</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-5">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeSkill.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Proficiency Rating</span>
                    <span className="font-bold text-cyan-400">{activeSkill.level}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full shadow-md shadow-cyan-500/40" 
                      style={{ width: `${activeSkill.level}%` }}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSkill(null)}
                  className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/30"
                >
                  Got It
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
