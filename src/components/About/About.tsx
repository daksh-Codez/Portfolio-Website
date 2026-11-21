import React from 'react';
import { personalInfo } from '../../data/personalInfo';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        paddingTop: 'clamp(72px, 12vh, 140px)',
        paddingBottom: 'clamp(72px, 12vh, 140px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="page-container">
        {/* Section Index Marker */}
        <div className="editorial-section-header">
          <span>01 / ABOUT</span>
          <span style={{ color: 'var(--text-muted)' }}>&mdash; INTENT &amp; BACKGROUND</span>
        </div>

        {/* Editorial Layout: Left Narrative Column + Right Marginal Notes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Main Story Essay (Spans 8 columns on desktop) */}
          <div
            style={{
              gridColumn: 'span 12',
            }}
            className="about-essay-col"
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                fontWeight: 400,
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 'clamp(24px, 4vw, 36px)',
              }}
            >
              Curiosity is where{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent-ink)' }}>
                everything begins.
              </span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <p className="editorial-body-large">
                I am a Computer Science Engineering undergraduate at Galgotias University with a genuine fascination for programming, low-level mechanics, and software craftsmanship.
              </p>

              <p className="editorial-body">
                Rather than jumping straight to high-level abstractions or superficial tutorials, I have prioritized learning how computers actually execute instructions. Working in C and C++ has given me a deep appreciation for procedural structure, memory allocation, and algorithmic trade-offs.
              </p>

              <p className="editorial-body">
                My work so far reflects this philosophy: console-based student management systems with custom file I/O, expense ledgers with structured records, and mathematical calculators built to practice clean control flow. Each project is an intentional exercise in turning logic into functional software.
              </p>

              <p className="editorial-body">
                Currently, my goal is straightforward: continue strengthening my problem-solving fundamentals, explore real-world software engineering workflows, and contribute to an engineering team as an intern.
              </p>
            </div>
          </div>

          {/* Editorial Marginalia / Side Context (Spans 4 columns on desktop) */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              borderTop: '1px solid var(--border-rule)',
              paddingTop: '28px',
            }}
            className="about-marginalia-col"
          >
            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '8px', color: 'var(--accent-iris)' }}>
                NOTE &middot; 01 // FIRST PRINCIPLES
              </span>
              <p className="editorial-sidenote">
                Valuing memory pointers, data types, and deterministic execution before relying on complex framework abstractions.
              </p>
            </div>

            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '8px', color: 'var(--accent-iris)' }}>
                NOTE &middot; 02 // DELIBERATE PRACTICE
              </span>
              <p className="editorial-sidenote">
                Writing code incrementally, reading compiler errors carefully, and building functional tools in the terminal.
              </p>
            </div>

            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '8px', color: 'var(--accent-iris)' }}>
                NOTE &middot; 03 // AMBITION
              </span>
              <p className="editorial-sidenote">
                Preparing for software engineering internships to test skills against real-world systems and collaborate with experienced engineers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .about-essay-col {
            grid-column: span 8 !important;
          }
          .about-marginalia-col {
            grid-column: span 4 !important;
            border-top: none !important;
            border-left: 1px solid var(--border-rule) !important;
            padding-top: 0 !important;
            padding-left: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};
