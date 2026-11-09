import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SectionObject {
  group: THREE.Group;
  outerMesh: THREE.Mesh;
  innerMesh?: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  floatFreq: number;
  floatAmp: number;
}

export const LivingCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. WebGL Renderer Initialization
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed in LivingCanvas', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      4000
    );
    camera.position.z = 720;

    // 3. Lighting Setup (Cyan, Purple & Indigo Accents)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x06b6d4, 4.5, 1600);
    lightCyan.position.set(300, 200, 300);
    scene.add(lightCyan);

    const lightPurple = new THREE.PointLight(0xa855f7, 4.5, 1600);
    lightPurple.position.set(-300, -200, 300);
    scene.add(lightPurple);

    const lightIndigo = new THREE.PointLight(0x6366f1, 3.5, 1400);
    lightIndigo.position.set(0, 0, 200);
    scene.add(lightIndigo);

    // 4. Circle Particle Texture Helper
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(34, 211, 238, 0.9)');
        gradient.addColorStop(0.65, 'rgba(168, 85, 247, 0.45)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createCircleTexture();

    // 5. Constellation of Section-Anchored 3D Geometric Flowing Objects
    const sectionObjects: SectionObject[] = [];
    const isMobile = window.innerWidth < 768;

    // Section 1: Hero — Floating Torus Knot + Glassmorphic Core
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.TorusKnotGeometry(105, 30, 128, 32, 2, 3);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
        roughness: 0.2,
        metalness: 0.9,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.IcosahedronGeometry(48, 2);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x818cf8,
        emissive: 0x9333ea,
        emissiveIntensity: 0.65,
        transmission: 0.85,
        transparent: true,
        opacity: 0.65,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : 340;
      const posY = 30;
      const posZ = isMobile ? -60 : 0;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: 0.25,
        rotSpeedY: 0.35,
        rotSpeedZ: 0.15,
        floatFreq: 1.1,
        floatAmp: 25,
      });
    }

    // Section 2: About / 3D Bento Grid — Floating Icosahedron Crystal + Octahedron Core
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.IcosahedronGeometry(95, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x6366f1,
        emissiveIntensity: 0.55,
        wireframe: true,
        transparent: true,
        opacity: 0.52,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.OctahedronGeometry(46, 0);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x22d3ee,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.7,
        transmission: 0.8,
        transparent: true,
        opacity: 0.7,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : -380;
      const posY = -850;
      const posZ = -40;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: 0.3,
        rotSpeedY: -0.25,
        rotSpeedZ: 0.2,
        floatFreq: 0.95,
        floatAmp: 28,
      });
    }

    // Section 3: Coding Profiles — Floating Dodecahedron Mesh + Glowing Star Core
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.DodecahedronGeometry(100, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.45,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.IcosahedronGeometry(44, 1);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0xec4899,
        emissive: 0xa855f7,
        emissiveIntensity: 0.6,
        transmission: 0.75,
        transparent: true,
        opacity: 0.65,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : 380;
      const posY = -1700;
      const posZ = -30;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: -0.22,
        rotSpeedY: 0.32,
        rotSpeedZ: 0.18,
        floatFreq: 1.05,
        floatAmp: 26,
      });
    }

    // Section 4: Skills — Floating Torus Halo Ring with Orbiting Core
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.TorusGeometry(115, 24, 24, 64);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.52,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.IcosahedronGeometry(42, 2);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.6,
        transmission: 0.85,
        transparent: true,
        opacity: 0.7,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : -370;
      const posY = -2550;
      const posZ = -40;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: 0.35,
        rotSpeedY: 0.2,
        rotSpeedZ: -0.25,
        floatFreq: 0.9,
        floatAmp: 30,
      });
    }

    // Section 5: Experience Timeline — Floating Octahedron Diamond Crystal
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.OctahedronGeometry(105, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        emissive: 0xec4899,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.OctahedronGeometry(45, 0);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0xa855f7,
        emissive: 0x6366f1,
        emissiveIntensity: 0.7,
        transmission: 0.85,
        transparent: true,
        opacity: 0.7,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : 360;
      const posY = -3400;
      const posZ = -40;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: -0.25,
        rotSpeedY: -0.3,
        rotSpeedZ: 0.15,
        floatFreq: 1.15,
        floatAmp: 24,
      });
    }

    // Section 6: Projects Showcase — Floating Complex Torus Knot
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.TorusKnotGeometry(100, 28, 110, 28, 3, 5);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.52,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.IcosahedronGeometry(45, 2);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x22d3ee,
        emissive: 0x10b981,
        emissiveIntensity: 0.6,
        transmission: 0.8,
        transparent: true,
        opacity: 0.65,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : -390;
      const posY = -4250;
      const posZ = -30;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: 0.28,
        rotSpeedY: 0.36,
        rotSpeedZ: -0.18,
        floatFreq: 1.0,
        floatAmp: 28,
      });
    }

    // Section 7: Certifications Vault — Floating Holographic Icosahedron
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.IcosahedronGeometry(100, 2);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.55,
        wireframe: true,
        transparent: true,
        opacity: 0.52,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.DodecahedronGeometry(44, 0);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.65,
        transmission: 0.85,
        transparent: true,
        opacity: 0.7,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : 370;
      const posY = -5100;
      const posZ = -40;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: 0.22,
        rotSpeedY: -0.32,
        rotSpeedZ: 0.22,
        floatFreq: 1.08,
        floatAmp: 25,
      });
    }

    // Section 8: Contact Section — Floating Klein Torus Knot
    {
      const group = new THREE.Group();
      const outerGeo = new THREE.TorusKnotGeometry(95, 28, 96, 24, 2, 3);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0xa855f7,
        emissiveIntensity: 0.55,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.IcosahedronGeometry(42, 2);
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x6366f1,
        emissive: 0xec4899,
        emissiveIntensity: 0.65,
        transmission: 0.8,
        transparent: true,
        opacity: 0.65,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const posX = isMobile ? 0 : -320;
      const posY = -5950;
      const posZ = -30;
      group.position.set(posX, posY, posZ);
      if (isMobile) group.scale.set(0.65, 0.65, 0.65);
      scene.add(group);

      sectionObjects.push({
        group,
        outerMesh,
        innerMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        rotSpeedX: -0.28,
        rotSpeedY: 0.35,
        rotSpeedZ: 0.15,
        floatFreq: 0.95,
        floatAmp: 28,
      });
    }

    // 6. Viewport-Relative Floating Satellites (Always Floating in View in Zero Gravity)
    const cameraSatellites: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      floatPhase: number;
    }[] = [];

    const satelliteGroup = new THREE.Group();
    scene.add(satelliteGroup);

    // Satellite A: Mini Icosahedron (Top-Left)
    {
      const geo = new THREE.IcosahedronGeometry(22, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x6366f1,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const mesh = new THREE.Mesh(geo, mat);
      satelliteGroup.add(mesh);
      cameraSatellites.push({
        mesh,
        baseX: -260,
        baseY: 170,
        baseZ: -100,
        rotSpeedX: 0.4,
        rotSpeedY: 0.5,
        floatPhase: 0,
      });
    }

    // Satellite B: Mini Torus (Bottom-Right)
    {
      const geo = new THREE.TorusGeometry(26, 7, 16, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xec4899,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const mesh = new THREE.Mesh(geo, mat);
      satelliteGroup.add(mesh);
      cameraSatellites.push({
        mesh,
        baseX: 270,
        baseY: -180,
        baseZ: -80,
        rotSpeedX: -0.5,
        rotSpeedY: 0.4,
        floatPhase: 1.8,
      });
    }

    // Satellite C: Mini Octahedron Diamond (Mid-Right)
    {
      const geo = new THREE.OctahedronGeometry(20, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.65,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const mesh = new THREE.Mesh(geo, mat);
      satelliteGroup.add(mesh);
      cameraSatellites.push({
        mesh,
        baseX: 300,
        baseY: 30,
        baseZ: -90,
        rotSpeedX: 0.35,
        rotSpeedY: -0.45,
        floatPhase: 3.2,
      });
    }

    // Satellite D: Mini Dodecahedron (Mid-Left)
    {
      const geo = new THREE.DodecahedronGeometry(22, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0xa855f7,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const mesh = new THREE.Mesh(geo, mat);
      satelliteGroup.add(mesh);
      cameraSatellites.push({
        mesh,
        baseX: -290,
        baseY: -80,
        baseZ: -110,
        rotSpeedX: -0.3,
        rotSpeedY: 0.4,
        floatPhase: 4.5,
      });
    }

    // 7. Global Ambient Swarm of 900+ Glowing Cyan & Purple Particles
    const particleCount = 950;
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
      const x = (Math.random() - 0.5) * 1500;
      // Spanning full vertical scroll depth from +400 down to -6400
      const y = (Math.random() - 0.5) * 6800 - 3000;
      const z = (Math.random() - 0.5) * 900 - 100;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginalX[i] = x;
      particleOriginalY[i] = y;
      particleOriginalZ[i] = z;

      const rand = Math.random();
      const col = rand > 0.65 ? cyanColor : rand > 0.35 ? purpleColor : rand > 0.15 ? indigoColor : whiteColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 6.5,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // 8. Mouse & Scroll Tracking with Spring Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentScrollFraction = 0;
    let targetScrollFraction = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScrollFraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const mobileNow = width < 768;
      sectionObjects.forEach((obj) => {
        obj.group.scale.set(
          mobileNow ? 0.65 : 1,
          mobileNow ? 0.65 : 1,
          mobileNow ? 0.65 : 1
        );
        obj.group.position.x = mobileNow ? 0 : obj.baseX;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    // 9. 60fps Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (lerp)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Smooth scroll interpolation (lerp)
      currentScrollFraction += (targetScrollFraction - currentScrollFraction) * 0.06;

      // Total vertical distance along the 8 sections is ~5950 units
      const targetCamY = -currentScrollFraction * 5950;
      camera.position.y = targetCamY + mouseY * 25;
      camera.position.x = mouseX * 45;
      camera.position.z = 720 + Math.sin(elapsedTime * 0.4) * 12;
      camera.lookAt(0, targetCamY, 0);

      // Light positions follow scroll camera to ensure bright illuminations in every section
      lightCyan.position.y = targetCamY + 200;
      lightPurple.position.y = targetCamY - 200;
      lightIndigo.position.y = targetCamY;

      // Animate Section-Anchored 3D Geometric Objects
      sectionObjects.forEach((obj) => {
        obj.outerMesh.rotation.x = elapsedTime * obj.rotSpeedX + mouseY * 0.4;
        obj.outerMesh.rotation.y = elapsedTime * obj.rotSpeedY + mouseX * 0.4;
        obj.outerMesh.rotation.z = elapsedTime * obj.rotSpeedZ;

        if (obj.innerMesh) {
          obj.innerMesh.rotation.x = -elapsedTime * obj.rotSpeedX * 0.8;
          obj.innerMesh.rotation.y = -elapsedTime * obj.rotSpeedY * 0.8;
        }

        // Harmonic zero-gravity breathing float
        const floatDelta = Math.sin(elapsedTime * obj.floatFreq) * obj.floatAmp;
        obj.group.position.y = obj.baseY + floatDelta;
      });

      // Animate Viewport Satellites (always floating in view around the camera)
      satelliteGroup.position.set(camera.position.x, targetCamY, camera.position.z - 380);
      cameraSatellites.forEach((sat) => {
        sat.mesh.rotation.x = elapsedTime * sat.rotSpeedX;
        sat.mesh.rotation.y = elapsedTime * sat.rotSpeedY;

        const floatY = Math.sin(elapsedTime * 1.4 + sat.floatPhase) * 18;
        const floatX = Math.cos(elapsedTime * 1.1 + sat.floatPhase) * 14;
        sat.mesh.position.set(sat.baseX + floatX, sat.baseY + floatY, sat.baseZ);
      });

      // Animate Global Ambient Glowing Particle Swarm
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        // Zero-gravity harmonic wave drift
        positions[idx] = particleOriginalX[i] + Math.sin(elapsedTime * 0.7 + i) * 18;
        positions[idx + 1] = particleOriginalY[i] + Math.cos(elapsedTime * 0.5 + i * 1.3) * 18;
        positions[idx + 2] = particleOriginalZ[i] + Math.sin(elapsedTime * 0.6 + i * 0.7) * 14;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Memory Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-transparent"
      aria-hidden="true"
    />
  );
};
