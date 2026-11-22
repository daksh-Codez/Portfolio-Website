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

          {/* Living Availability Indicator */}
          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="hero-status-pill"
            aria-label="Open to internship opportunities - Connect via contact section"
          >
            {/* Ambient Border Sweep Shimmer */}
            <span className="hero-status-border-glow" aria-hidden="true" />

            {/* Pulsing Availability Signal Indicator */}
            <span className="hero-status-pulse-wrapper" aria-hidden="true">
              <span className="hero-status-pulse-halo" />
              <span className="hero-status-pulse-ring" />
              <span className="hero-status-pulse-core" />
            </span>

            {/* Exact Preserved Text */}
            <span className="hero-status-text">
              {personalInfo.status || 'OPEN TO INTERNSHIP OPPORTUNITIES'}
            </span>

            {/* Smooth Directional Arrow */}
            <ArrowUpRight size={13} className="hero-status-arrow" aria-hidden="true" />
          </button>
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
        /* -------------------------------------------------------------
         * LIVING AVAILABILITY INDICATOR (Hero Section)
         * ----------------------------------------------------------- */
        .hero-status-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px 8px 14px;
          border-radius: 9999px;
          background: rgba(13, 12, 22, 0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(167, 139, 250, 0.22);
          box-shadow: 0 2px 14px rgba(0, 0, 0, 0.25), 0 0 16px rgba(139, 92, 246, 0.08);
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.3s ease,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
          user-select: none;
        }

        /* Delicate Continuous Orbital Light Sweep Along Border */
        .hero-status-border-glow {
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          padding: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(139, 92, 246, 0.1) 20%,
            rgba(167, 139, 250, 0.65) 50%,
            rgba(56, 189, 248, 0.5) 70%,
            transparent 100%
          );
          background-size: 200% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: heroBorderSweep 7s linear infinite;
        }

        @keyframes heroBorderSweep {
          0% {
            background-position: -100% 0%;
          }
          100% {
            background-position: 100% 0%;
          }
        }

        /* Pulsing Availability Signal Indicator */
        .hero-status-pulse-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .hero-status-pulse-halo {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-status-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(52, 211, 153, 0.6);
          background: rgba(16, 185, 129, 0.2);
          animation: heroStatusWave 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        @keyframes heroStatusWave {
          0% {
            transform: scale(0.65);
            opacity: 0.95;
          }
          65% {
            transform: scale(1.8);
            opacity: 0;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .hero-status-pulse-core {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.8), 0 0 16px rgba(16, 185, 129, 0.4);
          z-index: 1;
        }

        /* Typography */
        .hero-status-text {
          position: relative;
          z-index: 1;
          font-family: var(--font-body);
          font-size: 0.77rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #DDD6FE;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.3s ease;
        }

        /* Subtle Directional Arrow */
        .hero-status-arrow {
          position: relative;
          z-index: 1;
          color: var(--accent-purple-light);
          opacity: 0.75;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.3s ease,
                      color 0.3s ease;
        }

        /* Interactive Hover State */
        .hero-status-pill:hover {
          background: rgba(139, 92, 246, 0.14);
          border-color: rgba(167, 139, 250, 0.55);
          transform: translateY(-1px) scale(1.018);
          box-shadow: 0 6px 26px rgba(139, 92, 246, 0.28), 0 0 20px rgba(167, 139, 250, 0.18);
        }

        .hero-status-pill:hover .hero-status-text {
          color: #FFFFFF;
        }

        .hero-status-pill:hover .hero-status-arrow {
          transform: translate(2px, -2px);
          opacity: 1;
          color: #FFFFFF;
        }

        /* Active Pressed State */
        .hero-status-pill:active {
          transform: translateY(0) scale(0.985);
          background: rgba(139, 92, 246, 0.22);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.25);
        }

        /* Visible Focus Ring */
        .hero-status-pill:focus-visible {
          outline: 2px solid var(--accent-purple-light);
          outline-offset: 3px;
        }

        @media (max-width: 640px) {
          .hero-status-pill {
            padding: 7px 14px 7px 12px;
            gap: 8px;
          }
          .hero-status-text {
            font-size: 0.72rem;
            letter-spacing: 0.03em;
            white-space: normal;
            line-height: 1.35;
          }
        }

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
          .hero-status-pill,
          .hero-status-border-glow,
          .hero-status-pulse-ring,
          .hero-status-arrow,
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
