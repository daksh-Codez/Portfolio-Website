import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { SkillRecord } from '../../types/database';
import {
  Wrench,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Code2,
} from 'lucide-react';

const categories = [
  '01 / PROGRAMMING & SYSTEMS',
  '02 / WEB FOUNDATIONS',
  '03 / DATABASE',
  '04 / DEVELOPMENT WORKFLOW',
] as const;

export const SkillsManager: React.FC = () => {
  const { getAllAdminSkills, saveSkill, deleteSkill } = usePortfolioData();
  const [skills, setSkills] = useState<SkillRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillRecord> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSkills = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAdminSkills();
      setSkills(data);
    } catch (err: any) {
      console.warn('Failed to load skills:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleStartCreate = (category: typeof categories[number]) => {
    setEditingSkill({
      name: '',
      category,
      icon_name: 'Code2',
      display_order: skills.filter((s) => s.category === category).length + 1,
      status: 'published',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name?.trim()) return;

    setIsSaving(true);
    const { error } = await saveSkill(editingSkill);
    setIsSaving(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to save skill.' });
    } else {
      setStatusMsg({ type: 'success', text: `Skill "${editingSkill.name}" updated successfully.` });
      setEditingSkill(null);
      await loadSkills();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteSkill(id);
    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to delete skill.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Skill removed from portfolio.' });
      await loadSkills();
    }
  };

  const handleToggleStatus = async (skill: SkillRecord) => {
    const nextStatus = skill.status === 'published' ? 'hidden' : 'published';
    await saveSkill({ ...skill, status: nextStatus });
    await loadSkills();
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: '#8B5CF6', textTransform: 'uppercase' }}>
            TECHNICAL CAPABILITIES
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
            Skills & Technologies
          </h1>
          <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage the categorized developer tools, programming languages, and workflows shown on the public site.
          </p>
        </div>
      </div>

      {/* Toast */}
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

      {/* Edit Form Modal/Drawer */}
      {editingSkill && (
        <div
          style={{
            backgroundColor: 'rgba(12, 13, 20, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F2EFF5' }}>
              {editingSkill.id ? `Edit: ${editingSkill.name}` : 'Add Technology'}
            </h3>
            <button onClick={() => setEditingSkill(null)} style={{ background: 'none', border: 'none', color: '#ABA7B6', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label className="form-label">Technology Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="form-input"
                  placeholder="e.g. C, Python, SQL"
                />
              </div>

              <div>
                <label className="form-label">Category</label>
                <select
                  value={editingSkill.category || categories[0]}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                  className="form-input"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Display Order</label>
                <input
                  type="number"
                  value={editingSkill.display_order ?? 1}
                  onChange={(e) => setEditingSkill({ ...editingSkill, display_order: Number(e.target.value) })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Status</label>
                <select
                  value={editingSkill.status || 'published'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, status: e.target.value as any })}
                  className="form-input"
                >
                  <option value="published">Published</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  color: '#ABA7B6',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#8B5CF6',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                }}
              >
                {isSaving ? 'Saving...' : 'Save Skill'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categorized Skills Grids */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);

          return (
            <div
              key={cat}
              style={{
                backgroundColor: 'rgba(12, 13, 20, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '6px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingBottom: '14px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#8B5CF6', letterSpacing: '0.04em' }}>
                    {cat}
                  </h2>
                  <span style={{ fontSize: '0.78rem', color: '#797585' }}>
                    {catSkills.length} technologies in this group
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartCreate(cat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
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
                  <Plus size={13} />
                  <span>Add Tech</span>
                </button>
              </div>

              {/* Technologies Pills / Cards in this category */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '12px',
                }}
              >
                {catSkills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: 'rgba(6, 6, 10, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#F2EFF5', fontSize: '0.9rem' }}>
                        {skill.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#797585', marginTop: '2px' }}>
                        Order: {skill.display_order} · {skill.status}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => handleToggleStatus(skill)}
                        title={skill.status === 'published' ? 'Hide from public' : 'Publish'}
                        style={{ background: 'none', border: 'none', color: skill.status === 'published' ? '#10B981' : '#797585', cursor: 'pointer', padding: '4px' }}
                      >
                        {skill.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>

                      <button
                        onClick={() => setEditingSkill(skill)}
                        title="Edit technology"
                        style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', padding: '4px' }}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(skill.id)}
                        title="Delete technology"
                        style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

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
          borderRadius: 4px;
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

export default SkillsManager;
