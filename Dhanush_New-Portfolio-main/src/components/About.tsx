import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Sparkles,
  FileText,
  MapPin,
  Calendar,
  Building,
  ShieldAlert,
  ChevronRight,
  BarChart3,
  Code2,
  Cpu,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Calculator
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'academic' | 'leadership' | 'research'>('academic');
  const [cgpaInput, setCgpaInput] = useState<number>(9.04);

  const calculatedPercentage = (cgpaInput * 9.5).toFixed(2);

  return (
    <section id="about" className="py-20 relative z-10 border-t border-slate-800/60 bg-slate-950/50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Background & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Academic Excellence & <br />
            <span className="gradient-text">Leadership Trajectory</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Combining top academic rank (9.04 CGPA), Class Representative leadership for 60+ students, and published IEEE research in AI vision.
          </p>
        </div>

        {/* Interactive Feature Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-2xl inline-flex gap-2">
            <button
              onClick={() => setActiveTab('academic')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
                activeTab === 'academic'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Academic Excellence (9.04 CGPA)</span>
            </button>

            <button
              onClick={() => setActiveTab('leadership')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
                activeTab === 'leadership'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Leadership Trajectory</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
                activeTab === 'research'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>AIDE-2024 Research Paper</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panes */}
        <AnimatePresence mode="wait">
          {activeTab === 'academic' && (
            <motion.div
              key="academic"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16"
            >
              {/* Left Overview */}
              <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Sri Vasavi Engineering College (CSE)</h3>
                    <p className="text-xs text-slate-400 font-mono">Tadepalligudem, AP • B.Tech Nov 2022 - July 2026</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Graduating with a cumulative grade point average of <strong className="text-blue-300 font-bold">9.04 / 10.0 (82.88%)</strong>, placing in the top percentile of the Computer Science & Engineering department.
                </p>

                <div className="grid grid-cols-2 gap-3 my-6">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Degree</p>
                    <p className="text-sm font-bold text-white mt-1">B.Tech Computer Science</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Overall Academic Score</p>
                    <p className="text-sm font-bold text-emerald-400 mt-1">9.04 CGPA (82.88%)</p>
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
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Coursework Breakdown */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="glass-card p-6 rounded-2xl border border-slate-800">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <span>Academic Performance Metrics</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Demonstrated consistent academic distinction across all 8 semesters, maintaining top tier grades in theoretical CS and laboratory practica.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-300">Data Structures & Java</span>
                        <span className="text-blue-400 font-bold">Grade: O (Outstanding)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[95%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-300">Database Systems (DBMS/SQL)</span>
                        <span className="text-blue-400 font-bold">Grade: O (Outstanding)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[92%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-300">MERN Web Engineering</span>
                        <span className="text-blue-400 font-bold">Grade: A+ (Excellent)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[90%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-blue-950/20 border-blue-500/30">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold uppercase">
                    Academic Distinction
                  </span>
                  <h4 className="text-base font-bold text-white mt-2">NPTEL Certified in Java & DSA</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Successfully completed NPTEL certification in Data Structures and Algorithms using Java with elite scoring.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leadership' && (
            <motion.div
              key="leadership"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            >
              {/* Class Representative */}
              <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                    Jan 2023 - Jan 2026 (3 Years)
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">Class Representative (60+ Students)</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Sri Vasavi Engineering College</p>
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
              <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
                <div className="p-3 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 w-fit">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    Aug 2024 - Jan 2026
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">Anti-Ragging & Student Committee Member</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Campus Safety & Student Welfare</p>
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 rounded-3xl border border-purple-500/40 bg-purple-950/20 mb-16 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/30">
                <div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                    IEEE Format International Conference
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
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
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Paper Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={RESUME_DATA.projects[2].repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all border border-purple-500/40"
                  >
                    <span>View Code Repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-mono text-purple-400 uppercase">Architecture</p>
                  <p className="text-sm font-bold text-white mt-1">YOLOv9 Programmable Gradient</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] font-mono text-purple-400 uppercase">Frameworks</p>
                  <p className="text-sm font-bold text-white mt-1">PyTorch, OpenCV, Flask</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
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

        {/* Detailed Educational Milestones Cards */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <span>Educational Milestones Breakdown</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESUME_DATA.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-slate-800/90 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-[11px] font-bold">
                      {edu.score}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mt-2">
                    {edu.institution}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-300 mt-1">
                    {edu.degree}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                    <Building className="w-3 h-3" />
                    {edu.location}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Key Coursework:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.favoriteCourses.map((course, cIdx) => (
                        <span 
                          key={cIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[11px] border border-slate-700/60"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
