import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface SectionFlowingBackgroundProps {
  variant?: 'hero' | 'about' | 'coding' | 'skills' | 'experience' | 'projects' | 'certifications' | 'contact';
  position?: 'left' | 'right' | 'center';
  particleCount?: number;
}

export const SectionFlowingBackground: React.FC<SectionFlowingBackgroundProps> = ({
  variant = 'hero',
  position,
  particleCount = 420,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed in SectionFlowingBackground', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const getDims = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (variant === 'hero' ? window.innerHeight : 900);
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

    // 3. Lighting (Cyan, Purple & Ambient)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x06b6d4, 4.5, 60);
    lightCyan.position.set(12, 10, 12);
    scene.add(lightCyan);

    const lightPurple = new THREE.PointLight(0xa855f7, 4.5, 60);
    lightPurple.position.set(-12, -10, 12);
    scene.add(lightPurple);

    // 4. Section 3D Geometric Mesh Group
    const meshGroup = new THREE.Group();
    const isMobile = window.innerWidth < 768;

    // Position mapping
    const defaultSide = position || (
      variant === 'about' || variant === 'skills' || variant === 'projects' ? 'left' : 'right'
    );
    const targetX = isMobile ? 0 : defaultSide === 'left' ? -4.6 : 4.5;
    const targetY = isMobile ? (variant === 'hero' ? 0 : -2) : 0.3;
    const targetZ = isMobile ? -5 : 0;

    meshGroup.position.set(targetX, targetY, targetZ);
    if (isMobile) {
      meshGroup.scale.set(0.68, 0.68, 0.68);
    }
    scene.add(meshGroup);

    // Choose Geometry & Materials based on Variant
    let outerGeo: THREE.BufferGeometry;
    let outerMat: THREE.Material;
    let innerGeo: THREE.BufferGeometry | null = null;
    let innerMat: THREE.Material | null = null;

    switch (variant) {
      case 'about':
        outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0x6366f1,
          emissiveIntensity: 0.55,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        innerGeo = new THREE.OctahedronGeometry(2.3, 0);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0x22d3ee,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.65,
          transmission: 0.85,
          transparent: true,
          opacity: 0.7,
        });
        break;

      case 'coding':
        outerGeo = new THREE.DodecahedronGeometry(4.2, 1);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.52,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.2, 1);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0xec4899,
          emissive: 0xa855f7,
          emissiveIntensity: 0.6,
          transmission: 0.8,
          transparent: true,
          opacity: 0.65,
        });
        break;

      case 'skills':
        outerGeo = new THREE.TorusGeometry(4.8, 1.2, 24, 64);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x3b82f6,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.55,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.1, 2);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0x06b6d4,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.65,
          transmission: 0.85,
          transparent: true,
          opacity: 0.7,
        });
        break;

      case 'experience':
        outerGeo = new THREE.OctahedronGeometry(4.4, 1);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          emissive: 0xec4899,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        innerGeo = new THREE.OctahedronGeometry(2.2, 0);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0xa855f7,
          emissive: 0x6366f1,
          emissiveIntensity: 0.65,
          transmission: 0.85,
          transparent: true,
          opacity: 0.7,
        });
        break;

      case 'projects':
        outerGeo = new THREE.TorusKnotGeometry(4.0, 1.2, 110, 28, 3, 5);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.52,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.2, 2);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0x22d3ee,
          emissive: 0x10b981,
          emissiveIntensity: 0.65,
          transmission: 0.85,
          transparent: true,
          opacity: 0.7,
        });
        break;

      case 'certifications':
        outerGeo = new THREE.IcosahedronGeometry(4.2, 2);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0xec4899,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.55,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        innerGeo = new THREE.DodecahedronGeometry(2.2, 0);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0x10b981,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.65,
          transmission: 0.85,
          transparent: true,
          opacity: 0.7,
        });
        break;

      case 'contact':
        outerGeo = new THREE.TorusKnotGeometry(4.0, 1.25, 96, 24, 2, 3);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x22d3ee,
          emissive: 0xa855f7,
          emissiveIntensity: 0.55,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.1, 2);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0x6366f1,
          emissive: 0xec4899,
          emissiveIntensity: 0.65,
          transmission: 0.85,
          transparent: true,
          opacity: 0.7,
        });
        break;

      case 'hero':
      default:
        outerGeo = new THREE.TorusKnotGeometry(4.2, 1.25, 128, 32, 2, 3);
        outerMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x4f46e5,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
          roughness: 0.2,
          metalness: 0.9,
        });
        innerGeo = new THREE.IcosahedronGeometry(2.4, 2);
        innerMat = new THREE.MeshPhysicalMaterial({
          color: 0x818cf8,
          emissive: 0x9333ea,
          emissiveIntensity: 0.65,
          roughness: 0.1,
          metalness: 0.8,
          transmission: 0.85,
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

    // 5. Dense, Clearly Visible Glowing Particles
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleOriginalX = new Float32Array(particleCount);
    const particleOriginalY = new Float32Array(particleCount);
    const particleOriginalZ = new Float32Array(particleCount);

    const cyanColor = new THREE.Color(0x22d3ee);
    const purpleColor = new THREE.Color(0xa855f7);
    const indigoColor = new THREE.Color(0x6366f1);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 38;
      const y = (Math.random() - 0.5) * 28;
      const z = (Math.random() - 0.5) * 22;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginalX[i] = x;
      particleOriginalY[i] = y;
      particleOriginalZ[i] = z;

      const rand = Math.random();
      const col = rand > 0.6 ? cyanColor : rand > 0.3 ? purpleColor : rand > 0.1 ? indigoColor : whiteColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // High-Resolution Glowing Orb Texture
    const createOrbTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(34, 211, 238, 1)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.75)');
        gradient.addColorStop(0.8, 'rgba(99, 102, 241, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createOrbTexture();

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.85, // Clearly visible glowing orb size
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // 6. Mouse Interaction & Tilt Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.003;
      mouseY = (e.clientY - windowHalfY) * 0.003;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const dims = getDims();
      camera.aspect = dims.width / dims.height;
      camera.updateProjectionMatrix();
      renderer.setSize(dims.width, dims.height);

      const mobileNow = dims.width < 768;
      meshGroup.position.set(
        mobileNow ? 0 : targetX,
        mobileNow ? (variant === 'hero' ? 0 : -2) : targetY,
        mobileNow ? -5 : targetZ
      );
      meshGroup.scale.set(
        mobileNow ? 0.68 : 1,
        mobileNow ? 0.68 : 1,
        mobileNow ? 0.68 : 1
      );
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    // 7. Animation Loop with Intersection Observer Optimization
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return; // Save GPU when scrolled away

      const elapsedTime = clock.getElapsedTime();

      // Damped camera tilt
      targetCameraX += (mouseX * 4 - targetCameraX) * 0.05;
      targetCameraY += (-mouseY * 4 - targetCameraY) * 0.05;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // 3D Mesh rotation & zero-gravity breathing oscillation
      outerMesh.rotation.x = elapsedTime * 0.25 + mouseY * 0.8;
      outerMesh.rotation.y = elapsedTime * 0.35 + mouseX * 0.8;

      if (innerMesh) {
        innerMesh.rotation.x = -elapsedTime * 0.3;
        innerMesh.rotation.y = -elapsedTime * 0.4;
      }

      const floatY = Math.sin(elapsedTime * 1.2) * 0.4;
      meshGroup.position.y = (isMobile ? (variant === 'hero' ? 0 : -2) : targetY) + floatY;

      // Particle floating oscillation
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const yIndex = i * 3 + 1;
        const xIndex = i * 3;
        positions[yIndex] = particleOriginalY[i] + Math.sin(elapsedTime * 0.9 + i * 0.5) * 0.5;
        positions[xIndex] = particleOriginalX[i] + Math.cos(elapsedTime * 0.7 + i * 0.4) * 0.4;
      }
      posAttr.needsUpdate = true;

      // Particle swarm slow rotation
      particles.rotation.y = elapsedTime * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Memory Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      observer.disconnect();
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
      particleTexture.dispose();
    };
  }, [variant, position, particleCount]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    />
  );
};
