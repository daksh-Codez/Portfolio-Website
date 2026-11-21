import React from 'react';
import { educationData } from '../../data/education';
import { GraduationCap, MapPin, BookOpen, Award } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      style={{
        paddingTop: 'clamp(80px, 12vw, 150px)',
        paddingBottom: 'clamp(80px, 12vw, 150px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Section Label */}
        <div className="section-label">04 / EDUCATION</div>

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
              The{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-violet-light)' }}>
                foundation.
              </span>
            </h2>
          </div>
          <div style={{ maxWidth: '420px' }}>
            <p className="body-editorial" style={{ fontSize: '0.92rem' }}>
              Academic foundations anchoring theoretical principles, computational theory, and rigorous engineering methodology.
            </p>
          </div>
        </div>

        {/* Distinctive Editorial Timeline Composition */}
        <div
          style={{
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: '48px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(24px, 4vw, 48px)',
            }}
          >
            {/* Left: Timeframe & Status */}
            <div
              style={{
                gridColumn: 'span 12',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
              className="edu-status-col"
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-violet-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <GraduationCap size={16} />
                <span>UNDERGRADUATE STUDIES</span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.98rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                }}
              >
                {educationData.status}
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  marginTop: '4px',
                }}
              >
                <MapPin size={14} style={{ color: 'var(--accent-violet)' }} />
                <span>{educationData.location}</span>
              </div>
            </div>

            {/* Middle: Degree & University */}
            <div
              style={{
                gridColumn: 'span 12',
              }}
              className="edu-main-col"
            >
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}
              >
                {educationData.institution}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)',
                  color: 'var(--accent-violet-light)',
                  fontStyle: 'italic',
                  marginBottom: '24px',
                }}
              >
                {educationData.degree} in {educationData.major}
              </p>

              {/* Academic Highlights */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingLeft: '16px',
                  borderLeft: '1px solid rgba(139, 92, 246, 0.3)',
                }}
              >
                {educationData.academicNotes.map((note, idx) => (
                  <p
                    key={idx}
                    className="body-editorial"
                    style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .edu-status-col {
            grid-column: span 4 !important;
          }
          .edu-main-col {
            grid-column: span 8 !important;
          }
        }
      `}</style>
    </section>
  );
};
