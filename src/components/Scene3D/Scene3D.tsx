import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Scene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Architectural Armillary Kinetic Installation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Monolithic Core: Smoked Graphite Octahedron
    const coreGeo = new THREE.OctahedronGeometry(0.9, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x121217,
      emissive: 0x080611,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // 2. Core Wireframe Shell: Accentuated architectural edges
    const coreWireGeo = new THREE.OctahedronGeometry(0.905, 0);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x8769fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeo, coreWireMat);
    masterGroup.add(coreWireMesh);

    // 3. Precision Coordinate Meridians (3 Interlocking Gimbal Rings)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x42414a,
      roughness: 0.35,
      metalness: 0.85,
    });
    const ringAccentMat = new THREE.MeshStandardMaterial({
      color: 0x8769fe,
      roughness: 0.25,
      metalness: 0.9,
    });

    // Equator Ring
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.018, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    masterGroup.add(ring1);

    // Meridian Ring
    const ring2Geo = new THREE.TorusGeometry(2.1, 0.016, 16, 100);
    const ring2 = new THREE.Mesh(ring2Geo, ringAccentMat);
    ring2.rotation.x = Math.PI / 2;
    masterGroup.add(ring2);

    // Oblique Ring
    const ring3Geo = new THREE.TorusGeometry(2.35, 0.014, 16, 100);
    const ring3 = new THREE.Mesh(ring3Geo, ringMat);
    ring3.rotation.y = Math.PI / 3;
    masterGroup.add(ring3);

    // 4. Subtle Celestial Constellation Lattice (Sparse mathematical points)
    const pointCount = 42;
    const pointPositions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.6 + Math.random() * 0.5;
      pointPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pointPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pointPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0xc4b5fd,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
    });
    const pointCloud = new THREE.Points(pointsGeo, pointsMat);
    masterGroup.add(pointCloud);

    // Lighting Design: Sculptural Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x181820, 1.4);
    scene.add(ambientLight);

    // Focused Warm Iris Rim
    const rimLight = new THREE.DirectionalLight(0x8769fe, 3.2);
    rimLight.position.set(5, 4, 3);
    scene.add(rimLight);

    // Deep graphite counter-light
    const counterLight = new THREE.DirectionalLight(0x282635, 1.8);
    counterLight.position.set(-5, -3, -2);
    scene.add(counterLight);

    // Soft specular highlight
    const specLight = new THREE.PointLight(0xffffff, 1.5, 12);
    specLight.position.set(1, 3, 4);
    scene.add(specLight);

    // Mouse Tracking with Inertial Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Scroll Storytelling Choreography
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Scroll progress
      const scrollY = window.scrollY;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(scrollY / docHeight, 0), 1);

      // Positioning: Instead of dominating right side, it sits like an editorial background artifact
      const isMobile = window.innerWidth < 820;

      let targetX = 1.1;
      let targetY = 0.2;
      let targetScale = 0.95;

      if (isMobile) {
        targetX = 0;
        targetY = 0.8;
        targetScale = 0.65;
      } else {
        // Desktop choreography
        // Hero: Slightly offset to the right, behind the editorial text
        if (scrollProgress < 0.2) {
          const t = scrollProgress / 0.2;
          targetX = 1.2 - t * 0.2;
          targetY = 0.15 - t * 0.1;
          targetScale = 0.95 - t * 0.1;
        } else if (scrollProgress < 0.45) {
          // About: Moves subtly towards center-right, exposing the intricate core
          const t = (scrollProgress - 0.2) / 0.25;
          targetX = 1.0 + t * 0.3;
          targetY = 0.05 - t * 0.15;
          targetScale = 0.85;
        } else if (scrollProgress < 0.75) {
          // Skills & Work: Slides slightly left, recessing into depth so technical content is crisp
          const t = (scrollProgress - 0.45) / 0.3;
          targetX = 1.3 - t * 2.2; // softly drifts towards -0.9
          targetY = -0.1 + t * 0.2;
          targetScale = 0.78;
        } else {
          // Contact: Centered and quiet
          targetX = 0.1;
          targetY = 0.0;
          targetScale = 0.88;
        }
      }

      // Smoothly interpolate position and scale
      masterGroup.position.x += (targetX - masterGroup.position.x) * 0.05;
      masterGroup.position.y += (targetY - masterGroup.position.y) * 0.05;

      const currentScale = masterGroup.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.05;
      masterGroup.scale.set(nextScale, nextScale, nextScale);

      // Gyroscopic kinetic rotations
      if (!prefersReducedMotion) {
        // Core slowly turns
        coreMesh.rotation.y = elapsed * 0.18 + scrollProgress * Math.PI * 1.5;
        coreMesh.rotation.x = elapsed * 0.12;
        coreWireMesh.rotation.y = coreMesh.rotation.y;
        coreWireMesh.rotation.x = coreMesh.rotation.x;

        // Gimbal rings rotate at differential harmonic speeds
        ring1.rotation.z = elapsed * 0.09 + scrollProgress * Math.PI * 0.8 + mouseY * 0.2;
        ring2.rotation.x = Math.PI / 2 + elapsed * 0.14 + mouseX * 0.2;
        ring3.rotation.y = Math.PI / 3 - elapsed * 0.11 + scrollProgress * Math.PI * 1.2;

        // Constellation lattice
        pointCloud.rotation.y = elapsed * 0.04;

        // Whole installation tilts with mouse
        masterGroup.rotation.x = mouseY * 0.25;
        masterGroup.rotation.y = mouseX * 0.25;
      }

      renderer.render(scene, camera);
    };

    render();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      coreWireGeo.dispose();
      coreWireMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ringMat.dispose();
      ringAccentMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
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
        overflow: 'hidden',
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
};
