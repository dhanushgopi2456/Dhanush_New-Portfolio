import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollProgressBeam: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001
  });

  const tipTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed left-0 top-0 bottom-0 w-1.5 z-50 pointer-events-none select-none">
      {/* Background track line */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md border-r border-white/5" />

      {/* Dynamic Glowing Beam */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_14px_rgba(6,182,212,0.9),0_0_28px_rgba(168,85,247,0.7)]"
        style={{
          scaleY: smoothProgress,
          height: '100%'
        }}
      />

      {/* Bright Laser Droplet at tip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: tipTop,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Pulsing Outer Glow */}
        <div className="absolute -inset-2 rounded-full bg-cyan-400/50 animate-ping opacity-75" />
        {/* Core Laser Dot */}
        <div className="relative w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#22d3ee,0_0_24px_#06b6d4,0_0_36px_#818cf8] border border-cyan-200" />
      </motion.div>
    </div>
  );
};
