import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const AnimatedCharacter: React.FC<CharProps> = ({ char, index, total, progress }) => {
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute top-0 left-0">
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let globalIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        const wordElements = (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const charIdx = globalIndex++;
              return (
                <AnimatedCharacter
                  key={charIdx}
                  char={char}
                  index={charIdx}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              );
            })}
            {wIdx < words.length - 1 && (
              <span className="inline-block">
                <AnimatedCharacter
                  key={`space-${wIdx}`}
                  char={'\u00A0'}
                  index={globalIndex++}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              </span>
            )}
          </span>
        );
        return wordElements;
      })}
    </p>
  );
};
