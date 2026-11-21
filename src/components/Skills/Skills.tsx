import React, { useState } from 'react';
import { skillGroups } from '../../data/skills';
import { Terminal, Database, Globe, Wrench, ChevronRight } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState(skillGroups[0].id);

  const getGroupIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Terminal size={18} />;
      case 'web':
        return <Globe size={18} />;
      case 'database':
        return <Database size={18} />;
      case 'tools':
      default:
        return <Wrench size={18} />;
    }
  };

  return (
    <section
      id="skills"
      style={{
        paddingTop: 'clamp(80px, 12vw, 150px)',
        paddingBottom: 'clamp(80px, 12vw, 150px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="section-label">02 / CAPABILITIES</div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
          <div>
            <h2 className="section-hero-heading">
              Tools of my{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-violet-light)' }}>
                trade.
              </span>
            </h2>
          </div>
          <div style={{ maxWidth: '420px' }}>
            <p className="body-editorial" style={{ fontSize: '0.92rem' }}>
              A disciplined repertoire of programming languages, foundational web technologies, database principles, and development tooling.
            </p>
          </div>
        </div>

        {/* Editorial Layout: Left Navigation / Categories + Right Expanded Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 4vw, 40px)',
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.id}
              style={{
                gridColumn: 'span 12',
                borderTop: '1px solid var(--border-hairline)',
                paddingTop: '32px',
                paddingBottom: '32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '20px',
                transition: 'background-color 0.2s ease',
              }}
              className="skill-category-row"
            >
              {/* Category Metadata */}
              <div
                style={{
                  gridColumn: 'span 12',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                className="category-meta-col"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--accent-violet-light)',
                  }}
                >
                  {group.index}
                </span>
                <div
                  style={{
                    color: 'var(--accent-violet)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {getGroupIcon(group.id)}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.02rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Summary Description */}
              <div
                style={{
                  gridColumn: 'span 12',
                  maxWidth: '520px',
                }}
                className="category-desc-col"
              >
                <p className="body-editorial" style={{ fontSize: '0.94rem' }}>
                  {group.summary}
                </p>
              </div>

              {/* Skills Grid */}
              <div
                style={{
                  gridColumn: 'span 12',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '16px',
                  marginTop: '12px',
                }}
              >
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      padding: '20px 24px',
                      backgroundColor: 'rgba(28, 28, 38, 0.72)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      transition: 'all 0.25s var(--ease-editorial)',
                      position: 'relative',
                    }}
                    className="skill-pill-card"
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-violet)',
                          opacity: 0.75,
                        }}
                      />
                    </div>
                    {skill.tag && (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.84rem',
                          fontWeight: 500,
                          color: 'var(--text-secondary)',
                          lineHeight: '1.5',
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
        .skill-pill-card:hover {
          border-color: rgba(139, 92, 246, 0.4) !important;
          background-color: rgba(30, 27, 46, 0.5) !important;
          transform: translateY(-2px);
        }
        @media (min-width: 900px) {
          .category-meta-col {
            grid-column: span 3 !important;
          }
          .category-desc-col {
            grid-column: span 3 !important;
          }
          .skill-category-row > div:nth-child(3) {
            grid-column: span 6 !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
