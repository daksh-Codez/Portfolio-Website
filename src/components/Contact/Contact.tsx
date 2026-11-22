import React, { useState } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import { renderSocialIcon } from '../Icons/Icons';
import { SectionLabel } from '../SectionLabel/SectionLabel';

export const Contact: React.FC = () => {
  const { socialLinksList, personalInfoData } = usePortfolioData();
  const personalInfo = personalInfoData;
  const [copied, setCopied] = useState(false);
  const contactEmail = personalInfo.email?.trim() || 'Dakshgoswami4077@gmail.com';

  // Three canonical social connections
  const canonicalSocial = [
    {
      id: 'github',
      label: 'GitHub',
      handle: '@daksh-Codez',
      url: 'https://github.com/daksh-Codez',
      platform: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: '@Daksh Goswami',
      url: 'https://linkedin.com/in/daksh-goswami',
      platform: 'linkedin',
    },
    {
      id: 'codolio',
      label: 'Codolio',
      handle: '@dakshCodez',
      url: 'https://codolio.com/profile/dakshCodez',
      platform: 'codolio',
    },
  ];

  // Merge with live social links if customized via CMS
  const activeSocialLinks = canonicalSocial.map((canon) => {
    const live = socialLinksList.find(
      (s) =>
        s.platform?.toLowerCase() === canon.platform ||
        s.id?.toLowerCase() === canon.id ||
        s.label?.toLowerCase() === canon.label.toLowerCase()
    );
    return live ? { ...canon, url: live.url || canon.url, handle: live.handle || canon.handle } : canon;
  });

  const copyEmail = () => {
    if (contactEmail) {
      navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      className="contact-transparent-section"
      aria-label="Contact Section"
    >
      {/* ===================================================================== */}
      {/* ATMOSPHERIC LAYER: Non-blocking, transparent SVG orbital & horizon curves */}
      {/* The animated 3D background canvas shines continuously through here!   */}
      {/* ===================================================================== */}
      <div className="contact-atmosphere-layer" aria-hidden="true">
        <svg
          className="contact-atmosphere-svg"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Horizon Rim Gradient */}
            <linearGradient id="contactRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(167, 139, 250, 0)" />
              <stop offset="25%" stopColor="rgba(167, 139, 250, 0.35)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="75%" stopColor="rgba(167, 139, 250, 0.35)" />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
            </linearGradient>

            {/* Subtle Horizon Haze */}
            <radialGradient id="contactHaze" cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.12)" />
              <stop offset="60%" stopColor="rgba(109, 40, 217, 0.03)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>

            {/* Glow Filter */}
            <filter id="contactHorizonGlow" x="-20%" y="-30%" width="140%" height="160%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Delicate Faint Orbital Curves (transparent, non-blocking) */}
          <ellipse
            cx="46%"
            cy="52%"
            rx="580"
            ry="190"
            fill="none"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeDasharray="4 8"
          />
          <ellipse
            cx="52%"
            cy="46%"
            rx="440"
            ry="140"
            fill="none"
            stroke="rgba(167, 139, 250, 0.05)"
            strokeDasharray="3 6"
            transform="rotate(-4 600 280)"
          />

          {/* Soft Planetary Horizon Arc (transparent fill, subtle illuminated edge) */}
          <ellipse cx="50%" cy="96%" rx="520" ry="80" fill="url(#contactHaze)" />
          <path
            d="M -30,100% C 320,84% 880,84% 1230,100%"
            fill="none"
            stroke="url(#contactRimGrad)"
            strokeWidth="1.5"
            filter="url(#contactHorizonGlow)"
          />
        </svg>
      </div>

      <div className="editorial-container contact-inner-container">
        {/* ===================================================================== */}
        {/* PRESERVED MAIN HEADING & EDITORIAL STATEMENT (Unchanged)              */}
        {/* ===================================================================== */}
        <SectionLabel id="contact" />

        <div className="contact-editorial-header">
          <h2 className="contact-editorial-heading">
            Let's create something{' '}
            <span className="serif-meaningful-accent">meaningful.</span>
          </h2>

          <p className="contact-editorial-sub">
            I'm always interested in connecting with people, exploring opportunities,
            and discussing ideas around technology and software development.
          </p>
        </div>

        {/* ===================================================================== */}
        {/* REFINED CONTACT COMPOSITION STAGE (No Cards, Transparent, Open)       */}
        {/* ===================================================================== */}
        <div className="contact-composition-stage">

          {/* ------------------------------------------------------------------- */}
          {/* LEFT: EXPANDED EMAIL FOCAL AREA & ORGANIC CAPSULE ACTIONS          */}
          {/* ------------------------------------------------------------------- */}
          <div className="contact-email-column">

            {/* The Email Main Visual Focal Point — Fits on one line on desktop */}
            <div className="email-interactive-wrapper">
              {/* Soft ambient violet glow aura */}
              <div className="email-ambient-halo" aria-hidden="true" />

              <a
                href={`mailto:${contactEmail}`}
                className="email-focal-link"
                aria-label={`Send email to ${contactEmail}`}
              >
                <span className="email-focal-text">{contactEmail}</span>
                <span className="email-arrow-badge" aria-hidden="true">
                  <ArrowUpRight size={24} className="email-arrow-icon" />
                </span>
              </a>
            </div>

            {/* Tactile Pill-Shaped Capsule Actions (Fully Rounded, Illuminated) */}
            <div className="capsule-actions-row">
              {/* Open Mail Client Capsule */}
              <a
                href={`mailto:${contactEmail}`}
                className="contact-capsule-btn capsule-primary"
              >
                <Mail size={15} className="capsule-icon" />
                <span>OPEN MAIL CLIENT</span>
                <ArrowUpRight size={14} className="capsule-arrow" aria-hidden="true" />
              </a>

              {/* Copy Address Capsule */}
              <button
                type="button"
                onClick={copyEmail}
                className={`contact-capsule-btn capsule-ghost ${copied ? 'is-copied' : ''}`}
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <Check size={15} className="capsule-check" style={{ color: '#34D399' }} />
                ) : (
                  <Copy size={15} className="capsule-icon" />
                )}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* RIGHT: THREE ELEGANT INTERACTIVE SOCIAL ROWS                       */}
          {/* ------------------------------------------------------------------- */}
          <div className="contact-social-column">
            <div className="social-interactive-rows">
              {activeSocialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-row-plate"
                  aria-label={`${link.label} — ${link.handle}`}
                >
                  {/* Left: Platform Icon & Identity */}
                  <div className="social-identity-cluster">
                    <div className="social-icon-orb">
                      {renderSocialIcon(link.platform, 18)}
                    </div>
                    <div className="social-text-stack">
                      <span className="social-platform-title">{link.label}</span>
                      <span className="social-handle-sub">{link.handle}</span>
                    </div>
                  </div>

                  {/* Right: Directional Animated Arrow */}
                  <div className="social-arrow-col" aria-hidden="true">
                    <ArrowUpRight size={17} className="social-arrow-icon" />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ===================================================================== */}
      {/* COMPONENT STYLES                                                      */}
      {/* ===================================================================== */}
      <style>{`
        /* ---------------------------------------------------------------------
         * SECTION BASE: 100% TRANSPARENT BACKGROUND
         * Lets the animated 3D canvas flow seamlessly behind the section!
         * ------------------------------------------------------------------- */
        .contact-transparent-section {
          position: relative;
          z-index: 2;
          padding-top: clamp(80px, 13vw, 160px);
          padding-bottom: clamp(90px, 14vw, 160px);
          background: transparent !important;
          background-color: transparent !important;
          overflow: hidden;
        }

        .contact-atmosphere-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .contact-atmosphere-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .contact-inner-container {
          position: relative;
          z-index: 1;
        }

        /* ---------------------------------------------------------------------
         * COHESIVE EDITORIAL HEADING & INTRO COMPOSITION
         * ------------------------------------------------------------------- */
        .contact-editorial-header {
          width: 100%;
          /* Refined vertical spacing: moved contact details group upward by ~30px */
          margin-bottom: clamp(20px, 3.2vw, 46px);
        }

        .contact-editorial-heading {
          font-family: var(--font-serif);
          font-size: clamp(2.35rem, 6.2vw, 3.6rem);
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          font-weight: 400;
          margin: 0;
          text-align: left;
        }

        @media (min-width: 960px) {
          .contact-editorial-heading {
            white-space: nowrap;
            font-size: clamp(2.9rem, 4.85vw, 5.05rem);
            line-height: 1.04;
          }
        }

        .serif-meaningful-accent {
          font-style: italic;
          color: var(--accent-violet-light);
        }

        .contact-editorial-sub {
          font-family: var(--font-body);
          font-size: clamp(1.1rem, 1.35vw, 1.28rem);
          line-height: 1.72;
          max-width: clamp(540px, 52vw, 660px);
          color: var(--text-secondary);
          margin: clamp(22px, 2.5vw, 32px) 0 0 0;
          text-align: left;
        }

        /* ---------------------------------------------------------------------
         * REFINED CONTACT COMPOSITION STAGE
         * ------------------------------------------------------------------- */
        .contact-composition-stage {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(44px, 6vw, 76px);
          align-items: center;
        }

        @media (min-width: 960px) {
          .contact-composition-stage {
            /* Generous width allocation so email fits comfortably on one line */
            grid-template-columns: 1.55fr 1fr;
            gap: clamp(48px, 6vw, 88px);
          }
        }

        /* ---------------------------------------------------------------------
         * LEFT: EXPANDED EMAIL FOCAL AREA & ACTIONS
         * ------------------------------------------------------------------- */
        .contact-email-column {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .email-interactive-wrapper {
          position: relative;
          padding: 8px 0;
          width: fit-content;
          max-width: 100%;
        }

        /* Ambient violet halo behind email */
        .email-ambient-halo {
          position: absolute;
          inset: -20px -30px;
          background: radial-gradient(
            ellipse 85% 65% at 30% 50%,
            rgba(139, 92, 246, 0.14) 0%,
            rgba(109, 40, 217, 0.03) 55%,
            transparent 75%
          );
          pointer-events: none;
          opacity: 0.65;
          transition: opacity 0.4s ease;
        }

        .email-interactive-wrapper:hover .email-ambient-halo {
          opacity: 1;
          background: radial-gradient(
            ellipse 90% 70% at 30% 50%,
            rgba(167, 139, 250, 0.24) 0%,
            rgba(139, 92, 246, 0.08) 60%,
            transparent 80%
          );
        }

        .email-focal-link {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Fits on one line on desktop without clipping */
        .email-focal-text {
          font-family: var(--font-body);
          font-size: clamp(1.4rem, 2.55vw, 2.35rem);
          font-weight: 600;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          line-height: 1.15;
          white-space: nowrap;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .email-arrow-badge {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .email-arrow-icon {
          color: var(--accent-purple-light);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .email-focal-link:hover .email-focal-text {
          color: #FFFFFF;
          text-shadow: 0 0 28px rgba(167, 139, 250, 0.5);
        }

        .email-focal-link:hover .email-arrow-badge {
          background: rgba(139, 92, 246, 0.28);
          border-color: rgba(167, 139, 250, 0.65);
          box-shadow: 0 0 22px rgba(139, 92, 246, 0.4);
          transform: scale(1.06);
        }

        .email-focal-link:hover .email-arrow-icon {
          color: #FFFFFF;
          transform: translate(3px, -3px);
        }

        /* ---------------------------------------------------------------------
         * TACTILE CAPSULE ACTIONS (Fully Rounded, Pill-Shaped)
         * ------------------------------------------------------------------- */
        .capsule-actions-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
        }

        .contact-capsule-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          border-radius: 9999px; /* Fully rounded capsule / pill */
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-decoration: none;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }

        /* Capsule Primary (Open Mail Client) */
        .capsule-primary {
          background: rgba(139, 92, 246, 0.16);
          border: 1px solid rgba(167, 139, 250, 0.45);
          color: #FFFFFF;
          box-shadow: 0 4px 18px rgba(139, 92, 246, 0.2);
        }

        .capsule-primary:hover {
          background: rgba(139, 92, 246, 0.32);
          border-color: rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 6px 26px rgba(139, 92, 246, 0.45);
        }

        .capsule-arrow {
          color: var(--accent-purple-light);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .capsule-primary:hover .capsule-arrow {
          color: #FFFFFF;
          transform: translate(2px, -2px);
        }

        /* Capsule Ghost (Copy Address) */
        .capsule-ghost {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
        }

        .capsule-ghost:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(167, 139, 250, 0.45);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);
        }

        .capsule-ghost.is-copied {
          border-color: rgba(52, 211, 153, 0.6);
          background: rgba(52, 211, 153, 0.1);
          color: #FFFFFF;
        }

        /* ---------------------------------------------------------------------
         * RIGHT: THREE ELEGANT INTERACTIVE SOCIAL ROWS
         * ------------------------------------------------------------------- */
        .contact-social-column {
          display: flex;
          flex-direction: column;
        }

        .social-interactive-rows {
          display: flex;
          flex-direction: column;
        }

        .social-row-plate {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 14px;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .social-row-plate:first-child {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .social-identity-cluster {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .social-icon-orb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .social-text-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .social-platform-title {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }

        .social-handle-sub {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-secondary);
          transition: color 0.25s ease;
        }

        .social-arrow-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-arrow-icon {
          color: var(--text-muted);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.3s ease;
        }

        /* Hover Interaction on Social Rows */
        .social-row-plate:hover {
          background-color: rgba(139, 92, 246, 0.05);
          padding-left: 20px;
          padding-right: 8px;
        }

        .social-row-plate:hover .social-icon-orb {
          background-color: rgba(139, 92, 246, 0.2);
          border-color: rgba(167, 139, 250, 0.45);
          color: #FFFFFF;
          transform: scale(1.05);
        }

        .social-row-plate:hover .social-platform-title {
          color: #FFFFFF;
        }

        .social-row-plate:hover .social-handle-sub {
          color: var(--accent-purple-light);
        }

        .social-row-plate:hover .social-arrow-icon {
          color: #FFFFFF;
          transform: translate(3px, -3px);
        }

        /* ---------------------------------------------------------------------
         * MOBILE & RESPONSIVE BEHAVIOR
         * ------------------------------------------------------------------- */
        @media (max-width: 900px) {
          .email-focal-text {
            white-space: normal;
            word-break: break-all;
            font-size: clamp(1.3rem, 5vw, 1.85rem);
          }
        }

        @media (max-width: 640px) {
          .capsule-actions-row {
            flex-direction: column;
            width: 100%;
          }

          .contact-capsule-btn {
            width: 100%;
            justify-content: center;
          }

          .email-arrow-badge {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
};
