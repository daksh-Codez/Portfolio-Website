import React, { useState } from 'react';
import { socialLinks } from '../../data/socialLinks';
import { personalInfo } from '../../data/personalInfo';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
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
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: 'clamp(80px, 14vw, 170px)',
        paddingBottom: 'clamp(80px, 12vw, 140px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Section Label */}
        <div className="section-label">06 / CONTACT</div>

        {/* Large Editorial Typographic Statement */}
        <div style={{ maxWidth: '940px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 6.8vw, 6rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              fontWeight: 400,
              marginBottom: 'clamp(24px, 4vw, 36px)',
            }}
          >
            Let's create something{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent-violet-light)' }}>
              meaningful.
            </span>
          </h2>

          <p
            className="body-editorial"
            style={{
              fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
              maxWidth: '680px',
              marginBottom: 'clamp(36px, 6vw, 56px)',
              color: 'var(--text-secondary)',
            }}
          >
            I'm always interested in connecting with people, exploring opportunities, and discussing ideas around technology and software development.
          </p>
        </div>

        {/* Contact Matrix: Interactive Email Box + Social Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 4vw, 40px)',
            alignItems: 'start',
          }}
        >
          {/* Direct Email Action Card */}
          <div
            style={{
              gridColumn: 'span 12',
              backgroundColor: 'rgba(18, 18, 26, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: 'clamp(28px, 4vw, 44px)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="contact-card-col"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'var(--accent-violet-light)',
                    textTransform: 'uppercase',
                  }}
                >
                  DIRECT CHANNEL
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {personalInfo.location} (IST / UTC+5:30)
                </span>
              </div>

              {emailLink && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a
                    href={emailLink.url || `mailto:${emailLink.handle}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(1.2rem, 2.8vw, 2.2rem)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      wordBreak: 'break-all',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      textDecoration: 'none',
                    }}
                    className="email-link-text"
                  >
                    <span>{emailLink.handle}</span>
                    <ArrowUpRight size={24} style={{ color: 'var(--accent-violet-light)' }} />
                  </a>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '8px' }}>
                    <a
                      href={emailLink.url || `mailto:${emailLink.handle}`}
                      className="btn-editorial-primary"
                    >
                      <Mail size={16} />
                      <span>OPEN MAIL CLIENT</span>
                    </a>

                    <button
                      onClick={copyEmail}
                      className="btn-editorial-ghost"
                      aria-label="Copy email address to clipboard"
                    >
                      {copied ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
                      <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {/* GitHub Card */}
            {githubLink && (
              <a
                href={githubLink.url || '#'}
                target={githubLink.url ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{
                  padding: '24px 28px',
                  backgroundColor: 'rgba(18, 18, 26, 0.72)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.25s var(--ease-editorial)',
                }}
                className="social-profile-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <GithubIcon size={19} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.02rem', color: 'var(--text-primary)', display: 'block' }}>
                      GitHub
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      @{githubLink.handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ color: 'var(--accent-violet-light)' }} />
              </a>
            )}

            {/* LinkedIn Card */}
            {linkedinLink && (
              <a
                href={linkedinLink.url || '#'}
                target={linkedinLink.url ? '_blank' : '_self'}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!linkedinLink.url) {
                    e.preventDefault();
                    alert('LinkedIn profile URL can be configured in src/data/socialLinks.ts');
                  }
                }}
                style={{
                  padding: '24px 28px',
                  backgroundColor: 'rgba(18, 18, 26, 0.72)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.25s var(--ease-editorial)',
                }}
                className="social-profile-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <LinkedinIcon size={19} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.02rem', color: 'var(--text-primary)', display: 'block' }}>
                      LinkedIn
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      {linkedinLink.url ? `@${linkedinLink.handle}` : 'Configurable in data'}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ color: 'var(--accent-violet-light)' }} />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .social-profile-card:hover {
          border-color: rgba(139, 92, 246, 0.4) !important;
          background-color: rgba(26, 24, 38, 0.7) !important;
          transform: translateY(-2px);
        }
        .email-link-text:hover {
          color: var(--accent-violet-light) !important;
        }
      `}</style>
    </section>
  );
};
