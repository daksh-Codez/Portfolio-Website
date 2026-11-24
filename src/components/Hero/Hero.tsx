import React from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { ArrowDownRight, ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { personalInfoData } = usePortfolioData();
  const personalInfo = personalInfoData;
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
        {/* Top Tagline Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
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
              {personalInfo.heroHeadline.includes('exploring the art') ? (
                <>
                  {personalInfo.heroHeadline.split('exploring the art')[0].replace(/^\.\s*/, '')}
                  <span className="hero-serif-accent">exploring the art</span>
                  {personalInfo.heroHeadline.split('exploring the art')[1] || ' of building software.'}
                </>
              ) : (
                personalInfo.heroHeadline
              )}
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
            className="hero-action-row"
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
              className="hero-btn-primary"
              aria-label="Navigate to project showcase"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDownRight size={15} className="hero-btn-arrow-down" aria-hidden="true" />
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="hero-btn-secondary"
              aria-label="Navigate to contact section"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={14} className="hero-btn-arrow-up" aria-hidden="true" />
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

        /* -------------------------------------------------------------
         * HERO REFINED CTA BUTTONS (Futuristic Editorial Aesthetic)
         * ----------------------------------------------------------- */
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FFFFFF 0%, #E9E4F5 100%);
          color: #07070B;
          border: 1px solid rgba(255, 255, 255, 0.9);
          font-family: var(--font-body);
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.22), 0 1px 3px rgba(0, 0, 0, 0.12);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease,
                      border-color 0.3s ease;
          user-select: none;
        }

        .hero-btn-primary:hover {
          background: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(167, 139, 250, 0.45), 0 2px 8px rgba(0, 0, 0, 0.16);
          border-color: #FFFFFF;
        }

        .hero-btn-primary:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 12px rgba(139, 92, 246, 0.3);
        }

        .hero-btn-arrow-down {
          color: #07070B;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-btn-primary:hover .hero-btn-arrow-down {
          transform: translate(2px, 2px);
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 26px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.035);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.14);
          font-family: var(--font-body);
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease,
                      color 0.3s ease;
          user-select: none;
        }

        .hero-btn-secondary:hover {
          background: rgba(139, 92, 246, 0.12);
          border-color: rgba(167, 139, 250, 0.55);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 0 22px rgba(139, 92, 246, 0.25);
        }

        .hero-btn-secondary:active {
          transform: translateY(0) scale(0.98);
          background: rgba(139, 92, 246, 0.18);
        }

        .hero-btn-arrow-up {
          color: var(--accent-purple-light);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.3s ease;
        }

        .hero-btn-secondary:hover .hero-btn-arrow-up {
          color: #FFFFFF;
          transform: translate(2px, -2px);
        }

        .hero-btn-primary:focus-visible,
        .hero-btn-secondary:focus-visible {
          outline: 2px solid var(--accent-purple-light);
          outline-offset: 4px;
        }

        @media (max-width: 520px) {
          .hero-action-row {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-btn-primary,
          .hero-btn-secondary,
          .hero-btn-arrow-down,
          .hero-btn-arrow-up {
            transition: none !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};
