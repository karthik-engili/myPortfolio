import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const iconMap = { FiGithub, FiLinkedin, FiTwitter };

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef(null);
  const webLinesRef = useRef(null);
  const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const [settingsRes, socialRes] = await Promise.all([
          fetch(`${apiUrl}/api/settings`).then(r => r.json()),
          fetch(`${apiUrl}/api/social`).then(r => r.json()),
        ]);
        if (settingsRes.success) setSettings(settingsRes.data);
        if (socialRes.success) setSocialLinks(socialRes.data);
      } catch {
        // Fallback to defaults if API fails
        setSettings({
          firstName: 'Karthik', lastName: 'Engili',
          roles: ['Full-Stack Developer', 'Problem Solver', 'Tech Explorer'],
          heroDescription: "I craft immersive web experiences with clean code and creative design.",
        });
      }
    };
    fetchData();
  }, []);

  const roles = settings?.roles || ['Full-Stack Developer'];

  // Typing effect
  useEffect(() => {
    if (!roles.length) return;
    const currentRole = roles[roleIndex % roles.length];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Animated decorative web SVG
  const WebDecoration = () => (
    <svg
      ref={webLinesRef}
      className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none hidden lg:block"
      viewBox="0 0 500 500"
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 12;
        return (
          <line
            key={`r-${i}`}
            x1="250"
            y1="250"
            x2={250 + Math.cos(angle) * 250}
            y2={250 + Math.sin(angle) * 250}
            stroke="var(--accent-red)"
            strokeWidth="1"
          />
        );
      })}
      {[60, 120, 180, 240].map((r, i) => (
        <circle
          key={`c-${i}`}
          cx="250"
          cy="250"
          r={r}
          fill="none"
          stroke="var(--accent-red)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );

  const getSocialIcon = (link) => {
    const platform = link.platform?.toLowerCase() || '';
    if (platform.includes('github')) return FiGithub;
    if (platform.includes('linkedin')) return FiLinkedin;
    if (platform.includes('twitter') || platform.includes('x')) return FiTwitter;
    return FiGithub;
  };

  if (!settings) return null;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Web pattern background */}
      <div className="absolute inset-0 bg-web-pattern opacity-30" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, var(--accent-red-glow) 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 80%, var(--accent-blue-glow) 0%, transparent 50%)`,
          opacity: 0.15,
        }}
      />

      <WebDecoration />

      <div className="section-container relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Greeting */}
          <motion.div
            className="hero-line flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-[2px] w-12 bg-spidey-red rounded-full" />
            <span
              className="font-body text-sm md:text-base font-medium tracking-widest uppercase"
              style={{ color: 'var(--accent-red)' }}
            >
              Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="hero-line font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none mb-2">
            <span style={{ color: 'var(--text-primary)' }}>{settings.firstName}</span>
            <br />
            <span className="gradient-text">{settings.lastName}</span>
          </h1>

          {/* Role with typing effect */}
          <div className="hero-line h-12 md:h-14 flex items-center mt-4 mb-8">
            <span
              className="font-body text-xl md:text-2xl font-light"
              style={{ color: 'var(--text-secondary)' }}
            >
              {'< '}
            </span>
            <span
              className="font-code text-xl md:text-2xl"
              style={{ color: 'var(--accent-red)' }}
            >
              {displayText}
            </span>
            <span
              className="inline-block w-[3px] h-7 ml-1 animate-pulse"
              style={{ background: 'var(--accent-red)' }}
            />
            <span
              className="font-body text-xl md:text-2xl font-light"
              style={{ color: 'var(--text-secondary)' }}
            >
              {' />'}
            </span>
          </div>

          {/* Description */}
          <p
            className="hero-line font-body text-base md:text-lg max-w-xl leading-relaxed mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {settings.heroDescription || "I craft immersive web experiences with clean code and creative design."}
            {' '}Let's build something <span style={{ color: 'var(--accent-red)' }}>spectacular</span> together.
          </p>

          {/* CTA Buttons */}
          <div className="hero-line flex flex-wrap items-center gap-4 mb-12">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>

          {/* Social links */}
          <div className="hero-line flex items-center gap-5">
            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link);
              return (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="p-3 rounded-full transition-all duration-300 group"
                  style={{
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Icon
                    size={20}
                    className="transition-all duration-300 group-hover:scale-110"
                    style={{ color: 'inherit' }}
                  />
                  <style>{`
                    a:hover { color: var(--accent-red) !important; border-color: var(--accent-red) !important; box-shadow: 0 0 15px var(--accent-red-glow); }
                  `}</style>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="font-body text-xs tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Scroll
        </span>
        <FiArrowDown size={16} style={{ color: 'var(--accent-red)' }} />
      </motion.div>
    </section>
  );
}
