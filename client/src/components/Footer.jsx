import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const [sRes, soRes] = await Promise.all([
          fetch(`${apiUrl}/api/settings`).then(r => r.json()),
          fetch(`${apiUrl}/api/social`).then(r => r.json()),
        ]);
        if (sRes.success) setSettings(sRes.data);
        if (soRes.success) setSocialLinks(soRes.data);
      } catch {
        setSettings({ firstName: 'KARTHIK', lastName: 'ENGILI', fullName: 'Karthik Engili' });
      }
    };
    fetchData();
  }, []);

  const getSocialIcon = (link) => {
    const p = link.platform?.toLowerCase() || '';
    if (p.includes('github')) return FiGithub;
    if (p.includes('linkedin')) return FiLinkedin;
    if (p.includes('twitter') || p.includes('x')) return FiTwitter;
    return FiGithub;
  };

  if (!settings) return null;

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="var(--accent-red)" strokeWidth="2" opacity="0.8" />
              <ellipse cx="15" cy="18" rx="4" ry="5" fill="var(--accent-red)" opacity="0.9" />
              <ellipse cx="25" cy="18" rx="4" ry="5" fill="var(--accent-red)" opacity="0.9" />
            </svg>
            <span className="font-heading text-xl tracking-widest" style={{ color: 'var(--text-primary)' }}>
              {(settings.firstName || 'KARTHIK').toUpperCase()} <span style={{ color: 'var(--accent-red)' }}>{(settings.lastName || 'ENGILI').toUpperCase()}</span>
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link);
              return (
                <a key={link._id} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="font-body text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            © {year} {settings.fullName || settings.firstName}. Built with <FiHeart size={12} style={{ color: 'var(--accent-red)' }} /> & React
          </p>
        </div>
      </div>
    </footer>
  );
}
