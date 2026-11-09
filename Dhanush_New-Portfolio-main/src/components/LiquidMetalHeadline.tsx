import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { audioSynth } from '../utils/audioSynth';

interface LiquidMetalHeadlineProps {
  firstName?: string;
  lastName?: string;
}

const InteractiveGlyph: React.FC<{ char: string; index: number }> = ({ char, index }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioSynth.playGlassClick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (char === ' ') {
    return <span className="inline-block w-4 sm:w-6">&nbsp;</span>;
  }

  return (
    <motion.span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={isHovered ? {
        y: -12,
        scale: 1.18,
        rotateZ: (index % 2 === 0 ? 1 : -1) * 4,
        textShadow: '0 0 25px rgba(34,211,238,0.9), -3px 0 10px rgba(6,182,212,0.8), 3px 0 10px rgba(168,85,247,0.8)',
      } : {
        y: 0,
        scale: 1,
        rotateZ: 0,
        textShadow: '0 0 0px transparent',
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 15 }}
      className="inline-block cursor-pointer select-none transition-colors duration-150 relative transform-gpu"
      style={{
        background: isHovered 
          ? 'linear-gradient(135deg, #ffffff 0%, #22d3ee 50%, #c084fc 100%)' 
          : 'linear-gradient(180deg, #ffffff 10%, #cbd5e1 60%, #94a3b8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {char}
      {/* Liquid Sheen Shimmer Reflection Line */}
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1.4 }}
          exit={{ opacity: 0 }}
          className="absolute -inset-1 -z-10 rounded-full bg-cyan-400/20 blur-md pointer-events-none"
        />
      )}
    </motion.span>
  );
};

export const LiquidMetalHeadline: React.FC<LiquidMetalHeadlineProps> = ({
  firstName = "Dhanush Gopi",
  lastName = "Kavala",
}) => {
  return (
    <div className="relative font-extrabold tracking-tight leading-[1.08] select-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
      {/* First Row: Dhanush Gopi */}
      <div className="flex flex-wrap items-center">
        {firstName.split('').map((char, i) => (
          <InteractiveGlyph key={`fn-${i}`} char={char} index={i} />
        ))}
      </div>

      {/* Second Row: Kavala with Liquid Gradient Refraction */}
      <div className="flex flex-wrap items-center mt-1">
        {lastName.split('').map((char, i) => (
          <InteractiveGlyph key={`ln-${i}`} char={char} index={i + firstName.length} />
        ))}
      </div>
    </div>
  );
};
