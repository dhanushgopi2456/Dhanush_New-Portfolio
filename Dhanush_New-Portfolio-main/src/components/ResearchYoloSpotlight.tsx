import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Scan, 
  ExternalLink, 
  Award, 
  Eye, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  SlidersHorizontal 
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import { ButtonGlare } from './ui/button-glare';

export const ResearchYoloSpotlight: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(52); // Percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handlePointerDown = () => {
    isDraggingRef.current = true;
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

  return (
    <div className="w-full my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Outer Luxury Glass Container */}
      <div className="relative rounded-3xl bg-slate-950/85 border border-cyan-500/40 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.15)] overflow-hidden">
        
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Published IEEE Conference Research Paper (2024)</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Object Detection via <span className="liquid-gradient-text">YOLOv9 Neural Vision</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Authored & Published by Dhanush Gopi Kavala • Spatial Pyramid Pooling • 114 FPS Inference
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

        {/* Interactive X-Ray Scanner Stage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Scan className="w-4 h-4 text-cyan-400" />
              <span>Drag the Cyan X-Ray Laser Slider horizontally to reveal YOLOv9 neural tensor detections:</span>
            </span>
            <span className="text-slate-500 font-bold hidden sm:inline">Sensor: 4K RGB 60Hz</span>
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
                {/* Road */}
                <polygon points="0,450 1000,450 680,240 320,240" fill="#1e293b" />
                <line x1="500" y1="240" x2="500" y2="450" stroke="#f1f5f9" strokeWidth="4" strokeDasharray="20 20" opacity="0.4" />
                
                {/* Vehicles */}
                <rect x="220" y="270" width="160" height="90" rx="10" fill="#334155" />
                <rect x="620" y="290" width="190" height="100" rx="12" fill="#475569" />
                
                {/* Pedestrians */}
                <circle cx="450" cy="230" r="14" fill="#64748b" />
                <rect x="442" y="244" width="16" height="55" rx="4" fill="#64748b" />

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
                  {/* Subtle Tensor Grid Lattice */}
                  <defs>
                    <pattern id="yolo-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="450" fill="url(#yolo-grid)" />

                  {/* Bounding Box 1: Autonomous Vehicle (98.6%) */}
                  <g className="animate-pulse">
                    <rect x="210" y="260" width="180" height="110" fill="rgba(6, 182, 212, 0.15)" stroke="#22d3ee" strokeWidth="2.5" rx="4" />
                    <rect x="210" y="235" width="140" height="25" fill="#06b6d4" rx="3" />
                    <text x="218" y="252" fill="#030712" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      CAR: 98.6%
                    </text>
                  </g>

                  {/* Bounding Box 2: Pedestrian (99.2%) */}
                  <g>
                    <rect x="430" y="210" width="40" height="95" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2.5" rx="4" />
                    <rect x="430" y="185" width="130" height="25" fill="#a855f7" rx="3" />
                    <text x="438" y="202" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      PEDESTRIAN: 99.2%
                    </text>
                  </g>

                  {/* Bounding Box 3: Truck / Heavy Vehicle (97.8%) */}
                  <g>
                    <rect x="610" y="275" width="210" height="125" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2.5" rx="4" />
                    <rect x="610" y="250" width="140" height="25" fill="#10b981" rx="3" />
                    <text x="618" y="267" fill="#030712" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      TRUCK: 97.8%
                    </text>
                  </g>

                  {/* Bounding Box 4: Traffic Signal Light (99.5%) */}
                  <g>
                    <rect x="115" y="130" width="40" height="95" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" rx="4" />
                    <rect x="115" y="105" width="135" height="25" fill="#f59e0b" rx="3" />
                    <text x="122" y="122" fill="#030712" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      LIGHT_GREEN: 99.5%
                    </text>
                  </g>
                </svg>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400 text-[11px] font-mono text-cyan-300 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  YOLOV9 SPATIAL PYRAMID (NMS FILTERED)
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-white/10 text-[11px] font-mono text-slate-300 space-x-3">
                  <span>INFERENCE: <strong className="text-emerald-400">8.7ms</strong></span>
                  <span>FPS: <strong className="text-cyan-400">114</strong></span>
                  <span>BATCH: <strong className="text-purple-400">1</strong></span>
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
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Model Architecture</span>
            <span className="text-sm font-extrabold text-white">YOLOv9-C SPP</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">mAP Accuracy</span>
            <span className="text-sm font-extrabold text-emerald-400">91.4% (@0.5)</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Latency Speed</span>
            <span className="text-sm font-extrabold text-cyan-400">8.7ms (114 FPS)</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Dataset Validation</span>
            <span className="text-sm font-extrabold text-purple-400">MS COCO & Custom</span>
          </div>
        </div>

      </div>

    </div>
  );
};
