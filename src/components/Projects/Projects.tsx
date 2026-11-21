import React, { useState } from 'react';
import { projects, Project } from '../../data/projects';
import { socialLinks } from '../../data/socialLinks';
import { ArrowUpRight, Code, CheckCircle2, Terminal } from 'lucide-react';
import { GithubIcon } from '../Icons/Icons';

export const Projects: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);

  const githubProfile = socialLinks.find((s) => s.id === 'github');

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
          <div style={{ maxWidth: '460px' }}>
            <p className="body-editorial">
              A growing collection of projects, experiments, and practical programming work focused on low-level systems, file storage, and algorithm logic.
            </p>
          </div>
        </div>

        {/* Editorial Project Showcase: Alternating Asymmetric Layouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 8vw, 96px)' }}>
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProjectId(project.id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'clamp(24px, 4vw, 48px)',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: 'clamp(32px, 5vw, 64px)',
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

                  {/* Metadata & Actions */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: '2px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <Code size={14} style={{ color: 'var(--accent-violet-light)' }} />
                      {project.language}
                    </span>

                    {/* GitHub Link (Only rendered when configured) */}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial-ghost"
                        style={{ padding: '8px 18px', fontSize: '0.78rem' }}
                      >
                        <GithubIcon size={14} />
                        <span>Source Code</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                          padding: '6px 12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px dashed var(--border-hairline)',
                          borderRadius: '2px',
                        }}
                      >
                        Source available in local development suite
                      </span>
                    )}
                  </div>
                </div>

                {/* Visual Architecture Preview Column */}
                <div
                  style={{
                    gridColumn: 'span 12',
                    order: isEven ? 1 : 2,
                  }}
                  className={`project-visual-col ${isEven ? 'order-desktop-1' : 'order-desktop-2'}`}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(16, 16, 23, 0.92)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--border-hairline)',
                      borderTop: `2px solid ${project.visualConcept.accentColor}`,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
                      transition: 'border-color 0.3s ease, transform 0.3s ease',
                    }}
                    className="code-preview-window"
                  >
                    {/* Window Title Bar */}
                    <div
                      style={{
                        padding: '12px 18px',
                        backgroundColor: 'rgba(22, 22, 30, 0.95)',
                        borderBottom: '1px solid var(--border-hairline)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            color: 'var(--text-secondary)',
                            marginLeft: '8px',
                          }}
                        >
                          {project.id}.{project.language === 'C++' ? 'cpp' : 'c'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Terminal size={13} style={{ color: 'var(--accent-violet-light)' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                          }}
                        >
                          READONLY
                        </span>
                      </div>
                    </div>

                    {/* Code Snippet Display */}
                    <div
                      style={{
                        padding: '24px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        overflowX: 'auto',
                      }}
                    >
                      <pre style={{ margin: 0 }}>
                        <code>{project.visualConcept.snippet}</code>
                      </pre>
                    </div>

                    {/* Window Footer Meta */}
                    <div
                      style={{
                        padding: '10px 18px',
                        backgroundColor: 'rgba(10, 10, 14, 0.6)',
                        borderTop: '1px solid var(--border-hairline)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          color: 'var(--text-muted)',
                        }}
                      >
                        PARADIGM: {project.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--accent-violet-light)',
                        }}
                      >
                        UTF-8 / LF
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
            backgroundColor: 'rgba(18, 18, 26, 0.75)',
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
        .code-preview-window:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.4) !important;
        }
      `}</style>
    </section>
  );
};
