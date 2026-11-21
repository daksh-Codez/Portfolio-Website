import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ProjectRecord, SkillRecord } from '../../types/database';
import {
  FolderGit2,
  FileCheck2,
  FileClock,
  Wrench,
  PlusCircle,
  UploadCloud,
  ArrowUpRight,
  Database,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const Overview: React.FC = () => {
  const { getAllAdminProjects, getAllAdminSkills } = usePortfolioData();
  const { isConfigured, user } = useAuth();

  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [skills, setSkills] = useState<SkillRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projData, skillData] = await Promise.all([
          getAllAdminProjects(),
          getAllAdminSkills(),
        ]);
        setProjects(projData);
        setSkills(skillData);
      } catch (err) {
        console.error('Failed to load admin overview metrics:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const draftProjects = projects.filter((p) => p.status === 'draft').length;
  const totalSkills = skills.length;

  return (
    <div>
      {/* Top Welcome Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#8B5CF6',
              textTransform: 'uppercase',
            }}
          >
            ADMINISTRATIVE DASHBOARD
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#F2EFF5',
              marginTop: '4px',
            }}
          >
            System Overview
          </h1>
          <p style={{ color: '#ABA7B6', fontSize: '0.94rem', marginTop: '6px' }}>
            Logged in as <strong style={{ color: '#F2EFF5' }}>{user?.email || 'Administrator'}</strong>
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to="/admin/projects"
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
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
            className="action-btn-primary"
          >
            <PlusCircle size={16} />
            <span>Add Project</span>
          </Link>

          <Link
            to="/admin/media"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '5px',
              color: '#F2EFF5',
              fontSize: '0.86rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            className="action-btn-secondary"
          >
            <UploadCloud size={16} />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* Backend Status Notification */}
      {!isConfigured && (
        <div
          style={{
            padding: '18px 22px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '6px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}
        >
          <AlertTriangle size={20} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 600, color: '#FCD34D', marginBottom: '4px' }}>
              Database Synchronization Notice
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#E2E8F0', lineHeight: 1.6 }}>
              Supabase environment variables (<code>VITE_SUPABASE_URL</code> & <code>VITE_SUPABASE_ANON_KEY</code>) are currently in fallback demonstration mode. The public portfolio is safely loading from static defaults. To enable live database synchronization, paste your Supabase keys into <code>.env</code> and run the provided SQL migration in <code>supabase/schema.sql</code>.
            </p>
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        {/* Total Projects */}
        <div
          style={{
            padding: '24px',
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#ABA7B6', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Projects
            </span>
            <FolderGit2 size={18} style={{ color: '#A78BFA' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
            {isLoading ? '...' : totalProjects}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#797585', marginTop: '10px' }}>
            {publishedProjects} published / {draftProjects} drafts
          </div>
        </div>

        {/* Published Projects */}
        <div
          style={{
            padding: '24px',
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#ABA7B6', fontWeight: 600, textTransform: 'uppercase' }}>
              Live Published
            </span>
            <FileCheck2 size={18} style={{ color: '#10B981' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#10B981', lineHeight: 1 }}>
            {isLoading ? '...' : publishedProjects}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#797585', marginTop: '10px' }}>
            Visible to public visitors
          </div>
        </div>

        {/* Draft Projects */}
        <div
          style={{
            padding: '24px',
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#ABA7B6', fontWeight: 600, textTransform: 'uppercase' }}>
              Drafts
            </span>
            <FileClock size={18} style={{ color: '#F59E0B' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F59E0B', lineHeight: 1 }}>
            {isLoading ? '...' : draftProjects}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#797585', marginTop: '10px' }}>
            Unpublished / Private
          </div>
        </div>

        {/* Active Skills */}
        <div
          style={{
            padding: '24px',
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#ABA7B6', fontWeight: 600, textTransform: 'uppercase' }}>
              Technologies
            </span>
            <Wrench size={18} style={{ color: '#A78BFA' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
            {isLoading ? '...' : totalSkills}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#797585', marginTop: '10px' }}>
            Categorized developer tools
          </div>
        </div>
      </div>

      {/* Recent Content Showcase Table */}
      <div
        style={{
          backgroundColor: 'rgba(12, 13, 20, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#F2EFF5' }}>
            Recent Projects in Repository
          </h2>
          <Link
            to="/admin/projects"
            style={{
              fontSize: '0.82rem',
              color: '#A78BFA',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>Manage All</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#797585' }}>
                <th style={{ padding: '14px 24px', fontWeight: 600 }}>#</th>
                <th style={{ padding: '14px 24px', fontWeight: 600 }}>TITLE</th>
                <th style={{ padding: '14px 24px', fontWeight: 600 }}>LANGUAGE</th>
                <th style={{ padding: '14px 24px', fontWeight: 600 }}>CATEGORY</th>
                <th style={{ padding: '14px 24px', fontWeight: 600 }}>STATUS</th>
                <th style={{ padding: '14px 24px', fontWeight: 600, textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((project) => (
                <tr
                  key={project.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: '16px 24px', color: '#8B5CF6', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {project.number}
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: '#F2EFF5' }}>
                    {project.title}
                  </td>
                  <td style={{ padding: '16px 24px', color: '#ABA7B6' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '3px',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {project.language}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#ABA7B6', fontSize: '0.82rem' }}>
                    {project.category}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        backgroundColor: project.status === 'published' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                        color: project.status === 'published' ? '#10B981' : '#F59E0B',
                        border: `1px solid ${project.status === 'published' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                      }}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <Link
                      to={`/admin/projects`}
                      style={{
                        color: '#A78BFA',
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Edit ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .action-btn-primary:hover {
          background-color: #2563EB !important;
        }
        .action-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.09) !important;
        }
        .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </div>
  );
};

export default Overview;
