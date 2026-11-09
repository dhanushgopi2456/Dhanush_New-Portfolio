import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  Code2, 
  Activity, 
  Cpu, 
  Server, 
  CheckCircle2, 
  Play, 
  SlidersHorizontal,
  Zap,
  Clock,
  Radio
} from 'lucide-react';
import { Project } from '../data/resumeData';
import { audioSynth } from '../utils/audioSynth';
import { ButtonGlare } from './ui/button-glare';
import { 
  KanbanMicroPreview,
  GraderMicroPreview,
  FreshMartMicroPreview,
  RoutePlannerMicroPreview,
  YoloMicroPreview,
  ArchitectureBackDiagram
} from './ProjectMicroPreviews';

interface ProjectTheaterModalProps {
  project: Project | null;
  onClose: () => void;
}

type TheaterViewMode = 'preview' | 'architecture' | 'code';

// Syntax-Highlighted Core Algorithm Snippets for each Project
const PROJECT_ALGORITHMS: Record<string, { filename: string; language: string; code: string }> = {
  'task-manager': {
    filename: 'middleware/authJwtRole.ts',
    language: 'TypeScript',
    code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthUserPayload {
  userId: string;
  role: 'admin' | 'manager' | 'member';
}

export const verifyRoleAccess = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or malformed Bearer token' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUserPayload;
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'RBAC: Forbidden privilege level' });
      }
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }
  };
};`
  },
  'veda-ai-grader': {
    filename: 'services/geminiEvaluationPipeline.ts',
    language: 'TypeScript',
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function evaluateStudentSubmission(params: {
  rubric: string;
  question: string;
  studentAnswer: string;
  maxScore: number;
}) {
  const model = ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        role: 'system',
        parts: [{ text: 'You are an objective academic grader evaluating computer science papers.' }]
      },
      {
        role: 'user',
        parts: [{
          text: \`Evaluate according to this rubric: \${params.rubric}
Question: \${params.question}
Student Answer: \${params.studentAnswer}
Provide strict JSON: { score: number, accuracy: number, feedback: string[] }\`
        }]
      }
    ],
    config: { responseMimeType: 'application/json' }
  });

  const response = await model;
  return JSON.parse(response.text || '{}');
}`
  },
  'fresh-mart': {
    filename: 'controllers/cartCalculationEngine.ts',
    language: 'TypeScript',
    code: `export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function computeCartFinancials(items: CartItem[], discountPct = 0) {
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const discountAmount = subtotal * (discountPct / 100);
  const taxRate = 0.0825; // 8.25% sales tax
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const grandTotal = subtotal - discountAmount + taxAmount;

  return {
    itemCount: items.reduce((acc, c) => acc + c.quantity, 0),
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discountAmount.toFixed(2)),
    tax: Number(taxAmount.toFixed(2)),
    total: Number(grandTotal.toFixed(2)),
    currency: 'USD'
  };
}`
  },
  'hos-route-planner': {
    filename: 'algorithms/fmcsaComplianceDijkstra.ts',
    language: 'TypeScript',
    code: `export interface Waypoint {
  lat: number;
  lng: number;
  milesFromStart: number;
  estimatedDriveHours: number;
}

export function computeHOSDriverSchedule(totalDistanceMiles: number, avgSpeedMph = 55) {
  const totalDriveHours = totalDistanceMiles / avgSpeedMph;
  const MAX_CONSECUTIVE_DRIVE = 11; // FMCSA 11-Hour Driving Rule
  const MANDATORY_REST_BREAK = 10;   // FMCSA 10-Hour Consecutive Off-Duty

  const requiredRestStops = Math.floor(totalDriveHours / MAX_CONSECUTIVE_DRIVE);
  const totalTripTimeHours = totalDriveHours + (requiredRestStops * MANDATORY_REST_BREAK);

  return {
    totalDriveHours: Number(totalDriveHours.toFixed(1)),
    mandatoryRestHours: requiredRestStops * MANDATORY_REST_BREAK,
    requiredRestStops,
    compliant: totalDriveHours <= 70, // 70-hour / 8-day rolling cycle
    totalTripDurationHours: Number(totalTripTimeHours.toFixed(1))
  };
}`
  },
  'object-detection': {
    filename: 'inference/yolov9InferencePipeline.py',
    language: 'Python',
    code: `import torch
import torchvision.ops as ops

class YOLOv9RealTimeDetector:
    def __init__(self, model_weights="weights/yolov9-c.pt", conf_thresh=0.25, iou_thresh=0.45):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = torch.hub.load("WongKinYiu/yolov9", "custom", path=model_weights)
        self.model.to(self.device).eval()
        self.conf_thresh = conf_thresh
        self.iou_thresh = iou_thresh

    def detect_frame(self, frame_tensor):
        """
        Processes normalized RGB frame [1, 3, 640, 640]
        Returns NMS filtered bounding boxes and confidence scores
        """
        with torch.no_grad():
            predictions = self.model(frame_tensor)
            boxes = predictions[..., :4]
            scores = predictions[..., 4]
            keep_indices = ops.nms(boxes, scores, self.iou_thresh)
            return boxes[keep_indices], scores[keep_indices]`
  }
};

export const ProjectTheaterModal: React.FC<ProjectTheaterModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<TheaterViewMode>('preview');

  // Dismiss on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is active on mobile and desktop
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!project) return null;

  const algoSpec = PROJECT_ALGORITHMS[project.id] || {
    filename: 'src/core/engine.ts',
    language: 'TypeScript',
    code: '// Architecture engine initialized'
  };

  const handleTabChange = (mode: TheaterViewMode) => {
    audioSynth.playLaserBlip();
    setActiveTab(mode);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        
        {/* Spatial Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-0"
        />

        {/* Full-Screen Spatial Theater Container */}
        <motion.div
          layoutId={`project-theater-${project.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl bg-slate-950/95 border border-cyan-500/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]"
        >
          {/* Top Bar Header */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-slate-900/90 shrink-0">
            <div className="flex items-start justify-between gap-2.5 sm:gap-4">
              
              {/* Left Column: Pulsing indicator, Title & Category */}
              <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee] shrink-0 mt-1 sm:mt-1.5" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="text-sm sm:text-lg font-bold text-white leading-tight break-words">
                      {project.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono shrink-0">
                      {project.category}
                    </span>
                  </div>

                  {/* Mobile-Friendly Action Buttons (Live Link & Code) */}
                  <div className="flex sm:hidden items-center gap-2 mt-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold flex items-center gap-1 border border-cyan-500/30 transition-all"
                      >
                        <span>{project.demoLabel || 'Live App'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 text-[11px] font-mono flex items-center gap-1 transition-all"
                      >
                        <Github className="w-3 h-3" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all border border-cyan-500/30"
                  >
                    <span>{project.demoLabel || 'Live App'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-white/10"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all border border-white/10 ml-2 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Close Button (Prominent in top-right corner) */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="sm:hidden p-2 rounded-xl bg-slate-800/90 text-slate-300 hover:bg-rose-500/20 hover:text-rose-400 border border-white/15 shrink-0 cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* Interactive Scrubbing Slider Navigation */}
          <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-950/70 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 shrink-0">
            {/* Tabs List with horizontal scrolling & responsive titles */}
            <div className="flex items-center gap-1 sm:gap-2 p-1 rounded-2xl bg-slate-900/90 border border-white/10 overflow-x-auto no-scrollbar w-full sm:w-auto shrink-0">
              <button
                onClick={() => handleTabChange('preview')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'preview'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>1. <span className="hidden sm:inline">Live </span>Preview</span>
              </button>

              <button
                onClick={() => handleTabChange('architecture')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'architecture'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>2. Architecture<span className="hidden sm:inline"> Flow</span></span>
              </button>

              <button
                onClick={() => handleTabChange('code')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'code'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>3. Code<span className="hidden sm:inline"> & API</span></span>
              </button>
            </div>

            {/* Live Telemetry Health Bar */}
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-slate-400 overflow-x-auto no-scrollbar py-0.5 shrink-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300 font-bold">200 OK</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                <span>Latency: <strong className="text-cyan-300">22ms</strong></span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                <span>Throughput: <strong className="text-purple-300">1.4k req/s</strong></span>
              </div>
            </div>
          </div>

          {/* Viewport Content Area */}
          <div className="p-3.5 sm:p-6 flex-1 overflow-y-auto overscroll-contain">
            {activeTab === 'preview' && (
              <div className="space-y-4">
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-2">Live Self-Playing Micro-Preview:</h4>
                  <div className="max-w-md mx-auto w-full">
                    {project.id === 'task-manager' && <KanbanMicroPreview isHovered={true} />}
                    {project.id === 'veda-ai-grader' && <GraderMicroPreview isHovered={true} />}
                    {project.id === 'fresh-mart' && <FreshMartMicroPreview isHovered={true} />}
                    {project.id === 'hos-route-planner' && <RoutePlannerMicroPreview isHovered={true} />}
                    {project.id === 'object-detection' && <YoloMicroPreview isHovered={true} />}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/40 border border-white/5 space-y-1.5 sm:space-y-2">
                    <span className="text-[11px] sm:text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">System Description:</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/40 border border-white/5 space-y-1.5 sm:space-y-2">
                    <span className="text-[11px] sm:text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">Engineering Architecture & Deliverables:</span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {project.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4">
                <div className="p-3 sm:p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-3 sm:mb-4 flex items-center gap-2">
                    <Server className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Real-Time Tiered Architecture & Distributed Packet Flow:</span>
                  </h4>
                  <ArchitectureBackDiagram project={project} onFlipBack={() => {}} />
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-bold truncate">
                    <Code2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">{algoSpec.filename}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0 text-[11px]">{algoSpec.language}</span>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-white/10 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
                  <pre>{algoSpec.code}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Telemetry Nodes */}
          <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-900/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="uppercase font-mono font-bold tracking-wider text-[9px] sm:text-[10px]">Topology:</span>
              <span className="flex items-center gap-1 text-cyan-300"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Client</span>
              <span className="flex items-center gap-1 text-purple-300"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> API</span>
              <span className="flex items-center gap-1 text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> DB / AI</span>
            </div>
            <button
              onClick={onClose}
              className="sm:hidden px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono font-bold border border-white/15"
            >
              Close
            </button>
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">Press ESC or click outside to dismiss</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
