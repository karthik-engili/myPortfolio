import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '../data/portfolioData';
import { FiMapPin, FiMail, FiDownload } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function CountUp({ target, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = (now - start) / (duration * 1000);
            const progress = Math.min(elapsed, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Projects', value: personalData.stats.projects, suffix: '+' },
    { label: 'Years Exp.', value: personalData.stats.experience, suffix: '+' },
    { label: 'Happy Clients', value: personalData.stats.clients, suffix: '+' },
    { label: 'Commits', value: personalData.stats.commits, suffix: '+' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Decorative web corner */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-[0.04]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={200 * Math.cos((Math.PI / 2) * (i / 5))}
              y2={200 * Math.sin((Math.PI / 2) * (i / 5))}
              stroke="var(--accent-red)"
              strokeWidth="1"
            />
          ))}
          {[40, 80, 120, 160].map((r, i) => (
            <path
              key={i}
              d={`M 0 ${r} Q ${r * 0.5} ${r * 0.5} ${r} 0`}
              fill="none"
              stroke="var(--accent-red)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="section-container">
        {/* Section header */}
        <div className="about-reveal text-center mb-16">
          <span
            className="font-body text-sm font-medium tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent-red)' }}
          >
            Get to know me
          </span>
          <h2 className="section-title mt-2">
            ABOUT <span className="gradient-text">ME</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image / Avatar */}
          <div className="about-reveal flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute -inset-4 rounded-2xl opacity-20 blur-xl"
                style={{ background: 'linear-gradient(135deg, var(--accent-red), var(--accent-blue))' }}
              />
              {/* Image container */}
              <div
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden"
                style={{
                  border: '2px solid var(--border-color)',
                  background: 'var(--bg-card)',
                }}
              >
                {/* Placeholder avatar with spider web pattern */}
                <div className="w-full h-full flex items-center justify-center bg-web-pattern">
                  <div className="text-center">
                    <div
                      className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-red), var(--accent-blue))',
                      }}
                    >
                      <span className="font-heading text-5xl text-white tracking-wider">
                        {personalData.firstName[0]}{personalData.lastName[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner web decorations */}
                <div
                  className="absolute top-0 left-0 w-16 h-16"
                  style={{
                    borderTop: '2px solid var(--accent-red)',
                    borderLeft: '2px solid var(--accent-red)',
                    opacity: 0.4,
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-16 h-16"
                  style={{
                    borderBottom: '2px solid var(--accent-red)',
                    borderRight: '2px solid var(--accent-red)',
                    opacity: 0.4,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <p
              className="about-reveal font-body text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              {personalData.bio}
            </p>

            <div className="about-reveal space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <FiMapPin size={18} style={{ color: 'var(--accent-red)' }} />
                <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {personalData.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail size={18} style={{ color: 'var(--accent-red)' }} />
                <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {personalData.email}
                </span>
              </div>
            </div>

            <a
              href={personalData.resumeUrl}
              className="about-reveal btn-primary inline-flex items-center gap-2"
            >
              <FiDownload size={18} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="about-reveal grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center relative web-corner"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="font-heading text-4xl md:text-5xl tracking-wider mb-1"
                style={{ color: 'var(--accent-red)' }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="font-body text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
