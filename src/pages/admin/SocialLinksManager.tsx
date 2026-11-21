import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { SocialLinkRecord } from '../../types/database';
import { Share2, Plus, Pencil, Trash2, Save, X, ExternalLink } from 'lucide-react';

export const SocialLinksManager: React.FC = () => {
  const { getAdminSocialLinks, saveSocialLink, deleteSocialLink } = usePortfolioData();
  const [links, setLinks] = useState<SocialLinkRecord[]>([]);
  const [editingLink, setEditingLink] = useState<Partial<SocialLinkRecord> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadLinks = async () => {
    try {
      const data = await getAdminSocialLinks();
      setLinks(data);
    } catch (err) {
      console.warn('Failed to load social links:', err);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleStartCreate = () => {
    setEditingLink({
      id: '',
      platform: '',
      url: 'https://',
      handle: '',
      display_order: links.length + 1,
      status: 'published',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink || !editingLink.platform?.trim() || !editingLink.url?.trim()) return;

    setIsSaving(true);
    const id = editingLink.id || editingLink.platform.toLowerCase().replace(/[^a-z0-9]/g, '');
    const { error } = await saveSocialLink({ ...editingLink, id });
    setIsSaving(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to save social link.' });
    } else {
      setStatusMsg({ type: 'success', text: `Social profile "${editingLink.platform}" updated.` });
      setEditingLink(null);
      await loadLinks();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteSocialLink(id);
    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to delete link.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Social link removed.' });
      await loadLinks();
    }
  };

  return (
    <div>
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
            CONNECTIVITY
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
            Social Links
          </h1>
          <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
            Configure your GitHub, LinkedIn, and professional contact destinations.
          </p>
        </div>

        {!editingLink && (
          <button
            onClick={handleStartCreate}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              backgroundColor: '#8B5CF6',
              border: 'none',
              borderRadius: '5px',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={16} />
            <span>Add Social Link</span>
          </button>
        )}
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

      {editingLink && (
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
              {editingLink.id ? `Edit: ${editingLink.platform}` : 'New Social Destination'}
            </h3>
            <button onClick={() => setEditingLink(null)} style={{ background: 'none', border: 'none', color: '#ABA7B6', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label className="form-label">Platform Name</label>
                <input
                  type="text"
                  required
                  value={editingLink.platform || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, platform: e.target.value })}
                  className="form-input"
                  placeholder="e.g. GitHub, LinkedIn"
                />
              </div>

              <div>
                <label className="form-label">Handle / Label</label>
                <input
                  type="text"
                  required
                  value={editingLink.handle || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, handle: e.target.value })}
                  className="form-input"
                  placeholder="e.g. daksh-Codez"
                />
              </div>

              <div>
                <label className="form-label">Profile URL</label>
                <input
                  type="url"
                  required
                  value={editingLink.url || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  className="form-input"
                  placeholder="https://github.com/daksh-Codez"
                />
              </div>

              <div>
                <label className="form-label">Status</label>
                <select
                  value={editingLink.status || 'published'}
                  onChange={(e) => setEditingLink({ ...editingLink, status: e.target.value as any })}
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
                onClick={() => setEditingLink(null)}
                style={{ padding: '8px 16px', background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ABA7B6', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                style={{ padding: '8px 20px', backgroundColor: '#8B5CF6', border: 'none', color: '#FFFFFF', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
              >
                {isSaving ? 'Saving...' : 'Save Link'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Links */}
      <div
        style={{
          backgroundColor: 'rgba(12, 13, 20, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '6px',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map((link) => (
            <div
              key={link.id}
              style={{
                padding: '16px 20px',
                backgroundColor: 'rgba(6, 6, 10, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#F2EFF5' }}>{link.platform}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: link.status === 'published' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                      color: link.status === 'published' ? '#10B981' : '#F59E0B',
                    }}
                  >
                    {link.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#797585', marginTop: '3px' }}>
                  {link.handle} · <span style={{ fontFamily: 'var(--font-mono)' }}>{link.url}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ABA7B6', padding: '4px' }}
                >
                  <ExternalLink size={15} />
                </a>

                <button
                  onClick={() => setEditingLink(link)}
                  style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', padding: '4px' }}
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => handleDelete(link.id)}
                  style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
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
          border-color: #8B5CF6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default SocialLinksManager;
