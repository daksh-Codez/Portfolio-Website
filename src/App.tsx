import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Public Portfolio (Unchanged public experience)
import { PublicPortfolio } from './pages/PublicPortfolio';

// Admin CMS System
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/Admin/AdminLayout';
import { ProtectedRoute } from './components/Admin/ProtectedRoute';
import { Overview } from './pages/admin/Overview';
import { ProjectsManager } from './pages/admin/ProjectsManager';
import { MediaLibrary } from './pages/admin/MediaLibrary';
import { SkillsManager } from './pages/admin/SkillsManager';
import { AboutManager } from './pages/admin/AboutManager';
import { EducationManager } from './pages/admin/EducationManager';
import { FocusManager } from './pages/admin/FocusManager';
import { SocialLinksManager } from './pages/admin/SocialLinksManager';
import { ContactManager } from './pages/admin/ContactManager';
import { WebsiteSettings } from './pages/admin/WebsiteSettings';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public Portfolio Route */}
            <Route path="/" element={<PublicPortfolio />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Private CMS Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="skills" element={<SkillsManager />} />
              <Route path="about" element={<AboutManager />} />
              <Route path="education" element={<EducationManager />} />
              <Route path="focus" element={<FocusManager />} />
              <Route path="social" element={<SocialLinksManager />} />
              <Route path="contact" element={<ContactManager />} />
              <Route path="settings" element={<WebsiteSettings />} />
            </Route>

            {/* Fallback to Public Site */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
