import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Sparkles,
  FileText,
  Calendar,
  Building,
  ShieldAlert,
  BarChart3,
  ExternalLink,
  ArrowUpRight,
  Calculator
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'academic' | 'leadership' | 'research'>('academic');
  const [cgpaInput, setCgpaInput] = useState<number>(9.04);

  // Mouse tracking for card spotlights
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCardIndex(index);
  };

  const calculatedPercentage = (cgpaInput * 9.5).toFixed(2);

  return (
    <section id="about" className="py-24 relative z-10 bg-transparent">
      <div className="gradient-wave-divider absolute top-0 inset-x-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-950/20">
            <GraduationCap className="w-4 h-4" />
            <span>Background & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Academic Excellence & <br />
            <span className="liquid-gradient-text">Leadership Trajectory</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Combining top academic rank (9.04 CGPA), Class Representative leadership for 60+ students, and published IEEE research in AI vision.
          </p>
        </motion.div>

        {/* Interactive Feature Selector Tabs with Framer Motion layoutId */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl inline-flex flex-wrap gap-2 backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => setActiveTab('academic')}
              className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer group ${
                activeTab === 'academic' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'academic' && (
                <motion.div
                  layoutId="aboutActiveTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-blue-500/30 border border-white/20 overflow-hidden"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                >
                  <ButtonGlare radius={12} />
                </motion.div>
              )}
              <BookOpen className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Academic Excellence (9.04 CGPA)</span>
            </button>

            <button
              onClick={() => setActiveTab('leadership')}
              className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer group ${
                activeTab === 'leadership' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'leadership' && (
                <motion.div
                  layoutId="aboutActiveTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-blue-500/30 border border-white/20 overflow-hidden"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                >
                  <ButtonGlare radius={12} />
                </motion.div>
              )}
              <Users className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Leadership Trajectory</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`relative overflow-hidden px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer group ${
                activeTab === 'research' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'research' && (
                <motion.div
                  layoutId="aboutActiveTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-blue-500/30 border border-white/20 overflow-hidden"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                >
                  <ButtonGlare radius={12} />
                </motion.div>
              )}
              <FileText className="relative z-10 w-4 h-4" />
              <span className="relative z-10">AIDE-2024 Research Paper</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panes with 3D Slide Transition */}
        <AnimatePresence mode="wait">
          {activeTab === 'academic' && (
            <motion.div
              key="academic"
              initial={{ opacity: 0, x: 25, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -25, rotateY: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 transform-gpu [perspective:1000px]"
            >
              {/* Left Overview */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 101)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl"
              >
                {/* 360-Degree Continuous Rotating Laser Border Beam */}
                <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                  <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#3b82f6_120deg,#06b6d4_180deg,#8b5cf6_240deg,transparent_300deg)] opacity-40 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Cursor-tracked internal radial spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                  style={{
                    opacity: hoveredCardIndex === 101 ? 1 : 0,
                    background: `radial-gradient(450px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(59, 130, 246, 0.2), transparent 70%)`,
                  }}
                />

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/30 border border-blue-500/40 text-cyan-400 shadow-lg shadow-blue-500/20">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">Sri Vasavi Engineering College (CSE)</h3>
                    <p className="text-xs text-cyan-300 font-mono">Tadepalligudem, AP • B.Tech Nov 2022 - July 2026</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Graduating with a cumulative grade point average of <strong className="text-cyan-300 font-bold font-mono">9.04 / 10.0 (82.88%)</strong>, placing in the top percentile of the Computer Science & Engineering department.
                </p>

                <div className="grid grid-cols-2 gap-3 my-6">
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Degree Awarded</p>
                    <p className="text-sm font-bold text-white mt-1">B.Tech Computer Science</p>
                  </div>
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Overall Academic Score</p>
                    <p className="text-sm font-bold text-emerald-400 mt-1 font-mono">9.04 CGPA (82.88%)</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 uppercase font-mono font-bold tracking-wider mb-3">
                  Core Computer Science Subjects Mastered:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Data Structures & Algorithms",
                    "Object Oriented Programming",
                    "Database Management (DBMS)",
                    "MERN Web Stack",
                    "Computer Networks",
                    "Operating Systems"
                  ].map((subject, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Coursework Breakdown & Performance Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                
                {/* Academic Performance Metrics Card with Glowing Liquid Neon Progress Bars */}
                <div 
                  onMouseMove={(e) => handleCardMouseMove(e, 102)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className="glass-card p-6 rounded-3xl border border-white/10 relative overflow-hidden group shadow-xl"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                    style={{
                      opacity: hoveredCardIndex === 102 ? 1 : 0,
                      background: `radial-gradient(350px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(99, 102, 241, 0.2), transparent 70%)`,
                    }}
                  />

                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    <span>Academic Performance Metrics</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    Demonstrated consistent academic distinction across all 8 semesters with Outstanding marks in theoretical CS and laboratories.
                  </p>

                  <div className="space-y-4">
                    {/* Bar 1: Data Structures & Java */}
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-slate-300 font-medium">Data Structures & Java</span>
                        <span className="text-cyan-400 font-bold">Grade: O (Outstanding)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800 relative p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '95%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 relative shadow-md shadow-cyan-500/50"
                        >
                          {/* Leading Spark Particle */}
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#38bdf8] animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bar 2: Database Systems */}
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-slate-300 font-medium">Database Systems (DBMS/SQL)</span>
                        <span className="text-cyan-400 font-bold">Grade: O (Outstanding)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800 relative p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '92%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 relative shadow-md shadow-teal-500/50"
                        >
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#2dd4bf] animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bar 3: MERN Web Engineering */}
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-slate-300 font-medium">MERN Web Engineering</span>
                        <span className="text-cyan-400 font-bold">Grade: A+ (Excellent)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800 relative p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '90%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 relative shadow-md shadow-purple-500/50"
                        >
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ec4899] animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Distinction Badge Card */}
                <div className="glass-card p-6 rounded-3xl border border-blue-500/30 bg-blue-950/20 shadow-xl relative overflow-hidden">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">
                    Academic Distinction
                  </span>
                  <h4 className="text-base font-bold text-white mt-2.5">NPTEL Certified in Java & DSA</h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Successfully completed NPTEL certification in Data Structures and Algorithms using Java with elite scoring and departmental praise.
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'leadership' && (
            <motion.div
              key="leadership"
              initial={{ opacity: 0, x: 25, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -25, rotateY: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 transform-gpu"
            >
              {/* Class Representative */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 201)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 shadow-2xl relative overflow-hidden group"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                  style={{
                    opacity: hoveredCardIndex === 201 ? 1 : 0,
                    background: `radial-gradient(400px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(59, 130, 246, 0.2), transparent 70%)`,
                  }}
                />

                <div className="p-3.5 rounded-2xl bg-blue-600/20 text-cyan-400 border border-blue-500/30 w-fit shadow-lg shadow-blue-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                    Jan 2023 - Jan 2026 (3 Years)
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">Class Representative (60+ Students)</h3>
                  <p className="text-xs font-mono text-cyan-300 mt-0.5">Sri Vasavi Engineering College</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Elected by peers and faculty to represent a cohort of 60+ Computer Science students across academic years. Key duties included:
                </p>
                <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
                  <li>Liaising between student cohort and HOD/faculty for curriculum scheduling and lab sessions.</li>
                  <li>Organizing student peer-programming circles, MERN stack bootcamps, and coding hackathons.</li>
                  <li>Resolving academic queries and feedback operations with zero escalation.</li>
                </ul>
              </div>

              {/* Anti-Ragging Committee */}
              <div 
                onMouseMove={(e) => handleCardMouseMove(e, 202)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 shadow-2xl relative overflow-hidden group"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                  style={{
                    opacity: hoveredCardIndex === 202 ? 1 : 0,
                    background: `radial-gradient(400px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(16, 185, 129, 0.2), transparent 70%)`,
                  }}
                />

                <div className="p-3.5 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 w-fit shadow-lg shadow-emerald-500/20">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    Aug 2024 - Jan 2026
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">Anti-Ragging & Student Committee Member</h3>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">Campus Safety & Student Welfare</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Appointed member of the official institutional welfare committee dedicated to keeping the college environment safe and inclusive:
                </p>
                <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
                  <li>Promoting anti-ragging guidelines across senior and junior engineering batches.</li>
                  <li>Mentoring incoming CSE freshmen for a smooth transition into college academic life.</li>
                  <li>Coordinating with institutional management to uphold campus safety policies.</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'research' && (
            <motion.div
              key="research"
              initial={{ opacity: 0, x: 25, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -25, rotateY: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 rounded-3xl border border-purple-500/40 bg-purple-950/20 mb-16 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/30">
                <div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                    IEEE Format International Conference
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    Research Paper: Object Detection using YOLOv9
                  </h3>
                  <p className="text-xs text-purple-300 font-mono mt-1">
                    Published at AIDE-2024 (International Conference on Artificial Intelligence and Data Science)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">
                  <a
                    href="https://github.com/dhanushgopi2456/My_Certifications/blob/main/ResearchPaper_Certificate.jpeg"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Paper Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={RESUME_DATA.projects[2].repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all border border-purple-500/40 shadow-md"
                  >
                    <span>View Code Repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-mono text-purple-400 uppercase">Architecture</p>
                  <p className="text-sm font-bold text-white mt-1">YOLOv9 Programmable Gradient</p>
                </div>
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-mono text-purple-400 uppercase">Frameworks</p>
                  <p className="text-sm font-bold text-white mt-1">PyTorch, OpenCV, Flask</p>
                </div>
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-mono text-purple-400 uppercase">Deployment</p>
                  <p className="text-sm font-bold text-white mt-1">Live Web Inference Server</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Abstract & Key Findings:</strong> The research addresses real-time object detection accuracy loss in compressed media streams. By leveraging YOLOv9's Programmable Gradient Information (PGI) and Generalized Efficient Layer Aggregation Network (GELAN), the proposed model achieved superior mAP (mean Average Precision) scores while maintaining high frame rates required for live video processing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Educational Milestones Connected by Animated Glowing SVG Circuit Timeline */}
        <div className="mt-16 relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              <span>Educational Milestones Breakdown</span>
            </h3>

            {/* Glowing Circuit Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Circuit Synced Timeline</span>
            </div>
          </div>

          {/* Animated Connecting SVG Circuit Line (Desktop) */}
          <div className="hidden md:block absolute top-[110px] left-[15%] right-[15%] h-[4px] pointer-events-none -z-0">
            {/* Background Trace */}
            <div className="w-full h-full bg-slate-800/80 rounded-full" />
            
            {/* Glowing Flowing Pulse */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="origin-left absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full shadow-[0_0_12px_#38bdf8]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {RESUME_DATA.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseMove={(e) => handleCardMouseMove(e, 300 + idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className="glass-card p-6 rounded-3xl border border-white/10 relative flex flex-col justify-between group shadow-xl hover:border-cyan-500/50 transition-all overflow-hidden"
              >
                {/* 360-Degree Animated Glowing Border Beam */}
                <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                  <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#3b82f6_120deg,#06b6d4_180deg,#8b5cf6_240deg,transparent_300deg)] opacity-30 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Internal Cursor Spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                  style={{
                    opacity: hoveredCardIndex === 300 + idx ? 1 : 0,
                    background: `radial-gradient(350px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(59, 130, 246, 0.2), transparent 70%)`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold shadow-sm">
                      {edu.score}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                    {edu.institution}
                  </h4>
                  <p className="text-xs font-bold text-indigo-300 mt-1">
                    {edu.degree}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    {edu.location}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      Key Coursework:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.favoriteCourses.map((course, cIdx) => (
                        <span 
                          key={cIdx}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 text-slate-300 text-[11px] border border-slate-700/60 font-mono"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Circuit Node Pin */}
                <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Milestone {idx + 1} of 3</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
