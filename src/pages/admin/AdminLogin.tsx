import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message || 'Invalid credentials. Please verify your administrative email and password.');
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#040407',
        color: '#F2EFF5',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Bar Link to Public Site */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: 'clamp(20px, 4vw, 48px)',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ABA7B6',
            fontSize: '0.85rem',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          className="admin-back-link"
        >
          <ArrowLeft size={16} />
          <span>Return to Portfolio</span>
        </Link>
      </div>

      {/* Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'rgba(11, 11, 17, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: 'clamp(32px, 6vw, 44px)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#60A5FA',
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={22} />
          </div>

          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#F2EFF5',
              marginBottom: '6px',
            }}
          >
            Portfolio CMS
          </h1>
          <p style={{ fontSize: '0.86rem', color: '#ABA7B6' }}>
            Authorized Administrator Access Only
          </p>
        </div>

        {/* Unconfigured Alert */}
        {!isConfigured && (
          <div
            style={{
              padding: '14px',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '6px',
              display: 'flex',
              gap: '10px',
              marginBottom: '24px',
              fontSize: '0.82rem',
              color: '#FCD34D',
              lineHeight: 1.5,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Supabase Setup Required:</strong> Add your Supabase project URL and anon key to <code>.env</code> to connect live authentication.
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '6px',
              display: 'flex',
              gap: '10px',
              marginBottom: '20px',
              fontSize: '0.84rem',
              color: '#FCA5A5',
              lineHeight: 1.5,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ABA7B6',
                marginBottom: '8px',
              }}
            >
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dakshgoswami.dev"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  backgroundColor: 'rgba(6, 6, 10, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '5px',
                  color: '#F2EFF5',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                className="admin-input"
              />
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#797585',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ABA7B6',
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 40px',
                  backgroundColor: 'rgba(6, 6, 10, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '5px',
                  color: '#F2EFF5',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                className="admin-input"
              />
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#797585',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#ABA7B6',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '8px',
              padding: '12px 20px',
              backgroundColor: '#3B82F6',
              border: 'none',
              borderRadius: '5px',
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
              opacity: isSubmitting ? 0.7 : 1,
            }}
            className="admin-submit-btn"
          >
            {isSubmitting ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security footnote */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center',
            fontSize: '0.76rem',
            color: '#797585',
            lineHeight: 1.5,
          }}
        >
          Protected by Supabase Auth with Row Level Security.
          <br />
          No public registration permitted.
        </div>
      </div>

      <style>{`
        .admin-back-link:hover {
          color: #F2EFF5 !important;
        }
        .admin-input:focus {
          border-color: #3B82F6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        .admin-submit-btn:hover:not(:disabled) {
          background-color: #2563EB !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
