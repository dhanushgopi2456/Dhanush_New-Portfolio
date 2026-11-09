import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  Github, 
  Play, 
  X, 
  ShoppingBag, 
  Kanban, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Volume2, 
  Square,
  FileText,
  Award,
  ExternalLink,
  Truck,
  MapPin,
  Navigation,
  Clock,
  RotateCw
} from 'lucide-react';
import { RESUME_DATA, Project } from '../data/resumeData';
import { speakProjectExplanation, stopSpeech, subscribeSpeechState, VoiceSpeakerState } from '../utils/speechUtils';
import { ButtonGlare } from './ui/button-glare';
import { 
  KanbanMicroPreview,
  GraderMicroPreview,
  FreshMartMicroPreview,
  RoutePlannerMicroPreview,
  YoloMicroPreview,
  ArchitectureBackDiagram
} from './ProjectMicroPreviews';
import { SectionFlowingBackground } from './SectionFlowingBackground';

// Lazy-load modal and research spotlight
const ProjectTheaterModal = React.lazy(() => import('./ProjectTheaterModal').then(m => ({ default: m.ProjectTheaterModal })));
const ResearchYoloSpotlight = React.lazy(() => import('./ResearchYoloSpotlight').then(m => ({ default: m.ResearchYoloSpotlight })));

export const Projects: React.FC = () => {
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  // Mouse tracking for card spotlights (using direct DOM CSS variables to prevent re-renders)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--card-x', `${x}px`);
    e.currentTarget.style.setProperty('--card-y', `${y}px`);
    if (hoveredProjectId !== id) {
      setHoveredProjectId(id);
    }
  };

  // Project 3D Card Flip State
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // 10-Second Continuous Auto Flip Loop for all Project Cards
  React.useEffect(() => {
    const flipInterval = setInterval(() => {
      setFlippedCards(prev => {
        const anyFlipped = Object.values(prev).some(Boolean);
        const next: Record<string, boolean> = {};
        RESUME_DATA.projects.forEach(p => {
          next[p.id] = !anyFlipped;
        });
        return next;
      });
    }, 10000);
    return () => clearInterval(flipInterval);
  }, []);

  const toggleCardFlip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderProjectMicroPreview = (type: string, isHovered: boolean) => {
    switch (type) {
      case 'kanban':
        return <KanbanMicroPreview isHovered={isHovered} />;
      case 'grader':
        return <GraderMicroPreview isHovered={isHovered} />;
      case 'ecommerce':
        return <FreshMartMicroPreview isHovered={isHovered} />;
      case 'route':
        return <RoutePlannerMicroPreview isHovered={isHovered} />;
      case 'yolo':
        return <YoloMicroPreview isHovered={isHovered} />;
      default:
        return <KanbanMicroPreview isHovered={isHovered} />;
    }
  };

  // Voice Narration State
  const [speechState, setSpeechState] = useState<VoiceSpeakerState>({
    isSpeaking: false,
    isPaused: false,
    currentText: ''
  });

  React.useEffect(() => {
    const unsubscribe = subscribeSpeechState((state) => {
      setSpeechState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleSpeakProject = (proj: Project) => {
    const summaryToSpeak = proj.spokenSummary || proj.description;
    if (speechState.isSpeaking && (speechState.currentText.includes(proj.title) || speechState.activeSource === 'mp3')) {
      stopSpeech();
    } else {
      speakProjectExplanation(proj.title, summaryToSpeak, proj.id);
    }
  };

  // FreshMart Interactive State
  const [cartCount, setCartCount] = useState<number>(2);
  const [cartTotal, setCartTotal] = useState<number>(14.98);
  const [freshMartItems, setFreshMartItems] = useState([
    { id: 1, name: "Organic Farm Apples", price: 4.99, added: true },
    { id: 2, name: "Fresh Dairy Milk (1L)", price: 2.99, added: false },
    { id: 3, name: "Whole Grain Bread", price: 3.49, added: true },
    { id: 4, name: "Avocado Pack (3x)", price: 6.50, added: false }
  ]);

  // Task Manager State
  const [tasks, setTasks] = useState([
    { id: 1, title: "JWT Auth Middleware", status: "Done", role: "Admin" },
    { id: 2, title: "Mongoose Schema Indexing", status: "In Progress", role: "Manager" },
    { id: 3, title: "Tailwind UI Drag & Drop", status: "To Do", role: "Member" }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // YOLOv9 State
  const [selectedYoloImage, setSelectedYoloImage] = useState('traffic');

  // VedaAI Grader State
  const [selectedGraderSample, setSelectedGraderSample] = useState<'algo' | 'dbms'>('algo');
  const [isGradingScanning, setIsGradingScanning] = useState(false);

  const handleRunGraderScan = () => {
    setIsGradingScanning(true);
    setTimeout(() => {
      setIsGradingScanning(false);
    }, 1200);
  };

  // HOS Route Planner State
  const [selectedRouteSample, setSelectedRouteSample] = useState<'chicago-dallas' | 'atlanta-miami'>('chicago-dallas');
  const [routeActiveTab, setRouteActiveTab] = useState<'route' | 'eld' | 'compliance'>('route');
  const [isRouteCalculating, setIsRouteCalculating] = useState(false);

  const handleRecalculateRoute = () => {
    setIsRouteCalculating(true);
    setTimeout(() => {
      setIsRouteCalculating(false);
    }, 800);
  };

  const toggleFreshMartItem = (id: number) => {
    setFreshMartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextAdded = !item.added;
        if (nextAdded) {
          setCartCount(c => c + 1);
          setCartTotal(t => +(t + item.price).toFixed(2));
        } else {
          setCartCount(c => Math.max(0, c - 1));
          setCartTotal(t => Math.max(0, +(t - item.price).toFixed(2)));
        }
        return { ...item, added: nextAdded };
      }
      return item;
    }));
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), title: newTaskTitle, status: "To Do", role: "Member" }]);
    setNewTaskTitle('');
  };

  const moveTask = (id: number, nextStatus: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  return (
    <section id="projects" className="pt-24 pb-36 relative z-10 bg-transparent overflow-hidden">
      <SectionFlowingBackground variant="projects" position="left" particleCount={420} />
      <div className="gradient-wave-divider absolute top-0 inset-x-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered 3D Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 transform-gpu"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-950/20">
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Software Engineering Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Production Systems & <br />
            <span className="liquid-gradient-text">Interactive Prototypes</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Click "Interactive Demo" to test FMCSA route compliance, Gemini Vision AI, REST APIs, and YOLOv9 models directly inside the browser.
          </p>
        </motion.div>

        {/* Projects Cards Grid with 3D Tilt, Live Micro-Previews & 3D Architecture Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESUME_DATA.projects.map((proj, idx) => {
            const isFlipped = !!flippedCards[proj.id];

            return (
              <div
                key={proj.id}
                className="relative [perspective:1400px] min-h-[600px] w-full"
                onMouseMove={(e) => handleCardMouseMove(e, proj.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {/* FRONT OF CARD: Live Self-Playing Micro-Preview & Details */}
                  <div
                    className="glass-card rounded-[30px] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/50 shadow-2xl relative w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* 360 Continuous Laser Border Beam */}
                    <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                      <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#06b6d4_120deg,#6366f1_180deg,#a855f7_240deg,transparent_300deg)] opacity-35 group-hover:opacity-85 transition-opacity" />
                    </div>

                    {/* Cursor-tracked internal radial spotlight (Direct CSS variables, 0 React re-renders) */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                      style={{
                        opacity: hoveredProjectId === proj.id ? 1 : 0,
                        background: 'radial-gradient(400px circle at var(--card-x, -500px) var(--card-y, -500px), rgba(99, 102, 241, 0.22), transparent 70%)',
                      }}
                    />

                    <div>
                      {/* Top Bar with Category, Date, Live Badge & 3D Flip Toggle */}
                      <div className="p-4 pb-2 flex items-center justify-between gap-2 border-b border-white/5 bg-slate-950/60 backdrop-blur-md">
                        <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-cyan-300 font-mono text-[11px] font-bold shadow-md">
                          {proj.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {proj.demoUrl && proj.demoLabel === 'Live Link' && (
                            <a
                              href={proj.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-mono text-[9px] font-extrabold flex items-center gap-1 shadow-md hover:bg-emerald-900/90 transition-all hover:scale-105"
                              title="Live deployed website"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>LIVE</span>
                            </a>
                          )}

                          {/* 3D Flip Toggle Button */}
                          <button
                            onClick={(e) => toggleCardFlip(proj.id, e)}
                            className="px-2.5 py-1 rounded-full bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-500/40 text-indigo-300 font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer shadow-md"
                            title="Flip to inspect 3D System Architecture diagram"
                          >
                            <RotateCw className="w-3 h-3 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                            <span>3D Arch</span>
                          </button>
                        </div>
                      </div>

                      {/* Live Interactive Micro-Preview (Pauses when unhovered) */}
                      <div className="p-3 bg-slate-950/90 border-b border-white/5 h-44">
                        {renderProjectMicroPreview(proj.mockType, hoveredProjectId === proj.id)}
                      </div>

                      {/* Body Content with Elevated Parallax Depth */}
                      <div className="p-6">
                        <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                          {proj.title}
                        </h3>
                        <div className="flex items-center justify-between gap-2 mt-2">
                          <p className="text-xs font-mono text-cyan-400">
                            {proj.subtitle}
                          </p>

                          {/* Audio Overview Button */}
                          <button
                            onClick={() => handleSpeakProject(proj)}
                            className={`relative overflow-hidden flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer group ${
                              speechState.isSpeaking && (speechState.currentText.includes(proj.title) || speechState.activeSource === 'mp3')
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse shadow-md shadow-amber-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                            }`}
                            title="Listen to project overview"
                          >
                            <ButtonGlare radius={12} frontColor={{ r: 1, g: 0.6, b: 0.1, a: 1 }} />
                            <span className="relative z-10 flex items-center gap-1.5">
                              {speechState.isSpeaking && (speechState.currentText.includes(proj.title) || speechState.activeSource === 'mp3') ? (
                                <>
                                  <Square className="w-3 h-3 fill-current text-amber-400" />
                                  <span>Stop</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3 text-amber-400" />
                                  <span>Audio</span>
                                </>
                              )}
                            </span>
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mt-3">
                          {proj.description}
                        </p>

                        {/* Bullet Points */}
                        <div className="mt-4 space-y-2">
                          {proj.bulletPoints.map((bp, bIdx) => (
                            <p key={bIdx} className="text-[11px] text-slate-400 leading-normal flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{bp}</span>
                            </p>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                          {proj.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded-lg bg-slate-950/80 text-slate-300 border border-slate-800 text-[11px] font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-6 pt-0 space-y-2.5 relative z-10">
                      <div className="flex items-center gap-2.5">
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition-all border border-emerald-300/50 group cursor-pointer"
                          >
                            <ButtonGlare radius={12} frontColor={{ r: 0.2, g: 0.9, b: 0.7, a: 1 }} />
                            <ExternalLink className="relative z-10 w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                            <span className="relative z-10 tracking-wide">{proj.demoLabel || 'Live Link'}</span>
                          </a>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveDemoProject(proj)}
                          className={`relative overflow-hidden ${proj.demoUrl ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all border border-blue-400/30 group cursor-pointer`}
                        >
                          <ButtonGlare radius={12} />
                          <Play className="relative z-10 w-3.5 h-3.5 fill-current" />
                          <span className="relative z-10">Interactive Demo</span>
                        </motion.button>
                      </div>

                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="relative overflow-hidden w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold transition-all shadow-md group cursor-pointer"
                      >
                        <ButtonGlare radius={12} />
                        <Github className="relative z-10 w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="relative z-10">View GitHub Repository</span>
                      </a>
                    </div>
                  </div>

                  {/* BACK OF CARD: Animated System Architecture Diagram */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[30px] overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <ArchitectureBackDiagram
                      project={proj}
                      onFlipBack={() => toggleCardFlip(proj.id)}
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Published YOLOv9 Research Spotlight Banner with X-Ray Scanner (Suspense Lazy Chunk) */}
        <Suspense fallback={null}>
          <ResearchYoloSpotlight />
        </Suspense>

        {/* Flagship Spatial Project Theater Modal with Code, Architecture & Telemetry */}
        <Suspense fallback={null}>
          {activeDemoProject && (
            <ProjectTheaterModal
              project={activeDemoProject}
              onClose={() => setActiveDemoProject(null)}
            />
          )}
        </Suspense>

      </div>
    </section>
  );
};
