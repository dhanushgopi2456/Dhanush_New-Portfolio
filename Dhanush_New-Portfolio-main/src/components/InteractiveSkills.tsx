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
  Flame,
  Zap,
  Info,
  Layers,
  Cpu
} from 'lucide-react';
import { SkillSphere } from './SkillSphere';
import { RESUME_DATA, Skill } from '../data/resumeData';

type CategoryFilter = 'all' | 'frontend' | 'backend' | 'database' | 'language' | 'aiml' | 'tools' | 'soft';

export const InteractiveSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

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

    // Trigger confetti burst from click position
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']
    });
  };

  return (
    <section id="skills" className="py-20 relative z-10 border-t border-slate-800/60 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-4 h-4" />
            <span>2026 Interactive Skill Badges & 3D Sphere</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Matrix & <br />
            <span className="gradient-text">Proficiency Badges</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Interact with the 3D rotating skill sphere or filter individual domain badges below.
          </p>
        </div>

        {/* 3D Continuously Rotating Skill Sphere */}
        <div className="mb-14">
          <SkillSphere />
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
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
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

        </div>

        {/* Skills Grid */}
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
                transition={{ duration: 0.3 }}
                onClick={(e) => handleBadgeClick(skill, e)}
                className="glass-card p-5 rounded-2xl border border-slate-800/80 cursor-pointer group relative overflow-hidden select-none hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
              >
                {/* Background Glow */}
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/25 transition-all" />

                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-blue-400 group-hover:border-blue-500 group-hover:scale-110 transition-all">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Level Tag */}
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[11px] font-bold">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {skill.description}
                </p>

                {/* Animated Level Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skill Detail Modal */}
        {activeSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-md w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeSkill.name}</h3>
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                      {activeSkill.category} Domain
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-mono"
                >
                  Close
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Proficiency Rating</span>
                  <span className="font-bold text-blue-400">{activeSkill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                    style={{ width: `${activeSkill.level}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setActiveSkill(null)}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
};
