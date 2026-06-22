import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { FiFolder, FiStar, FiCode, FiAward, FiBriefcase, FiMail, FiActivity, FiTrendingUp } from 'react-icons/fi';

const statCards = [
  { key: 'totalProjects', label: 'Projects', icon: FiFolder, color: '#e23636' },
  { key: 'featuredProjects', label: 'Featured', icon: FiStar, color: '#f59e0b' },
  { key: 'totalSkills', label: 'Skills', icon: FiCode, color: '#2146c7' },
  { key: 'totalCertifications', label: 'Certifications', icon: FiAward, color: '#10b981' },
  { key: 'totalExperiences', label: 'Experiences', icon: FiBriefcase, color: '#8b5cf6' },
  { key: 'totalAchievements', label: 'Achievements', icon: FiTrendingUp, color: '#ec4899' },
  { key: 'totalMessages', label: 'Messages', icon: FiMail, color: '#06b6d4' },
];

const actionLabels = {
  login: '🔐 Logged in', logout: '🚪 Logged out', login_failed: '❌ Login failed',
  project_create: '📁 Created project', project_update: '✏️ Updated project', project_delete: '🗑️ Deleted project',
  skill_create: '💻 Added skill', skill_update: '✏️ Updated skill', skill_delete: '🗑️ Removed skill',
  settings_update: '⚙️ Updated settings', contact_delete: '🗑️ Deleted message', contact_read: '📖 Read message',
  experience_create: '💼 Added experience', experience_update: '✏️ Updated experience', experience_delete: '🗑️ Deleted experience',
  education_create: '🎓 Added education', education_update: '✏️ Updated education', education_delete: '🗑️ Deleted education',
  certification_create: '📜 Added certification', certification_update: '✏️ Updated certification', certification_delete: '🗑️ Deleted certification',
  achievement_create: '🏆 Added achievement', achievement_update: '✏️ Updated achievement', achievement_delete: '🗑️ Deleted achievement',
  social_create: '🔗 Added social link', social_update: '✏️ Updated social link', social_delete: '🗑️ Deleted social link',
  resume_upload: '📄 Uploaded resume', media_upload: '🖼️ Uploaded media', media_delete: '🗑️ Deleted media',
  password_change: '🔑 Changed password',
};

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/admin/dashboard');
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-red)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-4xl tracking-wider" style={{ color: 'var(--text-primary)' }}>
          DASHBOARD
        </h1>
        <p className="font-body text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <span className="font-heading text-3xl tracking-wider" style={{ color: 'var(--text-primary)' }}>
                {stats?.[key] ?? 0}
              </span>
            </div>
            <p className="font-body text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiActivity size={20} style={{ color: 'var(--accent-red)' }} />
          <h2 className="font-heading text-2xl tracking-wider" style={{ color: 'var(--text-primary)' }}>RECENT ACTIVITY</h2>
        </div>
        {stats?.recentActivity?.length > 0 ? (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {stats.recentActivity.map((log, i) => (
              <div key={log._id || i} className="flex items-start gap-4 p-3 rounded-xl transition-colors" style={{ background: 'var(--bg-card)' }}>
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: log.action.includes('delete') || log.action.includes('failed') ? '#ef4444' : log.action.includes('create') ? '#10b981' : 'var(--accent-red)' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm" style={{ color: 'var(--text-primary)' }}>
                    {actionLabels[log.action] || log.action}
                  </p>
                  {log.details && (
                    <p className="font-body text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{log.details}</p>
                  )}
                </div>
                <span className="font-code text-[10px] shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {new Date(log.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>No recent activity</p>
        )}
      </div>
    </div>
  );
}
