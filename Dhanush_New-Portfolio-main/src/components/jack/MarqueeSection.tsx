import React, { useEffect, useRef } from 'react';

const ALL_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // First 11 images tripled
  const row1Base = ALL_IMAGES.slice(0, 11);
  const row1Images = [...row1Base, ...row1Base, ...row1Base];

  // Remaining 10 images tripled
  const row2Base = ALL_IMAGES.slice(11);
  const row2Images = [...row2Base, ...row2Base, ...row2Base];

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${offset - 200}px, 0, 0)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updatePosition();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none w-full flex flex-col gap-3"
    >
      {/* Row 1 - moves RIGHT on scroll */}
      <div className="w-full overflow-hidden">
        <div
          ref={row1Ref}
          className="flex gap-3 will-change-transform"
          style={{ willChange: 'transform' }}
        >
          {row1Images.map((src, i) => (
            <img
              key={`row1-${i}`}
              src={src}
              alt={`3D Work ${(i % 11) + 1}`}
              loading="lazy"
              className="w-[420px] h-[270px] min-w-[420px] rounded-2xl object-cover bg-neutral-900 pointer-events-none select-none"
            />
          ))}
        </div>
      </div>

      {/* Row 2 - moves LEFT on scroll */}
      <div className="w-full overflow-hidden">
        <div
          ref={row2Ref}
          className="flex gap-3 will-change-transform"
          style={{ willChange: 'transform' }}
        >
          {row2Images.map((src, i) => (
            <img
              key={`row2-${i}`}
              src={src}
              alt={`3D Work ${(i % 10) + 12}`}
              loading="lazy"
              className="w-[420px] h-[270px] min-w-[420px] rounded-2xl object-cover bg-neutral-900 pointer-events-none select-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
