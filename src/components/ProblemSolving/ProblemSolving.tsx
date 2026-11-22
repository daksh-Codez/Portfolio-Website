import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../SectionLabel/SectionLabel';

export const ProblemSolving: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOrbitalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleOrbitalMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="problem-solving"
      ref={sectionRef}
      className={`problem-solving-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Problem Solving & Programming Challenges"
    >
      <div className="editorial-container">
        {/* Centralized Dynamic Section Label */}
        <SectionLabel id="problem-solving" />

        <div className="problem-solving-grid">
          {/* Left Column: Editorial Narrative & Organic Orbital Profile Showcase */}
          <div className="problem-solving-content">
            <h2 className="problem-solving-heading">
              Beyond the build,{' '}
              <span className="serif-italic-accent">into the problem.</span>
            </h2>

            <p className="problem-solving-description">
              I enjoy exploring programming challenges, strengthening logical thinking,
              and finding structured approaches to solving problems. Every challenge is
              another opportunity to learn, improve, and think differently.
            </p>

            {/* Organic Orbital Profile Composition (Asymmetrical curved geometry) */}
            <div
              className="orbital-profile-showcase"
              onMouseMove={handleOrbitalMouseMove}
              onMouseLeave={handleOrbitalMouseLeave}
            >
              {/* Overlapping Curved Orbital Geometry Layer (Extends beyond the main shape) */}
              <div
                className="orbital-geometric-canvas"
                style={{
                  transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0) rotate(${mousePos.x * 2.5}deg)`,
                }}
                aria-hidden="true"
              >
                <svg
                  className="orbital-contour-svg"
                  viewBox="0 0 520 340"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="orbitalRingStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(167, 139, 250, 0)" />
                      <stop offset="25%" stopColor="rgba(167, 139, 250, 0.4)" />
                      <stop offset="50%" stopColor="rgba(255, 255, 255, 0.85)" />
                      <stop offset="75%" stopColor="rgba(167, 139, 250, 0.4)" />
                      <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
                    </linearGradient>

                    <linearGradient id="counterRingStroke" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                      <stop offset="40%" stopColor="rgba(167, 139, 250, 0.22)" />
                      <stop offset="70%" stopColor="rgba(255, 255, 255, 0.45)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>

                    <radialGradient id="orbitalCoreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(139, 92, 246, 0.25)" />
                      <stop offset="50%" stopColor="rgba(109, 40, 217, 0.08)" />
                      <stop offset="100%" stopColor="rgba(4, 4, 7, 0)" />
                    </radialGradient>

                    <filter id="luminousGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Soft Atmospheric Elliptical Aura */}
                  <ellipse cx="250" cy="170" rx="210" ry="110" fill="url(#orbitalCoreGlow)" />

                  {/* Outer Branching Orbital Curve (Extending visually past the silhouette) */}
                  <path
                    d="M 30,195 C 70,60 380,20 485,130 C 530,175 490,270 370,295 C 230,320 80,280 30,195 Z"
                    stroke="url(#orbitalRingStroke)"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                    className="orbital-ring-drift"
                  />

                  {/* Inner Counter-Orbital Trajectory */}
                  <ellipse
                    cx="260"
                    cy="165"
                    rx="190"
                    ry="88"
                    stroke="url(#counterRingStroke)"
                    strokeWidth="0.8"
                    transform="rotate(-9 260 165)"
                  />

                  {/* Fine Tangent Ray */}
                  <line
                    x1="120"
                    y1="60"
                    x2="410"
                    y2="280"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeDasharray="2 4"
                  />

                  {/* Luminous Point along the Orbital Path */}
                  <g className="orbital-luminous-node" transform="translate(425, 102)">
                    <circle cx="0" cy="0" r="12" fill="rgba(167, 139, 250, 0.2)" className="luminous-halo-pulse" />
                    <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" filter="url(#luminousGlow)" />
                    <circle cx="0" cy="0" r="1.4" fill="#C4B5FD" />
                  </g>
                </svg>
              </div>

              {/* Asymmetrical Organic Body Vessel */}
              <div className="orbital-organic-vessel">
                {/* Profile Eyebrow Row */}
                <div className="orbital-meta-row">
                  <span className="profile-badge-eyebrow">PROBLEM-SOLVING PROFILE</span>
                  <div className="orbital-signal-beacon">
                    <span className="beacon-core" />
                  </div>
                </div>

                {/* Primary Typographic Focus: LOGIC & DSA */}
                <div className="orbital-focus-row">
                  <h3 className="orbital-focus-title">LOGIC &amp; DSA</h3>
                </div>

                {/* Refined Identity & Organic CTA Row */}
                <div className="orbital-action-row">
                  {/* Refined Profile Identity */}
                  <div className="orbital-profile-identity">
                    <span className="identity-platform">Codolio</span>
                    <span className="identity-divider">/</span>
                    <span className="identity-handle">@dakshCodez</span>
                  </div>

                  {/* Curved Interactive CTA Link */}
                  <a
                    href="https://codolio.com/profile/DakshCodez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="orbital-curved-cta"
                    aria-label="Explore my profile on Codolio (opens in a new tab)"
                  >
                    <span className="curved-cta-text">Explore my profile</span>
                    <ArrowUpRight size={15} className="curved-cta-arrow" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Algorithmic Logic & Node Graph Motif */}
          <div className="problem-solving-visual-col" aria-hidden="true">
            <div className="logic-graph-container">
              {/* Ambient Radial Backdrop Glow */}
              <div className="logic-ambient-glow" />

              <svg
                className="logic-graph-svg"
                viewBox="0 0 520 380"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Subtle Node Halo Gradient */}
                  <radialGradient id="nodeHaloGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(167, 139, 250, 0.45)" />
                    <stop offset="60%" stopColor="rgba(139, 92, 246, 0.12)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                  </radialGradient>

                  {/* Solved Nexus Halo Gradient */}
                  <radialGradient id="solvedHaloGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                    <stop offset="40%" stopColor="rgba(167, 139, 250, 0.4)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                  </radialGradient>

                  {/* Path Linear Gradient (Primary Solution Branch) */}
                  <linearGradient id="solutionPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(167, 139, 250, 0.3)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
                    <stop offset="100%" stopColor="rgba(167, 139, 250, 0.85)" />
                  </linearGradient>

                  {/* Traveling Pulse Gradient */}
                  <linearGradient id="travelPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
                  </linearGradient>

                  {/* Soft Glow Filter */}
                  <filter id="logicNodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle Telemetry Grid Markers */}
                <g className="graph-telemetry-layer" opacity="0.38">
                  <line x1="40" y1="40" x2="480" y2="40" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="3 6" />
                  <line x1="40" y1="190" x2="480" y2="190" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="3 6" />
                  <line x1="40" y1="340" x2="480" y2="340" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="3 6" />
                  <text x="44" y="32" fill="rgba(167, 139, 250, 0.55)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
                    GRAPH SEARCH / OPTIMAL TRAVERSAL
                  </text>
                  <text x="44" y="358" fill="rgba(255, 255, 255, 0.3)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.12em">
                    T[n] = O(log n) · STATE SPACE EVAL
                  </text>
                </g>

                {/* Secondary Inactive Search Branches (Faint) */}
                <g className="graph-secondary-branches">
                  {/* Branch A: Root -> Left child -> Leaf */}
                  <path d="M 110,190 Q 150,110 210,100" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 210,100 Q 270,70 330,80" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 210,100 Q 250,140 290,150" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Branch C: Mid -> Lower exploration */}
                  <path d="M 240,220 Q 300,290 350,300" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 350,300 Q 400,320 440,310" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" strokeDasharray="3 3" />
                </g>

                {/* Primary Optimal Path (Illuminated Logic Flow) */}
                <g className="graph-optimal-branch">
                  {/* Base glowing line */}
                  <path
                    d="M 110,190 C 160,200 190,220 240,220 C 300,220 330,160 380,160 C 420,160 440,180 470,185"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.28)"
                    strokeWidth="5"
                    filter="url(#logicNodeGlow)"
                  />
                  {/* Core sharp line */}
                  <path
                    className="optimal-path-line"
                    d="M 110,190 C 160,200 190,220 240,220 C 300,220 330,160 380,160 C 420,160 440,180 470,185"
                    fill="none"
                    stroke="url(#solutionPathGrad)"
                    strokeWidth="1.6"
                  />
                  {/* Animated Logic Pulse Stream */}
                  <path
                    className="optimal-path-pulse"
                    d="M 110,190 C 160,200 190,220 240,220 C 300,220 330,160 380,160 C 420,160 440,180 470,185"
                    fill="none"
                    stroke="url(#travelPulseGrad)"
                    strokeWidth="2.2"
                  />
                </g>

                {/* Graph Nodes (Exploration Space) */}
                <g className="graph-nodes-layer">
                  {/* Secondary Node A1 (210, 100) */}
                  <g transform="translate(210, 100)">
                    <circle cx="0" cy="0" r="4" fill="#0A0B12" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1" />
                    <circle cx="0" cy="0" r="1.5" fill="rgba(255, 255, 255, 0.4)" />
                  </g>

                  {/* Secondary Node A2 (330, 80) */}
                  <g transform="translate(330, 80)">
                    <circle cx="0" cy="0" r="3.5" fill="#0A0B12" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
                  </g>

                  {/* Secondary Node A3 (290, 150) */}
                  <g transform="translate(290, 150)">
                    <circle cx="0" cy="0" r="3.5" fill="#0A0B12" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
                  </g>

                  {/* Secondary Node C1 (350, 300) */}
                  <g transform="translate(350, 300)">
                    <circle cx="0" cy="0" r="4" fill="#0A0B12" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                  </g>

                  {/* Secondary Node C2 (440, 310) */}
                  <g transform="translate(440, 310)">
                    <circle cx="0" cy="0" r="3.5" fill="#0A0B12" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                  </g>

                  {/* PRIMARY NODE 1: PROBLEM ROOT (110, 190) */}
                  <g className="primary-logic-node node-root" transform="translate(110, 190)">
                    <circle cx="0" cy="0" r="18" fill="url(#nodeHaloGrad)" className="node-halo-breathe" />
                    <circle cx="0" cy="0" r="6" fill="#090A11" stroke="rgba(167, 139, 250, 0.85)" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
                    <text x="-4" y="-12" fill="rgba(167, 139, 250, 0.65)" fontSize="7.5" fontFamily="var(--font-mono)">INPUT</text>
                  </g>

                  {/* PRIMARY NODE 2: INTERMEDIATE RESOLVER (240, 220) */}
                  <g className="primary-logic-node node-mid1" transform="translate(240, 220)">
                    <circle cx="0" cy="0" r="14" fill="url(#nodeHaloGrad)" className="node-halo-breathe" />
                    <circle cx="0" cy="0" r="5" fill="#090A11" stroke="rgba(167, 139, 250, 0.75)" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
                    <text x="-12" y="18" fill="rgba(255, 255, 255, 0.45)" fontSize="7.5" fontFamily="var(--font-mono)">PIVOT</text>
                  </g>

                  {/* PRIMARY NODE 3: OPTIMAL CHECKPOINT (380, 160) */}
                  <g className="primary-logic-node node-mid2" transform="translate(380, 160)">
                    <circle cx="0" cy="0" r="16" fill="url(#nodeHaloGrad)" className="node-halo-breathe" />
                    <circle cx="0" cy="0" r="5.5" fill="#090A11" stroke="rgba(167, 139, 250, 0.85)" strokeWidth="1.4" />
                    <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
                    <text x="-10" y="-12" fill="rgba(255, 255, 255, 0.5)" fontSize="7.5" fontFamily="var(--font-mono)">BRANCH</text>
                  </g>

                  {/* PRIMARY NODE 4: RESOLVED NEXUS (470, 185) */}
                  <g className="primary-logic-node node-nexus" transform="translate(470, 185)">
                    <circle cx="0" cy="0" r="24" fill="url(#solvedHaloGrad)" className="nexus-halo-pulse" />
                    <circle cx="0" cy="0" r="7" fill="#090A11" stroke="#FFFFFF" strokeWidth="1.8" />
                    <circle cx="0" cy="0" r="3" fill="#A78BFA" />
                    <text x="-18" y="22" fill="#C4B5FD" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em">
                      RESOLVED
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* -----------------------------------------------------------------
         * SECTION BASE & SPACING
         * --------------------------------------------------------------- */
        .problem-solving-section {
          position: relative;
          z-index: 2;
          padding: clamp(70px, 9vw, 110px) 0;
          background: transparent;
          overflow: hidden;
        }

        .problem-solving-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 72px);
          align-items: center;
        }

        @media (min-width: 960px) {
          .problem-solving-grid {
            grid-template-columns: 1.12fr 0.88fr;
          }
        }

        /* -----------------------------------------------------------------
         * EDITORIAL CONTENT & TYPOGRAPHY
         * --------------------------------------------------------------- */
        .problem-solving-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 620px;
        }

        .problem-solving-heading {
          font-family: var(--font-body);
          font-size: clamp(2.2rem, 4.2vw, 3.8rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s,
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
        }

        .serif-italic-accent {
          font-family: var(--font-serif);
          font-weight: 400;
          font-style: italic;
          color: #FFFFFF;
          display: inline-block;
          background: linear-gradient(135deg, #FFFFFF 0%, #D8B4FE 55%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(167, 139, 250, 0.35));
        }

        .problem-solving-description {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.25vw, 1.15rem);
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.22s,
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
        }

        /* -----------------------------------------------------------------
         * ORGANIC ORBITAL PROFILE VESSEL (NON-CARD, FLUID GEOMETRY)
         * --------------------------------------------------------------- */
        .orbital-profile-showcase {
          position: relative;
          margin-top: 14px;
          padding: 10px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s,
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
        }

        /* Floating Animation of the Organic Object */
        .problem-solving-section.is-visible .orbital-profile-showcase {
          opacity: 1;
          transform: translateY(0);
          animation: organicOrbitalFloat 7s ease-in-out infinite alternate;
        }

        @keyframes organicOrbitalFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(0.35deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        /* Overlapping Curved Orbital Geometry Layer */
        .orbital-geometric-canvas {
          position: absolute;
          inset: -15% -12%;
          pointer-events: none;
          z-index: 1;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .orbital-contour-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .orbital-ring-drift {
          animation: ringDashDrift 28s linear infinite;
        }

        @keyframes ringDashDrift {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 200;
          }
        }

        .luminous-halo-pulse {
          animation: luminousPointPulse 3s ease-in-out infinite alternate;
        }

        @keyframes luminousPointPulse {
          0% {
            transform: scale(0.85);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.3);
            opacity: 0.85;
          }
        }

        /* Asymmetrical Organic Translucent Vessel Body */
        .orbital-organic-vessel {
          position: relative;
          z-index: 2;
          padding: clamp(26px, 4vw, 34px) clamp(28px, 4.5vw, 38px);
          /* Fluid asymmetrical silhouette: not a rectangle or card */
          border-radius: 44px 92px 42px 78px / 62px 48px 84px 52px;
          background: radial-gradient(
            ellipse at 32% 24%,
            rgba(167, 139, 250, 0.11) 0%,
            rgba(15, 12, 28, 0.48) 55%,
            rgba(5, 5, 10, 0.28) 100%
          );
          border: 1px solid rgba(167, 139, 250, 0.26);
          box-shadow: 0 10px 36px rgba(0, 0, 0, 0.28),
                      inset 0 1px 0 rgba(255, 255, 255, 0.12),
                      0 0 24px rgba(139, 92, 246, 0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition: border-color 0.3s ease,
                      box-shadow 0.3s ease,
                      background 0.3s ease;
        }

        .orbital-profile-showcase:hover .orbital-organic-vessel {
          border-color: rgba(167, 139, 250, 0.55);
          box-shadow: 0 14px 44px rgba(139, 92, 246, 0.24),
                      inset 0 1px 0 rgba(255, 255, 255, 0.18),
                      0 0 32px rgba(167, 139, 250, 0.2);
          background: radial-gradient(
            ellipse at 32% 24%,
            rgba(167, 139, 250, 0.16) 0%,
            rgba(18, 14, 34, 0.55) 55%,
            rgba(7, 7, 13, 0.34) 100%
          );
        }

        /* Eyebrow & Status Row */
        .orbital-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .profile-badge-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-purple-light);
        }

        .orbital-signal-beacon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
        }

        .beacon-core {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #A78BFA;
          box-shadow: 0 0 10px #A78BFA, 0 0 4px #FFFFFF;
          animation: beaconPulse 2.8s ease-in-out infinite;
        }

        @keyframes beaconPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
            box-shadow: 0 0 14px #C4B5FD, 0 0 6px #FFFFFF;
          }
        }

        /* Main Typographic Focus: LOGIC & DSA */
        .orbital-focus-row {
          margin: 4px 0 2px 0;
        }

        .orbital-focus-title {
          font-family: var(--font-body);
          font-size: clamp(1.85rem, 2.8vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.08;
          margin: 0;
          background: linear-gradient(135deg, #FFFFFF 0%, #E2D9F8 45%, #C4B5FD 75%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 24px rgba(167, 139, 250, 0.35));
        }

        /* Identity & CTA Row */
        .orbital-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .orbital-profile-identity {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
        }

        .identity-platform {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }

        .identity-divider {
          color: rgba(255, 255, 255, 0.25);
          font-family: var(--font-mono);
          font-size: 0.82rem;
        }

        .identity-handle {
          font-family: var(--font-mono);
          font-size: 0.84rem;
          color: var(--accent-purple-light);
          letter-spacing: 0.02em;
        }

        /* Curved, Fluid Interactive CTA */
        .orbital-curved-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 22px;
          /* Asymmetrical curved silhouette for button */
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(139, 92, 246, 0.16) 100%);
          border: 1px solid rgba(167, 139, 250, 0.36);
          color: #FFFFFF;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(139, 92, 246, 0.16),
                      inset 0 1px 0 rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s ease,
                      background 0.25s ease;
          width: fit-content;
        }

        .orbital-curved-cta:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(139, 92, 246, 0.3) 100%);
          border-color: rgba(167, 139, 250, 0.75);
          box-shadow: 0 6px 26px rgba(139, 92, 246, 0.38),
                      inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .curved-cta-arrow {
          color: var(--accent-purple-light);
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
        }

        .orbital-curved-cta:hover .curved-cta-arrow {
          transform: translate(2px, -2px);
          color: #FFFFFF;
        }

        .orbital-curved-cta:focus-visible {
          outline: 2px solid var(--accent-purple-light);
          outline-offset: 4px;
        }

        /* -----------------------------------------------------------------
         * ALGORITHMIC VISUAL MOTIF & ANIMATED GRAPH
         * --------------------------------------------------------------- */
        .problem-solving-visual-col {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          opacity: 0;
          transform: translateY(24px) scale(0.97);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s,
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }

        .logic-graph-container {
          position: relative;
          width: 100%;
          max-width: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logic-ambient-glow {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 60% 50%, rgba(139, 92, 246, 0.14) 0%, rgba(109, 40, 217, 0.04) 50%, transparent 75%);
          pointer-events: none;
          border-radius: 50%;
        }

        .logic-graph-svg {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
        }

        .optimal-path-pulse {
          stroke-dasharray: 60 320;
          animation: optimalPathPulseRun 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes optimalPathPulseRun {
          0% {
            stroke-dashoffset: 380;
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -380;
            opacity: 0.3;
          }
        }

        .node-halo-breathe {
          animation: nodeHaloBreathe 4s ease-in-out infinite alternate;
        }

        @keyframes nodeHaloBreathe {
          0% {
            opacity: 0.45;
            transform: scale(0.92);
          }
          100% {
            opacity: 0.85;
            transform: scale(1.1);
          }
        }

        .nexus-halo-pulse {
          animation: nexusHaloPulse 3s ease-in-out infinite alternate;
        }

        @keyframes nexusHaloPulse {
          0% {
            opacity: 0.5;
            transform: scale(0.88);
          }
          100% {
            opacity: 0.95;
            transform: scale(1.15);
          }
        }

        /* -----------------------------------------------------------------
         * SCROLL REVEAL ACTIVATION
         * --------------------------------------------------------------- */
        .problem-solving-section.is-visible .problem-solving-heading,
        .problem-solving-section.is-visible .problem-solving-description,
        .problem-solving-section.is-visible .orbital-profile-showcase {
          opacity: 1;
          transform: translateY(0);
        }

        .problem-solving-section.is-visible .problem-solving-visual-col {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* -----------------------------------------------------------------
         * RESPONSIVENESS & REDUCED MOTION
         * --------------------------------------------------------------- */
        @media (max-width: 680px) {
          .orbital-organic-vessel {
            border-radius: 36px 64px 34px 54px;
            padding: 22px 20px;
          }

          .orbital-action-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .orbital-curved-cta {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .problem-solving-heading,
          .problem-solving-description,
          .orbital-profile-showcase,
          .problem-solving-visual-col {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }

          .orbital-geometric-canvas {
            transform: none !important;
            transition: none !important;
          }

          .optimal-path-pulse,
          .node-halo-breathe,
          .nexus-halo-pulse,
          .beacon-core,
          .orbital-ring-drift,
          .luminous-halo-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};
