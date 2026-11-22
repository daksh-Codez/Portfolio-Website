import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../SectionLabel/SectionLabel';

interface MilestoneItem {
  number: string;
  phase: string;
  title: string;
  description: string;
}

const CANONICAL_MILESTONES: MilestoneItem[] = [
  {
    number: '01',
    phase: 'FOUNDATIONS',
    title: 'Building the fundamentals.',
    description:
      'Deepening my understanding of C and C++, memory, data structures and programming logic.',
  },
  {
    number: '02',
    phase: 'PROBLEM SOLVING',
    title: 'Thinking through code.',
    description:
      'Practising algorithmic challenges, exploring STL and improving problem-solving approaches.',
  },
  {
    number: '03',
    phase: 'ENGINEERING WORKFLOW',
    title: 'Working with better processes.',
    description:
      'Developing consistent habits around Git, GitHub, version control and documentation.',
  },
  {
    number: '04',
    phase: 'EXPERIMENTATION',
    title: 'Exploring AI in development.',
    description:
      'Experimenting with AI tools and practical workflows that support software creation.',
  },
];

export const CurrentFocus: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [isNextMilestoneInView, setIsNextMilestoneInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const nextMilestoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const milestoneEl = nextMilestoneRef.current;
    if (!milestoneEl) return;
    const milestoneObserver = new IntersectionObserver(
      ([entry]) => {
        setIsNextMilestoneInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasArrived(true);
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -40px 0px' }
    );
    milestoneObserver.observe(milestoneEl);
    return () => milestoneObserver.disconnect();
  }, []);

  return (
    <section
      id="focus"
      ref={sectionRef}
      className={`trajectory-cinematic-section ${isInView ? 'in-view' : ''}`}
      aria-label="Trajectory and Learning Journey"
    >
      {/* Anchor alias so #trajectory also works */}
      <span id="trajectory" className="trajectory-anchor-alias" aria-hidden="true" />

      {/* Atmospheric Background Layer: Grid & Orbital Rings */}
      <div className="trajectory-atmosphere-layer" aria-hidden="true">
        <svg
          className="atmosphere-svg"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fine Faint Background Grid */}
            <pattern
              id="trajectory-fine-grid"
              width="54"
              height="54"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 54 0 L 0 0 0 54"
                fill="none"
                stroke="rgba(255, 255, 255, 0.022)"
                strokeWidth="1"
              />
            </pattern>

            {/* Path Linear Gradient */}
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(167, 139, 250, 0.15)" />
              <stop offset="20%" stopColor="rgba(167, 139, 250, 0.85)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="80%" stopColor="rgba(167, 139, 250, 0.85)" />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0.2)" />
            </linearGradient>

            {/* Glowing Halo Gradient for Nodes */}
            <radialGradient id="nodeHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(167, 139, 250, 0.6)" />
              <stop offset="40%" stopColor="rgba(139, 92, 246, 0.25)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </radialGradient>

            {/* Filter for Path Soft Glow */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid overlay */}
          <rect width="100%" height="100%" fill="url(#trajectory-fine-grid)" />

          {/* Delicate Orbital Ellipses */}
          <ellipse
            cx="50%"
            cy="46%"
            rx="580"
            ry="180"
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeDasharray="4 8"
          />
          <ellipse
            cx="54%"
            cy="42%"
            rx="440"
            ry="130"
            fill="none"
            stroke="rgba(139, 92, 246, 0.045)"
            strokeDasharray="3 6"
            transform="rotate(-5 600 200)"
          />
        </svg>

        {/* Large, Low-Opacity Coding Symbol near Upper-Right */}
        <div className="atmospheric-code-glyph" aria-hidden="true">
          &lt; / &gt;
        </div>
      </div>

      <div className="editorial-container trajectory-inner-container">
        {/* ================================================================= */}
        {/* SECTION INTRODUCTION (Upper Left)                                 */}
        {/* ================================================================= */}
        <div className="trajectory-header">
          <SectionLabel id="trajectory" />

          <div className="trajectory-header-flow">
            <h2 className="trajectory-heading">
              Learning in{' '}
              <span className="serif-motion-accent">motion.</span>
            </h2>
            <p className="trajectory-lead">
              What I'm developing now, and where I'm heading next.
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* THE LEARNING JOURNEY — Organic Curved Illuminated Path            */}
        {/* ================================================================= */}
        <div
          className={`learning-journey-stage ${
            activeMilestone !== null ? 'has-active' : ''
          } ${isNextMilestoneInView ? 'timeline-receding' : ''}`}
        >
          {/* DESKTOP CURVED SVG CANVAS */}
          <div className="journey-desktop-canvas" aria-hidden="true">
            <svg
              className="journey-curve-svg"
              viewBox="0 0 1200 440"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glowing Ambient Path Behind */}
              <path
                d="M 40,300 C 100,290 130,270 160,265 C 270,245 330,145 450,145 C 570,145 630,290 750,290 C 870,290 930,135 1040,135 C 1090,135 1130,150 1160,155"
                fill="none"
                stroke="rgba(139, 92, 246, 0.28)"
                strokeWidth="6"
                filter="url(#softGlow)"
              />

              {/* Core Precision Illuminated Path (Animates in on scroll) */}
              <path
                className="animated-journey-path"
                d="M 40,300 C 100,290 130,270 160,265 C 270,245 330,145 450,145 C 570,145 630,290 750,290 C 870,290 930,135 1040,135 C 1090,135 1130,150 1160,155"
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="1.5"
                pathLength="1"
              />

              {/* Vertical Guide Hairlines connecting nodes to text */}
              {/* M1: Node (160, 265) -> text above ends at 245 */}
              <line
                x1="160"
                y1="265"
                x2="160"
                y2="242"
                stroke="rgba(167, 139, 250, 0.25)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* M2: Node (450, 145) -> text below starts at 170 */}
              <line
                x1="450"
                y1="145"
                x2="450"
                y2="172"
                stroke="rgba(167, 139, 250, 0.25)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* M3: Node (750, 290) -> text above ends at 268 */}
              <line
                x1="750"
                y1="290"
                x2="750"
                y2="265"
                stroke="rgba(167, 139, 250, 0.25)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* M4: Node (1040, 135) -> text below starts at 162 */}
              <line
                x1="1040"
                y1="135"
                x2="1040"
                y2="162"
                stroke="rgba(167, 139, 250, 0.25)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Milestone 1 Node: (160, 265) */}
              <g className="milestone-svg-node" transform="translate(160, 265)">
                <circle cx="0" cy="0" r="16" fill="url(#nodeHalo)" className="breathing-halo" />
                <circle cx="0" cy="0" r="5" fill="#040407" stroke="rgba(167, 139, 250, 0.85)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
              </g>

              {/* Milestone 2 Node: (450, 145) */}
              <g className="milestone-svg-node" transform="translate(450, 145)">
                <circle cx="0" cy="0" r="16" fill="url(#nodeHalo)" className="breathing-halo" />
                <circle cx="0" cy="0" r="5" fill="#040407" stroke="rgba(167, 139, 250, 0.85)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
              </g>

              {/* Milestone 3 Node: (750, 290) */}
              <g className="milestone-svg-node" transform="translate(750, 290)">
                <circle cx="0" cy="0" r="16" fill="url(#nodeHalo)" className="breathing-halo" />
                <circle cx="0" cy="0" r="5" fill="#040407" stroke="rgba(167, 139, 250, 0.85)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
              </g>

              {/* Milestone 4 Node: (1040, 135) */}
              <g className="milestone-svg-node" transform="translate(1040, 135)">
                <circle cx="0" cy="0" r="16" fill="url(#nodeHalo)" className="breathing-halo" />
                <circle cx="0" cy="0" r="5" fill="#040407" stroke="rgba(167, 139, 250, 0.85)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
              </g>
            </svg>
          </div>

          {/* MILESTONE TYPOGRAPHY ITEMS (Unboxed, Pure Typography) */}
          <div className="milestones-typography-container">
            {CANONICAL_MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 1; // 0, 2 above curve; 1, 3 below curve
              return (
                <div
                  key={item.number}
                  className={`milestone-block milestone-idx-${idx} ${
                    isEven ? 'position-below' : 'position-above'
                  } ${activeMilestone === idx ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveMilestone(idx)}
                  onMouseLeave={() => setActiveMilestone(null)}
                >
                  {/* Mobile Only: Node marker */}
                  <div className="mobile-node-marker" aria-hidden="true">
                    <span className="mobile-node-halo" />
                    <span className="mobile-node-core" />
                  </div>

                  <div className="milestone-meta-row">
                    <span className="milestone-eyebrow">
                      MILESTONE {item.number} / {item.phase}
                    </span>
                  </div>

                  <h3 className="milestone-title">{item.title}</h3>

                  <p className="milestone-description">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* SUBTLE HORIZONTAL SEPARATOR                                       */}
        {/* ================================================================= */}
        <div className="trajectory-divider-line" aria-hidden="true" />

        {/* ================================================================= */}
        {/* THE NEXT MILESTONE (Concluding Composition)                       */}
        {/* ================================================================= */}
        <div
          ref={nextMilestoneRef}
          className={`next-milestone-stage ${hasArrived ? 'is-arrived' : ''}`}
        >
          {/* Left Column: Heading, Narrative & CTA */}
          <div className="next-milestone-content">
            <span className="next-milestone-eyebrow">THE NEXT MILESTONE</span>

            <h3 className="next-milestone-heading">
              <span className="milestone-reveal-word word-1">An</span>{' '}
              <span className="milestone-reveal-word word-2">industry</span>{' '}
              <span className="milestone-reveal-word word-3 milestone-internship-accent">
                internship.
              </span>
            </h3>

            <p className="next-milestone-description">
              Ready to take what I'm learning beyond personal projects, contribute to
              real-world engineering work and learn from experienced teams.
            </p>

            <a
              href="https://www.linkedin.com/in/daksh-goswami-3008d"
              target="_blank"
              rel="noopener noreferrer"
              className="next-milestone-cta-link"
              aria-label="Open to conversations and opportunities - visit Daksh Goswami's LinkedIn profile (opens in a new tab)"
            >
              <span className="cta-link-text">Open to conversations and opportunities</span>
              <ArrowUpRight size={16} className="cta-arrow-icon" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Cinematic Planetary Horizon with Human Silhouette */}
          <div className="next-milestone-visual-wrap" aria-hidden="true">
            {/* Atmospheric Ambient Aura */}
            <div className="horizon-ambient-aura" />

            <div className="next-milestone-visual">
              <svg
                className="planetary-horizon-svg"
                viewBox="0 0 440 240"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Horizon Glow Blur Filter */}
                  <filter id="horizonGlow" x="-20%" y="-40%" width="140%" height="180%">
                    <feGaussianBlur stdDeviation="6" result="blur1" />
                    <feGaussianBlur stdDeviation="2" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Horizon Gradient Stroke */}
                  <linearGradient id="horizonRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(167, 139, 250, 0)" />
                    <stop offset="25%" stopColor="rgba(167, 139, 250, 0.45)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                    <stop offset="75%" stopColor="rgba(167, 139, 250, 0.45)" />
                    <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
                  </linearGradient>

                  {/* Horizon Traveling Light Glint Gradient */}
                  <linearGradient id="horizonGlintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="35%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.98)" />
                    <stop offset="65%" stopColor="rgba(167, 139, 250, 0.85)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </linearGradient>

                  {/* Atmospheric Haze Gradient */}
                  <radialGradient id="skyHaze" cx="50%" cy="100%" r="80%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.24)" />
                    <stop offset="50%" stopColor="rgba(109, 40, 217, 0.08)" />
                    <stop offset="100%" stopColor="rgba(4, 4, 7, 0)" />
                  </radialGradient>

                  {/* Planet Body Dark Fill */}
                  <linearGradient id="planetBody" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#07070c" />
                    <stop offset="100%" stopColor="#030305" />
                  </linearGradient>

                  {/* Tiny Specular Glow for Human Footing */}
                  <radialGradient id="footSpec" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </radialGradient>
                </defs>

                {/* Deep Sky Stardust Particles */}
                <g className="space-stardust">
                  <circle cx="68" cy="48" r="0.9" fill="#FFFFFF" opacity="0.4" />
                  <circle cx="120" cy="85" r="1.2" fill="#A78BFA" opacity="0.6" />
                  <circle cx="178" cy="35" r="0.8" fill="#FFFFFF" opacity="0.5" />
                  <circle cx="270" cy="62" r="1.1" fill="#FFFFFF" opacity="0.7" />
                  <circle cx="340" cy="40" r="0.8" fill="#A78BFA" opacity="0.45" />
                  <circle cx="388" cy="92" r="1.3" fill="#FFFFFF" opacity="0.55" />
                  <circle cx="82" cy="120" r="0.7" fill="#FFFFFF" opacity="0.35" />
                  <circle cx="310" cy="115" r="0.9" fill="#A78BFA" opacity="0.4" />
                </g>

                {/* Faint Distant Constellation Line */}
                <line
                  x1="120"
                  y1="85"
                  x2="178"
                  y2="35"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                />
                <line
                  x1="178"
                  y1="35"
                  x2="270"
                  y2="62"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                />

                {/* Atmospheric Glow above the Curve */}
                <ellipse
                  className="horizon-haze-ellipse"
                  cx="220"
                  cy="172"
                  rx="180"
                  ry="55"
                  fill="url(#skyHaze)"
                />

                {/* Dark Planet Body */}
                <path
                  d="M -10,240 C 95,168 345,168 450,240 L 450,240 L -10,240 Z"
                  fill="url(#planetBody)"
                />

                {/* Glowing Rim Curve of the Planetary Horizon */}
                <path
                  className="horizon-rim-base"
                  d="M -10,240 C 95,168 345,168 450,240"
                  fill="none"
                  stroke="url(#horizonRimGrad)"
                  strokeWidth="1.8"
                  filter="url(#horizonGlow)"
                />

                {/* Subtle Traveling Light Glint along the Horizon */}
                <path
                  className="horizon-rim-glint"
                  d="M -10,240 C 95,168 345,168 450,240"
                  fill="none"
                  stroke="url(#horizonGlintGrad)"
                  strokeWidth="2.2"
                  filter="url(#horizonGlow)"
                />

                {/* Tiny Specular Glow at apex where human stands */}
                <ellipse cx="220" cy="168" rx="7" ry="1.8" fill="url(#footSpec)" className="horizon-foot-spec" />

                {/* Tiny Human Silhouette standing at the apex (x=220, y=168) */}
                <g className="horizon-silhouette" transform="translate(0, 0)">
                  {/* Head */}
                  <circle cx="220" cy="148" r="2.2" fill="#F8FAFC" />

                  {/* Torso & Shoulders */}
                  <path
                    d="M 218.8,150.8 L 221.2,150.8 L 221.6,158.8 L 218.4,158.8 Z"
                    fill="#F8FAFC"
                  />

                  {/* Left Arm relaxed, Right Arm slightly forward */}
                  <line x1="218.6" y1="151.6" x2="217.6" y2="157" stroke="#F8FAFC" strokeWidth="0.8" strokeLinecap="round" />
                  <line x1="221.4" y1="151.6" x2="223.2" y2="155.5" stroke="#F8FAFC" strokeWidth="0.8" strokeLinecap="round" />

                  {/* Legs standing firmly on the illuminated curve */}
                  <line x1="219.2" y1="158.8" x2="218.7" y2="167.8" stroke="#F8FAFC" strokeWidth="1.1" strokeLinecap="round" />
                  <line x1="220.8" y1="158.8" x2="221.3" y2="167.8" stroke="#F8FAFC" strokeWidth="1.1" strokeLinecap="round" />
                </g>

                {/* Subdued Telemetry Coordinates */}
                <text
                  x="220"
                  y="218"
                  textAnchor="middle"
                  fill="rgba(167, 139, 250, 0.4)"
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.18em"
                >
                  DESTINATION: PRODUCTION SYSTEMS
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCOPED COMPONENT STYLES                                           */}
      {/* ================================================================= */}
      <style>{`
        /* -----------------------------------------------------------------
         * SECTION BASE & ATMOSPHERE
         * --------------------------------------------------------------- */
        .trajectory-cinematic-section {
          position: relative;
          z-index: 2;
          padding-top: clamp(80px, 12vw, 150px);
          padding-bottom: clamp(80px, 12vw, 150px);
          background-color: var(--bg-primary);
          overflow: hidden;
        }

        .trajectory-anchor-alias {
          position: absolute;
          top: 0;
          left: 0;
          height: 1px;
          width: 1px;
          pointer-events: none;
        }

        .trajectory-atmosphere-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .atmosphere-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .atmospheric-code-glyph {
          position: absolute;
          top: 60px;
          right: clamp(20px, 6vw, 80px);
          font-family: var(--font-mono);
          font-size: clamp(4.5rem, 8.5vw, 8rem);
          font-weight: 200;
          color: var(--accent-purple-light);
          opacity: 0.038;
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
        }

        .trajectory-inner-container {
          position: relative;
          z-index: 1;
        }

        /* -----------------------------------------------------------------
         * SECTION HEADER
         * --------------------------------------------------------------- */
        .trajectory-header {
          margin-bottom: clamp(48px, 7vw, 76px);
        }

        .trajectory-header-flow {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          gap: 24px;
        }

        .trajectory-heading {
          font-family: var(--font-body);
          font-size: clamp(2.3rem, 4.6vw, 3.8rem);
          line-height: 1.1;
          font-weight: 500;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin: 0;
        }

        .serif-motion-accent {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          color: var(--accent-purple-light);
          opacity: 0.88;
        }

        .trajectory-lead {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.18vw, 1.12rem);
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 440px;
          margin: 0;
        }

        /* -----------------------------------------------------------------
         * LEARNING JOURNEY STAGE (Curved Path + 4 Milestones)
         * ---------------------------------------------------------------- */
        .learning-journey-stage {
          position: relative;
          min-height: clamp(440px, 48vw, 500px);
          margin-bottom: clamp(60px, 8vw, 96px);
        }

        .journey-desktop-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .journey-curve-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Animate SVG Path Stroke on Scroll Entry */
        .animated-journey-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 1.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .trajectory-cinematic-section.in-view .animated-journey-path {
          stroke-dashoffset: 0;
        }

        /* Node Breathing Glow Animation */
        .breathing-halo {
          animation: breathingHalo 3.6s ease-in-out infinite;
        }

        @keyframes breathingHalo {
          0%, 100% {
            r: 14;
            opacity: 0.55;
          }
          50% {
            r: 20;
            opacity: 0.9;
          }
        }

        /* -----------------------------------------------------------------
         * MILESTONES TYPOGRAPHY CONTAINER (DESKTOP)
         * ---------------------------------------------------------------- */
        .milestones-typography-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: clamp(440px, 48vw, 500px);
        }

        /* Desktop Positioning: Staggered and Alternating */
        .milestone-block {
          position: absolute;
          width: clamp(210px, 22vw, 255px);
          cursor: default;
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Milestone 1: Node at (160/1200) = 13.3%, y=265 (60%). Text positioned ABOVE. */
        .milestone-idx-0 {
          left: calc(13.33% - 110px);
          bottom: calc(100% - 240px);
        }

        /* Milestone 2: Node at (450/1200) = 37.5%, y=145 (33%). Text positioned BELOW. */
        .milestone-idx-1 {
          left: calc(37.5% - 110px);
          top: 172px;
        }

        /* Milestone 3: Node at (750/1200) = 62.5%, y=290 (66%). Text positioned ABOVE. */
        .milestone-idx-2 {
          left: calc(62.5% - 110px);
          bottom: calc(100% - 265px);
        }

        /* Milestone 4: Node at (1040/1200) = 86.6%, y=135 (31%). Text positioned BELOW. */
        .milestone-idx-3 {
          left: calc(86.67% - 130px);
          top: 162px;
        }

        .mobile-node-marker {
          display: none;
        }

        .milestone-meta-row {
          margin-bottom: 8px;
        }

        .milestone-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .milestone-title {
          font-family: var(--font-body);
          font-size: clamp(1.15rem, 1.4vw, 1.35rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .milestone-description {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          transition: color 0.3s ease;
        }

        /* Interactive Focus state: Dim non-active, illuminate active */
        .learning-journey-stage.has-active .milestone-block:not(.is-active) {
          opacity: 0.35;
        }

        .milestone-block.is-active .milestone-title {
          color: #FFFFFF;
          text-shadow: 0 0 20px rgba(167, 139, 250, 0.45);
        }

        .milestone-block.is-active .milestone-description {
          color: var(--text-primary);
        }

        /* -----------------------------------------------------------------
         * PRECEDING TIMELINE TRANSITION (The Arrival Focus)
         * --------------------------------------------------------------- */
        .learning-journey-stage {
          position: relative;
          min-height: 440px;
          margin-bottom: clamp(60px, 8vw, 100px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .learning-journey-stage.timeline-receding {
          opacity: 0.42;
          filter: blur(0.4px);
        }

        .learning-journey-stage.timeline-receding:hover {
          opacity: 0.85;
          filter: none;
        }

        /* -----------------------------------------------------------------
         * SUBTLE HORIZONTAL SEPARATOR
         * --------------------------------------------------------------- */
        .trajectory-divider-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 20%,
            rgba(167, 139, 250, 0.25) 50%,
            rgba(255, 255, 255, 0.08) 80%,
            transparent 100%
          );
          margin-bottom: clamp(48px, 6vw, 72px);
          transition: opacity 1.2s ease;
        }

        /* -----------------------------------------------------------------
         * THE NEXT MILESTONE CONCLUDING COMPOSITION (CINEMATIC ARRIVAL)
         * --------------------------------------------------------------- */
        .next-milestone-stage {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(36px, 6vw, 64px);
          align-items: center;
          position: relative;
        }

        @media (min-width: 900px) {
          .next-milestone-stage {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }

        .next-milestone-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        /* 1. Eyebrow Reveal */
        .next-milestone-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.08s,
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
        }

        .next-milestone-stage.is-arrived .next-milestone-eyebrow {
          opacity: 1;
          transform: translateY(0);
        }

        /* 2. Headline & Words Staggered Reveal */
        .next-milestone-heading {
          font-family: var(--font-body);
          font-size: clamp(2.1rem, 4vw, 3.4rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin: 0;
          overflow: hidden;
        }

        .milestone-reveal-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(28px);
          will-change: transform, opacity;
        }

        .milestone-reveal-word.word-1 {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.18s,
                      opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.18s;
        }

        .milestone-reveal-word.word-2 {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.30s,
                      opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.30s;
        }

        .milestone-reveal-word.word-3 {
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.44s,
                      opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.44s;
        }

        .next-milestone-stage.is-arrived .milestone-reveal-word {
          opacity: 1;
          transform: translateY(0);
        }

        .milestone-internship-accent {
          background: linear-gradient(135deg, #FFFFFF 0%, #D8B4FE 45%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(167, 139, 250, 0.42));
        }

        /* 3. Description Narrative Reveal */
        .next-milestone-description {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.2vw, 1.12rem);
          color: var(--text-secondary);
          line-height: 1.68;
          max-width: 540px;
          margin: 0;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.58s,
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.58s;
        }

        .next-milestone-stage.is-arrived .next-milestone-description {
          opacity: 1;
          transform: translateY(0);
        }

        /* 4. Interactive Capsule CTA Link Reveal & Interactions */
        .next-milestone-cta-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 10px;
          padding: 13px 26px;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(167, 139, 250, 0.32);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25), 0 0 14px rgba(139, 92, 246, 0.08);
          font-family: var(--font-body);
          font-size: 0.94rem;
          font-weight: 600;
          color: #F8FAFC;
          text-decoration: none;
          width: fit-content;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.74s,
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.74s,
                      background 0.25s ease,
                      border-color 0.25s ease,
                      box-shadow 0.25s ease,
                      color 0.25s ease;
        }

        .next-milestone-stage.is-arrived .next-milestone-cta-link {
          opacity: 1;
          transform: translateY(0);
        }

        .next-milestone-cta-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(167, 139, 250, 0.22) 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .next-milestone-cta-link:hover {
          color: #FFFFFF;
          transform: translateY(-2px);
          border-color: rgba(167, 139, 250, 0.65);
          box-shadow: 0 6px 28px rgba(139, 92, 246, 0.3), 0 0 20px rgba(167, 139, 250, 0.22);
        }

        .next-milestone-cta-link:hover::before {
          opacity: 1;
        }

        .cta-link-text {
          position: relative;
          z-index: 1;
        }

        .cta-arrow-icon {
          position: relative;
          z-index: 1;
          color: var(--accent-purple-light);
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
        }

        .next-milestone-cta-link:hover .cta-arrow-icon {
          color: #FFFFFF;
          transform: translate(2px, -2px);
        }

        .next-milestone-cta-link:active {
          transform: translateY(0);
        }

        .next-milestone-cta-link:focus-visible {
          outline: 2px solid var(--accent-purple-light);
          outline-offset: 4px;
        }

        /* -----------------------------------------------------------------
         * PLANETARY HORIZON VISUAL & CELESTIAL ATMOSPHERE
         * --------------------------------------------------------------- */
        .next-milestone-visual-wrap {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateY(22px) scale(0.97);
          filter: blur(4px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.25s,
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.25s,
                      filter 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
        }

        .next-milestone-stage.is-arrived .next-milestone-visual-wrap {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .horizon-ambient-aura {
          position: absolute;
          width: 110%;
          height: 110%;
          top: -5%;
          left: -5%;
          background: radial-gradient(ellipse at 50% 68%, rgba(139, 92, 246, 0.16) 0%, rgba(109, 40, 217, 0.05) 50%, transparent 75%);
          pointer-events: none;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s,
                      transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
        }

        .next-milestone-stage.is-arrived .horizon-ambient-aura {
          opacity: 1;
          transform: scale(1);
        }

        .next-milestone-visual {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .planetary-horizon-svg {
          width: 100%;
          max-width: 440px;
          height: auto;
          display: block;
          overflow: visible;
        }

        /* Horizon Rim Subtle Light Movement */
        .horizon-rim-glint {
          stroke-dasharray: 90 380;
          animation: horizonGlintRun 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          opacity: 0.85;
        }

        @keyframes horizonGlintRun {
          0% {
            stroke-dashoffset: 470;
          }
          100% {
            stroke-dashoffset: -470;
          }
        }

        /* Atmospheric Haze Breathing */
        .horizon-haze-ellipse {
          transform-origin: 220px 172px;
          animation: horizonHazeBreathe 6.5s ease-in-out infinite alternate;
        }

        @keyframes horizonHazeBreathe {
          0% {
            opacity: 0.6;
            transform: scaleY(0.96);
          }
          100% {
            opacity: 0.95;
            transform: scaleY(1.06);
          }
        }

        /* Footing Specular Pulse */
        .horizon-foot-spec {
          animation: footPulse 3.5s ease-in-out infinite alternate;
        }

        @keyframes footPulse {
          0% {
            opacity: 0.55;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        /* Human Silhouette Entrance */
        .horizon-silhouette {
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s,
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
        }

        .next-milestone-stage.is-arrived .horizon-silhouette {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stardust Pulse */
        .space-stardust {
          animation: stardustTwinkle 5s ease-in-out infinite alternate;
        }

        @keyframes stardustTwinkle {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.85;
          }
          100% {
            opacity: 0.6;
          }
        }

        /* -----------------------------------------------------------------
         * RESPONSIVE BEHAVIOR (MOBILE & TABLET)
         * --------------------------------------------------------------- */
        @media (max-width: 859px) {
          .journey-desktop-canvas {
            display: none;
          }

          .learning-journey-stage {
            min-height: auto;
            margin-bottom: 48px;
          }

          .milestones-typography-container {
            position: relative;
            min-height: auto;
            display: flex;
            flex-direction: column;
            gap: 36px;
            padding-left: 36px;
            border-left: 1px solid rgba(167, 139, 250, 0.25);
            margin-left: 14px;
          }

          .milestone-block {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            bottom: auto !important;
            width: 100% !important;
          }

          .mobile-node-marker {
            display: block;
            position: absolute;
            left: -43px;
            top: 2px;
            width: 14px;
            height: 14px;
          }

          .mobile-node-halo {
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%);
            animation: breathingHalo 3.6s ease-in-out infinite;
          }

          .mobile-node-core {
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            background: #FFFFFF;
            box-shadow: 0 0 8px #A78BFA;
          }

          .atmospheric-code-glyph {
            display: none;
          }

          .next-milestone-cta-link {
            width: 100%;
            font-size: 0.88rem;
            padding: 12px 20px;
          }
        }

        /* Respect Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .animated-journey-path,
          .breathing-halo,
          .mobile-node-halo,
          .horizon-rim-glint,
          .horizon-haze-ellipse,
          .horizon-foot-spec,
          .space-stardust {
            animation: none !important;
            transition: none !important;
            stroke-dashoffset: 0 !important;
          }

          .learning-journey-stage,
          .learning-journey-stage.timeline-receding {
            opacity: 1 !important;
            filter: none !important;
            transition: none !important;
          }

          .next-milestone-eyebrow,
          .milestone-reveal-word,
          .next-milestone-description,
          .next-milestone-cta-link,
          .next-milestone-visual-wrap,
          .horizon-ambient-aura,
          .horizon-silhouette {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
