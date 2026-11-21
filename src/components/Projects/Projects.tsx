import React from 'react';
import { projects, Project } from '../../data/projects';
import { socialLinks } from '../../data/socialLinks';
import { ArrowUpRight, Check } from 'lucide-react';
import { GithubIcon } from '../Icons/Icons';

export const Projects: React.FC = () => {
  const githubProfile = socialLinks.find((s) => s.id === 'github');

  return (
    <section
      id="work"
      style={{
        paddingTop: 'clamp(72px, 12vh, 140px)',
        paddingBottom: 'clamp(72px, 12vh, 140px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <span>03 / SELECTED WORK</span>
          <span style={{ color: 'var(--text-muted)' }}>&mdash; PRACTICAL IMPLEMENTATIONS</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '24px',
            marginBottom: 'clamp(48px, 6vw, 72px)',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                fontWeight: 400,
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Things I've{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent-ink)' }}>
                built.
              </span>
            </h2>
          </div>
          <p
            className="editorial-body"
            style={{ maxWidth: '440px', fontSize: '0.92rem', margin: 0 }}
          >
            A collection of practical programming projects in C and C++, exploring memory structures, stream validation, and procedural algorithms.
          </p>
        </div>

        {/* Project Exhibition Catalogue: Typographic Ledger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 6vw, 80px)' }}>
          {projects.map((project, idx) => {
            const isFeatured = idx < 2; // Give first two larger editorial focus

            return (
              <article
                key={project.id}
                style={{
                  borderTop: '1px solid var(--border-rule)',
                  paddingTop: 'clamp(32px, 4vw, 48px)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'clamp(24px, 4vw, 48px)',
                  alignItems: 'start',
                }}
                className="project-catalogue-item"
              >
                {/* Project Metadata & Title (Left 6-7 cols) */}
                <div
                  style={{
                    gridColumn: 'span 12',
                  }}
                  className="project-text-block"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--accent-iris)',
                      }}
                    >
                      № {project.number}
                    </span>
                    <span style={{ color: 'var(--border-rule-strong)' }}>/</span>
                    <span className="editorial-index-tag" style={{ color: 'var(--text-muted)' }}>
                      {project.language} &middot; {project.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: isFeatured ? 'clamp(1.6rem, 2.4vw, 2.2rem)' : 'clamp(1.3rem, 1.8vw, 1.6rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-primary)',
                      marginBottom: '14px',
                      lineHeight: '1.2',
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="editorial-body"
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '1.65',
                      marginBottom: '20px',
                      maxWidth: '560px',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '24px',
                    }}
                  >
                    {project.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <span style={{ color: 'var(--accent-iris)', marginTop: '2px' }}>&bull;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Links / Status */}
                  <div>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-btn-quiet"
                        style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                      >
                        <GithubIcon size={14} />
                        <span>Source Code</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="editorial-sidenote" style={{ fontSize: '0.74rem' }}>
                        Source code available in local workspace repository
                      </span>
                    )}
                  </div>
                </div>

                {/* Architectural Code Ledger Snippet (Right 5-6 cols) */}
                <div
                  style={{
                    gridColumn: 'span 12',
                    backgroundColor: 'rgba(17, 17, 20, 0.7)',
                    border: '1px solid var(--border-rule)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                  className="project-code-block"
                >
                  <div
                    style={{
                      padding: '10px 16px',
                      borderBottom: '1px solid var(--border-rule)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(11, 11, 13, 0.5)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {project.id}.{project.language === 'C++' ? 'cpp' : 'c'}
                    </span>
                    <span className="editorial-index-tag" style={{ fontSize: '0.68rem', color: 'var(--accent-iris)' }}>
                      LOGIC SPEC
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '18px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      lineHeight: '1.65',
                      color: 'var(--text-secondary)',
                      overflowX: 'auto',
                    }}
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{project.visualConcept.snippet}</code>
                    </pre>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* GitHub Direct Link Callout */}
        {githubProfile && githubProfile.url && (
          <div
            style={{
              marginTop: 'clamp(56px, 8vw, 84px)',
              paddingTop: '28px',
              borderTop: '1px solid var(--border-rule)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                Continuous Coding on GitHub
              </p>
              <p className="editorial-sidenote" style={{ margin: '4px 0 0' }}>
                Practicing daily commits, clean git workflows, and progressive project refactoring.
              </p>
            </div>

            <a
              href={githubProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-btn-quiet"
            >
              <GithubIcon size={15} />
              <span>Visit @{githubProfile.handle}</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .project-text-block {
            grid-column: span 6 !important;
          }
          .project-code-block {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </section>
  );
};
