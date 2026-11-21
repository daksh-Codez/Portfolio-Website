import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Scene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2, // antialias only on standard screens for perf
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Core Geometry: Twisted Torus Knot with custom metallic shader/standard material
    const coreGeometry = new THREE.TorusKnotGeometry(1.2, 0.38, 120, 24, 2, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x14141e,
      emissive: 0x1a0f2e,
      roughness: 0.22,
      metalness: 0.88,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    sculptureGroup.add(coreMesh);

    // Outer Cage: Subtle geometric wireframe ring system for editorial depth
    const outerGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const outerMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b7bee,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      roughness: 0.3,
      metalness: 0.7
    });
    const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
    sculptureGroup.add(outerMesh);

    // Orbiting particle points for subtle cosmic/digital dust
    const particleCount = 75;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xb79cff,
      size: 0.035,
      transparent: true,
      opacity: 0.45
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    sculptureGroup.add(particleSystem);

    // Lighting Design: Deep charcoal with refined violet rim light
    const ambientLight = new THREE.AmbientLight(0x151520, 2.0);
    scene.add(ambientLight);

    // Refined violet key rim light
    const violetRimLight = new THREE.DirectionalLight(0x9b7bee, 4.0);
    violetRimLight.position.set(4, 3, 2);
    scene.add(violetRimLight);

    // Soft cold fill light
    const coldFillLight = new THREE.DirectionalLight(0x4c1d95, 2.5);
    coldFillLight.position.set(-4, -2, -2);
    scene.add(coldFillLight);

    // Subtle white specular point light
    const specLight = new THREE.PointLight(0xffffff, 2.0, 15);
    specLight.position.set(0, 4, 3);
    scene.add(specLight);

    // Mouse lerp tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll Storytelling calculation
    const getScrollTargets = () => {
      const scrollY = window.scrollY;
      const totalHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1);
      const isMobile = window.innerWidth < 768;

      // Section-based choreography
      // 0.00 - 0.18: HERO (center-right on desktop, center on mobile, large scale)
      // 0.18 - 0.38: ABOUT (shifted right, rotated, giving room to editorial text)
      // 0.38 - 0.60: SKILLS (shifted left, angled, displaying cage geometry)
      // 0.60 - 0.85: PROJECTS (subtle, recessed, lower opacity/scale)
      // 0.85 - 1.00: CONTACT (centered bottom, elevated glow)

      let targetX = 1.3;
      let targetY = 0.0;
      let targetZ = 0.5;
      let targetScale = 1.05;

      if (isMobile) {
        targetX = 0;
        targetY = 0.6;
        targetScale = 0.68;
      } else {
        if (progress < 0.18) {
          // Hero
          const t = progress / 0.18;
          targetX = 1.4 - t * 0.2;
          targetY = 0.1 - t * 0.2;
          targetScale = 1.05 - t * 0.05;
        } else if (progress < 0.40) {
          // About
          const t = (progress - 0.18) / 0.22;
          targetX = 1.2 + t * 0.6;
          targetY = -0.1 - t * 0.3;
          targetScale = 1.0 - t * 0.15;
        } else if (progress < 0.65) {
          // Skills
          const t = (progress - 0.40) / 0.25;
          targetX = 1.8 - t * 3.4; // slides to left: -1.6
          targetY = -0.4 + t * 0.3;
          targetScale = 0.85;
        } else if (progress < 0.88) {
          // Projects
          const t = (progress - 0.65) / 0.23;
          targetX = -1.6 + t * 1.6;
          targetY = -0.1 - t * 0.4;
          targetScale = 0.75 - t * 0.1;
        } else {
          // Contact
          targetX = 0;
          targetY = -0.2;
          targetScale = 0.95;
        }
      }

      return { targetX, targetY, targetZ, targetScale, progress };
    };

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Scroll interpolation
      const { targetX, targetY, targetScale, progress } = getScrollTargets();

      sculptureGroup.position.x += (targetX - sculptureGroup.position.x) * 0.06;
      sculptureGroup.position.y += (targetY - sculptureGroup.position.y) * 0.06;

      const currentScale = sculptureGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.06;
      sculptureGroup.scale.set(newScale, newScale, newScale);

      // Rotation choreography: base idle + scroll evolution + mouse tilt
      if (!prefersReducedMotion) {
        coreMesh.rotation.x = elapsedTime * 0.22 + progress * Math.PI * 2.5 + currentMouseY * 0.3;
        coreMesh.rotation.y = elapsedTime * 0.31 + progress * Math.PI * 3.0 + currentMouseX * 0.3;

        outerMesh.rotation.x = -elapsedTime * 0.15 + progress * Math.PI;
        outerMesh.rotation.y = elapsedTime * 0.18 + progress * Math.PI * 1.5;

        particleSystem.rotation.y = elapsedTime * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};
