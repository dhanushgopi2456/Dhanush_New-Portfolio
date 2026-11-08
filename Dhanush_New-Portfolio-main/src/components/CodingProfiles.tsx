import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Code2, 
  Binary, 
  Cpu, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  ArrowUpRight,
  RotateCw,
  Copy,
  Check,
  BarChart2,
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';

interface TopicDistribution {
  name: string;
  solved: number;
  total: number;
  color: string;
}

const PLATFORM_TOPICS: Record<string, TopicDistribution[]> = {
  leetcode: [
    { name: 'Arrays & Strings', solved: 65, total: 80, color: 'from-amber-500 to-orange-500' },
    { name: 'Linked Lists & Trees', solved: 45, total: 55, color: 'from-orange-500 to-red-500' },
    { name: 'Dynamic Programming', solved: 32, total: 45, color: 'from-red-500 to-pink-500' },
    { name: 'Graphs & BFS/DFS', solved: 28, total: 35, color: 'from-purple-500 to-indigo-500' },
    { name: 'Two Pointers & Binary Search', solved: 40, total: 50, color: 'from-blue-500 to-cyan-500' }
  ],
  gfg: [
    { name: 'Arrays & Searching', solved: 50, total: 60, color: 'from-emerald-500 to-teal-500' },
    { name: 'Core Java DSA Solutions', solved: 45, total: 50, color: 'from-green-500 to-emerald-400' },
    { name: 'Recursion & Backtracking', solved: 25, total: 30, color: 'from-teal-500 to-cyan-500' },
    { name: 'Object Oriented Programming', solved: 20, total: 20, color: 'from-cyan-500 to-blue-500' },
    { name: 'POD (Problem of the Day)', solved: 30, total: 35, color: 'from-lime-500 to-green-500' }
  ],
  code360: [
    { name: 'Ninja Guided Paths', solved: 40, total: 45, color: 'from-blue-500 to-indigo-500' },
    { name: 'System Design Basics', solved: 20, total: 25, color: 'from-indigo-500 to-purple-500' },
    { name: 'Mock Technical Interviews', solved: 25, total: 30, color: 'from-purple-500 to-pink-500' },
    { name: 'DBMS & SQL Queries', solved: 20, total: 20, color: 'from-violet-500 to-cyan-500' }
  ],
  codolio: [
    { name: 'LeetCode Synchronized', solved: 200, total: 200, color: 'from-amber-500 to-orange-500' },
    { name: 'GeeksforGeeks Synced', solved: 150, total: 150, color: 'from-emerald-500 to-teal-500' },
    { name: 'CodeStudio 360 Synced', solved: 100, total: 100, color: 'from-blue-500 to-indigo-500' },
    { name: 'Combined Activity Heatmap', solved: 100, total: 100, color: 'from-purple-500 to-pink-500' }
  ]
};

// 3D Tilt + Holographic Glare + 180 Spring Flip Component
const Interactive3DTiltCard: React.FC<{
  profile: typeof RESUME_DATA.codingProfiles[0];
  isFlipped: boolean;
  onToggleFlip: () => void;
  onCopyUrl: (url: string, id: string) => void;
  copiedId: string | null;
}> = ({ profile, isFlipped, onToggleFlip, onCopyUrl, copiedId }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  // Cursor spotlight inside card
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setSpotlightPos({ x: mouseX, y: mouseY });

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const topics = PLATFORM_TOPICS[profile.id] || [];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="h-[440px] [perspective:1200px] relative select-none"
    >
      {/* 3D Tilt Rig */}
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {/* 180-Degree Spring Flip Container */}
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full h-full relative [transform-style:preserve-3d]"
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 [backface-visibility:hidden] glass-card p-7 rounded-[28px] border border-white/10 flex flex-col justify-between hover:border-amber-500/50 transition-colors shadow-2xl overflow-hidden group">
            
            {/* 360 Continuous Laser Border Beam */}
            <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
              <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#f59e0b_120deg,#ec4899_180deg,#3b82f6_240deg,transparent_300deg)] opacity-40 group-hover:opacity-85 transition-opacity" />
            </div>

            {/* Holographic Foil Glare Overlay that reacts to tilt */}
            <div 
              className="absolute inset-0 holographic-foil pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.45 : 0.15,
                backgroundPosition: `${(spotlightPos.x / 400) * 100}% ${(spotlightPos.y / 400) * 100}%`,
              }}
            />

            {/* Cursor-tracked internal radial spotlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(245, 158, 11, 0.18), transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* Header Row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${profile.color} text-white shadow-lg shadow-black/30 group-hover:scale-110 transition-transform`}>
                    {profile.id === 'leetcode' && <Code2 className="w-6 h-6" />}
                    {profile.id === 'gfg' && <Binary className="w-6 h-6" />}
                    {profile.id === 'code360' && <Cpu className="w-6 h-6" />}
                    {profile.id === 'codolio' && <Sparkles className="w-6 h-6" />}
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {profile.platform}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      @{profile.username}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 text-amber-300 text-xs font-mono font-bold shadow-sm">
                  {profile.badge}
                </span>
              </div>

              {/* Stat Badges */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Solved Count</p>
                  <p className="text-sm font-extrabold text-white mt-0.5 font-mono">{profile.solvedCount}</p>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Rating / Status</p>
                  <p className="text-sm font-extrabold text-amber-400 mt-0.5 font-mono">{profile.ratingOrRank}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 mb-4">
                {profile.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onToggleFlip}
                className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-md group cursor-pointer"
              >
                <ButtonGlare radius={12} frontColor={{ r: 1, g: 0.6, b: 0.1, a: 1 }} />
                <RotateCw className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">Flip Details & Topics 🔄</span>
              </motion.button>

              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all hover:border-amber-500/50 shadow-md group cursor-pointer"
                title={`Visit ${profile.platform}`}
              >
                <ButtonGlare radius={12} />
                <ArrowUpRight className="relative z-10 w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* BACK SIDE (Flipped View) */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900/90 border border-amber-500/40 rounded-[28px] p-7 flex flex-col justify-between shadow-2xl backdrop-blur-2xl overflow-hidden">
            <div>
              {/* Back Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-white text-base">
                    {profile.platform} Topic Breakdown
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  @{profile.username}
                </span>
              </div>

              {/* Topic Distributions Progress Bars */}
              <div className="mt-4 space-y-3">
                {topics.map((t, tIdx) => {
                  const pct = Math.round((t.solved / t.total) * 100);
                  return (
                    <div key={tIdx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{t.name}</span>
                        <span className="text-amber-300 font-bold">{t.solved} solved</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: tIdx * 0.1, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${t.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Back Footer Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onCopyUrl(profile.profileUrl, profile.id)}
                className="relative overflow-hidden group flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-all"
              >
                <ButtonGlare radius={12} intensity={0.4} />
                <span className="relative z-10 flex items-center gap-1.5">
                  {copiedId === profile.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedId === profile.id ? 'URL Copied!' : 'Copy Handle Link'}</span>
                </span>
              </button>

              <button
                onClick={onToggleFlip}
                className="relative overflow-hidden group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 font-bold text-xs transition-all shadow-md shadow-amber-500/25"
              >
                <ButtonGlare radius={12} intensity={0.5} frontColor={{ r: 1, g: 0.8, b: 0.2, a: 1 }} />
                <span className="relative z-10 flex items-center gap-2">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip Back</span>
                </span>
              </button>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const CodingProfiles: React.FC = () => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="coding-profiles" className="py-24 relative z-10 border-t border-white/10 bg-slate-950/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered 3D Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-amber-950/20">
            <Trophy className="w-4 h-4" />
            <span>Problem Solving & Competitive Coding</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Competitive Coding <br />
            <span className="liquid-gradient-text">Profiles & 3D Interactive Cards</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            900+ solved algorithmic problems across LeetCode, GeeksforGeeks, CodeStudio (360), and Codolio. Hover to experience 60fps 3D tilt physics, or click <strong>Flip Details & Topics</strong> to inspect topic breakdowns!
          </p>
        </motion.div>

        {/* Global Summary Metric Banner with Glowing Border Sweeps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">900+</p>
            <p className="text-xs text-slate-200 font-bold mt-1 uppercase tracking-wider">Total Problems Solved</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Across All Platforms</p>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-border-sweep" />
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">1550+</p>
            <p className="text-xs text-slate-200 font-bold mt-1 uppercase tracking-wider">LeetCode Contest Rating</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Top 20% Global Rank</p>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-border-sweep" />
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
            <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">Score 680+</p>
            <p className="text-xs text-slate-200 font-bold mt-1 uppercase tracking-wider">GFG Coding Score</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Active POD Contender</p>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-border-sweep" />
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">Level 7</p>
            <p className="text-xs text-slate-200 font-bold mt-1 uppercase tracking-wider">Ninja Specialist</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">CodeStudio 360</p>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-border-sweep" />
          </div>
        </div>

        {/* Coding Profiles Cards Grid with 60fps 3D Tilt & Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESUME_DATA.codingProfiles.map((profile) => (
            <Interactive3DTiltCard
              key={profile.id}
              profile={profile}
              isFlipped={flippedCardId === profile.id}
              onToggleFlip={() => toggleFlip(profile.id)}
              onCopyUrl={handleCopy}
              copiedId={copiedId}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
