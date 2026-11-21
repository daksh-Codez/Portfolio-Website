import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { PersonalInfoRecord } from '../../types/database';
import { User, Check, AlertCircle, Save, X } from 'lucide-react';

export const AboutManager: React.FC = () => {
  const { getAdminPersonalInfo, savePersonalInfo } = usePortfolioData();
  const [info, setInfo] = useState<Partial<PersonalInfoRecord>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAdminPersonalInfo();
        if (data) setInfo(data);
      } catch (err: any) {
        console.warn('Failed to load personal info:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleParagraphChange = (index: number, value: string) => {
    const current = [...(info.about_paragraphs || [])];
    current[index] = value;
    setInfo({ ...info, about_paragraphs: current });
  };

  const handleAddParagraph = () => {
    setInfo({
      ...info,
      about_paragraphs: [...(info.about_paragraphs || []), ''],
    });
  };

  const handleRemoveParagraph = (index: number) => {
    const current = (info.about_paragraphs || []).filter((_, i) => i !== index);
    setInfo({ ...info, about_paragraphs: current });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const { error } = await savePersonalInfo(info);
    setIsSaving(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to update personal information.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Personal and About details updated successfully!' });
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: '#3B82F6', textTransform: 'uppercase' }}>
          BIOGRAPHY & IDENTITY
        </span>
        <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
          About Me & Identity
        </h1>
        <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
          Update headline, biographical paragraphs, role, location, and hero statements.
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
        {/* Core Identity Box */}
        <div
          style={{
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#F2EFF5', marginBottom: '16px' }}>
            Hero Identity Statements
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                value={info.name || ''}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Professional Role / Title</label>
              <input
                type="text"
                required
                value={info.role || ''}
                onChange={(e) => setInfo({ ...info, role: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Location</label>
              <input
                type="text"
                required
                value={info.location || ''}
                onChange={(e) => setInfo({ ...info, location: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Contact Email</label>
              <input
                type="email"
                required
                value={info.email || ''}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="form-label">Hero Tagline</label>
            <input
              type="text"
              required
              value={info.tagline || ''}
              onChange={(e) => setInfo({ ...info, tagline: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">About Section Headline</label>
            <input
              type="text"
              required
              value={info.headline || ''}
              onChange={(e) => setInfo({ ...info, headline: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        {/* Editorial Paragraphs Box */}
        <div
          style={{
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#F2EFF5' }}>
                Editorial Narrative Paragraphs
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#797585', marginTop: '2px' }}>
                These four paragraphs form the editorial columns in the "01 / ABOUT" section.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddParagraph}
              style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '4px',
                color: '#93C5FD',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Add Paragraph
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(info.about_paragraphs || []).map((p, pIdx) => (
              <div key={pIdx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#3B82F6', fontWeight: 700 }}>
                    PARAGRAPH {String(pIdx + 1).padStart(2, '0')}
                  </span>
                  {(info.about_paragraphs || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(pIdx)}
                      style={{ background: 'none', border: 'none', color: '#F87171', fontSize: '0.74rem', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={p}
                  onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                  className="form-input"
                  style={{ lineHeight: 1.6 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={isSaving}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
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
            <span>{isSaving ? 'Updating...' : 'Save Changes'}</span>
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

export default AboutManager;
