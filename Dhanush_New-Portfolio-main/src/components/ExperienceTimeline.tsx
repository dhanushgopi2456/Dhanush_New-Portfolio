import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Building, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Code2, 
  Cpu,
  Play,
  RotateCw,
  GitBranch,
  CheckSquare,
  Server,
  Lock,
  Zap,
  Sparkles,
  BookOpen,
  Volume2,
  Square
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { speakInternshipSection, stopSpeech, subscribeSpeechState, VoiceSpeakerState } from '../utils/speechUtils';

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
  const [showArchitecture, setShowArchitecture] = useState<boolean>(true);
  const [selectedApiIndex, setSelectedApiIndex] = useState<number>(0);
  const [isSimulatingRequest, setIsSimulatingRequest] = useState<boolean>(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'apiConsole' | 'sprints' | 'principles'>('architecture');

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

  return (
    <section id="experience" className="py-20 relative z-10 border-t border-slate-800/60 bg-slate-950/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-4 h-4" />
            <span>Professional Work Experience & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Industry Internship & <br />
            <span className="gradient-text">Software Engineering Matrix</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Hands-on MERN stack development, RESTful API architecture, JWT security, and agile sprint deliverables at Codec Technologies.
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSpeakExperience}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                speechState.isSpeaking && speechState.currentText.includes("Codec Technologies")
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
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
            </button>
          </div>
        </div>

        {/* Experience Timeline Card */}
        <div className="max-w-5xl mx-auto space-y-8">
          {RESUME_DATA.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden group hover:border-blue-500/40 transition-all"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-xs font-bold">
                      {exp.role}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold">
                      Agile MERN Internship
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    {exp.company}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-semibold">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Module Tabs Switcher */}
              <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'architecture'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture Flow</span>
                </button>

                <button
                  onClick={() => setActiveTab('apiConsole')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'apiConsole'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Live REST API Tester</span>
                </button>

                <button
                  onClick={() => setActiveTab('sprints')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'sprints'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Agile Sprints</span>
                </button>

                <button
                  onClick={() => setActiveTab('principles')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'principles'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SE Standards</span>
                </button>
              </div>

              {/* Dynamic Feature Views */}
              <div className="mb-8">
                
                {/* 1. Architecture Flow View */}
                {activeTab === 'architecture' && (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-blue-400">
                      <span className="flex items-center gap-1.5">
                        <Server className="w-4 h-4" />
                        <span>Production MERN API Workflow & Request Pipeline</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Codec Tech Architecture</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                        <p className="text-[10px] text-blue-400 font-bold uppercase">1. React Frontend</p>
                        <p className="text-[11px] mt-1 font-semibold text-white">Vite SPA + Axios</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Bearer Tokens in Interceptors</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                        <p className="text-[10px] text-purple-400 font-bold uppercase">2. Express Router</p>
                        <p className="text-[11px] mt-1 font-semibold text-white">JWT Middleware</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Token Validation & Sanitization</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                        <p className="text-[10px] text-emerald-400 font-bold uppercase">3. Controller Layer</p>
                        <p className="text-[11px] mt-1 font-semibold text-white">Mongoose Schemas</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">RBAC & Business Logic</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                        <p className="text-[10px] text-amber-400 font-bold uppercase">4. MongoDB Cluster</p>
                        <p className="text-[11px] mt-1 font-semibold text-white">Indexed Storage</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Relational References & Logs</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Interactive REST API Test Console */}
                {activeTab === 'apiConsole' && (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold flex items-center gap-1.5">
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
                          className={`p-2.5 rounded-xl text-left border text-xs font-mono transition-all ${
                            selectedApiIndex === eIdx
                              ? 'bg-slate-900 border-blue-500 text-white font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5 ${
                            ep.method === 'POST' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {ep.method}
                          </span>
                          <span>{ep.path}</span>
                        </button>
                      ))}
                    </div>

                    {/* Endpoint Details */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                      <p className="text-slate-300"><strong className="text-white">Endpoint Description:</strong> {activeApi.description}</p>
                      <p className="text-slate-400"><strong className="text-slate-300">Header:</strong> {activeApi.requestHeader}</p>
                    </div>

                    {/* Fire Button & Output */}
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={handleTestApi}
                        disabled={isSimulatingRequest}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-all"
                      >
                        {isSimulatingRequest ? (
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                        <span>{isSimulatingRequest ? 'Executing Endpoint...' : 'Fire Live API Test'}</span>
                      </button>

                      <span className="text-[11px] font-mono text-slate-500">
                        {simulatedResponse ? 'Response 200 OK (24ms)' : 'Awaiting Request Trigger'}
                      </span>
                    </div>

                    {simulatedResponse && (
                      <pre className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                        {simulatedResponse}
                      </pre>
                    )}
                  </div>
                )}

                {/* 3. Agile Sprint Deliverables */}
                {activeTab === 'sprints' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AGILE_SPRINTS.map((sp, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-blue-400 font-bold">{sp.sprint}</span>
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <h5 className="font-bold text-white text-xs">{sp.title}</h5>
                        <ul className="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
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
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <h5 className="font-bold text-white text-xs">Security & JWT Auth</h5>
                      <p className="text-[11px] text-slate-300">
                        Stateless authentication using JWT with secret key rotation, authorization middleware, and token expiration.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <Code2 className="w-4 h-4 text-blue-400" />
                      <h5 className="font-bold text-white text-xs">Clean Code & Modular OOP</h5>
                      <p className="text-[11px] text-slate-300">
                        Separation of Concerns across Controller, Service, and Router layers with standard error handlers.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <GitBranch className="w-4 h-4 text-emerald-400" />
                      <h5 className="font-bold text-white text-xs">Git Branching & Postman</h5>
                      <p className="text-[11px] text-slate-300">
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
                <span className="text-xs font-mono text-slate-400 mr-2">Core Tech Stack:</span>
                {exp.tech.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono font-medium"
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
