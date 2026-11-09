import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scan, 
  ExternalLink, 
  Award, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  SlidersHorizontal,
  Flame,
  Play,
  Pause,
  Activity,
  Zap,
  Eye
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import { ButtonGlare } from './ui/button-glare';

type PyramidScale = 'ALL' | 'P3' | 'P4' | 'P5';

interface YoloDetection {
  id: string;
  name: string;
  confidence: number;
  scale: 'P3' | 'P4' | 'P5';
  scaleLabel: string;
  color: string;
  tagColor: string;
  rect: { x: number; y: number; width: number; height: number };
  tagPos: { x: number; y: number; width: number; height: number };
  heatmapCenter: { cx: number; cy: number; r: number };
}

const YOLO_DETECTIONS: YoloDetection[] = [
  {
    id: 'det-car-1',
    name: 'CAR',
    confidence: 98.6,
    scale: 'P4',
    scaleLabel: 'P4 (40×40)',
    color: '#06b6d4', // Cyan
    tagColor: '#06b6d4',
    rect: { x: 210, y: 260, width: 180, height: 110 },
    tagPos: { x: 210, y: 235, width: 155, height: 25 },
    heatmapCenter: { cx: 300, cy: 315, r: 85 }
  },
  {
    id: 'det-ped-1',
    name: 'PEDESTRIAN',
    confidence: 99.2,
    scale: 'P3',
    scaleLabel: 'P3 (80×80)',
    color: '#a855f7', // Purple
    tagColor: '#a855f7',
    rect: { x: 430, y: 210, width: 40, height: 95 },
    tagPos: { x: 430, y: 185, width: 150, height: 25 },
    heatmapCenter: { cx: 450, cy: 255, r: 48 }
  },
  {
    id: 'det-truck-1',
    name: 'TRUCK',
    confidence: 97.8,
    scale: 'P5',
    scaleLabel: 'P5 (20×20)',
    color: '#10b981', // Emerald
    tagColor: '#10b981',
    rect: { x: 610, y: 275, width: 210, height: 125 },
    tagPos: { x: 610, y: 250, width: 155, height: 25 },
    heatmapCenter: { cx: 715, cy: 335, r: 95 }
  },
  {
    id: 'det-light-1',
    name: 'LIGHT_GREEN',
    confidence: 99.5,
    scale: 'P3',
    scaleLabel: 'P3 (80×80)',
    color: '#f59e0b', // Amber
    tagColor: '#f59e0b',
    rect: { x: 115, y: 130, width: 40, height: 95 },
    tagPos: { x: 115, y: 105, width: 165, height: 25 },
    heatmapCenter: { cx: 135, cy: 165, r: 42 }
  },
  {
    id: 'det-cyclist-1',
    name: 'BICYCLIST',
    confidence: 89.4,
    scale: 'P3',
    scaleLabel: 'P3 (80×80)',
    color: '#ec4899', // Pink
    tagColor: '#ec4899',
    rect: { x: 505, y: 240, width: 45, height: 80 },
    tagPos: { x: 505, y: 215, width: 155, height: 25 },
    heatmapCenter: { cx: 527, cy: 280, r: 38 }
  },
  {
    id: 'det-van-1',
    name: 'DISTANT_VAN',
    confidence: 81.2,
    scale: 'P4',
    scaleLabel: 'P4 (40×40)',
    color: '#3b82f6', // Indigo
    tagColor: '#3b82f6',
    rect: { x: 380, y: 235, width: 65, height: 50 },
    tagPos: { x: 380, y: 212, width: 160, height: 23 },
    heatmapCenter: { cx: 412, cy: 260, r: 34 }
  }
];

interface RuntimeEngine {
  id: string;
  name: string;
  precision: string;
  latency: string;
  fps: number;
  tag: string;
}

const RUNTIME_ENGINES: RuntimeEngine[] = [
  { id: 'tensorrt', name: 'TensorRT FP16', precision: 'FP16', latency: '4.1ms', fps: 242, tag: '2.1x Acceleration' },
  { id: 'cuda', name: 'PyTorch CUDA', precision: 'FP32', latency: '8.7ms', fps: 114, tag: 'GPU Baseline' },
  { id: 'onnx', name: 'ONNX INT8', precision: 'INT8', latency: '3.1ms', fps: 318, tag: 'Quantized Ultra-Fast' },
  { id: 'cpu', name: 'PyTorch CPU', precision: 'FP32', latency: '24.8ms', fps: 40, tag: 'Host Native' }
];

export const ResearchYoloSpotlight: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(52); // Percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Extra Interactive Features State
  const [activeScale, setActiveScale] = useState<PyramidScale>('ALL');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(75);
  const [selectedEngine, setSelectedEngine] = useState<string>('cuda');
  const [showGradCam, setShowGradCam] = useState<boolean>(false);
  const [isAutoSweep, setIsAutoSweep] = useState<boolean>(false);

  const autoSweepRef = useRef<number | null>(null);
  const sweepAngleRef = useRef<number>(0);

  // Auto-Sweep Animation Loop
  useEffect(() => {
    if (!isAutoSweep) {
      if (autoSweepRef.current) cancelAnimationFrame(autoSweepRef.current);
      return;
    }

    const animateSweep = () => {
      sweepAngleRef.current += 0.015;
      // Smooth sinusoidal oscillation between 15% and 85%
      const nextPos = 50 + 34 * Math.sin(sweepAngleRef.current);
      setSliderPos(nextPos);
      autoSweepRef.current = requestAnimationFrame(animateSweep);
    };

    autoSweepRef.current = requestAnimationFrame(animateSweep);
    return () => {
      if (autoSweepRef.current) cancelAnimationFrame(autoSweepRef.current);
    };
  }, [isAutoSweep]);

  const handlePointerDown = () => {
    isDraggingRef.current = true;
    if (isAutoSweep) setIsAutoSweep(false); // Pause auto-sweep on user grab
    audioSynth.playLaserBlip();
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  // Filter detections based on scale and confidence threshold
  const visibleDetections = YOLO_DETECTIONS.filter(det => {
    const scaleMatches = activeScale === 'ALL' || det.scale === activeScale;
    const confidenceMatches = det.confidence >= confidenceThreshold;
    return scaleMatches && confidenceMatches;
  });

  const activeEngineObj = RUNTIME_ENGINES.find(e => e.id === selectedEngine) || RUNTIME_ENGINES[1];

  return (
    <div className="w-full my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Outer Luxury Glass Container */}
      <div className="relative rounded-3xl bg-slate-950/85 border border-cyan-500/40 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.15)] overflow-hidden">
        
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Published IEEE Conference Research Paper (2024)</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Object Detection via <span className="liquid-gradient-text">YOLOv9 Neural Vision</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Authored & Published by Dhanush Gopi Kavala • Spatial Pyramid Pooling (SPP-GELAN) • Multi-Scale Tensor Inference
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              mAP@0.5: 91.4%
            </span>
            <a
              href="https://github.com/dhanushgopi2456"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
            >
              <span>Paper & Weights</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Interactive Feature Controls Matrix Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* 1. Spatial Pyramid Pooling Scale Layer Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 font-bold mr-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>SPP Layer:</span>
              </span>
              {(['ALL', 'P3', 'P4', 'P5'] as PyramidScale[]).map((scale) => (
                <button
                  key={scale}
                  onClick={() => {
                    setActiveScale(scale);
                    audioSynth.playLaserBlip();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    activeScale === scale
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span>{scale === 'ALL' ? 'Multi-Scale (All)' : `${scale} Feature Map`}</span>
                  {scale === 'P3' && <span className="text-[10px] text-purple-400">80×80</span>}
                  {scale === 'P4' && <span className="text-[10px] text-cyan-400">40×40</span>}
                  {scale === 'P5' && <span className="text-[10px] text-emerald-400">20×20</span>}
                </button>
              ))}
            </div>

            {/* Quick Action Toggles: Grad-CAM Heatmap & Auto Sweep */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowGradCam(prev => !prev);
                  audioSynth.playLaserBlip();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
                  showGradCam
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Toggle Spatial Attention Heatmap"
              >
                <Flame className={`w-3.5 h-3.5 ${showGradCam ? 'text-amber-400 fill-current' : 'text-slate-400'}`} />
                <span>Grad-CAM Heatmap</span>
              </button>

              <button
                onClick={() => {
                  setIsAutoSweep(prev => !prev);
                  audioSynth.playLaserBlip();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
                  isAutoSweep
                    ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] animate-pulse'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Toggle continuous sinusoidal laser sweep"
              >
                {isAutoSweep ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>Auto Sweep ⚡</span>
              </button>
            </div>
          </div>

          {/* Row 2: Confidence Threshold Slider & Runtime Engine Switcher */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Confidence Threshold Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 font-bold flex items-center gap-1.5 whitespace-nowrap">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Confidence Threshold:</span>
                <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/30">
                  ≥ {confidenceThreshold}%
                </span>
              </span>

              <input
                type="range"
                min="50"
                max="99"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-32 sm:w-44 accent-cyan-400 cursor-pointer"
              />

              <span className="text-[11px] font-mono text-emerald-400 font-bold whitespace-nowrap">
                {visibleDetections.length} / {YOLO_DETECTIONS.length} Detected
              </span>
            </div>

            {/* Inference Engine Switcher */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono text-slate-400 font-bold flex items-center gap-1 mr-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Runtime:</span>
              </span>
              {RUNTIME_ENGINES.map((engine) => (
                <button
                  key={engine.id}
                  onClick={() => {
                    setSelectedEngine(engine.id);
                    audioSynth.playLaserBlip();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all border ${
                    selectedEngine === engine.id
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-400 shadow-md'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>{engine.name}</span>
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Interactive X-Ray Scanner Stage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Scan className="w-4 h-4 text-cyan-400" />
              <span>Drag the Cyan X-Ray Laser Slider horizontally to reveal YOLOv9 neural tensor detections:</span>
            </span>
            <span className="text-slate-500 font-bold hidden sm:inline">
              Spatial Pyramid: {activeScale === 'ALL' ? 'P3 + P4 + P5 Multiscale Fusion' : `${activeScale} Level Grid`}
            </span>
          </div>

          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            className="relative h-[320px] sm:h-[420px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15 bg-slate-950"
          >
            {/* BASE LAYER: Natural Urban Street Scene */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center">
              {/* Simulated Street Scene SVG */}
              <svg className="w-full h-full opacity-60" viewBox="0 0 1000 450" preserveAspectRatio="none">
                {/* Road Surface */}
                <polygon points="0,450 1000,450 680,240 320,240" fill="#1e293b" />
                <line x1="500" y1="240" x2="500" y2="450" stroke="#f1f5f9" strokeWidth="4" strokeDasharray="20 20" opacity="0.4" />
                
                {/* Vehicles */}
                <rect x="220" y="270" width="160" height="90" rx="10" fill="#334155" />
                <rect x="620" y="290" width="190" height="100" rx="12" fill="#475569" />
                
                {/* Distant Van */}
                <rect x="382" y="238" width="60" height="42" rx="6" fill="#3b4252" />
                
                {/* Pedestrians */}
                <circle cx="450" cy="230" r="14" fill="#64748b" />
                <rect x="442" y="244" width="16" height="55" rx="4" fill="#64748b" />

                {/* Cyclist */}
                <circle cx="525" cy="255" r="10" fill="#64748b" />
                <rect x="520" y="268" width="15" height="38" rx="3" fill="#64748b" />
                <circle cx="512" cy="308" r="8" fill="none" stroke="#64748b" strokeWidth="3" />
                <circle cx="540" cy="308" r="8" fill="none" stroke="#64748b" strokeWidth="3" />

                {/* Traffic Signals */}
                <rect x="120" y="140" width="30" height="80" rx="6" fill="#0f172a" />
                <circle cx="135" cy="160" r="7" fill="#22c55e" opacity="0.8" />
              </svg>

              <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-white/10">
                RAW CAMERA FEED (PRE-INFERENCE)
              </div>
            </div>

            {/* OVERLAY LAYER (Clipped by slider): YOLOv9 Neural Vision & Bounding Boxes */}
            <div
              className="absolute inset-0 bg-slate-950/90"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                
                {/* Neural Vision Grid & Bounding Box Overlays */}
                <svg className="w-full h-full" viewBox="0 0 1000 450" preserveAspectRatio="none">
                  {/* Dynamic Tensor Grid based on SPP scale selection */}
                  <defs>
                    <pattern id="yolo-grid-p3" width="15" height="15" patternUnits="userSpaceOnUse">
                      <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(168, 85, 247, 0.16)" strokeWidth="1" />
                    </pattern>
                    <pattern id="yolo-grid-p4" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(6, 182, 212, 0.14)" strokeWidth="1" />
                    </pattern>
                    <pattern id="yolo-grid-p5" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(16, 185, 129, 0.16)" strokeWidth="1" />
                    </pattern>
                    <pattern id="yolo-grid-all" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" />
                    </pattern>

                    {/* Grad-CAM Attention Heatmap Gradients */}
                    <radialGradient id="gradcam-amber" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
                      <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="gradcam-cyan" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                      <stop offset="85%" stopColor="#a855f7" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Grid Lattice Layer */}
                  <rect 
                    width="1000" 
                    height="450" 
                    fill={
                      activeScale === 'P3' ? 'url(#yolo-grid-p3)' :
                      activeScale === 'P4' ? 'url(#yolo-grid-p4)' :
                      activeScale === 'P5' ? 'url(#yolo-grid-p5)' : 'url(#yolo-grid-all)'
                    } 
                  />

                  {/* Grad-CAM Feature Activation Heatmap (if enabled) */}
                  {showGradCam && visibleDetections.map((det) => (
                    <circle
                      key={`heat-${det.id}`}
                      cx={det.heatmapCenter.cx}
                      cy={det.heatmapCenter.cy}
                      r={det.heatmapCenter.r}
                      fill={det.scale === 'P4' ? 'url(#gradcam-cyan)' : 'url(#gradcam-amber)'}
                      style={{ mixBlendMode: 'screen' }}
                      className="animate-pulse"
                    />
                  ))}

                  {/* Dynamic Bounding Boxes */}
                  {visibleDetections.map((det) => (
                    <g key={det.id} className="transition-all duration-300">
                      <rect 
                        x={det.rect.x} 
                        y={det.rect.y} 
                        width={det.rect.width} 
                        height={det.rect.height} 
                        fill={`${det.color}20`} 
                        stroke={det.color} 
                        strokeWidth="2.5" 
                        rx="4" 
                      />
                      <rect 
                        x={det.tagPos.x} 
                        y={det.tagPos.y} 
                        width={det.tagPos.width} 
                        height={det.tagPos.height} 
                        fill={det.tagColor} 
                        rx="3" 
                      />
                      <text 
                        x={det.tagPos.x + 8} 
                        y={det.tagPos.y + 17} 
                        fill="#030712" 
                        fontSize="11" 
                        fontFamily="monospace" 
                        fontWeight="bold"
                      >
                        [{det.scale}] {det.name}: {det.confidence}%
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Top Badge: YOLOv9 Spatial Pyramid Status */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400 text-[11px] font-mono text-cyan-300 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>YOLOV9 SPATIAL PYRAMID (SPP-GELAN)</span>
                  </div>
                </div>

                {/* Bottom Telemetry HUD */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-3 shadow-xl backdrop-blur-md">
                  <span>ENGINE: <strong className="text-indigo-400">{activeEngineObj.name}</strong></span>
                  <span>INFERENCE: <strong className="text-emerald-400">{activeEngineObj.latency}</strong></span>
                  <span>FPS: <strong className="text-cyan-400">{activeEngineObj.fps}</strong></span>
                  <span>PRECISION: <strong className="text-purple-400">{activeEngineObj.precision}</strong></span>
                </div>

              </div>
            </div>

            {/* DRAGGABLE CYAN LASER SCANNER HANDLE */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize shadow-[0_0_20px_#22d3ee]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_25px_#22d3ee] cursor-grab active:cursor-grabbing">
                <SlidersHorizontal className="w-4 h-4 text-cyan-300" />
              </div>
            </div>

          </div>
        </div>

        {/* Paper Architecture Metrics Footer */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Model Architecture</span>
            <span className="text-sm font-extrabold text-white">YOLOv9-C + SPP-ELAN</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">mAP Accuracy</span>
            <span className="text-sm font-extrabold text-emerald-400">91.4% (@0.5 IoU)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Latency Speed</span>
            <span className="text-sm font-extrabold text-cyan-400">{activeEngineObj.latency} ({activeEngineObj.fps} FPS)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Dataset Validation</span>
            <span className="text-sm font-extrabold text-purple-400">MS COCO & Custom 4K</span>
          </div>
        </div>

      </div>

    </div>
  );
};
