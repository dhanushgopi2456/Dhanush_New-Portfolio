import React, { useEffect, useRef } from 'react';

/**
 * GradientWaveBackground (Cyber Ocean Waves)
 * Ultra-smooth, GPU-accelerated interactive gradient ocean waves
 * tailored specifically to Dhanush's portfolio cyber palette:
 * Electric Cyan (#06b6d4), Deep Indigo (#4f46e5), Neon Violet (#8b5cf6),
 * Vivid Magenta (#ec4899), and Deep Space Abyssal Navy (#030712 to #0a1128).
 *
 * Spans full viewport height and persists seamlessly across all sections:
 * Hero, About, Coding Profiles, Skills, Experience, Projects, Certifications, Contact.
 */
export const GradientWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with inertia damping
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let mouseVelocity = 0;
    let lastMouseX = mouseX;

    // Scroll tracking
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // 5 Ocean Wave Layers spanning the full canvas from upper-mid to bottom
    const oceanWaves = [
      {
        // Wave 1: Abyssal Deep Ocean (Deep Navy to Electric Cyan)
        baseYRatio: 0.62,
        amplitude: 65,
        freq1: 0.002,
        freq2: 0.0042,
        speed: 0.0018,
        phase: 0,
        gradientStops: [
          { pos: 0.0, color: 'rgba(6, 182, 212, 0.65)' },   // Electric Cyan crest
          { pos: 0.25, color: 'rgba(14, 116, 144, 0.55)' }, // Deep Teal
          { pos: 0.65, color: 'rgba(15, 23, 42, 0.75)' },   // Slate Navy
          { pos: 1.0, color: 'rgba(3, 7, 18, 0.95)' },      // Deep Space Base
        ],
        crestStroke: 'rgba(103, 232, 249, 0.95)',
        crestGlow: '#06b6d4',
        glowBlur: 20,
        lineWidth: 2.5,
      },
      {
        // Wave 2: Bioluminescent Indigo Current
        baseYRatio: 0.52,
        amplitude: 75,
        freq1: 0.0028,
        freq2: 0.0055,
        speed: -0.0022,
        phase: Math.PI / 2.5,
        gradientStops: [
          { pos: 0.0, color: 'rgba(99, 102, 241, 0.62)' },  // Electric Indigo
          { pos: 0.35, color: 'rgba(124, 58, 237, 0.52)' }, // Violet
          { pos: 0.75, color: 'rgba(30, 27, 75, 0.65)' },   // Midnight Purple
          { pos: 1.0, color: 'rgba(3, 7, 18, 0.85)' },
        ],
        crestStroke: 'rgba(165, 180, 252, 0.9)',
        crestGlow: '#6366f1',
        glowBlur: 22,
        lineWidth: 2.2,
      },
      {
        // Wave 3: Radiant Cyber Magenta Swell
        baseYRatio: 0.42,
        amplitude: 58,
        freq1: 0.0034,
        freq2: 0.007,
        speed: 0.0025,
        phase: Math.PI,
        gradientStops: [
          { pos: 0.0, color: 'rgba(236, 72, 153, 0.58)' },  // Hot Magenta
          { pos: 0.3, color: 'rgba(217, 70, 239, 0.48)' },  // Fuchsia
          { pos: 0.7, color: 'rgba(88, 28, 135, 0.55)' },   // Deep Purple
          { pos: 1.0, color: 'rgba(3, 7, 18, 0.85)' },
        ],
        crestStroke: 'rgba(244, 114, 182, 0.92)',
        crestGlow: '#ec4899',
        glowBlur: 18,
        lineWidth: 2.0,
      },
      {
        // Wave 4: Glowing Aqua Seafoam Ripple
        baseYRatio: 0.32,
        amplitude: 45,
        freq1: 0.0042,
        freq2: 0.0085,
        speed: -0.0016,
        phase: (Math.PI * 3) / 2,
        gradientStops: [
          { pos: 0.0, color: 'rgba(45, 212, 191, 0.52)' },  // Aqua Green
          { pos: 0.35, color: 'rgba(6, 182, 212, 0.42)' },  // Cyan
          { pos: 0.8, color: 'rgba(15, 23, 42, 0.6)' },
          { pos: 1.0, color: 'rgba(3, 7, 18, 0.8)' },
        ],
        crestStroke: 'rgba(94, 234, 212, 0.88)',
        crestGlow: '#14b8a6',
        glowBlur: 16,
        lineWidth: 1.8,
      },
      {
        // Wave 5: Ethereal Horizon Violet Mist
        baseYRatio: 0.22,
        amplitude: 38,
        freq1: 0.0025,
        freq2: 0.005,
        speed: 0.0012,
        phase: Math.PI / 4,
        gradientStops: [
          { pos: 0.0, color: 'rgba(168, 85, 247, 0.42)' },  // Violet Mist
          { pos: 0.4, color: 'rgba(99, 102, 241, 0.3)' },
          { pos: 0.85, color: 'rgba(3, 7, 18, 0.7)' },
          { pos: 1.0, color: 'rgba(3, 7, 18, 0.8)' },
        ],
        crestStroke: 'rgba(216, 180, 254, 0.85)',
        crestGlow: '#a855f7',
        glowBlur: 14,
        lineWidth: 1.6,
      },
    ];

    // Bioluminescent floating plankton/foam particles
    const particlesCount = 45;
    const particles = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1.0,
      baseSpeedX: (Math.random() - 0.5) * 0.4,
      baseSpeedY: (Math.random() - 0.5) * 0.3 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2,
      color: [
        '#06b6d4', // Cyan
        '#6366f1', // Indigo
        '#a855f7', // Violet
        '#ec4899', // Magenta
        '#38bdf8', // Sky
      ][Math.floor(Math.random() * 5)],
    }));

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      // Smooth cursor interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      mouseVelocity = Math.abs(mouseX - lastMouseX);
      lastMouseX = mouseX;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      time += 1;

      // Mouse influence on waves
      const mouseInfluenceX = (mouseX / width - 0.5) * 80;
      const mouseInfluenceY = (mouseY / height - 0.5) * 60;
      const speedBoost = Math.min(mouseVelocity * 0.0003, 0.003);

      // 1. Render all 5 Ocean Waves from back to front
      // Reverse order so foreground waves overlay background waves naturally
      for (let i = oceanWaves.length - 1; i >= 0; i--) {
        const w = oceanWaves[i];
        const baseY = height * w.baseYRatio + mouseInfluenceY * (i % 2 === 0 ? 0.6 : -0.4);
        const dynamicAmp = w.amplitude + Math.sin(time * 0.02 + i) * 10;
        const currentSpeed = w.speed + (w.speed > 0 ? speedBoost : -speedBoost);

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);

        const step = 6;
        for (let x = 0; x <= width + step; x += step) {
          // Interactive fluid ripple from cursor
          const distToCursor = Math.abs(x - mouseX);
          const ripple = Math.exp(-distToCursor / 220) * Math.sin(time * 0.09 - distToCursor * 0.03) * 22;

          // Double harmonic sine & cosine synthesis for organic ocean roll
          const h1 = Math.sin(x * w.freq1 + time * currentSpeed + w.phase + mouseInfluenceX * 0.004) * dynamicAmp;
          const h2 = Math.cos(x * w.freq2 - time * (currentSpeed * 0.8) + w.phase * 0.5) * (dynamicAmp * 0.4);
          const y = baseY + h1 + h2 + ripple;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Rich Multi-Stop Ocean Gradient
        const gradient = ctx.createLinearGradient(0, baseY - dynamicAmp, 0, height);
        w.gradientStops.forEach((stop) => {
          gradient.addColorStop(stop.pos, stop.color);
        });

        ctx.fillStyle = gradient;
        ctx.fill();

        // Glowing Laser Seafoam Crest Line
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const distToCursor = Math.abs(x - mouseX);
          const ripple = Math.exp(-distToCursor / 220) * Math.sin(time * 0.09 - distToCursor * 0.03) * 22;

          const h1 = Math.sin(x * w.freq1 + time * currentSpeed + w.phase + mouseInfluenceX * 0.004) * dynamicAmp;
          const h2 = Math.cos(x * w.freq2 - time * (currentSpeed * 0.8) + w.phase * 0.5) * (dynamicAmp * 0.4);
          const y = baseY + h1 + h2 + ripple;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w.crestStroke;
        ctx.lineWidth = w.lineWidth;
        ctx.shadowColor = w.crestGlow;
        ctx.shadowBlur = w.glowBlur;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Render Bioluminescent Plankton & Seafoam Bubbles
      particles.forEach((p) => {
        p.x += p.baseSpeedX;
        p.y += p.baseSpeedY;

        // Wrap around viewport edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * p.pulseSpeed + p.phase);
        const currentOpacity = Math.max(0.1, p.opacity + pulse * 0.25);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#030712]"
      aria-hidden="true"
    >
      {/* 1. Underlying Solid Space Dark Base */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* 2. Deep Volumetric Aurora Aura Blobs */}
      <div className="absolute top-0 left-1/4 w-[750px] h-[750px] bg-cyan-500/18 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[700px] h-[700px] bg-purple-600/22 rounded-full blur-[180px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-[800px] h-[800px] bg-pink-600/16 rounded-full blur-[190px] pointer-events-none animate-pulse-glow" />

      {/* 3. High-Performance Full-Screen Gradient Ocean Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 4. Soft Top Vignette for Crystal Clear Navbar Readability */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#030712]/80 to-transparent pointer-events-none" />

      {/* 5. Subtle Tech Matrix Accent */}
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
    </div>
  );
};

export default GradientWaveBackground;
