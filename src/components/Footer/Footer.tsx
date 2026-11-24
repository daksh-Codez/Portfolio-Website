import React from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { ArrowUp } from 'lucide-react';
import { renderSocialIcon } from '../Icons/Icons';

export const Footer: React.FC = () => {
  const { personalInfoData, socialLinksList } = usePortfolioData();
  const personalInfo = personalInfoData;
  const socialLinks = socialLinksList;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#work' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const visibleSocialLinks = socialLinks.filter(
    (s) => s.id !== 'email' && s.platform?.toLowerCase() !== 'email'
  );

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border-hairline)',
        paddingTop: 'clamp(48px, 6vw, 72px)',
        paddingBottom: 'clamp(64px, 8vw, 88px)',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Top Row: Wordmark, Statement & Back-to-Top */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* Identity & Statement */}
          <div style={{ maxWidth: '480px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.2rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {personalInfo.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: 'var(--accent-violet-light)',
                lineHeight: '1.4',
              }}
            >
              Designed with curiosity. Built with purpose.
            </p>
          </div>

          {/* Back to Top Magnetic Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              transition: 'all 0.25s var(--ease-editorial)',
            }}
            className="back-to-top-btn"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} style={{ color: 'var(--accent-violet-light)' }} />
          </button>
        </div>

        {/* Middle Row: Navigation Links & Socials */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            paddingTop: '24px',
            paddingBottom: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Nav List */}
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '28px',
            }}
            aria-label="Footer Navigation"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                className="footer-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {visibleSocialLinks.map((link) => {
              const platformLabel = link.label || link.platform || 'Profile';
              const isConfigured = Boolean(link.url && link.url !== '#');

              return (
                <a
                  key={link.id}
                  href={link.url || '#'}
                  target={isConfigured ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  aria-label={`${platformLabel} Profile`}
                  onClick={(e) => {
                    if (!isConfigured) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    color: 'var(--text-secondary)',
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="footer-social-icon"
                >
                  {renderSocialIcon(link.platform || link.id, 18)}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginTop: '28px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Engineered with React &middot; Three.js &middot; TypeScript
          </span>
        </div>
      </div>

      <style>{`
        .back-to-top-btn:hover {
          border-color: var(--accent-violet) !important;
          background-color: rgba(139, 92, 246, 0.1) !important;
          transform: translateY(-2px);
        }
        .footer-nav-link:hover {
          color: #ffffff !important;
        }
        .footer-social-icon:hover {
          color: var(--accent-violet-light) !important;
        }
      `}</style>
    </footer>
  );
};
