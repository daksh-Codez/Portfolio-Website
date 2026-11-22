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
    role: 'PROCEDURAL MEMORY',
    narrative:
      'Structured memory allocation, raw pointer arithmetic, struct memory alignment, and low-level system call interfaces.',
    specs: ['Pointers', 'Stack & Heap', 'POSIX APIs'],
  },
  'c++': {
    name: 'C++',
    category: 'systems',
    role: 'OBJECT-ORIENTED',
    narrative:
      'Abstract data types, STL algorithmic containers, object lifecycle management, and high-efficiency systems architecture.',
    specs: ['STL Containers', 'Classes & OOP', 'Memory Semantics'],
  },
  cpp: {
    name: 'C++',
    category: 'systems',
    role: 'OBJECT-ORIENTED',
    narrative:
      'Abstract data types, STL algorithmic containers, object lifecycle management, and high-efficiency systems architecture.',
    specs: ['STL Containers', 'Classes & OOP', 'Memory Semantics'],
  },
  python: {
    name: 'Python',
    category: 'systems',
    role: 'SCRIPTING & COMPUTATION',
    narrative:
      'Rapid automation pipelines, file processing, computational algorithms, and exploration of modern AI tooling.',
    specs: ['Automation', 'Algorithms', 'Data Logic', 'AI Workflows'],
  },
  html: {
    name: 'HTML',
    category: 'web',
    role: 'Semantic Markup',
    narrative:
      'Accessible document structures, semantic DOM elements, and modern web standards.',
    specs: ['Semantic Hierarchy', 'Document DOM', 'Accessibility (a11y)', 'Standards Compliance'],
  },
  css: {
    name: 'CSS',
    category: 'web',
    role: 'Layout & Styling',
    narrative:
      'Responsive styling systems, CSS Grid geometry, Flexbox flows, and fluid typographic scales.',
    specs: ['CSS Grid & Flexbox', 'Fluid Typography', 'Custom Properties', 'Responsive Breakpoints'],
  },
  javascript: {
    name: 'JavaScript',
    category: 'web',
    role: 'ES6+ & Client Logic',
    narrative:
      'Modern ES6+ syntax, asynchronous event loop, DOM manipulation, and dynamic state-driven interface patterns.',
    specs: ['Promises & Async', 'Event Architecture', 'DOM Manipulation'],
  },
  js: {
    name: 'JavaScript',
    category: 'web',
    role: 'ES6+ & Client Logic',
    narrative:
      'Modern ES6+ syntax, asynchronous event loop, DOM manipulation, and dynamic state-driven interface patterns.',
    specs: ['Promises & Async', 'Event Architecture', 'DOM Manipulation'],
  },
  typescript: {
    name: 'TypeScript',
    category: 'web',
    role: 'Typed Client Systems',
    narrative:
      'Static typing, interface contracts, generic abstractions, and scalable application architectures.',
    specs: ['Static Typing', 'Generics & Enums', 'Type Inference', 'Compiler Tooling'],
  },
  ts: {
    name: 'TypeScript',
    category: 'web',
    role: 'Typed Client Systems',
    narrative:
      'Static typing, interface contracts, generic abstractions, and scalable application architectures.',
    specs: ['Static Typing', 'Generics & Enums', 'Type Inference', 'Compiler Tooling'],
  },
  react: {
    name: 'React',
    category: 'web',
    role: 'Component Architecture',
    narrative:
      'Declarative component hierarchies, custom hooks, virtual DOM reconciliation, and unidirectional state flows.',
    specs: ['Custom Hooks', 'Virtual DOM', 'State Management', 'Component Lifecycle'],
  },
  sql: {
    name: 'SQL',
    category: 'data',
    role: 'RELATIONAL QUERIES & SCHEMAS',
    narrative:
      'Structured declarative queries, multi-table joins, relational schema design, indexing, and strict integrity constraints.',
    specs: [
      'PARADIGM: Relational Schema & Normalization',
      'QUERYING: Joins, Aggregations & Subqueries',
      'INTEGRITY: Primary Keys, Foreign Keys & Indexing',
    ],
  },
  postgresql: {
    name: 'PostgreSQL',
    category: 'data',
    role: 'ADVANCED RELATIONAL DATA',
    narrative:
      'ACID transactional durability, complex multi-table joins, optimized indexing, and robust constraint modeling.',
    specs: [
      'PARADIGM: ACID Transactions',
      'QUERYING: Complex Joins & Views',
      'INTEGRITY: Constraints & B-Tree Indexes',
    ],
  },
  git: {
    name: 'Git',
    category: 'tools',
    role: 'Version Control',
    narrative:
      'Local repository tracking, branching architectures, atomic commit discipline, and clean history management.',
    specs: ['Branching & History'],
  },
  github: {
    name: 'GitHub',
    category: 'tools',
    role: 'Collaboration',
    narrative:
      'Remote repository hosting, pull request review cycles, documentation, and open-source contribution practices.',
    specs: ['Remote Repos & Review'],
  },
  'visual studio code': {
    name: 'Visual Studio Code',
    category: 'tools',
    role: 'Primary IDE',
    narrative:
      'Engineered workspace environment configured with C/C++ compilation suites, debugging tools, and custom toolchains.',
    specs: ['Compilers & Toolchains'],
  },
  'vs code': {
    name: 'Visual Studio Code',
    category: 'tools',
    role: 'Primary IDE',
    narrative:
      'Engineered workspace environment configured with C/C++ compilation suites, debugging tools, and custom toolchains.',
    specs: ['Compilers & Toolchains'],
  },
  vscode: {
    name: 'Visual Studio Code',
    category: 'tools',
    role: 'Primary IDE',
    narrative:
      'Engineered workspace environment configured with C/C++ compilation suites, debugging tools, and custom toolchains.',
    specs: ['Compilers & Toolchains'],
  },
};

const getTechMeta = (name: string, categoryName?: string): TechMeta => {
  const key = name.trim().toLowerCase();
  if (CANONICAL_TECH_SHOWCASE[key]) {
    return CANONICAL_TECH_SHOWCASE[key];
  }

  // Sensible adaptive fallback for newly added custom technologies
  const catLower = (categoryName || '').toLowerCase();
  let defaultRole = 'Engineering Competency';
  let defaultSpecs = ['Core Concepts', 'Hands-on Practice', 'Production Workflows'];

  if (catLower.includes('systems') || catLower.includes('programming')) {
    defaultRole = 'LANGUAGE & RUNTIME';
    defaultSpecs = ['Syntax & Paradigms', 'Data Structures', 'Algorithmic Logic'];
  } else if (catLower.includes('web')) {
    defaultRole = 'Web Architecture';
    defaultSpecs = ['Modern Standards', 'Interface Design', 'Responsive Flow'];
  } else if (catLower.includes('data') || catLower.includes('database')) {
    defaultRole = 'DATA ARCHITECTURE';
    defaultSpecs = [
      'PARADIGM: Structured Storage',
      'QUERYING: Data Retrieval',
      'INTEGRITY: Schema Integrity',
    ];
  } else if (catLower.includes('workflow') || catLower.includes('tool')) {
    defaultRole = 'Tooling & Workflow';
    defaultSpecs = ['Development Tooling', 'Productivity', 'Workflow Automation'];
  }

  return {
    name,
    category: 'systems',
    role: defaultRole,
    narrative: `Applied practical engineering, clean design patterns, and workflows utilizing ${name}.`,
    specs: defaultSpecs,
  };
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

  // Published skills from Supabase via DataContext
  const publishedSkills = (skillsList || [])
    .filter((s) => s.status === 'published')
    .slice()
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  // Dynamic categorization aligned with Supabase schema categories
  const systemsSkills = publishedSkills.filter(
    (s) =>
      s.category === '01 / PROGRAMMING & SYSTEMS' ||
      s.category?.toLowerCase().includes('systems') ||
      s.category?.toLowerCase().includes('programming')
  );

  const webSkills = publishedSkills.filter(
    (s) =>
      s.category === '02 / WEB FOUNDATIONS' ||
      s.category?.toLowerCase().includes('web')
  );

  const dbSkills = publishedSkills.filter(
    (s) =>
      s.category === '03 / DATABASE' ||
      s.category?.toLowerCase().includes('database') ||
      s.category?.toLowerCase().includes('data')
  );

  const toolSkills = publishedSkills.filter(
    (s) =>
      s.category === '04 / DEVELOPMENT WORKFLOW' ||
      s.category?.toLowerCase().includes('workflow') ||
      s.category?.toLowerCase().includes('tool')
  );

  const additionalSkills = publishedSkills.filter(
    (s) =>
      !systemsSkills.includes(s) &&
      !webSkills.includes(s) &&
      !dbSkills.includes(s) &&
      !toolSkills.includes(s)
  );

  // Groupings for Act 1
  const monumentSkills = systemsSkills.slice(0, 2);
  const offsetSkills = systemsSkills.slice(2);

  // Groupings for Act 2 Web
  const anchorWebSkill = webSkills.length > 0 ? webSkills[0] : null;
  const subWebSkills = webSkills.length > 1 ? webSkills.slice(1) : [];

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
          {systemsSkills.length > 0 && (
            <div className="fluid-act fluid-act-systems">
              <div className="fluid-act-header">
                <span className="fluid-act-eyebrow">PROGRAMMING &amp; CORE SYSTEMS</span>
                <span className="fluid-act-divider" />
              </div>

              <div
                className="systems-sculpture-grid"
                style={offsetSkills.length === 0 ? { gridTemplateColumns: '1fr' } : undefined}
              >
                {/* Monument Group: Primary Systems Anchor(s) */}
                <div
                  className="systems-monument-pair"
                  style={monumentSkills.length === 1 ? { gridTemplateColumns: '1fr' } : undefined}
                >
                  {monumentSkills.map((skill, index) => {
                    const meta = getTechMeta(skill.name, skill.category);
                    const activeKey = `sys-${skill.id || skill.name}`;
                    return (
                      <React.Fragment key={skill.id || skill.name}>
                        {index > 0 && <div className="monument-hairline-separator" aria-hidden="true" />}
                        <div
                          className={`tech-monument-block ${activeTech === activeKey ? 'is-focused' : ''}`}
                          onMouseEnter={() => setActiveTech(activeKey)}
                          onMouseLeave={() => setActiveTech(null)}
                        >
                          <div className="monument-title-line">
                            <span className="monument-display-name">{skill.name}</span>
                            <span className="monument-role-flag">{meta.role.toUpperCase()}</span>
                          </div>
                          <p className="monument-narrative">{meta.narrative}</p>
                          {meta.specs && meta.specs.length > 0 && (
                            <div className="monument-specs-row">
                              {meta.specs.map((spec, sIdx) => (
                                <React.Fragment key={spec}>
                                  {sIdx > 0 && <span className="spec-dot" />}
                                  <span>{spec}</span>
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Offset Column: Supplementary Systems Technologies */}
                {offsetSkills.length > 0 && (
                  <div className="systems-offset-column">
                    {offsetSkills.map((skill) => {
                      const meta = getTechMeta(skill.name, skill.category);
                      const activeKey = `sys-${skill.id || skill.name}`;
                      return (
                        <div
                          key={skill.id || skill.name}
                          className={`tech-offset-block ${activeTech === activeKey ? 'is-focused' : ''}`}
                          onMouseEnter={() => setActiveTech(activeKey)}
                          onMouseLeave={() => setActiveTech(null)}
                        >
                          <div className="offset-header-group">
                            <div className="offset-name-row">
                              <span className="offset-display-name">{skill.name}</span>
                              <span className="offset-role-tag">{meta.role.toUpperCase()}</span>
                            </div>
                            <p className="offset-narrative">{meta.narrative}</p>
                          </div>
                          {meta.specs && meta.specs.length > 0 && (
                            <div className="offset-specs-tags">
                              {meta.specs.map((tag) => (
                                <span key={tag} className="micro-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ACT 2: TWO FLUID CURRENTS — Web Architecture & Relational Database     */}
          {/* ----------------------------------------------------------------------- */}
          {(webSkills.length > 0 || dbSkills.length > 0) && (
            <div
              className="fluid-act fluid-act-dual"
              style={
                webSkills.length === 0 || dbSkills.length === 0
                  ? { gridTemplateColumns: '1fr' }
                  : undefined
              }
            >
              {/* Stream A: Web Development Continuum */}
              {webSkills.length > 0 && (
                <div className="fluid-substream substream-web">
                  <div className="fluid-act-header">
                    <span className="fluid-act-eyebrow">WEB ARCHITECTURE</span>
                    <span className="fluid-act-divider" />
                  </div>

                  <div className="web-constellation">
                    {/* Anchor Web Skill */}
                    {anchorWebSkill && (() => {
                      const meta = getTechMeta(anchorWebSkill.name, anchorWebSkill.category);
                      const activeKey = `web-${anchorWebSkill.id || anchorWebSkill.name}`;
                      return (
                        <div
                          className={`web-anchor-item ${activeTech === activeKey ? 'is-focused' : ''}`}
                          onMouseEnter={() => setActiveTech(activeKey)}
                          onMouseLeave={() => setActiveTech(null)}
                        >
                          <div className="web-title-row">
                            <span className="web-primary-name">{anchorWebSkill.name}</span>
                            <span className="web-role-caption">{meta.role}</span>
                          </div>
                          <p className="web-narrative">{meta.narrative}</p>
                          {meta.specs && meta.specs.length > 0 && (
                            <div className="web-inline-traits">
                              {meta.specs.map((spec, idx) => (
                                <React.Fragment key={spec}>
                                  {idx > 0 && <span className="spec-dot" />}
                                  <span>{spec}</span>
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Subordinate Foundations Duo / Grid */}
                    {subWebSkills.length > 0 && (
                      <div
                        className="web-foundations-duo"
                        style={subWebSkills.length === 1 ? { gridTemplateColumns: '1fr' } : undefined}
                      >
                        {subWebSkills.map((skill) => {
                          const meta = getTechMeta(skill.name, skill.category);
                          const activeKey = `web-${skill.id || skill.name}`;
                          return (
                            <div
                              key={skill.id || skill.name}
                              className={`web-subitem ${activeTech === activeKey ? 'is-focused' : ''}`}
                              onMouseEnter={() => setActiveTech(activeKey)}
                              onMouseLeave={() => setActiveTech(null)}
                            >
                              <div className="subitem-title-row">
                                <span className="subitem-name">{skill.name}</span>
                                <span className="subitem-role">{meta.role}</span>
                              </div>
                              <p className="subitem-narrative">{meta.narrative}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stream B: Relational Data Stature */}
              {dbSkills.length > 0 && (
                <div className="fluid-substream substream-db">
                  <div className="fluid-act-header">
                    <span className="fluid-act-eyebrow">RELATIONAL DATA</span>
                    <span className="fluid-act-divider" />
                  </div>

                  <div className="database-sculpture-column" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {dbSkills.map((skill) => {
                      const meta = getTechMeta(skill.name, skill.category);
                      const activeKey = `db-${skill.id || skill.name}`;
                      return (
                        <div
                          key={skill.id || skill.name}
                          className={`database-sculpture ${activeTech === activeKey ? 'is-focused' : ''}`}
                          onMouseEnter={() => setActiveTech(activeKey)}
                          onMouseLeave={() => setActiveTech(null)}
                        >
                          <div className="db-headline-cluster">
                            <span className="db-monument-name">{skill.name}</span>
                            <div className="db-meta-badge">{meta.role.toUpperCase()}</div>
                          </div>

                          <p className="db-narrative">{meta.narrative}</p>

                          {meta.specs && meta.specs.length > 0 && (
                            <div className="db-telemetry-cluster">
                              {meta.specs.map((spec, idx) => {
                                const colonIdx = spec.indexOf(':');
                                const keyLabel = colonIdx !== -1 ? spec.substring(0, colonIdx).trim() : `SPEC 0${idx + 1}`;
                                const valLabel = colonIdx !== -1 ? spec.substring(colonIdx + 1).trim() : spec;
                                return (
                                  <div key={spec} className="db-telemetry-entry">
                                    <span className="telemetry-key">{keyLabel}</span>
                                    <span className="telemetry-val">{valLabel}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ACT 3: DEVELOPER ENVIRONMENT & TOOLCHAIN RUNWAY                        */}
          {/* ----------------------------------------------------------------------- */}
          {toolSkills.length > 0 && (
            <div className="fluid-act fluid-act-tools">
              <div className="fluid-act-header">
                <span className="fluid-act-eyebrow">DEVELOPER ENVIRONMENT &amp; TOOLING</span>
                <span className="fluid-act-divider" />
              </div>

              <div className="tools-horizon-runway">
                {toolSkills.map((skill) => {
                  const meta = getTechMeta(skill.name, skill.category);
                  const activeKey = `tool-${skill.id || skill.name}`;
                  return (
                    <div
                      key={skill.id || skill.name}
                      className={`tool-station ${activeTech === activeKey ? 'is-focused' : ''}`}
                      onMouseEnter={() => setActiveTech(activeKey)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      <div className="tool-title-row">
                        <span className="tool-name">{skill.name}</span>
                        <span className="tool-role-whisper">{meta.role}</span>
                      </div>
                      <p className="tool-narrative">{meta.narrative}</p>
                      {meta.specs && meta.specs.length > 0 && (
                        <span className="tool-micro-metric">{meta.specs[0]}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* SUPPLEMENTARY CMS SKILLS (For custom or newly categorized items)        */}
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

          {/* Empty State Fallback if all skills are unpublished/empty */}
          {publishedSkills.length === 0 && (
            <div className="skills-empty-state">
              <p>Technical capabilities currently being updated.</p>
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

        /* Dual Monument Pair */
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

        /* Companion Offset Column */
        .systems-offset-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

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
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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

        .skills-empty-state {
          padding: 48px 0;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.88rem;
          color: var(--text-muted);
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
