import React from 'react';
import { focusItems } from '../../data/education';

export const CurrentFocus: React.FC = () => {
  return (
    <section
      id="focus"
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
          <span>05 / TRAJECTORY</span>
          <span style={{ color: 'var(--text-muted)' }}>&mdash; CURRENT PURSUITS</span>
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
            Currently{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent-ink)' }}>
              exploring.
            </span>
          </h2>

          <p
            className="editorial-body"
            style={{ maxWidth: '440px', fontSize: '0.92rem', margin: 0 }}
          >
            Active learning directions, algorithmic practice, and technical milestones currently shaping my development.
          </p>
        </div>

        {/* Editorial Pursuits List */}
        <div
          style={{
            borderTop: '1px solid var(--border-rule)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {focusItems.map((item) => (
            <div
              key={item.number}
              style={{
                borderBottom: '1px solid var(--border-rule)',
                paddingTop: '24px',
                paddingBottom: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '20px',
                alignItems: 'baseline',
                transition: 'background-color 0.2s ease',
              }}
              className="focus-journal-row"
            >
              {/* Number and Status */}
              <div
                style={{
                  gridColumn: 'span 12',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                className="focus-num-col"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--accent-iris)',
                    fontWeight: 600,
                  }}
                >
                  [{item.number}]
                </span>
                <span className="editorial-index-tag" style={{ color: 'var(--text-muted)' }}>
                  {item.status}
                </span>
              </div>

              {/* Title */}
              <div
                style={{
                  gridColumn: 'span 12',
                }}
                className="focus-title-col"
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <div
                style={{
                  gridColumn: 'span 12',
                }}
                className="focus-desc-col"
              >
                <p className="editorial-body" style={{ fontSize: '0.92rem', margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .focus-num-col {
            grid-column: span 3 !important;
          }
          .focus-title-col {
            grid-column: span 4 !important;
          }
          .focus-desc-col {
            grid-column: span 5 !important;
          }
        }
        .focus-journal-row:hover {
          background-color: rgba(23, 23, 28, 0.4);
        }
      `}</style>
    </section>
  );
};
