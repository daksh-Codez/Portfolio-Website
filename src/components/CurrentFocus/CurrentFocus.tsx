import React from 'react';
import { focusItems } from '../../data/education';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CurrentFocus: React.FC = () => {
  return (
    <section
      id="focus"
      style={{
        paddingTop: 'clamp(80px, 12vw, 150px)',
        paddingBottom: 'clamp(80px, 12vw, 150px)',
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'rgba(10, 10, 14, 0.4)',
      }}
    >
      <div className="editorial-container">
        {/* Section Label */}
        <div className="section-label">05 / TRAJECTORY</div>

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
              Currently{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-violet-light)' }}>
                exploring.
              </span>
            </h2>
          </div>
          <div style={{ maxWidth: '440px' }}>
            <p className="body-editorial" style={{ fontSize: '0.92rem' }}>
              An active commitment to continuous growth, algorithmic depth, real-world utility, and industry readiness.
            </p>
          </div>
        </div>

        {/* Editorial Trajectory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {focusItems.map((item) => (
            <div
              key={item.number}
              style={{
                padding: '32px',
                backgroundColor: 'rgba(18, 18, 25, 0.65)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '200px',
                transition: 'all 0.3s var(--ease-editorial)',
                position: 'relative',
              }}
              className="focus-card"
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--accent-violet-light)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    FOCUS // {item.number}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--accent-violet-light)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '12px',
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    lineHeight: '1.3',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="body-editorial"
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>ACTIVE PROGRESSION</span>
                <ArrowRight size={13} style={{ color: 'var(--accent-violet-light)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .focus-card:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.35) !important;
          background-color: rgba(24, 22, 36, 0.75) !important;
        }
      `}</style>
    </section>
  );
};
