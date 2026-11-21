import React, { useState } from 'react';
import { socialLinks } from '../../data/socialLinks';
import { personalInfo } from '../../data/personalInfo';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailLink = socialLinks.find((s) => s.platform === 'email');
  const githubLink = socialLinks.find((s) => s.platform === 'github');
  const linkedinLink = socialLinks.find((s) => s.platform === 'linkedin');

  const copyEmail = () => {
    if (emailLink && emailLink.handle) {
      navigator.clipboard.writeText(emailLink.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: 'clamp(72px, 14vh, 160px)',
        paddingBottom: 'clamp(72px, 12vh, 140px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <span>06 / CONTACT</span>
          <span style={{ color: 'var(--text-muted)' }}>&mdash; DISPATCH &amp; INQUIRY</span>
        </div>

        {/* Large Typographic Sign-off */}
        <div style={{ maxWidth: '820px', marginBottom: 'clamp(36px, 6vw, 64px)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              fontWeight: 400,
              margin: '0 0 20px 0',
            }}
          >
            Let's create something{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent-ink)' }}>
              meaningful.
            </span>
          </h2>

          <p
            className="editorial-body"
            style={{
              fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)',
              color: 'var(--text-secondary)',
              margin: 0,
            }}
          >
            I am always interested in discussing software engineering internships, technical collaborations, or ideas around low-level systems and digital products.
          </p>
        </div>

        {/* Contact Matrix: Direct Channel & Links */}
        <div
          style={{
            borderTop: '1px solid var(--border-rule)',
            paddingTop: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(28px, 4vw, 48px)',
            alignItems: 'start',
          }}
        >
          {/* Email Address & Quick Actions (Left 7 cols) */}
          <div
            style={{
              gridColumn: 'span 12',
            }}
            className="contact-direct-col"
          >
            <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '10px', color: 'var(--accent-iris)' }}>
              DIRECT EMAIL
            </span>

            {emailLink && (
              <div>
                <a
                  href={emailLink.url || `mailto:${emailLink.handle}`}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    wordBreak: 'break-all',
                    marginBottom: '16px',
                  }}
                  className="contact-mail-link"
                >
                  <span>{emailLink.handle}</span>
                  <ArrowUpRight size={22} style={{ color: 'var(--accent-iris)' }} />
                </a>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a
                    href={emailLink.url || `mailto:${emailLink.handle}`}
                    className="editorial-btn-primary"
                  >
                    <span>Send Message</span>
                  </a>

                  <button
                    onClick={copyEmail}
                    className="editorial-btn-quiet"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Location & Social Connections (Right 5 cols) */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            className="contact-meta-col"
          >
            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '6px' }}>
                LOCATION & TIMEZONE
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                {personalInfo.location}
              </p>
              <p className="editorial-sidenote" style={{ margin: '2px 0 0' }}>
                India Standard Time (IST / UTC+5:30)
              </p>
            </div>

            <div>
              <span className="editorial-index-tag" style={{ display: 'block', marginBottom: '8px' }}>
                EXTERNAL PLATFORMS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {githubLink && (
                  <a
                    href={githubLink.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.84rem',
                      transition: 'color 0.2s ease',
                    }}
                    className="contact-social-row"
                  >
                    <GithubIcon size={16} />
                    <span>github.com/{githubLink.handle}</span>
                    <ArrowUpRight size={13} style={{ color: 'var(--accent-iris)' }} />
                  </a>
                )}

                {linkedinLink && (
                  <a
                    href={linkedinLink.url || '#'}
                    target={linkedinLink.url ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!linkedinLink.url) {
                        e.preventDefault();
                        alert('LinkedIn profile URL configurable in src/data/socialLinks.ts');
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.84rem',
                      transition: 'color 0.2s ease',
                    }}
                    className="contact-social-row"
                  >
                    <LinkedinIcon size={16} />
                    <span>linkedin / {linkedinLink.handle}</span>
                    <ArrowUpRight size={13} style={{ color: 'var(--accent-iris)' }} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-direct-col {
            grid-column: span 7 !important;
          }
          .contact-meta-col {
            grid-column: span 5 !important;
            border-left: 1px solid var(--border-rule) !important;
            padding-left: 36px !important;
          }
        }
        .contact-mail-link:hover {
          color: var(--accent-ink) !important;
        }
        .contact-social-row:hover {
          color: var(--text-primary) !important;
        }
      `}</style>
    </section>
  );
};
