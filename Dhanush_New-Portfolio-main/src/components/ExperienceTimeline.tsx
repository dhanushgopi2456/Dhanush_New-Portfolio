import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Code2, 
  Play, 
  RotateCw, 
  GitBranch, 
  CheckSquare, 
  Server, 
  Lock, 
  Volume2, 
  Square,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { speakInternshipSection, stopSpeech, subscribeSpeechState, VoiceSpeakerState } from '../utils/speechUtils';
import { ButtonGlare } from './ui/button-glare';
import { SectionFlowingBackground } from './SectionFlowingBackground';

interface ApiEndpointTest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestHeader: string;
  responseBody: string;
}

const INTERNSHIP_ENDPOINTS: ApiEndpointTest[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    description: 'User Authentication & JWT Bearer Token Generation',
    requestHeader: 'Content-Type: application/json',
    responseBody: JSON.stringify({
      status: 'success',
      statusCode: 200,
      user: { id: 'usr_882', email: 'dhanush@codecitech.com', role: 'intern_developer' },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl84ODIiLCJpYXQiOjE3MDQ2NzIwMDB9...',
      expiresIn: '24h'
    }, null, 2)
  },
  {
    method: 'GET',
    path: '/api/v1/tasks/my-board',
    description: 'Fetch Role-Based Accessible Agile Kanban Board Items',
    requestHeader: 'Authorization: Bearer eyJhbGciOiJIUzI1Ni...',
    responseBody: JSON.stringify({
      status: 'success',
      totalCount: 4,
      data: [
        { taskId: 'TSK-101', title: 'JWT Middleware Validation', status: 'COMPLETED', priority: 'HIGH' },
        { taskId: 'TSK-102', title: 'Sanitize Request Body Payloads', status: 'COMPLETED', priority: 'CRITICAL' },
        { taskId: 'TSK-103', title: 'MongoDB Mongoose Schema Indexing', status: 'COMPLETED', priority: 'MEDIUM' }
      ]
    }, null, 2)
  },
  {
    method: 'POST',
    path: '/api/v1/projects/create',
    description: 'Create New Project Record with Request Payload Validation',
    requestHeader: 'Authorization: Bearer eyJhbGciOiJIUzI1Ni...',
    responseBody: JSON.stringify({
      status: 'created',
      message: 'Project record initialized successfully',
      projectId: 'proj_mern_009',
      createdAt: new Date().toISOString()
    }, null, 2)
  }
];

const AGILE_SPRINTS = [
  {
    sprint: 'Sprint 1 (Weeks 1-2)',
    title: 'Environment Setup & System Architecture',
    deliverables: ['Configured Node.js / Express backend workspace', 'Defined Mongoose schemas for Users and Tasks', 'Git branching strategy setup']
  },
  {
    sprint: 'Sprint 2 (Weeks 3-5)',
    title: 'JWT Auth & Middleware Pipeline',
    deliverables: ['Engineered custom Express token verification middleware', 'Payload sanitization against NoSQL injection', 'Bcrypt password hashing']
  },
  {
    sprint: 'Sprint 3 (Weeks 6-8)',
    title: 'MERN Frontend Integration & UI',
    deliverables: ['Integrated React Vite SPA with Axios interceptors', 'Tailwind CSS responsive dashboard components', 'State persistence via LocalStorage']
  },
  {
    sprint: 'Sprint 4 (Weeks 9-10)',
    title: 'API Testing & Deployment',
    deliverables: ['Postman collection testing with 100% pass rate', 'REST API documentation & Postman scripts', 'Agile demo presentation to engineering leads']
  }
];

export const ExperienceTimeline: React.FC = () => {
  const [selectedApiIndex, setSelectedApiIndex] = useState<number>(0);
  const [isSimulatingRequest, setIsSimulatingRequest] = useState<boolean>(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'apiConsole' | 'sprints' | 'principles'>('architecture');

  // Mouse tracking for card spotlight (Direct CSS variables, 0 React re-renders)
  const [cardHovered, setCardHovered] = useState(false);

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

  const handleSpeakExperience = () => {
    if (speechState.isSpeaking && (speechState.currentText.includes("Codec Technologies") || speechState.activeSource === 'mp3')) {
      stopSpeech();
    } else {
      speakInternshipSection();
    }
  };

  const activeApi = INTERNSHIP_ENDPOINTS[selectedApiIndex];

  const handleTestApi = () => {
    setIsSimulatingRequest(true);
    setSimulatedResponse(null);
    setTimeout(() => {
      setSimulatedResponse(activeApi.responseBody);
      setIsSimulatingRequest(false);
    }, 600);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="experience" className="py-24 relative z-10 bg-transparent overflow-hidden">
      <SectionFlowingBackground variant="experience" position="right" particleCount={420} />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-blue-950/20">
            <Briefcase className="w-4 h-4" />
            <span>Professional Work Experience & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Industry Internship & <br />
            <span className="liquid-gradient-text">Software Engineering Matrix</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on MERN stack development, RESTful API architecture, JWT security, and agile sprint deliverables at Codec Technologies.
          </p>

          <div className="mt-5 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpeakExperience}
              className={`relative overflow-hidden group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all shadow-md ${
                speechState.isSpeaking && speechState.currentText.includes("Codec Technologies")
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse shadow-amber-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <ButtonGlare radius={12} intensity={0.4} frontColor={{ r: 0.9, g: 0.6, b: 0.1, a: 1 }} />
              <span className="relative z-10 flex items-center gap-2">
                {speechState.isSpeaking && speechState.currentText.includes("Codec Technologies") ? (
                  <>
                    <Square className="w-4 h-4 fill-current text-amber-400" />
                    <span>Stop Internship Narration</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Listen to Internship Summary</span>
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Experience Timeline Card with Deep Frosted Glass & Laser Border */}
        <div className="max-w-5xl mx-auto space-y-8">
          {RESUME_DATA.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
              className="glass-panel p-6 sm:p-9 rounded-[32px] border border-white/10 relative overflow-hidden group shadow-2xl transform-gpu"
            >
              {/* 360-Degree Continuous Rotating Laser Border Beam */}
              <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
                <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#3b82f6_120deg,#06b6d4_180deg,#8b5cf6_240deg,transparent_300deg)] opacity-35 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Cursor-tracked internal radial spotlight */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                style={{
                  opacity: cardHovered ? 1 : 0,
                  background: 'radial-gradient(500px circle at var(--card-x, -500px) var(--card-y, -500px), rgba(59, 130, 246, 0.2), transparent 70%)',
                }}
              />

              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold shadow-sm">
                      {exp.role}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                      Agile MERN Internship
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                    {exp.company}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono font-bold shadow-md">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Module Tabs Switcher with Shared Layout */}
              <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-xl">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`relative overflow-hidden group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'architecture'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ButtonGlare radius={12} intensity={activeTab === 'architecture' ? 0.5 : 0.25} />
                  <span className="relative z-10 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Architecture Flow</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('apiConsole')}
                  className={`relative overflow-hidden group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'apiConsole'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ButtonGlare radius={12} intensity={activeTab === 'apiConsole' ? 0.5 : 0.25} />
                  <span className="relative z-10 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Live REST API Tester</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('sprints')}
                  className={`relative overflow-hidden group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'sprints'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ButtonGlare radius={12} intensity={activeTab === 'sprints' ? 0.5 : 0.25} />
                  <span className="relative z-10 flex items-center gap-2">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Agile Sprints</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('principles')}
                  className={`relative overflow-hidden group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'principles'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ButtonGlare radius={12} intensity={activeTab === 'principles' ? 0.5 : 0.25} />
                  <span className="relative z-10 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SE Standards</span>
                  </span>
                </button>
              </div>

              {/* Dynamic Feature Views */}
              <div className="mb-8">
                
                {/* 1. Architecture Flow View with Animated Electric Pulse */}
                {activeTab === 'architecture' && (
                  <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold text-cyan-400">
                      <span className="flex items-center gap-2">
                        <Server className="w-4 h-4" />
                        <span>Production MERN API Workflow & Request Pipeline</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Codec Tech Architecture</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-mono relative">
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md group/step hover:border-cyan-500/50 transition-colors">
                        <p className="text-[10px] text-cyan-400 font-extrabold uppercase">1. React Frontend</p>
                        <p className="text-[11px] mt-1 font-bold text-white">Vite SPA + Axios</p>
                        <p className="text-[10px] text-slate-400 mt-1">Bearer Tokens in Interceptors</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md group/step hover:border-purple-500/50 transition-colors">
                        <p className="text-[10px] text-purple-400 font-extrabold uppercase">2. Express Router</p>
                        <p className="text-[11px] mt-1 font-bold text-white">JWT Middleware</p>
                        <p className="text-[10px] text-slate-400 mt-1">Token Validation & Sanitization</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md group/step hover:border-emerald-500/50 transition-colors">
                        <p className="text-[10px] text-emerald-400 font-extrabold uppercase">3. Controller Layer</p>
                        <p className="text-[11px] mt-1 font-bold text-white">Mongoose Schemas</p>
                        <p className="text-[10px] text-slate-400 mt-1">RBAC & Business Logic</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md group/step hover:border-amber-500/50 transition-colors">
                        <p className="text-[10px] text-amber-400 font-extrabold uppercase">4. MongoDB Cluster</p>
                        <p className="text-[11px] mt-1 font-bold text-white">Indexed Storage</p>
                        <p className="text-[10px] text-slate-400 mt-1">Relational References & Logs</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Interactive REST API Test Console */}
                {activeTab === 'apiConsole' && (
                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span>Codec Tech REST API Console Simulator</span>
                      </span>
                      <span className="text-slate-500">Select Endpoint & Fire Test</span>
                    </div>

                    {/* Endpoint Selector Tabs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {INTERNSHIP_ENDPOINTS.map((ep, eIdx) => (
                        <button
                          key={eIdx}
                          onClick={() => {
                            setSelectedApiIndex(eIdx);
                            setSimulatedResponse(null);
                          }}
                          className={`relative overflow-hidden group p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                            selectedApiIndex === eIdx
                              ? 'bg-slate-900 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/40 shadow-lg'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <ButtonGlare radius={12} intensity={selectedApiIndex === eIdx ? 0.4 : 0.2} frontColor={{ r: 0.1, g: 0.8, b: 0.9, a: 1 }} />
                          <span className="relative z-10">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5 ${
                              ep.method === 'POST' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {ep.method}
                            </span>
                            <span>{ep.path}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Endpoint Details */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1.5">
                      <p className="text-slate-300"><strong className="text-white">Endpoint Description:</strong> {activeApi.description}</p>
                      <p className="text-slate-400"><strong className="text-slate-300">Header:</strong> {activeApi.requestHeader}</p>
                    </div>

                    {/* Fire Button & Output */}
                    <div className="flex items-center justify-between gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleTestApi}
                        disabled={isSimulatingRequest}
                        className="relative overflow-hidden group px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all border border-emerald-400/30"
                      >
                        <ButtonGlare radius={12} intensity={0.5} frontColor={{ r: 0.1, g: 0.9, b: 0.6, a: 1 }} />
                        <span className="relative z-10 flex items-center gap-2">
                          {isSimulatingRequest ? (
                            <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current" />
                          )}
                          <span>{isSimulatingRequest ? 'Executing Endpoint...' : 'Fire Live API Test'}</span>
                        </span>
                      </motion.button>

                      <span className="text-[11px] font-mono text-cyan-400">
                        {simulatedResponse ? 'Response 200 OK (24ms)' : 'Awaiting Request Trigger'}
                      </span>
                    </div>

                    {simulatedResponse && (
                      <pre className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 overflow-x-auto shadow-inner">
                        {simulatedResponse}
                      </pre>
                    )}
                  </div>
                )}

                {/* 3. Agile Sprint Deliverables */}
                {activeTab === 'sprints' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AGILE_SPRINTS.map((sp, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-cyan-400 font-bold">{sp.sprint}</span>
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <h5 className="font-bold text-white text-xs">{sp.title}</h5>
                        <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc pl-4">
                          {sp.deliverables.map((item, dIdx) => (
                            <li key={dIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Software Engineering Standards */}
                {activeTab === 'principles' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <h5 className="font-bold text-white text-xs">Security & JWT Auth</h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Stateless authentication using JWT with secret key rotation, authorization middleware, and token expiration.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <h5 className="font-bold text-white text-xs">Clean Code & Modular OOP</h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Separation of Concerns across Controller, Service, and Router layers with standard error handlers.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <GitBranch className="w-4 h-4 text-emerald-400" />
                      <h5 className="font-bold text-white text-xs">Git Branching & Postman</h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Feature-branch workflow, pull-request code reviews, and automated Postman API suite verification.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Bullet Points */}
              <div className="space-y-3.5 mb-6">
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 mr-2 font-bold">Core Tech Stack:</span>
                {exp.tech.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-xl bg-slate-950/80 text-slate-300 border border-slate-800 text-xs font-mono font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
