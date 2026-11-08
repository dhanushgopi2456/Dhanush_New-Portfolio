import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

export const CustomCursor: React.FC = () => {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePos = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  // Motion values for smooth 60fps tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 350, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    const checkPointer = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };
    mediaQuery.addEventListener('change', checkPointer);
    return () => mediaQuery.removeEventListener('change', checkPointer);
  }, []);

  // Mouse movement, magnetic detection, and particle trail
  useEffect(() => {
    if (!isPointerFine) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = ['#3b82f6', '#06b6d4', '#a855f7', '#ec4899', '#ffffff'];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn trailing particle wake if moved enough
      if (dist > 4 && particlesRef.current.length < 80) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            id: Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 2.8 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 + 0.5,
            alpha: 0.85,
          });
        }
      }
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Magnetic snap check
      const target = (e.target as HTMLElement | null)?.closest('a, button, input, textarea, [role="button"], .magnetic-snap');
      if (target) {
        const rect = target.getBoundingClientRect();
        // If element is reasonably sized (buttons, tabs, icons, cards), apply magnetic snap
        if (rect.width < 500 && rect.height < 250) {
          setMagneticTarget({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
          });
          setIsHovered(true);
          return;
        }
        setIsHovered(true);
        setMagneticTarget(null);
      } else {
        setIsHovered(false);
        setMagneticTarget(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Particle animation loop
    const renderParticles = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.022;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      animFrameRef.current = requestAnimationFrame(renderParticles);
    };

    animFrameRef.current = requestAnimationFrame(renderParticles);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPointerFine, mouseX, mouseY]);

  if (!isPointerFine) return null;

  const targetX = magneticTarget ? magneticTarget.x : smoothX;
  const targetY = magneticTarget ? magneticTarget.y : smoothY;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40"
      />

      {/* 1. Inner Precision Glowing Dot (#3b82f6) */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, #60a5fa 0%, #3b82f6 80%, #1d4ed8 100%)',
          boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.8), 0 0 20px 4px rgba(6, 182, 212, 0.5)',
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* 2. Outer Smooth Magnetic Dual-Ring Glowing Aura (#3b82f6 & #ec4899) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-colors"
        style={{
          x: targetX,
          y: targetY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: magneticTarget ? Math.max(magneticTarget.width + 16, 44) : isHovered ? 52 : 36,
          height: magneticTarget ? Math.max(magneticTarget.height + 12, 44) : isHovered ? 52 : 36,
          borderRadius: magneticTarget ? '16px' : '9999px',
          scale: isClicking ? 0.9 : 1,
          borderColor: isHovered ? '#ec4899' : '#3b82f6',
          boxShadow: isHovered
            ? '0 0 20px 3px rgba(236, 72, 153, 0.5), inset 0 0 14px 2px rgba(99, 102, 241, 0.3)'
            : '0 0 15px 2px rgba(59, 130, 246, 0.45), inset 0 0 8px 1px rgba(6, 182, 212, 0.25)',
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 26,
          mass: 0.2,
        }}
      >
        {/* Animated Rotating Conic Laser Edge on Cursor Ring */}
        <div className="absolute inset-0 rounded-[inherit] p-[1.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 animate-spin-slow pointer-events-none" />
      </motion.div>
    </div>
  );
};
