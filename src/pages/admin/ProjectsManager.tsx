import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { ProjectRecord } from '../../types/database';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Check,
  X,
  FolderGit2,
  AlertCircle,
  ExternalLink,
  Code,
  FileCode,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { highlightLine } from '../../utils/syntaxHighlight';

const blankProject: Omit<ProjectRecord, 'id'> = {
  slug: '',
  number: '01',
  title: '',
  language: 'C',
  category: 'SYSTEMS & FILE I/O',
  short_description: '',
  detailed_description: '',
  technologies: ['C'],
  highlights: [''],
  github_url: '',
  live_url: '',
  cover_image: '',
  screenshots: [],
  source_file_name: 'main.c',
  start_line: 1,
  code_excerpt: '// Source code implementation',
  visual_accent: '#8B5CF6',
  display_order: 1,
  status: 'published',
};

export const ProjectsManager: React.FC = () => {
  const { getAllAdminProjects, saveProject, deleteProject } = usePortfolioData();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<ProjectRecord> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAdminProjects();
      setProjects(data);
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err?.message || 'Failed to load projects.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleStartCreate = () => {
    const nextNumber = String(projects.length + 1).padStart(2, '0');
    setEditingProject({
      ...blankProject,
      number: nextNumber,
      display_order: projects.length + 1,
      slug: `project-${nextNumber}`,
    });
    setIsNew(true);
    setActiveTab('editor');
  };

  const handleStartEdit = (project: ProjectRecord) => {
    setEditingProject({ ...project });
    setIsNew(false);
    setActiveTab('editor');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title?.trim() || !editingProject.short_description?.trim()) {
      setStatusMsg({ type: 'error', text: 'Title and short description are required.' });
      return;
    }

    setIsSaving(true);
    setStatusMsg(null);

    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const payload: Partial<ProjectRecord> = {
      ...editingProject,
      slug,
      display_order: Number(editingProject.display_order) || 1,
      start_line: Number(editingProject.start_line) || 1,
    };

    const { error } = await saveProject(payload);
    setIsSaving(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to save project.' });
    } else {
      setStatusMsg({ type: 'success', text: `Project "${editingProject.title}" saved successfully.` });
      setEditingProject(null);
      await loadProjects();
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    const { error } = await deleteProject(id);
    setIsSaving(false);
    setDeleteConfirmId(null);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to delete project.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Project deleted successfully.' });
      await loadProjects();
    }
  };

  const handleTogglePublish = async (project: ProjectRecord) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    await saveProject({ id: project.id, status: newStatus });
    await loadProjects();
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
            PORTFOLIO SHOWCASE
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
            Projects Manager
          </h1>
          <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
            Add, update, reorder, or draft genuine projects displayed on the portfolio.
          </p>
        </div>

        {!editingProject && (
          <button
            onClick={handleStartCreate}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: '#8B5CF6',
              borderRadius: '5px',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.2s ease',
            }}
            className="action-btn-primary"
          >
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Notification Toast */}
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

      {/* EDIT / CREATE FORM MODAL OR INLINE VIEW */}
      {editingProject ? (
        <div
          style={{
            backgroundColor: 'rgba(12, 13, 20, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: 'clamp(20px, 3vw, 32px)',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Form Header Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '16px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F2EFF5' }}>
                {isNew ? 'Create New Project' : `Edit: ${editingProject.title}`}
              </h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '12px',
                  backgroundColor: editingProject.status === 'published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: editingProject.status === 'published' ? '#10B981' : '#F59E0B',
                  border: `1px solid ${editingProject.status === 'published' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                  textTransform: 'uppercase',
                }}
              >
                {editingProject.status}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: activeTab === 'editor' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  borderColor: activeTab === 'editor' ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'editor' ? '#C4B5FD' : '#ABA7B6',
                }}
              >
                Edit Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: activeTab === 'preview' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  borderColor: activeTab === 'preview' ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'preview' ? '#C4B5FD' : '#ABA7B6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Eye size={13} />
                <span>Code Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  background: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ABA7B6',
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {activeTab === 'preview' ? (
            /* Real-time Code Viewer Preview */
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '0.85rem', color: '#ABA7B6', marginBottom: '14px' }}>
                Preview of how the genuine source code excerpt and line gutter appear to visitors:
              </p>
              <div
                style={{
                  backgroundColor: 'rgba(8, 8, 12, 0.98)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: `2px solid ${editingProject.visual_accent || '#8B5CF6'}`,
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'rgba(12, 13, 18, 0.98)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileCode size={14} style={{ color: '#A78BFA' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#F2EFF5' }}>
                      {editingProject.source_file_name || 'source.c'}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#797585' }}>
                    {editingProject.language} · Lines {editingProject.start_line || 1}–
                    {(editingProject.start_line || 1) + (editingProject.code_excerpt || '').split('\n').length - 1}
                  </span>
                </div>
                <div style={{ padding: '16px 0', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', overflowX: 'auto' }}>
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <tbody>
                      {(editingProject.code_excerpt || '').split('\n').map((line, lIdx) => (
                        <tr key={lIdx}>
                          <td
                            style={{
                              width: '42px',
                              textAlign: 'right',
                              paddingRight: '12px',
                              paddingLeft: '14px',
                              color: 'rgba(148, 163, 184, 0.4)',
                              userSelect: 'none',
                              fontSize: '0.76rem',
                              borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                            }}
                          >
                            {(editingProject.start_line || 1) + lIdx}
                          </td>
                          <td style={{ paddingLeft: '16px', whiteSpace: 'pre', color: '#CBD5E1' }}>
                            {highlightLine(line)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Editing Form */
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                {/* Number */}
                <div>
                  <label className="form-label">Index Number (e.g. 01)</label>
                  <input
                    type="text"
                    required
                    value={editingProject.number || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, number: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Display Order */}
                <div>
                  <label className="form-label">Display Order (Sorting)</label>
                  <input
                    type="number"
                    required
                    value={editingProject.display_order ?? 1}
                    onChange={(e) => setEditingProject({ ...editingProject, display_order: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="form-label">Publication Status</label>
                  <select
                    value={editingProject.status || 'published'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="form-input"
                  >
                    <option value="published">Published (Live to Public)</option>
                    <option value="draft">Draft (Private Admin Only)</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="form-label">Primary Language (e.g. C, C++)</label>
                  <input
                    type="text"
                    required
                    value={editingProject.language || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, language: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Title & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                <div>
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Student Management System"
                  />
                </div>

                <div>
                  <label className="form-label">Category Paradigm</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="form-input"
                    placeholder="e.g. SYSTEMS & FILE I/O"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Short Description (Editorial Card Text)</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.short_description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                  className="form-input"
                  placeholder="Concise overview of the project and its core execution."
                />
              </div>

              {/* URLs: GitHub Repo & Live Demo */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                <div>
                  <label className="form-label">Real GitHub Repository URL</label>
                  <input
                    type="url"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    className="form-input"
                    placeholder="https://github.com/daksh-Codez/Student-Management-System-in-C"
                  />
                </div>

                <div>
                  <label className="form-label">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={editingProject.live_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Technologies (Comma separated) */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={(editingProject.technologies || []).join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="form-input"
                  placeholder="C, File I/O, Data Structures, Pointers"
                />
              </div>

              {/* Highlights (One per line) */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Key Highlights / Features (One per line)</label>
                <textarea
                  rows={3}
                  value={(editingProject.highlights || []).join('\n')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      highlights: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                    })
                  }
                  className="form-input"
                  placeholder="Custom C struct definitions for student records&#10;Dynamic binary file persistence&#10;Search, update, and deletion algorithms"
                />
              </div>

              {/* Source Code Config */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px', gap: '18px', marginBottom: '20px' }}>
                <div>
                  <label className="form-label">Source File Name</label>
                  <input
                    type="text"
                    required
                    value={editingProject.source_file_name || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, source_file_name: e.target.value })}
                    className="form-input"
                    placeholder="student-management-system.c"
                  />
                </div>

                <div>
                  <label className="form-label">Start Line</label>
                  <input
                    type="number"
                    value={editingProject.start_line ?? 1}
                    onChange={(e) => setEditingProject({ ...editingProject, start_line: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Accent Color</label>
                  <input
                    type="text"
                    value={editingProject.visual_accent || '#8B5CF6'}
                    onChange={(e) => setEditingProject({ ...editingProject, visual_accent: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Code Excerpt Textarea */}
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label">Verbatim Source Code Excerpt (Preserves exact syntax & formatting)</label>
                <textarea
                  rows={10}
                  required
                  value={editingProject.code_excerpt || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, code_excerpt: e.target.value })}
                  className="form-input"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.6 }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  style={{
                    padding: '10px 18px',
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
                    padding: '10px 22px',
                    backgroundColor: '#8B5CF6',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                    opacity: isSaving ? 0.7 : 1,
                  }}
                >
                  {isSaving ? 'Saving...' : 'Save & Publish Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : null}

      {/* Projects Table List */}
      <div
        style={{
          backgroundColor: 'rgba(12, 13, 20, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#797585' }}>
                <th style={{ padding: '14px 20px', width: '50px' }}>#</th>
                <th style={{ padding: '14px 20px' }}>TITLE</th>
                <th style={{ padding: '14px 20px' }}>SOURCE FILE</th>
                <th style={{ padding: '14px 20px' }}>CATEGORY</th>
                <th style={{ padding: '14px 20px' }}>STATUS</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: '16px 20px', color: '#8B5CF6', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {project.number}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: '#F2EFF5' }}>{project.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#797585', marginTop: '2px' }}>
                      {project.technologies?.slice(0, 3).join(', ')}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#C4B5FD' }}>
                    {project.source_file_name}
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '0.82rem', color: '#ABA7B6' }}>
                    {project.category}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(project)}
                      title="Click to toggle publish status"
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        backgroundColor: project.status === 'published' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                        color: project.status === 'published' ? '#10B981' : '#F59E0B',
                        border: `1px solid ${project.status === 'published' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                        cursor: 'pointer',
                      }}
                    >
                      {project.status}
                    </button>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open GitHub repo"
                          style={{
                            padding: '6px',
                            color: '#ABA7B6',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}

                      <button
                        onClick={() => handleStartEdit(project)}
                        title="Edit project"
                        style={{
                          padding: '6px',
                          color: '#A78BFA',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      {deleteConfirmId === project.id ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            onClick={() => handleDelete(project.id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#EF4444',
                              color: '#FFFFFF',
                              borderRadius: '3px',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            CONFIRM
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            style={{
                              padding: '4px 6px',
                              background: 'none',
                              color: '#ABA7B6',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(project.id)}
                          title="Delete project"
                          style={{
                            padding: '6px',
                            color: '#F87171',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .form-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: #ABA7B6;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .form-input {
          width: 100%;
          padding: 10px 14px;
          background-color: rgba(6, 6, 10, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          color: #F2EFF5;
          font-size: 0.88rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .form-input:focus {
          border-color: #8B5CF6;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ProjectsManager;
