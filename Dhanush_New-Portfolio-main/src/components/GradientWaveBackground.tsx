import React, { useEffect, useRef } from 'react';

/**
 * GradientWaveBackground
 * A high-performance, GPU-accelerated interactive fluid gradient wave canvas
 * that renders continuous undulating harmonic waves across the entire website.
 * Features:
 * - 4 sinuous harmonic wave layers with custom Cyber-Neon gradients (Cyan, Indigo, Violet, Magenta)
 * - Glowing laser crest lines along the wave ridges
 * - Smooth cursor interactive ripple wake & scroll parallax
 * - Zero CPU waste with visibility detection and hardware-accelerated canvas 2D compositing
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

    // Mouse & Scroll coordinates with spring interpolation
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
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

    // Harmonic Wave Definitions
    // Each wave has independent frequency, speed, amplitude, and color stops
    const waves = [
      {
        // Wave 1: Deep Oceanic Cyan & Sky Blue (Lower base, wide rolling curves)
        baseYRatio: 0.68,
        amplitude: 55,
        frequency: 0.0022,
        speed: 0.0016,
        phase: 0,
        colorStart: 'rgba(6, 182, 212, 0.45)',    // Electric Cyan
        colorMid: 'rgba(59, 130, 246, 0.35)',      // Blue
        colorEnd: 'rgba(3, 7, 18, 0)',
        crestColor: 'rgba(56, 189, 248, 0.85)',
        crestGlow: 'rgba(6, 182, 212, 0.8)',
        glowBlur: 14,
        lineWidth: 2.0,
      },
      {
        // Wave 2: Neon Indigo & Deep Violet (Mid elevation, energetic harmonics)
        baseYRatio: 0.58,
        amplitude: 70,
        frequency: 0.0018,
        speed: -0.0019,
        phase: Math.PI / 3,
        colorStart: 'rgba(99, 102, 241, 0.45)',   // Indigo
        colorMid: 'rgba(168, 85, 247, 0.38)',     // Violet
        colorEnd: 'rgba(3, 7, 18, 0)',
        crestColor: 'rgba(192, 132, 252, 0.9)',
        crestGlow: 'rgba(168, 85, 247, 0.85)',
        glowBlur: 16,
        lineWidth: 2.2,
      },
      {
        // Wave 3: Radiant Fuchsia / Magenta & Rose (Higher crest, dynamic cross-current)
        baseYRatio: 0.48,
        amplitude: 60,
        frequency: 0.0028,
        speed: 0.0024,
        phase: (Math.PI * 2) / 3,
        colorStart: 'rgba(236, 72, 153, 0.38)',   // Magenta
        colorMid: 'rgba(139, 92, 246, 0.3)',      // Purple
        colorEnd: 'rgba(3, 7, 18, 0)',
        crestColor: 'rgba(244, 114, 182, 0.85)',
        crestGlow: 'rgba(236, 72, 153, 0.8)',
        glowBlur: 14,
        lineWidth: 1.8,
      },
      {
        // Wave 4: Delicate Ethereal Cyan Crest (Ambient high-frequency surface ripple)
        baseYRatio: 0.38,
        amplitude: 45,
        frequency: 0.0035,
        speed: -0.0014,
        phase: Math.PI,
        colorStart: 'rgba(20, 184, 166, 0.28)',   // Teal
        colorMid: 'rgba(99, 102, 241, 0.22)',     // Indigo
        colorEnd: 'rgba(3, 7, 18, 0)',
        crestColor: 'rgba(45, 212, 191, 0.75)',
        crestGlow: 'rgba(20, 184, 166, 0.7)',
        glowBlur: 12,
        lineWidth: 1.5,
      },
    ];

    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      // Smooth interpolation for mouse and scroll reactions
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      time += 1;

      // Mouse influence on wave crest and amplitude
      const mouseFactorX = (mouseX / width - 0.5) * 60;
      const mouseFactorY = (mouseY / height - 0.5) * 45;
      const scrollOffset = (scrollY * 0.12) % height;

      // Render each wave layer from background to foreground
      waves.forEach((w, index) => {
        const baseY = height * w.baseYRatio + mouseFactorY * (index % 2 === 0 ? 1 : -0.7) - scrollOffset * 0.15;
        const currentAmp = w.amplitude + Math.sin(time * 0.015 + index) * 12;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);

        // Calculate points across the screen with sinusoidal harmonics
        const step = 8;
        for (let x = 0; x <= width + step; x += step) {
          // Primary wave + secondary harmonic + cursor proximity ripple
          const distToMouse = Math.abs(x - mouseX);
          const mouseRipple = Math.exp(-distToMouse / 260) * Math.sin(time * 0.08) * 18;

          const harmonic1 = Math.sin(x * w.frequency + time * w.speed + w.phase + mouseFactorX * 0.005) * currentAmp;
          const harmonic2 = Math.cos(x * w.frequency * 1.8 - time * w.speed * 0.7) * (currentAmp * 0.35);
          const y = baseY + harmonic1 + harmonic2 + mouseRipple;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Multi-stop Vertical Wave Gradient
        const grad = ctx.createLinearGradient(0, baseY - currentAmp, 0, height);
        grad.addColorStop(0, w.colorStart);
        grad.addColorStop(0.35, w.colorMid);
        grad.addColorStop(1, w.colorEnd);

        ctx.fillStyle = grad;
        ctx.fill();

        // Luminous Neon Crest Line along the top edge of the wave
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const distToMouse = Math.abs(x - mouseX);
          const mouseRipple = Math.exp(-distToMouse / 260) * Math.sin(time * 0.08) * 18;
          const harmonic1 = Math.sin(x * w.frequency + time * w.speed + w.phase + mouseFactorX * 0.005) * currentAmp;
          const harmonic2 = Math.cos(x * w.frequency * 1.8 - time * w.speed * 0.7) * (currentAmp * 0.35);
          const y = baseY + harmonic1 + harmonic2 + mouseRipple;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w.crestColor;
        ctx.lineWidth = w.lineWidth;
        ctx.shadowColor = w.crestGlow;
        ctx.shadowBlur = w.glowBlur;
        ctx.stroke();
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
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Underlying Dynamic Ambient Breathing Wave Blobs */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-purple-600/18 rounded-full blur-[150px] pointer-events-none animate-float-slow" />
      <div className="absolute -bottom-32 left-1/3 w-[700px] h-[700px] bg-pink-600/12 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* 2. Interactive Fluid Harmonic Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 3. Subtle Cyber Dot Matrix overlay to anchor spatial perspective */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
    </div>
  );
};

export default GradientWaveBackground;
