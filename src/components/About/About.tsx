import React from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { SectionLabel } from '../SectionLabel/SectionLabel';

export const About: React.FC = () => {
  const { personalInfoData } = usePortfolioData();
  const personalInfo = personalInfoData;

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
        <SectionLabel id="about" />

        {/* Asymmetrical Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: 'clamp(20px, 4vw, 40px)',
            rowGap: 'clamp(28px, 4vw, 48px)',
          }}
        >
          {/* Left Column: Expressive Headline */}
          <div
            style={{
              gridColumn: 'span 12',
            }}
            className="about-headline-col"
          >
            <h2 className="section-hero-heading" style={{ maxWidth: '820px', margin: 0 }}>
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
              marginTop: '8px',
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
                  margin: 0,
                }}
              >
                {personalInfo.aboutEditorial.paragraphs[0]}
              </p>
              <p className="body-editorial" style={{ margin: 0 }}>
                {personalInfo.aboutEditorial.paragraphs[1]}
              </p>
            </div>

            {/* Secondary Narrative & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p className="body-editorial" style={{ margin: 0 }}>
                {personalInfo.aboutEditorial.paragraphs[2]}
              </p>
              <p className="body-editorial" style={{ margin: 0 }}>
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
        </div>
      </div>
    </section>
  );
};
