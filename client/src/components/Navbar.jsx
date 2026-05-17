import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import { navLinks } from '../data/portfolioData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = navLinks.map(link => link.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveLink(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    setActiveLink(href);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      id="main-navbar"
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 40 40" className="transition-transform duration-300 group-hover:scale-110">
                <circle cx="20" cy="20" r="18" fill="none" stroke="var(--accent-red)" strokeWidth="2" opacity="0.8" />
                <circle cx="20" cy="20" r="12" fill="none" stroke="var(--accent-red)" strokeWidth="1" opacity="0.4" />
                {/* Web lines */}
                <line x1="20" y1="2" x2="20" y2="38" stroke="var(--accent-red)" strokeWidth="0.8" opacity="0.5" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="var(--accent-red)" strokeWidth="0.8" opacity="0.5" />
                <line x1="6" y1="6" x2="34" y2="34" stroke="var(--accent-red)" strokeWidth="0.8" opacity="0.5" />
                <line x1="34" y1="6" x2="6" y2="34" stroke="var(--accent-red)" strokeWidth="0.8" opacity="0.5" />
                {/* Spider eyes */}
                <ellipse cx="15" cy="18" rx="4" ry="5" fill="var(--accent-red)" opacity="0.9" />
                <ellipse cx="25" cy="18" rx="4" ry="5" fill="var(--accent-red)" opacity="0.9" />
              </svg>
            </div>
            <span className="font-heading text-2xl tracking-widest" style={{ color: 'var(--text-primary)' }}>
              KE<span style={{ color: 'var(--accent-red)' }}>.</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative px-4 py-2 text-sm font-body font-medium transition-colors duration-300 group"
                style={{
                  color: activeLink === link.href ? 'var(--accent-red)' : 'var(--text-secondary)',
                }}
              >
                {link.name}
                {/* Active indicator - web line */}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeLink === link.href ? '60%' : '0%',
                    background: 'var(--accent-red)',
                    boxShadow: activeLink === link.href ? '0 0 8px var(--accent-red-glow)' : 'none',
                  }}
                />
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-[40%]"
                  style={{
                    width: '0%',
                    background: 'var(--accent-red)',
                  }}
                />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--glass-border)',
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-4 py-3 rounded-lg text-base font-body font-medium transition-all duration-300"
                  style={{
                    color: activeLink === link.href ? 'var(--accent-red)' : 'var(--text-secondary)',
                    background: activeLink === link.href ? 'rgba(226,54,54,0.08)' : 'transparent',
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
