import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#040407',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: '#F2EFF5',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid rgba(139, 92, 246, 0.2)',
            borderTopColor: '#8B5CF6',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span style={{ fontSize: '0.85rem', color: '#ABA7B6', letterSpacing: '0.04em' }}>
          VERIFYING ADMIN CREDENTIALS...
        </span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If Supabase is unconfigured or user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
