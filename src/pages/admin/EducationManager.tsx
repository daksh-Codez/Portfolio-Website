import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { EducationRecordDB } from '../../types/database';
import { GraduationCap, Save, X, Plus } from 'lucide-react';

export const EducationManager: React.FC = () => {
  const { getAdminEducation, saveEducation } = usePortfolioData();
  const [edu, setEdu] = useState<Partial<EducationRecordDB>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAdminEducation();
        if (data) setEdu(data);
      } catch (err) {
        console.warn('Failed to load education record:', err);
      }
    };
    load();
  }, []);

  const handleNoteChange = (idx: number, val: string) => {
    const list = [...(edu.academic_notes || [])];
    list[idx] = val;
    setEdu({ ...edu, academic_notes: list });
  };

  const handleAddNote = () => {
    setEdu({ ...edu, academic_notes: [...(edu.academic_notes || []), ''] });
  };

  const handleRemoveNote = (idx: number) => {
    setEdu({
      ...edu,
      academic_notes: (edu.academic_notes || []).filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const { error } = await saveEducation(edu);
    setIsSaving(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to update education record.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Education details updated successfully!' });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: '#8B5CF6', textTransform: 'uppercase' }}>
          ACADEMIC FOUNDATION
        </span>
        <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
          Education & Degree
        </h1>
        <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
          Manage your university profile, B.Tech CSE specialization, academic status, and curriculum highlights.
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '20px' }}>
            <div>
              <label className="form-label">University / Institution</label>
              <input
                type="text"
                required
                value={edu.institution || ''}
                onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Degree</label>
              <input
                type="text"
                required
                value={edu.degree || ''}
                onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Major / Specialization</label>
              <input
                type="text"
                required
                value={edu.major || ''}
                onChange={(e) => setEdu({ ...edu, major: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            <div>
              <label className="form-label">Academic Status</label>
              <input
                type="text"
                required
                value={edu.status || ''}
                onChange={(e) => setEdu({ ...edu, status: e.target.value })}
                className="form-input"
                placeholder="Currently Pursuing (Undergraduate)"
              />
            </div>

            <div>
              <label className="form-label">Campus Location</label>
              <input
                type="text"
                required
                value={edu.location || ''}
                onChange={(e) => setEdu({ ...edu, location: e.target.value })}
                className="form-input"
                placeholder="Greater Noida, Uttar Pradesh, India"
              />
            </div>
          </div>
        </div>

        {/* Academic Notes */}
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
                Curriculum & Craft Highlights
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#797585', marginTop: '2px' }}>
                Bullet points displayed beside your degree in the education timeline.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddNote}
              style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '4px',
                color: '#C4B5FD',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Add Highlight
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(edu.academic_notes || []).map((note, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => handleNoteChange(idx, e.target.value)}
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNote(idx)}
                  style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', padding: '6px' }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
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
            <span>{isSaving ? 'Updating...' : 'Save Education Details'}</span>
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

export default EducationManager;
