import React, { useState } from 'react';
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

export const Projects: React.FC = () => {
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  // Mouse tracking for card spotlights
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredProjectId(id);
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

  const renderProjectMicroPreview = (type: string) => {
    switch (type) {
      case 'kanban':
        return <KanbanMicroPreview />;
      case 'grader':
        return <GraderMicroPreview />;
      case 'ecommerce':
        return <FreshMartMicroPreview />;
      case 'route':
        return <RoutePlannerMicroPreview />;
      case 'yolo':
        return <YoloMicroPreview />;
      default:
        return <KanbanMicroPreview />;
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
    <section id="projects" className="py-24 relative z-10 bg-transparent">
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

                    {/* Cursor-tracked internal radial spotlight */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                      style={{
                        opacity: hoveredProjectId === proj.id ? 1 : 0,
                        background: `radial-gradient(400px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(99, 102, 241, 0.22), transparent 70%)`,
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

                      {/* Live, Self-Playing Interactive Micro-Preview */}
                      <div className="p-3 bg-slate-950/90 border-b border-white/5 h-44">
                        {renderProjectMicroPreview(proj.mockType)}
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

        {/* Interactive Prototype Simulator Drawer Modal */}
        <AnimatePresence>
          {activeDemoProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="bg-slate-900 border border-white/10 rounded-[32px] max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col backdrop-blur-2xl"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-600/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{activeDemoProject.title}</h3>
                      <p className="text-xs font-mono text-cyan-400">Live In-Browser Web Prototype</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeakProject(activeDemoProject)}
                      className={`relative overflow-hidden group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        speechState.isSpeaking && speechState.currentText.includes(activeDemoProject.title)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                      }`}
                      title="Listen to 2-line explanation"
                    >
                      <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 1, g: 0.6, b: 0.1, a: 1 }} />
                      <span className="relative z-10 flex items-center gap-1.5">
                        {speechState.isSpeaking && speechState.currentText.includes(activeDemoProject.title) ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current text-amber-400" />
                            <span>Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Audio Guide</span>
                          </>
                        )}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveDemoProject(null)}
                      className="relative overflow-hidden group p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <ButtonGlare radius={12} intensity={0.3} />
                      <span className="relative z-10">
                        <X className="w-5 h-5" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Modal Body Simulator depending on mockType */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  
                  {activeDemoProject.mockType === 'ecommerce' && (
                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      
                      {/* Top App Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5 text-emerald-400" />
                          <span className="font-bold text-sm text-white">FreshMart E-Commerce</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                            Cart ({cartCount}) • ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <p className="text-xs text-slate-400">Click items to test REST API Cart State Workflow:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {freshMartItems.map(item => (
                          <div 
                            key={item.id}
                            className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                              item.added 
                                ? 'bg-emerald-950/30 border-emerald-500/50' 
                                : 'bg-slate-900 border-slate-800'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold text-white">{item.name}</p>
                              <p className="text-[11px] font-mono text-slate-400">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => toggleFreshMartItem(item.id)}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                item.added 
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30' 
                                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
                              }`}
                            >
                              {item.added ? 'Remove' : 'Add to Cart'}
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {activeDemoProject.mockType === 'kanban' && (
                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Kanban className="w-5 h-5 text-indigo-400" />
                          <span className="font-bold text-sm text-white">Team Task Board (RBAC)</span>
                        </div>
                        <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30 font-bold">
                          Role: JWT Admin
                        </span>
                      </div>

                      {/* Add Task Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="New task title..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                        <button
                          onClick={handleAddTask}
                          className="relative overflow-hidden group px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors"
                        >
                          <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.4, g: 0.4, b: 1, a: 1 }} />
                          <span className="relative z-10">Add Task</span>
                        </button>
                      </div>

                      {/* Columns */}
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {['To Do', 'In Progress', 'Done'].map(colStatus => (
                          <div key={colStatus} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                            <p className="text-[11px] font-mono font-bold text-slate-300 mb-2 uppercase tracking-wider">
                              {colStatus}
                            </p>
                            <div className="space-y-2">
                              {tasks.filter(t => t.status === colStatus).map(t => (
                                <div key={t.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                                  <p className="font-medium text-white">{t.title}</p>
                                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900">
                                    <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                                      {t.role}
                                    </span>
                                    {colStatus !== 'Done' && (
                                      <button 
                                        onClick={() => moveTask(t.id, colStatus === 'To Do' ? 'In Progress' : 'Done')}
                                        className="text-[10px] text-indigo-400 font-mono hover:underline"
                                      >
                                        Next &rarr;
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {activeDemoProject.mockType === 'yolo' && (
                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-purple-400" />
                          <span className="font-bold text-sm text-white">YOLOv9 Real-Time Media Inference</span>
                        </div>
                        <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30 font-bold">
                          Flask Microservice
                        </span>
                      </div>

                      {/* Vision Simulator Viewport */}
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
                        <img
                          src={
                            selectedYoloImage === 'traffic'
                              ? 'https://images.unsplash.com/photo-1506521782020-185d6595c8c6?auto=format&fit=crop&q=80&w=800'
                              : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
                          }
                          alt="Inference frame"
                          className="w-full h-full object-cover"
                        />

                        {/* Simulated Bounding Boxes Overlay */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-24 border-2 border-emerald-400 rounded bg-emerald-500/10 backdrop-blur-[1px] p-1 shadow-lg shadow-emerald-500/30">
                          <span className="text-[10px] font-mono bg-emerald-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded">
                            {selectedYoloImage === 'traffic' ? 'Vehicle 97.4%' : 'Developer 99.1%'}
                          </span>
                        </div>

                        <div className="absolute bottom-1/3 right-1/4 w-28 h-20 border-2 border-purple-400 rounded bg-purple-500/10 backdrop-blur-[1px] p-1 shadow-lg shadow-purple-500/30">
                          <span className="text-[10px] font-mono bg-purple-500 text-white font-extrabold px-1.5 py-0.5 rounded">
                            {selectedYoloImage === 'traffic' ? 'Person 94.2%' : 'Laptop 98.6%'}
                          </span>
                        </div>
                      </div>

                      {/* Scene Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono font-bold">Sample Feeds:</span>
                        <button
                          onClick={() => setSelectedYoloImage('traffic')}
                          className={`relative overflow-hidden group px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            selectedYoloImage === 'traffic' 
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          <ButtonGlare radius={12} intensity={selectedYoloImage === 'traffic' ? 0.4 : 0.2} frontColor={{ r: 0.7, g: 0.3, b: 0.9, a: 1 }} />
                          <span className="relative z-10">Urban Traffic Feed</span>
                        </button>
                        <button
                          onClick={() => setSelectedYoloImage('team')}
                          className={`relative overflow-hidden group px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            selectedYoloImage === 'team' 
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          <ButtonGlare radius={12} intensity={selectedYoloImage === 'team' ? 0.4 : 0.2} frontColor={{ r: 0.7, g: 0.3, b: 0.9, a: 1 }} />
                          <span className="relative z-10">Indoor Workstation</span>
                        </button>
                      </div>

                    </div>
                  )}

                  {activeDemoProject.mockType === 'grader' && (
                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      
                      {/* Simulator Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-emerald-400" />
                          <div>
                            <span className="font-bold text-sm text-white">VedaAI Evaluation Engine</span>
                            <p className="text-[10px] text-slate-400 font-mono">Google Gemini Vision &bull; Deterministic Label Mapping &bull; pdf.js</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleRunGraderScan}
                            disabled={isGradingScanning}
                            className="relative overflow-hidden group px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                          >
                            <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.2, g: 0.9, b: 0.5, a: 1 }} />
                            <Sparkles className={`w-3.5 h-3.5 ${isGradingScanning ? 'animate-spin' : ''}`} />
                            <span className="relative z-10">{isGradingScanning ? 'Analyzing OCR...' : 'Re-run Evaluation'}</span>
                          </button>
                          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                            Live Simulation
                          </span>
                        </div>
                      </div>

                      {/* Main Dual-View Simulator: Left Answer Sheet with Bounding Boxes, Right Grading Feedback */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Simulated Handwritten Answer Sheet */}
                        <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 p-4 overflow-hidden flex flex-col justify-between min-h-[260px]">
                          {/* Scan Sweep line animation when scanning */}
                          {isGradingScanning && (
                            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-pulse top-0 bottom-0 m-auto z-20 pointer-events-none" />
                          )}

                          <div>
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-3">
                              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                {selectedGraderSample === 'algo' ? 'AnswerSheet_Page_1.pdf' : 'AnswerSheet_Page_2.pdf'}
                              </span>
                              <span className="text-[10px] font-mono bg-cyan-950/80 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded">
                                {selectedGraderSample === 'algo' ? 'Roll: 21BCE0456' : 'Roll: 21BCE0892'}
                              </span>
                            </div>

                            {/* Question Paper Banner */}
                            <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-800/90 mb-3">
                              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                                <span className="font-bold text-amber-400">Extracted Question (Q1)</span>
                                <span>Max Marks: 10</span>
                              </div>
                              <p className="text-xs text-slate-200 font-medium">
                                {selectedGraderSample === 'algo' 
                                  ? 'Explain QuickSort partition scheme and analyze worst-case recurrence relation.'
                                  : 'Differentiate between 2PL and Strict 2PL. How does Strict 2PL prevent cascading aborts?'}
                              </p>
                            </div>

                            {/* Simulated Bounding Box for Handwritten Answer */}
                            <div className="relative p-3 rounded-lg border-2 border-emerald-400/80 bg-emerald-950/20 shadow-lg shadow-emerald-500/10">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[9px] font-mono font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded">
                                  BBox #1: Label Q1 [98.6% Conf]
                                </span>
                                <span className="text-[9px] font-mono text-emerald-400">Page 1 &bull; (x: 48, y: 130)</span>
                              </div>
                              <p className="text-xs text-slate-300 italic font-serif leading-relaxed select-none">
                                {selectedGraderSample === 'algo'
                                  ? '"In Lomuto partition, we choose the last element as pivot. If already sorted in ascending order, partitions are 0 and n-1: T(n) = T(n-1) + O(n) giving O(n²) worst case."'
                                  : '"2PL unlocks dynamically in shrinking phase. Strict 2PL holds all Exclusive locks until commit/abort, which guarantees no dirty read cascading aborts occur."'}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span>Deterministic Map: <strong className="text-emerald-400">Label Matched</strong></span>
                            <span>pdf.js Canvas: <strong className="text-cyan-400">Rasterized 300 DPI</strong></span>
                          </div>
                        </div>

                        {/* AI Grading & Feedback Card */}
                        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-amber-400" />
                                Gemini AI Evaluation
                              </span>
                              <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
                                <span>Awarded:</span>
                                <span className="text-sm font-extrabold text-emerald-200">
                                  {selectedGraderSample === 'algo' ? '9.5 / 10' : '8.5 / 10'}
                                </span>
                              </div>
                            </div>

                            {/* Criteria Breakdown */}
                            <div className="space-y-1.5 text-xs font-mono">
                              <div className="flex justify-between items-center bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/60">
                                <span className="text-slate-400">Concept Explanation:</span>
                                <span className="text-emerald-400 font-bold">{selectedGraderSample === 'algo' ? '4.8 / 5.0' : '4.5 / 5.0'}</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/60">
                                <span className="text-slate-400">Mathematical / Proof Accuracy:</span>
                                <span className="text-emerald-400 font-bold">{selectedGraderSample === 'algo' ? '4.7 / 5.0' : '4.0 / 5.0'}</span>
                              </div>
                            </div>

                            {/* Structured AI Feedback */}
                            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs">
                              <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono text-[10px] mb-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Structured Rubric Feedback</span>
                              </div>
                              <p className="text-slate-300 text-[11px] leading-relaxed">
                                {selectedGraderSample === 'algo'
                                  ? 'Flawless recurrence tree formulation and base case analysis. Bounding box confirms full mathematical rigor with correct O(n²) derivation.'
                                  : 'Strong distinction between standard 2PL and Strict 2PL. Correctly identified serializability and commit-phase exclusivity.'}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/60">
                            <span className="text-[9px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 px-2 py-0.5 rounded">
                              Google Gemini Vision
                            </span>
                            <span className="text-[9px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded">
                              Deterministic Q-Map
                            </span>
                            <span className="text-[9px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded">
                              JSON-Schema Enforced
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Sample Exam Switcher */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-slate-400 font-mono font-bold">Exam Sample:</span>
                        <button
                          onClick={() => setSelectedGraderSample('algo')}
                          className={`relative overflow-hidden group px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            selectedGraderSample === 'algo' 
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          <ButtonGlare radius={12} intensity={selectedGraderSample === 'algo' ? 0.4 : 0.2} frontColor={{ r: 0.2, g: 0.9, b: 0.5, a: 1 }} />
                          <span className="relative z-10">Algorithms (CS301)</span>
                        </button>
                        <button
                          onClick={() => setSelectedGraderSample('dbms')}
                          className={`relative overflow-hidden group px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            selectedGraderSample === 'dbms' 
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          <ButtonGlare radius={12} intensity={selectedGraderSample === 'dbms' ? 0.4 : 0.2} frontColor={{ r: 0.2, g: 0.9, b: 0.5, a: 1 }} />
                          <span className="relative z-10">Database Systems (CS304)</span>
                        </button>
                      </div>

                    </div>
                  )}

                  {activeDemoProject.mockType === 'route' && (
                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                      
                      {/* Simulator Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-cyan-400" />
                          <div>
                            <span className="font-bold text-sm text-white">HOS Trip Engine & ELD Daily Logs</span>
                            <p className="text-[10px] text-slate-400 font-mono">FMCSA 49 CFR &bull; Leaflet Geospatial Routing &bull; 24-hr RODS</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleRecalculateRoute}
                            disabled={isRouteCalculating}
                            className="relative overflow-hidden group px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
                          >
                            <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.1, g: 0.8, b: 0.9, a: 1 }} />
                            <Navigation className={`w-3.5 h-3.5 ${isRouteCalculating ? 'animate-spin' : ''}`} />
                            <span className="relative z-10">{isRouteCalculating ? 'Recalculating...' : 'Recalculate HOS'}</span>
                          </button>
                          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30 font-bold">
                            Live Simulation
                          </span>
                        </div>
                      </div>

                      {/* Route Preset Selector & Sub-Tabs */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        {/* Route Selector */}
                        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                          <button
                            onClick={() => setSelectedRouteSample('chicago-dallas')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                              selectedRouteSample === 'chicago-dallas'
                                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Chicago ➔ Dallas (925 mi)
                          </button>
                          <button
                            onClick={() => setSelectedRouteSample('atlanta-miami')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                              selectedRouteSample === 'atlanta-miami'
                                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Atlanta ➔ Miami (663 mi)
                          </button>
                        </div>

                        {/* View Mode Tabs */}
                        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
                          <button
                            onClick={() => setRouteActiveTab('route')}
                            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                              routeActiveTab === 'route' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Route & Stops
                          </button>
                          <button
                            onClick={() => setRouteActiveTab('eld')}
                            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                              routeActiveTab === 'eld' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            24h ELD Grid
                          </button>
                          <button
                            onClick={() => setRouteActiveTab('compliance')}
                            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                              routeActiveTab === 'compliance' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            HOS Check
                          </button>
                        </div>
                      </div>

                      {/* Tab 1: Route & Waypoints View */}
                      {routeActiveTab === 'route' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                              <span className="text-[10px] text-slate-400 block">Total Distance</span>
                              <span className="text-sm font-bold text-cyan-400">
                                {selectedRouteSample === 'chicago-dallas' ? '925 Miles' : '663 Miles'}
                              </span>
                            </div>
                            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                              <span className="text-[10px] text-slate-400 block">Drive Time</span>
                              <span className="text-sm font-bold text-amber-400">
                                {selectedRouteSample === 'chicago-dallas' ? '13h 45m' : '9h 55m'}
                              </span>
                            </div>
                            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                              <span className="text-[10px] text-slate-400 block">Required Rest</span>
                              <span className="text-sm font-bold text-emerald-400">
                                {selectedRouteSample === 'chicago-dallas' ? '1 Rest (30m)' : '1 Rest (30m)'}
                              </span>
                            </div>
                            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                              <span className="text-[10px] text-slate-400 block">Fuel Stops</span>
                              <span className="text-sm font-bold text-purple-400">
                                {selectedRouteSample === 'chicago-dallas' ? '1 Stop (142 Gal)' : '1 Stop (102 Gal)'}
                              </span>
                            </div>
                          </div>

                          {/* Interactive Waypoints Stepper */}
                          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                              Automated Stop Schedule & Geocoded Waypoints
                            </span>
                            
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                                  <div>
                                    <p className="font-bold text-white">
                                      {selectedRouteSample === 'chicago-dallas' ? 'Origin: Chicago Logistics Hub, IL' : 'Origin: Atlanta Freight Center, GA'}
                                    </p>
                                    <p className="text-[10px] text-slate-400">Depart 06:00 AM &bull; Pre-Trip Inspection (15 min)</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                                  On Duty
                                </span>
                              </div>

                              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                                  <div>
                                    <p className="font-bold text-white">
                                      {selectedRouteSample === 'chicago-dallas' ? 'Mandatory Rest Break (Effingham, IL)' : 'Mandatory Rest Break (Lake City, FL)'}
                                    </p>
                                    <p className="text-[10px] text-slate-400">Stop at 13:30 (30 min FMCSA break) &bull; Cumulative driving 7.5h</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                                  Off Duty
                                </span>
                              </div>

                              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                  <div>
                                    <p className="font-bold text-white">
                                      {selectedRouteSample === 'chicago-dallas' ? 'Destination: Dallas Delivery Terminal, TX' : 'Destination: Port of Miami Terminal, FL'}
                                    </p>
                                    <p className="text-[10px] text-slate-400">Arrive 20:15 &bull; Post-trip inspection & delivery signoff</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                                  Completed
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 2: 24-Hour ELD Grid */}
                      {routeActiveTab === 'eld' && (
                        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <div>
                              <span className="font-bold text-xs text-white">Driver Daily Log (24-Hour RODS Grid)</span>
                              <p className="text-[10px] text-slate-400 font-mono">FMCSA Rule 49 CFR Part 395.8 &bull; Date: Nov 9, 2026</p>
                            </div>
                            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-bold">
                              ELD Verified
                            </span>
                          </div>

                          {/* Duty Status Breakdown Grid */}
                          <div className="space-y-2 text-xs font-mono">
                            <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                              <span className="text-slate-300">1. Off Duty (OFF):</span>
                              <span className="font-bold text-emerald-400">10.0 hrs (Rest + 30m Break)</span>
                            </div>
                            <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                              <span className="text-slate-300">2. Sleeper Berth (SB):</span>
                              <span className="font-bold text-slate-400">0.0 hrs</span>
                            </div>
                            <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                              <span className="text-slate-300">3. Driving (D):</span>
                              <span className="font-bold text-cyan-400">10.5 hrs (Interstate Cruising)</span>
                            </div>
                            <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                              <span className="text-slate-300">4. On Duty Not Driving (ON):</span>
                              <span className="font-bold text-amber-400">3.5 hrs (Inspections & Fuel)</span>
                            </div>
                          </div>

                          {/* Visual 24h Bar */}
                          <div>
                            <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
                              <span>00:00</span>
                              <span>06:00</span>
                              <span>12:00</span>
                              <span>18:00</span>
                              <span>24:00</span>
                            </div>
                            <div className="h-3 w-full rounded-md overflow-hidden flex border border-slate-800">
                              <div className="h-full bg-emerald-500" style={{ width: '25%' }} title="Off Duty" />
                              <div className="h-full bg-cyan-500" style={{ width: '45%' }} title="Driving" />
                              <div className="h-full bg-amber-500" style={{ width: '15%' }} title="On Duty" />
                              <div className="h-full bg-emerald-500" style={{ width: '15%' }} title="Off Duty" />
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 text-[9px] font-mono text-slate-400">
                              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> Off Duty</span>
                              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-cyan-500" /> Driving</span>
                              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500" /> On Duty</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 3: HOS Safety Compliance */}
                      {routeActiveTab === 'compliance' && (
                        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs font-mono">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <span className="font-bold text-white">FMCSA Hours of Service (HOS) Status</span>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                              All Rules Compliant
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-slate-400 text-[11px]">11-Hour Driving Limit:</span>
                                <span className="text-emerald-400 font-bold">10.5 / 11.0h</span>
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '95%' }} />
                              </div>
                              <span className="text-[9px] text-slate-500 mt-1 block">30 min driving remaining</span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-slate-400 text-[11px]">14-Hour Duty Window:</span>
                                <span className="text-emerald-400 font-bold">13.5 / 14.0h</span>
                              </div>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '96%' }} />
                              </div>
                              <span className="text-[9px] text-slate-500 mt-1 block">30 min window remaining</span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-slate-400 text-[11px]">30-Minute Rest Break:</span>
                                <span className="text-emerald-400 font-bold">COMPLIANT</span>
                              </div>
                              <span className="text-[10px] text-slate-300">Taken at 7.5h continuous driving window</span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-slate-400 text-[11px]">70-Hour / 8-Day Cycle:</span>
                                <span className="text-cyan-400 font-bold">48.5 / 70.0h</span>
                              </div>
                              <span className="text-[10px] text-slate-300">21.5h on-duty available before restart</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tech Stack Footer Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[9px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 px-2 py-0.5 rounded">
                          React 19 &bull; Leaflet Maps
                        </span>
                        <span className="text-[9px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded">
                          FMCSA Part 395
                        </span>
                        <span className="text-[9px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded">
                          jsPDF ELD Export
                        </span>
                      </div>

                    </div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={activeDemoProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Repository Code</span>
                    </a>

                    {activeDemoProject.demoUrl && (
                      <a
                        href={activeDemoProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open {activeDemoProject.demoLabel || 'Live Application'}</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveDemoProject(null)}
                    className="relative overflow-hidden group px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                  >
                    <ButtonGlare radius={12} intensity={0.3} />
                    <span className="relative z-10">Done Testing</span>
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
