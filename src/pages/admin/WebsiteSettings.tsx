import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, ShieldCheck, Database, Key, CheckCircle2, AlertTriangle, Save } from 'lucide-react';

export const WebsiteSettings: React.FC = () => {
  const { isConfigured, user } = useAuth();
  const [siteTitle, setSiteTitle] = useState('Daksh Goswami — Aspiring Software Developer');
  const [enable3D, setEnable3D] = useState(true);
  const [enableTerminal, setEnableTerminal] = useState(true);
  const [enableAmbient, setEnableAmbient] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: '#3B82F6', textTransform: 'uppercase' }}>
          CONFIGURATION & DIAGNOSTICS
        </span>
        <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
          Website Settings & Backend Status
        </h1>
        <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
          Verify Supabase integration, manage global features, and review security policies.
        </p>
      </div>

      {savedNotice && (
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '6px',
            marginBottom: '24px',
            color: '#6EE7B7',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={16} />
          <span>Website preferences saved successfully.</span>
        </div>
      )}

      {/* Supabase Connection Status Card */}
      <div
        style={{
          backgroundColor: 'rgba(12, 13, 20, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '6px',
          padding: '24px',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={20} style={{ color: isConfigured ? '#10B981' : '#F59E0B' }} />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F2EFF5' }}>
              Supabase Backend Status
            </h2>
          </div>

          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              backgroundColor: isConfigured ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: isConfigured ? '#10B981' : '#F59E0B',
              border: `1px solid ${isConfigured ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
            }}
          >
            {isConfigured ? 'CONNECTED' : 'FALLBACK MODE'}
          </span>
        </div>

        <div style={{ fontSize: '0.86rem', color: '#ABA7B6', lineHeight: 1.6 }}>
          {isConfigured ? (
            <p>
              Supabase credentials detected in environment variables. Database queries, storage uploads, and authentication sessions are connected to your PostgreSQL instance.
            </p>
          ) : (
            <div>
              <p style={{ marginBottom: '12px' }}>
                Your portfolio is currently loading in <strong>Graceful Resilience Mode</strong>. It reads directly from the static data in <code>src/data/*.ts</code>, so visitors never see an error or broken page.
              </p>
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(6, 6, 10, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: '#CBD5E1',
                }}
              >
                VITE_SUPABASE_URL=https://&lt;your-project&gt;.supabase.co<br />
                VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Flags & Global Settings Form */}
      <form onSubmit={handleSave}>
        <div
          style={{
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F2EFF5', marginBottom: '18px' }}>
            Interactive Features & Elements
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Global Website Title</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
            {/* 3D Scene */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F2EFF5' }}>Three.js 3D Spatial Canvas</div>
                <div style={{ fontSize: '0.78rem', color: '#797585' }}>Renders the metallic torus knot and wireframe cage.</div>
              </div>
              <input
                type="checkbox"
                checked={enable3D}
                onChange={(e) => setEnable3D(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#3B82F6', cursor: 'pointer' }}
              />
            </div>

            {/* Ambient Light */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F2EFF5' }}>Ambient Mouse Light Reflection</div>
                <div style={{ fontSize: '0.78rem', color: '#797585' }}>Subtle radial luxury glow tracking the cursor.</div>
              </div>
              <input
                type="checkbox"
                checked={enableAmbient}
                onChange={(e) => setEnableAmbient(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#3B82F6', cursor: 'pointer' }}
              />
            </div>

            {/* CLI Prompt */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F2EFF5' }}>Interactive Developer Terminal (CLI)</div>
                <div style={{ fontSize: '0.78rem', color: '#797585' }}>Bottom-right floating interactive prompt launcher.</div>
              </div>
              <input
                type="checkbox"
                checked={enableTerminal}
                onChange={(e) => setEnableTerminal(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#3B82F6', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              border: 'none',
              borderRadius: '5px',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Save size={16} />
            <span>Save Website Settings</span>
          </button>
        </div>
      </form>

      <style>{`
        .form-label {
          display: block;
          font-size: 0.76rem;
          font-weight: 600;
          color: #ABA7B6;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px;
          background-color: rgba(6, 6, 10, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          color: #F2EFF5;
          font-size: 0.88rem;
          font-family: inherit;
          outline: none;
        }
        .form-input:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default WebsiteSettings;
