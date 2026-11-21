import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FolderGit2,
  Image as ImageIcon,
  Wrench,
  User,
  GraduationCap,
  Compass,
  Share2,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const navLinks = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { path: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/admin/media', label: 'Media Library', icon: ImageIcon },
  { path: '/admin/skills', label: 'Skills & Tech', icon: Wrench },
  { path: '/admin/about', label: 'About Me', icon: User },
  { path: '/admin/education', label: 'Education', icon: GraduationCap },
  { path: '/admin/focus', label: 'Current Focus', icon: Compass },
  { path: '/admin/social', label: 'Social Links', icon: Share2 },
  { path: '/admin/contact', label: 'Contact Info', icon: Mail },
  { path: '/admin/settings', label: 'Website Settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#040407',
        color: '#F2EFF5',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 990,
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '260px',
          minWidth: '260px',
          backgroundColor: '#08080C',
          borderRight: '1px solid rgba(255, 255, 255, 0.07)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 995,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`admin-sidebar ${mobileSidebarOpen ? 'sidebar-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}
              >
                DAKSH GOSWAMI
              </span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                marginTop: '4px',
                padding: '2px 8px',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '3px',
                fontSize: '0.68rem',
                color: '#93C5FD',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <ShieldCheck size={11} />
              <span>CMS v1.0</span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              display: 'none',
              color: '#ABA7B6',
              padding: '6px',
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            flex: 1,
            padding: '16px 12px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span
            style={{
              padding: '6px 10px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#797585',
              textTransform: 'uppercase',
            }}
          >
            MANAGEMENT
          </span>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '9px 12px',
                  borderRadius: '5px',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  color: '#ABA7B6',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={16} />
                <span style={{ flex: 1 }}>{link.label}</span>
                <ChevronRight size={13} className="nav-chevron" style={{ opacity: 0.3 }} />
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div
          style={{
            padding: '16px 14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: 'rgba(5, 5, 8, 0.6)',
          }}
        >
          {/* View Live Website Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '4px',
              fontSize: '0.8rem',
              color: '#CBD5E1',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            className="view-site-pill"
          >
            <span>View Public Site</span>
            <ExternalLink size={13} />
          </a>

          {/* User Account / Logout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '6px',
            }}
          >
            <div style={{ minWidth: 0, flex: 1, paddingRight: '8px' }}>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#F2EFF5',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.email || 'Admin'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#797585' }}>Administrator</div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign out"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#F87171',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="logout-btn"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: '260px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#040407',
        }}
        className="admin-main-wrap"
      >
        {/* Top Header Bar */}
        <header
          style={{
            height: '60px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            backgroundColor: 'rgba(8, 8, 12, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(16px, 3vw, 36px)',
            position: 'sticky',
            top: 0,
            zIndex: 980,
          }}
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#F2EFF5',
            }}
            className="mobile-hamburger"
          >
            <Menu size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.84rem', color: '#797585' }}>Portal //</span>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#F2EFF5' }}>Content Management System</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#60A5FA',
                padding: '6px 12px',
                borderRadius: '4px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                textDecoration: 'none',
              }}
            >
              <span>Live Website</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </header>

        {/* Page View Body */}
        <main
          style={{
            flex: 1,
            padding: 'clamp(20px, 3.5vw, 40px)',
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.04);
          color: #FFFFFF !important;
        }
        .admin-nav-item.active {
          background-color: rgba(59, 130, 246, 0.15) !important;
          color: #93C5FD !important;
          border-left: 2px solid #3B82F6;
          font-weight: 600;
        }
        .admin-nav-item.active .nav-chevron {
          opacity: 0.8 !important;
          color: #93C5FD;
        }
        .view-site-pill:hover {
          background-color: rgba(255, 255, 255, 0.07) !important;
          color: #FFFFFF !important;
        }
        .logout-btn:hover {
          background-color: rgba(239, 68, 68, 0.22) !important;
        }

        @media (max-width: 900px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.sidebar-open {
            transform: translateX(0);
          }
          .admin-main-wrap {
            margin-left: 0 !important;
          }
          .mobile-hamburger {
            display: inline-flex !important;
          }
          .mobile-close-btn {
            display: inline-block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
