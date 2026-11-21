import React, { useState, useEffect } from 'react';
import { personalInfo } from '../../data/personalInfo';

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
          transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.4s ease, border-color 0.4s ease',
          backgroundColor: isScrolled ? 'rgba(4, 4, 7, 0.94)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid transparent',
          padding: isScrolled ? '16px 0' : '28px 0',
        }}
      >
        <div className="editorial-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Custom DG Monogram Wordmark */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
            aria-label="Daksh Goswami — Return to top"
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                border: '1px solid rgba(139, 92, 246, 0.45)',
                background: 'linear-gradient(135deg, rgba(32, 32, 42, 0.95), rgba(24, 24, 32, 0.95))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-body)',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              className="monogram-badge"
            >
              <span style={{ color: 'var(--accent-violet-light)' }}>D</span>G
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                }}
              >
                {personalInfo.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.02em',
                }}
              >
                CSE / PORTFOLIO
              </span>
            </div>
          </a>

          {/* Right: Desktop Navigation links */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    transition: 'color 0.25s ease',
                    padding: '6px 2px',
                  }}
                  className="nav-link-item"
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '1.5px',
                        backgroundColor: 'var(--accent-violet)',
                        borderRadius: '1px',
                        boxShadow: '0 0 6px var(--accent-violet)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            className="mobile-nav-toggle"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40px',
              height: '40px',
              gap: '6px',
              padding: '8px',
              zIndex: 1001,
            }}
          >
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: 'var(--text-primary)',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                transform: mobileMenuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                width: '18px',
                height: '1.5px',
                backgroundColor: 'var(--accent-violet-light)',
                transition: 'opacity 0.2s ease',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '24px',
                height: '1.5px',
                backgroundColor: 'var(--text-primary)',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                transform: mobileMenuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 950,
            backgroundColor: 'rgba(4, 4, 7, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px clamp(24px, 6vw, 48px)',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <span className="font-mono-tag" style={{ color: 'var(--accent-violet-light)' }}>
              INDEX NAVIGATION
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.4rem',
                  color: activeSection === item.id ? 'var(--accent-violet-light)' : 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  0{idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-hairline)' }}>
            <p className="mono-meta">{personalInfo.status}</p>
          </div>
        </div>
      )}

      {/* Global CSS for desktop/mobile nav queries */}
      <style>{`
        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
        .nav-link-item:hover {
          color: #ffffff !important;
        }
      `}</style>
    </>
  );
};
