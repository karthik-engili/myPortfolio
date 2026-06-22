import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiGrid, FiFolder, FiCode, FiBriefcase, FiBookOpen, FiAward, FiStar,
  FiLink, FiSettings, FiMail, FiLogOut, FiMenu, FiX, FiFileText, FiChevronLeft
} from 'react-icons/fi';

const navItems = [
  { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/projects', icon: FiFolder, label: 'Projects' },
  { to: '/admin/skills', icon: FiCode, label: 'Skills' },
  { to: '/admin/experience', icon: FiBriefcase, label: 'Experience' },
  { to: '/admin/education', icon: FiBookOpen, label: 'Education' },
  { to: '/admin/certifications', icon: FiAward, label: 'Certifications' },
  { to: '/admin/achievements', icon: FiStar, label: 'Achievements' },
  { to: '/admin/social', icon: FiLink, label: 'Social Links' },
  { to: '/admin/messages', icon: FiMail, label: 'Messages' },
  { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-medium transition-all duration-200 ${isActive ? 'admin-nav-active' : 'admin-nav-item'}`;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)' }}>
        
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-red), #b71c1c)' }}>
              <span className="font-heading text-lg text-white tracking-wider">KE</span>
            </div>
            <div>
              <p className="font-heading text-lg tracking-wider" style={{ color: 'var(--text-primary)' }}>ADMIN</p>
              <p className="font-body text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>CMS Panel</p>
            </div>
          </div>
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)} style={{ color: 'var(--text-muted)' }}>
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={() => setSidebarOpen(false)}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 space-y-2" style={{ borderTop: '1px solid var(--border-color)' }}>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-medium transition-all duration-200 admin-nav-item">
            <FiChevronLeft size={18} />
            <span>View Portfolio</span>
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-medium transition-all duration-200 w-full admin-nav-item hover:!text-red-400">
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
          <div className="px-4 py-2">
            <p className="font-body text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
              Signed in as <span style={{ color: 'var(--accent-red)' }}>{admin?.username}</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-color)' }}>
          <button className="lg:hidden p-2 rounded-lg" onClick={() => setSidebarOpen(true)} style={{ color: 'var(--text-primary)' }}>
            <FiMenu size={22} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-red), var(--accent-blue))' }}>
              <span className="font-heading text-xs text-white">{admin?.username?.[0]?.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
