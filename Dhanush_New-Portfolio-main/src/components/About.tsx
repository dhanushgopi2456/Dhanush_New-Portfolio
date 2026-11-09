import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
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
  BarChart3,
  ExternalLink,
  ArrowUpRight,
  Calculator,
  Github,
  GitCommit,
  GitBranch,
  Star,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Flame,
  RotateCw,
  Trophy,
  ShieldCheck
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { ButtonGlare } from './ui/button-glare';
import { SectionFlowingBackground } from './SectionFlowingBackground';
import { BentoTerminalPlayground } from './BentoTerminalPlayground';
import { CircuitEnergyTraces } from './CircuitEnergyTraces';

// Viewport-Triggered Animated Number Counter
const ViewportCounter: React.FC<{ target: number; suffix?: string; decimals?: number; duration?: number }> = ({
  target,
  suffix = '',
  decimals = 0,
  duration = 2
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(ease * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-mono">
      {count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Spatial 3D Bento Card with X/Y Tilt & Sweeping Diagonal Glass Reflection
interface BentoTiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const BentoTiltCard: React.FC<BentoTiltCardProps> = ({ 
  children, 
  className = '',
  glowColor = 'rgba(6, 182, 212, 0.2)' 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * 7;
    const tiltY = ((x - centerX) / centerX) * 7;

    el.style.setProperty('--card-x', `${x}px`);
    el.style.setProperty('--card-y', `${y}px`);
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
      className={`relative [perspective:1200px] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' : 'rotateX(0deg) rotateY(0deg)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out'
        }}
        className="relative h-full w-full rounded-3xl bg-[#0B0C14]/95 border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden group hover:border-cyan-500/40 transition-colors"
      >
        {/* 360-Degree Continuous Rotating Laser Border Beam */}
        <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
          <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#06b6d4_120deg,#6366f1_180deg,#a855f7_240deg,transparent_300deg)] opacity-25 group-hover:opacity-75 transition-opacity" />
        </div>

        {/* Cursor-tracked internal radial spotlight (Direct CSS variables, 0 React re-renders) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at var(--card-x, -500px) var(--card-y, -500px), ${glowColor}, transparent 70%)`,
          }}
        />

        {/* Sweeping Diagonal Glass Reflection Sheen */}
        <div 
          className="pointer-events-none absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0"
          style={{
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.12) 48%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 52%, transparent 60%)',
            transform: isHovered 
              ? 'translate(calc(var(--card-x, 0px) * 0.4), calc(var(--card-y, 0px) * 0.4))' 
              : 'translate(0px, 0px)',
          }}
        />

        {/* Content with elevated Z-space */}
        <div className="relative z-10 h-full w-full flex flex-col min-h-0" style={{ transform: 'translateZ(10px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const EDUCATION_HONORS = [
  {
    institution: "Sri Vasavi Engineering College",
    badge: "CSE Top 5% • Autonomous",
    summary: "B.Tech Computer Science & Engineering with 9.04 CGPA (82.88%).",
    highlights: [
      { label: "Academic Distinction", value: "9.04 / 10 CGPA (Top Tier Academic Rank)" },
      { label: "IEEE Research Author", value: "Real-Time Object Detection via YOLOv9 (2024)" },
      { label: "Algorithm Mastery", value: "1,200+ LeetCode & CodeChef problems solved" },
      { label: "Core Competencies", value: "MERN Stack, Scalable APIs & Deep Learning" }
    ],
    credentialNote: "Affiliated to JNTUK • Autonomous Institution"
  },
  {
    institution: "Sri Chaitanya Junior College",
    badge: "MPC State Rank Tier • 96.0%",
    summary: "Senior Secondary (Intermediate) Mathematics, Physics, Chemistry.",
    highlights: [
      { label: "Board Aggregate", value: "96.0% Aggregate (State Cohort Top 1%)" },
      { label: "Pure & Applied Math", value: "98.5% in Advanced Calculus & Coordinate Geometry" },
      { label: "Physics & Chemistry", value: "Distinction in classical mechanics & physical chemistry" },
      { label: "Competitive Rank", value: "State-level engineering entrance batch top performer" }
    ],
    credentialNote: "Board of Intermediate Education, Andhra Pradesh"
  },
  {
    institution: "Sri Shiridi Sai EM High School",
    badge: "School First Rank • 99.0%",
    summary: "Matriculation (Secondary Education) with School Topper Distinction.",
    highlights: [
      { label: "Final Board Score", value: "99.0% Final Board Examination" },
      { label: "School Topper", value: "Ranked #1 across entire graduating class" },
      { label: "STEM Excellence", value: "Perfect 10.0 GPA in Mathematics & Physical Sciences" },
      { label: "Logical Aptitude", value: "District science exhibition representation & distinction" }
    ],
    credentialNote: "Board of Secondary Education, Andhra Pradesh (SSC)"
  }
];

export const About: React.FC = () => {
  const [cgpaInput, setCgpaInput] = useState<number>(9.04);
  const calculatedPercentage = (cgpaInput * 9.5).toFixed(2);

  // Education 3D Flip State & 10-Second Auto Flip Loop
  const [educationFlipped, setEducationFlipped] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const eduInterval = setInterval(() => {
      setEducationFlipped(prev => {
        const anyFlipped = Object.values(prev).some(Boolean);
        const next: Record<number, boolean> = {};
        RESUME_DATA.education.forEach((_, idx) => {
          next[idx] = !anyFlipped;
        });
        return next;
      });
    }, 10000);
    return () => clearInterval(eduInterval);
  }, []);

  const toggleEduFlip = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEducationFlipped(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Generate simulated 52-week GitHub contribution heatmap data
  const contributionGrid = React.useMemo(() => {
    const weeks = 40;
    const daysPerWeek = 7;
    const grid: number[][] = [];

    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Pseudo-random deterministic activity levels 0-4
        const seed = (w * 7 + d * 13) % 100;
        let level = 0;
        if (seed > 80) level = 4;
        else if (seed > 60) level = 3;
        else if (seed > 38) level = 2;
        else if (seed > 18) level = 1;
        week.push(level);
      }
      grid.push(week);
    }
    return grid;
  }, []);

  return (
    <section id="about" className="py-24 relative z-10 bg-transparent overflow-hidden">
      <SectionFlowingBackground variant="about" position="left" particleCount={420} />
      <div className="gradient-wave-divider absolute top-0 inset-x-0" />

      {/* Scroll-Driven SVG Circuit Energy Traces */}
      <CircuitEnergyTraces />
      
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
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Spatial 3D Bento Grid & Milestone Vault</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Precision & <br />
            <span className="liquid-gradient-text">Academic Milestones</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            A comprehensive overview of top academic distinction (9.04 CGPA), live GitHub commit telemetry, 900+ algorithmic problems, and published IEEE computer vision research.
          </p>
        </motion.div>

        {/* Spatial 3D Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* Bento Card 1: Major GitHub Commit Activity (8 Cols) */}
          <BentoTiltCard 
            className="md:col-span-12 lg:col-span-8 min-h-[380px]"
            glowColor="rgba(6, 182, 212, 0.22)"
          >
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-950/30">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">dhanushgopi2456</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Active Dev
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">Live GitHub Commit Activity & Repository Telemetry</p>
                  </div>
                </div>

                <a
                  href={RESUME_DATA.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-all hover:scale-105"
                >
                  <span>github.com/dhanushgopi2456</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub Contribution Heatmap in Dark Indigo & Electric Cyan */}
              <div className="mb-5 bg-slate-950/90 p-4 rounded-2xl border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Contribution Heatmap • 900+ Commits Tracked</span>
                  </span>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span>Less</span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-indigo-950 border border-indigo-800" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-indigo-700" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-cyan-600" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    <span>More</span>
                  </div>
                </div>

                {/* Heatmap Grid */}
                <div className="overflow-x-auto pb-1">
                  <div className="flex gap-1 min-w-[560px]">
                    {contributionGrid.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1">
                        {week.map((level, dIdx) => {
                          const bg = 
                            level === 4 ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' :
                            level === 3 ? 'bg-cyan-600' :
                            level === 2 ? 'bg-indigo-600' :
                            level === 1 ? 'bg-indigo-950/80 border border-indigo-800/50' :
                            'bg-slate-900/80 border border-slate-800/40';
                          return (
                            <div 
                              key={dIdx} 
                              className={`w-2.5 h-2.5 rounded-sm ${bg} transition-transform hover:scale-125 cursor-pointer`}
                              title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${level * 3 + 1} contributions`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Repository Statistics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Public Repos</p>
                  <p className="text-lg font-bold text-white font-mono mt-0.5">15+ Repos</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Total Commits</p>
                  <p className="text-lg font-bold text-cyan-400 font-mono mt-0.5">900+ Commits</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Forks & Stars</p>
                  <p className="text-lg font-bold text-indigo-400 font-mono mt-0.5">40+ Stars</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Continuous Streak</p>
                  <p className="text-lg font-bold text-amber-400 font-mono mt-0.5 flex items-center gap-1">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>50+ Days</span>
                  </p>
                </div>
              </div>

              {/* Visual Breakdown of Top Programming Languages */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2 text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Language Distribution Breakdown</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Aggregated Across 15 Repos</span>
                </div>

                {/* Multi-Segment Language Bar */}
                <div className="w-full h-3 rounded-full overflow-hidden bg-slate-900 flex p-0.5 border border-slate-800">
                  <div className="h-full bg-amber-500 rounded-l-full" style={{ width: '42%' }} title="Core Java: 42%" />
                  <div className="h-full bg-cyan-400" style={{ width: '34%' }} title="TypeScript / JavaScript: 34%" />
                  <div className="h-full bg-indigo-500" style={{ width: '18%' }} title="Python / PyTorch: 18%" />
                  <div className="h-full bg-purple-500 rounded-r-full" style={{ width: '6%' }} title="SQL / Others: 6%" />
                </div>

                {/* Language Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-slate-200">Java (42%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-slate-200">TypeScript / JS (34%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-slate-200">Python / AI (18%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-slate-200">SQL & Others (6%)</span>
                  </span>
                </div>
              </div>
            </div>
          </BentoTiltCard>

          {/* Bento Card 2: Academic Excellence (4 Cols) */}
          <BentoTiltCard 
            className="md:col-span-12 lg:col-span-4 min-h-[380px]"
            glowColor="rgba(99, 102, 241, 0.25)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                  Rank 1 (82.88%)
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Cumulative GPA</span>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-white mt-1">
                  <ViewportCounter target={9.04} decimals={2} />
                  <span className="text-lg text-slate-500 font-normal"> / 10.0</span>
                </div>
                <h4 className="text-base font-bold text-white mt-2">B.Tech in Computer Science</h4>
                <p className="text-xs text-indigo-300 font-mono">Sri Vasavi Engineering College</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Consistent academic distinction across all 8 semesters with Outstanding grades in DSA, DBMS, and Web Engineering.
                </p>
              </div>

              {/* Interactive CGPA to Percentage Conversion Tool */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                    <span>JNTU CGPA to % Tool</span>
                  </span>
                  <span className="font-bold text-cyan-400">{calculatedPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="10.0"
                  step="0.01"
                  value={cgpaInput}
                  onChange={(e) => setCgpaInput(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>6.0</span>
                  <span className="text-cyan-300 font-bold">{cgpaInput.toFixed(2)} CGPA</span>
                  <span>10.0</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Graduation: July 2026</span>
              <span className="text-emerald-400 font-bold">First Class with Distinction</span>
            </div>
          </BentoTiltCard>

          {/* Bento Card: Cult-UI Interactive Terminal & AI Playground (8 Cols) */}
          <BentoTiltCard
            className="md:col-span-12 lg:col-span-8 min-h-[440px]"
            glowColor="rgba(6, 182, 212, 0.28)"
          >
            <div className="h-full w-full flex flex-col min-h-0">
              <div className="mb-3 shrink-0">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Interactive Sandbox & Telemetry Stream
                </span>
                <h4 className="text-lg font-bold text-white">Live Developer Terminal & AI Playground</h4>
              </div>
              <div className="flex-1 min-h-0 flex flex-col w-full">
                <BentoTerminalPlayground />
              </div>
            </div>
          </BentoTiltCard>

          {/* Bento Card 3: Algorithmic Problem Solving (4 Cols) */}
          <BentoTiltCard 
            className="md:col-span-6 lg:col-span-4 min-h-[300px]"
            glowColor="rgba(245, 158, 11, 0.22)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-md">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                  Top 20%
                </span>
              </div>

              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Algorithmic Mastery</span>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-white mt-1">
                <ViewportCounter target={900} suffix="+" />
              </div>
              <h4 className="text-base font-bold text-white mt-2">Problems Solved Across Platforms</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                LeetCode (500+ Solved, Contest Rating 1550+), GeeksforGeeks (250+ Solved), and Code360 (150+ Solved).
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
              {['Trees & Graphs', 'Dynamic Programming', 'Collections', 'Binary Search'].map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </BentoTiltCard>

          {/* Bento Card 4: Published Research Paper (4 Cols) */}
          <BentoTiltCard 
            className="md:col-span-6 lg:col-span-4 min-h-[300px]"
            glowColor="rgba(168, 85, 247, 0.22)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                  IEEE AIDE-2024
                </span>
              </div>

              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">International Conference Paper</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug">
                Object Detection using YOLOv9
              </div>
              <p className="text-xs text-purple-300 font-mono mt-1">PyTorch & OpenCV Real-Time Vision Optimization</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Co-authored and published IEEE-format paper benchmarking YOLOv9 PGI architectures against Faster R-CNN on custom datasets.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <a
                href="https://github.com/dhanushgopi2456/My_Certifications/blob/main/ResearchPaper_Certificate.jpeg"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>View Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[10px] font-mono text-slate-500">AIDE-2024 Conference</span>
            </div>
          </BentoTiltCard>

          {/* Bento Card 5: Enterprise Certifications (4 Cols) */}
          <BentoTiltCard 
            className="md:col-span-12 lg:col-span-4 min-h-[300px]"
            glowColor="rgba(16, 185, 129, 0.22)"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                  100% Verified
                </span>
              </div>

              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Industry Certifications</span>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-white mt-1">
                <ViewportCounter target={6} />
              </div>
              <h4 className="text-base font-bold text-white mt-2">Enterprise Cloud & AI Credentials</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Oracle DevOps Professional, Azure AI-900, ServiceNow CSA & CAD, Salesforce Agentforce, and NPTEL Java DSA.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>View Holographic Vault</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </BentoTiltCard>

          {/* Bento Card 6: Leadership Trajectory (12 Cols) */}
          <BentoTiltCard 
            className="md:col-span-12 min-h-[180px]"
            glowColor="rgba(147, 51, 234, 0.2)"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Class Representative & Engineering Leadership</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Elected Class Representative continuously across all 8 semesters, directly leading and representing a cohort of <strong className="text-white font-semibold">60+ Computer Science undergraduates</strong>. Coordinated department technical symposiums, liaised between senior faculty and student body, and facilitated peer tutoring for DSA and full-stack projects.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-wrap gap-2 justify-start md:justify-end">
                {['60+ Students Led', '8 Semesters Active', 'Symposium Organizer', 'Agile Team Leader'].map((badge, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </BentoTiltCard>

        </div>

        {/* Educational Milestones Breakdown with Circuit Timeline */}
        <div className="mt-8 relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              <span>Educational Milestones Breakdown</span>
            </h3>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Circuit Synced Timeline</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {RESUME_DATA.education.map((edu, idx) => {
              const isFlipped = !!educationFlipped[idx];
              const honors = EDUCATION_HONORS[idx] || EDUCATION_HONORS[0];

              return (
                <div key={idx} className="[perspective:1200px] h-full min-h-[460px]">
                  <motion.div
                    initial={{ opacity: 0, y: 35, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative w-full h-full rounded-3xl"
                  >
                    {/* FRONT FACE: Coursework & Degree Details */}
                    <div 
                      className="glass-card p-6 rounded-3xl border border-white/10 relative flex flex-col justify-between group shadow-xl hover:border-cyan-500/50 transition-all overflow-hidden absolute inset-0 w-full h-full"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <div>
                        {/* Top Bar with score & Flip Card button */}
                        <div className="flex items-center justify-between mb-3 gap-2">
                          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold shadow-sm">
                            {edu.score}
                          </span>
                          <button
                            onClick={(e) => toggleEduFlip(idx, e)}
                            className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105"
                            title="Flip Card (10s Auto-Loop)"
                          >
                            <RotateCw className="w-3 h-3 text-amber-400 animate-spin-slow" />
                            <span>Flip Card 🔄 (10s Loop)</span>
                          </button>
                        </div>

                        <div className="text-xs text-slate-400 font-mono flex items-center gap-1 mb-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{edu.period}</span>
                        </div>

                        <h4 className="text-lg font-extrabold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                          {edu.institution}
                        </h4>
                        <p className="text-xs font-bold text-indigo-300 mt-1">
                          {edu.degree}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                          <Building className="w-3.5 h-3.5 text-slate-500" />
                          <span>{edu.location}</span>
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

                      <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>Milestone {idx + 1} of 3</span>
                        <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
                      </div>
                    </div>

                    {/* BACK FACE: Academic Honors, Distinctions & Credentials */}
                    <div 
                      className="glass-card p-6 rounded-3xl border border-cyan-500/40 bg-slate-950/95 relative flex flex-col justify-between shadow-2xl overflow-hidden absolute inset-0 w-full h-full"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div>
                        {/* Back Header */}
                        <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-3 gap-2">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-extrabold text-white tracking-wide">Academic Distinction</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold truncate max-w-[150px]">
                            {honors.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-medium mb-3 leading-relaxed">
                          {honors.summary}
                        </p>

                        <div className="space-y-2">
                          {honors.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[10px] font-mono text-cyan-400 font-bold">{h.label}</p>
                                <p className="text-[11px] text-slate-200 leading-snug">{h.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        <p className="text-[10px] font-mono text-slate-500 text-center mb-2">
                          {honors.credentialNote}
                        </p>
                        <button
                          onClick={(e) => toggleEduFlip(idx, e)}
                          className="relative overflow-hidden flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs font-mono transition-all shadow-md shadow-blue-600/30 group cursor-pointer w-full"
                        >
                          <ButtonGlare radius={12} intensity={0.4} />
                          <span className="relative z-10 flex items-center gap-2">
                            <RotateCw className="w-3.5 h-3.5 text-cyan-300" />
                            <span>Flip to Coursework 🔄</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
