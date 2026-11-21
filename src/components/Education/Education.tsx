import React from 'react';
import { educationData } from '../../data/education';

export const Education: React.FC = () => {
  return (
    <section
      id="education"
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
          <span>04 / EDUCATION</span>
          <span style={{ color: 'var(--text-muted)' }}>&mdash; ACADEMIC FOUNDATION</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
            borderTop: '1px solid var(--border-rule)',
            paddingTop: '36px',
          }}
        >
          {/* Institution & Status (Left) */}
          <div
            style={{
              gridColumn: 'span 12',
            }}
            className="edu-left-col"
          >
            <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '8px', color: 'var(--accent-iris)' }}>
              UNDERGRADUATE DEGREE
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 3rem)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: '1.1',
                margin: '0 0 10px 0',
              }}
            >
              {educationData.institution}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                margin: '0 0 6px 0',
              }}
            >
              {educationData.degree} in {educationData.major}
            </p>
            <p className="editorial-sidenote" style={{ margin: 0 }}>
              {educationData.status} &middot; {educationData.location}
            </p>
          </div>

          {/* Academic Curriculum Focus (Right) */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
            className="edu-right-col"
          >
            <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '4px' }}>
              CURRICULAR EMPHASIS
            </span>
            {educationData.academicNotes.map((note, idx) => (
              <p
                key={idx}
                className="editorial-body"
                style={{ fontSize: '0.94rem', margin: 0 }}
              >
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .edu-left-col {
            grid-column: span 6 !important;
          }
          .edu-right-col {
            grid-column: span 6 !important;
            border-left: 1px solid var(--border-rule) !important;
            padding-left: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};
