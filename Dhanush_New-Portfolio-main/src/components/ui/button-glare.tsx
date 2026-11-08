import React from 'react';
import AmbientGlareShader, { AmbientGlareShaderProps } from './ambient-glare-shader';

export interface ButtonGlareProps extends Partial<AmbientGlareShaderProps> {
  radius?: number;
  className?: string;
}

/**
 * ButtonGlare wraps the WebGL AmbientGlareShader for drop-in glass scan animation
 * inside any button, link, or pill container.
 * Ensure the parent button has `relative overflow-hidden` and inner text has `relative z-10`.
 */
export const ButtonGlare: React.FC<ButtonGlareProps> = ({
  radius = Infinity,
  className = 'absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300',
  glowWidth = 38,
  duration = 2.4,
  pause = 1.4,
  intensity = 1.25,
  softness = 0.7,
  ...props
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0">
      <AmbientGlareShader
        className={className}
        radius={radius}
        glowWidth={glowWidth}
        duration={duration}
        pause={pause}
        intensity={intensity}
        softness={softness}
        {...props}
      />
    </div>
  );
};

export default ButtonGlare;
