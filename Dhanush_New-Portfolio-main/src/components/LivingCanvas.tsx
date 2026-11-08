import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const LivingCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true, 
        powerPreference: 'high-performance' 
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to CSS canvas background', e);
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

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0008);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 800;

    // 1. STARFIELD PARTICLES
    const starsCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);
    const starOriginalY = new Float32Array(starsCount);

    const palette = [
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xa855f7), // Violet
      new THREE.Color(0xec4899), // Magenta
      new THREE.Color(0xffffff), // Bright star white
      new THREE.Color(0x93c5fd), // Soft blue
    ];

    for (let i = 0; i < starsCount; i++) {
      const x = (Math.random() - 0.5) * 2400;
      const y = (Math.random() - 0.5) * 2400;
      const z = (Math.random() - 0.5) * 1600;

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;
      starOriginalY[i] = y;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Custom circle star texture
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.6, 'rgba(168, 85, 247, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const starMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: createStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 2. AURORA SHADER MESH PLANE
    // Custom vertex & fragment shader for a slow drifting volumetric aurora ribbon
    const auroraUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const auroraVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Wave displacement reacting to time and mouse
        float wave1 = sin(pos.x * 0.003 + uTime * 0.8 + uMouse.x * 2.0) * 45.0;
        float wave2 = cos(pos.y * 0.004 + uTime * 0.6 + uMouse.y * 2.0) * 35.0;
        pos.z += wave1 + wave2;

        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const auroraFragmentShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      void main() {
        vec2 uv = vUv;
        
        // Fluid flow coordinates
        float t = uTime * 0.25;
        vec2 p = uv * 2.0 - 1.0;
        p.x += (uMouse.x - 0.5) * 0.4;
        p.y += (uMouse.y - 0.5) * 0.4;

        float n1 = sin(p.x * 2.5 + t) * cos(p.y * 2.5 + t);
        float n2 = sin(p.x * 4.0 - t * 0.8) * cos(p.y * 3.0 + t * 0.5);
        float n3 = sin((p.x + p.y) * 3.0 + t * 1.2);
        float pattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

        // Aurora Color Palette
        vec3 indigo = vec3(0.388, 0.4, 0.945);  // #6366f1
        vec3 cyan = vec3(0.024, 0.714, 0.831);   // #06b6d4
        vec3 violet = vec3(0.659, 0.333, 0.969); // #a855f7
        vec3 magenta = vec3(0.925, 0.282, 0.6);  // #ec4899

        // Multi-stop color blending
        vec3 col = mix(indigo, cyan, smoothstep(-0.6, 0.0, pattern));
        col = mix(col, violet, smoothstep(0.0, 0.4, pattern));
        col = mix(col, magenta, smoothstep(0.4, 0.9, pattern));

        // Soft vignette & edge fade
        float distFromCenter = length(p);
        float alpha = smoothstep(1.3, 0.2, distFromCenter) * 0.22;
        
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const auroraGeometry = new THREE.PlaneGeometry(2400, 1600, 64, 48);
    const auroraMaterial = new THREE.ShaderMaterial({
      vertexShader: auroraVertexShader,
      fragmentShader: auroraFragmentShader,
      uniforms: auroraUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const auroraMesh = new THREE.Mesh(auroraGeometry, auroraMaterial);
    auroraMesh.position.z = -150;
    scene.add(auroraMesh);

    // 3. PERSPECTIVE GRID LINES IN DEEP SPACE (Subtle Sci-Fi Depth Grid)
    const gridHelper = new THREE.GridHelper(3000, 50, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -600;
    gridHelper.position.z = 0;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    scene.add(gridHelper);

    // MOUSE & SCROLL STATE WITH DAMPING
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      auroraUniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      auroraUniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      auroraUniforms.uTime.value = elapsedTime;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Camera parallax
      camera.position.x = mouseX * 80;
      camera.position.y = mouseY * 60 - scrollY * 0.25;
      camera.lookAt(0, -scrollY * 0.2, 0);

      // Starfield slow drift
      starField.rotation.y = elapsedTime * 0.02 + mouseX * 0.05;
      starField.rotation.x = elapsedTime * 0.01 + mouseY * 0.05;

      // Slight floating wobble on aurora
      auroraMesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      auroraGeometry.dispose();
      auroraMaterial.dispose();
      renderer.dispose();
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
