import React from 'react';
import { personalInfo } from '../../data/personalInfo';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="top"
      style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(120px, 18vh, 180px)',
        paddingBottom: 'clamp(64px, 10vh, 100px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="page-container">
        {/* Editorial Top Folio */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-rule)',
            marginBottom: 'clamp(36px, 6vw, 64px)',
          }}
        >
          <span className="editorial-index-tag" style={{ color: 'var(--text-muted)' }}>
            STUDENT PROFILE &middot; {personalInfo.location.toUpperCase()}
          </span>
          <span className="editorial-index-tag" style={{ color: 'var(--accent-iris)' }}>
            FOLIO // {new Date().getFullYear()}
          </span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
          }}
        >
          {/* Main Narrative Col (Left / Center) */}
          <div
            style={{
              gridColumn: 'span 12',
            }}
            className="hero-main-col"
          >
            {/* Elegant Name Presentation */}
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                ASPIRING SOFTWARE DEVELOPER
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(3rem, 6.5vw, 5.8rem)',
                  fontWeight: 400,
                  lineHeight: '1.02',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                Daksh Goswami<span style={{ color: 'var(--accent-iris)' }}>.</span>
              </h1>
            </div>

            {/* Expressive Editorial Headline */}
            <p
              className="editorial-italic-lead"
              style={{
                maxWidth: '780px',
                marginBottom: '28px',
                color: 'var(--text-primary)',
              }}
            >
              Computer Science student exploring the procedural craft of C & C++, foundational systems, and practical digital products.
            </p>

            {/* Body Narrative */}
            <p
              className="editorial-body"
              style={{
                maxWidth: '640px',
                fontSize: 'clamp(1rem, 1.15vw, 1.15rem)',
                marginBottom: 'clamp(32px, 5vw, 44px)',
              }}
            >
              I am an undergraduate at Galgotias University passionate about understanding how software works from first principles. Rather than relying on superficial layers, I enjoy practicing structured programming, building console utilities, and turning ideas into dependable code.
            </p>

            {/* Quiet, Deliberate Navigation Actions */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <button
                onClick={() => scrollTo('#work')}
                className="editorial-btn-primary"
              >
                <span>View selected work</span>
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="editorial-btn-quiet"
              >
                <span>Get in touch</span>
              </button>
            </div>
          </div>

          {/* Editorial Marginalia / Side Context (Right) */}
          <div
            style={{
              gridColumn: 'span 12',
              borderTop: '1px solid var(--border-rule)',
              paddingTop: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            className="hero-sidenote-col"
          >
            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '6px' }}>
                INSTITUTION & DEGREE
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
                {personalInfo.university}
              </p>
              <p className="editorial-sidenote" style={{ margin: '2px 0 0' }}>
                B.Tech in Computer Science Engineering
              </p>
            </div>

            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '6px' }}>
                CURRENT AVAILABILITY
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
                Open to Internship Opportunities
              </p>
              <p className="editorial-sidenote" style={{ margin: '2px 0 0' }}>
                Seeking summer & semester engineering roles
              </p>
            </div>

            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '6px' }}>
                CORE FOCUS
              </span>
              <p className="editorial-sidenote" style={{ margin: 0 }}>
                Low-level C/C++ memory models, data structures, and practical software design.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-main-col {
            grid-column: span 8 !important;
          }
          .hero-sidenote-col {
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
