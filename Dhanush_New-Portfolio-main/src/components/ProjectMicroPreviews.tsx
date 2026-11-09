import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Kanban, 
  Sparkles, 
  ShoppingCart, 
  Truck, 
  Eye, 
  CheckCircle2, 
  Database, 
  Server, 
  Cpu, 
  ArrowRight, 
  RotateCw,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Project } from '../data/resumeData';

// 1. Team Task Manager: Animated Mini Kanban Cards with Role Badges
export const KanbanMicroPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-slate-950/90 rounded-2xl p-3 flex flex-col justify-between overflow-hidden border border-white/5 font-mono select-none">
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1.5">
        <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <Kanban className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-Time Agile Board</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[9px] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          RBAC Active
        </span>
      </div>

      {/* Mini 3-Column Board */}
      <div className="relative z-10 grid grid-cols-3 gap-2 my-2">
        {/* Col 1: To Do */}
        <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-800 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold border-b border-white/5 pb-1">
            <span>TO DO</span>
            <span className="text-cyan-400">1</span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[9px] text-slate-300">
            <span className="block truncate font-semibold">Sprint Review</span>
            <span className="inline-block mt-1 px-1 rounded bg-blue-500/20 text-blue-300 text-[8px]">Member</span>
          </div>
        </div>

        {/* Col 2: In Progress */}
        <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-800 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold border-b border-white/5 pb-1">
            <span>IN DEV</span>
            <span className="text-indigo-400">1</span>
          </div>
          <motion.div
            animate={{
              y: [0, -3, 0],
              borderColor: ['rgba(99,102,241,0.3)', 'rgba(6,182,212,0.6)', 'rgba(99,102,241,0.3)']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="p-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/40 text-[9px] text-slate-200 shadow-lg shadow-indigo-950/40"
          >
            <span className="block truncate font-semibold text-cyan-300">JWT Auth RBAC</span>
            <span className="inline-block mt-1 px-1 rounded bg-purple-500/20 text-purple-300 text-[8px]">Admin</span>
          </motion.div>
        </div>

        {/* Col 3: Done */}
        <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-800 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold border-b border-white/5 pb-1">
            <span>DONE</span>
            <span className="text-emerald-400">2</span>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[9px] text-slate-300">
            <span className="block truncate font-semibold">Schema Index</span>
            <span className="inline-block mt-1 px-1 rounded bg-emerald-500/20 text-emerald-300 text-[8px]">Manager</span>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded-lg border border-white/5">
        <span className="truncate">Auto-Syncing WebSockets</span>
        <span className="text-cyan-400 font-bold">100% RBAC</span>
      </div>
    </div>
  );
};

// 2. Veda AI Grader: Animated AI Evaluation Dashboard with Laser Scanner & Charts
export const GraderMicroPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-slate-950/90 rounded-2xl p-3 flex flex-col justify-between overflow-hidden border border-white/5 font-mono select-none">
      {/* Background Document Paper */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-950/90" />

      {/* Animated Glowing Laser Scanning Beam */}
      <motion.div
        animate={{
          top: ['0%', '100%', '0%']
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee,0_0_24px_#06b6d4] z-20 pointer-events-none"
      >
        <span className="absolute right-4 -top-1 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#22d3ee]" />
      </motion.div>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1.5">
        <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Gemini Vision OCR</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-[9px]">
          98.6% Accuracy
        </span>
      </div>

      {/* Middle: Document Mock with Question Marks & Self-Drawing Bars */}
      <div className="relative z-10 my-2 space-y-1.5">
        {/* Question 1 */}
        <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between text-[9px] mb-1">
            <span className="text-slate-200">Q1: Dijkstra Graph Complexity</span>
            <span className="text-cyan-400 font-bold">10 / 10 Marks</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"
            />
          </div>
        </div>

        {/* Question 2 */}
        <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between text-[9px] mb-1">
            <span className="text-slate-200">Q2: B+ Tree Index Proof</span>
            <span className="text-indigo-400 font-bold">9.5 / 10 Marks</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ['0%', '95%'] }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full shadow-[0_0_6px_#818cf8]"
            />
          </div>
        </div>
      </div>

      {/* Footer Feedback Status */}
      <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded-lg border border-white/5">
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Answers Mapped
        </span>
        <span className="text-slate-400">Total: 19.5 / 20</span>
      </div>
    </div>
  );
};

// 3. FreshMart: Simulated Items Sliding into 3D Cart with Spring Physics
export const FreshMartMicroPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-slate-950/90 rounded-2xl p-3 flex flex-col justify-between overflow-hidden border border-white/5 font-mono select-none">
      {/* Background Grocery Sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-slate-950 to-teal-950/30" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1.5">
        <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
          <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
          <span>FreshMart E-Commerce Store</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-[9px]">
          Live Cart
        </span>
      </div>

      {/* Animated Items & Cart Showcase */}
      <div className="relative z-10 my-2 flex items-center justify-between gap-3">
        {/* Grocery Products Carousel */}
        <div className="flex-1 space-y-1">
          <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[9px]">
            <span className="text-slate-200">🍎 Organic Apples</span>
            <span className="text-emerald-400 font-bold">$4.99</span>
          </div>

          <motion.div
            animate={{
              x: [0, 8, 0],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-[9px] shadow-lg shadow-emerald-950/30"
          >
            <span className="text-emerald-300 font-semibold">🥑 Avocado Pack</span>
            <span className="text-emerald-400 font-bold">$6.50</span>
          </motion.div>
        </div>

        {/* Floating 3D Glowing Cart */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative p-3 rounded-2xl bg-gradient-to-tr from-emerald-600/30 to-teal-500/30 border border-emerald-400/40 shadow-xl shadow-emerald-500/20 flex flex-col items-center justify-center"
        >
          <ShoppingCart className="w-6 h-6 text-emerald-300" />
          {/* Spring Badge Counter */}
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-[0_0_8px_#22d3ee]">
            3
          </span>
          <span className="text-[8px] font-bold text-white mt-1">$19.97</span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded-lg border border-white/5">
        <span className="text-cyan-400 font-semibold">JWT Checkout Security</span>
        <span className="text-emerald-400 font-bold">Admin Inventory Sync</span>
      </div>
    </div>
  );
};

// 4. HOS Route Planner: Dark-Mode 3D Vector Map with Self-Drawing Cyan Route & Telemetry
export const RoutePlannerMicroPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-slate-950/90 rounded-2xl p-3 flex flex-col justify-between overflow-hidden border border-white/5 font-mono select-none">
      {/* Background Geospatial Map Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)',
          backgroundSize: '14px 14px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1.5">
        <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <Truck className="w-3.5 h-3.5 text-cyan-400" />
          <span>HOS Route & ELD Telemetry</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[9px] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          FMCSA Compliant
        </span>
      </div>

      {/* Vector Map Path Drawing */}
      <div className="relative z-10 my-2 h-20 w-full bg-slate-900/80 rounded-xl border border-slate-800 p-2 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 240 60">
          {/* Waypoint 1: Chicago */}
          <circle cx="20" cy="45" r="4" fill="#06b6d4" />
          <text x="20" y="35" fill="#94a3b8" fontSize="8" textAnchor="middle">Chicago</text>

          {/* Waypoint 2: St. Louis */}
          <circle cx="120" cy="20" r="4" fill="#6366f1" />
          <text x="120" y="12" fill="#94a3b8" fontSize="8" textAnchor="middle">St. Louis</text>

          {/* Waypoint 3: Dallas */}
          <circle cx="220" cy="40" r="4" fill="#10b981" />
          <text x="220" y="30" fill="#94a3b8" fontSize="8" textAnchor="middle">Dallas</text>

          {/* Self-drawing glowing route line */}
          <motion.path
            d="M 20 45 Q 70 10, 120 20 T 220 40"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="2.5"
            strokeDasharray="260"
            animate={{
              strokeDashoffset: [260, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Moving Transit Truck Marker */}
          <motion.circle
            r="4.5"
            fill="#ffffff"
            stroke="#06b6d4"
            strokeWidth="2"
            animate={{
              cx: [20, 120, 220],
              cy: [45, 20, 40]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Telemetry Markers */}
      <div className="relative z-10 grid grid-cols-2 gap-2 text-[9px] text-slate-300">
        <div className="p-1 rounded bg-slate-900/80 border border-slate-800 flex justify-between">
          <span className="text-slate-400">Driving:</span>
          <span className="text-cyan-400 font-bold">8.5h / 11h Limit</span>
        </div>
        <div className="p-1 rounded bg-slate-900/80 border border-slate-800 flex justify-between">
          <span className="text-slate-400">Duty:</span>
          <span className="text-emerald-400 font-bold">ON DUTY (Drive)</span>
        </div>
      </div>
    </div>
  );
};

// 5. Object Detection YOLOv9: Simulated Camera Viewport with Real-Time Bounding Boxes
export const YoloMicroPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-slate-950/90 rounded-2xl p-3 flex flex-col justify-between overflow-hidden border border-white/5 font-mono select-none">
      {/* Viewport Camera Grid */}
      <div className="absolute inset-0 bg-slate-950/80 overflow-hidden">
        {/* Crosshair Viewport Lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-16 h-16 border border-cyan-400 rounded-full" />
          <div className="absolute w-32 h-[1px] bg-cyan-400" />
          <div className="absolute h-32 w-[1px] bg-cyan-400" />
        </div>
      </div>

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1.5">
        <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>YOLOv9 Real-Time Vision</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-[9px] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          REC 60 FPS
        </span>
      </div>

      {/* Dynamic Moving Bounding Boxes */}
      <div className="relative z-10 my-1 h-20 w-full overflow-hidden">
        {/* Target 1: Vehicle */}
        <motion.div
          animate={{
            x: [10, 110, 10],
            y: [5, 20, 5],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-24 h-12 border-2 border-cyan-400 rounded bg-cyan-500/10 shadow-[0_0_10px_#22d3ee] flex flex-col justify-between p-1"
        >
          <span className="text-[8px] bg-cyan-400 text-slate-950 font-bold px-1 rounded-sm w-fit">
            vehicle: 98.4%
          </span>
          <span className="text-[7px] text-cyan-300 font-bold self-end">PGI-GELAN</span>
        </motion.div>

        {/* Target 2: Person */}
        <motion.div
          animate={{
            x: [140, 60, 140],
            y: [15, 5, 15],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-16 h-14 border-2 border-purple-400 rounded bg-purple-500/10 shadow-[0_0_10px_#a855f7] flex flex-col justify-between p-1"
        >
          <span className="text-[8px] bg-purple-400 text-slate-950 font-bold px-1 rounded-sm w-fit">
            person: 96.1%
          </span>
          <span className="text-[7px] text-purple-300 font-bold self-end">TensorRT</span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded-lg border border-white/5">
        <span className="text-cyan-300 font-bold">PyTorch Deep Learning</span>
        <span className="text-slate-400">mAP@0.5: 89.2%</span>
      </div>
    </div>
  );
};

// 6. System Architecture Diagram on the Back of Every Project Card
interface ArchitectureDiagramProps {
  project: Project;
  onFlipBack: () => void;
}

export const ArchitectureBackDiagram: React.FC<ArchitectureDiagramProps> = ({ project, onFlipBack }) => {
  // Determine tech tiers based on project metadata
  const isPython = project.mockType === 'yolo';
  const backendTitle = isPython ? 'Flask & Python ML Server' : 'Node.js & Express REST API';
  const dbTitle = isPython ? 'PyTorch & OpenCV Model Weights' : project.mockType === 'route' ? 'PostgreSQL & Geospatial Engine' : 'MongoDB Atlas & Mongoose';

  return (
    <div className="relative h-full w-full bg-slate-950/95 p-6 rounded-[30px] flex flex-col justify-between overflow-hidden border border-cyan-500/30 font-mono text-left">
      {/* Background Circuit Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">System Architecture</h4>
            <p className="text-[10px] text-cyan-400">{project.title}</p>
          </div>
        </div>

        <button
          onClick={onFlipBack}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold transition-all hover:scale-105 cursor-pointer"
        >
          <RotateCw className="w-3 h-3" />
          <span>Flip Front</span>
        </button>
      </div>

      {/* 3-Tier Spatial Architecture with Glowing Data Packets */}
      <div className="relative z-10 my-4 space-y-3">
        
        {/* Tier 1: Client / Frontend Layer */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 relative shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Frontend Client Layer</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300">
              React 19 / Next.js
            </span>
          </div>
          <p className="text-[10px] text-slate-300 mt-1">
            Tailwind CSS UI, State Management & Responsive Glassmorphic Viewport
          </p>
        </div>

        {/* Animated Connecting Circuit Bus with Glowing Packet */}
        <div className="relative h-6 flex items-center justify-center">
          <div className="w-[2px] h-full bg-slate-800" />
          {/* Pulsing Traveling Data Packet Dot */}
          <motion.div
            animate={{
              y: [-12, 12, -12]
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] border border-white"
          />
          <span className="absolute right-4 text-[8px] text-slate-500 font-mono">
            HTTPS / JWT Bearer
          </span>
        </div>

        {/* Tier 2: Backend API Gateway */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 relative shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-indigo-400 font-bold uppercase flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              <span>API Gateway & Middleware</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300">
              {backendTitle}
            </span>
          </div>
          <p className="text-[10px] text-slate-300 mt-1">
            JWT Role-Based Access Control, Payload Sanitization & Controller Routers
          </p>
        </div>

        {/* Animated Connecting Circuit Bus with Glowing Packet */}
        <div className="relative h-6 flex items-center justify-center">
          <div className="w-[2px] h-full bg-slate-800" />
          {/* Pulsing Traveling Data Packet Dot */}
          <motion.div
            animate={{
              y: [12, -12, 12]
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7] border border-white"
          />
          <span className="absolute right-4 text-[8px] text-slate-500 font-mono">
            BSON / Tensor Stream
          </span>
        </div>

        {/* Tier 3: Database & AI Engine */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 relative shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-purple-400 font-bold uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Storage & Inference Tier</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300">
              {dbTitle}
            </span>
          </div>
          <p className="text-[10px] text-slate-300 mt-1">
            Aggregations, Atomic Mutations & GPU Accelerated Tensor Pipelines
          </p>
        </div>

      </div>

      {/* Footer Metrics */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Latency: &lt;42ms</span>
        </span>
        <button
          onClick={onFlipBack}
          className="text-cyan-400 hover:text-cyan-300 underline font-bold cursor-pointer"
        >
          Return to Card Preview
        </button>
      </div>
    </div>
  );
};
