import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { TrajectoryItemRecord } from '../../types/database';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Compass, Plus, Pencil, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

const trajectoryTypes = ['learning', 'practice', 'building', 'workflow', 'exploration'] as const;

export const FocusManager: React.FC = () => {
  const { getAllAdminTrajectory, saveTrajectoryItem, deleteTrajectoryItem, milestoneData } = usePortfolioData();
  const [items, setItems] = useState<TrajectoryItemRecord[]>([]);
  const [milestone, setMilestone] = useState(milestoneData);
  const [editingItem, setEditingItem] = useState<Partial<TrajectoryItemRecord> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = async () => {
    try {
      const data = await getAllAdminTrajectory();
      setItems(data);
    } catch (err) {
      console.warn('Failed to load trajectory items:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCreate = () => {
    const nextNum = String(items.length + 1).padStart(2, '0');
    setEditingItem({
      number: nextNum,
      title: '',
      phase: 'LEARNING / FOUNDATIONS',
      type: 'learning',
      description: '',
      tags: ['C', 'C++'],
      display_order: items.length + 1,
      status: 'published',
    });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title?.trim()) return;

    setIsSaving(true);
    const { error } = await saveTrajectoryItem(editingItem);
    setIsSaving(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to save item.' });
    } else {
      setStatusMsg({ type: 'success', text: `Trajectory milestone "${editingItem.title}" saved.` });
      setEditingItem(null);
      await loadData();
    }
  };

  const handleDeleteItem = async (id: string) => {
    const { error } = await deleteTrajectoryItem(id);
    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to delete item.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Item removed from timeline.' });
      await loadData();
    }
  };

  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('internship_milestone')
        .upsert({ ...milestone, id: 1, updated_at: new Date().toISOString() });

      setIsSaving(false);
      if (error) {
        setStatusMsg({ type: 'error', text: error.message || 'Failed to update milestone.' });
      } else {
        setStatusMsg({ type: 'success', text: 'Internship milestone updated successfully!' });
      }
    } else {
      setIsSaving(false);
      setStatusMsg({ type: 'success', text: 'Milestone updated in local session.' });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: '#3B82F6', textTransform: 'uppercase' }}>
          DEVELOPMENT JOURNEY
        </span>
        <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
          Trajectory & Current Focus
        </h1>
        <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
          Manage your sequential development timeline (01 to 05) and your target internship objective.
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

      {/* Edit Form */}
      {editingItem && (
        <div
          style={{
            backgroundColor: 'rgba(12, 13, 20, 0.95)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F2EFF5' }}>
              {editingItem.id ? `Edit Milestone ${editingItem.number}` : 'New Timeline Milestone'}
            </h3>
            <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#ABA7B6', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSaveItem}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '18px' }}>
              <div>
                <label className="form-label">Number (e.g. 01)</label>
                <input
                  type="text"
                  required
                  value={editingItem.number || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, number: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Phase Label</label>
                <input
                  type="text"
                  required
                  value={editingItem.phase || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, phase: e.target.value })}
                  className="form-input"
                  placeholder="LEARNING / FOUNDATIONS"
                />
              </div>

              <div>
                <label className="form-label">Type / Theme</label>
                <select
                  value={editingItem.type || 'learning'}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as any })}
                  className="form-input"
                >
                  {trajectoryTypes.map((t) => (
                    <option key={t} value={t}>{t.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label className="form-label">Description</label>
              <textarea
                rows={3}
                required
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="form-input"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Tags (Comma separated)</label>
              <input
                type="text"
                value={(editingItem.tags || []).join(', ')}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                style={{ padding: '8px 16px', background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ABA7B6', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                style={{ padding: '8px 20px', backgroundColor: '#3B82F6', border: 'none', color: '#FFFFFF', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                {isSaving ? 'Saving...' : 'Save Milestone'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trajectory Items List */}
      <div
        style={{
          backgroundColor: 'rgba(12, 13, 20, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '6px',
          padding: '24px',
          marginBottom: '36px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F2EFF5' }}>
              Connected Trajectory Milestones
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#797585', marginTop: '2px' }}>
              Displayed sequentially on the vertical development timeline.
            </p>
          </div>

          <button
            onClick={handleStartCreate}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: '#3B82F6',
              border: 'none',
              borderRadius: '4px',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={14} />
            <span>Add Milestone</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '16px 20px',
                backgroundColor: 'rgba(6, 6, 10, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#3B82F6', fontFamily: 'var(--font-mono)' }}>
                  {item.number}
                </span>
                <div>
                  <div style={{ fontWeight: 600, color: '#F2EFF5', fontSize: '0.94rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#797585', marginTop: '2px' }}>
                    {item.phase} · {item.type}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setEditingItem(item)}
                  style={{ background: 'none', border: 'none', color: '#60A5FA', cursor: 'pointer', padding: '4px' }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internship Milestone Form */}
      <div
        style={{
          backgroundColor: 'rgba(12, 13, 20, 0.85)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '6px',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <Compass size={20} style={{ color: '#60A5FA' }} />
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F2EFF5' }}>
            Final Milestone: Internship Objective
          </h2>
        </div>

        <form onSubmit={handleSaveMilestone}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label className="form-label">Eyebrow</label>
              <input
                type="text"
                required
                value={milestone.eyebrow}
                onChange={(e) => setMilestone({ ...milestone, eyebrow: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Heading</label>
              <input
                type="text"
                required
                value={milestone.title}
                onChange={(e) => setMilestone({ ...milestone, title: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Badge</label>
              <input
                type="text"
                required
                value={milestone.badge}
                onChange={(e) => setMilestone({ ...milestone, badge: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Objective Description</label>
            <textarea
              rows={3}
              required
              value={milestone.description}
              onChange={(e) => setMilestone({ ...milestone, description: e.target.value })}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3B82F6',
                border: 'none',
                borderRadius: '4px',
                color: '#FFFFFF',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Update Internship Milestone
            </button>
          </div>
        </form>
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

export default FocusManager;
