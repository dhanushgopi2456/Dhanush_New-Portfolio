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

  // Spotlight position state for CSS background radial gradient
  const [spotlightPos, setSpotlightPos] = useState({ x: -500, y: -500 });

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

    const colors = ['#22d3ee', '#06b6d4', '#6366f1', '#a855f7', '#ec4899', '#ffffff'];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setSpotlightPos({ x: e.clientX, y: e.clientY });

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Trailing particle wake
      if (dist > 4 && particlesRef.current.length < 70) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            id: Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 2.5 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 1.4,
            vy: (Math.random() - 0.5) * 1.4 + 0.4,
            alpha: 0.85,
          });
        }
      }
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Magnetic snap check
      const target = (e.target as HTMLElement | null)?.closest('a, button, input, textarea, [role="button"], .magnetic-snap');
      if (target) {
        const rect = target.getBoundingClientRect();
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
          p.alpha -= 0.024;

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
    <>
      {/* 0. Cursor-Tracking Spotlight & Subtle Background Dot Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(34, 211, 238, 0.14) 0%, rgba(168, 85, 247, 0.08) 35%, transparent 65%),
            radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 28px 28px',
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {/* Particle trail canvas */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-40"
        />

        {/* 1. Instant Cyan Center Dot (#22d3ee) */}
        <motion.div
          className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, #ffffff 0%, #22d3ee 60%, #0891b2 100%)',
            boxShadow: '0 0 12px 2px #22d3ee, 0 0 24px 4px rgba(6, 182, 212, 0.6)',
          }}
          animate={{
            scale: isClicking ? 0.6 : isHovered ? 1.6 : 1,
          }}
          transition={{ type: 'spring', stiffness: 600, damping: 28 }}
        />

        {/* 2. Spring-Physics Indigo Outer Ring (#6366f1) */}
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-colors"
          style={{
            x: targetX,
            y: targetY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: magneticTarget ? Math.max(magneticTarget.width + 16, 46) : isHovered ? 56 : 38,
            height: magneticTarget ? Math.max(magneticTarget.height + 12, 46) : isHovered ? 56 : 38,
            borderRadius: magneticTarget ? '16px' : '9999px',
            scale: isClicking ? 0.9 : 1,
            borderColor: isHovered ? '#a855f7' : '#6366f1',
            boxShadow: isHovered
              ? '0 0 24px 4px rgba(168, 85, 247, 0.6), inset 0 0 14px 2px rgba(99, 102, 241, 0.4)'
              : '0 0 16px 2px rgba(99, 102, 241, 0.45), inset 0 0 8px 1px rgba(6, 182, 212, 0.25)',
          }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 26,
            mass: 0.2,
          }}
        >
          {/* Animated Rotating Conic Edge on Cursor Ring */}
          <div className="absolute inset-0 rounded-[inherit] p-[1.5px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-80 animate-spin-slow pointer-events-none" />
        </motion.div>
      </div>
    </>
  );
};
