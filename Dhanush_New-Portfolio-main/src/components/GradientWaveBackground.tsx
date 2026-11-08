import React, { useEffect, useRef } from 'react';

/**
 * GradientWaveBackground (Cyber Ocean Waves)
 * Ultra-vibrant, GPU-accelerated interactive gradient ocean waves
 * engineered to Dhanush's portfolio cyber palette:
 * Electric Cyan (#06b6d4), Deep Indigo (#4f46e5), Neon Violet (#8b5cf6),
 * Hot Magenta (#ec4899), and Abyssal Deep Space Navy (#030712).
 *
 * Designed to provide continuous, luminous, visible ocean wave motion across
 * every single section of the website (Hero, About, Metrics, Skills, Projects, etc.).
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 5 Distinct Ocean Wave Layers spanning the full viewport vertically
    const waves = [
      {
        // 1. Upper-Horizon Cyan Bio-Wave (Top 25% of screen)
        baseYRatio: 0.22,
        amp: 48,
        freq1: 0.0028,
        freq2: 0.0055,
        speed: 0.0019,
        phase: 0,
        colorTop: 'rgba(6, 182, 212, 0.72)',      // Electric Cyan
        colorMid: 'rgba(14, 116, 144, 0.42)',    // Deep Cyan
        colorBottom: 'rgba(15, 23, 42, 0.12)',   // Translucent Ocean
        crestColor: '#67e8f9',
        glowColor: '#06b6d4',
      },
      {
        // 2. High-Mid Electric Indigo Current (Top 38% of screen)
        baseYRatio: 0.36,
        amp: 62,
        freq1: 0.0022,
        freq2: 0.0048,
        speed: -0.0022,
        phase: Math.PI / 3,
        colorTop: 'rgba(99, 102, 241, 0.75)',    // Vivid Indigo
        colorMid: 'rgba(79, 70, 229, 0.44)',     // Indigo
        colorBottom: 'rgba(30, 27, 75, 0.15)',   // Translucent Purple
        crestColor: '#a5b4fc',
        glowColor: '#6366f1',
      },
      {
        // 3. Mid-Ocean Neon Violet Swell (Center 50% of screen)
        baseYRatio: 0.50,
        amp: 76,
        freq1: 0.0018,
        freq2: 0.0039,
        speed: 0.0016,
        phase: (Math.PI * 2) / 3,
        colorTop: 'rgba(168, 85, 247, 0.78)',    // Neon Violet
        colorMid: 'rgba(147, 51, 234, 0.46)',    // Purple
        colorBottom: 'rgba(15, 23, 42, 0.18)',
        crestColor: '#d8b4fe',
        glowColor: '#a855f7',
      },
      {
        // 4. Low-Mid Cyber Magenta Breaker (Lower 65% of screen)
        baseYRatio: 0.65,
        amp: 68,
        freq1: 0.0025,
        freq2: 0.0052,
        speed: -0.0021,
        phase: Math.PI,
        colorTop: 'rgba(236, 72, 153, 0.74)',    // Hot Magenta
        colorMid: 'rgba(219, 39, 119, 0.42)',    // Rose
        colorBottom: 'rgba(15, 23, 42, 0.2)',
        crestColor: '#f472b6',
        glowColor: '#ec4899',
      },
      {
        // 5. Deep Abyssal Aqua Ocean Surge (Bottom 80% of screen)
        baseYRatio: 0.80,
        amp: 58,
        freq1: 0.002,
        freq2: 0.0044,
        speed: 0.0015,
        phase: (Math.PI * 4) / 3,
        colorTop: 'rgba(45, 212, 191, 0.76)',    // Aqua / Teal
        colorMid: 'rgba(13, 148, 136, 0.44)',    // Deep Teal
        colorBottom: 'rgba(8, 51, 68, 0.22)',
        crestColor: '#5eead4',
        glowColor: '#14b8a6',
      },
    ];

    // 50 Bioluminescent floating plankton/foam particles
    const particlesCount = 50;
    const particles = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1.2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.4 - 0.15,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2,
      color: [
        '#06b6d4', // Cyan
        '#6366f1', // Indigo
        '#a855f7', // Violet
        '#ec4899', // Magenta
        '#38bdf8', // Sky
        '#2dd4bf', // Aqua
      ][Math.floor(Math.random() * 6)],
    }));

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      // Smooth cursor interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Mouse influence on wave crests
      const mouseInfluenceX = (mouseX / width - 0.5) * 70;
      const mouseInfluenceY = (mouseY / height - 0.5) * 45;

      // 1. Draw all 5 Ocean Waves from top layer to bottom layer
      waves.forEach((w, index) => {
        const baseY = height * w.baseYRatio + mouseInfluenceY * (index % 2 === 0 ? 0.7 : -0.5);
        const dynamicAmp = w.amp + Math.sin(time * 0.02 + index) * 12;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);

        const step = 6;
        for (let x = 0; x <= width + step; x += step) {
          // Interactive fluid ripple originating from cursor
          const distToCursor = Math.abs(x - mouseX);
          const ripple = Math.exp(-distToCursor / 240) * Math.sin(time * 0.09 - distToCursor * 0.03) * 24;

          // Double harmonic trigonometric synthesis for real liquid ocean swell
          const h1 = Math.sin(x * w.freq1 + time * w.speed + w.phase + mouseInfluenceX * 0.003) * dynamicAmp;
          const h2 = Math.cos(x * w.freq2 - time * (w.speed * 0.75) + w.phase * 0.5) * (dynamicAmp * 0.38);
          const y = baseY + h1 + h2 + ripple;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Multi-Stop Liquid Wave Gradient
        const gradient = ctx.createLinearGradient(0, baseY - dynamicAmp, 0, height);
        gradient.addColorStop(0.0, w.colorTop);
        gradient.addColorStop(0.35, w.colorMid);
        gradient.addColorStop(1.0, w.colorBottom);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Pass 1: Soft Ambient Neon Glow Halo along crest
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const distToCursor = Math.abs(x - mouseX);
          const ripple = Math.exp(-distToCursor / 240) * Math.sin(time * 0.09 - distToCursor * 0.03) * 24;
          const h1 = Math.sin(x * w.freq1 + time * w.speed + w.phase + mouseInfluenceX * 0.003) * dynamicAmp;
          const h2 = Math.cos(x * w.freq2 - time * (w.speed * 0.75) + w.phase * 0.5) * (dynamicAmp * 0.38);
          const y = baseY + h1 + h2 + ripple;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w.glowColor;
        ctx.lineWidth = 5;
        ctx.shadowColor = w.glowColor;
        ctx.shadowBlur = 26;
        ctx.globalAlpha = 0.65;
        ctx.stroke();
        ctx.restore();

        // Pass 2: Razor-Sharp Luminous Laser Ridge along peak
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const distToCursor = Math.abs(x - mouseX);
          const ripple = Math.exp(-distToCursor / 240) * Math.sin(time * 0.09 - distToCursor * 0.03) * 24;
          const h1 = Math.sin(x * w.freq1 + time * w.speed + w.phase + mouseInfluenceX * 0.003) * dynamicAmp;
          const h2 = Math.cos(x * w.freq2 - time * (w.speed * 0.75) + w.phase * 0.5) * (dynamicAmp * 0.38);
          const y = baseY + h1 + h2 + ripple;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w.crestColor;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.95;
        ctx.stroke();
        ctx.restore();
      });

      // 2. Draw Bioluminescent Floating Plankton & Foam Embers
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * p.pulseSpeed + p.phase);
        const currentOpacity = Math.max(0.15, p.opacity + pulse * 0.3);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#030712]"
      aria-hidden="true"
    >
      {/* 1. Underlying Solid Space Dark Base */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* 2. Deep Volumetric Radiant Ocean Glows */}
      <div className="absolute top-0 left-10 w-[750px] h-[750px] bg-cyan-500/25 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-purple-600/30 rounded-full blur-[180px] pointer-events-none animate-float-slow" />
      <div className="absolute top-2/3 left-1/4 w-[850px] h-[850px] bg-indigo-600/28 rounded-full blur-[190px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-10 w-[800px] h-[800px] bg-pink-600/25 rounded-full blur-[180px] pointer-events-none animate-float-slow" />

      {/* 3. High-Performance Full-Screen Gradient Ocean Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 4. Soft Top Vignette for Crystal Clear Navbar Readability */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#030712]/80 to-transparent pointer-events-none" />

      {/* 5. Subtle Tech Matrix Accent */}
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
    </div>
  );
};

export default GradientWaveBackground;
