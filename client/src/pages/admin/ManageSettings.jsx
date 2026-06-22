import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { FiSave, FiUser, FiMail, FiPhone, FiMapPin, FiFileText } from 'react-icons/fi';

export default function ManageSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [rolesInput, setRolesInput] = useState('');

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data.success) {
        setSettings(res.data.data);
        setRolesInput(res.data.data.roles?.join(', ') || '');
      }
    } catch {} finally { setLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...settings, roles: rolesInput.split(',').map(s => s.trim()).filter(Boolean) };
      const res = await api.put('/settings', payload);
      if (res.data.success) { setSettings(res.data.data); toast.success('Settings saved!', { theme: 'dark' }); }
    } catch (err) {
      toast.error('Failed to save settings', { theme: 'dark' });
    } finally { setSaving(false); }
  };

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const inputStyle = { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-red)', borderTopColor: 'transparent' }} /></div>;
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-heading text-4xl tracking-wider" style={{ color: 'var(--text-primary)' }}>SETTINGS</h1>
        <p className="font-body text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage your portfolio information</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Personal Info */}
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2"><FiUser size={20} style={{ color: 'var(--accent-red)' }} /><h2 className="font-heading text-xl tracking-wider" style={{ color: 'var(--text-primary)' }}>PERSONAL INFO</h2></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>First Name</label><input type="text" value={settings?.firstName || ''} onChange={e => update('firstName', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
            <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Last Name</label><input type="text" value={settings?.lastName || ''} onChange={e => update('lastName', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
          </div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Full Name</label><input type="text" value={settings?.fullName || ''} onChange={e => update('fullName', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Professional Title</label><input type="text" value={settings?.professionalTitle || ''} onChange={e => update('professionalTitle', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Roles (comma separated)</label><input type="text" value={rolesInput} onChange={e => setRolesInput(e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} placeholder="Full-Stack Developer, Problem Solver" /></div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Bio</label><textarea rows={4} value={settings?.bio || ''} onChange={e => update('bio', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm resize-none focus:outline-none focus:ring-2" style={inputStyle} /></div>
        </section>

        {/* Contact Info */}
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2"><FiMail size={20} style={{ color: 'var(--accent-red)' }} /><h2 className="font-heading text-xl tracking-wider" style={{ color: 'var(--text-primary)' }}>CONTACT INFO</h2></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Email</label><input type="email" value={settings?.email || ''} onChange={e => update('email', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
            <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Phone</label><input type="text" value={settings?.phone || ''} onChange={e => update('phone', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
          </div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Location</label><input type="text" value={settings?.location || ''} onChange={e => update('location', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
        </section>

        {/* Hero Section */}
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2"><FiFileText size={20} style={{ color: 'var(--accent-red)' }} /><h2 className="font-heading text-xl tracking-wider" style={{ color: 'var(--text-primary)' }}>HERO SECTION</h2></div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Hero Description</label><textarea rows={3} value={settings?.heroDescription || ''} onChange={e => update('heroDescription', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm resize-none focus:outline-none focus:ring-2" style={inputStyle} /></div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Profile Image URL</label><input type="text" value={settings?.profileImage || ''} onChange={e => update('profileImage', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
          <div><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Resume URL</label><input type="text" value={settings?.resumeUrl || ''} onChange={e => update('resumeUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
        </section>

        {/* Stats */}
        <section className="glass-card p-6 space-y-4">
          <h2 className="font-heading text-xl tracking-wider" style={{ color: 'var(--text-primary)' }}>STATS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ key: 'statsProjects', label: 'Projects' }, { key: 'statsExperience', label: 'Years Exp.' }, { key: 'statsClients', label: 'Clients' }, { key: 'statsCommits', label: 'Commits' }].map(s => (
              <div key={s.key}><label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{s.label}</label><input type="number" value={settings?.[s.key] || 0} onChange={e => update(s.key, parseInt(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2" style={inputStyle} /></div>
            ))}
          </div>
        </section>

        <button type="submit" disabled={saving} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSave size={18} /> Save Settings</>}
        </button>
      </form>
    </div>
  );
}
