import React from 'react';
import { personalInfo } from '../../data/personalInfo';
import { Terminal, Code2, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        paddingTop: 'clamp(80px, 12vw, 150px)',
        paddingBottom: 'clamp(80px, 12vw, 150px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Section Label */}
        <div className="section-label">01 / ABOUT</div>

        {/* Asymmetrical Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: 'clamp(20px, 4vw, 40px)',
            rowGap: '48px',
          }}
        >
          {/* Left Column: Expressive Headline */}
          <div
            style={{
              gridColumn: 'span 12',
            }}
            className="about-headline-col"
          >
            <h2 className="section-hero-heading" style={{ maxWidth: '820px' }}>
              Curiosity is where{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-violet-light)' }}>
                everything begins.
              </span>
            </h2>
          </div>

          {/* Editorial Content Breakdown: 2 Columns */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(32px, 5vw, 64px)',
              marginTop: '16px',
            }}
          >
            {/* Primary Narrative */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                  lineHeight: '1.65',
                  color: 'var(--text-primary)',
                  fontWeight: 400,
                }}
              >
                {personalInfo.aboutEditorial.paragraphs[0]}
              </p>
              <p className="body-editorial">
                {personalInfo.aboutEditorial.paragraphs[1]}
              </p>
            </div>

            {/* Secondary Narrative & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p className="body-editorial">
                {personalInfo.aboutEditorial.paragraphs[2]}
              </p>
              <p className="body-editorial">
                {personalInfo.aboutEditorial.paragraphs[3]}
              </p>

              {/* Editorial Stat / Identity Strip */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-hairline)',
                  display: 'flex',
                  gap: '36px',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      marginBottom: '4px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    DEGREE PURSUIT
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    B.Tech CSE
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      display: 'block',
                      marginBottom: '4px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    ACADEMIC HOME
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    Galgotias University
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Core Principles / Tenets */}
          <div
            style={{
              gridColumn: 'span 12',
              marginTop: 'clamp(32px, 6vw, 64px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {personalInfo.aboutEditorial.values.map((item) => (
              <div
                key={item.number}
                style={{
                  padding: '28px',
                  backgroundColor: 'rgba(28, 28, 38, 0.65)',
                  border: '1px solid var(--border-hairline)',
                  borderLeft: '2px solid rgba(155, 123, 238, 0.5)',
                  position: 'relative',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
                className="about-principle-card"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--accent-violet-light)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    // {item.number}
                  </span>
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-violet)',
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-principle-card:hover {
          transform: translateY(-3px);
          border-left-color: var(--accent-violet) !important;
          border-color: rgba(139, 92, 246, 0.2) !important;
        }
      `}</style>
    </section>
  );
};
