import React, { useState, useEffect } from 'react';
import { personalInfo } from '../../data/personalInfo';

const navItems = [
  { index: '01', label: 'About', href: '#about', id: 'about' },
  { index: '02', label: 'Capabilities', href: '#skills', id: 'skills' },
  { index: '03', label: 'Selected Work', href: '#work', id: 'work' },
  { index: '04', label: 'Education', href: '#education', id: 'education' },
  { index: '05', label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          backgroundColor: isScrolled ? 'rgba(11, 11, 13, 0.88)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-rule)' : '1px solid transparent',
          padding: isScrolled ? '16px 0' : '28px 0',
          transition: 'padding 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Masthead Identity */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.98rem',
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
              }}
            >
              Daksh Goswami
            </span>
            <span
              className="editorial-index-tag"
              style={{
                display: 'none',
                color: 'var(--text-muted)',
              }}
              id="masthead-discipline"
            >
              / CSE &middot; Galgotias
            </span>
          </a>

          {/* Desktop Editorial Navigation */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px',
            }}
            className="editorial-desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '4px 0',
                  }}
                  className="editorial-nav-anchor"
                >
                  <span style={{ color: isActive ? 'var(--accent-iris)' : 'var(--text-muted)', fontSize: '0.7rem' }}>
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: 'var(--accent-iris)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            className="editorial-mobile-toggle"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              border: '1px solid var(--border-rule-strong)',
            }}
          >
            <span>{mobileMenuOpen ? 'Close' : 'Index'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 890,
            backgroundColor: '#0b0b0d',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '36px clamp(24px, 6vw, 48px)',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span className="editorial-index-tag" style={{ color: 'var(--accent-iris)' }}>
              DIRECTORY
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.5rem',
                  color: activeSection === item.id ? 'var(--accent-ink)' : 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {item.index}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid var(--border-rule)' }}>
            <p className="editorial-sidenote">Galgotias University &middot; Greater Noida, UP</p>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .editorial-desktop-nav {
            display: flex !important;
          }
          #masthead-discipline {
            display: inline-block !important;
          }
          .editorial-mobile-toggle {
            display: none !important;
          }
        }
        .editorial-nav-anchor:hover {
          color: var(--text-primary) !important;
        }
      `}</style>
    </>
  );
};
