import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../../data/projects';
import { usePortfolioData } from '../../context/DataContext';
import { ArrowUpRight, Code, CheckCircle2, Terminal, Copy, Check, FileCode } from 'lucide-react';
import { GithubIcon } from '../Icons/Icons';
import { highlightLine } from '../../utils/syntaxHighlight';
import { SectionLabel } from '../SectionLabel/SectionLabel';

interface ProjectCardItemProps {
  project: Project;
  idx: number;
  copiedId: string | null;
  onCopyCode: (id: string, code: string) => void;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({
  project,
  idx,
  copiedId,
  onCopyCode,
}) => {
  const isEven = idx % 2 === 1;
  const lines = project.codeExcerpt.split('\n');
  const endLine = project.startLine + lines.length - 1;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'hidden' | 'visible' | 'receding'>('hidden');

  useEffect(() => {
    // Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimationState('visible');
      return;
    }

    let rafId: number | null = null;
    let isTicking = false;

    const updateScrollMetrics = () => {
      isTicking = false;
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 1. Check entrance, exit, and reset boundaries
      const isPastEntrance = rect.top <= windowHeight * 0.88;
      const isPastTop = rect.top <= -rect.height * 0.35 && rect.bottom > 0;
      const isOffscreenBelow = rect.top > windowHeight * 1.05;

      if (isOffscreenBelow) {
        setAnimationState('hidden');
      } else if (isPastTop) {
        setAnimationState('receding');
      } else if (isPastEntrance) {
        setAnimationState('visible');
      }

      // 2. Subtle Depth Parallax for the Code Preview Window
      if (rect.top < windowHeight && rect.bottom > 0) {
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const rawProgress = (viewportCenter - centerY) / (windowHeight / 2 + rect.height / 2);
        const clampedProgress = Math.max(-1, Math.min(1, rawProgress));
        const parallaxPx = (clampedProgress * 14).toFixed(1);
        el.style.setProperty('--parallax-y', `${parallaxPx}px`);
      }
    };

    const onScroll = () => {
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateScrollMetrics);
      }
    };

    // Run initial computation
    updateScrollMetrics();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`project-card-wrapper is-${animationState}`}
    >
      <div
        id={`project-${project.id}`}
        className="project-card"
      >
        {/* Text Content Column */}
        <div
          style={{
            gridColumn: 'span 12',
            order: isEven ? 2 : 1,
          }}
          className={`project-content-col ${isEven ? 'order-desktop-2' : 'order-desktop-1'}`}
        >
          {/* Stagger 2: Project Index, Category & Title */}
          <div className="project-stagger-2">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--accent-violet-light)',
                  letterSpacing: '0.04em',
                }}
              >
                PROJECT {project.number}
              </span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-muted)',
                }}
              />
              <span className="project-category-badge">
                {project.category}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                lineHeight: '1.2',
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Stagger 3: Description & Highlights */}
          <div className="project-stagger-3">
            <p
              className="body-editorial"
              style={{
                fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
                lineHeight: '1.7',
                marginBottom: '24px',
                maxWidth: '540px',
              }}
            >
              {project.description}
            </p>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '28px',
              }}
            >
              {project.highlights.map((h, hIdx) => (
                <li
                  key={hIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.94rem',
                    lineHeight: '1.6',
                    color: 'var(--text-primary)',
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{
                      color: 'var(--accent-violet)',
                      flexShrink: 0,
                      marginTop: '3px',
                    }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stagger 4: Technologies tags */}
          <div
            className="project-stagger-4"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 10px',
              marginBottom: '28px',
            }}
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="project-tech-tag"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Stagger 5: Action buttons & Language indicator */}
          <div
            className="project-stagger-5"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-repo-btn"
                aria-label={`View ${project.title} repository on GitHub`}
              >
                <GithubIcon size={15} />
                <span>View Repository</span>
                <ArrowUpRight size={14} className="repo-arrow" />
              </a>
            ) : (
              <div className="repo-pending-pill">
                <GithubIcon size={14} />
                <span>Repository link pending confirmation</span>
              </div>
            )}

            <span className="project-language-pill">
              <Code size={13} style={{ color: 'var(--accent-violet-light)' }} />
              <span>{project.language}</span>
            </span>
          </div>
        </div>

        {/* Real Source Code Preview Column */}
        <div
          style={{
            gridColumn: 'span 12',
            order: isEven ? 1 : 2,
          }}
          className={`project-visual-col ${isEven ? 'order-desktop-1' : 'order-desktop-2'} project-stagger-1`}
        >
          <div
            style={{
              borderTop: `2px solid ${project.visualAccent || 'var(--accent-violet)'}`,
            }}
            className="code-preview-window"
          >
            {/* Window Title Bar */}
            <div className="code-window-bar">
              {/* Left: Window controls and File Tab */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                </div>

                {/* File Tab */}
                <div className="code-window-tab">
                  <FileCode size={13} style={{ color: 'var(--accent-violet-light)', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {project.sourceFileName}
                  </span>
                </div>
              </div>

              {/* Right: Line count & Copy snippet button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.02em',
                  }}
                >
                  Lines {project.startLine}–{endLine}
                </span>

                <button
                  type="button"
                  onClick={() => onCopyCode(project.id, project.codeExcerpt)}
                  title="Copy source excerpt"
                  className="code-copy-btn"
                  style={{
                    background: copiedId === project.id ? 'rgba(139, 92, 246, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: copiedId === project.id ? 'var(--accent-violet)' : 'rgba(255, 255, 255, 0.1)',
                    color: copiedId === project.id ? '#C4B5FD' : 'var(--text-secondary)',
                  }}
                >
                  {copiedId === project.id ? (
                    <>
                      <Check size={11} style={{ color: '#A78BFA' }} />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Source Code Viewer with Gutter Line Numbers */}
            <div
              className="code-scroll-pane"
              style={{
                padding: '18px 0',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                lineHeight: '1.68',
                height: '390px',
                maxHeight: '390px',
                overflowX: 'auto',
                overflowY: 'auto',
                backgroundColor: 'rgba(6, 6, 10, 0.98)',
                position: 'relative',
              }}
            >
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  {lines.map((line, lIdx) => {
                    const lineNum = project.startLine + lIdx;
                    return (
                      <tr key={lIdx} className="code-line-row">
                        <td
                          className="code-gutter-cell"
                          style={{
                            width: '46px',
                            minWidth: '46px',
                            padding: '0 14px 0 16px',
                            textAlign: 'right',
                            userSelect: 'none',
                            color: 'rgba(255, 255, 255, 0.22)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.76rem',
                            verticalAlign: 'top',
                            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                            position: 'sticky',
                            left: 0,
                            backgroundColor: 'rgba(6, 6, 10, 0.98)',
                            zIndex: 2,
                          }}
                        >
                          {lineNum}
                        </td>
                        <td
                          style={{
                            padding: '0 20px',
                            whiteSpace: 'pre',
                            color: 'var(--text-primary)',
                            verticalAlign: 'top',
                          }}
                        >
                          {highlightLine(line)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Source Code Viewer Bottom Bar */}
            <div
              style={{
                padding: '10px 18px',
                backgroundColor: 'rgba(12, 13, 18, 0.98)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={12} style={{ color: 'var(--accent-violet-light)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {project.sourceFileName} · {lines.length} lines shown
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  color: 'var(--accent-violet-light)',
                }}
              >
                {project.language} · UTF-8
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { projectsList, socialLinksList } = usePortfolioData();
  const projects = projectsList;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const githubProfile = socialLinksList.find((s) => s.id === 'github');

  const handleCopyCode = (projectId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(projectId);
    setTimeout(() => {
      setCopiedId((prev) => (prev === projectId ? null : prev));
    }, 2000);
  };

  return (
    <section
      id="work"
      style={{
        paddingTop: 'clamp(80px, 12vw, 150px)',
        paddingBottom: 'clamp(80px, 12vw, 150px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <SectionLabel id="work" />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: 'clamp(48px, 8vw, 80px)',
          }}
        >
          <div>
            <h2 className="section-hero-heading">
              Things I've{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-violet-light)' }}>
                built.
              </span>
            </h2>
          </div>
          <div style={{ maxWidth: '480px' }}>
            <p className="body-editorial">
              Real projects and foundational implementations in C and C++, featuring genuine source code excerpts, memory-conscious data structures, and persistent storage routines.
            </p>
          </div>
        </div>

        {/* Editorial Project Showcase: Alternating Asymmetric Layouts */}
        {/* Editorial Project Showcase: Alternating Asymmetric Layouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 64px)' }}>
          {projects.map((project, idx) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              idx={idx}
              copiedId={copiedId}
              onCopyCode={handleCopyCode}
            />
          ))}
        </div>

        {/* Refined GitHub Spotlight Composition */}
        <div className="github-spotlight-section">
          {/* Subtle Ambient SVG Backdrop & Git Workflow Network */}
          <div className="github-spotlight-backdrop" aria-hidden="true">
            <svg
              className="github-spotlight-svg"
              width="100%"
              height="100%"
              viewBox="0 0 1200 240"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Atmospheric Glows */}
                <radialGradient id="ghAtmosphereGlow" cx="72%" cy="50%" r="58%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.16)" />
                  <stop offset="50%" stopColor="rgba(99, 102, 241, 0.04)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                <radialGradient id="ghCyanGlow" cx="28%" cy="52%" r="48%">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.07)" />
                  <stop offset="60%" stopColor="rgba(99, 102, 241, 0.01)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                {/* Node Glow Halo */}
                <radialGradient id="ghNodeHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(196, 181, 253, 0.85)" />
                  <stop offset="35%" stopColor="rgba(139, 92, 246, 0.45)" />
                  <stop offset="70%" stopColor="rgba(99, 102, 241, 0.12)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                </radialGradient>

                <radialGradient id="ghNodeHaloCyan" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(125, 211, 252, 0.85)" />
                  <stop offset="40%" stopColor="rgba(56, 189, 248, 0.38)" />
                  <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                </radialGradient>

                {/* Branch Gradients */}
                <linearGradient id="ghTrunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.02)" />
                  <stop offset="15%" stopColor="rgba(167, 139, 250, 0.28)" />
                  <stop offset="55%" stopColor="rgba(56, 189, 248, 0.32)" />
                  <stop offset="85%" stopColor="rgba(167, 139, 250, 0.25)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.02)" />
                </linearGradient>

                <linearGradient id="ghBranchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="25%" stopColor="rgba(167, 139, 250, 0.2)" />
                  <stop offset="75%" stopColor="rgba(139, 92, 246, 0.22)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>

                {/* Subtle Coordinate Crosshair & Dot Matrix Pattern */}
                <pattern id="ghMatrixGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="0.75" fill="rgba(255, 255, 255, 0.05)" />
                  <path d="M 28,30 L 32,30 M 30,28 L 30,32" stroke="rgba(167, 139, 250, 0.07)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Atmospheric Background Glows */}
              <rect width="100%" height="100%" fill="url(#ghMatrixGrid)" />
              <ellipse cx="880" cy="115" rx="280" ry="95" fill="url(#ghAtmosphereGlow)" />
              <ellipse cx="320" cy="125" rx="240" ry="85" fill="url(#ghCyanGlow)" />

              {/* Faint Abstract Code & Git Metadata Tokens */}
              <g opacity="0.12" fill="currentColor" fontFamily="var(--font-mono)">
                <text x="60" y="40" fill="rgba(167, 139, 250, 0.9)" fontSize="10" letterSpacing="0.08em">commit 9c4b7e1 · main</text>
                <text x="460" y="36" fill="rgba(56, 189, 248, 0.85)" fontSize="9.5" letterSpacing="0.05em">merge: feat/pipeline → main</text>
                <text x="960" y="48" fill="rgba(167, 139, 250, 0.95)" fontSize="10" letterSpacing="0.06em">refs/heads/v2.4-build</text>
                <text x="280" y="210" fill="rgba(255, 255, 255, 0.7)" fontSize="9" letterSpacing="0.05em">origin/head: verified ✓</text>
                <text x="760" y="212" fill="rgba(167, 139, 250, 0.85)" fontSize="9.5" letterSpacing="0.04em">// automated release pipeline</text>
              </g>

              {/* Git Commit Tree & Development Workflow Paths */}
              {/* Main Trunk Line */}
              <path
                d="M 30,120 L 240,120 C 290,120 320,85 370,85 L 670,85 C 720,85 750,120 800,120 L 1170,120"
                stroke="url(#ghTrunkGrad)"
                strokeWidth="1.2"
                strokeDasharray="5 3"
              />

              {/* Secondary Feature Branch (Lower) */}
              <path
                d="M 190,120 C 240,120 270,162 320,162 L 600,162 C 650,162 680,120 730,120 L 920,120"
                stroke="url(#ghBranchGrad)"
                strokeWidth="1"
              />

              {/* Staging / CI Build Branch (Upper) */}
              <path
                d="M 440,85 C 480,85 510,48 550,48 L 750,48 C 790,48 820,85 860,85 L 1040,85"
                stroke="rgba(167, 139, 250, 0.2)"
                strokeWidth="0.9"
                strokeDasharray="4 6"
              />

              {/* Branch Interconnect Telemetry Connectors */}
              <line x1="370" y1="85" x2="320" y2="162" stroke="rgba(167, 139, 250, 0.12)" strokeWidth="0.8" strokeDasharray="2 4" />
              <line x1="730" y1="120" x2="750" y2="48" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="600" y1="162" x2="670" y2="85" stroke="rgba(167, 139, 250, 0.1)" strokeWidth="0.8" strokeDasharray="2 3" />

              {/* Delicate Repository Satellites & Orbital Paths (Around Focal Area) */}
              <g transform="translate(860, 115)">
                {/* Outer Rotating Orbit */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="195"
                  ry="72"
                  stroke="rgba(167, 139, 250, 0.12)"
                  strokeWidth="1"
                  strokeDasharray="5 9"
                  className="gh-orbital-spin"
                />
                {/* Tilted Satellite Orbit */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="135"
                  ry="48"
                  stroke="rgba(56, 189, 248, 0.08)"
                  strokeWidth="0.8"
                  transform="rotate(-9)"
                />
                {/* Inner Trajectory Ring */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="75"
                  ry="26"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="0.7"
                />
              </g>

              {/* Understated GitHub Watermark Glyph */}
              <g opacity="0.038" transform="translate(815, 68) scale(3.5)" stroke="var(--accent-purple-light)" strokeWidth="0.8">
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  fill="none"
                />
              </g>

              {/* Commit Nodes & Interconnected Data Points */}
              {/* Secondary Branch Nodes */}
              <circle cx="190" cy="120" r="2.8" fill="#C4B5FD" opacity="0.65" />
              <circle cx="240" cy="120" r="2.2" fill="rgba(167, 139, 250, 0.5)" />
              <circle cx="320" cy="162" r="3" fill="rgba(167, 139, 250, 0.6)" />
              <circle cx="480" cy="162" r="2.2" fill="rgba(255, 255, 255, 0.4)" />
              <circle cx="600" cy="162" r="3" fill="rgba(167, 139, 250, 0.6)" />
              <circle cx="550" cy="48" r="2.8" fill="#38BDF8" opacity="0.75" />
              <circle cx="750" cy="48" r="2.8" fill="#C4B5FD" opacity="0.7" />
              <circle cx="1040" cy="85" r="2.8" fill="rgba(167, 139, 250, 0.5)" />
              <circle cx="1170" cy="120" r="2.2" fill="rgba(255, 255, 255, 0.35)" />

              {/* Restrained Luminous Focal Points (Glowing Depth Nodes) */}
              {/* Luminous Node 1: Merge/Branch Point at (370, 85) */}
              <circle cx="370" cy="85" r="14" fill="url(#ghNodeHalo)" className="gh-node-pulse-1" />
              <circle cx="370" cy="85" r="5" fill="none" stroke="rgba(167, 139, 250, 0.85)" strokeWidth="1" />
              <circle cx="370" cy="85" r="2.2" fill="#FFFFFF" />

              {/* Luminous Node 2: CI/CD Pipeline Junction at (730, 120) */}
              <circle cx="730" cy="120" r="16" fill="url(#ghNodeHaloCyan)" className="gh-node-pulse-2" />
              <circle cx="730" cy="120" r="5.5" fill="none" stroke="rgba(56, 189, 248, 0.85)" strokeWidth="1" />
              <circle cx="730" cy="120" r="2.5" fill="#FFFFFF" />

              {/* Luminous Node 3: Core Hub at (860, 115) */}
              <circle cx="860" cy="115" r="22" fill="url(#ghNodeHalo)" className="gh-node-pulse-3" />
              <circle cx="860" cy="115" r="6" fill="none" stroke="rgba(196, 181, 253, 0.75)" strokeWidth="1" />
              <circle cx="860" cy="115" r="3" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Foreground Spotlight Layout */}
          <div className="github-spotlight-content">
            <div className="github-spotlight-text-col">
              <h4 className="github-spotlight-heading">
                Explore Repositories &amp; Future Builds
              </h4>
              <p className="github-spotlight-description">
                All code modules are developed with structured documentation, test inputs, and commit discipline.
              </p>
            </div>

            <div className="github-spotlight-action-col">
              <a
                href={githubProfile?.url || 'https://github.com/daksh-Codez'}
                target="_blank"
                rel="noopener noreferrer"
                className="github-spotlight-btn"
                aria-label="Visit Daksh Goswami's GitHub profile"
              >
                <GithubIcon size={16} className="gh-btn-icon" />
                <span className="gh-btn-text">VISIT GITHUB PROFILE</span>
                <ArrowUpRight size={14} className="gh-btn-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .project-content-col {
            grid-column: span 6 !important;
          }
          .project-visual-col {
            grid-column: span 6 !important;
          }
          .order-desktop-1 {
            order: 1 !important;
          }
          .order-desktop-2 {
            order: 2 !important;
          }
        }

        /* -------------------------------------------------------------
         * CINEMATIC SCROLL TRANSITIONS & STAGGERED REVEALS
         * ----------------------------------------------------------- */
        .project-card-wrapper {
          position: relative;
          will-change: transform, opacity, filter;
          opacity: 0;
          transform: translateY(32px) scale(0.97);
          filter: blur(4px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Card in Viewport: Full prominence & Focus */
        .project-card-wrapper.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        /* Outgoing Card: Subtly recedes as user scrolls past */
        .project-card-wrapper.is-receding {
          opacity: 0.86;
          transform: translateY(0) scale(0.982);
          filter: blur(0px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Staggered Content Elements */
        .project-stagger-1,
        .project-stagger-2,
        .project-stagger-3,
        .project-stagger-4,
        .project-stagger-5 {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        /* 1. Visual preview window */
        .project-card-wrapper.is-visible .project-stagger-1,
        .project-card-wrapper.is-receding .project-stagger-1 {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.08s;
        }

        /* 2. Project title & category */
        .project-card-wrapper.is-visible .project-stagger-2,
        .project-card-wrapper.is-receding .project-stagger-2 {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.16s;
        }

        /* 3. Description & highlights */
        .project-card-wrapper.is-visible .project-stagger-3,
        .project-card-wrapper.is-receding .project-stagger-3 {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.24s;
        }

        /* 4. Technology tags */
        .project-card-wrapper.is-visible .project-stagger-4,
        .project-card-wrapper.is-receding .project-stagger-4 {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.32s;
        }

        /* 5. Repository button & language indicator */
        .project-card-wrapper.is-visible .project-stagger-5,
        .project-card-wrapper.is-receding .project-stagger-5 {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.40s;
        }

        .project-card {
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: clamp(28px, 4vw, 52px);
          align-items: center;
          padding: clamp(28px, 4.5vw, 48px);
          border-radius: clamp(20px, 2.5vw, 30px);
          background: rgba(10, 10, 16, 0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.3), transparent);
          pointer-events: none;
        }

        .project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(167, 139, 250, 0.25);
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.5), 0 0 28px rgba(139, 92, 246, 0.08);
        }

        .project-category-badge {
          font-family: var(--font-body);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--accent-violet-light);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.22);
          display: inline-flex;
          align-items: center;
        }

        /* Technology & Feature Capsule Tags */
        .project-tech-tag {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.76rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(226, 232, 240, 0.85);
          padding: 5px 13px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          line-height: 1.4;
          white-space: nowrap;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }

        .project-tech-tag:hover {
          background: rgba(139, 92, 246, 0.12);
          border-color: rgba(167, 139, 250, 0.35);
          color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.15);
        }

        /* View Repository Capsule Button */
        .view-repo-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 10px 22px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.14);
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease,
                      color 0.3s ease;
          user-select: none;
          white-space: nowrap;
        }

        .view-repo-btn:hover {
          background: rgba(139, 92, 246, 0.14);
          border-color: rgba(167, 139, 250, 0.6);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 22px rgba(139, 92, 246, 0.3), 0 0 12px rgba(167, 139, 250, 0.2);
        }

        .view-repo-btn:active {
          transform: translateY(0) scale(0.98);
          background: rgba(139, 92, 246, 0.2);
        }

        .repo-arrow {
          color: var(--accent-purple-light);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
        }

        .view-repo-btn:hover .repo-arrow {
          color: #FFFFFF;
          transform: translate(2px, -2px);
        }

        .view-repo-btn:focus-visible {
          outline: 2px solid var(--accent-purple-light);
          outline-offset: 3px;
        }

        .repo-pending-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px dashed rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* Language Capsule Indicator */
        .project-language-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.25s ease;
          user-select: none;
        }

        .project-language-pill:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(167, 139, 250, 0.3);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        /* Source Code Viewer Window */
        .code-preview-window {
          background: rgba(8, 8, 14, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55);
          transform: translateY(var(--parallax-y, 0px));
          transition: border-color 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease;
          will-change: transform;
        }

        .code-preview-window:hover {
          transform: translateY(calc(var(--parallax-y, 0px) - 2px)) !important;
          border-color: rgba(167, 139, 246, 0.45) !important;
          box-shadow: 0 26px 55px rgba(0, 0, 0, 0.65), 0 0 24px rgba(139, 92, 246, 0.12) !important;
        }

        .code-window-bar {
          padding: 12px 18px;
          background: rgba(14, 15, 22, 0.98);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .code-window-tab {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(30, 32, 46, 0.65);
          padding: 5px 12px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .code-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          border-radius: 9999px;
          border: 1px solid;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .code-line-row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        .code-line-row:hover .code-gutter-cell {
          background-color: rgba(14, 14, 22, 0.98) !important;
          color: rgba(196, 181, 253, 0.7) !important;
        }

        /* Modern subtle dark-theme scrollbar for code viewer */
        .code-scroll-pane {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.35) rgba(8, 8, 14, 0.6);
        }

        .code-scroll-pane::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .code-scroll-pane::-webkit-scrollbar-track {
          background: rgba(8, 8, 14, 0.6);
        }

        .code-scroll-pane::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }

        .code-scroll-pane::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.6);
        }

        .code-scroll-pane::-webkit-scrollbar-corner {
          background: rgba(8, 8, 14, 0.6);
        }

        /* GitHub Spotlight Section */
        .github-spotlight-section {
          position: relative;
          margin-top: clamp(64px, 10vw, 104px);
          padding: clamp(40px, 5vw, 56px) clamp(24px, 4vw, 48px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          background: transparent;
          overflow: hidden;
        }

        .github-spotlight-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          -webkit-mask-image: radial-gradient(ellipse 90% 82% at 50% 50%, black 50%, transparent 100%);
          mask-image: radial-gradient(ellipse 90% 82% at 50% 50%, black 50%, transparent 100%);
        }

        .github-spotlight-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .gh-orbital-spin {
          transform-origin: 0 0;
          animation: ghOrbitRotate 45s linear infinite;
        }

        @keyframes ghOrbitRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Restrained Luminous Point Breathing Animations */
        @keyframes ghNodeGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15);
          }
        }

        .gh-node-pulse-1 {
          transform-origin: 370px 85px;
          animation: ghNodeGlow 4s ease-in-out infinite;
        }

        .gh-node-pulse-2 {
          transform-origin: 730px 120px;
          animation: ghNodeGlow 4.8s ease-in-out infinite 1.4s;
        }

        .gh-node-pulse-3 {
          transform-origin: 860px 115px;
          animation: ghNodeGlow 4.2s ease-in-out infinite 0.7s;
        }

        .github-spotlight-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .github-spotlight-text-col {
          max-width: 580px;
        }

        .github-spotlight-heading {
          font-family: var(--font-body);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 10px 0;
          line-height: 1.25;
        }

        .github-spotlight-description {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.05vw, 1rem);
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        .github-spotlight-action-col {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .github-spotlight-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 26px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FFFFFF 0%, #EAE5F6 100%);
          color: #07070B;
          border: 1px solid rgba(255, 255, 255, 0.9);
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2), 0 1px 3px rgba(0, 0, 0, 0.12);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.25s ease,
                      border-color 0.25s ease;
          user-select: none;
          white-space: nowrap;
        }

        .github-spotlight-btn:hover {
          background: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 26px rgba(167, 139, 250, 0.42), 0 2px 8px rgba(0, 0, 0, 0.16);
          border-color: #FFFFFF;
        }

        .github-spotlight-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.25);
        }

        .gh-btn-icon {
          color: #07070B;
          flex-shrink: 0;
        }

        .gh-btn-text {
          font-weight: 700;
        }

        .gh-btn-arrow {
          color: #07070B;
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .github-spotlight-btn:hover .gh-btn-arrow {
          transform: translate(2px, -2px);
        }

        .github-spotlight-btn:focus-visible {
          outline: 2px solid var(--accent-purple-light);
          outline-offset: 4px;
        }

        @media (max-width: 680px) {
          .github-spotlight-section {
            padding: 32px 0;
          }
          .github-spotlight-action-col {
            width: 100%;
          }
          .github-spotlight-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card-wrapper,
          .project-card-wrapper.is-visible,
          .project-card-wrapper.is-receding,
          .project-stagger-1,
          .project-stagger-2,
          .project-stagger-3,
          .project-stagger-4,
          .project-stagger-5,
          .project-card,
          .code-preview-window,
          .view-repo-btn,
          .repo-arrow,
          .project-tech-tag,
          .project-language-pill {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
          .gh-orbital-spin,
          .gh-node-pulse-1,
          .gh-node-pulse-2,
          .gh-node-pulse-3 {
            animation: none !important;
            transform: none !important;
            opacity: 0.5 !important;
          }
          .github-spotlight-btn,
          .gh-btn-arrow {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
