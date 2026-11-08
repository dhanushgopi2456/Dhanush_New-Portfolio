import React from 'react';

type RGBA = { r: number; g: number; b: number; a: number };

export interface ButtonGlareProps {
  radius?: number;
  className?: string;
  intensity?: number;
  frontColor?: RGBA;
  coolColor?: RGBA;
  crestColor?: RGBA;
  glowWidth?: number;
  duration?: number;
  pause?: number;
  [key: string]: any;
}

/**
 * ButtonGlare renders a high-performance, GPU-accelerated glass glare scan
 * with chromatic dispersion and shape-aware rim reflection inside buttons and cards.
 * Uses pure CSS compositing to avoid exceeding the browser's 16-WebGL context limit.
 */
export const ButtonGlare: React.FC<ButtonGlareProps> = ({
  radius = Infinity,
  className = '',
  intensity = 1.0,
  frontColor,
  coolColor,
  crestColor,
}) => {
  const toRgbaStr = (c?: RGBA, defaultStr: string = 'rgba(56, 189, 248, 0.4)') => {
    if (!c) return defaultStr;
    const r = Math.round(c.r > 1 ? c.r : c.r * 255);
    const g = Math.round(c.g > 1 ? c.g : c.g * 255);
    const b = Math.round(c.b > 1 ? c.b : c.b * 255);
    const a = c.a !== undefined ? c.a : 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const primaryGlow = toRgbaStr(frontColor || coolColor, 'rgba(56, 189, 248, 0.45)');
  const crestGlow = toRgbaStr(crestColor, 'rgba(168, 85, 247, 0.4)');
  const borderRadiusStyle = Number.isFinite(radius) ? { borderRadius: `${radius}px` } : undefined;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0 ${className}`}
      style={borderRadiusStyle}
      aria-hidden="true"
    >
      {/* Subtle glass rim highlight */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />

      {/* Top rim thickness / fresnel refraction line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Dynamic Glass Glare Sweep Front */}
      <div
        className="absolute -inset-y-2 -left-1/2 w-1/2 animate-glass-glare pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${primaryGlow} 45%, rgba(255, 255, 255, 0.45) 55%, ${crestGlow} 65%, transparent 100%)`,
          filter: 'blur(3px)',
          opacity: intensity,
        }}
      />
    </div>
  );
};

export default ButtonGlare;
