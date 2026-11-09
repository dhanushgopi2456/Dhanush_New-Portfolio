import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const CircuitEnergyTraces: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const pulseOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0.4]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-40 pointer-events-none overflow-hidden select-none -my-10 z-0"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full text-indigo-500/40 drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
        viewBox="0 0 1200 160"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Central Source Power Line */}
        <motion.path
          d="M 600,0 L 600,45 L 350,90 L 350,160"
          stroke="url(#circuit-grad-cyan)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <motion.path
          d="M 600,0 L 600,45 L 850,90 L 850,160"
          stroke="url(#circuit-grad-purple)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <motion.path
          d="M 600,0 L 600,160"
          stroke="url(#circuit-grad-indigo)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength }}
        />

        {/* Outer Auxiliary Circuit Branches */}
        <motion.path
          d="M 200,30 L 350,90 L 200,160"
          stroke="rgba(6, 182, 212, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <motion.path
          d="M 1000,30 L 850,90 L 1000,160"
          stroke="rgba(168, 85, 247, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Traveling Energy Pulses */}
        <motion.circle
          cx="600"
          cy="45"
          r="4"
          fill="#22d3ee"
          style={{ opacity: pulseOpacity }}
          className="animate-ping"
        />
        <motion.circle
          cx="350"
          cy="90"
          r="4"
          fill="#6366f1"
          style={{ opacity: pulseOpacity }}
          className="animate-ping"
        />
        <motion.circle
          cx="850"
          cy="90"
          r="4"
          fill="#a855f7"
          style={{ opacity: pulseOpacity }}
          className="animate-ping"
        />

        <defs>
          <linearGradient id="circuit-grad-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="circuit-grad-purple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="circuit-grad-indigo" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
