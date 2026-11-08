import React, { useRef, useEffect } from 'react';

const CLOUDFRONT_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_030633_1712fc71-4979-4e14-98f9-9f95702ab3da.mp4";
const LOCAL_VIDEO = "/background-video.mp4";

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video to play with muted attribute for universal autoplay
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: trigger playback on user's first gesture
        const handleGesture = () => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
          window.removeEventListener('pointerdown', handleGesture);
          window.removeEventListener('scroll', handleGesture);
          window.removeEventListener('keydown', handleGesture);
          window.removeEventListener('touchstart', handleGesture);
        };

        window.addEventListener('pointerdown', handleGesture, { once: true });
        window.addEventListener('scroll', handleGesture, { once: true });
        window.addEventListener('keydown', handleGesture, { once: true });
        window.addEventListener('touchstart', handleGesture, { once: true });
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

      {/* 2. Full-Screen Cinematic Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="w-full h-full object-cover object-center"
        style={{
          // Boost saturation & contrast for a rich, vibrant cosmic look
          filter: 'saturate(1.25) contrast(1.12) brightness(1.0)',
          transform: 'scale(1.02)',
        }}
      >
        <source src={LOCAL_VIDEO} type="video/mp4" />
        <source src={CLOUDFRONT_VIDEO} type="video/mp4" />
      </video>

      {/* 3. Portfolio Cyber-Aurora Color Harmonics (Cyan & Violet glow enhancement) */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-color opacity-25"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, #6366f1 25%, #06b6d4 50%, #a855f7 75%, transparent 100%)',
        }}
      />

      {/* 4. Top & Bottom Subtle Fade for Navbar and Footer Contrast */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(3, 7, 18, 0.5) 0%, rgba(3, 7, 18, 0.05) 20%, rgba(3, 7, 18, 0.05) 80%, rgba(3, 7, 18, 0.65) 100%)',
        }}
      />

      {/* 5. Soft Radial Vignette to keep text readable on all screens */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(3, 7, 18, 0.35) 80%, rgba(3, 7, 18, 0.7) 100%)',
        }}
      />
    </div>
  );
};

export default VideoBackground;
