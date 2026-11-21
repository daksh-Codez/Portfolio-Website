import React from 'react';
import { skillGroups } from '../../data/skills';

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
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
          <span>02 / CAPABILITIES</span>
          <span style={{ color: 'var(--text-muted)' }}>&mdash; TECHNICAL INVENTORY</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '24px',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
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
            Tools of my{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent-ink)' }}>
              trade.
            </span>
          </h2>

          <p
            className="editorial-body"
            style={{ maxWidth: '420px', fontSize: '0.92rem', margin: 0 }}
          >
            A disciplined inventory of languages, frameworks, and developer tools learned through hands-on practice, without exaggerated claims.
          </p>
        </div>

        {/* Technical Ledger / Spec-Sheet Layout */}
        <div
          style={{
            borderTop: '1px solid var(--border-rule)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.id}
              style={{
                borderBottom: '1px solid var(--border-rule)',
                paddingTop: '28px',
                paddingBottom: '28px',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '24px',
                alignItems: 'baseline',
              }}
              className="skills-ledger-row"
            >
              {/* Category Col (4 cols) */}
              <div
                style={{
                  gridColumn: 'span 12',
                }}
                className="skills-cat-col"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="editorial-index-tag" style={{ color: 'var(--accent-iris)' }}>
                    [{group.index}]
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      letterSpacing: '0.04em',
                      color: 'var(--text-primary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {group.category}
                  </span>
                </div>
                <p className="editorial-sidenote" style={{ marginTop: '6px', maxWidth: '320px' }}>
                  {group.summary}
                </p>
              </div>

              {/* Items List (8 cols) */}
              <div
                style={{
                  gridColumn: 'span 12',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
                className="skills-items-col"
              >
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(23, 23, 28, 0.4)',
                      borderLeft: '2px solid transparent',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                    }}
                    className="skill-spec-entry"
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {skill.name}
                    </span>

                    {skill.tag && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {skill.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .skills-cat-col {
            grid-column: span 4 !important;
          }
          .skills-items-col {
            grid-column: span 8 !important;
          }
        }
        .skill-spec-entry:hover {
          background-color: rgba(31, 31, 38, 0.7) !important;
          border-left-color: var(--accent-iris) !important;
        }
      `}</style>
    </section>
  );
};
