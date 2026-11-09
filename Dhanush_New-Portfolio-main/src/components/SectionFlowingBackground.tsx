import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface SectionFlowingBackgroundProps {
  variant?: 'hero' | 'about' | 'coding' | 'skills' | 'experience' | 'projects' | 'certifications' | 'contact';
  position?: 'left' | 'right' | 'center';
  particleCount?: number;
}

export const SectionFlowingBackground: React.FC<SectionFlowingBackgroundProps> = ({
  variant = 'hero',
  position,
  particleCount = 100,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to only mount WebGL when section is visible in viewport
  useEffect(() => {
    const container = mountRef.current;
    if (!container || isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !isInView || isMobile) return;

    // 1. WebGL Renderer with capped DPR and disabled antialiasing for maximum GPU efficiency
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed in SectionFlowingBackground', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    renderer.setPixelRatio(dpr);

    const getDims = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (variant === 'hero' ? window.innerHeight : 850);
      return { width: Math.max(w, 200), height: Math.max(h, 200) };
    };

    const initialDims = getDims();
    renderer.setSize(initialDims.width, initialDims.height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // 2. Camera & Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      initialDims.width / initialDims.height,
      0.1,
      1000
    );
    camera.position.z = 24;

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x06b6d4, 3.5, 50);
    lightCyan.position.set(10, 10, 10);
    scene.add(lightCyan);

    const lightPurple = new THREE.PointLight(0xa855f7, 3.5, 50);
    lightPurple.position.set(-10, -10, 10);
    scene.add(lightPurple);

    // 4. Section 3D Geometric Mesh Group
    const meshGroup = new THREE.Group();
    const defaultSide = position || (
      variant === 'about' || variant === 'skills' || variant === 'projects' ? 'left' : 'right'
    );
    const targetX = defaultSide === 'left' ? -4.5 : 4.5;
    const targetY = variant === 'hero' ? 0 : 0.3;
    const targetZ = 0;

    meshGroup.position.set(targetX, targetY, targetZ);
    scene.add(meshGroup);

    // Fast, lightweight standard materials (no expensive transmission shader passes)
    let outerGeo: THREE.BufferGeometry;
    let outerMat: THREE.Material;
    let innerGeo: THREE.BufferGeometry | null = null;
    let innerMat: THREE.Material | null = null;

    switch (variant) {
      case 'about':
        outerGeo = new THREE.IcosahedronGeometry(4.0, 1);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0x6366f1,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
        innerGeo = new THREE.OctahedronGeometry(2.2, 0);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0x22d3ee,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.65,
        });
        break;

      case 'coding':
        outerGeo = new THREE.DodecahedronGeometry(4.0, 1);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.45,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.1, 1);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0xec4899,
          emissive: 0xa855f7,
          emissiveIntensity: 0.55,
          transparent: true,
          opacity: 0.6,
        });
        break;

      case 'skills':
        outerGeo = new THREE.TorusGeometry(4.5, 1.1, 16, 48);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.0, 1);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.65,
        });
        break;

      case 'experience':
        outerGeo = new THREE.OctahedronGeometry(4.2, 2);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
        innerGeo = new THREE.TetrahedronGeometry(2.2, 1);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0x8b5cf6,
          emissive: 0xa855f7,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.65,
        });
        break;

      case 'projects':
        outerGeo = new THREE.TorusKnotGeometry(3.6, 0.9, 64, 16, 2, 3);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0xec4899,
          emissive: 0x6366f1,
          emissiveIntensity: 0.55,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
        innerGeo = new THREE.SphereGeometry(1.9, 16, 16);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0x22d3ee,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.65,
          transparent: true,
          opacity: 0.65,
        });
        break;

      case 'certifications':
        outerGeo = new THREE.DodecahedronGeometry(4.1, 0);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.52,
        });
        innerGeo = new THREE.OctahedronGeometry(2.2, 1);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0x10b981,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.65,
        });
        break;

      case 'contact':
        outerGeo = new THREE.TorusGeometry(4.2, 1.2, 16, 48);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x8b5cf6,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.0, 1);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.65,
        });
        break;

      case 'hero':
      default:
        outerGeo = new THREE.TorusKnotGeometry(4.0, 1.0, 64, 16, 2, 3);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x6366f1,
          emissiveIntensity: 0.55,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        innerGeo = new THREE.SphereGeometry(2.1, 16, 16);
        innerMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.65,
          transparent: true,
          opacity: 0.65,
        });
        break;
    }

    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    meshGroup.add(outerMesh);

    let innerMesh: THREE.Mesh | null = null;
    if (innerGeo && innerMat) {
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
      meshGroup.add(innerMesh);
    }

    // 5. Clamped Particle Swarm (<120 static instanced points)
    const actualParticleCount = Math.min(particleCount || 100, 120);
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(actualParticleCount * 3);
    const particleColors = new Float32Array(actualParticleCount * 3);
    const particleOriginalY = new Float32Array(actualParticleCount);
    const particleOriginalX = new Float32Array(actualParticleCount);

    const palette = [
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x6366f1),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x22d3ee),
    ];

    for (let i = 0; i < actualParticleCount; i++) {
      const radiusDist = 4 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radiusDist;
      const y = (Math.random() - 0.5) * 16;
      const z = Math.sin(angle) * radiusDist;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginalX[i] = x;
      particleOriginalY[i] = y;

      const col = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    meshGroup.add(particles);

    // 6. Resize handling
    const handleResize = () => {
      const dims = getDims();
      camera.aspect = dims.width / dims.height;
      camera.updateProjectionMatrix();
      renderer.setSize(dims.width, dims.height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Loop (Only while visible)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mesh rotation & gentle zero-gravity breathing oscillation
      outerMesh.rotation.x = elapsedTime * 0.22;
      outerMesh.rotation.y = elapsedTime * 0.3;

      if (innerMesh) {
        innerMesh.rotation.x = -elapsedTime * 0.25;
        innerMesh.rotation.y = -elapsedTime * 0.35;
      }

      const floatY = Math.sin(elapsedTime * 1.2) * 0.35;
      meshGroup.position.y = targetY + floatY;

      // Particle floating oscillation
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < actualParticleCount; i++) {
        const yIndex = i * 3 + 1;
        const xIndex = i * 3;
        positions[yIndex] = particleOriginalY[i] + Math.sin(elapsedTime * 0.8 + i * 0.5) * 0.35;
        positions[xIndex] = particleOriginalX[i] + Math.cos(elapsedTime * 0.6 + i * 0.4) * 0.3;
      }
      posAttr.needsUpdate = true;

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Full WebGL Context & Memory Cleanup upon leaving viewport
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      if (innerGeo) innerGeo.dispose();
      if (innerMat) innerMat.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
    };
  }, [variant, position, particleCount, isInView, isMobile]);

  if (isMobile) {
    return (
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 70%)'
        }}
      />
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    />
  );
};
