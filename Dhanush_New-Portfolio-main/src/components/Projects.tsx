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
  Square
} from 'lucide-react';
import { RESUME_DATA, Project } from '../data/resumeData';
import { speakProjectExplanation, stopSpeech, subscribeSpeechState, VoiceSpeakerState } from '../utils/speechUtils';

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
    <section id="projects" className="py-24 relative z-10 border-t border-white/10 bg-slate-950/80">
      
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
            Click "Interactive Demo" to test dynamic REST API endpoints, JWT auth, and YOLOv9 vision models directly inside the browser.
          </p>
        </motion.div>

        {/* Projects Cards Grid with 3D Tilt & Frosted Glass */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {RESUME_DATA.projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => handleCardMouseMove(e, proj.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              className="glass-card rounded-[30px] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/50 shadow-2xl relative transform-gpu"
            >
              {/* 360 Continuous Laser Border Beam */}
              <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#3b82f6_120deg,#06b6d4_180deg,#ec4899_240deg,transparent_300deg)] opacity-35 group-hover:opacity-80 transition-opacity" />
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
                {/* Project Image Header */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  {/* Holographic Glare */}
                  <div className="absolute inset-0 holographic-foil opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/90 border border-white/10 text-cyan-300 font-mono text-[11px] font-bold backdrop-blur-md shadow-md">
                    {proj.category}
                  </span>

                  {/* Date Tag */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-400 font-mono text-[10px] border border-slate-800">
                    {proj.date}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <p className="text-xs font-mono text-cyan-400">
                      {proj.subtitle}
                    </p>

                    {/* Audio Overview Button with Live Waveform */}
                    <button
                      onClick={() => handleSpeakProject(proj)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                        speechState.isSpeaking && (speechState.currentText.includes(proj.title) || speechState.activeSource === 'mp3')
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse shadow-md shadow-amber-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                      }`}
                      title="Listen to project overview"
                    >
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

              {/* Card Footer Actions with Magnetic Feel */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3 relative z-10">
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-bold transition-all shadow-md group/repo"
                >
                  <Github className="w-4 h-4 text-slate-400 group-hover/repo:text-white" />
                  <span>GitHub Repo</span>
                </a>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveDemoProject(proj)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all border border-blue-400/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Interactive Demo</span>
                </motion.button>
              </div>

            </motion.div>
          ))}
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
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        speechState.isSpeaking && speechState.currentText.includes(activeDemoProject.title)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                      }`}
                      title="Listen to 2-line explanation"
                    >
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
                    </button>

                    <button
                      onClick={() => setActiveDemoProject(null)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
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
                          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors"
                        >
                          Add Task
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
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            selectedYoloImage === 'traffic' 
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          Urban Traffic Feed
                        </button>
                        <button
                          onClick={() => setSelectedYoloImage('team')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            selectedYoloImage === 'team' 
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          Indoor Workstation
                        </button>
                      </div>

                    </div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={activeDemoProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository Code</span>
                  </a>

                  <button
                    onClick={() => setActiveDemoProject(null)}
                    className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                  >
                    Done Testing
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
