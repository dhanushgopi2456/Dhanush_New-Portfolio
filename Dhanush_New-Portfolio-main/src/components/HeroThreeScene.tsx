import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL not supported in HeroThreeScene', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 4, 50);
    pointLightCyan.position.set(10, 10, 10);
    scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 4, 50);
    pointLightPurple.position.set(-10, -10, 10);
    scene.add(pointLightPurple);

    // 1. Floating 3D Geometric Torus Knot Wireframe Mesh
    const knotGroup = new THREE.Group();
    // Shift slightly to right to balance hero typography on left
    knotGroup.position.set(4, 0.5, 0);
    scene.add(knotGroup);

    // Outer wireframe torus knot
    const knotGeo = new THREE.TorusKnotGeometry(4.2, 1.25, 128, 32, 2, 3);
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.45,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.9,
    });
    const knotMesh = new THREE.Mesh(knotGeo, wireframeMaterial);
    knotGroup.add(knotMesh);

    // Inner glowing core geometry (Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const innerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.85, // Glassmorphic refraction
      ior: 1.5,
      transparent: true,
      opacity: 0.65,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMaterial);
    knotGroup.add(innerMesh);

    // 2. Ambient Field of Glowing Cyan and Purple Particles
    const particleCount = 380;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleOriginalY = new Float32Array(particleCount);

    const cyanColor = new THREE.Color(0x22d3ee);
    const purpleColor = new THREE.Color(0xa855f7);
    const indigoColor = new THREE.Color(0x6366f1);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 26;
      const z = (Math.random() - 0.5) * 20;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      particleOriginalY[i] = y;

      const rand = Math.random();
      const col = rand > 0.6 ? cyanColor : rand > 0.3 ? purpleColor : indigoColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Circle Texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(34, 211, 238, 0.85)');
        gradient.addColorStop(0.7, 'rgba(168, 85, 247, 0.35)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // Mouse coordinates tracking with gentle damping (lerp)
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
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      // Adjust knot group position for small screens
      if (width < 768) {
        knotGroup.position.set(0, 0, -5);
        knotGroup.scale.set(0.75, 0.75, 0.75);
      } else {
        knotGroup.position.set(4, 0.5, 0);
        knotGroup.scale.set(1, 1, 1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped camera tilt
      targetCameraX += (mouseX * 4 - targetCameraX) * 0.05;
      targetCameraY += (-mouseY * 4 - targetCameraY) * 0.05;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // 3D Torus Knot rotation & gentle breathing float
      knotMesh.rotation.x = elapsedTime * 0.25 + mouseY * 0.8;
      knotMesh.rotation.y = elapsedTime * 0.35 + mouseX * 0.8;
      innerMesh.rotation.x = -elapsedTime * 0.3;
      innerMesh.rotation.y = -elapsedTime * 0.4;

      // Zero-gravity breathing oscillation
      const floatY = Math.sin(elapsedTime * 1.2) * 0.4;
      knotGroup.position.y = (window.innerWidth < 768 ? 0 : 0.5) + floatY;

      // Particle floating oscillation
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const yIndex = i * 3 + 1;
        positions[yIndex] = particleOriginalY[i] + Math.sin(elapsedTime * 0.8 + i) * 0.5;
      }
      posAttr.needsUpdate = true;

      // Gentle particle field rotation
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeo.dispose();
      wireframeMaterial.dispose();
      innerGeo.dispose();
      innerMaterial.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
