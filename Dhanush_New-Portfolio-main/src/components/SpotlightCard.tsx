import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  hasBorderBeam?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.15)',
  hasBorderBeam = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-3xl overflow-hidden glass-card transition-all duration-300 ${className}`}
      {...props}
    >
      {/* 360-Degree Continuous Rotating Laser Border Beam */}
      {hasBorderBeam && (
        <div className="absolute -inset-[1px] rounded-[inherit] overflow-hidden pointer-events-none -z-10">
          <div className="absolute -inset-[200%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_60deg,#3b82f6_120deg,#ec4899_180deg,#8b5cf6_240deg,transparent_300deg)] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {/* Internal Cursor-Tracked Radial Spotlight (Direct CSS variables, 0 React re-renders) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${spotlightColor}, transparent 65%)`,
        }}
      />

      {/* Subtle Border Spotlight Reflection */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.4,
          maskImage: 'radial-gradient(280px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(280px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), black 30%, transparent 80%)',
          borderColor: 'rgba(99, 102, 241, 0.4)',
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
