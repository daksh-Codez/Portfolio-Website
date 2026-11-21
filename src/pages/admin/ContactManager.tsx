import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { PersonalInfoRecord } from '../../types/database';
import { Mail, Save, X, Check } from 'lucide-react';

export const ContactManager: React.FC = () => {
  const { getAdminPersonalInfo, savePersonalInfo } = usePortfolioData();
  const [info, setInfo] = useState<Partial<PersonalInfoRecord>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminPersonalInfo();
        if (data) setInfo(data);
      } catch (err) {
        console.warn('Failed to load contact info:', err);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const { error } = await savePersonalInfo(info);
    setIsSaving(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to update contact info.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Contact settings updated successfully!' });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: '#8B5CF6', textTransform: 'uppercase' }}>
          COMMUNICATION
        </span>
        <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
          Contact Information & Inquiries
        </h1>
        <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
          Configure your direct contact email, availability status pill, and inquiry text.
        </p>
      </div>

      {statusMsg && (
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '6px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: statusMsg.type === 'success' ? '#6EE7B7' : '#FCA5A5',
            fontSize: '0.88rem',
          }}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label className="form-label">Primary Public Email</label>
              <input
                type="email"
                required
                value={info.email || ''}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className="form-input"
                placeholder="dakshgoswami4077@gmail.com"
              />
              <span style={{ fontSize: '0.74rem', color: '#797585', marginTop: '4px', display: 'block' }}>
                Used by the one-click copy button and direct mailto links.
              </span>
            </div>

            <div>
              <label className="form-label">Availability Status</label>
              <input
                type="text"
                required
                value={info.availability_status || ''}
                onChange={(e) => setInfo({ ...info, availability_status: e.target.value })}
                className="form-input"
                placeholder="Open to Internship Opportunities"
              />
              <span style={{ fontSize: '0.74rem', color: '#797585', marginTop: '4px', display: 'block' }}>
                Shown on the green pulsating badge in the Hero section.
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={isSaving}
            style={{
              padding: '12px 24px',
              backgroundColor: '#8B5CF6',
              border: 'none',
              borderRadius: '5px',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Save size={16} />
            <span>{isSaving ? 'Updating...' : 'Save Contact Settings'}</span>
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
          border-color: #8B5CF6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ContactManager;
