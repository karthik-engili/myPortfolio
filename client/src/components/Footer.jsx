import { personalData } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

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
              {personalData.firstName.toUpperCase()} <span style={{ color: 'var(--accent-red)' }}>{personalData.lastName.toUpperCase()}</span>
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { icon: FiGithub, href: personalData.social.github },
              { icon: FiLinkedin, href: personalData.social.linkedin },
              { icon: FiTwitter, href: personalData.social.twitter },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-body text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            © {year} {personalData.name}. Built with <FiHeart size={12} style={{ color: 'var(--accent-red)' }} /> & React
          </p>
        </div>
      </div>
    </footer>
  );
}
