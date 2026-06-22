import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

// Public
import Portfolio from './pages/Portfolio';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageExperience from './pages/admin/ManageExperience';
import ManageEducation from './pages/admin/ManageEducation';
import ManageCertifications from './pages/admin/ManageCertifications';
import ManageAchievements from './pages/admin/ManageAchievements';
import ManageSocial from './pages/admin/ManageSocial';
import ManageMessages from './pages/admin/ManageMessages';
import ManageSettings from './pages/admin/ManageSettings';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<Portfolio />} />

          {/* Admin Login (hidden, not linked anywhere) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Dashboard */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="experience" element={<ManageExperience />} />
            <Route path="education" element={<ManageEducation />} />
            <Route path="certifications" element={<ManageCertifications />} />
            <Route path="achievements" element={<ManageAchievements />} />
            <Route path="social" element={<ManageSocial />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="settings" element={<ManageSettings />} />
          </Route>

          {/* Catch-all redirect to portfolio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          toastStyle={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
