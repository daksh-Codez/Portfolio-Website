import React from 'react';
import { personalInfo } from '../../data/personalInfo';
import { socialLinks } from '../../data/socialLinks';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#skills' },
    { label: 'Selected Work', href: '#work' },
    { label: 'Education', href: '#education' },
    { label: 'Trajectory', href: '#focus' },
    { label: 'Contact', href: '#contact' },
  ];

  const githubLink = socialLinks.find((s) => s.platform === 'github');
  const linkedinLink = socialLinks.find((s) => s.platform === 'linkedin');

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border-rule)',
        paddingTop: '48px',
        paddingBottom: '48px',
        backgroundColor: '#070709',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="page-container">
        {/* Top Tier: Colophon & Back to Top */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '24px',
            marginBottom: '36px',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {personalInfo.name}
            </span>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Designed with curiosity. Built with purpose.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Return to top of page"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '6px 0',
              borderBottom: '1px solid var(--border-rule-strong)',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            className="footer-top-btn"
          >
            <span>Top</span>
            <ArrowUp size={13} style={{ color: 'var(--accent-iris)' }} />
          </button>
        </div>

        {/* Bottom Tier: Nav Links & Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border-rule)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
            }}
            aria-label="Footer directory"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                className="footer-anchor"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {githubLink && githubLink.url && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                style={{ color: 'var(--text-muted)', display: 'flex', transition: 'color 0.2s ease' }}
                className="footer-anchor"
              >
                <GithubIcon size={16} />
              </a>
            )}

            {linkedinLink && (
              <a
                href={linkedinLink.url || '#'}
                target={linkedinLink.url ? '_blank' : '_self'}
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                style={{ color: 'var(--text-muted)', display: 'flex', transition: 'color 0.2s ease' }}
                className="footer-anchor"
              >
                <LinkedinIcon size={16} />
              </a>
            )}

            <span className="editorial-sidenote" style={{ fontSize: '0.72rem', marginLeft: '8px' }}>
              &copy; {currentYear} Daksh Goswami
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-top-btn:hover {
          color: var(--text-primary) !important;
          border-color: var(--accent-iris) !important;
        }
        .footer-anchor:hover {
          color: var(--text-primary) !important;
        }
      `}</style>
    </footer>
  );
};
