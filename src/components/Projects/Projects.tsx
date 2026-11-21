import React, { useState } from 'react';
import { Project } from '../../data/projects';
import { usePortfolioData } from '../../context/DataContext';
import { ArrowUpRight, Code, CheckCircle2, Terminal, Copy, Check, FileCode } from 'lucide-react';
import { GithubIcon } from '../Icons/Icons';
import { highlightLine } from '../../utils/syntaxHighlight';

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
        <div className="section-label">03 / SELECTED WORK</div>

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 9vw, 104px)' }}>
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 1;
            const lines = project.codeExcerpt.split('\n');
            const endLine = project.startLine + lines.length - 1;

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'clamp(28px, 4.5vw, 56px)',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: 'clamp(36px, 6vw, 72px)',
                }}
                className="project-row"
              >
                {/* Text Content Column */}
                <div
                  style={{
                    gridColumn: 'span 12',
                    order: isEven ? 2 : 1,
                  }}
                  className={`project-content-col ${isEven ? 'order-desktop-2' : 'order-desktop-1'}`}
                >
                  {/* Project Index & Category */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
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
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
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

                  {/* Description */}
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

                  {/* Highlights */}
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

                  {/* Technologies tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '28px',
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.76rem',
                          color: 'var(--text-secondary)',
                          padding: '4px 10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-hairline)',
                          borderRadius: '3px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metadata & Actions */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '14px',
                    }}
                  >
                    {/* View Repository Button (Active if URL provided) */}
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
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 16px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px dashed var(--border-hairline)',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <GithubIcon size={14} />
                        <span>Repository link pending confirmation</span>
                      </div>
                    )}

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Code size={13} style={{ color: 'var(--accent-violet-light)' }} />
                      {project.language}
                    </span>
                  </div>
                </div>

                {/* Real Source Code Preview Column */}
                <div
                  style={{
                    gridColumn: 'span 12',
                    order: isEven ? 1 : 2,
                  }}
                  className={`project-visual-col ${isEven ? 'order-desktop-1' : 'order-desktop-2'}`}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(8, 8, 12, 0.96)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid var(--border-hairline)',
                      borderTop: `2px solid ${project.visualAccent || 'var(--accent-violet)'}`,
                      borderRadius: '6px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
                      transition: 'border-color 0.3s ease, transform 0.3s ease',
                    }}
                    className="code-preview-window"
                  >
                    {/* Window Title Bar */}
                    <div
                      style={{
                        padding: '12px 18px',
                        backgroundColor: 'rgba(12, 13, 18, 0.98)',
                        borderBottom: '1px solid var(--border-hairline)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                      }}
                    >
                      {/* Left: Window controls and File Tab */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        </div>

                        {/* File Tab */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '7px',
                            backgroundColor: 'rgba(30, 32, 44, 0.7)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
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
                          onClick={() => handleCopyCode(project.id, project.codeExcerpt)}
                          title="Copy source excerpt"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '4px 8px',
                            background: copiedId === project.id ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid',
                            borderColor: copiedId === project.id ? 'var(--accent-violet)' : 'var(--border-hairline)',
                            borderRadius: '3px',
                            color: copiedId === project.id ? '#C4B5FD' : 'var(--text-secondary)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
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
                      style={{
                        padding: '18px 0',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        lineHeight: '1.68',
                        overflowX: 'auto',
                        backgroundColor: 'rgba(6, 6, 10, 0.98)',
                      }}
                    >
                      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <tbody>
                          {lines.map((line, lIdx) => {
                            const lineNum = project.startLine + lIdx;
                            return (
                              <tr key={lIdx} className="code-line-row">
                                <td
                                  style={{
                                    width: '46px',
                                    minWidth: '46px',
                                    paddingRight: '14px',
                                    paddingLeft: '16px',
                                    textAlign: 'right',
                                    color: 'rgba(148, 163, 184, 0.4)',
                                    userSelect: 'none',
                                    fontSize: '0.76rem',
                                    verticalAlign: 'top',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                                  }}
                                >
                                  {lineNum}
                                </td>
                                <td
                                  style={{
                                    paddingLeft: '16px',
                                    paddingRight: '20px',
                                    whiteSpace: 'pre',
                                    color: '#CBD5E1',
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

                    {/* Window Status Bar */}
                    <div
                      style={{
                        padding: '8px 18px',
                        backgroundColor: 'rgba(15, 16, 22, 0.9)',
                        borderTop: '1px solid var(--border-hairline)',
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
            );
          })}
        </div>

        {/* Bottom GitHub Archive Callout */}
        <div
          style={{
            marginTop: 'clamp(64px, 10vw, 100px)',
            padding: '36px',
            backgroundColor: 'rgba(10, 10, 15, 0.85)',
            border: '1px solid var(--border-hairline)',
            borderRadius: '4px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '6px',
              }}
            >
              Explore Repositories & Future Builds
            </h4>
            <p className="body-editorial" style={{ fontSize: '0.94rem' }}>
              All code modules are developed with structured documentation, test inputs, and commit discipline.
            </p>
          </div>

          {githubProfile && githubProfile.url && (
            <a
              href={githubProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-primary"
            >
              <GithubIcon size={16} />
              <span>VISIT GITHUB PROFILE</span>
              <ArrowUpRight size={14} />
            </a>
          )}
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

        .view-repo-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 4px;
          color: #C4B5FD;
          font-family: var(--font-body);
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .view-repo-btn:hover {
          background: rgba(139, 92, 246, 0.24);
          border-color: rgba(139, 92, 246, 0.65);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 18px rgba(139, 92, 246, 0.25);
        }

        .view-repo-btn:hover .repo-arrow {
          transform: translate(2px, -2px);
        }

        .repo-arrow {
          transition: transform 0.2s ease;
        }

        .code-preview-window:hover {
          transform: translateY(-3px);
          border-color: rgba(139, 92, 246, 0.4) !important;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.6) !important;
        }

        .code-line-row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </section>
  );
};
