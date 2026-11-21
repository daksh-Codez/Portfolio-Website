import React from 'react';
import { personalInfo } from '../../data/personalInfo';
import { ArrowDownRight, Compass, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(110px, 16vh, 160px)',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Top Meta Status Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: 'clamp(28px, 4.5vw, 48px)',
          }}
        >
          {/* Tagline */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-violet)',
                boxShadow: '0 0 10px var(--accent-violet)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
              }}
            >
              {personalInfo.tagline}
            </span>
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 16px',
              background: 'rgba(155, 123, 238, 0.12)',
              border: '1px solid rgba(155, 123, 238, 0.28)',
              borderRadius: '20px',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981',
                animation: 'pulse 2s infinite ease-in-out',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: 'var(--accent-violet-light)',
                textTransform: 'uppercase',
              }}
            >
              {personalInfo.status}
            </span>
          </div>
        </div>

        {/* Editorial Giant Typography */}
        <div style={{ maxWidth: '980px', position: 'relative' }}>
          <h1 className="hero-title">
            <span>DAKSH</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>
              GOSWAMI<span style={{ color: 'var(--accent-violet)' }}>.</span>
            </span>
          </h1>

          {/* Supporting Headline with Serif accent */}
          <div
            style={{
              marginTop: 'clamp(24px, 3.5vw, 36px)',
              maxWidth: '680px',
            }}
          >
            <p className="editorial-lead">
              {personalInfo.heroHeadline.split('exploring the art')[0]}
              <span className="hero-serif-accent">exploring the art</span> of building software.
            </p>
          </div>

          {/* Editorial Paragraph */}
          <div
            style={{
              marginTop: '20px',
              maxWidth: '580px',
            }}
          >
            <p className="body-editorial" style={{ color: 'var(--text-secondary)' }}>
              {personalInfo.heroBio}
            </p>
          </div>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: 'clamp(32px, 5vw, 44px)',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => scrollTo('#work')}
              className="btn-editorial-primary"
              aria-label="Navigate to project showcase"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDownRight size={17} />
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="btn-editorial-ghost"
              aria-label="Navigate to contact section"
            >
              <span>GET IN TOUCH</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Scroll Teaser */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginTop: 'clamp(48px, 9vw, 84px)',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-hairline)',
          }}
        >
          <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
            <div>
              <span
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                DISCIPLINE
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {personalInfo.degree}
              </span>
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                LOCATION
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {personalInfo.location}
              </span>
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                CAMPUS
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {personalInfo.university}
              </span>
            </div>
          </div>

          {/* Subtle Scroll Cue */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
            }}
          >
            <span>SCROLL TO DISCOVER</span>
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '14px',
                backgroundColor: 'var(--accent-violet)',
                borderRadius: '1px',
                animation: 'bounceIndicator 1.8s infinite ease-in-out',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.25); }
        }
        @keyframes bounceIndicator {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  );
};
