import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { SkillRecord } from '../../types/database';
import { SectionLabel } from '../SectionLabel/SectionLabel';

interface TechMeta {
  name: string;
  category: 'systems' | 'web' | 'data' | 'tools';
  role: string;
  narrative: string;
  specs?: string[];
}

const CANONICAL_TECH_SHOWCASE: Record<string, TechMeta> = {
  c: {
    name: 'C',
    category: 'systems',
    role: 'Procedural Architecture',
    narrative:
      'Manual memory allocation, pointer arithmetic, struct memory layout, and direct hardware-adjacent programming.',
    specs: ['Pointers & Addresses', 'Stack vs. Heap', 'Struct Records', 'POSIX System Calls'],
  },
  'c++': {
    name: 'C++',
    category: 'systems',
    role: 'Object-Oriented Systems',
    narrative:
      'Object lifecycles, class hierarchies, Standard Template Library (STL) algorithms, and high-throughput computational logic.',
    specs: ['STL Containers', 'Classes & Inheritance', 'Memory Control', 'Algorithmic Efficiency'],
  },
  cpp: {
    name: 'C++',
    category: 'systems',
    role: 'Object-Oriented Systems',
    narrative:
      'Object lifecycles, class hierarchies, Standard Template Library (STL) algorithms, and high-throughput computational logic.',
    specs: ['STL Containers', 'Classes & Inheritance', 'Memory Control', 'Algorithmic Efficiency'],
  },
  python: {
    name: 'Python',
    category: 'systems',
    role: 'Scripting & Automation',
    narrative:
      'Rapid automation pipelines, algorithmic scripting, data manipulation, and modern computational toolchains.',
    specs: ['Automation Scripts', 'Data Structures', 'Algorithmic Logic', 'AI Tooling Workflows'],
  },
  html: {
    name: 'HTML',
    category: 'web',
    role: 'Semantic Structure',
    narrative:
      'Accessible document architecture, semantic HTML5 elements, and modern DOM hierarchy standards.',
    specs: ['Semantic Hierarchy', 'Document DOM', 'Accessibility (a11y)', 'Standards Compliance'],
  },
  css: {
    name: 'CSS',
    category: 'web',
    role: 'Layout & Styling Systems',
    narrative:
      'Modern responsive layout geometry, CSS Grid, Flexbox architectures, custom properties, and fluid typography.',
    specs: ['CSS Grid & Flexbox', 'Fluid Typography', 'Custom Properties', 'Responsive Breakpoints'],
  },
  javascript: {
    name: 'JavaScript',
    category: 'web',
    role: 'Client Runtime & Logic',
    narrative:
      'Modern ES6+ syntax, asynchronous event-driven flows, DOM manipulation, and responsive interactive web interfaces.',
    specs: ['ES6+ Syntactic Patterns', 'Promises & Async/Await', 'Event Loop & DOM', 'Client State Flow'],
  },
  js: {
    name: 'JavaScript',
    category: 'web',
    role: 'Client Runtime & Logic',
    narrative:
      'Modern ES6+ syntax, asynchronous event-driven flows, DOM manipulation, and responsive interactive web interfaces.',
    specs: ['ES6+ Syntactic Patterns', 'Promises & Async/Await', 'Event Loop & DOM', 'Client State Flow'],
  },
  sql: {
    name: 'SQL',
    category: 'data',
    role: 'Relational Data Architecture',
    narrative:
      'Declarative querying, relational schema modeling, multi-table joins, and data integrity constraints.',
    specs: ['Relational Schema Design', 'Multi-table Joins', 'Aggregation & Filtering', 'Primary & Foreign Keys'],
  },
  git: {
    name: 'Git',
    category: 'tools',
    role: 'Distributed Versioning',
    narrative:
      'Distributed repository management, branching models, commit history tracking, and merge conflict resolution.',
    specs: ['Branch Workflows', 'Commit Atomic Records', 'Rebase & Merge', 'Diff Inspection'],
  },
  github: {
    name: 'GitHub',
    category: 'tools',
    role: 'Remote Collaboration',
    narrative:
      'Remote repository synchronization, code review processes, project documentation, and open-source practices.',
    specs: ['Remote Repositories', 'Pull Request Reviews', 'Issue Tracking', 'Open-Source Hygiene'],
  },
  'visual studio code': {
    name: 'Visual Studio Code',
    category: 'tools',
    role: 'Primary Development Environment',
    narrative:
      'Configured workspace toolchain with integrated C/C++ build suites, terminal sessions, and developer debugging tools.',
    specs: ['Compiler Suites', 'Debug Tooling', 'Workspace Configurations', 'Extension Ecosystem'],
  },
  'vs code': {
    name: 'Visual Studio Code',
    category: 'tools',
    role: 'Primary Development Environment',
    narrative:
      'Configured workspace toolchain with integrated C/C++ build suites, terminal sessions, and developer debugging tools.',
    specs: ['Compiler Suites', 'Debug Tooling', 'Workspace Configurations', 'Extension Ecosystem'],
  },
  vscode: {
    name: 'Visual Studio Code',
    category: 'tools',
    role: 'Primary Development Environment',
    narrative:
      'Configured workspace toolchain with integrated C/C++ build suites, terminal sessions, and developer debugging tools.',
    specs: ['Compiler Suites', 'Debug Tooling', 'Workspace Configurations', 'Extension Ecosystem'],
  },
};

export const Skills: React.FC = () => {
  const { skillsList } = usePortfolioData();
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 30 });
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Harmonize CMS skills with Canonical Showcase
  const publishedSkills = (skillsList || [])
    .filter((s) => s.status === 'published')
    .slice()
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  // Determine if there are extra CMS skills outside the core set
  const coreCanonicalKeys = new Set([
    'c',
    'c++',
    'cpp',
    'python',
    'html',
    'css',
    'javascript',
    'js',
    'sql',
    'git',
    'github',
    'visual studio code',
    'vs code',
    'vscode',
  ]);

  const additionalSkills = publishedSkills.filter(
    (s) => !coreCanonicalKeys.has(s.name.trim().toLowerCase())
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`capabilities-editorial-section ${isInView ? 'in-view' : ''}`}
      style={
        {
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`,
        } as React.CSSProperties
      }
    >
      {/* Ambient Atmospheric Lighting Overlay */}
      <div className="capabilities-ambient-glow" aria-hidden="true" />

      <div className="editorial-container">
        {/* Section Identifier */}
        <SectionLabel id="skills" />

        {/* Section Header: Fluid Editorial Typography */}
        <div className="capabilities-editorial-header">
          <div className="header-headline-wrap">
            <h2 className="capabilities-editorial-title">
              Tools of my{' '}
              <span className="capabilities-serif-accent">trade.</span>
            </h2>
          </div>
          <div className="header-lead-wrap">
            <p className="capabilities-editorial-lead">
              A growing collection of programming languages, technologies, and development tools I've explored and applied through coursework, experiments, and personal projects.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FLUID TECHNOLOGY SHOWCASE — ASYMMETRICAL, UNBOXED EDITORIAL COMPOSITION   */}
        {/* ========================================================================= */}
        <div className={`showcase-fluid-canvas ${activeTech ? 'has-active' : ''}`}>

          {/* ----------------------------------------------------------------------- */}
          {/* ACT 1: SYSTEMS FOUNDATIONS — Monumental Architectural Scale            */}
          {/* ----------------------------------------------------------------------- */}
          <div className="fluid-act fluid-act-systems">
            <div className="fluid-act-header">
              <span className="fluid-act-eyebrow">PROGRAMMING &amp; CORE SYSTEMS</span>
              <span className="fluid-act-divider" />
            </div>

            <div className="systems-sculpture-grid">
              {/* Primary Dual Monument: C & C++ */}
              <div className="systems-monument-pair">
                {/* Technology: C */}
                <div
                  className={`tech-monument-block tech-c ${
                    activeTech === 'c' ? 'is-focused' : ''
                  }`}
                  onMouseEnter={() => setActiveTech('c')}
                  onMouseLeave={() => setActiveTech(null)}
                >
                  <div className="monument-title-line">
                    <span className="monument-display-name">C</span>
                    <span className="monument-role-flag">PROCEDURAL MEMORY</span>
                  </div>
                  <p className="monument-narrative">
                    Structured memory allocation, raw pointer arithmetic, struct memory alignment, and low-level system call interfaces.
                  </p>
                  <div className="monument-specs-row">
                    <span>Pointers</span>
                    <span className="spec-dot" />
                    <span>Stack &amp; Heap</span>
                    <span className="spec-dot" />
                    <span>POSIX APIs</span>
                  </div>
                </div>

                {/* Vertical Subtle Dividing Hairline */}
                <div className="monument-hairline-separator" aria-hidden="true" />

                {/* Technology: C++ */}
                <div
                  className={`tech-monument-block tech-cpp ${
                    activeTech === 'c++' ? 'is-focused' : ''
                  }`}
                  onMouseEnter={() => setActiveTech('c++')}
                  onMouseLeave={() => setActiveTech(null)}
                >
                  <div className="monument-title-line">
                    <span className="monument-display-name">C++</span>
                    <span className="monument-role-flag">OBJECT-ORIENTED</span>
                  </div>
                  <p className="monument-narrative">
                    Abstract data types, STL algorithmic containers, object lifecycle management, and high-efficiency systems architecture.
                  </p>
                  <div className="monument-specs-row">
                    <span>STL Containers</span>
                    <span className="spec-dot" />
                    <span>Classes &amp; OOP</span>
                    <span className="spec-dot" />
                    <span>Memory Semantics</span>
                  </div>
                </div>
              </div>

              {/* Companion Anchor: Python (Asymmetric Offset) */}
              <div
                className={`tech-offset-block tech-python ${
                  activeTech === 'python' ? 'is-focused' : ''
                }`}
                onMouseEnter={() => setActiveTech('python')}
                onMouseLeave={() => setActiveTech(null)}
              >
                <div className="offset-header-group">
                  <div className="offset-name-row">
                    <span className="offset-display-name">Python</span>
                    <span className="offset-role-tag">SCRIPTING &amp; COMPUTATION</span>
                  </div>
                  <p className="offset-narrative">
                    Rapid automation pipelines, file processing, computational algorithms, and exploration of modern AI tooling.
                  </p>
                </div>
                <div className="offset-specs-tags">
                  <span className="micro-tag">Automation</span>
                  <span className="micro-tag">Algorithms</span>
                  <span className="micro-tag">Data Logic</span>
                  <span className="micro-tag">AI Workflows</span>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* ACT 2: TWO FLUID CURRENTS — Web Architecture & Relational Database     */}
          {/* ----------------------------------------------------------------------- */}
          <div className="fluid-act fluid-act-dual">

            {/* Stream A: Web Development Continuum (Asymmetrical Left Stream) */}
            <div className="fluid-substream substream-web">
              <div className="fluid-act-header">
                <span className="fluid-act-eyebrow">WEB ARCHITECTURE</span>
                <span className="fluid-act-divider" />
              </div>

              <div className="web-constellation">
                {/* JavaScript: Anchor of Web Logic */}
                <div
                  className={`web-anchor-item ${
                    activeTech === 'javascript' ? 'is-focused' : ''
                  }`}
                  onMouseEnter={() => setActiveTech('javascript')}
                  onMouseLeave={() => setActiveTech(null)}
                >
                  <div className="web-title-row">
                    <span className="web-primary-name">JavaScript</span>
                    <span className="web-role-caption">ES6+ &amp; Client Logic</span>
                  </div>
                  <p className="web-narrative">
                    Modern ES6+ syntax, asynchronous event loop, DOM manipulation, and dynamic state-driven interface patterns.
                  </p>
                  <div className="web-inline-traits">
                    <span>Promises &amp; Async</span>
                    <span className="spec-dot" />
                    <span>Event Architecture</span>
                    <span className="spec-dot" />
                    <span>DOM Manipulation</span>
                  </div>
                </div>

                {/* HTML & CSS: Harmonic Foundation Duo */}
                <div className="web-foundations-duo">
                  {/* HTML */}
                  <div
                    className={`web-subitem ${
                      activeTech === 'html' ? 'is-focused' : ''
                    }`}
                    onMouseEnter={() => setActiveTech('html')}
                    onMouseLeave={() => setActiveTech(null)}
                  >
                    <div className="subitem-title-row">
                      <span className="subitem-name">HTML</span>
                      <span className="subitem-role">Semantic Markup</span>
                    </div>
                    <p className="subitem-narrative">
                      Accessible document structures, semantic DOM elements, and modern web standards.
                    </p>
                  </div>

                  {/* CSS */}
                  <div
                    className={`web-subitem ${
                      activeTech === 'css' ? 'is-focused' : ''
                    }`}
                    onMouseEnter={() => setActiveTech('css')}
                    onMouseLeave={() => setActiveTech(null)}
                  >
                    <div className="subitem-title-row">
                      <span className="subitem-name">CSS</span>
                      <span className="subitem-role">Layout &amp; Styling</span>
                    </div>
                    <p className="subitem-narrative">
                      Responsive styling systems, CSS Grid geometry, Flexbox flows, and fluid typographic scales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stream B: Database Stature (Asymmetrical Right Stream) */}
            <div className="fluid-substream substream-db">
              <div className="fluid-act-header">
                <span className="fluid-act-eyebrow">RELATIONAL DATA</span>
                <span className="fluid-act-divider" />
              </div>

              <div
                className={`database-sculpture ${
                  activeTech === 'sql' ? 'is-focused' : ''
                }`}
                onMouseEnter={() => setActiveTech('sql')}
                onMouseLeave={() => setActiveTech(null)}
              >
                <div className="db-headline-cluster">
                  <span className="db-monument-name">SQL</span>
                  <div className="db-meta-badge">RELATIONAL QUERIES &amp; SCHEMAS</div>
                </div>

                <p className="db-narrative">
                  Structured declarative queries, multi-table joins, relational schema design, indexing, and strict integrity constraints.
                </p>

                <div className="db-telemetry-cluster">
                  <div className="db-telemetry-entry">
                    <span className="telemetry-key">PARADIGM</span>
                    <span className="telemetry-val">Relational Schema &amp; Normalization</span>
                  </div>
                  <div className="db-telemetry-entry">
                    <span className="telemetry-key">QUERYING</span>
                    <span className="telemetry-val">Joins, Aggregations &amp; Subqueries</span>
                  </div>
                  <div className="db-telemetry-entry">
                    <span className="telemetry-key">INTEGRITY</span>
                    <span className="telemetry-val">Primary Keys, Foreign Keys &amp; Indexing</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* ACT 3: DEVELOPER ENVIRONMENT & TOOLCHAIN RUNWAY                        */}
          {/* ----------------------------------------------------------------------- */}
          <div className="fluid-act fluid-act-tools">
            <div className="fluid-act-header">
              <span className="fluid-act-eyebrow">DEVELOPER ENVIRONMENT &amp; TOOLING</span>
              <span className="fluid-act-divider" />
            </div>

            <div className="tools-horizon-runway">
              {/* Tool 1: Git */}
              <div
                className={`tool-station ${
                  activeTech === 'git' ? 'is-focused' : ''
                }`}
                onMouseEnter={() => setActiveTech('git')}
                onMouseLeave={() => setActiveTech(null)}
              >
                <div className="tool-title-row">
                  <span className="tool-name">Git</span>
                  <span className="tool-role-whisper">Version Control</span>
                </div>
                <p className="tool-narrative">
                  Local repository tracking, branching architectures, atomic commit discipline, and clean history management.
                </p>
                <span className="tool-micro-metric">Branching &amp; History</span>
              </div>

              {/* Tool 2: GitHub */}
              <div
                className={`tool-station ${
                  activeTech === 'github' ? 'is-focused' : ''
                }`}
                onMouseEnter={() => setActiveTech('github')}
                onMouseLeave={() => setActiveTech(null)}
              >
                <div className="tool-title-row">
                  <span className="tool-name">GitHub</span>
                  <span className="tool-role-whisper">Collaboration</span>
                </div>
                <p className="tool-narrative">
                  Remote repository hosting, pull request review cycles, documentation, and open-source contribution practices.
                </p>
                <span className="tool-micro-metric">Remote Repos &amp; Review</span>
              </div>

              {/* Tool 3: Visual Studio Code */}
              <div
                className={`tool-station ${
                  activeTech === 'vs-code' ? 'is-focused' : ''
                }`}
                onMouseEnter={() => setActiveTech('vs-code')}
                onMouseLeave={() => setActiveTech(null)}
              >
                <div className="tool-title-row">
                  <span className="tool-name">Visual Studio Code</span>
                  <span className="tool-role-whisper">Primary IDE</span>
                </div>
                <p className="tool-narrative">
                  Engineered workspace environment configured with C/C++ compilation suites, debugging tools, and custom toolchains.
                </p>
                <span className="tool-micro-metric">Compilers &amp; Toolchains</span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SUPPLEMENTARY CMS SKILLS (Graceful integration if added in dashboard)    */}
          {/* ----------------------------------------------------------------------- */}
          {additionalSkills.length > 0 && (
            <div className="fluid-act fluid-act-additional">
              <div className="fluid-act-header">
                <span className="fluid-act-eyebrow">EXPANDED CAPABILITIES</span>
                <span className="fluid-act-divider" />
              </div>
              <div className="additional-skills-stream">
                {additionalSkills.map((skill) => (
                  <div key={skill.id || skill.name} className="additional-tech-item">
                    <span className="additional-tech-name">{skill.name}</span>
                    <span className="additional-tech-cat">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ========================================================================= */}
      {/* COMPONENT STYLES: FLUID, ASYMMETRICAL, UNBOXED EDITORIAL DESIGN           */}
      {/* ========================================================================= */}
      <style>{`
        /* -------------------------------------------------------------------------
         * SECTION CANVAS & AMBIENT ATMOSPHERE
         * ----------------------------------------------------------------------- */
        .capabilities-editorial-section {
          position: relative;
          z-index: 2;
          padding-top: clamp(90px, 12vw, 150px);
          padding-bottom: clamp(90px, 12vw, 150px);
          background-color: var(--bg-primary);
          overflow: hidden;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .capabilities-editorial-section.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ambient violet atmospheric illumination */
        .capabilities-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle 750px at var(--mouse-x, 50%) var(--mouse-y, 35%),
            rgba(139, 92, 246, 0.08) 0%,
            rgba(109, 40, 217, 0.03) 45%,
            transparent 75%
          );
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        /* -------------------------------------------------------------------------
         * EDITORIAL SECTION HEADER
         * ----------------------------------------------------------------------- */
        .capabilities-editorial-header {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 20px);
          margin-bottom: clamp(36px, 5vw, 56px);
          position: relative;
          z-index: 1;
        }

        .header-headline-wrap {
          width: 100%;
        }

        .header-lead-wrap {
          width: 100%;
          max-width: 600px;
        }

        .capabilities-editorial-title {
          font-family: var(--font-body);
          font-size: clamp(2.5rem, 7.2vw, 6.2rem);
          line-height: 1.04;
          font-weight: 600;
          letter-spacing: -0.035em;
          color: var(--text-primary);
          margin: 0;
          width: 100%;
        }

        .capabilities-serif-accent {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          color: var(--accent-purple-light);
          letter-spacing: -0.01em;
        }

        .capabilities-editorial-lead {
          font-family: var(--font-body);
          font-size: clamp(0.98rem, 1.12vw, 1.12rem);
          color: var(--text-secondary);
          line-height: 1.68;
          margin: 0;
          text-wrap: pretty;
        }

        /* -------------------------------------------------------------------------
         * FLUID SHOWCASE CANVAS
         * ----------------------------------------------------------------------- */
        .showcase-fluid-canvas {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(56px, 8vw, 96px);
        }

        /* Act Divider & Category Eyebrow */
        .fluid-act-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: clamp(24px, 3.5vw, 36px);
        }

        .fluid-act-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .fluid-act-divider {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.04) 50%,
            transparent 100%
          );
        }

        /* -------------------------------------------------------------------------
         * ACT 1: SYSTEMS FOUNDATIONS (MONUMENTAL SCALE)
         * ----------------------------------------------------------------------- */
        .systems-sculpture-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 56px);
          align-items: start;
        }

        @media (min-width: 960px) {
          .systems-sculpture-grid {
            grid-template-columns: 1.5fr 1fr;
          }
        }

        /* Dual Monument: C & C++ */
        .systems-monument-pair {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          position: relative;
        }

        @media (min-width: 640px) {
          .systems-monument-pair {
            grid-template-columns: 1fr auto 1fr;
            align-items: stretch;
            gap: 28px;
          }
        }

        .monument-hairline-separator {
          display: none;
        }

        @media (min-width: 640px) {
          .monument-hairline-separator {
            display: block;
            width: 1px;
            background: linear-gradient(
              180deg,
              transparent 0%,
              rgba(255, 255, 255, 0.12) 25%,
              rgba(139, 92, 246, 0.25) 50%,
              rgba(255, 255, 255, 0.12) 75%,
              transparent 100%
            );
          }
        }

        .tech-monument-block {
          position: relative;
          padding: 8px 12px;
          cursor: default;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s ease;
        }

        .monument-title-line {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }

        .monument-display-name {
          font-family: var(--font-body);
          font-size: clamp(3.8rem, 6.5vw, 5.8rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.05em;
          color: var(--text-primary);
          transition: color 0.35s ease, text-shadow 0.35s ease, transform 0.35s ease;
        }

        .monument-role-flag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .monument-narrative {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0 0 18px 0;
          transition: color 0.3s ease;
        }

        .monument-specs-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        .spec-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: var(--accent-purple);
          opacity: 0.6;
        }

        /* Companion Offset: Python */
        .tech-offset-block {
          position: relative;
          padding: 16px 20px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.025) 0%,
            rgba(139, 92, 246, 0.035) 100%
          );
          border-left: 2px solid rgba(139, 92, 246, 0.35);
          cursor: default;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      background-color 0.35s ease;
        }

        .offset-name-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 12px;
        }

        .offset-display-name {
          font-family: var(--font-body);
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          transition: color 0.35s ease, text-shadow 0.35s ease;
        }

        .offset-role-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .offset-narrative {
          font-family: var(--font-body);
          font-size: 0.94rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0 0 20px 0;
          transition: color 0.3s ease;
        }

        .offset-specs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .micro-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-secondary);
          padding: 3px 8px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 2px;
          transition: border-color 0.25s ease, color 0.25s ease;
        }

        /* -------------------------------------------------------------------------
         * ACT 2: TWO FLUID CURRENTS (WEB ARCHITECTURE & RELATIONAL DATABASE)
         * ----------------------------------------------------------------------- */
        .fluid-act-dual {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 80px);
        }

        @media (min-width: 960px) {
          .fluid-act-dual {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }

        /* Web Stream */
        .web-constellation {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .web-anchor-item {
          padding: 8px 12px;
          cursor: default;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .web-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 10px;
        }

        .web-primary-name {
          font-family: var(--font-body);
          font-size: clamp(2.3rem, 3.8vw, 3.4rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          transition: color 0.35s ease, text-shadow 0.35s ease;
        }

        .web-role-caption {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .web-narrative {
          font-family: var(--font-body);
          font-size: 0.94rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0 0 14px 0;
          transition: color 0.3s ease;
        }

        .web-inline-traits {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .web-foundations-duo {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          padding-top: 18px;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
        }

        @media (min-width: 600px) {
          .web-foundations-duo {
            grid-template-columns: 1fr 1fr;
          }
        }

        .web-subitem {
          padding: 6px 10px;
          cursor: default;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .subitem-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .subitem-name {
          font-family: var(--font-body);
          font-size: clamp(1.6rem, 2.4vw, 2.1rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          transition: color 0.35s ease, text-shadow 0.35s ease;
        }

        .subitem-role {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-purple-light);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .subitem-narrative {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          transition: color 0.3s ease;
        }

        /* Database Stream */
        .database-sculpture {
          padding: 8px 12px;
          cursor: default;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .db-headline-cluster {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 12px;
        }

        .db-monument-name {
          font-family: var(--font-body);
          font-size: clamp(3.2rem, 5.5vw, 5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.05em;
          color: var(--text-primary);
          transition: color 0.35s ease, text-shadow 0.35s ease;
        }

        .db-meta-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-purple-light);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .db-narrative {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0 0 24px 0;
          transition: color 0.3s ease;
        }

        /* Minimal pure typography telemetry */
        .db-telemetry-cluster {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .db-telemetry-entry {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 14px;
          font-family: var(--font-mono);
          font-size: 0.76rem;
        }

        .telemetry-key {
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        .telemetry-val {
          color: var(--text-primary);
          font-weight: 500;
          text-align: right;
        }

        /* -------------------------------------------------------------------------
         * ACT 3: DEVELOPER ENVIRONMENT & TOOLCHAIN RUNWAY
         * ----------------------------------------------------------------------- */
        .tools-horizon-runway {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 820px) {
          .tools-horizon-runway {
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(24px, 3.5vw, 44px);
          }
        }

        .tool-station {
          position: relative;
          padding: 8px 12px;
          cursor: default;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tool-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .tool-name {
          font-family: var(--font-body);
          font-size: clamp(1.6rem, 2.4vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          transition: color 0.35s ease, text-shadow 0.35s ease;
        }

        .tool-role-whisper {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-purple-light);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .tool-narrative {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 16px 0;
          transition: color 0.3s ease;
        }

        .tool-micro-metric {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        /* -------------------------------------------------------------------------
         * SUPPLEMENTARY CMS STREAM (For any extra dashboard-added items)
         * ----------------------------------------------------------------------- */
        .additional-skills-stream {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .additional-tech-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 2px;
        }

        .additional-tech-name {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .additional-tech-cat {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-purple-light);
        }

        /* -------------------------------------------------------------------------
         * REFINED INTERACTION & FOCUS STATES (Award-winning fluid feel)
         * ----------------------------------------------------------------------- */
        /* When any technology is hovered, other items soften opacity */
        .showcase-fluid-canvas.has-active .tech-monument-block:not(.is-focused),
        .showcase-fluid-canvas.has-active .tech-offset-block:not(.is-focused),
        .showcase-fluid-canvas.has-active .web-anchor-item:not(.is-focused),
        .showcase-fluid-canvas.has-active .web-subitem:not(.is-focused),
        .showcase-fluid-canvas.has-active .database-sculpture:not(.is-focused),
        .showcase-fluid-canvas.has-active .tool-station:not(.is-focused) {
          opacity: 0.36;
        }

        /* Focused Element Polish */
        .tech-monument-block.is-focused,
        .web-anchor-item.is-focused,
        .database-sculpture.is-focused,
        .tool-station.is-focused,
        .web-subitem.is-focused {
          opacity: 1;
          transform: translateX(4px);
        }

        .tech-offset-block.is-focused {
          opacity: 1;
          transform: translateY(-2px);
          border-left-color: var(--accent-purple-light);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(139, 92, 246, 0.08) 100%
          );
        }

        .tech-monument-block.is-focused .monument-display-name,
        .tech-offset-block.is-focused .offset-display-name,
        .web-anchor-item.is-focused .web-primary-name,
        .web-subitem.is-focused .subitem-name,
        .database-sculpture.is-focused .db-monument-name,
        .tool-station.is-focused .tool-name {
          color: #ffffff;
          text-shadow: 0 0 28px rgba(167, 139, 250, 0.45);
        }

        .tech-monument-block.is-focused .monument-narrative,
        .tech-offset-block.is-focused .offset-narrative,
        .web-anchor-item.is-focused .web-narrative,
        .web-subitem.is-focused .subitem-narrative,
        .database-sculpture.is-focused .db-narrative,
        .tool-station.is-focused .tool-narrative {
          color: var(--text-primary);
        }

        .tech-offset-block.is-focused .micro-tag {
          border-color: rgba(167, 139, 250, 0.4);
          color: var(--text-primary);
        }

        /* -------------------------------------------------------------------------
         * MOBILE INTENTIONALITY
         * ----------------------------------------------------------------------- */
        @media (max-width: 640px) {
          .capabilities-editorial-header {
            margin-bottom: 40px;
          }

          .showcase-fluid-canvas {
            gap: 48px;
          }

          .monument-display-name {
            font-size: 3.4rem;
          }

          .offset-display-name {
            font-size: 2.2rem;
          }

          .db-monument-name {
            font-size: 3rem;
          }

          .web-primary-name {
            font-size: 2.2rem;
          }

          .subitem-name,
          .tool-name {
            font-size: 1.65rem;
          }

          .db-telemetry-entry {
            flex-direction: column;
            gap: 4px;
          }

          .telemetry-val {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};
