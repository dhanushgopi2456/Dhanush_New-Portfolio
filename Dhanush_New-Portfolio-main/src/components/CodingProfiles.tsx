import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Binary, 
  Cpu, 
  Sparkles, 
  ExternalLink, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  ArrowUpRight,
  RotateCw,
  Copy,
  Check,
  BarChart2,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface TopicDistribution {
  name: string;
  solved: number;
  total: number;
  color: string;
}

const PLATFORM_TOPICS: Record<string, TopicDistribution[]> = {
  leetcode: [
    { name: 'Arrays & Strings', solved: 65, total: 80, color: 'bg-amber-500' },
    { name: 'Linked Lists & Trees', solved: 45, total: 55, color: 'bg-orange-500' },
    { name: 'Dynamic Programming', solved: 32, total: 45, color: 'bg-red-500' },
    { name: 'Graphs & BFS/DFS', solved: 28, total: 35, color: 'bg-purple-500' },
    { name: 'Two Pointers & Binary Search', solved: 40, total: 50, color: 'bg-blue-500' }
  ],
  gfg: [
    { name: 'Arrays & Searching', solved: 50, total: 60, color: 'bg-emerald-500' },
    { name: 'Core Java DSA Solutions', solved: 45, total: 50, color: 'bg-green-500' },
    { name: 'Recursion & Backtracking', solved: 25, total: 30, color: 'bg-teal-500' },
    { name: 'Object Oriented Programming', solved: 20, total: 20, color: 'bg-cyan-500' },
    { name: 'POD (Problem of the Day)', solved: 30, total: 35, color: 'bg-lime-500' }
  ],
  code360: [
    { name: 'Ninja Guided Paths', solved: 40, total: 45, color: 'bg-blue-500' },
    { name: 'System Design Basics', solved: 20, total: 25, color: 'bg-indigo-500' },
    { name: 'Mock Technical Interviews', solved: 25, total: 30, color: 'bg-purple-500' },
    { name: 'DBMS & SQL Queries', solved: 20, total: 20, color: 'bg-violet-500' }
  ],
  codolio: [
    { name: 'LeetCode Synchronized', solved: 200, total: 200, color: 'bg-amber-500' },
    { name: 'GeeksforGeeks Synced', solved: 150, total: 150, color: 'bg-emerald-500' },
    { name: 'CodeStudio 360 Synced', solved: 100, total: 100, color: 'bg-blue-500' },
    { name: 'Combined Activity Heatmap', solved: 100, total: 100, color: 'bg-purple-500' }
  ]
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
    <section id="coding-profiles" className="py-20 relative z-10 border-t border-slate-800/60 bg-slate-950/70">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4" />
            <span>Problem Solving & Competitive Coding</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Competitive Coding <br />
            <span className="gradient-text">Profiles & 3D Interactive Cards</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            900+ solved algorithmic problems across LeetCode, GeeksforGeeks, CodeStudio (360), and Codolio. Click <strong>Flip Card</strong> on any platform to view topic-wise distributions!
          </p>
        </div>

        {/* Global Summary Metric Banner (Rank #1 Removed) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
            <p className="text-3xl font-extrabold text-amber-400 font-mono">900+</p>
            <p className="text-xs text-slate-300 font-bold mt-1 uppercase">Total Problems Solved</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Across All Platforms</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
            <p className="text-3xl font-extrabold text-emerald-400 font-mono">1550+</p>
            <p className="text-xs text-slate-300 font-bold mt-1 uppercase">LeetCode Contest Rating</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Top 20% Global Rank</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
            <p className="text-3xl font-extrabold text-blue-400 font-mono">Score 680+</p>
            <p className="text-xs text-slate-300 font-bold mt-1 uppercase">GFG Coding Score</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Active POD Contender</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
            <p className="text-3xl font-extrabold text-purple-400 font-mono">Level 7</p>
            <p className="text-xs text-slate-300 font-bold mt-1 uppercase">Ninja Specialist</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">CodeStudio 360</p>
          </div>
        </div>

        {/* Coding Profiles Cards Grid with 3D Flip Feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESUME_DATA.codingProfiles.map((profile, idx) => {
            const isFlipped = flippedCardId === profile.id;
            const topics = PLATFORM_TOPICS[profile.id] || [];

            return (
              <div 
                key={profile.id}
                className="h-[430px] [perspective:1000px] relative"
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative [transform-style:preserve-3d]"
                >
                  
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 [backface-visibility:hidden] glass-card p-7 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl">
                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-2xl bg-gradient-to-r ${profile.color} text-white shadow-lg`}>
                            {profile.id === 'leetcode' && <Code2 className="w-6 h-6" />}
                            {profile.id === 'gfg' && <Binary className="w-6 h-6" />}
                            {profile.id === 'code360' && <Cpu className="w-6 h-6" />}
                            {profile.id === 'codolio' && <Sparkles className="w-6 h-6" />}
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {profile.platform}
                            </h3>
                            <p className="text-xs font-mono text-slate-400">
                              @{profile.username}
                            </p>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-mono font-bold">
                          {profile.badge}
                        </span>
                      </div>

                      {/* Stat Badges */}
                      <div className="grid grid-cols-2 gap-3 my-4">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <p className="text-[10px] font-mono text-slate-400 uppercase">Solved Count</p>
                          <p className="text-sm font-bold text-white mt-0.5">{profile.solvedCount}</p>
                        </div>

                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <p className="text-[10px] font-mono text-slate-400 uppercase">Rating / Status</p>
                          <p className="text-sm font-bold text-amber-400 mt-0.5">{profile.ratingOrRank}</p>
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
                    <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                      <button
                        onClick={() => toggleFlip(profile.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Details & Topics</span>
                      </button>

                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all hover:border-amber-500/50"
                        title={`Visit ${profile.platform}`}
                      >
                        <ArrowUpRight className="w-4 h-4 text-amber-400" />
                      </a>
                    </div>
                  </div>

                  {/* BACK SIDE (Flipped View) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 border border-amber-500/40 rounded-3xl p-7 flex flex-col justify-between shadow-2xl overflow-hidden">
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

                      {/* Topic Distributions Progress */}
                      <div className="mt-4 space-y-3">
                        {topics.map((t, tIdx) => {
                          const pct = Math.round((t.solved / t.total) * 100);
                          return (
                            <div key={tIdx} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <span className="text-slate-300 font-medium">{t.name}</span>
                                <span className="text-amber-300 font-bold">{t.solved} solved</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                                <div
                                  className={`h-full rounded-full ${t.color}`}
                                  style={{ width: `${pct}%` }}
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
                        onClick={() => handleCopy(profile.profileUrl, profile.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-all"
                      >
                        {copiedId === profile.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{copiedId === profile.id ? 'URL Copied!' : 'Copy Handle Link'}</span>
                      </button>

                      <button
                        onClick={() => toggleFlip(profile.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip Back</span>
                      </button>
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
