import React, { useState, useRef, useEffect } from 'react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_030633_1712fc71-4979-4e14-98f9-9f95702ab3da.mp4";

export const VideoBackground: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      setIsVideoLoaded(true);
    }

    // Ensure video plays smoothly across all mobile and desktop browsers
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoLoaded(true))
        .catch(() => {
          // If browser autoplay policy requires user interaction, start on first gesture
          const handleInteraction = () => {
            video.play().then(() => setIsVideoLoaded(true)).catch(() => {});
            window.removeEventListener('pointerdown', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
          };
          window.addEventListener('pointerdown', handleInteraction, { once: true });
          window.addEventListener('scroll', handleInteraction, { once: true });
          window.addEventListener('keydown', handleInteraction, { once: true });
        });
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-30 overflow-hidden bg-[#030712]"
      aria-hidden="true"
    >
      {/* 1. Underlying Solid Space Dark Base */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* 2. Video Element with Color Calibration Filters */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        onPlay={() => setIsVideoLoaded(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-75' : 'opacity-0'
        }`}
        style={{
          // Color grading filter: deepens blacks, boosts contrast, and harmonizes colors
          filter: 'contrast(1.2) brightness(0.68) saturate(1.3) hue-rotate(-5deg)',
          transform: 'scale(1.04)',
        }}
      />

      {/* 3. Portfolio Signature Color Tint Overlay (Indigo, Cyan, Violet, Magenta) */}
      <div 
        className="absolute inset-0 mix-blend-color opacity-75 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #030712 0%, #6366f1 28%, #06b6d4 50%, #a855f7 75%, #ec4899 100%)',
        }}
      />

      {/* 4. Soft Aurora Mesh Glow Overlay (Overlay blend to harmonize video highlights) */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-45 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 80% 25%, rgba(99, 102, 241, 0.4) 0%, transparent 55%),
            radial-gradient(circle at 50% 75%, rgba(168, 85, 247, 0.35) 0%, transparent 60%),
            radial-gradient(circle at 85% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 50%)
          `
        }}
      />

      {/* 5. Deep Space Vignette (Darkens edges & ensures seamless navbar / footer contrast) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(3, 7, 18, 0.2) 0%, rgba(3, 7, 18, 0.65) 65%, #030712 100%)',
        }}
      />

      {/* 6. Vertical Fade Gradient for Header and Footer Comfort */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-transparent to-[#030712]/90 pointer-events-none" />

      {/* 7. Subtle Tech Dot Grid Overlay */}
      <div className="absolute inset-0 dot-pattern opacity-35 pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
